
'use client';

import type { ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { X } from 'lucide-react';

interface ReactifySidebarProps extends ReactifyComponentProps {
  isOpen: boolean;
  onClose?: () => void;
  position?: 'left' | 'right';
  title?: string;
  showOverlay?: boolean;
  widthClass?: string;
}

export function ReactifySidebar({
  children,
  className,
  isOpen,
  onClose,
  position = 'left',
  title,
  showOverlay = true,
  widthClass = 'w-72', // Default width
  as: Component = 'aside',
  ...props
}: ReactifySidebarProps) {
  return (
    <>
      {showOverlay && (
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <Component
        className={cn(
          'fixed top-0 bottom-0 z-50 flex flex-col bg-card text-card-foreground shadow-xl transition-transform duration-300 ease-in-out border-border',
          widthClass,
          position === 'left' ? 'left-0 border-r' : 'right-0 border-l',
          isOpen ? 'translate-x-0' : (position === 'left' ? '-translate-x-full' : 'translate-x-full'),
          className
        )}
        role="complementary"
        aria-labelledby={title ? 'reactify-sidebar-title' : undefined}
        aria-hidden={!isOpen}
        tabIndex={-1} // Make it focusable for programmatic focus if needed
        {...props}
      >
        {(title || onClose) && (
          <div className="flex items-center justify-between p-4 border-b border-border">
            {title && (
              <h2 id="reactify-sidebar-title" className="text-lg font-semibold text-card-foreground">
                {title}
              </h2>
            )}
            {!title && <div />} {/* Placeholder to keep X button to the right if no title */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className="flex-1 p-4 overflow-y-auto">
          {children}
        </div>
      </Component>
    </>
  );
}
