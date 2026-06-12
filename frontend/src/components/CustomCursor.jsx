import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTheme } from './ThemeProvider'

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()

  // Track cursor position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Snappier springs for a smoother, higher-framerate feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    setIsVisible(true)

    const moveCursor = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      // Find closest clickable ancestor
      const clickable = e.target.closest('a, button, input, [role="button"]')
      setIsHovered(!!clickable)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!isVisible) return null

  return (
    <>
      {/* Inner solid core (instant tracking) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-sm"
        animate={{
          width: isHovered ? 4 : 6,
          height: isHovered ? 4 : 6,
          rotate: isHovered ? 45 : 0,
        }}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: theme === 'dark' ? '#00f0ff' : '#6366f1',
          boxShadow: `0 0 10px ${theme === 'dark' ? '#00f0ff' : '#6366f1'}`
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer morphing outline (spring trailing) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] border-[1.5px]"
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          rotate: isHovered ? 45 : 0,
          borderRadius: isHovered ? '8px' : '50%',
          borderColor: theme === 'dark' 
            ? (isHovered ? '#ff00aa' : '#00f0ff') 
            : (isHovered ? '#4f46e5' : '#6366f1'),
          backgroundColor: isHovered 
            ? (theme === 'dark' ? 'rgba(255, 0, 170, 0.1)' : 'rgba(79, 70, 229, 0.1)') 
            : 'transparent',
          boxShadow: isHovered 
            ? `0 0 20px ${theme === 'dark' ? 'rgba(255, 0, 170, 0.4)' : 'rgba(79, 70, 229, 0.4)'}` 
            : 'none'
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25,
          mass: 0.5
        }}
      />
    </>
  )
}
