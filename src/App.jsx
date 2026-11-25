import { Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import { useLenis } from './hooks/useLenis';
import { Home, About, Projects, ProjectDetails, Skills, Experience, Contact, NotFound, prefetchRoutes } from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PageLoader from './components/common/PageLoader';
import ErrorBoundary from './components/common/ErrorBoundary';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';

export default function App() {
  const location = useLocation();
  const { reduceMotion } = useTheme();
  useLenis(!reduceMotion);

  // After the first page is interactive, quietly fetch the other route chunks
  // so later navigations never wait on the network.
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(prefetchRoutes);
    return () => cancel(id);
  }, []);

  return (
    <MotionConfig reducedMotion={reduceMotion ? 'always' : 'never'}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1}>
        <ErrorBoundary resetKey={location.pathname}>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
      <CustomCursor />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  );
}
