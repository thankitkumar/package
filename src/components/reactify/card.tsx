'use client';
import { cn } from '@/lib/utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyCardProps extends ReactifyComponentProps {
  // Add card specific props here
}

export function ReactifyCard({
  children,
  className,
  as: Component = 'div',
  ...props
}: ReactifyCardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm p-6', // Basic card styling
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Optional sub-components for structure, similar to ShadCN's Card
export function ReactifyCardHeader({ children, className, ...props }: ReactifyComponentProps) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props}>{children}</div>;
}
ReactifyCardHeader.displayName = "ReactifyCardHeader";

export function ReactifyCardTitle({ children, className, ...props }: ReactifyComponentProps) {
  return <h3 className={cn("text-xl font-semibold leading-none tracking-tight", className)} {...props}>{children}</h3>;
}
ReactifyCardTitle.displayName = "ReactifyCardTitle";

export function ReactifyCardDescription({ children, className, ...props }: ReactifyComponentProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</p>;
}
ReactifyCardDescription.displayName = "ReactifyCardDescription";

export function ReactifyCardContent({ children, className, ...props }: ReactifyComponentProps) {
  return <div className={cn("", className)} {...props}>{children}</div>;
}
ReactifyCardContent.displayName = "ReactifyCardContent";

export function ReactifyCardFooter({ children, className, ...props }: ReactifyComponentProps) {
  return <div className={cn("flex items-center pt-4", className)} {...props}>{children}</div>;
}
ReactifyCardFooter.displayName = "ReactifyCardFooter";
