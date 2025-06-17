
'use client';

import { useState } from 'react';
import { MockAuthProvider, useMockAuth, type UserRole } from '@/contexts/mock-auth-context';
import { ProtectedContent } from '@/components/reactify/protected-content';
import { ReactifyCard, ReactifyCardContent, ReactifyCardHeader, ReactifyCardTitle } from '@/components/reactify/card';
import { ReactifyButton } from '@/components/reactify/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

function DemoContent() {
  const { currentRole, setCurrentRole, availableRoles } = useMockAuth();

  return (
    <ReactifyCard className="w-full">
      <ReactifyCardHeader>
        <ReactifyCardTitle>Protected Content Demo</ReactifyCardTitle>
      </ReactifyCardHeader>
      <ReactifyCardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role-switcher-demo">Switch Role:</Label>
          <Select value={currentRole} onValueChange={(value) => setCurrentRole(value as UserRole)}>
            <SelectTrigger id="role-switcher-demo" className="w-full md:w-1/2">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {availableRoles.map(role => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           <p className="text-xs text-muted-foreground">Current Role: <span className="font-semibold text-primary">{currentRole}</span></p>
        </div>

        <div className="p-4 border rounded-md bg-muted/30 space-y-3">
          <ProtectedContent requiredRole="guest">
            <p className="text-sm text-green-700">This content is visible to <strong className="font-medium">Guests</strong> (and everyone above).</p>
          </ProtectedContent>

          <ProtectedContent requiredRole="user" fallback={<p className="text-sm text-muted-foreground">User content hidden. Requires 'user' role or higher.</p>}>
            <p className="text-sm text-blue-700">This content is visible only to <strong className="font-medium">Users</strong> (and roles above them).</p>
          </ProtectedContent>
          
          <ProtectedContent requiredRole="editor" fallback={<p className="text-sm text-muted-foreground">Editor content hidden. Requires 'editor' role or higher.</p>}>
            <p className="text-sm text-orange-700">This content is visible to <strong className="font-medium">Editors</strong> and <strong className="font-medium">Admins</strong>.</p>
          </ProtectedContent>

          <ProtectedContent requiredRole="admin" fallback={<p className="text-sm text-muted-foreground">Admin content hidden. Requires 'admin' role.</p>}>
            <p className="text-sm text-red-700">This content is visible <strong className="font-medium">only to Admins</strong>.</p>
          </ProtectedContent>

          <ProtectedContent requiredRole={['user', 'editor']} fallback={<p className="text-sm text-muted-foreground">Specific multi-role content hidden. Requires 'user' OR 'editor'.</p>}>
            <p className="text-sm text-purple-700">This content is visible if role is <strong className="font-medium">User OR Editor</strong> (or Admin).</p>
          </ProtectedContent>
        </div>
        <p className="text-xs text-muted-foreground">
          Note: The full interactive role-based demo with more complex scenarios is available on the "Role-Based Demo" page from the main navigation. This focuses on the <code className="font-code bg-muted px-1 rounded-sm">&lt;ProtectedContent /&gt;</code> component.
        </p>
      </ReactifyCardContent>
    </ReactifyCard>
  );
}


export default function ReactifyProtectedContentDemo() {
  return (
    <MockAuthProvider>
      <DemoContent />
    </MockAuthProvider>
  );
}
