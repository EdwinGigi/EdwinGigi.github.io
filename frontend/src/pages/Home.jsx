import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, ChevronDown, ArrowRight } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { SectionHeading } from '@/components/ui/section-heading'
import { cn } from '@/lib/utils'
import portfolioData from '@/data/portfolio-data.json'

const { profile, projects } = portfolioData

/* ─────────────────────────────────────────────
   Typewriter Component
   ───────────────────────────────────────────── */
const TYPEWRITER_PHRASES = [
  'Software Engineer',
  'Full Stack Developer',
  'Problem Solver',
]

function Typewriter() {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex]

    const tick = () => {
      if (!isDeleting) {
        // Typing
        const next = currentPhrase.slice(0, displayText.length + 1)
        setDisplayText(next)

        if (next === currentPhrase) {
          // Pause before deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000)
          return
        }
        timeoutRef.current = setTimeout(tick, 80 + Math.random() * 40)
      } else {
        // Deleting
        const next = currentPhrase.slice(0, displayText.length - 1)
        setDisplayText(next)

        if (next === '') {
          setIsDeleting(false)
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length)
          timeoutRef.current = setTimeout(tick, 400)
          return
        }
        timeoutRef.current = setTimeout(tick, 40 + Math.random() * 20)
      }
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? 50 : 120)
    return () => clearTimeout(timeoutRef.current)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <span className="font-mono text-lg text-neon-cyan sm:text-xl md:text-2xl">
      {displayText}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse text-neon-cyan">
        |
      </span>
    </span>
  )
}

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
      // Non-numeric value like "1st" — just display immediately
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="gradient-text font-heading text-4xl font-bold md:text-5xl">
        {isNumeric ? `${display}${suffix}` : value}
      </div>
      <p className="mt-2 text-sm text-text-muted md:text-base">{label}</p>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Featured Project Card Component
   ───────────────────────────────────────────── */
function FeaturedProjectCard({ project, index, reversed }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: reversed ? 80 : -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
    >
      <div
        className={cn(
          'glass-panel group grid gap-0 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
          'md:grid-cols-2',
          'neon-border'
        )}
      >
        {/* Image */}
        <div
          className={cn(
            'relative aspect-video overflow-hidden bg-surface-alt md:aspect-auto md:min-h-[280px]',
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
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface via-surface-alt to-neon-cyan/10">
              <span className="gradient-text font-heading text-3xl font-bold">
                {project.title}
              </span>
            </div>
          )}
          {/* Overlay gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent md:bg-gradient-to-r md:from-background/40 md:via-transparent" />
        </div>

        {/* Content */}
        <div
          className={cn(
            'flex flex-col justify-center p-6 md:p-8 lg:p-10',
            reversed && 'md:order-1'
          )}
        >
          <h3 className="font-heading text-xl font-bold text-text-primary md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-2 text-text-muted">{project.description}</p>

          {/* Tech badges */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-3 py-1 text-xs font-medium text-neon-cyan"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Link */}
          <div className="mt-6">
            <Button variant="link" asChild className="group/link p-0">
              <Link to={`/projects/${project.slug}`}>
                View Details
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────────── */
const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-background" />
      <div className="grid-bg absolute inset-0" />

      {/* Radial glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-neon-magenta/[0.03] blur-[100px]" />

      {/* Content */}
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        {/* Availability badge */}
        <motion.div variants={heroItem}>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-4 py-1.5 text-sm font-medium text-neon-green">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={heroItem}
          className="mt-8 font-heading text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="gradient-text">EDWIN GIGI</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div variants={heroItem} className="mt-4 h-9">
          <Typewriter />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={heroItem}
          className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg"
        >
          {aboutFirstSentence}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={heroItem}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <Link to="/projects">View My Work</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={heroItem}
          className="mt-8 flex items-center gap-3"
        >
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <a
              href={`mailto:${profile.contact.email}`}
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-text-dim uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-text-dim" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   About Summary Section
   ───────────────────────────────────────────── */
function AboutSection() {
  // Highlight key terms in the about text
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
      result = result.replace(regex, `<span class="text-neon-cyan">$1</span>`)
    })
    return result
  }, [])

  // Split about into paragraphs (split on sentences and group)
  const aboutSentences = profile.about.split('. ').filter(Boolean)
  const paragraphs = [
    aboutSentences.slice(0, 2).join('. ') + '.',
    aboutSentences.slice(2).join('. ') + (profile.about.endsWith('.') ? '' : '.'),
  ].filter((p) => p.length > 2)

  const terminalLines = [
    { command: '$ whoami', output: 'Edwin Gigi' },
    { command: '$ role', output: `Software Engineer @ ${profile.experience[0]?.company || 'Darktrace'}` },
    { command: '$ location', output: 'United Kingdom' },
  ]

  const stats = [
    { value: '3', suffix: '+', label: 'Years Experience' },
    { value: '4', suffix: '+', label: 'Projects Built' },
  ]

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading subtitle="A quick introduction to who I am and what I do">
          About Me
        </SectionHeading>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="glass-panel overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-border bg-surface/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
                <span className="ml-2 font-mono text-xs text-text-dim">
                  about.sh
                </span>
              </div>

              {/* Terminal content */}
              <div className="space-y-4 p-5 md:p-6">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  >
                    <p className="font-mono text-sm text-neon-green">
                      {line.command}
                    </p>
                    <p className="mt-1 font-mono text-sm text-text-primary">
                      <span className="text-text-dim">{'> '}</span>
                      {line.output}
                    </p>
                  </motion.div>
                ))}
                {/* Blinking cursor at end */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <span className="inline-block h-4 w-2 animate-pulse bg-neon-green font-mono" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={cn(
                  'text-base leading-relaxed text-text-muted md:text-lg',
                  i > 0 && 'mt-4'
                )}
                dangerouslySetInnerHTML={{
                  __html: renderHighlightedText(paragraph),
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap justify-center gap-16 md:gap-32">
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
    <section className="relative py-20 md:py-28">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-neon-magenta/[0.03] blur-[120px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading subtitle="A selection of recent work that I'm proud of">
          Featured Projects
        </SectionHeading>

        <div className="space-y-8 md:space-y-12">
          {featured.map((project, i) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={i}
              reversed={i % 2 !== 0}
            />
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
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
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass-panel relative overflow-hidden border-neon-magenta/30 p-8 text-center shadow-[0_0_40px_rgba(255,0,170,0.08)] md:p-12"
        >
          {/* Decorative corner accents */}
          <div className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-neon-magenta/40 rounded-tl-[1rem]" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-neon-magenta/40 rounded-br-[1rem]" />

          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-magenta/[0.04] via-transparent to-neon-cyan/[0.03]" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-heading text-3xl font-bold text-text-primary md:text-4xl"
            >
              Let&apos;s Build Something{' '}
              <span className="gradient-text">Together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto mt-4 max-w-lg text-text-muted md:text-lg"
            >
              Whether you have a project in mind, a question, or just want to
              connect — I&apos;d love to hear from you. Let&apos;s create
              something amazing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8"
            >
              <Button size="lg" variant="magenta" asChild>
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
