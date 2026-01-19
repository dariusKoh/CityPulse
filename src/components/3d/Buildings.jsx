import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Enhanced building presets with more distinctive colors and descriptions
const BUILDING_PRESETS = {
    // Green spaces - Bright greens with organic shapes
    park: { type: 'park', height: 0.8, color: '#10b981', emissive: '#059669', label: 'Park', description: 'A green recreational space that improves community health and happiness.' },
    tree: { type: 'park', height: 1.2, color: '#22c55e', emissive: '#16a34a', label: 'Urban Forest', description: 'Trees provide shade, clean air, and natural cooling for the city.' },
    leaf: { type: 'park', height: 1, color: '#34d399', emissive: '#10b981', label: 'Community Garden', description: 'A shared garden space where residents can grow food and connect.' },

    // Towers/Skyscrapers - Blues and glass-like
    building: { type: 'tower', height: 4.5, color: '#3b82f6', emissive: '#fbbf24', label: 'Office Tower', description: 'A modern commercial building providing employment opportunities.' },
    skyscraper: { type: 'tower', height: 7, color: '#1d4ed8', emissive: '#f59e0b', label: 'Skyscraper', description: 'A landmark high-rise maximizing land efficiency in the CBD.' },
    mixed_use: { type: 'tower', height: 5.5, color: '#6366f1', emissive: '#a5b4fc', label: 'Mixed-Use Development', description: 'Combines residential, commercial, and retail in one building.' },

    // Industrial - Greys and browns with orange accents
    factory: { type: 'industrial', height: 3, color: '#57534e', emissive: '#f97316', label: 'Industrial Facility', description: 'Manufacturing and production facility providing jobs.' },
    drain: { type: 'water', height: 0.3, color: '#0ea5e9', emissive: '#38bdf8', label: 'Drainage Canal', description: 'Water management infrastructure for flood prevention.' },

    // Heritage/Traditional - Warm terracotta and wood tones
    heritage: { type: 'heritage', height: 2.2, color: '#ea580c', emissive: '#fcd34d', label: 'Heritage Building', description: 'A preserved historical structure maintaining cultural identity.' },
    bungalow: { type: 'heritage', height: 1.8, color: '#c2410c', emissive: '#fef08a', label: 'Colonial Bungalow', description: 'A traditional low-rise home integrated into modern development.' },
    shophouse: { type: 'shophouse', height: 2.5, color: '#dc2626', emissive: '#fde047', label: 'Shophouse', description: 'Traditional shop-dwelling combining retail and residential use.' },

    // Infrastructure/Tech - Purples and teals
    island: { type: 'island', height: 0.5, color: '#06b6d4', emissive: '#22d3ee', label: 'Reclaimed Island', description: 'New land created through coastal reclamation for development.' },
    satellite: { type: 'tech', height: 4, color: '#8b5cf6', emissive: '#c4b5fd', label: 'Tech Hub', description: 'A smart building with integrated digital infrastructure.' },
    wifi: { type: 'tech', height: 3, color: '#a855f7', emissive: '#d8b4fe', label: 'Smart Sensor Grid', description: 'IoT network optimizing city services and traffic.' },

    // Transport
    pedestrian: { type: 'transport', height: 0.2, color: '#fbbf24', emissive: '#fef08a', label: 'Pedestrian Walkway', description: 'Safe walking paths promoting active mobility.' },
    bridge: { type: 'transport', height: 1.5, color: '#78716c', emissive: '#d6d3d1', label: 'Green Link', description: 'Elevated connection linking parks and neighborhoods.' },

    // Environment
    snowflake: { type: 'utility', height: 2, color: '#67e8f9', emissive: '#a5f3fc', label: 'District Cooling', description: 'Centralized cooling system reducing energy consumption.' },
    thermometer: { type: 'utility', height: 1.5, color: '#22d3ee', emissive: '#67e8f9', label: 'Climate Station', description: 'Monitoring station for urban heat and air quality.' },
    plant: { type: 'park', height: 1.5, color: '#4ade80', emissive: '#86efac', label: 'Vertical Farm', description: 'High-tech agriculture producing local food sustainably.' },

    // Default
    default: { type: 'tower', height: 3.5, color: '#64748b', emissive: '#94a3b8', label: 'Development', description: 'A new addition to the cityscape.' }
};

// Grid positions for building placement - more spread out
const GRID_POSITIONS = [
    [-5, -5], [-2.5, -5], [0, -5], [2.5, -5], [5, -5],
    [-5, -2.5], [-2.5, -2.5], [0, -2.5], [2.5, -2.5], [5, -2.5],
    [-5, 0], [-2.5, 0], [2.5, 0], [5, 0],
    [-5, 2.5], [-2.5, 2.5], [0, 2.5], [2.5, 2.5], [5, 2.5],
    [-5, 5], [-2.5, 5], [0, 5], [2.5, 5], [5, 5]
];

