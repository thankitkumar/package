
'use client';

import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ComponentDisplay } from './_components/component-display';
import { 
  SquareStack, TerminalSquare, LayoutGrid, Rows, ChevronDownCircle, 
  MessageSquareWarning, BadgePercent, CheckSquare, Folders, Info, Type,
  PanelTop, PanelBottom
} from 'lucide-react';

import ReactifyButtonDemo from './_components/reactify-button-demo';
import ReactifyInputDemo from './_components/reactify-input-demo';
import ReactifyCardDemo from './_components/reactify-card-demo';
import ReactifyModalDemo from './_components/reactify-modal-demo';
import ReactifyDropdownDemo from './_components/reactify-dropdown-demo';
import ReactifyAlertDemo from './_components/reactify-alert-demo';
import ReactifyBadgeDemo from './_components/reactify-badge-demo';
import ReactifyCheckboxDemo from './_components/reactify-checkbox-demo';
import ReactifyTabsDemo from './_components/reactify-tabs-demo';
import ReactifyTooltipDemo from './_components/reactify-tooltip-demo';
import ReactifyTextareaDemo from './_components/reactify-textarea-demo';
import ReactifyHeaderDemo from './_components/reactify-header-demo';
import ReactifyFooterDemo from './_components/reactify-footer-demo';

const components = [
  {
    id: 'alert',
    name: 'Alert',
    icon: <MessageSquareWarning />,
    demo: <ReactifyAlertDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyAlert } from '@/components/reactify/alert';

// Info Alert (Default)
<ReactifyAlert title="Information">This is an info alert.</ReactifyAlert>

// Success, Warning, Destructive variants also available
<ReactifyAlert variant="success" title="Success!">Operation completed.</ReactifyAlert>

// Can hide default icon or provide custom one
<ReactifyAlert variant="warning" title="Be Aware" icon={false}>No icon here.</ReactifyAlert>
  `,
    accessibilityNotes: [
      "Use appropriate ARIA roles (e.g., role='alert' for assertive messages).",
      "Ensure icons have proper alternative text or are decorative.",
      "Sufficient color contrast for text and icons.",
    ]
  },
  {
    id: 'badge',
    name: 'Badge',
    icon: <BadgePercent />,
    demo: <ReactifyBadgeDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyBadge } from '@/components/reactify/badge';

// Primary Badge (Default)
<ReactifyBadge>Primary</ReactifyBadge>

// Other variants: secondary, destructive, outline, success, warning
<ReactifyBadge variant="success">Completed</ReactifyBadge>

// Sizes: sm, md (default), lg
<ReactifyBadge variant="destructive" size="sm">Urgent</ReactifyBadge>
  `,
    accessibilityNotes: [
      "Ensure badge text is descriptive or used in a context that provides meaning.",
      "Good color contrast is important for readability.",
    ]
  },
  {
    id: 'button',
    name: 'Button',
    icon: <SquareStack />,
    demo: <ReactifyButtonDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyButton } from '@/components/reactify/button';
import { Heart, Upload, AlertTriangle } from 'lucide-react';

// Primary Button
<ReactifyButton variant="primary">Primary Action</ReactifyButton>
// Secondary, Outline, Ghost, Destructive variants also available
// Supports size (sm, md, lg), isLoading, leftIcon, rightIcon, disabled props
  `,
    accessibilityNotes: [
      "Ensure buttons have clear, descriptive text content or an aria-label for icon-only buttons.",
      "Buttons are focusable and activatable using Enter or Space keys.",
      "Loading state is announced via \`aria-busy\` and \`aria-live\`.",
      "Disabled state uses the \`disabled\` attribute.",
    ]
  },
  {
    id: 'card',
    name: 'Card',
    icon: <LayoutGrid />,
    demo: <ReactifyCardDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { 
  ReactifyCard, ReactifyCardHeader, ReactifyCardTitle, 
  ReactifyCardDescription, ReactifyCardContent, ReactifyCardFooter
} from '@/components/reactify/card';

<ReactifyCard>
  <ReactifyCardHeader>
    <ReactifyCardTitle>Card Title</ReactifyCardTitle>
    <ReactifyCardDescription>Description</ReactifyCardDescription>
  </ReactifyCardHeader>
  <ReactifyCardContent><p>Content...</p></ReactifyCardContent>
  <ReactifyCardFooter><ReactifyButton>Action</ReactifyButton></ReactifyCardFooter>
</ReactifyCard>
  `,
    accessibilityNotes: [
      "Ensure card titles are meaningful (e.g., using appropriate heading levels).",
      "If cards are interactive, ensure proper focus indicators and ARIA roles.",
    ]
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    icon: <CheckSquare />,
    demo: <ReactifyCheckboxDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyCheckbox } from '@/components/reactify/checkbox';
