import { useState, useEffect, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { Github } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useTheme } from '@/components/ThemeProvider'

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
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.03, staggerDirection: -1 },
  },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="relative z-50 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* ── Brand ── */}
        <Link
          to="/"
          onClick={() => {
            if (window.location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="group relative font-heading text-lg font-bold tracking-tight text-text-primary transition-colors hover:text-primary"
        >
          Edwin <span className="text-primary font-medium">Gigi</span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <ul className="hidden items-center gap-2 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={() => {
                  if (window.location.pathname === to) {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className={({ isActive }) =>
                  cn(
                    'group relative px-4 py-2 font-sans text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-primary'
                      : 'text-text-muted hover:text-text-primary'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {/* Animated underline */}
                    <span
                      className={cn(
                        'absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 bg-primary transition-all duration-300 rounded-full',
                        isActive
                          ? 'w-1/2 opacity-100'
                          : 'w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-50'
                      )}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right Section: GitHub + Theme Toggle + Mobile Toggle ── */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* GitHub icon */}
          <a
            href="https://github.com/edwingigi"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-text-muted transition-colors hover:text-primary md:block p-2"
            aria-label="GitHub profile"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-md p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary md:hidden"
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-start pt-32 bg-background/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="flex flex-col items-center gap-8 w-full px-6"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map(({ to, label }) => (
                <motion.li key={to} variants={mobileLinkVariants} className="w-full text-center">
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => {
                      if (window.location.pathname === to) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                      closeMobile()
                    }}
                    className={({ isActive }) =>
                      cn(
                        'block w-full py-3 font-heading text-2xl font-semibold tracking-wide transition-colors duration-200',
                        isActive
                          ? 'text-primary'
                          : 'text-text-secondary hover:text-text-primary'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}

              <div className="h-px w-12 bg-border my-2" />

              {/* Mobile GitHub link */}
              <motion.li variants={mobileLinkVariants}>
                <a
                  href="https://github.com/edwingigi"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-3 font-sans text-base text-text-muted transition-colors hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
