
'use client';

import { useMockAuth, type UserRole } from '@/contexts/mock-auth-context';

interface PermissionHook {
  currentRole: UserRole;
  hasRole: (requiredRoles: UserRole | UserRole[]) => boolean;
}

const roleHierarchy: Record<UserRole, number> = {
  guest: 0,
  user: 1,
  editor: 2,
  admin: 3,
};

export function usePermission(): PermissionHook {
  const { currentRole } = useMockAuth();

  const hasRole = (requiredRoles: UserRole | UserRole[]): boolean => {
    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    const currentUserLevel = roleHierarchy[currentRole];

    return rolesToCheck.some(role => currentUserLevel >= roleHierarchy[role]);
  };

  return {
    currentRole,
    hasRole,
  };
}
