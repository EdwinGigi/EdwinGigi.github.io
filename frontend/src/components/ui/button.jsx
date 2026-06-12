import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-neon-cyan !text-[#000000] hover:!text-[#000000] font-bold hover:bg-neon-cyan/90 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-[0.98]',
        outline:
          'border border-neon-cyan/50 text-neon-cyan bg-transparent hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]',
        ghost: 'text-text-primary hover:bg-surface hover:text-neon-cyan',
        magenta:
          'bg-neon-magenta text-white hover:bg-neon-magenta/90 hover:shadow-[0_0_20px_rgba(255,0,170,0.4)]',
        link: 'text-neon-cyan underline-offset-4 hover:underline hover:text-neon-magenta p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-5 text-sm',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
