import { Link } from 'react-router-dom'
import { Mail, ArrowUp } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/icons'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

const socialLinks = [
  {
    href: 'https://github.com/edwingigi',
    label: 'GitHub',
    icon: Github,
  },
  {
    href: 'https://linkedin.com/in/edwin-gigi',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'mailto:edwingigi2012@gmail.com',
    label: 'Email',
    icon: Mail,
  },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
        {/* ── 3-Column Grid ── */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              className="font-heading text-xl font-bold tracking-tight text-text-primary no-underline transition-colors hover:text-primary"
            >
              Edwin <span className="font-medium text-primary">Gigi</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Building the future, one line at a time.
            </p>
            {/* Small decorative line */}
            <div className="h-px w-12 bg-border" />
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-text-primary">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group flex items-center gap-2 text-sm text-text-muted no-underline transition-colors duration-200 hover:text-primary"
                  >
                    <span className="inline-block h-px w-3 bg-border transition-all duration-200 group-hover:w-5 group-hover:bg-primary" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="space-y-4">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-text-primary">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center gap-3 text-sm text-text-muted no-underline transition-colors duration-200 hover:text-primary"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface transition-all duration-200 group-hover:border-primary group-hover:bg-primary/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-text-dim">
            &copy; {new Date().getFullYear()} Edwin Gigi. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-text-muted transition-all duration-200 hover:border-primary hover:text-primary hover:bg-primary/5"
            aria-label="Back to top"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}
