
'use client';

import { useState } from 'react';
import { ReactifyMultiSelect, type MultiSelectOption } from '@/components/reactify/multi-select';
import { ReactifyCard, ReactifyCardContent, ReactifyCardDescription, ReactifyCardHeader, ReactifyCardTitle } from '@/components/reactify/card';
import { Label } from '@/components/ui/label';
import { User, Tag, Code } from 'lucide-react';

const frameworks: MultiSelectOption[] = [
  { value: 'next.js', label: 'Next.js', icon: <Code size={16} /> },
  { value: 'sveltekit', label: 'SvelteKit', icon: <Code size={16} /> },
  { value: 'nuxt.js', label: 'Nuxt.js', icon: <Code size={16} /> },
  { value: 'remix', label: 'Remix', icon: <Code size={16} /> },
  { value: 'astro', label: 'Astro', icon: <Code size={16} /> },
  { value: 'express', label: 'Express.js', icon: <Code size={16} /> },
  { value: 'nestjs', label: 'NestJS', icon: <Code size={16} /> },
];

const users: MultiSelectOption[] = [
    { value: 'user1', label: 'Alice Smith', icon: <User size={16}/>},
    { value: 'user2', label: 'Bob Johnson', icon: <User size={16}/>},
    { value: 'user3', label: 'Charlie Brown', icon: <User size={16}/>},
    { value: 'user4', label: 'Diana Prince', icon: <User size={16}/>},
    { value: 'user5', label: 'Ethan Hunt', icon: <User size={16}/>},
];


export default function ReactifyMultiSelectDemo() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(['next.js', 'remix']);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return (
    <div className="w-full space-y-8">
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Multi-Select Dropdown</ReactifyCardTitle>
          <ReactifyCardDescription>
            An example using a list of frameworks. Allows searching and selecting multiple options.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent className="space-y-4">
          <div className="max-w-sm">
            <Label htmlFor="framework-multi-select" className="mb-2 block">Select Frameworks</Label>
            <ReactifyMultiSelect
              options={frameworks}
              selected={selectedFrameworks}
              onChange={setSelectedFrameworks}
              placeholder="Select frameworks..."
              className="w-full"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-semibold text-primary">{selectedFrameworks.join(', ') || 'None'}</span>
          </p>
        </ReactifyCardContent>
      </ReactifyCard>

       <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Assign Users</ReactifyCardTitle>
          <ReactifyCardDescription>
            Another example for assigning users to a task. Options include icons.
          </ReactifyCardDescription>
        </ReactifyCardHeader>
        <ReactifyCardContent className="space-y-4">
          <div className="max-w-sm">
            <Label htmlFor="user-multi-select" className="mb-2 block">Assign Users</Label>
            <ReactifyMultiSelect
              options={users}
              selected={selectedUsers}
              onChange={setSelectedUsers}
              placeholder="Select users..."
              className="w-full"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Selected IDs: <span className="font-semibold text-primary">{selectedUsers.join(', ') || 'None'}</span>
          </p>
        </ReactifyCardContent>
      </ReactifyCard>
    </div>
  );
}
