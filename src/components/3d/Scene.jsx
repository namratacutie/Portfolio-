import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    Stars
} from '@react-three/drei';
import { useLenis } from '../context/LenisContext';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import './Scene.css';

// Interactive Torus that follows the Lenis-style scroll path
const LenisTorus = ({ position, color, scale = 1 }) => {
    const meshRef = useRef();
    const scrollProgress = useRef(0);

    useLenis(({ progress }) => {
        scrollProgress.current = progress;
    });

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime;
            const p = scrollProgress.current;

            // 1. Pathing (The Lenis Hand effect)
            // Starts top-right, moves with a complex "random" sway horizontally
            // Travel is primarily vertical (moves DOWN as we scroll)
            const horizontalSway = Math.sin(p * Math.PI * 1.5) * 6 + Math.cos(p * Math.PI * 3) * 3;
            meshRef.current.position.x = position[0] - 5 + horizontalSway;
            meshRef.current.position.y = position[1] - (p * 25);
            meshRef.current.position.z = position[2] - (p * 10) + Math.sin(p * Math.PI) * 5;

            // 2. Tumble Rotation
            meshRef.current.rotation.x = time * 0.1 + p * Math.PI * 3;
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                (state.mouse.x * Math.PI) / 2 + p * Math.PI * 2,
                0.05
            );
            meshRef.current.rotation.z = p * Math.PI;

            // 3. Dynamic Scaling (pulse as it passes through)
            const dynamicScale = scale * (1 + Math.sin(p * Math.PI) * 0.3);
            meshRef.current.scale.setScalar(dynamicScale);

            // 4. Smooth Mouse Sway
            meshRef.current.position.x += state.mouse.x * 1;
            meshRef.current.position.y += state.mouse.y * 1;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <torusGeometry args={[1.2, 0.4, 12, 48]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    );
};

// Floating neon torus (Standard)
const NeonTorus = ({ position, color, speed = 1 }) => {
    const meshRef = useRef();
    const scrollProgress = useRef(0);

    useLenis(({ progress }) => {
        scrollProgress.current = progress;
    });

    useFrame((state) => {
        if (meshRef.current) {
            // Constant rotation + scroll-based rotation shift
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5 + scrollProgress.current * 15;
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3 + scrollProgress.current * 10;
            meshRef.current.rotation.z = Math.sin(scrollProgress.current * Math.PI) * 2;

            // Mouse influence
            const mouseX = state.mouse.x * 2;
            const mouseY = state.mouse.y * 2;

            // Move in the direction of scrolling (drifting down as we scroll down)
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3 - scrollProgress.current * 15 + mouseY * 0.5;
            meshRef.current.position.x = position[0] + Math.cos(scrollProgress.current * Math.PI) * 2 + mouseX * 0.5;

            // Subtle scale pulse
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05 + scrollProgress.current * 0.2);
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <torusGeometry args={[1, 0.3, 12, 24]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    );
};

// Floating neon octahedron
const NeonOctahedron = ({ position, color, speed = 1 }) => {
    const meshRef = useRef();
    const scrollProgress = useRef(0);

    useLenis(({ progress }) => {
        scrollProgress.current = progress;
    });

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4 + scrollProgress.current * 12;
            meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.6 - scrollProgress.current * 10;

            // Stronger vertical movement
            meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.4 - scrollProgress.current * 25;

            // Slight horizontal drift
            meshRef.current.position.x = position[0] - Math.sin(scrollProgress.current * Math.PI) * 3;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    );
};

// Floating icosahedron
const NeonIcosahedron = ({ position, color, speed = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
            meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + 1) * 0.35;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <icosahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                metalness={0.7}
                roughness={0.3}
            />
        </mesh>
    );
};

// Wireframe sphere
const WireframeSphere = ({ position, color, scale = 1 }) => {
    const meshRef = useRef();
    const scrollProgress = useRef(0);

    useLenis(({ progress }) => {
        scrollProgress.current = progress;
    });

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollProgress.current * 4;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05 + scrollProgress.current * 2;
            meshRef.current.scale.setScalar(scale + Math.sin(scrollProgress.current * Math.PI) * 0.5);
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[2, 12, 12]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
};

// Atmosphere for the Hero section only (Octahedron, Icosahedron, etc.)
const HeroAtmosphere = () => {
    return (
        <>
            <NeonOctahedron position={[4, -1, -3]} color="#00f0ff" speed={1.2} />
            <NeonIcosahedron position={[-3, -2, -1]} color="#b829dd" speed={1} />
            <NeonTorus position={[3, 1.5, -4]} color="#ff6b35" speed={0.6} />
            <WireframeSphere position={[0, 0, -5]} color="#00f0ff" scale={1.5} />
            <Stars
                radius={100}
                depth={50}
                count={2500}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
        </>
    );
};

// Main 3D Scene component
const Scene3D = ({ children, isGlobal = false }) => {
    return (
        <div className={`scene-container ${isGlobal ? 'fixed' : 'absolute'}`}>
            <Canvas
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 1.5]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

                {/* Optional background color for global scene, transparent for local */}
                {isGlobal && <color attach="background" args={['#0a0a14']} />}

                {/* Lighting - Optimized to 2 lights */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color={isGlobal ? "#ff2d95" : "#00f0ff"} />

                {children}

                {/* Post-processing effects - Simplified */}
                <EffectComposer disableNormalPass>
                    <Bloom
                        intensity={1.2}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export { LenisTorus, HeroAtmosphere };
export default Scene3D;
