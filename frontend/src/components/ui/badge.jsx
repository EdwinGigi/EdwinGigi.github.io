import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-surface border-border text-text-muted',
        neon: 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan',
        magenta: 'bg-neon-magenta/10 border-neon-magenta/30 text-neon-magenta',
        green: 'bg-neon-green/10 border-neon-green/30 text-neon-green',
        outline: 'bg-transparent border-border text-text-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(badgeVariants({ variant, className }))}
    {...props}
  />
))
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
