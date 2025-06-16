
'use client';
import type { ReactNode } from 'react';
import { cn } from './utils';
import type { ReactifyComponentProps } from './common-props';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface ReactifyAlertProps extends ReactifyComponentProps {
  variant?: 'info' | 'success' | 'warning' | 'destructive';
  title?: string;
  icon?: ReactNode | boolean; // boolean to show/hide default icon
}

const alertIcons = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  destructive: <XCircle className="h-5 w-5" />,
};

const alertVariants = {
  info: 'bg-blue-50 border-blue-300 text-blue-700',
  success: 'bg-green-50 border-green-300 text-green-700',
  warning: 'bg-yellow-50 border-yellow-300 text-yellow-700',
  destructive: 'bg-red-50 border-red-300 text-red-700',
};

const titleVariants = {
    info: 'text-blue-800',
    success: 'text-green-800',
    warning: 'text-yellow-800',
    destructive: 'text-red-800',
}

export function ReactifyAlert({
  children,
  className,
  variant = 'info',
  title,
  icon,
  as: Component = 'div',
  ...props
}: ReactifyAlertProps) {
  
  const defaultIcon = alertIcons[variant];
  const showIcon = icon === undefined ? true : icon; // Show icon by default if prop isn't passed

  return (
    <Component
      role="alert"
      className={cn(
        'border-l-4 p-4 rounded-md shadow-sm',
        alertVariants[variant],
        className
      )}
      {...props}
    >
      <div className="flex">
        {showIcon && (
            <div className="flex-shrink-0">
                {typeof icon === 'boolean' ? defaultIcon : icon || defaultIcon}
            </div>
        )}
        <div className={cn("ml-3", !showIcon && "-ml-0")}>
          {title && <h3 className={cn("text-sm font-medium", titleVariants[variant])}>{title}</h3>}
          <div className={cn("text-sm", title && "mt-2")}>
            {children}
          </div>
        </div>
      </div>
    </Component>
  );
}
