import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProtectedContent } from '../protected-content';
import { MockAuthProvider } from '@/contexts/mock-auth-context';
import { usePermission } from '@/hooks/use-permission';

// Mock the usePermission hook
jest.mock('@/hooks/use-permission');
const mockUsePermission = usePermission as jest.Mock;

describe('ProtectedContent', () => {
  it('renders children when user has the required role', () => {
    mockUsePermission.mockReturnValue({ hasRole: () => true });
    render(
      <MockAuthProvider>
        <ProtectedContent requiredRole="admin">
          <div>Admin Content</div>
        </ProtectedContent>
      </MockAuthProvider>
    );
    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });

  it('does not render children when user does not have the required role', () => {
    mockUsePermission.mockReturnValue({ hasRole: () => false });
    render(
      <MockAuthProvider>
        <ProtectedContent requiredRole="admin">
          <div>Admin Content</div>
        </ProtectedContent>
      </MockAuthProvider>
    );
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });

  it('renders the fallback when user does not have the required role', () => {
    mockUsePermission.mockReturnValue({ hasRole: () => false });
    render(
      <MockAuthProvider>
        <ProtectedContent requiredRole="admin" fallback={<div>Access Denied</div>}>
          <div>Admin Content</div>
        </ProtectedContent>
      </MockAuthProvider>
    );
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByText('Admin Content')).not.toBeInTheDocument();
  });

  it('correctly calls hasRole with the required role', () => {
    const hasRoleMock = jest.fn().mockReturnValue(true);
    mockUsePermission.mockReturnValue({ hasRole: hasRoleMock });
    render(
      <MockAuthProvider>
        <ProtectedContent requiredRole="editor">
          <div>Editor Content</div>
        </ProtectedContent>
      </MockAuthProvider>
    );
    expect(hasRoleMock).toHaveBeenCalledWith('editor');
  });

  it('correctly calls hasRole with an array of roles', () => {
    const hasRoleMock = jest.fn().mockReturnValue(true);
    mockUsePermission.mockReturnValue({ hasRole: hasRoleMock });
    render(
      <MockAuthProvider>
        <ProtectedContent requiredRole={['user', 'editor']}>
          <div>Content</div>
        </ProtectedContent>
      </MockAuthProvider>
    );
    expect(hasRoleMock).toHaveBeenCalledWith(['user', 'editor']);
  });
});
