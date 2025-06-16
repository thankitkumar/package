
'use client';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import type { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

interface ReactifyCheckboxProps extends ReactifyComponentProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  // Note: 'as' prop is not typically used for native input elements in this way.
  // We'll wrap the input and label for layout.
}

export function ReactifyCheckbox({
  children, // Not typically used directly, label prop is preferred
  className,
  label,
  id,
  size = 'md',
  disabled,
  checked,
  onChange,
  ...props
}: ReactifyCheckboxProps) {

  const sizeStyles = {
    sm: { wrapper: 'text-sm', box: 'h-4 w-4', icon: 'h-3 w-3' },
    md: { wrapper: 'text-base', box: 'h-5 w-5', icon: 'h-3.5 w-3.5' },
    lg: { wrapper: 'text-lg', box: 'h-6 w-6', icon: 'h-4 w-4' },
  };

  const currentSize = sizeStyles[size];
  const inputId = id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={cn('inline-flex items-center gap-2', currentSize.wrapper, className)}>
      <input
        type="checkbox"
        id={inputId}
        className="peer sr-only" // Hide default checkbox
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'flex items-center justify-center rounded border-2 border-input bg-background transition-colors',
          currentSize.box,
          'peer-checked:bg-primary peer-checked:border-primary peer-checked:text-primary-foreground',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-primary/70'
        )}
        aria-hidden="true" // The actual input is handling accessibility
      >
        {checked && <Check className={cn(currentSize.icon, 'transition-opacity duration-100')} />}
      </label>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
