
'use client';

import type { ReactNode } from 'react';
import { usePermission } from '@/hooks/use-permission';
import type { UserRole } from '@/contexts/mock-auth-context';
import type { ReactifyComponentProps } from './common-props';

interface ProtectedContentProps extends ReactifyComponentProps {
  requiredRole: UserRole | UserRole[];
  children: ReactNode;
  fallback?: ReactNode; // Optional: content to show if access is denied
}

export function ProtectedContent({
  requiredRole,
  children,
  fallback = null,
  as: Component = 'div',
  ...props
}: ProtectedContentProps) {
  const { hasRole } = usePermission();

  if (hasRole(requiredRole)) {
    return <Component {...props}>{children}</Component>;
  }

  return <>{fallback}</>;
}
