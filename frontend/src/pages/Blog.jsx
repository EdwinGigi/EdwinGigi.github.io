import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Terminal, Code2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Blog() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center p-6 relative">
      <Helmet>
        <title>Blog — Edwin Gigi</title>
        <meta name="description" content="Thoughts, tutorials, and insights on software engineering." />
      </Helmet>

      {/* Decorative background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center z-10 w-full max-w-2xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl font-bold md:text-5xl mb-6">
            <span className="gradient-text">Transmission Log</span>
          </h1>
          <p className="text-lg text-text-muted">
            Articles and thoughts on software engineering, architecture, and technology.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-panel overflow-hidden border-border"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-border bg-surface-alt px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-neon-green/80" />
            </div>
            <span className="ml-2 font-mono text-xs text-text-muted flex items-center gap-1">
              <Terminal className="h-3 w-3" /> blog_module.init
            </span>
          </div>
          
          {/* Terminal Body */}
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            <motion.div 
              className="mb-6 rounded-full bg-neon-magenta/10 p-4 relative"
              animate={{ boxShadow: ['0 0 0 rgba(255,0,170,0)', '0 0 20px rgba(255,0,170,0.3)', '0 0 0 rgba(255,0,170,0)'] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Code2 className="h-10 w-10 text-neon-magenta" />
            </motion.div>
            
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-3">
              Module Initializing...
            </h2>
            
            <p className="text-text-muted mb-8 max-w-md">
              The blog system is currently under construction. I'm building an MDX-powered engine to share my technical writings. Check back soon!
            </p>

            <Button asChild variant="outline" className="group">
              <Link to="/projects">
                View My Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
