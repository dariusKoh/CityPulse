import { motion } from 'framer-motion';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

export default function ImpactLedger({ data, onRestart }) {
    const { entries } = data;
    const choices = data.choices || [];

    // Calculate final score or grade?
    const score = data.stats.happiness + (data.stats.budget > 0 ? 20 : 0) + (data.stats.health > 50 ? 20 : 0);

    return (
        <div className="screen" style={{ overflowY: 'auto' }}>
            <div className="animate-fade-in flex-col" style={{ gap: '1.5rem', paddingBottom: '2rem' }}>

                {/* Header */}
                <div className="text-center" style={{ marginTop: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>Mission Report</h1>
                    <p style={{ color: '#94a3b8' }}>Planner ID: <span style={{ color: 'white', fontWeight: 700 }}>{data.nickname}</span></p>
                </div>

                {/* Stats Card */}
                <div style={{
                    background: '#1e293b',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>HAPPINESS</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{data.stats.happiness}%</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>HEALTH</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-secondary)' }}>{data.stats.health}%</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>BUDGET</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warning)' }}>{data.stats.budget}%</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>LAND</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-success)' }}>{data.stats.land}%</div>
                    </div>
                </div>

                {/* Ledger */}
                <div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                        Decision Ledger
                    </h2>
                    <div className="flex-col" style={{ gap: '0.75rem' }}>
                        {choices.map((choice, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#1e293b',
                                    borderRadius: '12px',
                                    borderLeft: `4px solid ${choice.decision === 'yes' ? 'var(--color-success)' : choice.decision === 'no' ? 'var(--color-danger)' : 'var(--color-warning)'}`
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600 }}>{choice.title}</div>
                                    {choice.input && (
                                        <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic', marginTop: '4px' }}>
                                            "{choice.input}"
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {choice.decision === 'yes' && <div style={{ color: 'var(--color-success)', fontWeight: 700, fontSize: '0.8em' }}>APPROVED</div>}
                                    {choice.decision === 'no' && <div style={{ color: 'var(--color-danger)', fontWeight: 700, fontSize: '0.8em' }}>REJECTED</div>}
                                    {choice.decision === 'submitted' && <div style={{ color: 'var(--color-warning)', fontWeight: 700, fontSize: '0.8em' }}>FILED</div>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={onRestart}
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'var(--color-primary)',
                        color: 'white',
                        fontWeight: 700,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <RotateCcw size={20} />
                    Play Again
                </button>

            </div>
        </div>
    );
}
