
'use client';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyTextareaProps extends ReactifyComponentProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  // Add other textarea specific props here
}

export function ReactifyTextarea({
  className,
  error,
  as: Component = 'textarea',
  ...props
}: ReactifyTextareaProps) {
  
  const baseStyles = "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

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

