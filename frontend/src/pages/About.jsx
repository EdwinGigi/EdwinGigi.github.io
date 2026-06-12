import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Briefcase, GraduationCap, Code2, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

function TimelineItem({ item, isLast }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative pl-8 md:pl-0">
      {/* ── Desktop Layout: Alternating ── */}
      <div className="hidden md:block">
        {/* Center dot */}
        <motion.div 
          className="absolute left-1/2 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.6)]"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>

      {/* ── Mobile Layout: Left dot ── */}
      <div className="block md:hidden">
        <motion.div 
          className="absolute left-[3px] top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.6)]"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="hover:border-neon-cyan/40">
          <CardContent className="p-6">
            <h3 className="font-heading text-xl font-bold text-neon-cyan">
              {item.role || item.degree}
            </h3>
            <div className="mb-4 mt-1 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-4">
              <span className="font-medium text-text-primary">{item.company || item.institution}</span>
              <span className="text-sm text-text-muted">{item.date}</span>
            </div>
            
            {item.points && (
              <ul className="space-y-2 text-sm text-text-muted">
                {item.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-neon-cyan mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.achievement && (
              <div className="mt-4">
                <Badge variant="green" className="text-sm">🏆 {item.achievement}</Badge>
              </div>
            )}
            
            {item.modules && (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.modules.map((mod, i) => (
                  <Badge key={i} variant="outline" className="text-xs">{mod}</Badge>
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
    <div className="min-h-screen px-6 py-12 pb-24 md:py-20" ref={containerRef}>
      <Helmet>
        <title>About — Edwin Gigi</title>
        <meta name="description" content="Experience, education, and technical skills of Edwin Gigi, Software Engineer." />
      </Helmet>

      <div className="mx-auto max-w-4xl space-y-24">
        
        {/* ── Header ── */}
        <AnimatedSection>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              <span className="gradient-text">About Me</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">
              My journey, experience, and the tools I use to build the future.
            </p>
          </div>
        </AnimatedSection>

        {/* ── Experience Timeline ── */}
        <section>
          <AnimatedSection>
            <div className="mb-10 flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-neon-cyan" />
              <SectionHeading title="Experience" />
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* The vertical timeline line (Desktop: center, Mobile: left) */}
            <div className="absolute left-[3px] top-6 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            
            {/* Animated neon line overlay */}
            <motion.div 
              className="absolute left-[3px] top-6 bottom-0 w-0.5 origin-top bg-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] md:left-1/2 md:-translate-x-1/2"
              style={{ scaleY }}
            />

            <div className="space-y-0">
              {profile.experience.map((exp, idx) => (
                <TimelineItem key={idx} item={exp} isLast={idx === profile.experience.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Education ── */}
        <section>
          <AnimatedSection>
            <div className="mb-10 flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-neon-magenta" />
              <SectionHeading title="Education" />
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-[3px] top-6 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-0">
              {profile.education.map((edu, idx) => (
                <TimelineItem key={idx} item={edu} isLast={idx === profile.education.length - 1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Technical Skills ── */}
        <section>
          <AnimatedSection>
            <div className="mb-10 flex items-center gap-3">
              <Code2 className="h-6 w-6 text-neon-green" />
              <SectionHeading title="Technical Skills" />
            </div>
          </AnimatedSection>

          <div className="grid gap-6 md:grid-cols-2">
            {profile.skills.map((category, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <Card className="h-full hover:border-neon-cyan/30">
                  <CardContent className="p-6">
                    <h3 className="mb-6 font-heading text-lg font-semibold text-neon-cyan border-b border-border pb-2">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill, i) => (
                        <Badge key={i} variant="neon" className="px-3 py-1.5 hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] cursor-default">
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
