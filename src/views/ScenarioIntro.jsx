import { motion } from 'framer-motion';
import { Play, AlertTriangle, CloudRain, Briefcase, Zap } from 'lucide-react';

export default function ScenarioIntro({ scenario, onStart }) {
    // Icon mapping based on scenario ID or keywords
    const getIcon = () => {
        if (scenario.id === 'climate_siege') return <CloudRain size={64} color="#60a5fa" />;
        if (scenario.id === 'silver_tsunami') return <AlertTriangle size={64} color="#fbbf24" />;
        return <Briefcase size={64} color="#34d399" />; // Default/Standard
    };

    return (
        <div className="screen" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 100
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: '#1e293b',
                    padding: '2rem',
                    borderRadius: '24px',
                    border: '1px solid #334155',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginBottom: '1.5rem' }}
                >
                    <div style={{
                        padding: '1.5rem',
                        background: '#0f172a',
                        borderRadius: '50%',
                        border: '1px solid #334155',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {getIcon()}
                    </div>
                </motion.div>

                <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                    Incoming Brief
                </h2>

                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'white',
                    marginBottom: '1.5rem',
                    lineHeight: 1.1
                }}>
                    {scenario.title}
                </h1>

                <div style={{
                    background: 'rgba(15, 23, 42, 0.5)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid #334155',
                    marginBottom: '2rem',
                    textAlign: 'left',
                    width: '100%'
                }}>
                    <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {scenario.description}
                    </p>

                    {scenario.modifiers && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                                Active Modifiers
                            </div>
                            {Object.entries(scenario.modifiers).map(([key, value]) => (
                                <div key={key} style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem' }}>
                                    <Zap size={14} color="#3b82f6" style={{ marginRight: '8px' }} />
                                    <span style={{ color: '#94a3b8', textTransform: 'capitalize', marginRight: 'auto' }}>{key}: </span>
                                    <span style={{
                                        fontWeight: 700,
                                        color: value < 0 ? '#ef4444' : '#34d399'
                                    }}>
                                        {value > 0 ? '+' : ''}{value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={onStart}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'var(--color-primary)', // Assuming defined in index.css, else fallback blue
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Play size={20} fill="currentColor" />
                    Begin Planning
                </button>
            </motion.div>
        </div>
    );
}
