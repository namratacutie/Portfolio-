import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);

    const experiences = [
        {
            id: 1,
            role: 'Senior Fullstack Developer',
            company: 'Tech Company',
            location: 'Remote',
            period: '2024 - Present',
            description: 'Leading development of scalable web applications and mentoring junior developers. Implementing best practices and modern architecture patterns.',
            achievements: [
                'Led team of 5 developers on major product launch',
                'Improved application performance by 40%',
                'Implemented CI/CD pipeline reducing deployment time'
            ],
            type: 'work'
        },
        {
            id: 2,
            role: 'Fullstack Developer',
            company: 'Startup Inc',
            location: 'Kathmandu, Nepal',
            period: '2022 - 2024',
            description: 'Developed and maintained multiple web and mobile applications. Collaborated with cross-functional teams to deliver high-quality products.',
            achievements: [
                'Built 3 production-ready applications from scratch',
                'Integrated payment systems and third-party APIs',
                'Optimized database queries improving response times'
            ],
            type: 'work'
        },
        {
            id: 3,
            role: 'Computer Science Degree',
            company: 'University',
            location: 'Nepal',
            period: '2019 - 2023',
            description: 'Bachelor\'s degree in Computer Science with focus on software engineering and web technologies.',
            achievements: [
                'Graduated with distinction',
                'Led student developer community',
                'Completed multiple capstone projects'
            ],
            type: 'education'
        },
        {
            id: 4,
            role: 'Freelance Developer',
            company: 'Self-employed',
            location: 'Remote',
            period: '2021 - 2022',
            description: 'Provided freelance development services for various clients, building custom websites and applications.',
            achievements: [
                'Delivered 10+ client projects',
                'Maintained 100% client satisfaction',
                'Built long-term client relationships'
            ],
            type: 'work'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const items = section.querySelectorAll('.timeline-item');

        items.forEach((item, index) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Animate timeline line
        gsap.fromTo(timelineRef.current,
            { height: '0%' },
            {
                height: '100%',
                duration: 2,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 1
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="experience" className="experience section" ref={sectionRef}>
            <div className="experience-container">
                {/* Header */}
                <div className="experience-header">
                    <span className="section-label text-retro neon-cyan">JOURNEY</span>
                    <h2 className="heading-lg">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <p className="text-body experience-subtitle">
                        My professional journey and education
                    </p>
                </div>

                {/* Timeline */}
                <div className="timeline">
                    <div className="timeline-line">
                        <div className="timeline-line-fill" ref={timelineRef}></div>
                    </div>

                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                        >
                            <div className="timeline-dot">
                                <span>{exp.type === 'education' ? '🎓' : '💼'}</span>
                            </div>
                            <div className="timeline-content glass-card">
                                <span className="timeline-period">{exp.period}</span>
                                <h3 className="timeline-role">{exp.role}</h3>
                                <div className="timeline-company">
                                    <span className="company-name neon-cyan">{exp.company}</span>
                                    <span className="company-location">{exp.location}</span>
                                </div>
                                <p className="timeline-description">{exp.description}</p>
                                <ul className="timeline-achievements">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
