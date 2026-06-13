import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, ChevronDown, ArrowRight, Terminal, ExternalLink } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'
import portfolioData from '@/data/portfolio-data.json'
import MatrixBackground from '@/components/MatrixBackground'

const { profile, projects } = portfolioData

/* ─────────────────────────────────────────────
   Animated Counter Component
   ───────────────────────────────────────────── */
function AnimatedStat({ value, suffix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseInt(value, 10)
    if (isNaN(numericValue)) {
      return
    }

    const controls = animate(0, numericValue, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, value])

  const isNumeric = !isNaN(parseInt(value, 10))

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-heading text-4xl font-bold tracking-tight text-primary md:text-5xl">
        {isNumeric ? `${display}${suffix}` : value}
      </div>
      <p className="mt-2 text-sm font-medium uppercase tracking-wider text-text-muted md:text-xs">{label}</p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Featured Project Card Component with 3D Tilt
   ───────────────────────────────────────────── */
function FeaturedProjectCard({ project, index, reversed }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Subtle tilt range
  const rotateX = useTransform(y, [-200, 200], [5, -5])
  const rotateY = useTransform(x, [-200, 200], [-5, 5])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          'glass-panel group grid gap-0 overflow-hidden transition-colors duration-500 hover:shadow-2xl hover:shadow-primary/20',
          'md:grid-cols-2 rounded-2xl border border-border'
        )}
      >
        {/* Image */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className={cn(
            'relative aspect-video overflow-hidden bg-surface-hover md:aspect-auto md:min-h-[320px]',
            reversed && 'md:order-2'
          )}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-hover">
              <span className="font-heading text-2xl font-bold text-text-muted">
                {project.title}
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r md:from-background/60 md:via-transparent" />
        </div>

        {/* Content */}
        <div
          style={{ transform: "translateZ(40px)" }}
          className={cn(
            'flex flex-col justify-center p-8 md:p-10',
            reversed && 'md:order-1'
          )}
        >
          <h3 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-6">
            <Button asChild variant="default" className="rounded-full shadow-md shadow-primary/10 !text-white">
              <Link to={`/projects/${project.slug}`}>
                Details
              </Link>
            </Button>
            
            {(project.videoUrl || project.liveUrl) && (
              <Button asChild variant="outline" className="rounded-full" title="Live Demo">
                {project.videoUrl ? (
                  <Link to={`/projects/${project.slug}#demo`}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                ) : (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                )}
              </Button>
            )}
            
            {project.githubUrl && (
              <Button asChild variant="outline" className="rounded-full" title="Source Code">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Source Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Typewriter Hook
   ───────────────────────────────────────────── */
function useTypewriter(words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  useEffect(() => {
    let timer;
    const currentWord = words[loopNum % words.length]

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setLoopNum((prev) => prev + 1)
    } else if (isDeleting) {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length - 1))
      }, deletingSpeed)
    } else {
      timer = setTimeout(() => {
        setText(currentWord.substring(0, text.length + 1))
      }, typingSpeed)
    }

    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime])

  return text
}

/* ─────────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────────── */
const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function HeroSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const aboutFirstSentence = profile.about.split('. ').slice(0, 1).join('. ') + '.'
  const roles = ["Software Engineer", "Full Stack Developer", "Problem Solver"]
  const currentRole = useTypewriter(roles, 80, 50, 2000)

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <MatrixBackground />

      {/* Radial subtle glassmorphism orbs */}
      <div className="absolute top-1/4 left-1/4 h-[250px] w-[250px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.15 }} />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)', opacity: 0.15 }} />

      {/* Content */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        {/* Name with animated gradient */}
        <motion.h1
          variants={heroItem}
          className="mt-8 font-heading text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.primary),theme(colors.accent),theme(colors.purple.500),theme(colors.primary))] bg-[length:200%_auto] animate-gradient">
            Edwin Gigi
          </span>
        </motion.h1>

        {/* Animated Typewriter Subtitle */}
        <motion.h2 
          variants={heroItem} 
          className="mt-6 text-xl font-mono font-medium tracking-wide text-text-primary md:text-2xl h-8 flex items-center justify-center"
        >
          <span className="text-primary mr-2">&gt;</span>
          {currentRole}
          <span className="animate-pulse ml-1 inline-block w-2.5 h-6 bg-primary" />
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={heroItem}
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg glass-panel py-4 px-6 rounded-2xl md:rounded-3xl inline-block"
        >
          {aboutFirstSentence}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroItem}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 !text-white" asChild>
            <Link to="/projects">View My Work</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full bg-surface/50 backdrop-blur-md" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={heroItem}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full glass-panel p-3 text-text-muted transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full glass-panel p-3 text-text-muted transition-colors hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            aria-label="Email"
            className="rounded-full glass-panel p-3 text-text-muted transition-colors hover:text-primary"
          >
            <Mail className="h-5 w-5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-10 w-6 justify-center rounded-full border-2 border-text-dim pt-2 glass-panel"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   About Summary Section
   ───────────────────────────────────────────── */
