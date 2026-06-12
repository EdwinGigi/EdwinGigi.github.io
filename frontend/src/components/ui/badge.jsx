import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 border-primary/20 text-primary',
        secondary: 'bg-surface border-border text-text-primary',
        outline: 'bg-transparent border-border text-text-muted hover:text-text-primary',
        success: 'bg-green-500/10 border-green-500/20 text-green-500',
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
