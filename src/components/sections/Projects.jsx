import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '../ui/TextReveal';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const [activeFilter, setActiveFilter] = useState('all');

    const projects = [
        {
            id: 1,
            title: '3D Portfolio Template',
            description: 'Interactive 3D portfolio website template with Three.js animations and immersive experience.',
            image: '/projects/portfolio.jpg',
            tags: ['React', 'Three.js', 'GSAP'],
            category: 'web',
            github: 'https://github.com',
            live: 'https://example.com',
            featured: true
        },
        {
            id: 2,
            title: 'Shoyambhu Motors',
            description: 'Collaborative car servicing management tool with real-time updates and other features.',
            image: '/projects/tasks.jpg',
            tags: ['React', 'Firebase', 'Flutter'],
            category: 'mobile',
            github: 'https://github.com',
            live: 'https://example.com',
            featured: false
        }
    ];

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web Apps' },
        { id: 'mobile', label: 'Mobile' },
        { id: 'ai', label: 'AI/ML' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    useEffect(() => {
        const section = sectionRef.current;
        const cards = section.querySelectorAll('.project-card');

        gsap.fromTo(cards,
            { opacity: 0, y: 60 },
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

        // Parallax effect for project cards
        cards.forEach((card, index) => {
            gsap.to(card, {
                yPercent: (index % 2 === 0 ? -15 : 15),
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [activeFilter]);

    return (
        <section id="projects" className="projects section" ref={sectionRef}>
            <div className="projects-container">
                {/* Header */}
                <div className="projects-header">
                    <span className="section-label text-retro neon-pink">PORTFOLIO</span>
                    <TextReveal>
                        <h2 className="heading-lg">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                    </TextReveal>
                    <p className="text-body projects-subtitle">
                        A selection of my recent work and personal projects
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="projects-filters">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-btn hoverable ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.id)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {filteredProjects.map((project) => (
                        <article
                            key={project.id}
                            className={`project-card glass-card ${project.featured ? 'featured' : ''}`}
                        >
                            {/* Project Image */}
                            <div className="project-image">
                                <div className="image-placeholder-project">
                                    <span>🖼️</span>
                                </div>
                                <div className="project-overlay">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link hoverable">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    </a>
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link hoverable">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="projects-cta">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline hoverable">
                        View All Projects on GitHub
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
