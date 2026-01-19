import { X, BookOpen, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowToPlayModal({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                zIndex: 300,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '2rem',
                backdropFilter: 'blur(8px)'
            }}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                style={{
                    background: '#1e293b',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <BookOpen size={24} color="var(--color-primary)" />
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', margin: 0 }}>How to Play</h2>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: '#94a3b8', padding: '4px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'color 0.2s'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div style={{ padding: '2rem', overflowY: 'auto', color: '#e2e8f0', lineHeight: 1.6 }}>

                    {/* Section 1: Core Mechanics */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Smartphone size={20} />
                            Core Mechanics
                        </h3>

                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                            <strong style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>The Swipe (The Trade-off)</strong>
                            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>
                                    <strong style={{ color: '#22c55e' }}>Swipe Right (Yes):</strong> Executes the policy. Usually gains strategic resources but costs budget or environmental health.
                                </li>
                                <li>
                                    <strong style={{ color: '#ef4444' }}>Swipe Left (No):</strong> Rejects the policy. Saves money but might lead to stagnation or missed opportunities.
                                </li>
                            </ul>
                        </div>

                        <p style={{ fontSize: '0.95rem' }}>
                            <strong>The Session:</strong> A full game consists of <strong>15 Cards</strong>, representing the 15-year planning cycle of the Master Plan (2025–2040).
                        </p>
                    </div>

                    {/* Section 2: Problem-Solution Engine */}
                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertTriangle size={20} />
                            The Problem-Solution Engine
                        </h3>

                        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', padding: '1rem' }}>
                                <strong style={{ color: '#ef4444', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>The Crisis (The Lock)</strong>
                                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                                    If resources get too low, a Crisis triggers (e.g., "Heatwave"). This permanently drains stats every turn.
                                </p>
                            </div>
                            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '12px', padding: '1rem' }}>
                                <strong style={{ color: '#3b82f6', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>The Intervention (The Key)</strong>
                                <p style={{ fontSize: '0.85rem', margin: 0 }}>
                                    Find specific <strong>"Solution Cards"</strong> (e.g., District Cooling) in the deck to resolve the crisis.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Winning & Losing */}
                    <div>
                        <h3 style={{ color: '#22c55e', fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={20} />
                            Winning & Losing
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.95rem' }}>
                            <li style={{ marginBottom: '0.5rem' }}>
                                <strong>Game Over:</strong> If any resource (Budget, Land, Health, Happiness) hits <strong>0</strong>, the state collapses.
                            </li>
                            <li>
                                <strong>Victory:</strong> Survive all 15 turns. You will be graded on your <strong>ImpactLedger</strong> based on how well you balanced the trade-offs.
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer */}
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex', justifyContent: 'center'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'var(--color-primary)',
                            color: 'black',
                            border: 'none',
                            padding: '0.75rem 3rem',
                            borderRadius: '12px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}
                    >
                        Got it!
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
