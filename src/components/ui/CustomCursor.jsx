import React, { useEffect, useState, useCallback } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [trail, setTrail] = useState([]);

    const handleMouseMove = useCallback((e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);

        // Add to trail
        setTrail(prev => {
            const id = `${performance.now()}-${Math.random()}`;
            const newTrail = [...prev, { x: e.clientX, y: e.clientY, id }];
            if (newTrail.length > 8) newTrail.shift();
            return newTrail;
        });
    }, []);

    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);
    const handleMouseLeave = useCallback(() => setIsVisible(false), []);
    const handleMouseEnter = useCallback(() => setIsVisible(true), []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        // Check for hoverable elements
        const checkHover = (e) => {
            const target = e.target;
            const isHoverableEl = target.closest('a, button, .hoverable, [data-cursor="pointer"]');
            setIsHovering(!!isHoverableEl);
        };

        window.addEventListener('mouseover', checkHover);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseover', checkHover);
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

    // Clear old trail items
    useEffect(() => {
        const interval = setInterval(() => {
            setTrail(prev => prev.filter(item => Date.now() - item.id < 200));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Trail effect */}
            {trail.map((point, index) => (
                <div
                    key={point.id}
                    className="cursor-trail"
                    style={{
                        left: point.x,
                        top: point.y,
                        opacity: (index + 1) / trail.length * 0.5,
                        transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length * 0.8})`
                    }}
                />
            ))}

            {/* Main cursor */}
            <div
                className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''} ${isVisible ? 'visible' : ''}`}
                style={{
                    left: position.x,
                    top: position.y
                }}
            >
                <div className="cursor-dot" />
                <div className="cursor-ring" />
            </div>
        </>
    );
};

export default CustomCursor;
