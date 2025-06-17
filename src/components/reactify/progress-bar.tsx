
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyProgressBarProps extends ReactifyComponentProps {
  value?: number;
  size?: 'sm' | 'md' | 'lg';
  showValueLabel?: boolean; // For sr-only text
  variant?: 'primary' | 'success' | 'warning' | 'destructive' | 'default';
  label?: string; // For accessibility
}

export function ReactifyProgressBar({
  className,
  value = 0,
  size = 'md',
  showValueLabel = false, // Keep this for potential future visual label, currently for sr-only
  variant = 'primary',
  label = 'Loading progress',
  as: Component = 'div',
  ...props
}: ReactifyProgressBarProps) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-muted-foreground',
    primary: 'bg-primary',
    success: 'bg-green-500', // Consider using theme colors if available
    warning: 'bg-yellow-500', // Consider using theme colors if available
    destructive: 'bg-destructive',
  };

  return (
    <Component
      className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size], className)}
      role="progressbar"
      aria-valuenow={normalizedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      {...props}
    >
      <div
        className={cn('h-full rounded-full transition-all duration-300 ease-in-out', variantClasses[variant])}
        style={{ width: `${normalizedValue}%` }}
      />
      {showValueLabel && (
        <span className="sr-only">{normalizedValue}%</span>
      )}
    </Component>
  );
}
