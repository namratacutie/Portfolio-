import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useLenis } from '../context/LenisContext';
import * as THREE from 'three';

// Stylized geometric avatar placeholder
// Will be replaced with actual 3D character model later
const Avatar = ({ position = [0, 0, 0], scale = 1 }) => {
    const groupRef = useRef();
    const headRef = useRef();

    // Create gradient material colors
    const colors = useMemo(() => ({
        primary: new THREE.Color('#ff2d95'),
        secondary: new THREE.Color('#00f0ff'),
        accent: new THREE.Color('#b829dd')
    }), []);

    const scrollProgress = useRef(0);

    useLenis(({ progress }) => {
        scrollProgress.current = progress;
    });

    useFrame((state) => {
        if (groupRef.current) {
            // Constant floating base
            const time = state.clock.elapsedTime;
            const floatY = Math.sin(time * 0.5) * 0.2;

            // Pathing based on scroll progress (p)
            const p = scrollProgress.current;

            // Curved path: Starts right, moves to background-left, then comes forward-right
            groupRef.current.position.x = position[0] - Math.sin(p * Math.PI) * 10 + Math.cos(p * Math.PI * 0.5) * 2;
            groupRef.current.position.y = position[1] + floatY - (p * 8) + Math.sin(p * Math.PI * 2) * 2;
            groupRef.current.position.z = position[2] - p * 15 + Math.sin(p * Math.PI) * 10;

            // Immersive Rotation
            groupRef.current.rotation.x = p * Math.PI * 1.5;
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                (state.mouse.x * Math.PI) / 3 + p * Math.PI * 3,
                0.05
            );
            groupRef.current.rotation.z = Math.sin(p * Math.PI * 2) * 0.5 + p * Math.PI;

            // Dynamic Scaling
            const dynamicScale = scale * (1 + Math.sin(p * Math.PI * 1.5) * 0.4);
            groupRef.current.scale.setScalar(dynamicScale);
        }

        if (headRef.current) {
            // Head still has its own subtle motion
            headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position} scale={scale}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
                {/* Head - Stylized sphere */}
                <mesh ref={headRef} position={[0, 1.8, 0]}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <MeshDistortMaterial
                        color={colors.primary}
                        emissive={colors.primary}
                        emissiveIntensity={0.3}
                        metalness={0.8}
                        roughness={0.2}
                        distort={0.2}
                        speed={2}
                    />
                </mesh>

                {/* Visor/Eyes effect */}
                <mesh position={[0, 1.85, 0.35]}>
                    <boxGeometry args={[0.6, 0.15, 0.1]} />
                    <meshStandardMaterial
                        color={colors.secondary}
                        emissive={colors.secondary}
                        emissiveIntensity={2}
                        metalness={1}
                        roughness={0}
                    />
                </mesh>

                {/* Body - Torso */}
                <mesh position={[0, 0.8, 0]}>
                    <cylinderGeometry args={[0.4, 0.5, 1.2, 8]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.3}
                    />
                </mesh>

                {/* Neon accent lines on body */}
                <mesh position={[0, 0.8, 0.35]}>
                    <boxGeometry args={[0.05, 1, 0.05]} />
                    <meshStandardMaterial
                        color={colors.secondary}
                        emissive={colors.secondary}
                        emissiveIntensity={2}
                    />
                </mesh>
                <mesh position={[0.2, 0.8, 0.3]}>
                    <boxGeometry args={[0.03, 0.8, 0.03]} />
                    <meshStandardMaterial
                        color={colors.primary}
                        emissive={colors.primary}
                        emissiveIntensity={2}
                    />
                </mesh>
                <mesh position={[-0.2, 0.8, 0.3]}>
                    <boxGeometry args={[0.03, 0.8, 0.03]} />
                    <meshStandardMaterial
                        color={colors.primary}
                        emissive={colors.primary}
                        emissiveIntensity={2}
                    />
                </mesh>

                {/* Arms */}
                <mesh position={[-0.7, 0.9, 0]} rotation={[0, 0, -0.3]}>
                    <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.3}
                    />
                </mesh>
                <mesh position={[0.7, 0.9, 0]} rotation={[0, 0, 0.3]}>
                    <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        metalness={0.9}
                        roughness={0.3}
                    />
                </mesh>

                {/* Floating rings around avatar */}
                <mesh position={[0, 1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[1.2, 0.02, 16, 100]} />
                    <meshStandardMaterial
                        color={colors.accent}
                        emissive={colors.accent}
                        emissiveIntensity={2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
                <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2.2, 0.3, 0]}>
                    <torusGeometry args={[1.4, 0.015, 16, 100]} />
                    <meshStandardMaterial
                        color={colors.secondary}
                        emissive={colors.secondary}
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            </Float>
        </group>
    );
};

export default Avatar;
