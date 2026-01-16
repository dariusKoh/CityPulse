import { Heart, Smile, Coins, Map, Meh, Frown } from 'lucide-react';

const ResourceBar = ({ icon: Icon, value, color, label, isAvatar }) => {
    if (isAvatar) {
        let AvatarIcon = Meh;
        let moodColor = '#fbbf24'; // Neutral/Warning
        if (value > 70) { AvatarIcon = Smile; moodColor = '#22c55e'; } // Happy
        else if (value < 40) { AvatarIcon = Frown; moodColor = '#ef4444'; } // Sad

        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>{label}</div>
                <div style={{
                    background: moodColor,
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s'
                }}>
                    <AvatarIcon size={20} color="white" />
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

export default function HUD({ stats }) {
    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '1rem',
            borderRadius: '16px',
            margin: '0 0 1rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr', // 3 cols for layout balance? Or sticking to 2x2. Let's try flexible.
            gap: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            alignItems: 'end'
        }}>
            <div style={{ gridColumn: 'span 3', display: 'flex', gap: '1rem' }}>
                <ResourceBar icon={Coins} value={stats.budget} color="var(--color-warning)" label="Budget" />
                <ResourceBar icon={Map} value={stats.land} color="var(--color-success)" label="Land" />
            </div>
            <div style={{ gridColumn: 'span 3', display: 'flex', gap: '1rem', borderTop: '1px solid #334155', paddingTop: '1rem' }}>
                <ResourceBar icon={Heart} value={stats.health} label="Citizens" isAvatar={true} />
                <ResourceBar icon={Smile} value={stats.happiness} color="var(--color-primary)" label="Happiness" />
            </div>
        </div>
    );
}
