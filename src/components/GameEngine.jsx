import { useState, useEffect, useRef } from 'react';
import HUD from './HUD';
import SwipeCard from './SwipeCard';
import PressConferenceCard from './PressConferenceCard';
import { CARDS } from '../data/cards';
import { calculateNextState, INITIAL_STATS, checkGameOver } from '../utils/ResourceManager';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, GraduationCap, AlertTriangle } from 'lucide-react';
import CityBackground from './CityBackground';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function GameEngine({ nickname, onFinish }) {
    const [stats, setStats] = useState(INITIAL_STATS);
    const [deck, setDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [choices, setChoices] = useState([]); // { cardId, decision, input? }

    // Timer State
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [isShaking, setIsShaking] = useState(false);

    // CityPulse 2.0 State
    const [showAdvisor, setShowAdvisor] = useState(false);
    const [crisisMode, setCrisisMode] = useState(false);
    const [approvedStickers, setApprovedStickers] = useState([]); // For CityBackground

    useEffect(() => {
        // Determine deck. For now, just use the static list.
        setDeck(CARDS);

        // Timer Interval
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Auto-finish when time runs out
                    if (deck.length > 0) {
                        // We need to trigger finish with *current* stats
                        // Since we can't easily access latest 'stats' and 'choices' inside this closure without refs or dependency changes,
                        // a common pattern is using a ref or just triggering a side effect.
                        // For simplicity in this functional component, let's set a flag or just force finish if we can.
                        // Actually, 'onFinish' is stable. 'stats' and 'choices' change.
                        // Let's use a Ref for current state to access in interval.
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Refs for auto-finish access
    const stateRef = useRef({ stats, choices });
    useEffect(() => { stateRef.current = { stats, choices }; }, [stats, choices]);

    // Check for Timer Finish
    useEffect(() => {
        if (timeLeft === 0) {
            onFinish(stateRef.current.stats, stateRef.current.choices);
        }
    }, [timeLeft]);

    const handleSwipe = async (decision) => {
        const currentCard = deck[currentIndex];

        // REMOVED ADVISOR INTERCEPTION LOGIC (Optional Mode)

        // Budget Cap / Shake Logic
        if (decision === 'yes' && stats.budget <= 0) {
            if (currentCard.yes && currentCard.yes.budget < 0) {
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500);
                return;
            }
        }

        if (decision === 'yes' && currentCard.yes && currentCard.yes.budget < 0 && stats.budget <= 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        // 2. Crisis Event Trigger (Every 5 swipes)
        // Check if next swipe should trigger crisis? 
        // Let's do it AFTER the swipe is processed, maybe interrupt the NEXT card?
        // Or simply: if (choices.length % 5 === 4) -> Trigger Crisis Modal immediately after this swipe?
        // Let's implement Crisis as a "Modal" that pauses the game flow.

        // Update Stats
        const newStats = calculateNextState(stats, currentCard, decision);
        setStats(newStats);

        // Update Stickers
        if (decision === 'yes' && currentCard.sticker) {
            setApprovedStickers(prev => [...prev, currentCard.sticker]);
        }

        // Record Choice
        const choiceRecord = {
            cardId: currentCard.id,
            title: currentCard.title,
            decision: decision,
            type: 'choice'
        };
        const newChoices = [...choices, choiceRecord];
        setChoices(newChoices);

        // Termination Condition
        if (newStats.budget <= 0) {
            onFinish(newStats, newChoices);
            return;
        }

        if (checkGameOver(newStats)) {
            // Proceed
        }

        // Check Crisis trigger
        if (newChoices.length > 0 && newChoices.length % 5 === 0) {
            setCrisisMode(true);
            // We pause advancing card? Or advance then overlay crisis?
            // Advance card first.
            advanceCard(newChoices, newStats);
        } else {
            advanceCard(newChoices, newStats);
        }
    };

    // Helper to dismiss advisor and effectively 'retry' the swipe user intended? 
    // Actually, user swiped, we intercepted. Now they are looking at Advisor.
    // They click "Got it" to close Advisor. Then they have to swipe again. 
    // This is better for learning.

    // Crisis Handler
    const handleCrisisResolved = () => {
        setCrisisMode(false);
        // Apply crisis penalty?
        setStats(prev => ({
            ...prev,
            happiness: Math.max(0, prev.happiness - 10),
            budget: Math.max(0, prev.budget - 5)
        }));
    };

    const handlePressConferenceSubmit = (input) => {
        const currentCard = deck[currentIndex];

        // Bonus Score logic? Maybe add to Happiness/Budget or just score.
        // We'll add +5 Happiness for any feedback for now.
        const newStats = { ...stats, happiness: Math.min(100, stats.happiness + 5) };
        setStats(newStats);

        const choiceRecord = {
            cardId: currentCard.id,
            title: currentCard.title,
            decision: 'submitted',
            input: input,
            type: 'press_conference'
        };
        const newChoices = [...choices, choiceRecord];
        setChoices(newChoices);

        advanceCard(newChoices, newStats);
    };

    const advanceCard = (currentChoices, currentStats) => {
        if (currentIndex + 1 < deck.length) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Game Over / Win
            onFinish(currentStats, currentChoices);
        }
    };

    if (deck.length === 0) return <div>Loading Deck...</div>;

    const currentCard = deck[currentIndex];

    return (
        <div className="screen">
            {/* Timer Bar */}
            <div className="flex-center" style={{
                position: 'absolute', top: '1rem', right: '1rem', zIndex: 50,
                background: timeLeft < 30 ? 'rgba(239, 68, 68, 0.9)' : 'rgba(15, 23, 42, 0.8)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 700,
                transition: 'background 0.3s'
            }}>
                <Clock size={14} style={{ marginRight: '6px' }} />
                {formatTime(timeLeft)}
            </div>

            {/* CityBackground Removed per user request */}
            {/* <CityBackground approvedStickers={approvedStickers} /> */}

            {/* HUD */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <HUD stats={stats} />
            </div>

            {/* Modals Overlay */}
            <AnimatePresence>
                {showAdvisor && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0,0,0,0.85)',
                            zIndex: 200,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem', textAlign: 'center'
                        }}
                    >
                        <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-primary)' }}>
                            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <GraduationCap size={48} color="var(--color-primary)" />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>Advisor Insight</h3>
                            <h4 style={{ color: 'var(--color-primary)', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                {deck[currentIndex].advisor?.character}
                            </h4>
                            <p style={{ color: '#e2e8f0', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                "{deck[currentIndex].advisor?.text}"
                            </p>
                            <button
                                onClick={() => setShowAdvisor(false)}
                                style={{ background: 'var(--color-primary)', color: 'black', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 800 }}
                            >
                                Understood
                            </button>
                        </div>
                    </motion.div>
                )}

                {crisisMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(239, 68, 68, 0.9)',
                            zIndex: 200,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem', textAlign: 'center', color: 'white'
                        }}
                    >
                        <AlertTriangle size={64} style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase' }}>Crisis Alert!</h2>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Flash Floods Reported!</p>
                        <p style={{ opacity: 0.9, marginBottom: '2rem' }}>Happiness -10 | Budget -5 for relief efforts.</p>
                        <button
                            onClick={handleCrisisResolved}
                            style={{ background: 'white', color: '#ef4444', padding: '1rem 2rem', borderRadius: '8px', fontWeight: 800 }}
                        >
                            Mobilize Response
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Card Area */}
            <div style={{ flex: 1, position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto', zIndex: 20 }}>
                {/* Budget Alert Overlay */}
                <AnimatePresence>
                    {isShaking && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute', bottom: '10%', left: 0, right: 0,
                                textAlign: 'center', zIndex: 100
                            }}
                        >
                            <div style={{
                                display: 'inline-block',
                                background: '#ef4444',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontWeight: 600,
                                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                            }}>
                                Insufficient Funds! Reject to save budget.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <AnimatePresence mode="wait">
                        {deck[currentIndex].type === 'press_conference' ? (
                            <motion.div
                                key={deck[currentIndex].id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <PressConferenceCard
                                    card={deck[currentIndex]}
                                    onSubmit={handlePressConferenceSubmit}
                                />
                            </motion.div>
                        ) : (
                            <SwipeCard
                                key={deck[currentIndex].id}
                                card={deck[currentIndex]}
                                onSwipe={handleSwipe}
                                onAdvisorClick={() => setShowAdvisor(true)}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            {/* Progress Footer */}
            <div className="flex-center" style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                Card {currentIndex + 1} / {deck.length}
            </div>
        </div>
    );
}
