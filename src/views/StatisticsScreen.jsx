import { ArrowLeft, BarChart2, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatisticsScreen({ storedData, onBack }) {
    const history = storedData?.submissionHistory || [];

    // Aggregate Data
    // Map: cardId -> { title, yes: 0, no: 0, total: 0 }
    const cardStats = {};

    history.forEach(entry => {
        if (entry.choices) {
            entry.choices.forEach(choice => {
                // Only count 'choice' type (ignore press conferences for Y/N stats for now, or include if relevant)
                if (choice.type === 'choice') {
                    if (!cardStats[choice.cardId]) {
                        cardStats[choice.cardId] = {
                            id: choice.cardId,
                            title: choice.title,
                            yes: 0,
                            no: 0,
                            total: 0
                        };
                    }
                    if (choice.decision === 'yes') cardStats[choice.cardId].yes++;
                    if (choice.decision === 'no') cardStats[choice.cardId].no++;
                    cardStats[choice.cardId].total++;
                }
            });
        }
    });

    // Convert to array and sort by most played
    const statsArray = Object.values(cardStats).sort((a, b) => b.total - a.total);

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
                <div style={{ padding: '0 0.5rem' }}>
                    <h1 style={{ fontSize: '1.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <BarChart2 size={32} color="var(--color-primary)" />
                        Global Stats
                    </h1>
                    <p style={{ color: '#94a3b8' }}>
                        Aggregate decisions from {history.length} played sessions.
                    </p>
                </div>

                {/* Stats List */}
                <div className="flex-col" style={{ gap: '1rem', marginTop: '1rem' }}>
                    {statsArray.length === 0 ? (
                        <div style={{
                            padding: '2rem', textAlign: 'center', color: '#64748b',
                            background: '#1e293b', borderRadius: '12px', border: '1px solid #334155'
                        }}>
                            No data recorded yet. Play a game to see stats!
                        </div>
                    ) : (
                        statsArray.map((card) => {
                            const yesPercent = Math.round((card.yes / card.total) * 100) || 0;
                            const noPercent = 100 - yesPercent;

                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: '#1e293b',
                                        borderRadius: '16px',
                                        padding: '1.25rem',
                                        border: '1px solid #334155'
                                    }}
                                >
                                    <div style={{ marginBottom: '0.75rem', fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>
                                        {card.title}
                                    </div>

                                    {/* Bar */}
                                    <div style={{ display: 'flex', height: '24px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                                        <div style={{
                                            width: `${yesPercent}%`,
                                            background: 'var(--color-success)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                                            paddingLeft: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#052e16'
                                        }}>
                                            {yesPercent > 10 && `${yesPercent}%`}
                                        </div>
                                        <div style={{
                                            width: `${noPercent}%`,
                                            background: 'var(--color-danger)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                                            paddingRight: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#450a0a'
                                        }}>
                                            {noPercent > 10 && `${noPercent}%`}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }}></span>
                                            Approved ({card.yes})
                                        </div>
                                        <div>Total: {card.total}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            Rejected ({card.no})
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-danger)' }}></span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