// ... useState for controlled component

<ReactifyCheckbox
  id="myCheckbox"
  label="Accept terms"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// Supports size (sm, md, lg) and disabled props.
  `,
    accessibilityNotes: [
      "Always associate with a \`<label>\`.",
      "Ensure visible focus indicator.",
      "State (checked/unchecked) should be clear.",
    ]
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    icon: <ChevronDownCircle />,
    demo: <ReactifyDropdownDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyDropdown, ReactifyDropdownItem } from '@/components/reactify/dropdown';
import { ReactifyButton } from '@/components/reactify/button';

<ReactifyDropdown trigger={<ReactifyButton>Options</ReactifyButton>}>
  <ReactifyDropdownItem onSelect={() => alert('Edit')}>Edit</ReactifyDropdownItem>
  <ReactifyDropdownItem disabled>Archive (Disabled)</ReactifyDropdownItem>
</ReactifyDropdown>
  `,
    accessibilityNotes: [
      "Trigger is focusable and activatable via keyboard.",
      "Menu has \`role='menu'\`, items have \`role='menuitem'\`.",
      "Supports keyboard navigation (arrows, Enter/Space, Esc).",
    ]
  },
  {
    id: 'footer',
    name: 'Footer',
    icon: <PanelBottom />,
    demo: <ReactifyFooterDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyFooter } from '@/components/reactify/footer';

<ReactifyFooter>
  <p>© ${new Date().getFullYear()} My Company. All rights reserved.</p>
  <a href="/about">About Us</a>
</ReactifyFooter>
  `,
    accessibilityNotes: [
      "Typically contains copyright information, links to privacy policy, terms of service, etc.",
      "Use appropriate HTML5 semantic element <footer /> (which is the default).",
    ],
  },
  {
    id: 'header',
    name: 'Header',
    icon: <PanelTop />,
    demo: <ReactifyHeaderDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyHeader } from '@/components/reactify/header';
import { ReactifyButton } from '@/components/reactify/button'; // Example

<ReactifyHeader>
  <div>Logo</div>
  <nav>
    <ReactifyButton variant="ghost">Home</ReactifyButton>
    <ReactifyButton variant="ghost">About</ReactifyButton>
  </nav>
</ReactifyHeader>
  `,
    accessibilityNotes: [
      "Should contain main navigation links, site branding/logo.",
      "Use appropriate HTML5 semantic element <header /> (which is the default).",
      "Ensure navigation is keyboard accessible.",
    ],
  },
  {
    id: 'input',
    name: 'Input',
    icon: <TerminalSquare />,
    demo: <ReactifyInputDemo />,
    codeBlockScrollAreaClassName: "max-h-none", 
    codeExample: `
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label';

// Standard Input with Label
<div>
  <Label htmlFor="name">Name</Label>
  <ReactifyInput type="text" id="name" placeholder="Enter your name" />
</div>
// Supports error state, disabled prop.
  `,
    accessibilityNotes: [
      "Always associate inputs with a \`<label>\`.",
      "Use \`aria-invalid\` for error states.",
      "Ensure sufficient color contrast.",
    ]
  },
  {
    id: 'modal',
    name: 'Modal',
    icon: <Rows />,
    demo: <ReactifyModalDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyModal } from '@/components/reactify/modal';
// ... useState and ReactifyButton for trigger

<ReactifyModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Modal"
  footer={<ReactifyButton onClick={handleConfirm}>Confirm</ReactifyButton>}
>
  <p>Modal content goes here.</p>
