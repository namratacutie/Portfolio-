import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();

    return (
        <main className="section">
            <h1 className="heading-lg neon-cyan">Blog Post</h1>
            <p className="text-body">Post ID: {id}</p>
        </main>
    );
};

export default BlogPost;
