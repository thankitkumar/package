
'use client';

import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ComponentDisplay } from './_components/component-display';
import { 
  SquareStack, TerminalSquare, LayoutGrid, Rows, ChevronDownCircle, 
  MessageSquareWarning, BadgePercent, CheckSquare, Folders, Info, Type,
  PanelTop, PanelBottom, PanelLeft, UserCircle, Dot, ToggleLeft,
  SeparatorHorizontal, Gauge
} from 'lucide-react';

import ReactifyAlertDemo from './_components/reactify-alert-demo';
import ReactifyAvatarDemo from './_components/reactify-avatar-demo';
import ReactifyBadgeDemo from './_components/reactify-badge-demo';
import ReactifyButtonDemo from './_components/reactify-button-demo';
import ReactifyCardDemo from './_components/reactify-card-demo';
import ReactifyCheckboxDemo from './_components/reactify-checkbox-demo';
import ReactifyDividerDemo from './_components/reactify-divider-demo';
import ReactifyDropdownDemo from './_components/reactify-dropdown-demo';
import ReactifyFooterDemo from './_components/reactify-footer-demo';
import ReactifyHeaderDemo from './_components/reactify-header-demo';
import ReactifyInputDemo from './_components/reactify-input-demo';
import ReactifyModalDemo from './_components/reactify-modal-demo';
import ReactifyProgressBarDemo from './_components/reactify-progress-bar-demo';
import ReactifyRadioGroupDemo from './_components/reactify-radio-group-demo';
import ReactifySidebarDemo from './_components/reactify-sidebar-demo';
import ReactifyTabsDemo from './_components/reactify-tabs-demo';
import ReactifyTextareaDemo from './_components/reactify-textarea-demo';
import ReactifyToggleSwitchDemo from './_components/reactify-toggle-switch-demo';
import ReactifyTooltipDemo from './_components/reactify-tooltip-demo';


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
// Or provide a custom ReactNode for the icon
// <ReactifyAlert variant="info" icon={<MyCustomIcon />}>With custom icon.</ReactifyAlert>
  `,
    accessibilityNotes: [
      "Use appropriate ARIA roles (e.g., role='alert' for assertive messages). Our component defaults to role='alert'.",
      "Ensure icons have proper alternative text or are decorative. Default icons are decorative.",
      "Sufficient color contrast for text and icons is maintained via Tailwind classes.",
    ]
  },
  {
    id: 'avatar',
    name: 'Avatar',
    icon: <UserCircle />,
    demo: <ReactifyAvatarDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyAvatar } from '@/components/reactify/avatar';
import { User } from 'lucide-react'; // Example for custom fallback

// Image Avatar
<ReactifyAvatar src="https://placehold.co/100x100.png" alt="User Name" />

// Fallback to Initials (if src is missing/fails and alt is provided)
<ReactifyAvatar alt="Jane Doe" size="lg" />

// Custom Fallback Content
<ReactifyAvatar alt="Anonymous" fallback={<User />} />

// Different Sizes and Shapes
<ReactifyAvatar src="/path/to/img.png" alt="User" size="sm" shape="square" />
<ReactifyAvatar alt="Big User" size="xl" />
  `,
    accessibilityNotes: [
      "Ensure `alt` text is descriptive if the image is meaningful. If decorative, provide an empty `alt=''`.",
      "Fallback content (initials or custom) should be clear and provide context.",
      "Avatars are typically not interactive on their own; if wrapped in a button or link, ensure that element is accessible.",
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
      "Good color contrast is important for readability, handled by predefined variants.",
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
import { Heart, Upload, AlertTriangle } from 'lucide-react'; // Example icons

// Primary Button
<ReactifyButton variant="primary">Primary Action</ReactifyButton>

// Other variants: secondary, outline, ghost, destructive
<ReactifyButton variant="destructive" leftIcon={<AlertTriangle />}>Delete</ReactifyButton>

// Sizes: sm, md (default), lg
<ReactifyButton variant="primary" size="lg">Large Button</ReactifyButton>

// With icons
<ReactifyButton variant="secondary" rightIcon={<Upload />}>Upload File</ReactifyButton>

// Loading state
<ReactifyButton variant="primary" isLoading={true}>Processing...</ReactifyButton>

// Disabled state
<ReactifyButton variant="outline" disabled>Cannot Click</ReactifyButton>
  `,
    accessibilityNotes: [
      "Ensure buttons have clear, descriptive text content or an aria-label for icon-only buttons.",
      "Buttons are focusable and activatable using Enter or Space keys.",
      "Loading state is announced via `aria-busy` and `aria-live` (handled by the component).",
      "Disabled state uses the `disabled` attribute, making it unfocusable and unclickable.",
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
import { ReactifyButton } from '@/components/reactify/button'; // Example

<ReactifyCard>
  <ReactifyCardHeader>
    <ReactifyCardTitle>Card Title Here</ReactifyCardTitle>
    <ReactifyCardDescription>Optional description for the card.</ReactifyCardDescription>
  </ReactifyCardHeader>
  <ReactifyCardContent>
    <p>Main content of the card. Can include text, images, etc.</p>
  </ReactifyCardContent>
  <ReactifyCardFooter>
    <ReactifyButton variant="primary">Action</ReactifyButton>
  </ReactifyCardFooter>
</ReactifyCard>
  `,
    accessibilityNotes: [
      "Ensure card titles are meaningful and use appropriate heading levels (ReactifyCardTitle renders as <h3>).",
      "If cards are interactive (e.g., clickable as a whole), ensure they have proper focus indicators and ARIA roles (e.g., wrap in a link or button, or add `role` and `tabindex` to the card itself if it acts as one large interactive element).",
      "Content within the card should follow general accessibility guidelines for text, images, and interactive elements.",
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
import { useState } from 'react'; // For controlled component

function MyCheckboxComponent() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ReactifyCheckbox
      id="myCheckbox"
      label="Accept terms and conditions"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
}

// Supports size (sm, md, lg) and disabled props.
// <ReactifyCheckbox id="smallOne" label="Small" size="sm" />
// <ReactifyCheckbox id="largeDisabled" label="Large Disabled" size="lg" disabled checked />
  `,
    accessibilityNotes: [
      "Always associate with a `<label>`. The `label` prop links the visual label to the input.",
      "Ensure a visible focus indicator (handled by default styles).",
      "State (checked/unchecked) should be clear visually and to assistive technologies.",
      "The hidden native input handles most ARIA attributes.",
    ]
  },
  {
    id: 'divider',
    name: 'Divider',
    icon: <SeparatorHorizontal />,
    demo: <ReactifyDividerDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyDivider } from '@/components/reactify/divider';

// Horizontal Divider (default)
<p>Content above</p>
<ReactifyDivider />
<p>Content below</p>

// Vertical Divider
<div className="flex items-center h-20"> {/* Use Tailwind for layout */}
  <span>Left</span>
  <ReactifyDivider orientation="vertical" /> {/* self-stretch is applied for flex context */}
  <span>Right</span>
</div>

// Custom styling
<ReactifyDivider className="my-8 border-dashed border-primary" />
  `,
    accessibilityNotes: [
      "If the divider is purely decorative, ensure it does not receive focus.",
      "If it semantically separates content, it uses `role='separator'` and `aria-orientation` (handled by component).",
      "Horizontal dividers default to using `<hr>` tag for inherent semantics.",
      "Vertical dividers use a `<div>` and rely on ARIA attributes for semantics if decorative is true.",
    ]
  },
  {
    id: 'dropdown',
    name: 'Dropdown Menu',
    icon: <ChevronDownCircle />,
    demo: <ReactifyDropdownDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyDropdown, ReactifyDropdownItem } from '@/components/reactify/dropdown';
