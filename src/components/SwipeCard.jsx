import { motion, useMotionValue, useTransform, useAnimation, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';
import { Info, Check, X, ArrowRight, ArrowLeft } from 'lucide-react';

export default function SwipeCard({ card, onSwipe, onAdvisorClick }) {
    const controls = useAnimation();
    const x = useMotionValue(0);
    const constrainedX = useTransform(x, [-200, 200], [-150, 150]);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);

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
            whileTap={{ cursor: 'grabbing', scale: 1.05 }}
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

                {/* Card Image Placeholder */}
                <div style={{
                    height: '55%',
                    background: card.color || '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
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
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{card.title}</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.5 }}>{card.description}</p>

                    <div style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ArrowLeft size={14} /> Swipe Left to Reject</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>Swipe Right to Build <ArrowRight size={14} /></span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
