
'use client';
import type { ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyHeaderProps extends ReactifyComponentProps {
  // Add header specific props here if needed in the future
}

export function ReactifyHeader({
  children,
  className,
  as: Component = 'header',
  ...props
}: ReactifyHeaderProps) {
  return (
    <Component
      className={cn(
        'w-full p-4 bg-card text-card-foreground border-b border-border shadow-sm flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
