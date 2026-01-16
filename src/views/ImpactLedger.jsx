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

                {/* Transparency Portal (formerly Decision Ledger) */}
                <div>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Transparency Portal <span style={{ fontSize: '0.8rem', background: '#334155', padding: '2px 6px', borderRadius: '4px' }}>PUBLIC ACCESS</span>
                    </h2>
                    <div className="flex-col" style={{ gap: '1rem' }}>
                        {choices.map((choice, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                style={{
                                    background: '#1e293b',
                                    borderRadius: '12px',
                                    borderLeft: `4px solid ${choice.decision === 'yes' ? 'var(--color-success)' : choice.decision === 'no' ? 'var(--color-danger)' : 'var(--color-warning)'}`,
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #334155' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 600 }}>{choice.title}</div>
                                        <div style={{ fontSize: '0.8rem', marginTop: '2px', opacity: 0.7 }}>
                                            ACTION: {choice.decision.toUpperCase()}
                                        </div>
                                    </div>
                                    {choice.decision === 'yes' ? <Check size={18} color="var(--color-success)" /> :
                                        choice.decision === 'no' ? <X size={18} color="var(--color-danger)" /> : null}
                                </div>

                                {/* Mock URA Reply */}
                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', fontSize: '0.85rem' }}>
                                    <div style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        URA PLANNER REPLY
                                    </div>
                                    <div style={{ color: '#cbd5e1', fontStyle: 'italic' }}>
                                        {choice.type === 'press_conference'
                                            ? "Thank you for this feedback. We will incorporate this into our next Master Plan review."
                                            : choice.decision === 'yes'
                                                ? "This proposal aligns with our 2025 sustainability goals. Proceed with feasibility study."
                                                : "Noted. We will explore alternative sites for this facility."}
                                    </div>
                                    {choice.type === 'press_conference' && choice.input && (
                                        <div style={{ marginTop: '0.5rem', borderTop: '1px dashed #475569', paddingTop: '0.5rem', opacity: 0.6 }}>
                                            submission: "{choice.input}"
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Return Button */}
                <button
                    onClick={onRestart}
                    style={{
                        marginTop: '1rem',
                        width: '100%',
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
                    Return to Home
                </button>

            </div>
        </div>
    );
}