</ReactifyModal>
  `,
    accessibilityNotes: [
      "Use \`role='dialog'\` and \`aria-modal='true'\`.",
      "Provide a title via \`aria-labelledby\`.",
      "Trap focus within the modal.",
      "Closable via Escape key and close button.",
    ]
  },
  {
    id: 'tabs',
    name: 'Tabs',
    icon: <Folders />,
    demo: <ReactifyTabsDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyTabs, ReactifyTab } from '@/components/reactify/tabs';

<ReactifyTabs defaultActiveTab={0} variant="line">
  <ReactifyTab label="Profile">Profile Content</ReactifyTab>
  <ReactifyTab label="Settings">Settings Content</ReactifyTab>
  <ReactifyTab label="Security" disabled>Security Content</ReactifyTab>
</ReactifyTabs>

// Variant 'enclosed' also available.
  `,
    accessibilityNotes: [
      "Tab list has \`role='tablist'\`, tabs have \`role='tab'\`, panels have \`role='tabpanel'\`.",
      "Use \`aria-selected\` for active tab, \`aria-controls\` for panel association.",
      "Support keyboard navigation (arrow keys to switch tabs, Enter/Space to activate).",
    ]
  },
  {
    id: 'textarea',
    name: 'Textarea',
    icon: <Type />,
    demo: <ReactifyTextareaDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyTextarea } from '@/components/reactify/textarea';
import { Label } from '@/components/ui/label';

<div>
  <Label htmlFor="comment">Comment</Label>
  <ReactifyTextarea id="comment" placeholder="Your comment..." rows={4} />
</div>

// Supports error and disabled props.
  `,
    accessibilityNotes: [
      "Always associate with a \`<label>\`.",
      "Provide clear placeholder text or instructions.",
      "Use \`aria-invalid\` for error states.",
    ]
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    icon: <Info />,
    demo: <ReactifyTooltipDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyTooltip } from '@/components/reactify/tooltip';
import { ReactifyButton } from '@/components/reactify/button';

<ReactifyTooltip content="This is helpful information.">
  <ReactifyButton variant="outline">Hover Me</ReactifyButton>
</ReactifyTooltip>

// Supports position (top, bottom, left, right) and delay props.
// Content can be a string or JSX.
  `,
    accessibilityNotes: [
      "Tooltip has \`role='tooltip'\`.",
      "Trigger element should be focusable.",
      "Tooltip visibility should be controllable via hover and focus.",
      "Consider using \`aria-describedby\` to link trigger to tooltip content for screen readers.",
    ]
  },
];

export default function ComponentsPage() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(components[0]?.id ?? '');

  const activeComponentDetails = components.find(comp => comp.id === selectedComponentId);

  // Sort components alphabetically by name for the sidebar
  const sortedComponents = [...components].sort((a, b) => a.name.localeCompare(b.name));


  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4 flex items-center justify-between">
            <h2 className="font-headline text-lg font-semibold group-data-[collapsible=icon]:hidden mt-[70px]">Components</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {sortedComponents.map((component) => (
                <SidebarMenuItem key={component.id}>
                  <SidebarMenuButton
                    onClick={() => setSelectedComponentId(component.id)}
                    isActive={selectedComponentId === component.id}
                    tooltip={{ children: component.name, side: 'right' }}
                  >
                    {React.cloneElement(component.icon, { className: 'h-5 w-5' })}
                    <span className="group-data-[collapsible=icon]:hidden">{component.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-headline font-bold">Component Library</h1>
              <SidebarTrigger className="md:hidden" />
            </div>
            <p className="text-muted-foreground mb-8">
              Explore our collection of reusable, unstyled UI components. Each component is designed for accessibility and can be easily themed.
            </p>
            {activeComponentDetails ? (
              <div key={activeComponentDetails.id} className="mb-12">
                <ComponentDisplay
                  title={activeComponentDetails.name}
                  description={`Examples and usage of the Reactify ${activeComponentDetails.name} component.`}
                  codeExample={activeComponentDetails.codeExample}
                  accessibilityNotes={activeComponentDetails.accessibilityNotes}
                  codeBlockScrollAreaClassName={activeComponentDetails.codeBlockScrollAreaClassName} 
                >
                  {activeComponentDetails.demo}
                </ComponentDisplay>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-10">
                {components.length > 0 ? "Select a component from the sidebar to view its details." : "No components to display."}
              </p>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