/**
 * Individual building component with spawn animation and improved visuals
 */
function Building({ position, preset, budget = 50, index, onClick }) {
    const meshRef = useRef();
    const groupRef = useRef();
    const config = BUILDING_PRESETS[preset] || BUILDING_PRESETS.default;

    // Spawn animation using react-spring
    const { scale } = useSpring({
        from: { scale: [1, 0, 1] },
        to: { scale: [1, 1, 1] },
        config: { mass: 1, tension: 180, friction: 20 },
        delay: index * 150 // Stagger animation
    });

    // Window glow intensity based on budget
    const emissiveIntensity = useMemo(() => {
        const budgetNormalized = budget / 100;
        return 0.15 + budgetNormalized * 0.5;
    }, [budget]);

    // Subtle animation for buildings
    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.elapsedTime;
            if (config.type === 'tower') {
                meshRef.current.rotation.z = Math.sin(t * 0.3 + index) * 0.008;
            } else if (config.type === 'tech') {
                // Pulsing glow for tech buildings
                if (meshRef.current.material) {
                    meshRef.current.material.emissiveIntensity = emissiveIntensity + Math.sin(t * 2 + index) * 0.1;
                }
            }
        }
    });

    // Render different shapes based on building type
    const renderBuilding = () => {
        switch (config.type) {
            case 'park':
                return (
                    <group>
                        {/* Grass patch */}
                        <mesh position={[0, 0.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[1, 12]} />
                            <meshStandardMaterial color="#22c55e" />
                        </mesh>
                        {/* Multiple trees for fuller look */}
                        {[0, 0.4, -0.3].map((offsetX, i) => (
                            <group key={i} position={[offsetX, 0, (i - 1) * 0.3]}>
                                {/* Tree trunk */}
                                <mesh position={[0, 0.3, 0]} castShadow>
                                    <cylinderGeometry args={[0.06, 0.1, 0.5, 6]} />
                                    <meshStandardMaterial color="#7c2d12" />
                                </mesh>
                                {/* Tree foliage - layered */}
                                <mesh position={[0, 0.7 + i * 0.1, 0]} castShadow>
                                    <coneGeometry args={[0.35, 0.6, 8]} />
                                    <meshStandardMaterial
                                        color={config.color}
                                        emissive={config.emissive}
                                        emissiveIntensity={0.15}
                                    />
                                </mesh>
                                <mesh position={[0, 1 + i * 0.1, 0]} castShadow>
                                    <coneGeometry args={[0.25, 0.4, 8]} />
                                    <meshStandardMaterial
                                        color={config.color}
                                        emissive={config.emissive}
                                        emissiveIntensity={0.15}
                                    />
                                </mesh>
                            </group>
                        ))}
                    </group>
                );

            case 'tower':
                const floors = Math.floor(config.height / 1.2);
                return (
                    <group ref={meshRef}>
                        {/* Main tower with window bands */}
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow>
                            <boxGeometry args={[1, config.height, 0.8]} />
                            <meshStandardMaterial
                                color={config.color}
                                metalness={0.6}
                                roughness={0.3}
                            />
                        </mesh>
                        {/* Window bands */}
                        {Array.from({ length: floors }).map((_, i) => (
                            <mesh key={i} position={[0.51, 0.6 + i * 1.2, 0]}>
                                <boxGeometry args={[0.02, 0.4, 0.6]} />
                                <meshStandardMaterial
                                    color={config.emissive}
                                    emissive={config.emissive}
                                    emissiveIntensity={emissiveIntensity}
                                />
                            </mesh>
                        ))}
                        {/* Rooftop */}
                        <mesh position={[0, config.height + 0.1, 0]} castShadow>
                            <boxGeometry args={[1.1, 0.2, 0.9]} />
                            <meshStandardMaterial color="#1e293b" />
                        </mesh>
                    </group>
                );

            case 'industrial':
                return (
                    <group>
                        {/* Main warehouse */}
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow ref={meshRef}>
                            <boxGeometry args={[1.5, config.height, 1.2]} />
                            <meshStandardMaterial color={config.color} roughness={0.9} />
                        </mesh>
                        {/* Loading bay */}
                        <mesh position={[0.8, 0.4, 0]} castShadow>
                            <boxGeometry args={[0.3, 0.8, 0.8]} />
                            <meshStandardMaterial color="#44403c" />
                        </mesh>
                        {/* Smokestacks */}
                        <mesh position={[0.4, config.height + 0.4, 0.3]} castShadow>
                            <cylinderGeometry args={[0.12, 0.18, 0.8, 8]} />
                            <meshStandardMaterial color="#292524" />
                        </mesh>
                        <mesh position={[-0.3, config.height + 0.3, -0.3]} castShadow>
                            <cylinderGeometry args={[0.1, 0.14, 0.6, 8]} />
                            <meshStandardMaterial color="#292524" />
                        </mesh>
                        {/* Orange glow from activity */}
                        <pointLight position={[0.4, config.height + 0.5, 0.3]} color="#f97316" intensity={0.3} distance={2} />
                    </group>
                );

            case 'water':
                return (
                    <group>
                        {/* Canal/Water feature */}
                        <mesh position={[0, 0.1, 0]} receiveShadow>
                            <boxGeometry args={[2, 0.2, 0.6]} />
                            <meshStandardMaterial
                                color={config.color}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={config.emissive}
                                emissiveIntensity={0.2}
                            />
                        </mesh>
                        {/* Banks */}
                        <mesh position={[0, 0.15, 0.4]}>
                            <boxGeometry args={[2.2, 0.3, 0.1]} />
                            <meshStandardMaterial color="#64748b" />
                        </mesh>
                        <mesh position={[0, 0.15, -0.4]}>
                            <boxGeometry args={[2.2, 0.3, 0.1]} />
                            <meshStandardMaterial color="#64748b" />
                        </mesh>
                    </group>
                );

            case 'heritage':
                return (
                    <group>
                        {/* Main structure with pillars */}
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow ref={meshRef}>
                            <boxGeometry args={[1.6, config.height, 1]} />
                            <meshStandardMaterial
                                color={config.color}
                                emissive={config.emissive}
                                emissiveIntensity={emissiveIntensity * 0.5}
                            />
                        </mesh>
                        {/* Traditional roof */}
                        <mesh position={[0, config.height + 0.35, 0]} castShadow rotation={[0, Math.PI / 4, 0]}>
                            <coneGeometry args={[1.2, 0.7, 4]} />
                            <meshStandardMaterial color="#7c2d12" />
                        </mesh>
                        {/* Decorative trim */}
                        <mesh position={[0, config.height, 0]}>
                            <boxGeometry args={[1.7, 0.1, 1.1]} />
                            <meshStandardMaterial color="#fcd34d" emissive="#fcd34d" emissiveIntensity={0.2} />
                        </mesh>
                    </group>
                );

            case 'shophouse':
                return (
                    <group>
                        {/* Narrow shophouse */}
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow ref={meshRef}>
                            <boxGeometry args={[0.8, config.height, 1.4]} />
                            <meshStandardMaterial
                                color={config.color}
                                emissive={config.emissive}
                                emissiveIntensity={emissiveIntensity}
                            />
                        </mesh>
                        {/* Shop front */}
                        <mesh position={[0.41, 0.5, 0]}>
                            <boxGeometry args={[0.02, 1, 1]} />
                            <meshStandardMaterial
                                color="#fef3c7"
                                emissive="#fbbf24"
                                emissiveIntensity={emissiveIntensity * 1.5}
                            />
                        </mesh>
                        {/* Roof overhang */}
                        <mesh position={[0.2, config.height + 0.15, 0]} rotation={[0, 0, 0.3]}>
                            <boxGeometry args={[0.8, 0.1, 1.5]} />
                            <meshStandardMaterial color="#7c2d12" />
                        </mesh>
                    </group>
                );

            case 'island':
                return (
                    <group>
                        {/* Island landmass */}
                        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[1.2, 1.5, 0.4, 12]} />
                            <meshStandardMaterial color="#86efac" />
                        </mesh>
                        {/* Beach ring */}
                        <mesh position={[0, 0.05, 0]}>
                            <torusGeometry args={[1.3, 0.2, 8, 24]} />
                            <meshStandardMaterial color="#fef08a" />
                        </mesh>
                        {/* Water around */}
                        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[1.5, 2.5, 24]} />
                            <meshStandardMaterial
                                color={config.color}
                                emissive={config.emissive}
                                emissiveIntensity={0.3}
                                transparent
                                opacity={0.8}
                            />
                        </mesh>
                    </group>
                );

            case 'tech':
                return (
                    <group>
                        {/* Futuristic tower */}
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow ref={meshRef}>
                            <cylinderGeometry args={[0.4, 0.6, config.height, 8]} />
                            <meshStandardMaterial
                                color={config.color}
                                emissive={config.emissive}
                                emissiveIntensity={emissiveIntensity}
                                metalness={0.9}
                                roughness={0.1}
                            />
                        </mesh>
                        {/* Glowing rings */}
                        {[0.3, 0.6, 0.9].map((ratio, i) => (
                            <mesh key={i} position={[0, config.height * ratio, 0]}>
                                <torusGeometry args={[0.5, 0.03, 8, 24]} />
                                <meshStandardMaterial
                                    color={config.emissive}
                                    emissive={config.emissive}
                                    emissiveIntensity={1}
                                />
                            </mesh>
                        ))}
                        {/* Top antenna orb */}
                        <mesh position={[0, config.height + 0.3, 0]}>
                            <sphereGeometry args={[0.2, 16, 16]} />
                            <meshStandardMaterial
                                color="#ffffff"
                                emissive={config.emissive}
                                emissiveIntensity={1}
                            />
                        </mesh>
                        <pointLight position={[0, config.height + 0.3, 0]} color={config.emissive} intensity={0.5} distance={3} />
                    </group>
                );

            case 'transport':
                return (
                    <group>
                        {/* Pathway/bridge */}
                        <mesh position={[0, config.height / 2, 0]} receiveShadow>
                            <boxGeometry args={[2.5, config.height, 0.6]} />
                            <meshStandardMaterial
                                color={config.color}
                                emissive={config.emissive}
                                emissiveIntensity={0.3}
                            />
                        </mesh>
                        {/* Railings */}
                        <mesh position={[0, config.height + 0.15, 0.35]}>
                            <boxGeometry args={[2.5, 0.3, 0.05]} />
                            <meshStandardMaterial color="#64748b" />
                        </mesh>
                        <mesh position={[0, config.height + 0.15, -0.35]}>
                            <boxGeometry args={[2.5, 0.3, 0.05]} />
                            <meshStandardMaterial color="#64748b" />
                        </mesh>
                    </group>
                );

            case 'utility':
                return (
                    <group>
                        {/* Utility building */}
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow ref={meshRef}>
                            <boxGeometry args={[1, config.height, 1]} />
                            <meshStandardMaterial
                                color="#e2e8f0"
                                metalness={0.5}
                                roughness={0.3}
                            />
                        </mesh>
                        {/* Cooling fins / solar panels */}
                        {[-0.3, 0, 0.3].map((x, i) => (
                            <mesh key={i} position={[x, config.height + 0.2, 0]} rotation={[-0.3, 0, 0]}>
                                <boxGeometry args={[0.2, 0.02, 0.8]} />
                                <meshStandardMaterial
                                    color={config.color}
                                    emissive={config.emissive}
                                    emissiveIntensity={0.5}
                                />
                            </mesh>
                        ))}
                    </group>
                );

            default: // Generic building
                return (
                    <group>
                        <mesh position={[0, config.height / 2, 0]} castShadow receiveShadow ref={meshRef}>
                            <boxGeometry args={[1, config.height, 0.9]} />
                            <meshStandardMaterial
                                color={config.color}
                                emissive={config.emissive}
                                emissiveIntensity={emissiveIntensity}
                                metalness={0.4}
                                roughness={0.6}
                            />
                        </mesh>
                        {/* Simple windows */}
                        <mesh position={[0.51, config.height / 2, 0]}>
                            <boxGeometry args={[0.02, config.height * 0.7, 0.6]} />
                            <meshStandardMaterial
                                color={config.emissive}
                                emissive={config.emissive}
                                emissiveIntensity={emissiveIntensity * 0.8}
                            />
                        </mesh>
                    </group>
                );
        }
    };


    // Handle click on building
    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) {
            onClick({
                label: config.label,
                description: config.description,
                type: config.type,
                color: config.color
            });
        }
    };

    return (
        <animated.group
            ref={groupRef}
            position={[position[0], 0, position[1]]}
            scale={scale}
            onClick={handleClick}
            onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { document.body.style.cursor = 'default'; }}
        >
            {renderBuilding()}
        </animated.group>
    );
}

/**
 * Building manager that places buildings on a grid based on approved stickers
 */
export default function Buildings({ stickers = [], budget = 50, onBuildingClick }) {
    // Use seeded random for consistent positioning
    const getOffset = (index) => {
        const seed = index * 12345;
        return [
            ((seed % 100) / 100 - 0.5) * 0.6,
            (((seed * 7) % 100) / 100 - 0.5) * 0.6
        ];
    };

    return (
        <group>
            {stickers.map((sticker, index) => {
                const gridPos = GRID_POSITIONS[index % GRID_POSITIONS.length];
                const offset = getOffset(index);

                return (
                    <Building
                        key={`${sticker}-${index}`}
                        position={[gridPos[0] + offset[0], gridPos[1] + offset[1]]}
                        preset={sticker}
                        budget={budget}
                        index={index}
                        onClick={onBuildingClick}
                    />
                );
            })}
        </group>
    );
}
