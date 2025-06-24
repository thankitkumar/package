'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import type { SVGAttributes } from 'react';

interface ReactifySpinnerProps extends ReactifyComponentProps, Omit<SVGAttributes<SVGSVGElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'default';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string; // For accessibility
}

export function ReactifySpinner({
  className,
  variant = 'primary',
  size = 'md',
  label = 'Loading...',
  as: Component = 'svg', // The component itself will be an SVG
  ...props
}: ReactifySpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const variantClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary-foreground',
    destructive: 'text-destructive',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    default: 'text-muted-foreground',
  };

  return (
    <div role="status" className="inline-flex items-center justify-center">
      <Component
        className={cn(
          'animate-spin',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        {...props}
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </Component>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