function AboutSection() {
  const highlightTerms = [
    'full-stack development',
    'RESTful API design',
    'project management',
    'software architecture',
    'SOLID principles',
    'scalable',
    'maintainable',
  ]

  const renderHighlightedText = useCallback((text) => {
    let result = text
    highlightTerms.forEach((term) => {
      const regex = new RegExp(`(${term})`, 'gi')
      result = result.replace(regex, `<span class="text-text-primary font-medium">$1</span>`)
    })
    return result
  }, [])

  const aboutSentences = profile.about.split('. ').filter(Boolean)
  const paragraphs = [
    aboutSentences.slice(0, 2).join('. ') + '.',
    aboutSentences.slice(2).join('. ') + (profile.about.endsWith('.') ? '' : '.'),
  ].filter((p) => p.length > 2)

  const stats = [
    { value: '3', suffix: '+', label: 'Years Experience' },
    { value: '4', suffix: '+', label: 'Projects Built' },
  ]

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading subtitle="A quick introduction to who I am and what I do">
          About Me
        </SectionHeading>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="glass-panel h-full rounded-2xl p-8 md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">Technical Profile</h3>
              <p className="text-text-muted mb-6">Software Engineer @ {profile.experience[0]?.company || 'Darktrace'} • United Kingdom</p>
              
              <div className="space-y-4">
                <div className="rounded-lg bg-surface/50 p-4 border border-border">
                  <p className="text-sm font-medium text-text-secondary">Core Expertise</p>
                  <p className="mt-1 text-sm text-text-muted">React, Node.js, TypeScript, Cloud Infrastructure</p>
                </div>
                <div className="rounded-lg bg-surface/50 p-4 border border-border">
                  <p className="text-sm font-medium text-text-secondary">Current Focus</p>
                  <p className="mt-1 text-sm text-text-muted">Building highly scalable microservices</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  'text-base leading-relaxed text-text-muted md:text-lg',
                  i > 0 && 'mt-6'
                )}
                dangerouslySetInnerHTML={{
                  __html: renderHighlightedText(paragraph),
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-16 md:gap-32">
          {stats.map((stat, i) => (
            <AnimatedStat
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Featured Projects Section
   ───────────────────────────────────────────── */
function FeaturedProjectsSection() {
  const featured = projects.slice(0, 2)

  return (
    <section className="relative py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeading subtitle="A selection of recent work that I'm proud of">
          Featured Projects
        </SectionHeading>

        <div className="space-y-12 md:space-y-24">
          {featured.map((project, i) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={i}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Button variant="outline" size="lg" className="rounded-full bg-surface/50 backdrop-blur-md" asChild>
            <Link to="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Contact CTA Section
   ───────────────────────────────────────────── */
function ContactCtaSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass-panel relative overflow-hidden rounded-3xl p-10 text-center shadow-2xl shadow-primary/5 md:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl"
            >
              Let&apos;s Build Something <span className="text-primary font-medium">Together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-lg text-text-muted"
            >
              Whether you have a project in mind, a question, or just want to
              connect — I&apos;d love to hear from you. Let&apos;s create
              something amazing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 !text-white" asChild>
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Home Page — Main Export
   ───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjectsSection />
      <ContactCtaSection />
    </>
  )
}
