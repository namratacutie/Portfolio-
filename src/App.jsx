// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Home from './components/pages/Home';
import BlogPage from './components/pages/BlogPage';
import BlogPost from './components/pages/BlogPost';
import Admin from './components/pages/Admin';
import './index.css';

import ErrorBoundary from './components/ui/ErrorBoundary';

import Lenis from 'lenis';
import { AuthProvider } from './components/context/AuthContext.jsx';
import Login from './components/pages/Login';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <CustomCursor />
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;