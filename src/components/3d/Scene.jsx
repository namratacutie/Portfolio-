import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    Stars
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import './Scene.css';

// Floating neon torus
const NeonTorus = ({ position, color, speed = 1 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <torusGeometry args={[1, 0.3, 16, 32]} />
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

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
            meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.6;
            meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.4;
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

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[2, 16, 16]} />
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
};

// Main 3D Scene component
const Scene3D = ({ children }) => {
    return (
        <div className="scene-container">
            <Canvas
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
                dpr={[1, 2]}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff2d95" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00f0ff" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    color="#b829dd"
                />

                {/* Background stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                {/* Floating objects */}
                <NeonTorus position={[-4, 2, -2]} color="#ff2d95" speed={0.8} />
                <NeonOctahedron position={[4, -1, -3]} color="#00f0ff" speed={1.2} />
                <NeonIcosahedron position={[-3, -2, -1]} color="#b829dd" speed={1} />
                <NeonTorus position={[3, 1.5, -4]} color="#ff6b35" speed={0.6} />
                <WireframeSphere position={[0, 0, -5]} color="#00f0ff" scale={1.5} />

                {/* Custom children (avatar, etc.) */}
                {children}

                {/* Post-processing effects */}
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.1}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL}
                        offset={[0.002, 0.002]}
                    />
                </EffectComposer>

                {/* Controls - disabled for hero, can enable for interactive sections */}
                {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
            </Canvas>
        </div>
    );
};

export default Scene3D;
