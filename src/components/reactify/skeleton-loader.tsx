
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifySkeletonLoaderProps extends ReactifyComponentProps {
  // Skeleton-specific props can be added here if needed in the future
}

export function ReactifySkeletonLoader({
  className,
  as: Component = 'div',
  ...props
}: ReactifySkeletonLoaderProps) {
  return (
    <Component
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
      {...props}
    />
  );
}
