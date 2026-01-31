import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import { db } from '../../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import VisitorCounter from '../ui/VisitorCounter';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: '📧',
            label: 'Email',
            value: 'lawarnaaree@gmail.com',
            link: 'mailto:lawarnaaree@gmail.com'
        },
        {
            icon: '📍',
            label: 'Location',
            value: 'Kathmandu, Nepal',
            link: null
        },
        {
            icon: '💼',
            label: 'LinkedIn',
            value: 'linkedin.com/in/lawarna',
            link: 'https://linkedin.com'
        }
    ];

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'messages'), {
                ...formData,
                timestamp: serverTimestamp(),
                read: false
            });

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (error) {
            console.error("Error sending message: ", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const section = sectionRef.current;
        const form = formRef.current;

        gsap.fromTo(form,
            { opacity: 0, x: 50 },
            {
                opacity: 1, x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        const infoItems = section.querySelectorAll('.contact-info-item');
        gsap.fromTo(infoItems,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0,
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

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section id="contact" className="contact section" ref={sectionRef}>
            <div className="contact-container">
                {/* Header */}
                <div className="contact-header">
                    <span className="section-label text-retro gradient-text">GET IN TOUCH</span>
                    <h2 className="heading-lg">
                        Let's Work <span className="neon-cyan">Together</span>
                    </h2>
                    <p className="text-body contact-subtitle">
                        Have a project in mind? Let's discuss how we can bring your ideas to life.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <div className="contact-info">
                        <h3 className="contact-info-title">Contact Information</h3>
                        <p className="contact-info-text">
                            Feel free to reach out through any of these channels.
                            I'm always open to discussing new projects and opportunities.
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((info, index) => (
                                <div key={index} className="contact-info-item glass-card">
                                    <span className="info-icon">{info.icon}</span>
                                    <div className="info-content">
                                        <span className="info-label">{info.label}</span>
                                        {info.link ? (
                                            <a href={info.link} className="info-value hoverable" target="_blank" rel="noopener noreferrer">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="info-value">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="contact-socials">
                            <span className="socials-label">Follow me:</span>
                            <div className="socials-links">
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn hoverable">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn hoverable">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn hoverable">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="contact-form glass-card" ref={formRef} onSubmit={handleSubmit}>
                        {submitted && (
                            <div className="form-success">
                                <span>✅</span>
                                <p>Message sent successfully! I'll get back to you soon.</p>
                            </div>
                        )}

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Lawarna Aree"
                                    required
                                    autoComplete="name"
                                    className="hoverable"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="lawarnaaree@gmail.com"
                                    required
                                    autoComplete="email"
                                    className="hoverable"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Project Inquiry"
                                required
                                autoComplete="off"
                                className="hoverable"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                rows="5"
                                required
                                autoComplete="off"
                                className="hoverable"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary form-submit hoverable"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    Send Message
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">
                        © 2026 <span className="neon-pink">Lawarna Aree</span>. All rights reserved.
                    </p>
                    <p className="footer-credit">
                        Built with <span className="neon-cyan">❤</span>
                    </p>
                    <div className="footer-counter-wrapper">
                        <VisitorCounter />
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
