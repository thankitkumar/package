
'use client';
import type { ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyFooterProps extends ReactifyComponentProps {
  // Add footer specific props here if needed in the future
}

export function ReactifyFooter({
  children,
  className,
  as: Component = 'footer',
  ...props
}: ReactifyFooterProps) {
  return (
    <Component
      className={cn(
        'w-full p-4 bg-muted text-muted-foreground border-t border-border text-center text-sm',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
