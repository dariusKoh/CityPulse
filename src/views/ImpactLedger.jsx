import { motion } from 'framer-motion';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

export default function ImpactLedger({ data, onRestart }) {
    const { entries } = data;
    const choices = data.choices || [];

    // Calculate final score or grade?
    const score = data.stats.happiness + (data.stats.budget > 0 ? 20 : 0) + (data.stats.health > 50 ? 20 : 0);

    return (
        <div className="screen" style={{ overflowY: 'auto' }}>
            <div className="animate-fade-in flex-col" style={{ gap: '1.5rem', paddingBottom: '2rem' }}>

                {/* Receipt Card */}
                <div style={{
                    background: '#f8fafc',
                    color: '#0f172a',
                    padding: '1.5rem',
                    borderRadius: '6px',
                    fontFamily: '"Courier New", Courier, monospace',
                    position: 'relative',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.5)'
                }}>
                    {/* Perforation visual at bottom */}
                    <div style={{
                        position: 'absolute', bottom: -5, left: 0, right: 0, height: '10px',
                        background: 'radial-gradient(circle, transparent 50%, #0f172a 50%)',
                        backgroundSize: '20px 20px',
                        transform: 'rotate(180deg)'
                    }} />

                    <div style={{ textAlign: 'center', borderBottom: '2px dashed #94a3b8', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase' }}>Official Receipt</h3>
                        <div style={{ fontSize: '0.8rem' }}>MND / URA PROTOTYPE</div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{new Date().toLocaleString()}</div>
                        <div style={{ fontSize: '0.9rem' }}>ID: {data.receiptId || 'PENDING'}</div>
                    </div>

                    <table style={{ width: '100%', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        <tbody>
                            <tr>
                                <td style={{ padding: '4px 0' }}>Citizens Served (Happy)</td>
                                <td style={{ textAlign: 'right', fontWeight: 700 }}>{data.stats.happiness}%</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '4px 0' }}>Health Index</td>
                                <td style={{ textAlign: 'right', fontWeight: 700 }}>{data.stats.health}%</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '4px 0' }}>Budget Remaining</td>
                                <td style={{ textAlign: 'right', fontWeight: 700 }}>${data.stats.budget}M</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={{
                        borderTop: '2px dashed #94a3b8',
                        paddingTop: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 800, fontSize: '1.1rem'
                    }}>
                        <span>TOTAL POINTS</span>
                        <span>{data.pointsEarned || 850} CP</span>
                    </div>

                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <span style={{
                            background: '#facc15',
                            color: '#854d0e',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            border: '2px solid #854d0e',
                            transform: 'rotate(-5deg)',
                            display: 'inline-block'
                        }}>
                            PENDING AUDIT
                        </span>
                    </div>
                </div>

                {/* Return Button */}
                <button
                    onClick={onRestart}
                    style={{
                        marginTop: '1rem',
                        width: '100%',
                        padding: '1rem',
                        background: 'var(--color-primary)',
                        color: 'white',
                        fontWeight: 700,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <RotateCcw size={20} />
                    Return to Home
                </button>

            </div>
        </div>
    );
}
