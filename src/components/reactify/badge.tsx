
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyBadgeProps extends ReactifyComponentProps {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export function ReactifyBadge({
  children,
  className,
  variant = 'primary',
  size = 'md',
  as: Component = 'span',
  ...props
}: ReactifyBadgeProps) {

  const baseStyles = "inline-flex items-center rounded-full font-semibold";
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'text-foreground border border-border',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  return (
    <Component
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
