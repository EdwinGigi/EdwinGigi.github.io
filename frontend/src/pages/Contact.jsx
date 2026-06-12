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
    <div className="min-h-screen px-6 py-12 pb-24 md:py-24 relative overflow-hidden">
      <Helmet>
        <title>Contact — Edwin Gigi</title>
        <meta name="description" content="Get in touch with Edwin Gigi for software engineering opportunities and collaborations." />
      </Helmet>

      {/* Decorative background blur */}
      <div className="glow-orb top-1/4 left-0 -translate-x-1/2 h-[600px] w-[600px] bg-primary/10" />
      <div className="glow-orb bottom-0 right-0 translate-x-1/3 translate-y-1/3 h-[600px] w-[600px] bg-accent/5" />

      <div className="mx-auto max-w-6xl space-y-16 relative z-10">
        
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
            </div>
          </motion.div>

          {/* ── Right Column: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-panel p-8 md:p-10 border border-border rounded-3xl relative overflow-hidden h-full shadow-2xl shadow-primary/5">
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-6 rounded-full bg-primary/10 p-5">
                    <CheckCircle className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-text-primary mb-3">Message Sent!</h3>
                  <p className="text-text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                  <Button 
                    variant="outline" 
                    className="mt-10 rounded-full"
                    onClick={() => setIsSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-text-secondary">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full rounded-xl border border-border bg-surface-hover/50 px-4 py-3.5 text-text-primary transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-text-secondary">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="w-full rounded-xl border border-border bg-surface-hover/50 px-4 py-3.5 text-text-primary transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-text-secondary">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      required
                      className="w-full rounded-xl border border-border bg-surface-hover/50 px-4 py-3.5 text-text-primary transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-text-secondary">Message</label>
                    <textarea 
                      id="message" 
                      required
                      rows={5}
                      className="w-full resize-none rounded-xl border border-border bg-surface-hover/50 px-4 py-3.5 text-text-primary transition-all focus:border-primary focus:bg-surface focus:outline-none focus:ring-4 focus:ring-primary/10"
                      placeholder="Hello Edwin, I would like to talk about..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-full h-12 shadow-md shadow-primary/10 mt-2" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
