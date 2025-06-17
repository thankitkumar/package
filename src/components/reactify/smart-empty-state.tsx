
'use client';

import type { ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { ReactifySkeletonLoader } from './skeleton-loader';
import { Inbox } from 'lucide-react'; // Default icon

interface ReactifySmartEmptyStateProps<T = any> extends ReactifyComponentProps {
  data?: T[] | null;
  isLoading?: boolean;
  children: ReactNode; // Content to render if data is not empty and not loading

  // Props for default empty state
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: ReactNode;
  emptyStateActions?: ReactNode;

  // Prop for completely custom empty state
  emptyStateContent?: ReactNode;

  // Prop for custom loading state
  loadingStateContent?: ReactNode;

  // Optional custom function to determine if data is empty
  checkIsEmpty?: (data: T[] | undefined | null) => boolean;

  // ClassName for the container of the default empty/loading state
  stateContainerClassName?: string;
}

export function ReactifySmartEmptyState<T = any>({
  children,
  className,
  data,
  isLoading = false,
  emptyStateTitle = "No Data Found",
  emptyStateDescription = "There is no data to display at the moment. Try adding some!",
  emptyStateIcon, // Default will be Inbox icon
  emptyStateActions,
  emptyStateContent,
  loadingStateContent,
  checkIsEmpty,
  stateContainerClassName,
  as: Component = 'div',
  ...props
}: ReactifySmartEmptyStateProps<T>) {

  const isDataEmpty = checkIsEmpty ? checkIsEmpty(data) : (!data || data.length === 0);
  const DefaultEmptyStateIcon = emptyStateIcon === undefined ? <Inbox className="h-16 w-16 text-muted-foreground/70" /> : emptyStateIcon;

  if (isLoading) {
    if (loadingStateContent) {
      return <Component className={cn(stateContainerClassName, className)} {...props}>{loadingStateContent}</Component>;
    }
    // Default loading state
    return (
      <Component className={cn("w-full p-4 space-y-3", stateContainerClassName, className)} {...props}>
        <ReactifySkeletonLoader className="h-8 w-3/4 rounded-md" />
        <ReactifySkeletonLoader className="h-6 w-1/2 rounded-md" />
        <ReactifySkeletonLoader className="h-20 w-full rounded-md" />
      </Component>
    );
  }

  if (isDataEmpty) {
    if (emptyStateContent) {
      return <Component className={cn(stateContainerClassName, className)} {...props}>{emptyStateContent}</Component>;
    }
    // Default empty state
    return (
      <Component 
        className={cn(
            "flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg border-border bg-muted/20 min-h-[250px]", 
            stateContainerClassName, 
            className
        )} 
        {...props}
      >
        {DefaultEmptyStateIcon && <div className="mb-4">{DefaultEmptyStateIcon}</div>}
        {emptyStateTitle && <h3 className="text-xl font-semibold text-foreground mb-2">{emptyStateTitle}</h3>}
        {emptyStateDescription && <p className="text-muted-foreground mb-5 max-w-md">{emptyStateDescription}</p>}
        {emptyStateActions && <div className="flex gap-3">{emptyStateActions}</div>}
      </Component>
    );
  }

  return <>{children}</>;
}
