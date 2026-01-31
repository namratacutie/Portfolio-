import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import Navbar from '../ui/Navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Projects />
                <Skills />
                <Experience />
                <Blog />
                <Contact />
            </main>
        </>
    );
};

export default Home;