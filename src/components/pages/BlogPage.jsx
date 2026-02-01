import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../../services/blog';
import '../sections/Blog.css';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <main className="section" style={{ paddingTop: '120px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Back Button */}
                <Link to="/" className="btn btn-outline" style={{ marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Home
                </Link>

                <h1 className="heading-lg gradient-text" style={{ marginBottom: '20px' }}>All Articles</h1>

                {loading ? (
                    <p className="text-body" style={{ textAlign: 'center' }}>Loading articles...</p>
                ) : posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <p className="text-body" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                            No articles now. Check back again later.
                        </p>
                    </div>
                ) : (
                    <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                        {posts.map((post) => (
                            <div key={post.id} className="blog-card glass-card">
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default BlogPage;
