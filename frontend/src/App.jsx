import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Pulsing neon ring */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-neon-cyan opacity-30" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-magenta" />
          <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-neon-green border-l-neon-cyan [animation-direction:reverse] [animation-duration:1.5s]" />
        </div>
        {/* Brand text */}
        <p className="font-mono text-sm tracking-[0.3em] text-neon-cyan animate-glow-pulse">
          LOADING<span className="animate-pulse">_</span>
        </p>
      </div>
    </div>
  )
}

function App() {
  const location = useLocation()

  return (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  )
}

export default App
