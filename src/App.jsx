import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Project from './pages/Project'
import ScrollToTop from './ScrollToTop'

export default function App() {
  const location = useLocation();

  return (
    <>
      <header className="header">
        <div className="header-content">
          <a className="button" href="/portfolio/">Rory Simpson</a>
          <div>
            <a className="button" href="mailto:roryjns123@gmail.com">Email</a>
            <a className="button" href="https://www.linkedin.com/in/rory-simpson">LinkedIn</a>
            <a className="button" href="https://github.com/roryjns">GitHub</a>
            <a className="button" href="https://rory-simpson.itch.io">itch.io</a>
            <a className="cvButton" href="/portfolio/RorySimpsonCV.pdf">CV ↓</a>
          </div>
        </div>
      </header>

      <ScrollToTop />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/:projectId"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Project />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="footer">
        <p>© 2025 Rory Simpson. All rights reserved.</p>
      </footer>
    </>
  );
}