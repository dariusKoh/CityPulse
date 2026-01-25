import { useState, useEffect } from 'react';
import { ArrowLeft, Gift, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REWARDS = [
    { id: 1, name: "Cold Brew Coffee", cost: 5000, color: "#d97706", icon: "☕", description: "redeem at any partner cafe" },
    { id: 2, name: "$5 Transit Voucher", cost: 10000, color: "#059669", icon: "🚌", description: "via EZ-Link app" },
    { id: 3, name: "Cinema Ticket", cost: 20000, color: "#7c3aed", icon: "🎬", description: "weekend standard seat" },
    { id: 4, name: "Tree Planting", cost: 50000, color: "#16a34a", icon: "🌳", description: "plant a tree in your name" },
    { id: 5, name: "Exclusive Merch", cost: 75000, color: "#db2777", icon: "👕", description: "limited edition tee" },
    { id: 6, name: "Workshop Pass", cost: 100000, color: "#2563eb", icon: "🎟️", description: "urban planning masterclass" },
];

export default function RewardsScreen({ onBack, userScore, onClaimReward }) {
    const [claimedRewards, setClaimedRewards] = useState([]);
    const [selectedReward, setSelectedReward] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [redeemedItem, setRedeemedItem] = useState(null); // Success state

    // Load claimed rewards from session storage for persistence in this session
    useEffect(() => {
        const stored = sessionStorage.getItem('claimed_rewards');
        if (stored) {
            setClaimedRewards(JSON.parse(stored));
        }
    }, []);

    const handleClaim = (reward) => {
        if (userScore < reward.cost) return; // Should be disabled anyway
        setSelectedReward(reward);
    };

    const confirmClaim = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const newClaimed = [...claimedRewards, selectedReward.id];
            setClaimedRewards(newClaimed);
            sessionStorage.setItem('claimed_rewards', JSON.stringify(newClaimed));

            // Notify parent to deduct score (if enabled) or just mock it here
            if (onClaimReward) onClaimReward(selectedReward.cost);

            // Show Success Screen
            setRedeemedItem(selectedReward);

            setIsProcessing(false);
            setSelectedReward(null);
        }, 1500);
    };

    const closeSuccess = () => {
        setRedeemedItem(null);
    };

    return (
        <div className="screen" style={{ background: '#0f172a', overflowY: 'auto', padding: '1.5rem' }}>
            <div className="animate-fade-in w-full max-w-md mx-auto flex-col" style={{ gap: '1.5rem', paddingBottom: '2rem' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={onBack}
                        style={{
                            background: 'rgba(51, 65, 85, 0.5)',
                            color: 'white',
                            border: '1px solid #334155',
                            width: '40px', height: '40px',
                            borderRadius: '12px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Rewards Shop</h1>
                </div>

                {/* Wallet Card */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    border: '1px solid #334155',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '4px' }}>Available Balance</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>
                            {userScore.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Citizen Points (CP)</div>
                    </div>
                    <div style={{
                        background: 'rgba(255, 189, 89, 0.1)',
                        padding: '12px',
                        borderRadius: '50%',
                        color: 'var(--color-primary)'
                    }}>
                        <ShoppingBag size={32} />
                    </div>
                </div>

                {/* Grid */}
                <h3 style={{ fontSize: '1.1rem', color: 'white' }}>Redeem Rewards</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {MOCK_REWARDS.map(reward => {
                        const canAfford = userScore >= reward.cost;
                        const isClaimed = claimedRewards.includes(reward.id);

                        return (
                            <div key={reward.id} style={{
                                background: '#1e293b',
                                borderRadius: '16px',
                                padding: '1rem',
                                border: '1px solid #334155',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                opacity: !canAfford && !isClaimed ? 0.6 : 1,
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    borderRadius: '12px',
                                    background: reward.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.5rem'
                                }}>
                                    {reward.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.2, marginBottom: '4px' }}>
                                        {reward.name}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                        {reward.description}
                                    </div>
                                </div>

                                {isClaimed ? (
                                    <button disabled style={{
                                        background: '#059669',
                                        color: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '8px',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        border: 'none',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                                        cursor: 'default'
                                    }}>
                                        <CheckCircle size={14} /> Claimed
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleClaim(reward)}
                                        disabled={!canAfford}
                                        style={{
                                            background: canAfford ? 'white' : 'rgba(255,255,255,0.1)',
                                            color: canAfford ? '#0f172a' : '#64748b',
                                            padding: '0.5rem',
                                            borderRadius: '8px',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            border: 'none',
                                            cursor: canAfford ? 'pointer' : 'not-allowed'
                                        }}
                                    >
                                        {reward.cost.toLocaleString()} CP
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Claim Modal */}
                <AnimatePresence>
                    {selectedReward && (
                        <div style={{
                            position: 'fixed', inset: 0, zIndex: 100,
                            background: 'rgba(0,0,0,0.8)',
                            display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
                        }}>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                style={{
                                    background: '#1e293b',
                                    width: '100%',
                                    maxWidth: '480px',
                                    borderTopLeftRadius: '24px',
                                    borderTopRightRadius: '24px',
                                    padding: '2rem'
                                }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '80px', height: '80px', borderRadius: '20px',
                                        background: selectedReward.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '2.5rem', marginBottom: '0.5rem'
                                    }}>
                                        {selectedReward.icon}
                                    </div>
                                    <h2 style={{ fontSize: '1.5rem' }}>Confirm Redemption?</h2>
                                    <p style={{ color: '#94a3b8' }}>
                                        Are you sure you want to spend <span style={{ color: 'white', fontWeight: 700 }}>{selectedReward.cost.toLocaleString()} CP</span> to redeem <span style={{ color: 'white', fontWeight: 700 }}>{selectedReward.name}</span>?
                                    </p>

                                    <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '1rem' }}>
                                        <button
                                            onClick={() => setSelectedReward(null)}
                                            style={{
                                                flex: 1, padding: '1rem', borderRadius: '12px',
                                                background: '#334155', color: 'white', fontWeight: 600
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmClaim}
                                            disabled={isProcessing}
                                            style={{
                                                flex: 1, padding: '1rem', borderRadius: '12px',
                                                background: 'var(--color-primary)', color: '#0f172a', fontWeight: 700,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                            }}
                                        >
                                            {isProcessing ? 'Processing...' : 'Confirm'}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Success Screen Overlay */}
                <AnimatePresence>
                    {redeemedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 150,
                                background: '#0f172a',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                padding: '2rem'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', damping: 15 }}
                                style={{
                                    width: '120px', height: '120px', borderRadius: '30px',
                                    background: redeemedItem.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '4rem', marginBottom: '2rem',
                                    boxShadow: `0 0 60px ${redeemedItem.color}80`
                                }}
                            >
                                {redeemedItem.icon}
                            </motion.div>

                            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', textAlign: 'center' }}>
                                Redeemed!
                            </h1>
                            <p style={{ color: '#94a3b8', textAlign: 'center', maxWidth: '300px', marginBottom: '3rem', fontSize: '1.1rem' }}>
                                You have successfully claimed <strong style={{ color: 'white' }}>{redeemedItem.name}</strong>.
                            </p>

                            <div style={{
                                background: '#1e293b',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                width: '100%',
                                maxWidth: '320px',
                                textAlign: 'center',
                                border: '1px dashed #475569',
                                marginBottom: '2rem'
                            }}>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Redemption Code</p>
                                <div style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '2px', color: 'var(--color-primary)' }}>
                                    CP-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                                </div>
                            </div>

                            <button
                                onClick={closeSuccess}
                                style={{
                                    background: 'white',
                                    color: '#0f172a',
                                    padding: '1rem 3rem',
                                    borderRadius: '16px',
                                    fontWeight: 800,
                                    fontSize: '1.1rem',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
                                }}
                            >
                                Awesome!
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
