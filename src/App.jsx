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

import { LenisProvider } from './components/context/LenisContext';
import { AuthProvider } from './components/context/AuthContext.jsx';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Scene3D, { LenisTorus } from './components/3d/Scene';

import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PageTransition from './components/ui/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/blog" element={
          <PageTransition>
            <BlogPage />
          </PageTransition>
        } />
        <Route path="/blog/:id" element={
          <PageTransition>
            <BlogPost />
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition>
            <Login />
          </PageTransition>
        } />
        <Route path="/admin" element={
          <PageTransition>
            <Admin />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LenisProvider options={{
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
    }}>
      <Scene3D isGlobal>
        <LenisTorus position={[4, 2, 0]} color="#ff2d95" scale={1} />
      </Scene3D>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <CustomCursor />
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            <AnimatedRoutes />
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </LenisProvider>
  );
};

export default App;