import * as React from 'react'
import { cn } from '@/lib/utils'

const Separator = React.forwardRef(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0',
        orientation === 'horizontal'
          ? 'h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent'
          : 'h-full w-px bg-gradient-to-b from-transparent via-neon-cyan/40 to-transparent',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = 'Separator'

export { Separator }