import { ReactifyButton } from '@/components/reactify/button'; // For trigger
import { ChevronDown } from 'lucide-react'; // Example icon

function MyDropdownComponent() {
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
      <hr className="my-1 border-border" /> {/* Optional separator */}
      <ReactifyDropdownItem onSelect={() => alert('Delete selected')} className="text-destructive hover:bg-destructive/10">
        Delete
      </ReactifyDropdownItem>
    </ReactifyDropdown>
  );
}
  `,
    accessibilityNotes: [
      "The dropdown trigger should be focusable and activatable via keyboard (Enter/Space).",
      "Use `aria-haspopup='true'` and `aria-expanded` on the trigger element (handled by the component).",
      "The dropdown menu should have `role='menu'` (handled by the component).",
      "Dropdown items should have `role='menuitem'` (handled by ReactifyDropdownItem).",
      "Keyboard navigation within the dropdown (Up/Down arrows, Enter/Space to select, Esc to close) should be implemented (basic Esc to close is implemented). Full arrow key navigation may require more complex focus management.",
      "Focus should be managed correctly when opening and closing the dropdown.",
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
  <div className="mt-1">
    <a href="/privacy" className="text-primary hover:underline text-xs">Privacy Policy</a>
    <span className="mx-1 text-xs">|</span>
    <a href="/terms" className="text-primary hover:underline text-xs">Terms of Service</a>
  </div>
</ReactifyFooter>

// Can be customized with Tailwind classes via className prop
// <ReactifyFooter className="bg-slate-800 text-slate-200">Custom Footer</ReactifyFooter>
  `,
    accessibilityNotes: [
      "Typically contains copyright information, links to privacy policy, terms of service, sitemap, etc.",
      "Uses the HTML5 semantic element \`<footer>\` by default, which is good for page structure.",
      "Ensure links within the footer are accessible (clear text, focus indicators).",
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
import { ReactifyButton } from '@/components/reactify/button'; // Example for nav items
import { Package } from 'lucide-react'; // Example logo icon

<ReactifyHeader>
  <div className="flex items-center gap-2">
    <Package className="h-6 w-6 text-primary" />
    <span className="font-semibold text-lg">MyApp</span>
  </div>
  <nav className="flex items-center gap-2">
    <ReactifyButton variant="ghost" size="sm">Home</ReactifyButton>
    <ReactifyButton variant="ghost" size="sm">About</ReactifyButton>
    <ReactifyButton variant="primary" size="sm">Sign Up</ReactifyButton>
  </nav>
</ReactifyHeader>

// Customization via className or by passing structured children.
  `,
    accessibilityNotes: [
      "Should contain main navigation links, site branding/logo.",
      "Uses the HTML5 semantic element \`<header>\` by default.",
      "Ensure navigation within the header is keyboard accessible and uses appropriate ARIA roles if it's a complex navigation menu (e.g., \`role='navigation'\` for the nav element).",
      "Logo should have appropriate alt text if it's an image, or be clear if it's text.",
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
import { Label } from '@/components/ui/label'; // Assuming a Label component

// Standard Input with Label
<div>
  <Label htmlFor="name">Name</Label>
  <ReactifyInput type="text" id="name" placeholder="Enter your name" />
</div>

// Input with Error State
<div>
  <Label htmlFor="email-error">Email</Label>
  <ReactifyInput type="email" id="email-error" defaultValue="invalid@" error />
  <p className="text-sm text-destructive mt-1">Please enter a valid email.</p>
</div>

// Disabled Input
<ReactifyInput type="text" id="disabled-example" value="Read Only" disabled />
  `,
    accessibilityNotes: [
      "Always associate inputs with a \`<label>\` element using `htmlFor` and `id` attributes.",
      "Provide clear placeholder text or instructions.",
      "Use `aria-invalid='true'` to indicate an error state (handled by the component's `error` prop).",
      "Ensure sufficient color contrast for borders and text, especially in error states (handled by default styles).",
      "Disabled inputs are not focusable or editable.",
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
import { ReactifyButton } from '@/components/reactify/button'; // For trigger and footer
import { useState } from 'react'; // For controlling modal state

function MyModalComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ReactifyButton onClick={() => setIsModalOpen(true)}>Open Modal</ReactifyButton>
      <ReactifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="My Awesome Modal"
        footer={
          <>
            <ReactifyButton variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </ReactifyButton>
            <ReactifyButton variant="primary" onClick={() => { setIsModalOpen(false); alert('Confirmed!'); }}>
              Confirm
            </ReactifyButton>
          </>
        }
      >
        <p>This is the main content of the modal. You can place any React nodes here, like forms, text, or images.</p>
      </ReactifyModal>
    </>
  );
}
  `,
    accessibilityNotes: [
      "Modals should be announced by screen readers when opened. Uses `role='dialog'` and `aria-modal='true'`.",
      "Provide a clear title for the modal using the `title` prop, which sets `aria-labelledby`.",
      "Focus should be trapped within the modal when it's open (basic focus on modal itself implemented).",
      "The modal should be closable via the Escape key and an explicit close button.",
      "When the modal closes, focus should ideally return to the element that triggered it (requires manual management by the calling component).",
      "Overlay click to close is provided.",
    ]
  },
  {
    id: 'progress-bar',
    name: 'Progress Bar',
    icon: <Gauge />,
    demo: <ReactifyProgressBarDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyProgressBar } from '@/components/reactify/progress-bar';
import { useState, useEffect } from 'react'; // For dynamic demo

function MyProgressComponent() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ReactifyProgressBar value={value} label="Content loading progress" />
      <ReactifyProgressBar value={75} variant="success" size="lg" className="mt-4" />
    </>
  );
}
  `,
    accessibilityNotes: [
      "Uses `role='progressbar'`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` for screen readers.",
      "Provide a descriptive `label` prop for `aria-label`.",
      "If the progress value is displayed visually, ensure it's also accessible to screen readers (e.g., via `aria-valuetext` or visually hidden text if `showValueLabel` is used for visual text). Our current `showValueLabel` puts it in `sr-only` span.",
    ]
  },
   {
    id: 'radio-group',
    name: 'Radio Group',
    icon: <Dot />,
    demo: <ReactifyRadioGroupDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyRadioGroup, ReactifyRadioButton } from '@/components/reactify/radio-group';
