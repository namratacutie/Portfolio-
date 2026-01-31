import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../services/auth';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../ui/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Redirect if already logged in
    React.useEffect(() => {
        if (currentUser) {
            navigate('/admin');
        }
    }, [currentUser, navigate]);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            navigate('/admin');
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Check console for details.");
        }
    };

    return (
        <>
            <Navbar />
            <main className="section" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div className="glass-card" style={{ maxWidth: '400px', width: '100%' }}>
                    <h1 className="heading-md neon-pink" style={{ marginBottom: '20px' }}>
                        Admin Access
                    </h1>
                    <p className="text-body" style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>
                        Sign in to manage blog posts.
                    </p>

                    <button
                        onClick={handleLogin}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>G</span>
                        Sign in with Google
                    </button>
                </div>
            </main>
        </>
    );
};

export default Login;
