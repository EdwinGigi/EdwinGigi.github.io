import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function Layout({ children }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <CustomCursor />
      <ScrollToTop />
      
      {/* Global Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-gradient-to-r from-primary to-accent"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
