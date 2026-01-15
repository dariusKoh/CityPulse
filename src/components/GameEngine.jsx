import { useState, useEffect } from 'react';
import HUD from './HUD';
import SwipeCard from './SwipeCard';
import PressConferenceCard from './PressConferenceCard';
import { CARDS } from '../data/cards';
import { calculateNextState, INITIAL_STATS, checkGameOver } from '../utils/ResourceManager';
import { AnimatePresence, motion } from 'framer-motion';

export default function GameEngine({ nickname, onFinish }) {
    const [stats, setStats] = useState(INITIAL_STATS);
    const [deck, setDeck] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [choices, setChoices] = useState([]); // { cardId, decision, input? }

    useEffect(() => {
        // Determine deck. For now, just use the static list.
        setDeck(CARDS);
    }, []);

    const handleSwipe = (decision) => {
        const currentCard = deck[currentIndex];

        // Update Stats
        const newStats = calculateNextState(stats, currentCard, decision);
        setStats(newStats);

        // Record Choice
        const choiceRecord = {
            cardId: currentCard.id,
            title: currentCard.title,
            decision: decision, // 'yes' or 'no'
            type: 'choice'
        };
        const newChoices = [...choices, choiceRecord];
        setChoices(newChoices);

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
            {/* HUD */}
            <HUD stats={stats} />

            {/* Card Area */}
            <div style={{ flex: 1, position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
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
            </div>

            {/* Progress Footer */}
            <div className="flex-center" style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                Card {currentIndex + 1} / {deck.length}
            </div>
        </div>
    );
}
