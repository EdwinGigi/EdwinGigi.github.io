import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Mail, CheckCircle, Send } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import portfolioData from '@/data/portfolio-data.json'

const { contact } = portfolioData.profile

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      e.target.reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    }, 1500)
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: 'group-hover:border-neon-cyan group-hover:text-neon-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/edwin-gigi',
      href: contact.linkedin,
      color: 'group-hover:border-neon-magenta group-hover:text-neon-magenta group-hover:shadow-[0_0_15px_rgba(255,0,170,0.4)]'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/edwingigi',
      href: contact.github,
      color: 'group-hover:border-neon-green group-hover:text-neon-green group-hover:shadow-[0_0_15px_rgba(57,255,20,0.4)]'
    }
  ]

  return (
    <div className="min-h-screen px-6 py-12 pb-24 md:py-20 relative overflow-hidden">
      <Helmet>
        <title>Contact — Edwin Gigi</title>
        <meta name="description" content="Get in touch with Edwin Gigi for software engineering opportunities and collaborations." />
      </Helmet>

      {/* Decorative background blur */}
      <div className="absolute top-1/4 left-0 -translate-x-1/2 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl space-y-16 relative z-10">
        
        {/* ── Header ── */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl font-bold md:text-5xl mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h1>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* ── Left Column: Contact Info ── */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
              Let's build something together.
            </h2>
            <p className="text-lg text-text-muted mb-10 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </p>

            <div className="space-y-4">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon
                return (
                  <motion.a
                    key={idx}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-panel flex items-center gap-6 p-4 border-border transition-all hover:bg-surface"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-all duration-300 ${method.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-muted uppercase tracking-wider">{method.label}</p>
                      <p className="font-medium text-text-primary group-hover:text-neon-cyan transition-colors">{method.value}</p>
                    </div>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* ── Right Column: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel p-8 border-border relative overflow-hidden h-full">
              {/* Form scanning line effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent h-1 opacity-0 group-focus-within:opacity-100 group-focus-within:animate-scan-line pointer-events-none" />
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-6 rounded-full bg-neon-green/10 p-4">
                    <CheckCircle className="h-16 w-16 text-neon-green" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-neon-green mb-2">Message Sent!</h3>
                  <p className="text-text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                  <Button 
                    variant="outline" 
                    className="mt-8"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10 group">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-text-muted">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text-primary transition-all focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-text-muted">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text-primary transition-all focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-text-muted">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-text-primary transition-all focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-text-muted">Message</label>
                    <textarea 
                      id="message" 
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-border bg-background/50 px-4 py-3 text-text-primary transition-all focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/50"
                      placeholder="Hello Edwin, I would like to talk about..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
