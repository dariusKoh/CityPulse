import { motion, useMotionValue, useTransform, useAnimation, useMotionTemplate } from 'framer-motion';
import { useRef, useState } from 'react';
import { Info, Check, X, ArrowRight, ArrowLeft, MessageSquarePlus } from 'lucide-react';

export default function SwipeCard({ card, onSwipe, onAdvisorClick, isBonusActive, onBonusSubmit }) {
    const controls = useAnimation();
    const x = useMotionValue(0);
    const constrainedX = useTransform(x, [-200, 200], [-150, 150]);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const [bonusText, setBonusText] = useState('');

    // Radial Reveal Logic
    const yesRadius = useTransform(x, [0, 150], [0, 150]);
    const yesClipPath = useMotionTemplate`circle(${yesRadius}% at 0% 100%)`; // Bottom Left corner

    const noRadius = useTransform(x, [0, -150], [0, 150]);
    const noClipPath = useMotionTemplate`circle(${noRadius}% at 100% 100%)`; // Bottom Right corner

    const handleDragEnd = async (event, info) => {
        const threshold = 100;
        const velocity = info.velocity.x;

        if (info.offset.x > threshold || velocity > 500) {
            await controls.start({ x: 500, opacity: 0, transition: { duration: 0.2 } });
            onSwipe('yes');
        } else if (info.offset.x < -threshold || velocity < -500) {
            await controls.start({ x: -500, opacity: 0, transition: { duration: 0.2 } });
            onSwipe('no');
        } else {
            controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } });
        }
    };

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{
                x,
                rotate,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'grab',
                zIndex: 10
            }}
            whileTap={{ cursor: 'grabbing' }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                background: '#1e293b',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #334155'
            }}>

                {/* Optional Advisor Button */}
                {card.advisor && (
                    <button
                        onPointerDown={(e) => e.stopPropagation()} // Stop drag
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdvisorClick && onAdvisorClick();
                        }}
                        style={{
                            position: 'absolute', top: '15px', right: '15px',
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(4px)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            width: '36px', height: '36px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 50,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                    >
                        <Info size={20} />
                    </button>
                )}

                {/* Solution Card Badge REMOVED for Difficulty */}

                {/* Card Image Placeholder */}
                <div style={{
                    height: isBonusActive ? '45%' : '55%', // Shrink image if bonus active
                    background: card.color || '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'height 0.3s ease'
                }}>
                    {/* Visual Feedback Overlays - Radial Reveal */}

                    {/* Yes / Check / Green - Expands from Bottom Left */}
                    <motion.div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(34, 197, 94, 0.9)', // More opaque for solid fill feel
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 20,
                        clipPath: yesClipPath
                    }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'white', borderRadius: '50%', padding: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                            <Check size={48} color="#16a34a" strokeWidth={3} />
                        </div>
                    </motion.div>

                    {/* No / Cross / Red - Expands from Bottom Right */}
                    <motion.div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(239, 68, 68, 0.9)', // More opaque
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 20,
                        clipPath: noClipPath
                    }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: 'white', borderRadius: '50%', padding: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
                            <X size={48} color="#dc2626" strokeWidth={3} />
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{card.title}</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>{card.description}</p>

                    {/* Bonus Section */}
                    {isBonusActive && (
                        <div
                            onPointerDown={(e) => e.stopPropagation()} // Important: Stop drag to allow interaction
                            style={{
                                marginTop: '0.5rem',
                                padding: '0.75rem',
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                                border: '1px solid rgba(59, 130, 246, 0.4)',
                                borderRadius: '12px'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                    <MessageSquarePlus size={16} />
                                    CITIZEN VOICE
                                </div>
                                <div style={{
                                    background: 'rgba(34, 197, 94, 0.2)',
                                    color: '#22c55e',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontSize: '0.75rem',
                                    fontWeight: 700
                                }}>
                                    +100 CP
                                </div>
                            </div>
                            <div style={{
                                fontSize: '0.7rem',
                                color: '#94a3b8',
                                marginBottom: '0.5rem',
                                fontStyle: 'italic'
                            }}>
                                Your input helps shape the Youth Action Plan
                            </div>
                            <input
                                type="text"
                                placeholder="Share your thoughts on this policy..."
                                value={bonusText}
                                onChange={(e) => setBonusText(e.target.value)}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    border: '1px solid #334155',
                                    color: 'white',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    marginBottom: '0.5rem'
                                }}
                            />
                            <button
                                onClick={() => {
                                    if (bonusText.trim()) {
                                        onBonusSubmit(bonusText);
                                        setBonusText(''); // Clear
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                }}
                            >
                                Submit Feedback
                            </button>
                        </div>
                    )}

                    {!isBonusActive && (
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowLeft size={14} /> Reject</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Build <ArrowRight size={14} /></span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
