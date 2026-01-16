import { useState, useEffect, useRef } from 'react';
import HUD from './HUD';
import SwipeCard from './SwipeCard';
import PressConferenceCard from './PressConferenceCard';
import { CARDS } from '../data/cards';
import { calculateNextState, INITIAL_STATS, checkGameOver } from '../utils/ResourceManager';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock } from 'lucide-react';

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
        // Budget Cap Check for 'Yes'
        if (decision === 'yes' && stats.budget <= 0) {
            // Using the previous logic: Shake if trying to spend with 0 budget.
            // BUT user also said "terminate when budget reaches 0".
            // Let's assume: If you HAVE budget and spend it to hit 0, game ends.
            // If you are AT 0 and try to spend, you can't (Shake).
            // If you Reject, game continues? Or does 0 budget mean immediate loss?
            // "ensure that the game terminates when budget reaches 0" suggests immediate stop.

            // Let's implement: If you hit 0 budget, the game ends after that move.
            // So we don't block the move that TAKES you to 0. We block moves if you are ALREADY at 0?
            // Actually, strict interpretation: "Terminates when budget reaches 0".
            // So as soon as stats.budget == 0, onFinish.
        }

        const currentCard = deck[currentIndex];

        // Check cost before applying?
        if (decision === 'yes' && currentCard.yes && currentCard.yes.budget < 0 && stats.budget <= 0) {
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        // Update Stats
        const newStats = calculateNextState(stats, currentCard, decision);
        setStats(newStats);

        // Record Choice
        const choiceRecord = {
            cardId: currentCard.id,
            title: currentCard.title,
            decision: decision,
            type: 'choice'
        };
        const newChoices = [...choices, choiceRecord];
        setChoices(newChoices);

        // Termination Condition: Budget <= 0
        // We allow the move that drops it to 0, then end.
        if (newStats.budget <= 0) {
            onFinish(newStats, newChoices);
            return;
        }

        // Check Game Over
        if (checkGameOver(newStats)) {
            // Simple alert or status for now? Or just end.
            // Let's just proceed. If 0, they might fail later.
        }

        // Next Card
        advanceCard(newChoices, newStats);
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

            {/* HUD */}
            <HUD stats={stats} />

            {/* Card Area */}
            <div style={{ flex: 1, position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
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
                        {currentCard.type === 'press_conference' ? (
                            <motion.div
                                key={currentCard.id}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <PressConferenceCard
                                    card={currentCard}
                                    onSubmit={handlePressConferenceSubmit}
                                />
                            </motion.div>
                        ) : (
                            <SwipeCard
                                key={currentCard.id}
                                card={currentCard}
                                onSwipe={handleSwipe}
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
