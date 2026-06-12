import * as React from 'react'
import { cn } from '@/lib/utils'

const SectionHeading = React.forwardRef(
  ({ className, title, subtitle, align = 'center', children, ...props }, ref) => (
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
      <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title || children}
      </h2>

      {subtitle && (
        <p className={cn(
          "mt-3 text-base text-text-muted sm:text-lg max-w-2xl",
          align === 'center' && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}

      {/* Subtle accent line */}
      <div
        className={cn(
          'mt-6 flex',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end'
        )}
        aria-hidden="true"
      >
        <div className="h-1 w-16 rounded-full bg-primary/80 shadow-sm" />
      </div>
    </div>
  )
)
SectionHeading.displayName = 'SectionHeading'

export { SectionHeading }
