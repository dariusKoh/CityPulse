import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Ground plane for the city with grid pattern
 * Land usage affects the ground appearance
 */
export default function Ground({ landUsage = 50 }) {
    // Land usage affects ground color (more used = more grey/developed)
    const landNormalized = landUsage / 100;

    const groundColor = useMemo(() => {
        return new THREE.Color().lerpColors(
            new THREE.Color('#1e293b'), // Dark (heavily developed)
            new THREE.Color('#334155'), // Lighter (more available)
            landNormalized
        );
    }, [landNormalized]);

    const gridColor = useMemo(() => {
        return new THREE.Color().lerpColors(
            new THREE.Color('#475569'),
            new THREE.Color('#64748b'),
            landNormalized
        );
    }, [landNormalized]);

    return (
        <group>
            {/* Main ground plane */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.01, 0]}
                receiveShadow
            >
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial
                    color={groundColor}
                    metalness={0.1}
                    roughness={0.9}
                />
            </mesh>

            {/* Grid overlay */}
            <gridHelper
                args={[30, 30, gridColor, gridColor]}
                position={[0, 0, 0]}
            />

            {/* Outer ring to fade to horizon */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.02, 0]}
            >
                <ringGeometry args={[15, 25, 32]} />
                <meshStandardMaterial
                    color="#0f172a"
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </group>
    );
}
