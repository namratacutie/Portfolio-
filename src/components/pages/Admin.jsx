import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { logout } from '../../services/auth';

import { createPost } from '../../services/blog';

const Admin = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Web Development',
        readTime: '5 min read',
        image: ''
    });
    const [submitting, setSubmitting] = React.useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else if (currentUser.email !== 'lawarnaaree@gmail.com') {
            alert('Access Denied: You are not authorized to view this page.');
            logout();
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createPost(formData);
            alert('Post created successfully!');
            setFormData({
                title: '', excerpt: '', content: '',
                category: 'Web Development', readTime: '5 min read', image: ''
            });
        } catch (error) {
            console.error(error);
            alert('Failed to create post');
        } finally {
            setSubmitting(false);
        }
    };

    if (!currentUser) return null;

    return (
        <main className="section" style={{ paddingTop: '120px' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 className="heading-lg neon-pink">Admin Dashboard</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span className="text-body">{currentUser.email}</span>
                        <button onClick={handleLogout} className="btn btn-outline">
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="glass-card">
                    <h2 className="heading-md neon-cyan" style={{ marginBottom: '30px' }}>Create New Post</h2>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} required
                                    style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }}>
                                    <option value="Web Development" style={{ background: '#0a0a0f', color: 'white' }}>Web Development</option>
                                    <option value="Mobile Development" style={{ background: '#0a0a0f', color: 'white' }}>Mobile Development</option>
                                    <option value="UI/UX Design" style={{ background: '#0a0a0f', color: 'white' }}>UI/UX Design</option>
                                    <option value="Backend" style={{ background: '#0a0a0f', color: 'white' }}>Backend</option>
                                    <option value="3D Graphics" style={{ background: '#0a0a0f', color: 'white' }}>3D Graphics</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Read Time</label>
                                <input name="readTime" value={formData.readTime} onChange={handleChange} placeholder="e.g. 5 min read"
                                    style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Image URL</label>
                                <input name="image" value={formData.image} onChange={handleChange} placeholder="/blog/placeholder.jpg"
                                    style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Excerpt (Short summary)</label>
                            <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={3}
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px' }} />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Content (Markdown supported)</label>
                            <textarea name="content" value={formData.content} onChange={handleChange} required rows={10}
                                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', fontFamily: 'monospace' }} />
                        </div>

                        <button type="submit" disabled={submitting} className="btn btn-primary" style={{ marginTop: '10px' }}>
                            {submitting ? 'Publishing...' : 'Publish Post'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Admin;
