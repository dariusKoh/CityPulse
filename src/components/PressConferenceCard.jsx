import { useState } from 'react';
import { Send, MapPin } from 'lucide-react';

export default function PressConferenceCard({ card, onSubmit, onSkip }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmit(input.trim());
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 20,
            background: '#1e293b',
            borderRadius: '24px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
            border: '1px solid #f59e0b' // Amber border for special event
        }}>
            {/* Header Image/Banner */}
            <div style={{
                height: '35%',
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                padding: '1rem',
                textAlign: 'center'
            }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '50%', marginBottom: '0.5rem' }}>
                    <MapPin size={32} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>PRESS CONFERENCE</h2>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Make your voice heard!</div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: 1.4, fontWeight: 600 }}>
                    "{card.description}"
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your suggestion here..."
                        style={{
                            width: '100%',
                            flex: 1,
                            padding: '1rem',
                            borderRadius: '12px',
                            border: '1px solid #334155',
                            background: '#0f172a',
                            color: 'white',
                            resize: 'none',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        style={{
                            padding: '1rem',
                            background: input.trim() ? '#f59e0b' : '#334155',
                            color: input.trim() ? '#fff' : '#94a3b8',
                            borderRadius: '12px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: input.trim() ? 'pointer' : 'default'
                        }}
                    >
                        Submit Proposal (+{card.bonusScore})
                        <Send size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={onSkip}
                        style={{
                            padding: '0.8rem',
                            background: 'transparent',
                            color: '#94a3b8',
                            border: '1px solid #334155',
                            borderRadius: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => { e.target.style.background = 'rgba(239, 68, 68, 0.1)'; e.target.style.color = '#ef4444'; e.target.style.borderColor = '#ef4444'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#94a3b8'; e.target.style.borderColor = '#334155'; }}
                    >
                        Skip Press Conference
                    </button>
                </form>
            </div>
        </div>
    );
}
