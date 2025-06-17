
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
  const inputId = id || (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const sizeClasses = {
    sm: { wrapper: 'text-sm', switch: 'w-10 h-5', thumb: 'w-4 h-4 translate-x-0.5 peer-checked:translate-x-[1.35rem]' },
    md: { wrapper: 'text-base', switch: 'w-12 h-6', thumb: 'w-5 h-5 translate-x-0.5 peer-checked:translate-x-[1.6rem]' },
    lg: { wrapper: 'text-lg', switch: 'w-14 h-7', thumb: 'w-6 h-6 translate-x-0.5 peer-checked:translate-x-[1.85rem]' },
  };
  const currentSize = sizeClasses[size];

  const switchLabel = label ? (
    <label
      htmlFor={inputId}
      className={cn(
        'select-none',
        currentSize.wrapper,
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
      )}
    >
      {label}
    </label>
  ) : null;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {label && labelPosition === 'left' && switchLabel}
      <input
        type="checkbox"
        id={inputId}
        role="switch"
        className="peer sr-only" // Hide default checkbox
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'relative inline-flex flex-shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
          currentSize.switch,
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
          checked ? 'bg-primary' : 'bg-input hover:bg-input/80'
        )}
        aria-hidden="true"
      >
        <span
          className={cn(
            'pointer-events-none inline-block transform rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out',
            currentSize.thumb
          )}
        />
      </label>
      {label && labelPosition === 'right' && switchLabel}
    </div>
  );
}
