import { Heart, Smile, Coins, Map, Meh, Frown, AlertTriangle } from 'lucide-react';
import { CRISIS_TYPES } from '../data/crisisConfig';

const ResourceBar = ({ icon: Icon, value, color, label, isAvatar }) => {
    if (isAvatar) {
        let AvatarIcon = Meh;
        let moodColor = '#fbbf24'; // Neutral/Warning
        if (value > 70) { AvatarIcon = Smile; moodColor = '#22c55e'; } // Happy
        else if (value < 40) { AvatarIcon = Frown; moodColor = '#ef4444'; } // Sad

        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</div>
                <div style={{
                    background: moodColor,
                    width: '24px', height: '24px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s'
                }}>
                    <AvatarIcon size={16} color="white" />
                </div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: moodColor }}>{value}%</div>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div className="flex-center" style={{ gap: '6px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                <Icon size={14} color={color} />
                <span>{label}</span>
            </div>
            <div style={{
                height: '8px',
                background: '#334155',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{
                    height: '100%',
                    width: `${value}%`,
                    background: color,
                    borderRadius: '4px',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
            </div>
        </div>
    );
};

const CrisisBubble = ({ crisisType }) => {
    const crisis = CRISIS_TYPES[crisisType];
    if (!crisis) return null;
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)',
            borderRadius: '12px', padding: '2px 8px', fontSize: '0.7rem', color: 'white'
        }}>
            <span>{crisis.icon}</span>
            <span style={{ fontWeight: 800 }}>{crisis.title}</span>
        </div>
    );
};

export default function HUD({ stats, activeCrises = [] }) {
    return (
        <div style={{ position: 'relative', width: '100%', marginBottom: '3.5rem', zIndex: 10 }}>
            {/* Main Stats Bar - Single Row Compact */}
            <div style={{
                background: 'rgba(30, 41, 59, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem', // Tight gap
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}>
                <ResourceBar icon={Coins} value={stats.budget} color="var(--color-warning)" label="Budget" />
                <ResourceBar icon={Map} value={stats.land} color="var(--color-success)" label="Land" />

                {/* Citizens (Avatar) */}
                <ResourceBar icon={Heart} value={stats.health} label="Citizens" isAvatar={true} />

                <ResourceBar icon={Smile} value={stats.happiness} color="var(--color-primary)" label="Happy" />
            </div>

            {/* Floating Crisis Bubbles (Below HUD) */}
            {activeCrises.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0.5rem',
                    right: 0,
                    paddingTop: '0.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    pointerEvents: 'none' // Let clicks pass through if needed
                }}>
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', gap: '3px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        <AlertTriangle size={10} /> CRITICAL
                    </div>
                    {activeCrises.map(crisisType => (
                        <div key={crisisType} style={{ pointerEvents: 'auto' }}>
                            <CrisisBubble crisisType={crisisType} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
