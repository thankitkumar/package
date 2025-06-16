import React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ComponentDisplay } from './_components/component-display';
import { SquareStack } from 'lucide-react';
import ReactifyButtonDemo from './_components/reactify-button-demo';
import ReactifyInputDemo from './_components/reactify-input-demo';
import ReactifyCardDemo from './_components/reactify-card-demo';
import ReactifyModalDemo from './_components/reactify-modal-demo';
import ReactifyDropdownDemo from './_components/reactify-dropdown-demo';

export default function ComponentsPage() {
  const components = [
    { 
      id: 'button', 
      name: 'Button', 
      icon: <SquareStack />, 
      demo: <ReactifyButtonDemo />,
      codeExample: `
import { ReactifyButton } from '@/components/reactify/button';
import { Heart, Upload, AlertTriangle } from 'lucide-react';

// Primary Button
<ReactifyButton variant="primary">Primary Action</ReactifyButton>

// Secondary Button
<ReactifyButton variant="secondary">Secondary Action</ReactifyButton>

// Outline Button
<ReactifyButton variant="outline">Outline Action</ReactifyButton>

// Ghost Button
<ReactifyButton variant="ghost">Ghost Action</ReactifyButton>

// Destructive Button
<ReactifyButton variant="destructive" leftIcon={<AlertTriangle />}>
  Delete Item
</ReactifyButton>

// Button with Icon
<ReactifyButton variant="primary" leftIcon={<Heart />}>
  Like
</ReactifyButton>

// Loading State Button
<ReactifyButton variant="primary" isLoading={true}>
  Processing
</ReactifyButton>

// Disabled Button
<ReactifyButton variant="primary" disabled>
  Disabled
</ReactifyButton>

// Different Sizes
<ReactifyButton variant="primary" size="sm">Small</ReactifyButton>
<ReactifyButton variant="secondary" size="lg">Large</ReactifyButton>
  `,
      accessibilityNotes: [
        "Ensure buttons have clear, descriptive text content.",
        "Use \`aria-label\` for icon-only buttons or if the text is not descriptive enough.",
        "Buttons are focusable and can be activated using Enter or Space keys.",
        "Loading state is announced via \`aria-busy\` and \`aria-live\`.",
        "Disabled state is handled with the \`disabled\` attribute, making it unfocusable and unclickable.",
      ]
    },
    { 
      id: 'input', 
      name: 'Input', 
      icon: <InputIcon />, 
      demo: <ReactifyInputDemo />,
      codeExample: `
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label'; // Assuming a Label component

// Standard Input
<div>
  <Label htmlFor="name">Name</Label>
  <ReactifyInput type="text" id="name" placeholder="Enter your name" />
</div>

// Input with Error
<div>
  <Label htmlFor="email">Email</Label>
  <ReactifyInput type="email" id="email" placeholder="your@email.com" error />
  <p className="text-sm text-destructive mt-1">Invalid email address.</p>
</div>

// Disabled Input
<div>
  <Label htmlFor="disabled-input">Disabled</Label>
  <ReactifyInput type="text" id="disabled-input" placeholder="Cannot edit" disabled />
</div>
  `,
      accessibilityNotes: [
        "Always associate inputs with a \`<label>\` element using \`htmlFor\` and \`id\` attributes.",
        "Provide clear placeholder text or instructions.",
        "Use \`aria-invalid\` to indicate an error state, typically managed by the component.",
        "Ensure sufficient color contrast for borders and text, especially in error states.",
        "Disabled inputs are not focusable or editable.",
      ]
    },
    { 
      id: 'card', 
      name: 'Card', 
      icon: <CardIcon />, 
      demo: <ReactifyCardDemo />,
      codeExample: `
import { 
  ReactifyCard,
  ReactifyCardHeader,
  ReactifyCardTitle,
  ReactifyCardDescription,
  ReactifyCardContent,
  ReactifyCardFooter
} from '@/components/reactify/card';
import { ReactifyButton } from '@/components/reactify/button';

// Basic Card
<ReactifyCard>
  <ReactifyCardHeader>
    <ReactifyCardTitle>Card Title</ReactifyCardTitle>
    <ReactifyCardDescription>A short description for the card.</ReactifyCardDescription>
  </ReactifyCardHeader>
  <ReactifyCardContent>
    <p>This is the main content of the card. It can contain any elements you need.</p>
  </ReactifyCardContent>
  <ReactifyCardFooter>
    <ReactifyButton variant="primary">Action</ReactifyButton>
  </ReactifyCardFooter>
</ReactifyCard>
  `,
      accessibilityNotes: [
        "Ensure card titles are meaningful (e.g., using appropriate heading levels like <h3> within the card).",
        "If cards are interactive (e.g., clickable as a whole), ensure they have proper focus indicators and ARIA roles (e.g., \`role='link'\` or \`role='button'\`).",
        "Content within the card should follow general accessibility guidelines for text, images, and interactive elements.",
      ]
    },
    { 
      id: 'modal', 
      name: 'Modal', 
      icon: <ModalIcon />, 
      demo: <ReactifyModalDemo />,
      codeExample: `
import { useState } from 'react';
import { ReactifyModal } from '@/components/reactify/modal';
import { ReactifyButton } from '@/components/reactify/button';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ReactifyButton onClick={() => setIsOpen(true)}>Open Modal</ReactifyButton>
      <ReactifyModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal Title"
        footer={
          <>
            <ReactifyButton variant="outline" onClick={() => setIsOpen(false)}>Cancel</ReactifyButton>
            <ReactifyButton variant="primary" onClick={() => { alert('Confirmed!'); setIsOpen(false); }}>Confirm</ReactifyButton>
          </>
        }
      >
        <p>This is the content of the modal. You can put any React nodes here.</p>
      </ReactifyModal>
    </>
  );
}
  `,
      accessibilityNotes: [
        "Modals should be announced by screen readers when opened. Use \`role='dialog'\` and \`aria-modal='true'\`.",
        "Provide a clear title for the modal using \`aria-labelledby\` referencing the title element.",
        "Focus should be trapped within the modal when it's open.",
        "The modal should be closable via the Escape key.",
        "Ensure there is a clearly identifiable close button.",
        "When the modal closes, focus should return to the element that triggered it.",
      ]
    },
    { 
      id: 'dropdown', 
      name: 'Dropdown', 
      icon: <DropdownIcon />, 
      demo: <ReactifyDropdownDemo />,
      codeExample: `
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
  `,
      accessibilityNotes: [
        "The dropdown trigger should be focusable and activatable via keyboard (Enter/Space).",
        "Use \`aria-haspopup='true'\` and \`aria-expanded\` on the trigger element.",
        "The dropdown menu should have \`role='menu'\`.",
        "Dropdown items should have \`role='menuitem'\`.",
        "Keyboard navigation within the dropdown (Up/Down arrows, Enter/Space to select, Esc to close) should be implemented.",
        "Focus should be managed correctly when opening and closing the dropdown.",
      ]
    },
  ];

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4 flex items-center justify-between">
            <h2 className="font-headline text-lg font-semibold group-data-[collapsible=icon]:hidden">Components</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {components.map((component) => (
                <SidebarMenuItem key={component.id}>
                  <SidebarMenuButton
                    asChild
                    tooltip={{ children: component.name, side: 'right' }}
                    //isActive={true} // Logic to determine active component would go here
                  >
                    <a href={`#${component.id}`}>
                      {React.cloneElement(component.icon, { className: 'h-5 w-5' })}
                      <span className="group-data-[collapsible=icon]:hidden">{component.name}</span>
                    </a>
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
            {components.map((component) => (
              <div key={component.id} id={component.id} className="mb-12 scroll-mt-20">
                <ComponentDisplay 
                  title={component.name} 
                  description={`Examples and usage of the Reactify ${component.name} component.`}
                  codeExample={component.codeExample}
                  accessibilityNotes={component.accessibilityNotes}
                >
                  {component.demo}
                </ComponentDisplay>
              </div>
            ))}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

// Custom simple icons if Lucide doesn't have exact matches or for style consistency
const InputIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
);
const CardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const ModalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2h-4m-6 0H9m4 0h2m-4-4v4m0 0H9m4 0h2M9 7h6m-6 4h6m-6 4h6" /></svg>
);
const DropdownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);
