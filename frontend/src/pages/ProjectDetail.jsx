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
      <section className="relative flex min-h-[40vh] items-end justify-center border-b border-border bg-surface px-6 py-16 pt-32 overflow-hidden">
        {project.image && (
          <div className="absolute inset-0 z-0 overflow-hidden opacity-20 mix-blend-overlay">
            <img src={project.image} alt="" className="h-full w-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          </div>
        )}
        
        <div className="relative z-10 w-full max-w-4xl">
          <Link 
            to="/projects" 
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-heading text-4xl font-bold tracking-tight text-text-primary md:text-6xl"
          >
            {project.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-lg text-text-muted md:text-xl leading-relaxed"
          >
            {project.description}
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-4xl px-6 pt-16">
        
        {/* Links row */}
        <div className="mb-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {project.liveUrl && (
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full shadow-lg shadow-primary/20 px-8 py-6 text-lg !text-white">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-3 h-6 w-6" /> Live Demo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg border-2 hover:bg-surface-hover">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-3 h-6 w-6" /> Source Code
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
            <div className="prose prose-invert mt-6 max-w-none text-text-secondary prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80">
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
                  <Badge key={tech} variant="outline" className="text-sm px-4 py-2 bg-surface text-text-secondary font-medium">
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
                  <div key={i} className="glass-panel flex items-start gap-4 p-6 border-border hover:border-primary/20 transition-colors rounded-2xl">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-text-primary font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* ── Navigation Footer ── */}
        <div className="mt-24 grid gap-6 border-t border-border pt-12 sm:grid-cols-2">
          {prevProject ? (
            <Link 
              to={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start gap-2 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-primary transition-colors">Previous Project</span>
              <span className="font-heading text-lg font-bold text-text-primary flex items-center gap-2">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                {prevProject.title}
              </span>
            </Link>
          ) : <div />}
          
          {nextProject ? (
            <Link 
              to={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end gap-2 rounded-2xl border border-border bg-surface p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:text-right"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted group-hover:text-primary transition-colors">Next Project</span>
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
