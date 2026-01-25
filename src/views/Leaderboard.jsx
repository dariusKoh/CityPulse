import { useState } from 'react';
import { Trophy, Medal, Star, ArrowLeft, MapPin, GraduationCap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_LEADERS, MOCK_REGIONAL_LEADERS, MOCK_SCHOOL_LEADERS } from '../data/leaderboardData';

export default function Leaderboard({ onBack, userScore, playerData }) {
    const [activeTab, setActiveTab] = useState('global');

    // --- Data Processing ---
    const getGlobalList = () => {
        const combined = [...MOCK_LEADERS, { rank: 0, name: "YOU", score: userScore, fellow: false, isUser: true }];
        return combined.sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));
    };

    const getRegionalList = () => {
        return MOCK_REGIONAL_LEADERS.map((p) => {
            const isUserRegion = p.name === playerData?.region;
            return {
                ...p,
                isUserRegion,
                score: p.score + (isUserRegion ? userScore : 0)
            };
        }).sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));
    };

    const getSchoolList = () => {
        return MOCK_SCHOOL_LEADERS.map((p) => {
            const isUserSchool = p.name === playerData?.school;
            return {
                ...p,
                isUserSchool,
                score: p.score + (isUserSchool ? userScore : 0)
            };
        }).sort((a, b) => b.score - a.score).map((p, i) => ({ ...p, rank: i + 1 }));
    };

    const globalList = getGlobalList();
    const regionalList = getRegionalList();
    const schoolList = getSchoolList();

    const renderList = () => {
        if (activeTab === 'global') {
            const displayList = globalList.slice(0, 10);
            return displayList.map((player) => (
                <LeaderboardRow
                    key={player.name}
                    player={player}
                    isHighlighted={player.isUser}
                    label={player.name === 'YOU' ? 'YOU' : player.name}
                />
            ));
        } else if (activeTab === 'regional') {
            return regionalList.map(player => (
                <LeaderboardRow
                    key={player.name}
                    player={player}
                    isHighlighted={player.isUserRegion}
                    label={player.name}
                    subLabel={player.isUserRegion ? '(Your Community)' : null}
                />
            ));
        } else { // school
            return schoolList.map(player => (
                <LeaderboardRow
                    key={player.name}
                    player={player}
                    isHighlighted={player.isUserSchool}
                    label={player.name}
                    subLabel={player.isUserSchool ? '(Your School)' : null}
                />
            ));
        }
    };

    // Determine the Sticky Row content
    let stickyRowContent = null;

    if (activeTab === 'global') {
        const userEntry = globalList.find(p => p.isUser);
        if (userEntry) {
            stickyRowContent = (
                <LeaderboardRow
                    player={{ ...userEntry, name: 'YOU' }}
                    isHighlighted={true}
                    label="YOU"
                    isSticky={true}
                />
            );
        }
    } else if (activeTab === 'regional') {
        const userRegionEntry = regionalList.find(p => p.isUserRegion);
        if (userRegionEntry) {
            stickyRowContent = (
                <LeaderboardRow
                    player={userRegionEntry}
                    isHighlighted={true}
                    label={userRegionEntry.name}
                    subLabel="(Your Community)"
                    isSticky={true}
                />
            );
        }
    } else if (activeTab === 'school') {
        const userSchoolEntry = schoolList.find(p => p.isUserSchool);
        if (userSchoolEntry) {
            stickyRowContent = (
                <LeaderboardRow
                    player={userSchoolEntry}
                    isHighlighted={true}
                    label={userSchoolEntry.name}
                    subLabel="(Your School)"
                    isSticky={true}
                />
            );
        }
    }

    return (
        <div className="screen" style={{
            background: '#0f172a',
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '480px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 0 50px rgba(0,0,0,0.5)' // Match root shadow
        }}>
            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', paddingBottom: '1rem', width: '100%', scrollbarWidth: 'none' }}>
                <div className="animate-fade-in w-full max-w-md mx-auto flex-col" style={{ gap: '1rem', paddingBottom: stickyRowContent ? '8rem' : '2rem' }}>

                    {/* Nav */}
                    <button
                        onClick={onBack}
                        style={{
                            position: 'sticky',
                            top: '0',
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
                            marginTop: '0'
                        }}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    {/* Header */}
                    <div className="text-center" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'inline-block', background: 'rgba(255, 189, 89, 0.2)', padding: '12px', borderRadius: '50%', marginBottom: '0.5rem' }}>
                            <Trophy size={48} color="var(--color-primary)" />
                        </div>
                        <h1 style={{ fontSize: '1.8rem', color: 'white' }}>Leaderboards</h1>
                        <p style={{ color: '#94a3b8' }}>See how your community compares</p>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', background: '#1e293b', padding: '4px', borderRadius: '12px', marginBottom: '1rem' }}>
                        <TabButton active={activeTab === 'global'} onClick={() => setActiveTab('global')} icon={<Globe size={16} />} label="Global" />
                        <TabButton active={activeTab === 'regional'} onClick={() => setActiveTab('regional')} icon={<MapPin size={16} />} label="Regional" />
                        <TabButton active={activeTab === 'school'} onClick={() => setActiveTab('school')} icon={<GraduationCap size={16} />} label="School" />
                    </div>

                    {/* URA Fellow Banner (Only on Global) */}
                    {activeTab === 'global' && (
                        <div style={{
                            background: 'linear-gradient(to right, #f59e0b, #ea580c)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Medal size={20} /> URA Youth Fellow
                                </h3>
                                <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Top 3 players receive an exclusive invitation to the Co-Creation Workshop.</p>
                            </div>
                            <Star size={100} style={{ position: 'absolute', right: -20, bottom: -30, opacity: 0.2, transform: 'rotate(15deg)' }} />
                        </div>
                    )}

                    {/* List */}
                    <div className="flex-col" style={{ gap: '0.5rem' }}>
                        {renderList()}

                        {/* Spacer if User > 10 in global so loop doesn't end abruptly before footer space? 
                             Already added paddingBottom to container.
                         */}
                        {activeTab === 'global' && globalList.length > 10 && (
                            <div style={{ textAlign: 'center', margin: '1rem 0', color: '#64748b', fontSize: '0.8rem' }}>• • •</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            {stickyRowContent && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'linear-gradient(to top, #0f172a 90%, transparent)',
                    zIndex: 100, // Ensure it sits on top
                }}>
                    <div className="w-full max-w-md mx-auto">
                        {stickyRowContent}
                    </div>
                </div>
            )}
        </div>
    );
}

