
'use client';

import { MockAuthProvider, useMockAuth, type UserRole } from '@/contexts/mock-auth-context';
import { usePermission } from '@/hooks/use-permission';
import { ProtectedContent } from '@/components/reactify/protected-content';
import { ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, ReactifyCardDescription, ReactifyCardContent } from '@/components/reactify/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Edit3, User as UserIcon, Eye } from 'lucide-react';

function RoleBasedDemoContent() {
  const { currentRole, setCurrentRole, availableRoles } = useMockAuth();
  const { hasRole } = usePermission(); // Can also use this directly

  return (
    <div className="space-y-8">
      <ReactifyCard className="max-w-md mx-auto">
        <ReactifyCardHeader>
          <ReactifyCardTitle>Switch User Role</ReactifyCardTitle>
          <ReactifyCardDescription>Select a role to see how content visibility changes.</ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent>
          <Label htmlFor="role-switcher" className="mb-2 block">Current Role: <span className="font-semibold text-primary">{currentRole}</span></Label>
          <Select value={currentRole} onValueChange={(value) => setCurrentRole(value as UserRole)}>
            <SelectTrigger id="role-switcher" className="w-full">
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
        </ReactifyCardContent>
      </ReactifyCard>

      <div className="grid md:grid-cols-2 gap-6">
        <ReactifyCard>
          <ReactifyCardHeader>
            <ReactifyCardTitle className="flex items-center gap-2"><Eye size={20}/> Public Content</ReactifyCardTitle>
          </ReactifyCardHeader>
          <ReactifyCardContent>
            <p>This content is visible to <span className="font-semibold">everyone</span>, including guests.</p>
            <ProtectedContent requiredRole="guest">
                <p className="mt-2 p-2 bg-green-100 text-green-700 rounded-md text-xs">Verified: You see this because your role is at least 'guest'.</p>
            </ProtectedContent>
          </ReactifyCardContent>
        </ReactifyCard>
        
        <ProtectedContent requiredRole="user">
          <ReactifyCard>
            <ReactifyCardHeader>
              <ReactifyCardTitle className="flex items-center gap-2"><UserIcon size={20}/> User Dashboard</ReactifyCardTitle>
            </ReactifyCardHeader>
            <ReactifyCardContent>
              <p>This content is visible to <span className="font-semibold">logged-in users (user role)</span> and above.</p>
               <p className="mt-2 p-2 bg-blue-100 text-blue-700 rounded-md text-xs">Verified: You see this because your role is 'user' or higher.</p>
            </ReactifyCardContent>
          </ReactifyCard>
        </ProtectedContent>

        <ProtectedContent requiredRole="editor">
          <ReactifyCard>
            <ReactifyCardHeader>
              <ReactifyCardTitle className="flex items-center gap-2"><Edit3 size={20}/> Editor Tools</ReactifyCardTitle>
            </ReactifyCardHeader>
            <ReactifyCardContent>
              <p>This content is visible to <span className="font-semibold">editors</span> and admins.</p>
              <p className="mt-2 p-2 bg-yellow-100 text-yellow-700 rounded-md text-xs">Verified: You see this because your role is 'editor' or 'admin'.</p>
            </ReactifyCardContent>
          </ReactifyCard>
        </ProtectedContent>

        <ProtectedContent requiredRole="admin">
          <ReactifyCard>
            <ReactifyCardHeader>
              <ReactifyCardTitle className="flex items-center gap-2"><ShieldCheck size={20}/> Admin Panel</ReactifyCardTitle>
            </ReactifyCardHeader>
            <ReactifyCardContent>
              <p>This content is visible <span className="font-semibold text-destructive">only to admins</span>.</p>
               <p className="mt-2 p-2 bg-red-100 text-red-700 rounded-md text-xs">Verified: You see this because your role is 'admin'.</p>
            </ReactifyCardContent>
          </ReactifyCard>
        </ProtectedContent>
      </div>

      {/* Example of using the hook directly */}
      {hasRole('editor') && !hasRole('admin') && (
        <ReactifyCard className="mt-6 bg-purple-50 border-purple-300">
          <ReactifyCardHeader>
            <ReactifyCardTitle>Special Editor Note</ReactifyCardTitle>
          </ReactifyCardHeader>
          <ReactifyCardContent>
            <p className="text-purple-700">This message is shown using <code className="bg-purple-200 px-1 rounded-sm">hasRole('editor') && !hasRole('admin')</code>. You are an editor, but not an admin.</p>
          </ReactifyCardContent>
        </ReactifyCard>
      )}
    </div>
  );
}

export default function RoleBasedAccessPage() {
  return (
    <MockAuthProvider>
      <div className="container mx-auto py-12 px-4">
         <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-headline text-foreground">Role-Based Access Demo</h1>
            <p className="text-muted-foreground mt-1">
              Test how UI elements render based on different user roles.
            </p>
        </div>
        <RoleBasedDemoContent />
      </div>
    </MockAuthProvider>
  );
}
