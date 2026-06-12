import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function InteractiveBackground() {
  const { theme } = useTheme()
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  // Use a smoother, lighter spring for a high-framerate feel
  const springConfig = { damping: 40, stiffness: 150, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Center it initially
    mouseX.set(window.innerWidth / 2)
    mouseY.set(window.innerHeight / 2)

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const isDark = theme === 'dark'
  
  // Create a stunning multi-color gradient WITHOUT using expensive CSS blur filters
  const glowColor = isDark 
    ? 'radial-gradient(circle at center, rgba(0,240,255,0.12) 0%, rgba(255,0,170,0.08) 30%, transparent 60%)'
    : 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.1) 30%, transparent 60%)'

  const primaryGlow = isDark 
    ? 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 60%)' 
    : 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 60%)'
    
  const accentGlow = isDark 
    ? 'radial-gradient(circle, rgba(255,0,170,0.08) 0%, transparent 60%)' 
    : 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 60%)'

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-500">
      
      {/* Base background to cover everything underneath */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Static ambient corner glows (Optimized: No blur filter) */}
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] animate-pulse" style={{ animationDuration: '10s', background: primaryGlow }} />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] animate-pulse" style={{ animationDuration: '12s', background: accentGlow }} />

      {/* Mouse tracking orb (Optimized: No blur filter) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          left: -300, // half width
          top: -300,  // half height
          x: springX,
          y: springY,
          background: glowColor,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
