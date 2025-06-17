
'use client';

import type { ReactNode} from 'react';
import { createContext, useContext, useState, useMemo } from 'react';

export type UserRole = 'guest' | 'user' | 'editor' | 'admin';

interface MockAuthContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  availableRoles: UserRole[];
}

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('guest');
  const availableRoles: UserRole[] = useMemo(() => ['guest', 'user', 'editor', 'admin'], []);

  const value = useMemo(() => ({
    currentRole,
    setCurrentRole,
    availableRoles,
  }), [currentRole, availableRoles]);

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};