import { useState } from 'react'; // For controlled component
import { Label } from '@/components/ui/label'; // For group label

function MyRadioGroupComponent() {
  const [selectedValue, setSelectedValue] = useState('apple');

  return (
    <div>
      <Label id="fruit-label">Favorite Fruit:</Label>
      <ReactifyRadioGroup
        name="fruit"
        aria-labelledby="fruit-label"
        value={selectedValue}
        onChange={setSelectedValue}
        orientation="horizontal" // or "vertical"
      >
        <ReactifyRadioButton value="apple" label="Apple" />
        <ReactifyRadioButton value="banana" label="Banana" size="lg" />
        <ReactifyRadioButton value="orange" label="Orange" disabled />
      </ReactifyRadioGroup>
    </div>
  );
}
  `,
    accessibilityNotes: [
      "The `ReactifyRadioGroup` has `role='radiogroup'`.",
      "Each `ReactifyRadioButton` is associated with its label.",
      "Use `aria-labelledby` on the group to associate it with a visible label.",
      "Keyboard navigation (arrow keys to change selection, Tab to move in/out of group) is handled by native radio button behavior.",
      "Disabled states are clearly indicated.",
    ]
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    icon: <PanelLeft />,
    demo: <ReactifySidebarDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { useState } from 'react';
import { ReactifySidebar } from '@/components/reactify/sidebar';
import { ReactifyButton } from '@/components/reactify/button';

function MyPageWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <ReactifyButton onClick={() => setIsSidebarOpen(true)}>
        Open Sidebar
      </ReactifyButton>
      <ReactifySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        position="left" // or "right"
        title="My Sidebar"
        widthClass="w-72" // Example: "w-1/3", "w-96"
        showOverlay={true} // Default is true
      >
        <p>Sidebar content goes here. You can add navigation links, forms, etc.</p>
        <ReactifyButton onClick={() => setIsSidebarOpen(false)} variant="outline" className="mt-4">
          Close
        </ReactifyButton>
      </ReactifySidebar>
    </div>
  );
}
  `,
    accessibilityNotes: [
      "Ensure the sidebar has a clear title (using `title` prop which sets `aria-labelledby`).",
      "Sidebar has `role='complementary'` or could be `role='dialog'` if modal with `aria-modal='true'`.",
      "Provide a clear way to close the sidebar (e.g., close button, Escape key - Esc key not auto-implemented, but close button is).",
      "Manage focus appropriately: when opened, focus should move into the sidebar; when closed, focus should return to the trigger element (requires developer to handle).",
      "Overlay is dismissible on click if present.",
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

<ReactifyTabs defaultActiveTab={0} variant="line"> {/* or "enclosed" */}
  <ReactifyTab label="Profile">
    <p>Profile Content: Information about the user.</p>
  </ReactifyTab>
  <ReactifyTab label="Settings">
    <p>Settings Content: Adjust application preferences here.</p>
  </ReactifyTab>
  <ReactifyTab label="Security" disabled>
    <p>Security Content: This tab is currently disabled.</p>
  </ReactifyTab>
</ReactifyTabs>

// onTabChange callback is available:
// <ReactifyTabs onTabChange={(index) => console.log('Tab changed to:', index)}>...</ReactifyTabs>
  `,
    accessibilityNotes: [
      "Tab list has `role='tablist'`, tabs have `role='tab'`, panels have `role='tabpanel'`.",
      "Use `aria-selected` for active tab, `aria-controls` for panel association (handled by component).",
      "Support keyboard navigation (arrow keys to switch tabs, Enter/Space to activate - basic click activation implemented). Full keyboard navigation (arrow keys) for switching tabs is desirable.",
      "Disabled tabs are visually distinct and not interactive.",
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
import { Label } from '@/components/ui/label'; // Assuming a Label component

// Standard Textarea with Label
<div>
  <Label htmlFor="comment">Your Comment</Label>
  <ReactifyTextarea id="comment" placeholder="Type your comment here..." rows={4} />
</div>

// Textarea with Error State
<div>
  <Label htmlFor="feedback-error">Feedback</Label>
  <ReactifyTextarea id="feedback-error" defaultValue="This has an error." error />
  <p className="text-sm text-destructive mt-1">This field has an issue.</p>
</div>

// Disabled Textarea
<ReactifyTextarea id="notes-disabled" value="Read-only notes." disabled />
  `,
    accessibilityNotes: [
      "Always associate with a \`<label>\` using `htmlFor` and `id`.",
      "Provide clear placeholder text or instructions.",
      "Use `aria-invalid='true'` for error states (handled by the `error` prop).",
      "Ensure sufficient color contrast for borders and text.",
      "Disabled state is non-interactive.",
    ]
  },
  {
    id: 'toggle-switch',
    name: 'Toggle Switch',
    icon: <ToggleLeft />,
    demo: <ReactifyToggleSwitchDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `
import { ReactifyToggleSwitch } from '@/components/reactify/toggle-switch';
import { useState } from 'react'; // For controlled component

function MyToggleComponent() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ReactifyToggleSwitch
      id="myToggle"
      label="Enable Feature"
      checked={isEnabled}
      onChange={(e) => setIsEnabled(e.target.checked)}
      labelPosition="right" // "left" or "right"
      size="md" // "sm", "md", "lg"
    />
  );
}

// Disabled state
// <ReactifyToggleSwitch id="disabledToggle" label="Cannot Change" disabled checked />
  `,
    accessibilityNotes: [
      "Uses a hidden checkbox input with `role='switch'` and `aria-checked` for accessibility.",
      "Associated with a visible label via `htmlFor` and `id`.",
      "Focus indicators are important and handled by default styles.",
      "State (on/off) is clearly communicated visually and to assistive technologies.",
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
import { ReactifyButton } from '@/components/reactify/button'; // Example trigger
import { Info } from 'lucide-react'; // Example icon trigger

// Tooltip on a button
<ReactifyTooltip content="This button performs an action.">
  <ReactifyButton variant="outline">Hover Me</ReactifyButton>
</ReactifyTooltip>

// Tooltip on an icon
<ReactifyTooltip content="More information available here." position="right" delay={500}>
  <Info className="cursor-pointer" />
</ReactifyTooltip>

// Tooltip with JSX content
<ReactifyTooltip content={<div><p>Rich content!</p><em>Supports HTML</em></div>} position="bottom">
  <span>Hover for rich tooltip</span>
</ReactifyTooltip>

// Positions: "top" (default), "bottom", "left", "right"
// Delay prop (in ms) for appearance delay
  `,
    accessibilityNotes: [
      "Tooltip has `role='tooltip'`.",
      "Trigger element should be focusable. If wrapping non-focusable elements, the Tooltip wrapper itself becomes focusable.",
      "Tooltip visibility is controllable via hover and focus.",
      "Content is announced by screen readers when the trigger receives focus or hover.",
      "Ensure tooltips provide non-essential, supplementary information. Critical information should be visible by default.",
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
