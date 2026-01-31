import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const sectionRef = useRef(null);

    // Sample blog posts - will be replaced with Firebase data
    const blogPosts = [
        {
            id: 1,
            title: 'Building Immersive 3D Websites with Three.js',
            excerpt: 'Learn how to create stunning 3D experiences on the web using Three.js and React Three Fiber...',
            date: 'Jan 28, 2026',
            readTime: '8 min read',
            category: 'Web Development',
            image: '/blog/threejs.jpg'
        },
        {
            id: 2,
            title: 'The Future of Cross-Platform Development',
            excerpt: 'Exploring the latest trends in cross-platform development with Flutter, React Native, and .NET MAUI...',
            date: 'Jan 20, 2026',
            readTime: '6 min read',
            category: 'Mobile',
            image: '/blog/crossplatform.jpg'
        },
        {
            id: 3,
            title: 'Firebase Authentication Best Practices',
            excerpt: 'A comprehensive guide to implementing secure authentication in your web applications using Firebase...',
            date: 'Jan 15, 2026',
            readTime: '10 min read',
            category: 'Backend',
            image: '/blog/firebase.jpg'
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const cards = section.querySelectorAll('.blog-card');

        gsap.fromTo(cards,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="blog" className="blog section" ref={sectionRef}>
            <div className="blog-container">
                {/* Header */}
                <div className="blog-header">
                    <span className="section-label text-retro neon-pink">ARTICLES</span>
                    <h2 className="heading-lg">
                        Latest <span className="gradient-text">Blog Posts</span>
                    </h2>
                    <p className="text-body blog-subtitle">
                        Thoughts, tutorials, and insights on web development
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="blog-grid">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="blog-card glass-card hoverable">
                            <div className="blog-image">
                                <div className="blog-image-placeholder">
                                    <span>📝</span>
                                </div>
                                <span className="blog-category">{post.category}</span>
                            </div>
                            <div className="blog-content">
                                <div className="blog-meta">
                                    <span className="blog-date">{post.date}</span>
                                    <span className="blog-dot">•</span>
                                    <span className="blog-read-time">{post.readTime}</span>
                                </div>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} className="blog-link">
                                    Read More
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All */}
                <div className="blog-cta">
                    <Link to="/blog" className="btn btn-outline hoverable">
                        View All Articles
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Blog;
