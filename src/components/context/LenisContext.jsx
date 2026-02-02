import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export const LenisProvider = ({ children, options = {} }) => {
    const lenisRef = useRef(null);
    const reqIdRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            ...options
        });

        lenisRef.current = lenis;

        const raf = (time) => {
            lenis.raf(time);
            reqIdRef.current = requestAnimationFrame(raf);
        };

        reqIdRef.current = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
        };
    }, [options]);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
};

export const useLenis = (callback) => {
    const lenis = useContext(LenisContext);

    useEffect(() => {
        if (!lenis || !callback) return;

        const handleScroll = (e) => callback(e);
        lenis.on('scroll', handleScroll);

        // Initial call with current state
        callback({
            progress: lenis.progress,
            scroll: lenis.scroll,
            velocity: lenis.velocity,
            direction: lenis.direction,
            target: lenis
        });

        return () => {
            lenis.off('scroll', handleScroll);
        };
    }, [lenis, callback]);

    return lenis;
};
