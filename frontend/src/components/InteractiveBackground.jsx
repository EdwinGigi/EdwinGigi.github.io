import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function InteractiveBackground() {
  const { theme } = useTheme()
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)

  // Use a very smooth spring for the glowing orb to lazily follow the mouse
  const springX = useSpring(mouseX, { damping: 50, stiffness: 100, mass: 2 })
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100, mass: 2 })

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
  
  // Create a stunning multi-color gradient
  const glowColor = isDark 
    ? 'radial-gradient(circle at center, rgba(0,240,255,0.15) 0%, rgba(255,0,170,0.1) 40%, transparent 70%)'
    : 'radial-gradient(circle at center, rgba(99,102,241,0.25) 0%, rgba(236,72,153,0.2) 40%, transparent 70%)'

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

      {/* Static ambient corner glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full blur-[120px] bg-primary/20 dark:bg-primary/10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[120px] bg-accent/20 dark:bg-accent/10 animate-pulse" style={{ animationDuration: '12s' }} />

      {/* Mouse tracking orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '1000px',
          height: '1000px',
          left: -500, // half width
          top: -500,  // half height
          x: springX,
          y: springY,
          background: glowColor,
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