function TabButton({ active, onClick, icon, label }) {
    return (
        <button
            onClick={onClick}
            style={{
                flex: 1,
                padding: '8px 4px',
                borderRadius: '8px',
                background: active ? 'var(--color-primary)' : 'transparent',
                color: active ? '#1e293b' : '#94a3b8',
                fontWeight: active ? 700 : 500,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                transition: 'all 0.2s'
            }}
        >
            {icon} {label}
        </button>
    );
}

function LeaderboardRow({ player, isHighlighted, label, subLabel, isSticky }) {
    return (
        <motion.div
            initial={isSticky ? { opacity: 0, y: 20 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isSticky ? 0.2 : player.rank * 0.05 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: isHighlighted ? 'rgba(255, 189, 89, 0.2)' : (player.rank <= 3 ? 'rgba(255, 189, 89, 0.05)' : '#1e293b'),
                border: isHighlighted ? '2px solid var(--color-primary)' : (player.rank <= 3 ? '1px solid var(--color-primary)' : '1px solid #334155'),
                borderRadius: '12px',
                boxShadow: isSticky ? '0 -4px 20px rgba(0,0,0,0.5)' : 'none',
                transform: isSticky ? 'translateZ(0)' : 'none' // Force hardware accel for sticky
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
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, color: 'white' }}>{label}</span>
                {subLabel && <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>{subLabel}</span>}
            </div>
            <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{player.score.toLocaleString()}</div>
        </motion.div>
    );
}
