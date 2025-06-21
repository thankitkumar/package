
'use client';
import { cn } from './utils';
import type { InputHTMLAttributes } from 'react';

interface ReactifyToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export function ReactifyToggleSwitch({
  className,
  label,
  id,
  labelPosition = 'right',
  size = 'md',
  disabled,
  checked,
  onChange,
  ...props
}: ReactifyToggleSwitchProps) {
  const inputId = id || (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : 'toggle-switch');

  const sizeClasses = {
    sm: { wrapper: 'text-sm', switchContainer: 'w-10 h-5', thumb: 'h-4 w-4', thumbPos: 'left-0.5 top-0.5' },
    md: { wrapper: 'text-base', switchContainer: 'w-12 h-6', thumb: 'h-5 w-5', thumbPos: 'left-0.5 top-0.5' },
    lg: { wrapper: 'text-lg', switchContainer: 'w-14 h-7', thumb: 'h-6 w-6', thumbPos: 'left-0.5 top-0.5' },
  };
  const currentSize = sizeClasses[size];

  const textLabel = label ? (
    <span
      className={cn(
        'select-none',
        currentSize.wrapper,
        labelPosition === 'left' ? 'mr-2' : 'ml-2',
        disabled && 'opacity-60'
      )}
    >
      {label}
    </span>
  ) : null;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      {label && labelPosition === 'left' && textLabel}
      
      <div className={cn("relative", currentSize.switchContainer)}>
        <input
          type="checkbox"
          id={inputId}
          role="switch"
          className="sr-only peer"
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          aria-checked={checked}
          {...props}
        />
        {/* Track */}
        <div
          className={cn(
            'w-full h-full rounded-full transition-colors',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
            'peer-checked:bg-primary bg-input',
            disabled && 'opacity-60'
          )}
          aria-hidden="true"
        ></div>
        {/* Thumb */}
        <div
          className={cn(
            'absolute rounded-full bg-background shadow-lg transform transition-transform duration-200 ease-in-out',
            currentSize.thumb,
            currentSize.thumbPos,
            // These must be full string literals for Tailwind's JIT compiler to detect them.
            size === 'sm' && 'peer-checked:translate-x-5',
            size === 'md' && 'peer-checked:translate-x-6',
            size === 'lg' && 'peer-checked:translate-x-7'
          )}
          aria-hidden="true"
        ></div>
      </div>
      
      {label && labelPosition === 'right' && textLabel}
    </label>
  );
}
