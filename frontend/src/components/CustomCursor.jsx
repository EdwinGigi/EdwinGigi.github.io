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

  // Smooth springs for trailing effect
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
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

  // Mix-blend-mode difference works best if the cursor is white on dark, black on light.
  // We'll use a strong theme-aware accent color instead for a more premium look.
  const cursorColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.8)' : 'rgba(99, 102, 241, 0.6)'

  return (
    <>
      {/* Small dot (instant) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: theme === 'dark' ? '#fff' : '#000',
        }}
      />

      {/* Trailing circle (spring) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-primary mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovered ? cursorColor : 'transparent',
          width: isHovered ? 48 : 24,
          height: isHovered ? 48 : 24,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  )
}
