import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import portfolioData from '@/data/portfolio-data.json'

const { projects } = portfolioData

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  // Extract all unique tech stack items across all projects
  const allTags = useMemo(() => {
    const tags = new Set()
    projects.forEach(p => {
      if (p.stack) {
        p.stack.forEach(tech => tags.add(tech))
      }
    })
    return ['All', ...Array.from(tags).sort()]
  }, [])

  // Filter projects based on active tag
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter(p => p.stack && p.stack.includes(activeFilter))
  }, [activeFilter])

  return (
    <div className="min-h-screen px-6 py-12 pb-24 md:py-20">
      <Helmet>
        <title>Projects — Edwin Gigi</title>
        <meta name="description" content="Explore software engineering projects by Edwin Gigi, including full-stack apps and tools." />
      </Helmet>

      <div className="mx-auto max-w-6xl space-y-12">
        
        {/* ── Header ── */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold md:text-5xl mb-6">
            <span className="gradient-text">Featured Projects</span>
          </h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            A selection of my recent work, showcasing my skills in full-stack development, 
            problem-solving, and modern web technologies.
          </p>
        </motion.div>

        {/* ── Filter Bar ── */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-neon-cyan text-background shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-surface border border-border text-text-muted hover:border-neon-cyan/50 hover:text-neon-cyan'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* ── Projects Grid ── */}
        <motion.div layout className="grid gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Card className="group h-full flex flex-col overflow-hidden hover:border-neon-cyan/40 hover:-translate-y-1 transition-all duration-300">
                  {/* Image Container */}
                  <Link to={`/projects/${project.slug}`} className="block relative h-60 overflow-hidden border-b border-border">
                    {project.image ? (
                      <>
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-300" />
                      </>
                    ) : (
                      <div className="h-full w-full bg-surface-alt flex items-center justify-center bg-gradient-to-br from-surface to-background">
                        <span className="font-heading text-2xl font-bold text-text-muted/50">{project.title}</span>
                      </div>
                    )}
                    
                    {/* Hover overlay with button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="flex items-center gap-2 rounded-full border border-neon-cyan bg-neon-cyan/10 px-6 py-2 font-medium text-neon-cyan">
                        View Case Study <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-2xl font-bold text-neon-cyan mb-3">
                      <Link to={`/projects/${project.slug}`} className="hover:text-neon-cyan">
                        {project.title}
                      </Link>
                    </h3>
                    
                    <p className="text-text-muted mb-6 flex-1 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.stack?.slice(0, 4).map((tech, i) => (
                        <Badge key={i} variant="neon" className="bg-neon-cyan/5 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.stack?.length > 4 && (
                        <Badge variant="outline" className="text-xs">+{project.stack.length - 4} more</Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-auto">
                      <Button asChild variant="default" size="sm" className="flex-1">
                        <Link to={`/projects/${project.slug}`}>
                          Details
                        </Link>
                      </Button>
                      
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="icon" className="shrink-0" title="Source Code">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                          </a>
                        </Button>
                      )}
                      
                      {project.liveUrl && (
                        <Button asChild variant="outline" size="icon" className="shrink-0" title="Live Demo">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Live Demo</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-border bg-surface p-12 text-center"
          >
            <p className="text-lg text-text-muted">No projects found with the selected technology.</p>
            <Button variant="link" onClick={() => setActiveFilter('All')} className="mt-4">
              Clear Filter
            </Button>
          </motion.div>
        )}

      </div>
    </div>
  )
}
