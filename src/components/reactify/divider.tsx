
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyDividerProps extends ReactifyComponentProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export function ReactifyDivider({
  className,
  orientation = 'horizontal',
  decorative = true,
  as, 
  ...props
}: ReactifyDividerProps) {
  const Component = orientation === 'horizontal' ? (as || 'hr') : (as || 'div');

  return (
    <Component
      role={decorative ? 'separator' : undefined}
      aria-orientation={decorative ? orientation : undefined}
      className={cn(
        orientation === 'horizontal'
          ? 'h-px w-full bg-border my-4'
          : 'w-px self-stretch bg-border mx-4', // Use self-stretch for vertical in flex
        className
      )}
      {...props}
    />
  );
}
