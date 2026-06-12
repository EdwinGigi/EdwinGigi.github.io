import * as React from 'react'
import { cn } from '@/lib/utils'

const SectionHeading = React.forwardRef(
  ({ className, title, subtitle, align = 'center', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mb-12',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        align === 'right' && 'text-right',
        className
      )}
      {...props}
    >
      <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>

      {subtitle && (
        <p className="mt-3 text-base text-text-muted sm:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      {/* Neon accent line */}
      <div
        className={cn(
          'mt-4 flex',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end'
        )}
        aria-hidden="true"
      >
        <div className="h-0.5 w-20 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta shadow-[0_0_10px_rgba(0,240,255,0.4)]" />
      </div>
    </div>
  )
)
SectionHeading.displayName = 'SectionHeading'

export { SectionHeading }
