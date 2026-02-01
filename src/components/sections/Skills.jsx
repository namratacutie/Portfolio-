import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            title: 'Frontend',
            icon: '🎨',
            color: 'var(--neon-pink)',
            skills: [
                { name: 'React / Next.js', level: 95 },
                { name: 'TypeScript', level: 10 },
                { name: 'Three.js / WebGL', level: 40 },
                { name: 'CSS / SASS', level: 95 },
                { name: 'GSAP / Framer Motion', level: 85 }
            ]
        },
        {
            title: 'Backend',
            icon: '⚙️',
            color: 'var(--neon-cyan)',
            skills: [
                { name: 'Node.js / Express', level: 90 },
                { name: 'Python / Django', level: 30 },
                { name: 'REST APIs', level: 80 },
                { name: 'GraphQL', level: 50 },
                { name: 'WebSockets', level: 60 }
            ]
        },
        {
            title: 'Database',
            icon: '🗄️',
            color: 'var(--neon-purple)',
            skills: [
                { name: 'MongoDB', level: 60 },
                { name: 'PostgreSQL', level: 20 },
                { name: 'Firebase / Firestore', level: 90 },
                { name: 'Redis', level: 30 },
                { name: 'MySQL', level: 80 }
            ]
        },
        {
            title: 'Mobile',
            icon: '📱',
            color: 'var(--neon-orange)',
            skills: [
                { name: 'React Native', level: 10 },
                { name: 'Flutter', level: 80 },
                { name: '.NET MAUI', level: 75 },
                { name: 'Expo', level: 0 },
                { name: 'Native APIs', level: 10 }
            ]
        }
    ];

    const tools = [
        { name: 'Git', icon: '🔀' },
        { name: 'Docker', icon: '🐳' },
        { name: 'GitHub Actions', icon: '⚡' },
        { name: 'Firebase', icon: '🔥' }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const cards = section.querySelectorAll('.skill-category');

        gsap.fromTo(cards,
            { opacity: 0, y: 50, rotateX: -15 },
            {
                opacity: 1, y: 0, rotateX: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Animate skill bars
        const bars = section.querySelectorAll('.skill-progress-fill');
        bars.forEach(bar => {
            const level = bar.dataset.level;
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    width: `${level}%`,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="skills" className="skills section" ref={sectionRef}>
            <div className="skills-container">
                {/* Header */}
                <div className="skills-header">
                    <span className="section-label text-retro neon-purple">EXPERTISE</span>
                    <h2 className="heading-lg">
                        Skills & <span className="gradient-text">Technologies</span>
                    </h2>
                    <p className="text-body skills-subtitle">
                        Technologies I've been working with recently
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="skills-grid">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="skill-category glass-card">
                            <div className="category-header" style={{ borderColor: category.color }}>
                                <span className="category-icon">{category.icon}</span>
                                <h3 className="category-title" style={{ color: category.color }}>
                                    {category.title}
                                </h3>
                            </div>
                            <div className="category-skills">
                                {category.skills.map((skill, i) => (
                                    <div key={i} className="skill-item">
                                        <div className="skill-info">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-level">{skill.level}%</span>
                                        </div>
                                        <div className="skill-progress">
                                            <div
                                                className="skill-progress-fill"
                                                data-level={skill.level}
                                                style={{ background: category.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tools Section */}
                <div className="tools-section">
                    <h3 className="tools-title">Tools & Platforms</h3>
                    <div className="tools-grid">
                        {tools.map((tool, index) => (
                            <div key={index} className="tool-item glass-card hoverable">
                                <span className="tool-icon">{tool.icon}</span>
                                <span className="tool-name">{tool.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
