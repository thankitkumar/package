
'use client';
import { createContext, useContext, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';

interface ReactifyRadioGroupContextProps {
  name: string;
  selectedValue: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<ReactifyRadioGroupContextProps | undefined>(undefined);

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('ReactifyRadioButton must be used within a ReactifyRadioGroup');
  }
  return context;
};

interface ReactifyRadioGroupProps extends ReactifyComponentProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function ReactifyRadioGroup({
  name,
  value,
  defaultValue,
  onChange,
  children,
  className,
  disabled = false,
  orientation = 'vertical',
  as: Component = 'div',
  ...props
}: ReactifyRadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const controlledValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue: string) => {
    if (!value) { // If uncontrolled
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };
  
  const contextValue: ReactifyRadioGroupContextProps = {
    name,
    selectedValue: controlledValue,
    onChange: handleChange,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Component
        role="radiogroup"
        aria-labelledby={props['aria-labelledby']}
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col space-y-2' : 'flex-row space-x-4',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    </RadioGroupContext.Provider>
  );
}

interface ReactifyRadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'name' | 'onChange' | 'checked' | 'value'> {
  value: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  // 'as' prop is not typical for radio button which is an input. The label is separate.
}

export function ReactifyRadioButton({
  value,
  label,
  id,
  size = 'md',
  className,
  disabled: itemDisabled,
  ...props
}: ReactifyRadioButtonProps) {
  const context = useRadioGroupContext();
  const inputId = id || `${context.name}-${value}`;
  const isChecked = context.selectedValue === value;
  const isDisabled = context.disabled || itemDisabled;

  const sizeClasses = {
    sm: { wrapper: 'text-sm', radio: 'h-4 w-4', dot: 'h-2 w-2' },
    md: { wrapper: 'text-base', radio: 'h-5 w-5', dot: 'h-2.5 w-2.5' },
    lg: { wrapper: 'text-lg', radio: 'h-6 w-6', dot: 'h-3 w-3' },
  };
  const currentSize = sizeClasses[size];

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-center gap-2',
        currentSize.wrapper,
        isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className
      )}
    >
      <input
        type="radio"
        id={inputId}
        name={context.name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        onChange={() => context.onChange(value)}
        className="sr-only peer" // Hidden native input
        {...props}
      />
      <span
        className={cn(
          'flex items-center justify-center rounded-full border-2 border-input bg-background transition-colors',
          currentSize.radio,
          'peer-checked:border-primary peer-checked:bg-primary',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
          isDisabled ? '' : 'hover:border-primary/70'
        )}
        aria-hidden="true"
      >
        {isChecked && <span className={cn('rounded-full bg-primary-foreground', currentSize.dot)} />}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
