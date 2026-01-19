import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dynamic lighting system that reflects the city's mood based on stats
 * - Happiness affects sky warmth/color
 * - Health affects fog/haze density
 */
export default function MoodLighting({ happiness = 50, health = 50 }) {
    const lightRef = useRef();

    // Calculate mood-based colors
    // High happiness = warm golden, Low = cold grey/blue
    const happinessNormalized = happiness / 100;
    const healthNormalized = health / 100;

    // Sky color interpolation: grey-blue (sad) → warm orange (happy)
    const skyColor = new THREE.Color().lerpColors(
        new THREE.Color('#4a5568'), // Grey (sad)
        new THREE.Color('#fbbf24'), // Golden (happy)
        happinessNormalized
    );

    // Ambient light: dimmer when sad, brighter when happy
    const ambientIntensity = 0.3 + happinessNormalized * 0.4;

    // Directional light color: cooler when unhealthy, warmer when healthy
    const sunColor = new THREE.Color().lerpColors(
        new THREE.Color('#94a3b8'), // Cool grey (unhealthy)
        new THREE.Color('#fff7ed'), // Warm white (healthy)
        healthNormalized
    );

    // Fog density based on health (low health = smoggy)
    const fogNear = 5 + healthNormalized * 10;
    const fogFar = 20 + healthNormalized * 30;
    const fogColor = new THREE.Color().lerpColors(
        new THREE.Color('#64748b'), // Smoggy grey
        new THREE.Color('#e0f2fe'), // Clear sky blue
        healthNormalized
    );

    // Animate light slightly for liveliness
    useFrame((state) => {
        if (lightRef.current) {
            const t = state.clock.elapsedTime;
            lightRef.current.position.x = 10 + Math.sin(t * 0.1) * 2;
            lightRef.current.position.z = 10 + Math.cos(t * 0.1) * 2;
        }
    });

    return (
        <>
            {/* Background color */}
            <color attach="background" args={[skyColor]} />

            {/* Atmospheric fog */}
            <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

            {/* Ambient light for base illumination */}
            <ambientLight intensity={ambientIntensity} color={skyColor} />

            {/* Main directional "sun" light */}
            <directionalLight
                ref={lightRef}
                position={[10, 15, 10]}
                intensity={0.8 + happinessNormalized * 0.4}
                color={sunColor}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-far={50}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />

            {/* Subtle hemisphere light for natural fill */}
            <hemisphereLight
                args={[skyColor, '#1e293b', 0.3]}
            />
        </>
    );
}
