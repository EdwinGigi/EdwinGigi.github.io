import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import portfolioData from '@/data/portfolio-data.json'

const { projects } = portfolioData

export default function ProjectDetail() {
  const { slug } = useParams()
  
  const projectIndex = useMemo(() => projects.findIndex(p => p.slug === slug), [slug])
  const project = projectIndex !== -1 ? projects[projectIndex] : null
  
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="min-h-screen pb-24">
      <Helmet>
        <title>{project.title} — Edwin Gigi</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* ── Hero Section ── */}
      <section className="relative flex min-h-[40vh] items-end justify-center border-b border-border bg-surface px-6 py-16 pt-32">
        {project.image && (
          <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
            <img src={project.image} alt="" className="h-full w-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl">
          <Link 
            to="/projects" 
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-neon-cyan transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-heading text-4xl font-bold tracking-tight md:text-6xl"
          >
            <span className="gradient-text">{project.title}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-lg text-text-muted md:text-xl"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-6 pt-16">
        
        {/* Links row (Mobile: Top, Desktop: Top-right float equivalent handled via flex) */}
        <div className="mb-12 flex flex-wrap gap-4">
          {project.liveUrl && (
            <Button asChild size="lg" className="flex-1 md:flex-none">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg" className="flex-1 md:flex-none">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" /> Source Code
              </a>
            </Button>
          )}
        </div>

        <div className="space-y-16">
          {/* Overview */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading title="Overview" />
            <div className="prose prose-invert mt-6 max-w-none text-text-primary prose-p:leading-relaxed prose-a:text-neon-cyan hover:prose-a:text-neon-magenta">
              <p className="whitespace-pre-wrap">{project.longDescription || project.description}</p>
            </div>
          </motion.section>

          {/* Tech Stack */}
          {project.stack && project.stack.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Tech Stack" />
              <div className="mt-6 flex flex-wrap gap-3">
                {project.stack.map(tech => (
                  <Badge key={tech} variant="neon" className="text-sm px-4 py-2">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.section>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading title="Key Features" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <div key={i} className="glass-panel flex items-start gap-3 p-5 border-border hover:border-neon-cyan/30 transition-colors">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-neon-green" />
                    <span className="text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* ── Navigation Footer ── */}
        <div className="mt-24 grid gap-4 border-t border-border pt-12 sm:grid-cols-2">
          {prevProject ? (
            <Link 
              to={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-2 rounded-xl border border-border bg-surface p-6 transition-all hover:border-neon-cyan/50"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-neon-cyan transition-colors">Previous Project</span>
              <span className="font-heading text-lg font-bold text-text-primary flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}
          
          {nextProject ? (
            <Link 
              to={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end gap-2 rounded-xl border border-border bg-surface p-6 transition-all hover:border-neon-cyan/50 sm:text-right"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-neon-cyan transition-colors">Next Project</span>
              <span className="font-heading text-lg font-bold text-text-primary flex items-center gap-2">
                {nextProject.title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ) : <div />}
        </div>
        
      </div>
    </div>
  )
}
