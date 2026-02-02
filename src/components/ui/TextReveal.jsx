import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ children, className = "" }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const el = textRef.current;

        // Hide initial state
        gsap.set(el, { opacity: 0, y: 50, skewY: 7 });

        const tl = gsap.to(el, {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={textRef} className={className} style={{ overflow: 'hidden' }}>
            {children}
        </div>
    );
};

export default TextReveal;
