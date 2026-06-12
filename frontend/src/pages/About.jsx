import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Briefcase, GraduationCap, Code2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/ui/section-heading'
import portfolioData from '@/data/portfolio-data.json'

const { profile } = portfolioData

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function TimelineItem({ item }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative pl-8 md:pl-0">
      {/* ── Desktop Layout: Alternating ── */}
      <div className="hidden md:block">
        {/* Center dot */}
        <motion.div 
          className="absolute left-1/2 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-sm"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>

      {/* ── Mobile Layout: Left dot ── */}
      <div className="block md:hidden">
        <motion.div 
          className="absolute left-[3px] top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-sm"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          <CardContent className="p-6 md:p-8">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              {item.role || item.degree}
            </h3>
            <div className="mb-4 mt-1 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <span className="font-medium text-primary">{item.company || item.institution}</span>
              <span className="text-sm font-medium text-text-secondary bg-surface-hover px-3 py-1 rounded-full">{item.date}</span>
            </div>
            
            {item.points && (
              <ul className="space-y-3 text-sm text-text-muted leading-relaxed">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-primary mt-1 text-xs">◆</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.achievement && (
              <div className="mt-5">
                <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5 text-primary py-1 px-3">
                  <span className="mr-1.5">★</span> {item.achievement}
                </Badge>
              </div>
            )}
            
            {item.modules && (
              <div className="mt-5 flex flex-wrap gap-2">
                {item.modules.map((mod, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-surface border-border text-text-secondary hover:border-text-dim">
                    {mod}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function About() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Timeline line height fills as user scrolls
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="min-h-screen px-6 py-12 pb-24 md:py-24" ref={containerRef}>
      <Helmet>
        <title>About — Edwin Gigi</title>
        <meta name="description" content="Experience, education, and technical skills of Edwin Gigi, Software Engineer." />
      </Helmet>

      <div className="mx-auto max-w-4xl space-y-24">
        
        {/* ── Header ── */}
        <AnimatedSection>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              About Me
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted">
              My journey, experience, and the tools I use to build the future.
            </p>
          </div>
        </AnimatedSection>

        {/* ── Experience Timeline ── */}
        <section>
          <AnimatedSection>
            <div className="mb-12 flex items-center justify-center md:justify-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-text-primary">Experience</h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* The vertical timeline line (Desktop: center, Mobile: left) */}
            <div className="absolute left-[3px] top-6 bottom-0 w-[2px] bg-border md:left-1/2 md:-translate-x-1/2" />
            
            {/* Animated line overlay */}
            <motion.div 
              className="absolute left-[3px] top-6 bottom-0 w-[2px] origin-top bg-primary md:left-1/2 md:-translate-x-1/2"
              style={{ scaleY }}
            />

            <div className="space-y-0">
              {profile.experience.map((exp, idx) => (
                <TimelineItem key={idx} item={exp} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Education ── */}
        <section>
          <AnimatedSection>
            <div className="mb-12 flex items-center justify-center md:justify-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-text-primary">Education</h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-[3px] top-6 bottom-0 w-[2px] bg-border md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-0">
              {profile.education.map((edu, idx) => (
                <TimelineItem key={idx} item={edu} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Technical Skills ── */}
        <section>
          <AnimatedSection>
            <div className="mb-12 flex items-center justify-center md:justify-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Code2 className="h-6 w-6" />
              </div>
              <h2 className="font-heading text-3xl font-bold text-text-primary">Technical Skills</h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-8 md:grid-cols-2">
            {profile.skills.map((category, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <Card className="h-full hover:border-primary/20 transition-colors shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="mb-6 font-heading text-xl font-bold text-text-primary">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {category.items.map((skill, i) => (
                        <Badge key={i} variant="outline" className="px-4 py-2 bg-surface hover:bg-surface-hover transition-colors font-medium text-sm text-text-secondary border-border">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
