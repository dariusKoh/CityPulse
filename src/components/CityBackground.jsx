import { Building2, Trees, Car, Factory, Stethoscope, ShoppingBag, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

// Map sticker names to Icons
const STICKER_MAP = {
    'bike': Trees,
    'mall': ShoppingBag,
    'hospital': Stethoscope,
    'factory': Factory,
    'building': Building2,
    'tree': Trees,
    'road': Car,
    'stadium': Trophy
};

// Predefined slots for visual growth "Sticker Book" style
// We'll just randomly fill slots or have fixed slots.
const SLOTS = [
    { top: '60%', left: '10%', scale: 1.2, rotate: -5 },
    { top: '55%', left: '80%', scale: 1.1, rotate: 5 },
    { top: '70%', left: '30%', scale: 1.5, rotate: 0 },
    { top: '65%', left: '70%', scale: 1.3, rotate: 10 },
    { top: '50%', left: '40%', scale: 1.0, rotate: -10 },
    { top: '75%', left: '60%', scale: 1.4, rotate: 2 },
    { top: '45%', left: '20%', scale: 0.9, rotate: -8 },
    { top: '80%', left: '15%', scale: 1.1, rotate: 3 },
];

export default function CityBackground({ approvedStickers = [] }) {
    return (
        <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            overflow: 'hidden',
            pointerEvents: 'none', // Ensure it doesn't block swipes
            zIndex: 0 // Behind everything
        }}>
            {/* Base Skyline Silhouette (Optional) */}
            <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: '30%',
                background: 'linear-gradient(to top, #0f172a 0%, transparent 100%)',
                opacity: 0.8
            }} />

            {approvedStickers.map((stickerName, index) => {
                const Icon = STICKER_MAP[stickerName] || Building2;
                // Cycle through slots
                const slot = SLOTS[index % SLOTS.length];

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0, y: 50 }}
                        animate={{ opacity: 0.4, scale: slot.scale, y: 0 }}
                        style={{
                            position: 'absolute',
                            top: slot.top,
                            left: slot.left,
                            color: '#e2e8f0', // Neutral color, lets theme shine
                            transform: `rotate(${slot.rotate}deg)`,
                            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))'
                        }}
                    >
                        <Icon size={48} />
                    </motion.div>
                );
            })}
        </div>
    );
}
