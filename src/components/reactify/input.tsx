'use client';
import type { InputHTMLAttributes } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyInputProps extends ReactifyComponentProps, InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  // Add other input specific props here, e.g. for icons
}

export function ReactifyInput({
  className,
  error,
  as: Component = 'input',
  ...props
}: ReactifyInputProps) {
  
  const baseStyles = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Component
      className={cn(
        baseStyles,
        error && 'border-destructive focus-visible:ring-destructive',
        className
      )}
      aria-invalid={error ? "true" : "false"}
      {...props}
    />
  );
}
