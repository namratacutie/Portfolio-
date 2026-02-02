import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import resume from '../../assets/Lawarna_Aree_ATS_Resume.pdf';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            window.location.href = `/#${sectionId}`;
            return;
        }
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { label: 'Home', id: 'hero' },
        { label: 'About', id: 'about' },
        { label: 'Projects', id: 'projects' },
        { label: 'Skills', id: 'skills' },
        { label: 'Experience', id: 'experience' },
        { label: 'Blog', id: 'blog' },
        { label: 'Contact', id: 'contact' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo hoverable">
                    <span className="logo-text">
                        <span className="neon-pink">L</span>
                        <span className="neon-cyan">A</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <ul className="navbar-menu">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className="navbar-link hoverable"
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Resume Button */}
                <a
                    href={resume}
                    download="Lawarna_Aree_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline navbar-cta hoverable"
                >
                    Resume
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle hoverable ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <ul>
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className="mobile-nav-link hoverable"
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
                <a
                    href={resume}
                    download="Lawarna_Aree_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mobile-cta hoverable"
                >
                    Download Resume
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
