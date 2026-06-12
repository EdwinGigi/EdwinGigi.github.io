import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 24, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border shadow-lg shadow-black/20 backdrop-blur-xl',
        scrolled ? 'bg-surface/95' : 'bg-surface/60'
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* ── Brand ── */}
        <Link
          to="/"
          className="group relative font-mono text-lg font-bold tracking-widest text-neon-cyan no-underline transition-all hover:text-neon-cyan"
        >
          <span className="relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
            EDWIN<span className="text-neon-magenta">.</span>GIGI
          </span>
          {/* Glow underline on hover */}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-neon-cyan to-neon-magenta transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative px-4 py-2 font-heading text-sm font-medium tracking-wide transition-colors duration-200',
                    isActive
                      ? 'text-neon-cyan drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]'
                      : 'text-text-muted hover:text-neon-cyan'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-neon-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)] transition-all duration-300',
                        isActive
                          ? 'w-3/4'
                          : 'w-0 group-hover:w-1/2'
                      )}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right Section: GitHub + Mobile Toggle ── */}
        <div className="flex items-center gap-3">
          {/* GitHub icon */}
          <a
            href="https://github.com/edwingigi"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg p-2 text-text-muted transition-colors duration-200 hover:bg-surface hover:text-neon-cyan md:flex"
            aria-label="GitHub profile"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-50 rounded-lg border border-neon-cyan/50 bg-neon-cyan/10 p-2 text-neon-cyan backdrop-blur-md transition-colors hover:bg-neon-cyan/20 md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile Fullscreen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="flex flex-col items-center gap-6"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map(({ to, label }) => (
                <motion.li key={to} variants={mobileLinkVariants}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      cn(
                        'font-heading text-3xl font-bold tracking-wider transition-colors duration-200',
                        isActive
                          ? 'text-neon-cyan drop-shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                          : 'text-text-primary hover:text-neon-cyan'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}

              {/* Mobile GitHub link */}
              <motion.li variants={mobileLinkVariants}>
                <a
                  href="https://github.com/edwingigi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-3 font-heading text-lg tracking-wide text-text-muted transition-colors hover:text-neon-cyan"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
              </motion.li>
            </motion.ul>

            {/* Decorative corner accents */}
            <div className="pointer-events-none absolute left-6 top-24 h-8 w-8 border-l-2 border-t-2 border-neon-cyan/30" />
            <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-neon-magenta/30" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
