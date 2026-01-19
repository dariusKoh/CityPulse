import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import MoodLighting from './3d/MoodLighting';
import Buildings from './3d/Buildings';
import Ground from './3d/Ground';
import CrisisEffects from './3d/CrisisEffects';

/**
 * 3D City Visualization Component
 * 
 * Displays a procedurally generated city that evolves as players approve cards.
 * The city's atmosphere reflects the current game statistics:
 * - Happiness → Sky color (warm/cold)
 * - Health → Fog/clarity
 * - Budget → Building glow intensity
 * - Land → Ground appearance
 * 
 * @param {string[]} approvedStickers - Array of sticker names from approved cards
 * @param {object} stats - Current game stats { budget, land, health, happiness }
 * @param {boolean} isPlaying - Whether the game is actively playing (pauses rotation during modals)
 * @param {string|null} crisisType - Current crisis type ('flood', 'heatwave', or null)
 * @param {boolean} isShowcaseMode - When true, city is in full view without UI overlay
 */
export default function City3D({
    approvedStickers = [],
    stats = { budget: 50, land: 50, health: 50, happiness: 50 },
    isPlaying = true,
    crisisType = null,
    isShowcaseMode = false
}) {
    // State for selected building info
    const [selectedBuilding, setSelectedBuilding] = useState(null);

    // Clear popup when exiting showcase mode
    useEffect(() => {
        if (!isShowcaseMode) {
            setSelectedBuilding(null);
        }
    }, [isShowcaseMode]);

    // Responsive Camera Logic
    const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);

    useEffect(() => {
        const handleResize = () => setAspect(window.innerWidth / window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Aspect Ratio Adjustment
    // In portrait (aspect < 1), we need to pull back to fit the same horizontal width.
    // The factor is roughly 1/aspect.
    const basePos = isShowcaseMode ? [10, 8, 10] : [12, 10, 12];

    // Calculate distance multiplier: 
    // If landscape (aspect > 1), use 1. 
    // If portrait (aspect < 1), scale by (1 / aspect) * 0.8 to fit comfortably.
    const distanceMultiplier = aspect < 1 ? (1 / aspect) * 0.9 : 1;

    const cameraPosition = [
        basePos[0] * distanceMultiplier,
        basePos[1] * distanceMultiplier,
        basePos[2] * distanceMultiplier
    ];

    const autoRotateSpeed = isShowcaseMode ? 1 : 0.5;

    // Handle building click
    const handleBuildingClick = (buildingInfo) => {
        if (isShowcaseMode) {
            setSelectedBuilding(buildingInfo);
        }
    };

    // Close tooltip when clicking elsewhere
    const handleCanvasClick = () => {
        if (selectedBuilding) {
            setSelectedBuilding(null);
        }
    };

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: isShowcaseMode ? 100 : 0, // Above UI in showcase mode
            pointerEvents: isShowcaseMode ? 'auto' : 'none', // Allow interaction in showcase
            transition: 'opacity 0.3s ease'
        }}>
            {/* Building Info Tooltip */}
            <AnimatePresence>
                {selectedBuilding && isShowcaseMode && (
                    <motion.div
                        key="building-tooltip"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setSelectedBuilding(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            pointerEvents: 'auto'
                        }}
                    >
                        <div style={{
                            background: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(10px)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            maxWidth: '320px',
                            border: `2px solid ${selectedBuilding.color}`,
                            boxShadow: `0 0 30px ${selectedBuilding.color}40`,
                            color: 'white'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '12px'
                            }}>
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '4px',
                                    backgroundColor: selectedBuilding.color
                                }} />
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    color: selectedBuilding.color
                                }}>
                                    {selectedBuilding.label}
                                </h3>
                            </div>
                            <p style={{
                                margin: 0,
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                color: '#e2e8f0'
                            }}>
                                {selectedBuilding.description}
                            </p>
                            <div style={{
                                marginTop: '12px',
                                fontSize: '0.75rem',
                                color: '#94a3b8',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {selectedBuilding.type} • Tap to dismiss
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Canvas
                shadows
                dpr={[1, 1.5]} // Limit pixel ratio for performance
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
                onPointerMissed={handleCanvasClick}
            >
                {/* Camera */}
                <PerspectiveCamera
                    makeDefault
                    position={cameraPosition}
                    fov={50} // Keep standard FOV, adjust distance instead
                    near={0.1}
                    far={200} // Increased render distance
                />

                {/* Suspense for async loading */}
                <Suspense fallback={null}>
                    {/* Dynamic lighting based on mood */}
                    <MoodLighting
                        happiness={crisisType ? (crisisType === 'heatwave' ? 30 : 20) : stats.happiness}
                        health={crisisType ? 20 : stats.health}
                    />

                    {/* Ground plane */}
                    <Ground landUsage={stats.land} />

                    {/* Buildings */}
                    <Buildings
                        stickers={approvedStickers}
                        budget={stats.budget}
                        onBuildingClick={handleBuildingClick}
                    />

                    {/* Crisis visual effects */}
                    <CrisisEffects
                        crisisType={crisisType}
                        intensity={1}
                    />
                </Suspense>

                {/* Camera controls - auto rotate when playing */}
                <OrbitControls
                    autoRotate={isPlaying || isShowcaseMode}
                    autoRotateSpeed={autoRotateSpeed}
                    rotateSpeed={-0.5} // Inverted for natural UX
                    enableZoom={isShowcaseMode}
                    enablePan={false}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2.5}
                    target={[0, 0, 0]} // Lower target slightly
                    minDistance={5}
                    maxDistance={80} // Allow zooming out further for narrow aspect ratios
                />
            </Canvas>
        </div>
    );
}
