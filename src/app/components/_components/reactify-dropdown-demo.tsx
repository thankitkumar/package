'use client';
import { ReactifyDropdown, ReactifyDropdownItem } from '@/components/reactify/dropdown';
import { ReactifyButton } from '@/components/reactify/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Edit, Copy, Archive, MoreHorizontal, User, Settings, LogOut } from 'lucide-react';

export default function ReactifyDropdownDemo() {
  const codeExample = `
import { ReactifyDropdown, ReactifyDropdownItem } from '@/components/reactify/dropdown';
import { ReactifyButton } from '@/components/reactify/button';
import { ChevronDown } from 'lucide-react';

function MyDropdown() {
  return (
    <ReactifyDropdown
      trigger={
        <ReactifyButton variant="outline" rightIcon={<ChevronDown size={16} />}>
          Options
        </ReactifyButton>
      }
    >
      <ReactifyDropdownItem onSelect={() => alert('Edit selected')}>Edit</ReactifyDropdownItem>
      <ReactifyDropdownItem onSelect={() => alert('Copy selected')}>Copy</ReactifyDropdownItem>
      <ReactifyDropdownItem onSelect={() => alert('Archive selected')} disabled>Archive (Disabled)</ReactifyDropdownItem>
      <hr className="my-1 border-border" />
      <ReactifyDropdownItem onSelect={() => alert('Delete selected')}>Delete</ReactifyDropdownItem>
    </ReactifyDropdown>
  );
}
  `;

  const accessibilityNotes = [
    "The dropdown trigger should be focusable and activatable via keyboard (Enter/Space).",
    "Use `aria-haspopup='true'` and `aria-expanded` on the trigger element.",
    "The dropdown menu should have `role='menu'`.",
    "Dropdown items should have `role='menuitem'`.",
    "Keyboard navigation within the dropdown (Up/Down arrows, Enter/Space to select, Esc to close) should be implemented.",
    "Focus should be managed correctly when opening and closing the dropdown.",
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6 flex flex-wrap gap-8 items-start">
        <div>
          <h3 className="font-semibold text-lg mb-2">Standard Dropdown</h3>
          <ReactifyDropdown
            trigger={
              <ReactifyButton variant="outline" rightIcon={<ChevronDown size={16} />}>
                Actions
              </ReactifyButton>
            }
          >
            <ReactifyDropdownItem onSelect={() => alert('Edit action')} className="flex items-center gap-2">
              <Edit size={14} /> Edit
            </ReactifyDropdownItem>
            <ReactifyDropdownItem onSelect={() => alert('Copy action')} className="flex items-center gap-2">
              <Copy size={14} /> Copy
            </ReactifyDropdownItem>
            <ReactifyDropdownItem onSelect={() => alert('Archive action')} className="flex items-center gap-2">
              <Archive size={14} /> Archive
            </ReactifyDropdownItem>
            <hr className="my-1 border-border" />
            <ReactifyDropdownItem onSelect={() => alert('Delete action')} className="text-destructive hover:bg-destructive/10 flex items-center gap-2">
              Delete
            </ReactifyDropdownItem>
          </ReactifyDropdown>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Right Aligned Dropdown</h3>
          <ReactifyDropdown
            align="right"
            trigger={
              <ReactifyButton variant="ghost" size="sm" className="p-2">
                <MoreHorizontal size={20} />
                 <span className="sr-only">More options</span>
              </ReactifyButton>
            }
          >
            <ReactifyDropdownItem onSelect={() => alert('Profile selected')} className="flex items-center gap-2">
              <User size={14} /> View Profile
            </ReactifyDropdownItem>
            <ReactifyDropdownItem onSelect={() => alert('Settings selected')} className="flex items-center gap-2">
              <Settings size={14} /> Account Settings
            </ReactifyDropdownItem>
            <hr className="my-1 border-border" />
            <ReactifyDropdownItem onSelect={() => alert('Logout selected')} disabled className="flex items-center gap-2">
              <LogOut size={14} /> Logout (Disabled)
            </ReactifyDropdownItem>
          </ReactifyDropdown>
        </div>
      </CardContent>
    </Card>
  );
}
