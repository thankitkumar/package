'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { ReactifyComponentProps } from './common-props';
import { X } from 'lucide-react';
import { ReactifyButton } from './button';

interface ReactifyModalProps extends ReactifyComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function ReactifyModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
  ...props
}: ReactifyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      modalRef.current?.focus(); // Focus the modal for screen readers and keyboard navigation
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "reactify-modal-title" : undefined}
      tabIndex={-1} // Make the overlay itself focusable if needed, but usually content inside is focused.
      ref={modalRef}
    >
      <div
        className={cn(
          "bg-card text-card-foreground rounded-lg shadow-xl p-6 w-full max-w-lg relative transform transition-all duration-300 ease-out scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100",
          className
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          {title && <h2 id="reactify-modal-title" className="text-xl font-semibold font-headline">{title}</h2>}
          <ReactifyButton variant="ghost" size="sm" onClick={onClose} className="absolute top-3 right-3 p-1 h-auto" aria-label="Close modal">
            <X size={20} />
          </ReactifyButton>
        </div>
        
        <div className="mb-6 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        {footer && <div className="flex justify-end space-x-2 border-t pt-4 mt-4">{footer}</div>}
      </div>
    </div>
  );
}
