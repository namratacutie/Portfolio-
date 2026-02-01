import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Scene3D from '../3d/Scene';
import Avatar from '../3d/Avatar';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const scrollIndicatorRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });

        // Animate title letters
        if (titleRef.current) {
            const chars = titleRef.current.querySelectorAll('.char');
            tl.fromTo(chars,
                {
                    opacity: 0,
                    y: 100,
                    rotateX: -90
                },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'back.out(1.7)'
                }
            );
        }

        // Animate subtitle
        tl.fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
        );

        // Animate CTA buttons
        tl.fromTo(ctaRef.current?.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
            '-=0.2'
        );

        // Animate scroll indicator
        tl.fromTo(scrollIndicatorRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            '-=0.2'
        );

        // Scroll indicator bouncing
        gsap.to(scrollIndicatorRef.current?.querySelector('.scroll-arrow'), {
            y: 10,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        return () => {
            tl.kill();
        };
    }, []);

    // Split text into individual characters
    const splitText = (text) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char" style={{ display: 'inline-block' }}>
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="hero" className="hero" ref={heroRef}>
            {/* 3D Background */}
            <Scene3D>
                <Avatar position={[2, -1, 0]} scale={1.2} />
            </Scene3D>

            {/* Content overlay */}
            <div className="hero-content">
                <div className="hero-text">
                    <p className="hero-greeting text-retro neon-cyan">HELLO, I'M</p>
                    <h1 className="hero-title heading-xl" ref={titleRef}>
                        {splitText('LAWARNA')}
                        <br />
                        <span className="gradient-text">{splitText('AREE')}</span>
                    </h1>
                    <p className="hero-subtitle text-body" ref={subtitleRef}>
                        <span className="neon-pink">Fullstack Developer</span> crafting
                        <span className="neon-cyan"> immersive digital experiences</span> with
                        modern web technologies and cross-platform solutions.
                    </p>

                    <div className="hero-cta" ref={ctaRef}>
                        <button
                            className="btn btn-primary hoverable"
                            onClick={() => scrollToSection('projects')}
                        >
                            <span>View Projects</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                        <button
                            className="btn btn-outline hoverable"
                            onClick={() => scrollToSection('contact')}
                        >
                            <span>Get in Touch</span>
                        </button>
                    </div>
                </div>

                {/* Social links */}
                <div className="hero-socials">
                    <a href="https://github.com/Suprem164" target="_blank" rel="noopener noreferrer" className="social-link hoverable">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                    </a>
                    <a href="https:/linkedin.com/in/lawarna-aree-032180317" target="_blank" rel="noopener noreferrer" className="social-link hoverable">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                    <a href="mailto:lawarnaaree@gmail.com" className="social-link hoverable">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator" ref={scrollIndicatorRef}>
                <span className="scroll-text text-retro">SCROLL</span>
                <div className="scroll-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </div>

            {/* Gradient overlay */}
            <div className="hero-gradient-overlay" />
        </section>
    );
};

export default Hero;
