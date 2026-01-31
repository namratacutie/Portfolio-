import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/blog';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Blog.css';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const sectionRef = useRef(null);

    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error loading posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (loading || posts.length === 0) return;

        const section = sectionRef.current;
        const cards = section.querySelectorAll('.blog-card');

        // Refresh ScrollTrigger to ensure animations work with dynamic content
        ScrollTrigger.refresh();

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
    }, [loading, posts]);

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
                    {loading ? (
                        <p className="text-body" style={{ textAlign: 'center', gridColumn: '1/-1' }}>Loading articles...</p>
                    ) : posts.length === 0 ? (
                        <p className="text-body" style={{ textAlign: 'center', gridColumn: '1/-1' }}>No articles found. Check back later!</p>
                    ) : (
                        posts.map((post) => (
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
                        )))}
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
