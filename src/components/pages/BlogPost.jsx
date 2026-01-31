import React from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../services/blog';

const BlogPost = () => {
    const { id } = useParams();

    const [post, setPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchPost = async () => {
            try {
                if (id) {
                    const data = await getPostById(id);
                    setPost(data);
                }
            } catch (error) {
                console.error("Error loading post:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="section" style={{ paddingTop: '120px', textAlign: 'center' }}>Loading...</div>;
    if (!post) return <div className="section" style={{ paddingTop: '120px', textAlign: 'center' }}>Post not found</div>;

    return (
        <main className="section" style={{ paddingTop: '120px' }}>
            <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <span className="neon-pink" style={{ display: 'block', marginBottom: '10px' }}>{post.category}</span>
                <h1 className="heading-lg neon-cyan" style={{ marginBottom: '20px' }}>{post.title}</h1>
                <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)', marginBottom: '40px' }}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                </div>

                {post.image && (
                    <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: '12px', marginBottom: '40px' }} />
                )}

                <div className="text-body" style={{ whiteSpace: 'pre-wrap' }}>
                    {post.content}
                </div>
            </div>
        </main>
    );
};

export default BlogPost;
