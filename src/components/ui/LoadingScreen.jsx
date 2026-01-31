import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsComplete(true);
                    setTimeout(() => onComplete?.(), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className={`loading-screen ${isComplete ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <h1 className="loader-name">
                    <span className="neon-pink">LAWARNA</span>
                    <span className="neon-cyan">AREE</span>
                </h1>
                <div className="loader-bar-container">
                    <div
                        className="loader-bar"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
                <p className="loader-text text-retro">
                    {progress < 100 ? 'LOADING EXPERIENCE...' : 'READY'}
                </p>
            </div>
            <div className="loader-scanlines" />
        </div>
    );
};

export default LoadingScreen;