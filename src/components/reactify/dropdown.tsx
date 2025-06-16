'use client';
import { useState, useRef, useEffect, type ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
// Note: ReactifyButton import will be resolved by the build process or if used within the same package.
// If this file is part of the library, ensure ReactifyButton is also exported or path is correct.
// For now, assuming it's available.
// import { ReactifyButton } from './button'; 


interface ReactifyDropdownItemProps extends ReactifyComponentProps {
  onSelect?: () => void;
  disabled?: boolean;
}

export function ReactifyDropdownItem({ children, className, onSelect, disabled, as: Component = 'button', ...props }: ReactifyDropdownItemProps) {
  return (
    <Component
      role="menuitem"
      className={cn(
        "block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ReactifyDropdownProps extends ReactifyComponentProps {
  trigger: ReactNode;
  children: ReactNode; // Should be ReactifyDropdownItem or similar
  align?: 'left' | 'right';
}

export function ReactifyDropdown({ trigger, children, className, align = 'left', ...props }: ReactifyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef} {...props}>
      <div onClick={toggleDropdown} aria-haspopup="true" aria-expanded={isOpen}>
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          className={cn(
            "origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-card ring-1 ring-black ring-opacity-5 focus:outline-none z-10 py-1",
            align === 'right' ? "right-0" : "left-0",
            "transform transition-all duration-150 ease-out",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
