import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Visual effects for crisis events (floods, heatwaves)
 * Renders overlays and particles based on the active crisis type
 */
export default function CrisisEffects({ crisisType = null, intensity = 1 }) {
    const rainRef = useRef();
    const heatRef = useRef();

    // Generate rain particles for flood effect
    const rainParticles = useMemo(() => {
        const particles = [];
        const count = 200;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: (Math.random() - 0.5) * 30,
                y: Math.random() * 15 + 5,
                z: (Math.random() - 0.5) * 30,
                speed: 0.3 + Math.random() * 0.2
            });
        }
        return particles;
    }, []);

    // Generate heat wave particles
    const heatParticles = useMemo(() => {
        const particles = [];
        const count = 50;
        for (let i = 0; i < count; i++) {
            particles.push({
                x: (Math.random() - 0.5) * 20,
                y: Math.random() * 3,
                z: (Math.random() - 0.5) * 20,
                speed: 0.02 + Math.random() * 0.02
            });
        }
        return particles;
    }, []);

    // Animate rain falling
    useFrame((state, delta) => {
        if (rainRef.current && crisisType === 'flood') {
            const positions = rainRef.current.geometry.attributes.position;
            for (let i = 0; i < rainParticles.length; i++) {
                let y = positions.getY(i) - rainParticles[i].speed;
                if (y < 0) y = 15 + Math.random() * 5;
                positions.setY(i, y);
            }
            positions.needsUpdate = true;
        }

        if (heatRef.current && crisisType === 'heatwave') {
            const positions = heatRef.current.geometry.attributes.position;
            const time = state.clock.elapsedTime;
            for (let i = 0; i < heatParticles.length; i++) {
                const baseY = heatParticles[i].y;
                const y = baseY + Math.sin(time * 2 + i) * 0.5;
                const x = heatParticles[i].x + Math.sin(time + i * 0.5) * 0.3;
                positions.setY(i, y);
                positions.setX(i, x);
            }
            positions.needsUpdate = true;
        }
    });

    if (!crisisType) return null;

    return (
        <group>
            {/* FLOOD EFFECTS */}
            {crisisType === 'flood' && (
                <>
                    {/* Rain particles */}
                    <points ref={rainRef}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={rainParticles.length}
                                array={new Float32Array(rainParticles.flatMap(p => [p.x, p.y, p.z]))}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <pointsMaterial
                            color="#a5f3fc"
                            size={0.08}
                            transparent
                            opacity={0.8}
                            sizeAttenuation
                        />
                    </points>

                    {/* Rising water level */}
                    <mesh position={[0, 0.3 * intensity, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[40, 40]} />
                        <meshStandardMaterial
                            color="#0284c7"
                            transparent
                            opacity={0.4 * intensity}
                            metalness={0.9}
                            roughness={0.1}
                        />
                    </mesh>

                    {/* Dark storm clouds overlay - affects lighting handled by parent */}
                </>
            )}

            {/* HEATWAVE EFFECTS */}
            {crisisType === 'heatwave' && (
                <>
                    {/* Heat shimmer particles */}
                    <points ref={heatRef}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                count={heatParticles.length}
                                array={new Float32Array(heatParticles.flatMap(p => [p.x, p.y, p.z]))}
                                itemSize={3}
                            />
                        </bufferGeometry>
                        <pointsMaterial
                            color="#fbbf24"
                            size={0.3}
                            transparent
                            opacity={0.3}
                            sizeAttenuation
                        />
                    </points>

                    {/* Hot ground glow */}
                    <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[30, 30]} />
                        <meshStandardMaterial
                            color="#f97316"
                            emissive="#dc2626"
                            emissiveIntensity={0.2 * intensity}
                            transparent
                            opacity={0.2}
                        />
                    </mesh>

                    {/* Sun glare - intense light from above */}
                    <pointLight
                        position={[0, 15, 0]}
                        color="#fef08a"
                        intensity={2 * intensity}
                        distance={50}
                    />
                </>
            )}
        </group>
    );
}
