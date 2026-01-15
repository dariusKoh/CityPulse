import { useState } from 'react';
import { Building2, ArrowRight } from 'lucide-react';

export default function StartScreen({ onStart }) {
    const [nickname, setNickname] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nickname.trim()) {
            onStart(nickname.trim());
        }
    };

    return (
        <div className="screen flex-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
            <div className="animate-fade-in w-full max-w-sm flex-col" style={{ gap: '2rem' }}>

                {/* Header */}
                <div className="text-center">
                    <div className="flex-center" style={{ marginBottom: '1rem' }}>
                        <div style={{
                            background: 'var(--color-primary)',
                            padding: '12px',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-glow)'
                        }}>
                            <Building2 size={48} color="white" />
                        </div>
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        background: 'linear-gradient(to right, #60a5fa, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '0.5rem'
                    }}>
                        CityPulse
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        Design the future. Balance the costs.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-col" style={{ gap: '1rem' }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: 'var(--color-text-muted)'
                        }}>
                            YOUR PLANNER ID
                        </label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Enter your nickname..."
                            style={{
                                width: '100%',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #334155',
                                background: '#1e293b',
                                color: 'white',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={(e) => e.target.style.borderColor = '#334155'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!nickname.trim()}
                        style={{
                            padding: '1rem',
                            background: nickname.trim() ? 'var(--color-primary)' : '#334155',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginTop: '1rem',
                            cursor: nickname.trim() ? 'pointer' : 'not-allowed',
                            opacity: nickname.trim() ? 1 : 0.7
                        }}
                    >
                        Start Planning
                        <ArrowRight size={20} />
                    </button>
                </form>

            </div>
        </div>
    );
}
