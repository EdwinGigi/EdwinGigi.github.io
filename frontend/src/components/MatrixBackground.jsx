import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

export default function MatrixBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let timeoutId
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Solid fill on resize to prevent mud/glitch artifacts
      ctx.fillStyle = theme === 'dark' ? '#09090b' : '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Solid fill when theme changes to prevent trailing glitch mud
    ctx.fillStyle = theme === 'dark' ? '#09090b' : '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+'.split('')
    
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
    
    // Track drop positions for each column
    const drops = new Array(columns).fill(1)

    // Mouse interaction state
    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      // Fade out existing drawings to create trail effect without using mix-blend-mode
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
      
      ctx.font = `${fontSize}px monospace`
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)]
        
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Check distance to mouse
        const dx = x - mouseX
        const dy = y - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        // Base color based on theme
        let color = theme === 'dark' ? '#4f46e5' : '#818cf8' // Indigo 600 / 400
        
        // Highlight logic
        if (distance < 100) {
          // Glow intense if near mouse (Cyan for dark, Black/Deep Purple for light)
          color = theme === 'dark' ? '#00f0ff' : '#000000'
        }

        // Randomly make some chars brighter naturally
        if (Math.random() > 0.98 && distance >= 100) {
           color = theme === 'dark' ? '#ffffff' : '#000000'
        }

        ctx.fillStyle = color
        ctx.fillText(char, x, y)
        
        // Reset drop to top if it goes off screen (with some randomness)
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        
        // Move drop down
        drops[i]++
      }
      
      // Control speed
      timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(draw)
      }, 50)
    }
    
    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full opacity-70"
      style={{ pointerEvents: 'none' }}
    />
  )
}
