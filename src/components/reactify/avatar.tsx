
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import type { ImgHTMLAttributes } from 'react';

interface ReactifyAvatarProps extends ReactifyComponentProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode; // Content to show if src is missing or fails to load
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

export function ReactifyAvatar({
  src,
  alt = 'User avatar',
  fallback,
  size = 'md',
  shape = 'circle',
  className,
  as: Component = 'div', // Typically a div or span
  style,
  ...props
}: ReactifyAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-base',
    xl: 'h-24 w-24 text-lg',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  // Generate simple initials from alt text if no src and no explicit fallback
  let displayFallback = fallback;
  if (!src && !fallback && alt) {
    const parts = alt.split(' ');
    if (parts.length > 1) {
      displayFallback = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      displayFallback = `${parts[0][0]}`.toUpperCase();
    } else {
      displayFallback = '?';
    }
  }


  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center bg-muted text-muted-foreground overflow-hidden shadow-sm',
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
      style={{ ...style, backgroundColor: src ? undefined : 'hsl(var(--secondary))' }} // Use secondary if no image
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <span className="font-medium select-none">{displayFallback}</span>
      )}
    </Component>
  );
}
