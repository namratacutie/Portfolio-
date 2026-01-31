import React from 'react';
import Hero from '../sections/Hero';
import Navbar from '../ui/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                {/* Placeholder sections - Phase 3 */}
                <section id="about" className="section">
                    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
                        <h2 className="heading-lg neon-cyan">About Me</h2>
                        <p className="text-body" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            Coming soon...
                        </p>
                    </div>
                </section>
                <section id="projects" className="section">
                    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
                        <h2 className="heading-lg neon-pink">Projects</h2>
                        <p className="text-body" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            Coming soon...
                        </p>
                    </div>
                </section>
                <section id="skills" className="section">
                    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
                        <h2 className="heading-lg neon-purple">Skills</h2>
                        <p className="text-body" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            Coming soon...
                        </p>
                    </div>
                </section>
                <section id="experience" className="section">
                    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
                        <h2 className="heading-lg neon-cyan">Experience</h2>
                        <p className="text-body" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            Coming soon...
                        </p>
                    </div>
                </section>
                <section id="blog" className="section">
                    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
                        <h2 className="heading-lg neon-pink">Blog</h2>
                        <p className="text-body" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            Coming soon...
                        </p>
                    </div>
                </section>
                <section id="contact" className="section">
                    <div style={{ padding: '100px 5%', textAlign: 'center' }}>
                        <h2 className="heading-lg gradient-text">Contact</h2>
                        <p className="text-body" style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>
                            Coming soon...
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;