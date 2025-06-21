
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import type { InputHTMLAttributes } from 'react';

interface ReactifyToggleSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  // 'as' prop is not typically used for native input elements in this way.
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
    sm: { wrapper: 'text-sm', switch: 'w-10 h-5', thumb: 'h-4 w-4', travel: 'translate-x-5' },
    md: { wrapper: 'text-base', switch: 'w-12 h-6', thumb: 'h-5 w-5', travel: 'translate-x-6' },
    lg: { wrapper: 'text-lg', switch: 'w-14 h-7', thumb: 'h-6 w-6', travel: 'translate-x-7' },
  };
  const currentSize = sizeClasses[size];

  const textLabel = label ? (
    <span
      className={cn(
        'select-none',
        currentSize.wrapper,
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
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      {label && labelPosition === 'left' && textLabel}
      <input
        type="checkbox"
        id={inputId}
        role="switch"
        className="peer sr-only"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        {...props}
      />
      {/* Visual track */}
      <div
        className={cn(
          'relative inline-flex flex-shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
          currentSize.switch,
          'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
          'peer-checked:bg-primary bg-input',
          disabled && 'opacity-60'
        )}
      >
        {/* Thumb */}
        <span
          className={cn(
            'pointer-events-none inline-block transform rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
            currentSize.thumb,
            'translate-x-0 peer-checked:' + currentSize.travel
          )}
        />
      </div>
      {label && labelPosition === 'right' && textLabel}
    </label>
  );
}
