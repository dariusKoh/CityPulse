import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useRef } from 'react';

export default function SwipeCard({ card, onSwipe }) {
    const controls = useAnimation();
    const x = useMotionValue(0);
    const constrainedX = useTransform(x, [-200, 200], [-150, 150]); // Limit visual range
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacityYes = useTransform(x, [50, 150], [0, 1]);
    const opacityNo = useTransform(x, [-50, -150], [0, 1]); // Note: input range is negative for left swipe

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

                {/* Card Image Placeholder */}
                <div style={{
                    height: '55%',
                    background: card.color || '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    {/* In real app, we use <img> tag. For now, color block + Icon if needed or just color. */}
                    {/* Overlays */}
                    <motion.div style={{
                        position: 'absolute', top: 20, right: 20,
                        border: '4px solid #22c55e', color: '#22c55e',
                        padding: '5px 10px', borderRadius: '8px',
                        fontWeight: 800, fontSize: '24px', transform: 'rotate(15deg)',
                        opacity: opacityYes, background: 'rgba(0,0,0,0.5)'
                    }}>
                        APPROVE
                    </motion.div>
                    <motion.div style={{
                        position: 'absolute', top: 20, left: 20,
                        border: '4px solid #ef4444', color: '#ef4444',
                        padding: '5px 10px', borderRadius: '8px',
                        fontWeight: 800, fontSize: '24px', transform: 'rotate(-15deg)',
                        opacity: opacityNo, background: 'rgba(0,0,0,0.5)'
                    }}>
                        REJECT
                    </motion.div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>{card.title}</h2>
                    <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.5 }}>{card.description}</p>

                    <div style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Swipe Right to Build</span>
                        <span>Swipe Left to Reject</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
