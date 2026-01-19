import { Trophy, Medal, Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_LEADERS } from '../data/leaderboardData';

export default function Leaderboard({ onBack, userScore }) {
    // Dynamic Ranking Logic
    // Merge user into the list, sort, and determine rank.
    // If userScore is high, they should displace someone.

    const combinedList = [...MOCK_LEADERS, { rank: 0, name: "YOU", score: userScore, fellow: false, isUser: true }];
    // Sort descending by score
    combinedList.sort((a, b) => b.score - a.score);

    // Assign ranks
    const rankedList = combinedList.map((player, index) => ({
        ...player,
        rank: index + 1
    }));

    // Find user's new rank and the top 10 to display
    const userEntry = rankedList.find(p => p.isUser);
    const displayList = rankedList.slice(0, 10);
    const userRank = userEntry.rank;

    return (
        <div className="screen" style={{ background: '#0f172a', overflowY: 'auto' }}>
            <div className="animate-fade-in w-full max-w-md mx-auto flex-col" style={{ gap: '1rem', paddingBottom: '2rem' }}>

                {/* Nav */}
                <button
                    onClick={onBack}
                    style={{
                        position: 'sticky',
                        top: '1rem',
                        zIndex: 50,
                        alignSelf: 'flex-start',
                        color: 'white',
                        background: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(4px)',
                        width: '40px', height: '40px',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        border: '1px solid #334155',
                        marginTop: '1rem'
                    }}
                >
                    <ArrowLeft size={24} />
                </button>

                {/* Header */}
                <div className="text-center" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'inline-block', background: 'rgba(255, 189, 89, 0.2)', padding: '12px', borderRadius: '50%', marginBottom: '0.5rem' }}>
                        <Trophy size={48} color="var(--color-primary)" />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Master Planners</h1>
                    <p style={{ color: '#94a3b8' }}>Top sustainability scores this month</p>
                </div>

                {/* URA Fellow Banner */}
                <div style={{
                    background: 'linear-gradient(to right, #f59e0b, #ea580c)', // Amber to Orange
                    borderRadius: '16px',
                    padding: '1.5rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Medal size={20} /> URA Youth Fellow
                        </h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Top 3 players receive an exclusive invitation to the Co-Creation Workshop.</p>
                    </div>
                    <Star size={100} style={{ position: 'absolute', right: -20, bottom: -30, opacity: 0.2, transform: 'rotate(15deg)' }} />
                </div>

                {/* List */}
                <div className="flex-col" style={{ gap: '0.5rem' }}>
                    {displayList.map((player) => (
                        <motion.div
                            key={player.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: player.rank * 0.05 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                background: player.isUser ? 'rgba(255, 189, 89, 0.2)' : (player.rank <= 3 ? 'rgba(255, 189, 89, 0.05)' : '#1e293b'),
                                border: player.isUser ? '2px solid var(--color-primary)' : (player.rank <= 3 ? '1px solid var(--color-primary)' : '1px solid #334155'),
                                borderRadius: '12px'
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px',
                                background: player.rank <= 3 ? 'var(--color-primary)' : '#334155',
                                color: player.rank <= 3 ? '#1e293b' : '#94a3b8',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 800,
                                marginRight: '1rem',
                                fontSize: '0.9rem'
                            }}>
                                {player.rank}
                            </div>
                            <div style={{ flex: 1, fontWeight: 600, color: 'white' }}>{player.name} {player.isUser && '(YOU)'}</div>
                            <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{player.score}</div>
                        </motion.div>
                    ))}

                    {/* If user is NOT in top 10, show divider and user rank at bottom */}
                    {userRank > 10 && (
                        <>
                            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#64748b', fontSize: '0.8rem' }}>• • •</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid #475569',
                                borderRadius: '12px'
                            }}>
                                <div style={{
                                    width: '32px', height: '32px',
                                    background: '#475569',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800,
                                    marginRight: '1rem',
                                    fontSize: '0.8rem'
                                }}>
                                    {userRank}
                                </div>
                                <div style={{ flex: 1, fontWeight: 600, color: 'white' }}>YOU</div>
                                <div style={{ fontWeight: 700, color: '#94a3b8' }}>{userScore}</div>
                            </div>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
}
