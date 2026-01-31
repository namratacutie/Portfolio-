import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const image = imageRef.current;
        const content = contentRef.current;

        // Animate image
        gsap.fromTo(image,
            { opacity: 0, x: -100, scale: 0.8 },
            {
                opacity: 1, x: 0, scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 30%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate content items
        const contentItems = content.querySelectorAll('.about-animate');
        gsap.fromTo(contentItems,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const stats = [
        { number: '3+', label: 'Years Experience' },
        { number: '20+', label: 'Projects Completed' },
        { number: '10+', label: 'Technologies' },
        { number: '100%', label: 'Client Satisfaction' }
    ];

    return (
        <section id="about" className="about section" ref={sectionRef}>
            <div className="about-container">
                {/* Image/Avatar Side */}
                <div className="about-image-wrapper" ref={imageRef}>
                    <div className="about-image">
                        <div className="image-placeholder">
                            <span className="placeholder-icon">👨‍💻</span>
                        </div>
                        {/* Decorative elements */}
                        <div className="image-decoration decoration-1"></div>
                        <div className="image-decoration decoration-2"></div>
                        <div className="image-glow"></div>
                    </div>
                </div>

                {/* Content Side */}
                <div className="about-content" ref={contentRef}>
                    <span className="section-label text-retro neon-cyan about-animate">
                        ABOUT ME
                    </span>
                    <h2 className="heading-lg about-animate">
                        Turning Ideas Into <span className="gradient-text">Digital Reality</span>
                    </h2>
                    <p className="text-body about-text about-animate">
                        I'm <span className="neon-pink">Lawarna Aree</span>, a passionate fullstack developer
                        based in Nepal. I specialize in building modern web applications and
                        cross-platform mobile solutions that combine stunning design with
                        powerful functionality.
                    </p>
                    <p className="text-body about-text about-animate">
                        With expertise in React, Node.js, Firebase, and mobile frameworks,
                        I create immersive digital experiences that push the boundaries of
                        what's possible on the web.
                    </p>

                    {/* Stats Grid */}
                    <div className="about-stats about-animate">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item glass-card">
                                <span className="stat-number neon-cyan">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech Stack Preview */}
                    <div className="about-tech about-animate">
                        <span className="tech-label">Tech I work with:</span>
                        <div className="tech-icons">
                            {['React', 'Node.js', 'Firebase', 'Three.js', 'Flutter'].map((tech, i) => (
                                <span key={i} className="tech-tag hoverable">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
