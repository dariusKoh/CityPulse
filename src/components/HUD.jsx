import { Heart, Smile, Coins, Map } from 'lucide-react';

const ResourceBar = ({ icon: Icon, value, color, label }) => (
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

export default function HUD({ stats }) {
    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '1rem',
            borderRadius: '16px',
            margin: '0 0 1rem 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}>
            <ResourceBar icon={Coins} value={stats.budget} color="var(--color-warning)" label="Budget" />
            <ResourceBar icon={Map} value={stats.land} color="var(--color-success)" label="Land" />
            <ResourceBar icon={Heart} value={stats.health} color="var(--color-secondary)" label="Health" />
            <ResourceBar icon={Smile} value={stats.happiness} color="var(--color-primary)" label="Joy" />
        </div>
    );
}
