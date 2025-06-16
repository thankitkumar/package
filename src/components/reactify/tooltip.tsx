
'use client';
import { useState, useRef, useEffect, type ReactNode, Children, isValidElement, cloneElement } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyTooltipProps extends ReactifyComponentProps {
  children: ReactNode; // The trigger element
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number; // Delay in ms before showing the tooltip
}

export function ReactifyTooltip({
  children,
  className,
  content,
  position = 'top',
  delay = 300,
  as: Component = 'div', // The wrapper div
  ...props
}: ReactifyTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'absolute left-1/2 -translate-x-1/2 top-full border-x-8 border-x-transparent border-t-8',
    bottom: 'absolute left-1/2 -translate-x-1/2 bottom-full border-x-8 border-x-transparent border-b-8',
    left: 'absolute top-1/2 -translate-y-1/2 left-full border-y-8 border-y-transparent border-l-8',
    right: 'absolute top-1/2 -translate-y-1/2 right-full border-y-8 border-y-transparent border-r-8',
  }
  
  const arrowColorClass = 'border-popover'; // Assuming popover background color is used

  return (
    <Component 
      className={cn("relative inline-block", className)} 
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip} // For keyboard accessibility
      onBlur={hideTooltip}  // For keyboard accessibility
      tabIndex={0} // Make it focusable if the child isn't inherently
      ref={triggerRef}
      {...props}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          ref={tooltipRef}
          className={cn(
            "absolute z-10 px-3 py-2 text-sm font-medium text-popover-foreground bg-popover rounded-md shadow-lg whitespace-nowrap",
            "transition-opacity duration-150",
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
            positionClasses[position]
          )}
        >
          {content}
          <div className={cn(arrowClasses[position], arrowColorClass)} />
        </div>
      )}
    </Component>
  );
}
