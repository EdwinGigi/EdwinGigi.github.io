import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Home, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const [terminalLines, setTerminalLines] = useState([
    { text: '$ locate page', color: 'text-success', delay: 0 }
  ])

  useEffect(() => {
    const sequence = [
      { text: '> SCANNING SYSTEM DIRECTORIES...', color: 'text-text-muted', delay: 800 },
      { text: '> ERROR: 404', color: 'text-error font-bold', delay: 800 },
      { text: '> PAGE DELETED OR MOVED', color: 'text-error', delay: 800 },
      { text: '> ERROR: PATH_NOT_FOUND', color: 'text-error font-bold animate-pulse', delay: 600 }
    ]

    const timers = sequence.map((line, index) => {
      return setTimeout(() => {
        setTerminalLines(prev => [...prev, line])
      }, sequence.slice(0, index + 1).reduce((acc, curr) => acc + curr.delay, 0))
    })

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [])

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-6 relative overflow-hidden">
      <Helmet>
        <title>404: Not Found — Edwin Gigi</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* CSS for Glitch Effect */}
      <style dangerouslySetInnerHTML={{__html: `
        .glitch-wrapper {
          position: relative;
        }
        .glitch-text {
          position: relative;
          color: var(--color-text-primary);
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -2px 0 #6366f1;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -2px 0 #38bdf8;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim-1 {
          0% { clip-path: polygon(0 15%, 100% 15%, 100% 30%, 0 30%); }
          20% { clip-path: polygon(0 75%, 100% 75%, 100% 85%, 0 85%); }
          40% { clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%); }
          60% { clip-path: polygon(0 45%, 100% 45%, 100% 55%, 0 55%); }
          80% { clip-path: polygon(0 85%, 100% 85%, 100% 95%, 0 95%); }
          100% { clip-path: polygon(0 25%, 100% 25%, 100% 40%, 0 40%); }
        }
        @keyframes glitch-anim-2 {
          0% { clip-path: polygon(0 55%, 100% 55%, 100% 70%, 0 70%); }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 25%, 0 25%); }
          40% { clip-path: polygon(0 85%, 100% 85%, 100% 100%, 0 100%); }
          60% { clip-path: polygon(0 35%, 100% 35%, 100% 50%, 0 50%); }
          80% { clip-path: polygon(0 65%, 100% 65%, 100% 80%, 0 80%); }
          100% { clip-path: polygon(0 5%, 100% 5%, 100% 15%, 0 15%); }
        }
      `}} />

      <div className="text-center z-10 w-full max-w-md">
        
        {/* 404 Text */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glitch-wrapper mb-8"
        >
          <h1 
            className="glitch-text font-heading text-8xl font-black md:text-9xl drop-shadow-md"
            data-text="404"
          >
            404
          </h1>
          <p className="mt-4 font-heading text-xl uppercase tracking-[0.2em] text-text-muted">
            Entity Not Found
          </p>
        </motion.div>

        {/* Terminal Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass-panel mx-auto mb-10 w-full overflow-hidden border-border text-left"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-2">
            <Terminal className="h-4 w-4 text-text-muted" />
            <span className="font-mono text-xs text-text-muted">system_diagnostic.exe</span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-4 font-mono text-sm leading-relaxed min-h-[120px]">
            {terminalLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.color}
              >
                {line.text}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="mt-1 inline-block h-4 w-2 bg-text-primary"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> Return to Base
            </Link>
          </Button>
        </motion.div>
        
      </div>
    </div>
  )
}
