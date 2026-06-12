import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Mail } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import portfolioData from '@/data/portfolio-data.json'

const { contact } = portfolioData.profile

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'group-hover:border-primary group-hover:text-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:bg-primary/5'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/edwin-gigi',
      href: contact.linkedin,
      color: 'group-hover:border-primary group-hover:text-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:bg-primary/5'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/edwingigi',
      href: contact.github,
      color: 'group-hover:border-primary group-hover:text-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:bg-primary/5'
    }
  ]

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 pt-12 pb-24 md:py-24 relative overflow-hidden flex flex-col items-center justify-start md:justify-center">
      <Helmet>
        <title>Contact — Edwin Gigi</title>
        <meta name="description" content="Get in touch with Edwin Gigi for software engineering opportunities and collaborations." />
      </Helmet>

      {/* Decorative background blur (Optimized radial gradients) */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 h-[300px] w-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 70%)', opacity: 0.1 }} />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 h-[300px] w-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)', opacity: 0.05 }} />

      <div className="mx-auto max-w-3xl space-y-12 relative z-10 w-full">
        
        {/* ── Header ── */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold tracking-tight text-text-primary md:text-5xl mb-6">
            Get In Touch
          </h1>
          <h2 className="font-heading text-2xl font-bold text-text-secondary mb-4">
            Let's build something together.
          </h2>
          <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
            feel free to reach out through any of the channels below and I'll get back to you!
          </p>
        </motion.div>

        {/* ── Contact Info ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-xl mx-auto"
        >
          {contactMethods.map((method, idx) => {
            const Icon = method.icon
            return (
              <motion.a
                key={idx}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-panel flex items-center gap-6 p-5 border border-border rounded-2xl transition-all hover:bg-surface hover:-translate-y-1"
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 ${method.color}`}>
                  <Icon className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">{method.label}</p>
                  <p className="font-medium text-text-primary group-hover:text-primary transition-colors">{method.value}</p>
                </div>
              </motion.a>
            )
          })}
        </motion.div>

      </div>
    </div>
  )
}

