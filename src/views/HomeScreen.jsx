import { format } from 'date-fns';
import { Building2, Play, Wallet, History, Gift, Trophy } from 'lucide-react';

export default function HomeScreen({ onStart, onLeaderboard, storedData }) {
    const { totalPoints, submissionHistory } = storedData || { totalPoints: 0, submissionHistory: [] };

    return (
        <div className="screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '1rem', overflowY: 'auto' }}>
            <div className="animate-fade-in w-full max-w-sm mx-auto flex-col" style={{ gap: '1.5rem', paddingBottom: '2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                    <div className="flex-center" style={{ gap: '0.75rem' }}>
                        <div style={{
                            background: 'var(--color-primary)',
                            padding: '8px',
                            borderRadius: '12px',
                            boxShadow: 'var(--shadow-glow)'
                        }}>
                            <Building2 size={24} color="white" />
                        </div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>CityPulse</h1>
                    </div>
                    <div style={{
                        background: 'var(--color-surface)',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: '1px solid #334155',
                        fontSize: '0.8rem',
                        color: '#94a3b8'
                    }}>
                        Beta v0.2
                    </div>
                </div>

                {/* Hero / Start Action */}
                <div style={{
                    background: 'linear-gradient(to right, #ffbd59, #ea580c)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    color: '#0f172a', // Dark text on bright amber
                    boxShadow: '0 10px 20px -5px rgba(255, 189, 89, 0.4)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Plan Your City</h2>
                        <p style={{ opacity: 0.9, marginBottom: '1.5rem', maxWidth: '80%' }}>Balance the budget, keep citizens happy, and audit your impact.</p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button
                                onClick={() => onStart()}
                                style={{
                                    background: '#0f172a', // Dark button on amber card
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                }}
                            >
                                <Play size={18} fill="currentColor" />
                                Start Shift
                            </button>
                            <button
                                onClick={onLeaderboard}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    padding: '0.75rem',
                                    borderRadius: '12px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(15, 23, 42, 0.3)',
                                    color: '#0f172a',
                                    marginLeft: '0.75rem'
                                }}
                            >
                                <Trophy size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* Decorative bg element */}
                <div style={{
                    position: 'absolute', right: -20, bottom: -20,
                    opacity: 0.2, transform: 'rotate(-15deg)'
                }}>
                    <Building2 size={120} />
                </div>
            </div>

            {/* Rewards Wallet */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Wallet size={18} color="var(--color-warning)" />
                    <h3 style={{ fontSize: '1.1rem' }}>Rewards Wallet</h3>
                </div>
                <div style={{ background: '#1e293b', borderRadius: '16px', border: '1px solid #334155', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8' }}>Balance</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-warning)' }}>{totalPoints.toLocaleString()} <span style={{ fontSize: '0.9rem' }}>CP</span></span>
                    </div>
                    {/* Mock Coupons */}
                    <div style={{ padding: '1rem', display: 'flex', gap: '1rem', overflowX: 'auto' }}>
                        {[
                            { name: "Coffee", cost: 500, color: "#d97706" },
                            { name: "Transit", cost: 1000, color: "#059669" },
                            { name: "Cinema", cost: 2000, color: "#7c3aed" }
                        ].map((item, i) => (
                            <div key={i} style={{
                                flex: '0 0 100px',
                                background: '#0f172a',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                opacity: totalPoints >= item.cost ? 1 : 0.5
                            }}>
                                <div style={{ background: item.color, width: '32px', height: '32px', borderRadius: '50%', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Gift size={16} color="white" />
                                </div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.cost} CP</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Audit Log */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <History size={18} color="var(--color-text-muted)" />
                    <h3 style={{ fontSize: '1.1rem' }}>Audit Log</h3>
                </div>
                <div className="flex-col" style={{ gap: '0.75rem' }}>
                    {submissionHistory.length === 0 ? (
                        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem', background: '#1e293b', borderRadius: '12px' }}>
                            No past submissions found.
                        </div>
                    ) : (
                        submissionHistory.slice(0, 5).map((entry, i) => (
                            <div key={i} style={{
                                background: '#1e293b',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid #334155',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                                        #{entry.receiptId || 'PENDING'}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                        {format(new Date(entry.date), 'MMM d, h:mm a')}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        display: 'inline-block',
                                        background: 'rgba(234, 179, 8, 0.2)',
                                        color: '#facc15',
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        padding: '2px 8px',
                                        borderRadius: '12px'
                                    }}>
                                        PENDING AUDIT
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-success)', marginTop: '4px' }}>
                                        +{entry.points} CP
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div >
    );
}
