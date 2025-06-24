
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarInput } from '@/components/ui/sidebar';
import { ComponentDisplay } from './_components/component-display';
import {
  SquareStack, TerminalSquare, LayoutGrid, Rows, ChevronDownCircle, Type as TypeIcon, Square,
  MessageSquareWarning, BadgePercent, CheckSquare, Folders, Info, ShieldCheck, Wifi, Inbox, Bell,
  PanelTop, PanelBottom, PanelLeft, UserCircle, Dot, ToggleLeft, ToggleRight,
  SeparatorHorizontal, Gauge,
  ListChecks, Wand2, Table2, Search,
  Command as CommandIcon, ListTree, Code as CodeIcon, Presentation, FileCode2,
  PencilRuler, BookMarked, Loader2, Footprints
} from 'lucide-react';
import { ReactifyCard, ReactifyCardContent, ReactifyCardHeader, ReactifyCardTitle } from '@/components/reactify/card';
import Link from 'next/link';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifySkeletonLoader } from '@/components/reactify/skeleton-loader';


// Loader component for dynamic imports
const ComponentLoader = () => (
  <div className="w-full p-6 space-y-6">
    <ReactifySkeletonLoader className="h-8 w-1/3 rounded-md" />
    <div className="space-y-4">
      <ReactifySkeletonLoader className="h-4 w-1/2 rounded-md" />
      <ReactifySkeletonLoader className="h-20 w-full rounded-md" />
      <ReactifySkeletonLoader className="h-10 w-1/4 rounded-md" />
    </div>
  </div>
);

// Dynamically import all demo components
const ReactifyAlertDemo = dynamic(() => import('./_components/reactify-alert-demo'), { loading: () => <ComponentLoader /> });
const ReactifyAvatarDemo = dynamic(() => import('./_components/reactify-avatar-demo'), { loading: () => <ComponentLoader /> });
const ReactifyBadgeDemo = dynamic(() => import('./_components/reactify-badge-demo'), { loading: () => <ComponentLoader /> });
const ReactifyButtonDemo = dynamic(() => import('./_components/reactify-button-demo'), { loading: () => <ComponentLoader /> });
const ReactifyCardDemo = dynamic(() => import('./_components/reactify-card-demo'), { loading: () => <ComponentLoader /> });
const ReactifyCheckboxDemo = dynamic(() => import('./_components/reactify-checkbox-demo'), { loading: () => <ComponentLoader /> });
const ReactifyDividerDemo = dynamic(() => import('./_components/reactify-divider-demo'), { loading: () => <ComponentLoader /> });
const ReactifyDropdownDemo = dynamic(() => import('./_components/reactify-dropdown-demo'), { loading: () => <ComponentLoader /> });
const ReactifyFooterDemo = dynamic(() => import('./_components/reactify-footer-demo'), { loading: () => <ComponentLoader /> });
const ReactifyHeaderDemo = dynamic(() => import('./_components/reactify-header-demo'), { loading: () => <ComponentLoader /> });
const ReactifyInputDemo = dynamic(() => import('./_components/reactify-input-demo'), { loading: () => <ComponentLoader /> });
const ReactifyModalDemo = dynamic(() => import('./_components/reactify-modal-demo'), { loading: () => <ComponentLoader /> });
const ReactifyProgressBarDemo = dynamic(() => import('./_components/reactify-progress-bar-demo'), { loading: () => <ComponentLoader /> });
const ReactifyRadioGroupDemo = dynamic(() => import('./_components/reactify-radio-group-demo'), { loading: () => <ComponentLoader /> });
const ReactifySidebarDemo = dynamic(() => import('./_components/reactify-sidebar-demo'), { loading: () => <ComponentLoader /> });
const ReactifySkeletonLoaderDemo = dynamic(() => import('./_components/reactify-skeleton-loader-demo'), { loading: () => <ComponentLoader /> });
const ReactifySpinnerDemo = dynamic(() => import('./_components/reactify-spinner-demo'), { loading: () => <ComponentLoader /> });
const ReactifyTabsDemo = dynamic(() => import('./_components/reactify-tabs-demo'), { loading: () => <ComponentLoader /> });
const ReactifyTextareaDemo = dynamic(() => import('./_components/reactify-textarea-demo'), { loading: () => <ComponentLoader /> });
const ReactifyToggleSwitchDemo = dynamic(() => import('./_components/reactify-toggle-switch-demo'), { loading: () => <ComponentLoader /> });
const ReactifyTooltipDemo = dynamic(() => import('./_components/reactify-tooltip-demo'), { loading: () => <ComponentLoader /> });
const ReactifyToasterDemo = dynamic(() => import('./_components/reactify-toaster-demo'), { loading: () => <ComponentLoader /> });
const ReactifyFormWizardDemo = dynamic(() => import('./_components/reactify-form-wizard-demo'), { loading: () => <ComponentLoader /> });
const ReactifyProtectedContentDemo = dynamic(() => import('./_components/reactify-protected-content-demo'), { loading: () => <ComponentLoader /> });
const ReactifyNetworkAwareDemo = dynamic(() => import('./_components/reactify-network-aware-demo'), { loading: () => <ComponentLoader /> });
const ReactifySmartEmptyStateDemo = dynamic(() => import('./_components/reactify-smart-empty-state-demo'), { loading: () => <ComponentLoader /> });
const ReactifyAdvancedTableDemo = dynamic(() => import('./_components/reactify-advanced-table-demo'), { loading: () => <ComponentLoader /> });
const ReactifyKeyboardShortcutManagerDemo = dynamic(() => import('./_components/reactify-keyboard-shortcut-manager-demo'), { loading: () => <ComponentLoader /> });
const ReactifyAutocompleteDemo = dynamic(() => import('./_components/reactify-autocomplete-demo'), { loading: () => <ComponentLoader /> });
const ReactifyMultiSelectDemo = dynamic(() => import('./_components/reactify-multi-select-demo'), { loading: () => <ComponentLoader /> });


type ComponentCategory = 'standard' | 'advanced';

interface ComponentDefinition {
  id: string;
  name: string;
  icon: React.ReactElement;
  category: ComponentCategory;
  demo: React.ReactElement;
  codeExample?: string;
  accessibilityNotes?: string[];
  codeBlockScrollAreaClassName?: string;
  version?: string;
}

const components: ComponentDefinition[] = [
  {
    id: 'alert', name: 'Alert', icon: <MessageSquareWarning />, category: 'standard', demo: <ReactifyAlertDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyAlert } from '@/components/reactify/alert';
import { CheckCircle } from 'lucide-react'; // Or your custom icon

// Info Alert (Default)
<ReactifyAlert title="Information">
  This is an informational message.
</ReactifyAlert>

// Success Alert with Custom Icon
<ReactifyAlert variant="success" title="Success!" icon={<CheckCircle className="h-5 w-5 text-green-500" />}>
  Your action was completed successfully.
</ReactifyAlert>

// Warning Alert (No Icon by prop)
<ReactifyAlert variant="warning" title="Warning" icon={false}>
  Be cautious with this action. (No default icon)
</ReactifyAlert>

// Destructive Alert
<ReactifyAlert variant="destructive" title="Error Occurred">
  Something went wrong. Please try again.
</ReactifyAlert>

// Alert without title
<ReactifyAlert variant="info">
  This alert only has a description body.
</ReactifyAlert>
`,
    accessibilityNotes: [
      "Alerts should have an appropriate \`role\` (e.g., 'alert', 'status'). ReactifyAlert sets \`role='alert'\`.",
      "Ensure alerts are announced by screen readers, especially if they appear dynamically.",
      "Provide clear and concise information within the alert.",
      "If the alert includes interactive elements (like a dismiss button), ensure they are keyboard accessible and properly labeled.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'avatar', name: 'Avatar', icon: <UserCircle />, category: 'standard', demo: <ReactifyAvatarDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyAvatar } from '@/components/reactify/avatar';
import { User, Image as ImageIcon } from 'lucide-react';

// Avatar with image source
<ReactifyAvatar src="https://placehold.co/100x100.png" alt="User Avatar" />

// Different sizes
<ReactifyAvatar src="https://placehold.co/100x100.png" alt="Small User" size="sm" />
<ReactifyAvatar src="https://placehold.co/100x100.png" alt="Large User" size="lg" />

// Square shape
<ReactifyAvatar src="https://placehold.co/100x100.png" alt="Square Avatar" shape="square" size="xl" />

// Fallback with initials (automatic from alt if no src/fallback prop)
<ReactifyAvatar alt="Jane Doe" size="md" />

// Fallback with explicit text
<ReactifyAvatar alt="JD" fallback="JD" size="md" />

// Fallback with custom ReactNode (e.g., an icon)
<ReactifyAvatar alt="Anonymous" fallback={<User className="h-8 w-8" />} size="lg" />

// Avatar group example (styling applied via Tailwind)
<div className="flex -space-x-4">
  <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User 1" className="border-2 border-background"/>
  <ReactifyAvatar alt="User 2 Initials" className="border-2 border-background"/>
  <ReactifyAvatar fallback="+3" className="border-2 border-background bg-primary text-primary-foreground" />
</div>
`,
    accessibilityNotes: [
      "Ensure \`alt\` text is descriptive if the image source is provided and meaningful.",
      "If using fallback text, ensure it's concise and readable.",
      "If the avatar is interactive (e.g., a link or button), ensure it has appropriate ARIA roles and keyboard accessibility.",
      "Default behavior is decorative; explicit roles should be added if it's part of a control.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'badge', name: 'Badge', icon: <BadgePercent />, category: 'standard', demo: <ReactifyBadgeDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyBadge } from '@/components/reactify/badge';

// Primary Badge (Default)
<ReactifyBadge>Primary</ReactifyBadge>

// Secondary Badge
<ReactifyBadge variant="secondary">Secondary</ReactifyBadge>

// Destructive Badge
<ReactifyBadge variant="destructive">Destructive</ReactifyBadge>

// Outline Badge
<ReactifyBadge variant="outline">Outline</ReactifyBadge>

// Success Badge
<ReactifyBadge variant="success">Success</ReactifyBadge>

// Warning Badge
<ReactifyBadge variant="warning">Warning</ReactifyBadge>

// Different Sizes
<ReactifyBadge size="sm">Small</ReactifyBadge>
<ReactifyBadge size="lg">Large</ReactifyBadge>
`,
    accessibilityNotes: [
      "Badges are typically decorative. If they convey critical information not otherwise available, ensure screen reader users can access this info (e.g., via \`aria-label\` on a parent or descriptive surrounding text).",
      "Ensure sufficient color contrast between the badge text and its background.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'button', name: 'Button', icon: <SquareStack />, category: 'standard', demo: <ReactifyButtonDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyButton } from '@/components/reactify/button';
import { Heart, Upload, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

// Primary Button
<ReactifyButton variant="primary">Primary Action</ReactifyButton>

// Secondary Button
<ReactifyButton variant="secondary">Secondary Action</ReactifyButton>

// Destructive Button
<ReactifyButton variant="destructive" leftIcon={<AlertTriangle size={16} />}>
  Delete Item
</ReactifyButton>

// Success Button
<ReactifyButton variant="success" leftIcon={<CheckCircle size={16}/>}>Success Action</ReactifyButton>

// Warning Button
<ReactifyButton variant="warning">Warning Action</ReactifyButton>

// Link Button
<ReactifyButton variant="link" rightIcon={<ExternalLink size={14}/>}>This is a link</ReactifyButton>

// Button with Left Icon
<ReactifyButton variant="primary" leftIcon={<Heart size={16} />}>
  Like
</ReactifyButton>

// Loading State Button
<ReactifyButton variant="primary" isLoading={true}>
  Processing
</ReactifyButton>
  `,
    accessibilityNotes: [
      "Ensure buttons have clear, descriptive text content or an \`aria-label\` if only an icon is present.",
      "Buttons are focusable and can be activated using Enter or Space keys.",
      "Loading state is announced via \`aria-busy='true'\` and \`aria-live='polite'\` (implicitly handled by the loading icon's visual change and potential text change).",
      "Disabled state uses the native \`disabled\` attribute, making it unfocusable and unclickable by default.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'card', name: 'Card', icon: <LayoutGrid />, category: 'standard', demo: <ReactifyCardDemo />,
    version: '1.0.0',
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
import Image from 'next/image';

// Card with structured content
<ReactifyCard>
  <ReactifyCardHeader>
    <ReactifyCardTitle>Product Update</ReactifyCardTitle>
    <ReactifyCardDescription>Version 1.0.0 is now live!</ReactifyCardDescription>
  </ReactifyCardHeader>
  <ReactifyCardContent>
    <p>
      The main content of the card goes here. Padding is applied by default.
    </p>
  </ReactifyCardContent>
  <ReactifyCardFooter>
    <ReactifyButton>Action</ReactifyButton>
  </ReactifyCardFooter>
</ReactifyCard>

// Card with an image that fills the width (no root padding)
<ReactifyCard className="max-w-md">
  <Image
    src="https://placehold.co/600x300.png"
    alt="Product image"
    width={600}
    height={300}
    className="rounded-t-lg"
  />
  <ReactifyCardHeader>
    <ReactifyCardTitle>Image Card</ReactifyCardTitle>
  </ReactifyCardHeader>
  <ReactifyCardContent>
    <p>
      Because padding is in the sub-components, this image can be flush with the card's edges.
    </p>
  </ReactifyCardContent>
</ReactifyCard>
`,
    accessibilityNotes: [
      "By moving padding to sub-components, the root Card is more flexible for custom layouts (e.g., full-width images).",
      "Ensure card titles (\`ReactifyCardTitle\`) are meaningful. They render as <h3> by default.",
      "If a card is entirely clickable, wrap it in an `<a>` or `<button>` tag and ensure it has proper focus indicators and ARIA roles.",
      "Content within the card should follow general accessibility guidelines.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'checkbox', name: 'Checkbox', icon: <CheckSquare />, category: 'standard', demo: <ReactifyCheckboxDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyCheckbox } from '@/components/reactify/checkbox';
import { useState } from 'react';

function CheckboxExample() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <ReactifyCheckbox
        id="terms"
        label="Accept terms and conditions"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <p>Checked: {isChecked.toString()}</p>

      {/* Sizes */}
      <ReactifyCheckbox id="size-sm" label="Small" size="sm" />
      <ReactifyCheckbox id="size-lg" label="Large" size="lg" />

      {/* Disabled */}
      <ReactifyCheckbox id="disabled-unchecked" label="Disabled Off" disabled />
      <ReactifyCheckbox id="disabled-checked" label="Disabled On" checked disabled />

      {/* No Label (requires aria-label) */}
      <ReactifyCheckbox id="no-label" aria-label="Standalone option" />
    </>
  );
}
`,
    accessibilityNotes: [
      "Always associate a checkbox with a visible \`label\` prop, or provide an \`aria-label\` if a visible label is not present.",
      "The component automatically links the visual label to the input via \`htmlFor\` and \`id\`.",
      "Disabled checkboxes are correctly marked with the \`disabled\` attribute.",
      "The checked state is visually clear and conveyed programmatically.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'divider', name: 'Divider', icon: <SeparatorHorizontal />, category: 'standard', demo: <ReactifyDividerDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyDivider } from '@/components/reactify/divider';

// Horizontal Divider (Default)
<div>
  <p>Content above</p>
  <ReactifyDivider />
  <p>Content below</p>
</div>

// Vertical Divider
<div className="flex items-center h-20">
  <span>Left</span>
  <ReactifyDivider orientation="vertical" />
  <span>Right</span>
</div>

// Customized Divider (using Tailwind classes)
<ReactifyDivider className="my-8 border-primary border-dashed" />
`,
    accessibilityNotes: [
      "Dividers are often decorative. By default, \`ReactifyDivider\` sets \`role='separator'\` and \`aria-orientation\`.",
      "If the divider is purely visual and doesn't separate distinct content sections in a way that's meaningful to screen reader users, consider if these ARIA attributes are necessary or if it should be purely decorative (e.g., \`role='none'\` or no role if it's just a styled \`<hr>\`). ReactifyDivider currently assumes it's separating content.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'dropdown', name: 'Dropdown Menu', icon: <ChevronDownCircle />, category: 'standard', demo: <ReactifyDropdownDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyDropdown, ReactifyDropdownItem } from '@/components/reactify/dropdown';
import { ReactifyButton } from '@/components/reactify/button';
import { ChevronDown, Edit, Copy, Archive, MoreHorizontal } from 'lucide-react';

function MyDropdown() {
  return (
    <ReactifyDropdown
      trigger={
        <ReactifyButton variant="outline" rightIcon={<ChevronDown size={16} />}>
          Options
        </ReactifyButton>
      }
    >
      <ReactifyDropdownItem onSelect={() => alert('Edit selected')} className="flex items-center gap-2">
        <Edit size={14} /> Edit
      </ReactifyDropdownItem>
      <ReactifyDropdownItem onSelect={() => alert('Copy selected')} className="flex items-center gap-2">
        <Copy size={14} /> Copy
      </ReactifyDropdownItem>
      <ReactifyDropdownItem onSelect={() => alert('Archive selected')} disabled className="flex items-center gap-2">
        <Archive size={14} /> Archive (Disabled)
      </ReactifyDropdownItem>
      <hr className="my-1 border-border" /> {/* Simple separator */}
      <ReactifyDropdownItem onSelect={() => alert('Delete selected')} className="text-destructive hover:bg-destructive/10">
        Delete
      </ReactifyDropdownItem>
    </ReactifyDropdown>
  );
}

// Right-aligned dropdown with icon trigger
function IconDropdown() {
  return (
    <ReactifyDropdown
      align="right"
      trigger={
        <ReactifyButton variant="ghost" size="sm" className="p-2">
          <MoreHorizontal size={20} />
          <span className="sr-only">More options</span>
        </ReactifyButton>
      }
    >
      {/* ... items ... */}
    </ReactifyDropdown>
  );
}
`,
    accessibilityNotes: [
      "The dropdown trigger is focusable and activatable via keyboard (Enter/Space triggers it, it has \`aria-haspopup='true'\` and \`aria-expanded\`).",
      "The dropdown menu itself has \`role='menu'\`.",
      "Dropdown items (\`ReactifyDropdownItem\`) have \`role='menuitem'\`. Custom content within items should be accessible.",
      "Keyboard navigation within the dropdown (Up/Down arrows, Enter/Space to select, Esc to close) should be implemented. For fully custom items, ensure they are navigable.",
      "Focus is managed: when the dropdown opens, focus can move into it. When it closes (e.g., via Esc or click outside), focus should ideally return to the trigger.",
      "Disabled items are marked appropriately.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'footer', name: 'Footer', icon: <Footprints />, category: 'standard', demo: <ReactifyFooterDemo />,
    version: '1.0.0',
    codeExample: `
import { 
  ReactifyFooter, 
  type FooterAddressColumn, 
  type FooterLinkColumn, 
  type SocialLink 
} from '@/components/reactify/footer';

// Define the data for your footer
const addressData: FooterAddressColumn = {
  title: "Corporate Address",
  addressLines: ["123 Main Street", "Anytown, USA 12345"],
  tel: "555-123-4567",
  email: "contact@example.com"
};

const linkCols: FooterLinkColumn[] = [
  {
    title: "Company",
    links: [
      { text: "About Us", href: "/about" },
      { text: "Careers", href: "/careers" }
    ]
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "/blog" },
      { text: "Support", href: "/support" }
    ]
  }
];

const socialData: SocialLink[] = [
  { type: 'linkedin', href: '#' },
  { type: 'twitter', href: '#' }
];

const copyrightNotice = "© 2024 Your Company, Inc.";

function MyPageWithFooter() {
  return (
    <ReactifyFooter
      address={addressData}
      linkColumns={linkCols}
      socials={socialData}
      copyrightText={copyrightNotice}
      // You can customize colors via Tailwind classes
      topSectionClassName="bg-gray-800"
      bottomSectionClassName="bg-gray-900"
    />
  );
}
`,
    accessibilityNotes: [
      "The component uses the HTML5 `<footer>` landmark element, which is good for page structure and assistive technologies.",
      "Ensure content within the footer (links, text) is accessible (e.g., links have discernible text, sufficient contrast).",
      "Social media links should have `aria-label` attributes to provide context (e.g., 'Visit our LinkedIn page'). The component handles this automatically.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'header', name: 'Header', icon: <PanelTop />, category: 'standard', demo: <ReactifyHeaderDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyHeader } from '@/components/reactify/header';
import { ReactifyButton } from '@/components/reactify/button';
import { Package } from 'lucide-react'; // Example Icon

// Basic Header with Logo and Navigation
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

// Header with different HTML tag (e.g., for section header)
<ReactifyHeader as="div" className="border-none shadow-none p-2 justify-start">
  <h2 className="text-xl font-bold">Section Title</h2>
</ReactifyHeader>
`,
    accessibilityNotes: [
      "The component defaults to using the HTML5 \`<header>\` landmark element, aiding in page structure.",
      "Navigation links within the header should be clearly identifiable and structured (e.g., within a \`<nav>\` element).",
      "Ensure interactive elements like logos (if they are links) or buttons have accessible names.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'input', name: 'Input', icon: <TerminalSquare />, category: 'standard', demo: <ReactifyInputDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label'; // Assuming a Label component

// Standard Input with Label
<div>
  <Label htmlFor="demo-name">Name</Label>
  <ReactifyInput type="text" id="demo-name" placeholder="Enter your name" />
</div>

// Input with Error State
<div>
  <Label htmlFor="demo-error">Password</Label>
  <ReactifyInput type="password" id="demo-error" placeholder="Enter password" error />
  <p className="text-sm text-destructive mt-1">Password is too short.</p>
</div>

// Disabled Input
<div>
  <Label htmlFor="demo-disabled">Subscription ID</Label>
  <ReactifyInput type="text" id="demo-disabled" defaultValue="SUB-12345XYZ" disabled />
</div>
`,
    accessibilityNotes: [
      "Always associate inputs with a \`<label>\` element using matching \`htmlFor\` and \`id\` attributes.",
      "Provide clear \`placeholder\` text or instructions if appropriate.",
      "The \`error\` prop sets \`aria-invalid='true'\` automatically.",
      "Ensure sufficient color contrast for input borders and text, especially in error states.",
      "Disabled inputs use the native \`disabled\` attribute.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'modal', name: 'Modal', icon: <Rows />, category: 'standard', demo: <ReactifyModalDemo />,
    version: '1.0.0',
    codeExample: `
import { useState } from 'react';
import { ReactifyModal } from '@/components/reactify/modal';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label';

function ModalExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ReactifyButton onClick={() => setIsModalOpen(true)}>Open Modal</ReactifyButton>
      <ReactifyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sample Modal"
        footer={
          <>
            <ReactifyButton variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</ReactifyButton>
            <ReactifyButton variant="primary" onClick={() => { setIsModalOpen(false); alert('Confirmed!'); }}>Confirm</ReactifyButton>
          </>
        }
      >
        <p>This is the content of the modal. You can put any React nodes here.</p>
        <div className="mt-4">
          <Label htmlFor="modal-input">Example Input</Label>
          <ReactifyInput id="modal-input" placeholder="Type something..." />
        </div>
      </ReactifyModal>
    </>
  );
}
`,
    accessibilityNotes: [
      "The modal has \`role='dialog'\` and \`aria-modal='true'\`.",
      "The title prop sets \`aria-labelledby\` for the modal.",
      "Focus is managed: when the modal opens, it attempts to focus itself (or the first focusable element).",
      "The modal can be closed via the Escape key.",
      "A visible close button with an \`aria-label\` is provided.",
      "When the modal closes, focus should ideally return to the element that triggered it. ReactifyModal's basic version doesn't automatically manage return focus.",
      "Content within the modal should be scrollable if it exceeds the modal's height.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'progress-bar', name: 'Progress Bar', icon: <Gauge />, category: 'standard', demo: <ReactifyProgressBarDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyProgressBar } from '@/components/reactify/progress-bar';
import { useState, useEffect } from 'react';

function ProgressExample() {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    // Simulate progress update
    const timer = setTimeout(() => setProgress(prev => (prev >= 100 ? 10 : prev + 15)), 1500);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <>
      <ReactifyProgressBar value={progress} label="Task completion" />
      
      {/* Static variants */}
      <ReactifyProgressBar value={30} variant="primary" label="Primary task" />
      <ReactifyProgressBar value={50} variant="success" label="Upload success" />
      <ReactifyProgressBar value={70} variant="warning" label="Warning level" />
      <ReactifyProgressBar value={90} variant="destructive" label="Critical error" />

      {/* Sizes */}
      <ReactifyProgressBar value={60} size="sm" label="Small task" />
      <ReactifyProgressBar value={60} size="lg" label="Large task" />

      {/* With sr-only value label */}
      <ReactifyProgressBar value={75} showValueLabel label="Download progress (value hidden)" />
    </>
  );
}
`,
    accessibilityNotes: [
      "The component uses \`role='progressbar'\`.",
      "Crucially, \`aria-valuenow\`, \`aria-valuemin\` (0), and \`aria-valuemax\` (100) are set to convey the current progress to assistive technologies.",
      "The \`label\` prop is used for \`aria-label\` to describe what the progress bar represents.",
      "If \`showValueLabel\` is true, the percentage value is included in a visually hidden span for screen readers (though this is often redundant if \`aria-valuenow\` is correctly updated and announced).",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'radio-group', name: 'Radio Group', icon: <Dot />, category: 'standard', demo: <ReactifyRadioGroupDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyRadioGroup, ReactifyRadioButton } from '@/components/reactify/radio-group';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

function RadioExample() {
  const [selectedValue, setSelectedValue] = useState('option2');

  return (
    <>
      <Label id="options-label">Choose an Option</Label>
      <ReactifyRadioGroup
        name="options"
        aria-labelledby="options-label"
        value={selectedValue}
        onChange={setSelectedValue}
      >
        <ReactifyRadioButton value="option1" label="Option 1" />
        <ReactifyRadioButton value="option2" label="Option 2" />
        <ReactifyRadioButton value="option3" label="Option 3" />
      </ReactifyRadioGroup>
      <p>Selected: {selectedValue}</p>

      {/* Horizontal with sizes */}
      <Label id="food-label">Favorite Food</Label>
      <ReactifyRadioGroup name="food" orientation="horizontal" aria-labelledby="food-label">
        <ReactifyRadioButton value="pizza" label="Pizza" size="sm" />
        <ReactifyRadioButton value="burger" label="Burger" size="md" />
        <ReactifyRadioButton value="pasta" label="Pasta" size="lg" />
      </ReactifyRadioGroup>

      {/* Disabled group */}
      <ReactifyRadioGroup name="disabledGroup" disabled aria-labelledby="some-label">
        <ReactifyRadioButton value="yes" label="Yes" />
      </ReactifyRadioGroup>

      {/* Individually disabled item */}
      <ReactifyRadioGroup name="itemDisabled" aria-labelledby="another-label">
        <ReactifyRadioButton value="active" label="Active" />
        <ReactifyRadioButton value="disabledItem" label="Disabled Item" disabled />
      </ReactifyRadioGroup>
    </>
  );
}
`,
    accessibilityNotes: [
      "The \`ReactifyRadioGroup\` component has \`role='radiogroup'\` and should be labeled using \`aria-labelledby\` pointing to an external visible label.",
      "Each \`ReactifyRadioButton\` is an \`<input type='radio'>\` associated with a \`<label>\`. Ensure labels are clear.",
      "The \`name\` attribute groups the radio buttons.",
      "Disabled state is handled for both the group and individual items.",
      "Keyboard navigation (arrow keys to switch options, Space to select) is standard browser behavior for radio buttons.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'sidebar-component', name: 'Sidebar (Component)', icon: <PanelLeft />, category: 'standard', demo: <ReactifySidebarDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifySidebar } from '@/components/reactify/sidebar';
import { ReactifyButton } from '@/components/reactify/button';
import { useState } from 'react';

function SidebarExample() {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  return (
    <>
      <ReactifyButton onClick={() => setIsLeftOpen(true)}>Open Left Sidebar</ReactifyButton>
      <ReactifyButton onClick={() => setIsRightOpen(true)}>Open Right Sidebar</ReactifyButton>

      <ReactifySidebar
        isOpen={isLeftOpen}
        onClose={() => setIsLeftOpen(false)}
        position="left"
        title="Left Panel"
        widthClass="w-80" // Example custom width
      >
        <p>Content for the left sidebar.</p>
        <ReactifyButton onClick={() => setIsLeftOpen(false)}>Close</ReactifyButton>
      </ReactifySidebar>

      <ReactifySidebar
        isOpen={isRightOpen}
        onClose={() => setIsRightOpen(false)}
        position="right"
        title="Settings Panel"
        showOverlay={false} // Example: no overlay
      >
        <p>Content for the right sidebar (no overlay).</p>
      </ReactifySidebar>
    </>
  );
}
`,
    accessibilityNotes: [
      "The sidebar component has \`role='complementary'\` (can also be 'navigation' or 'dialog' depending on use case; 'complementary' is a general default).",
      "It's labeled by its title using \`aria-labelledby\` if a title is provided.",
      "\`aria-hidden\` is used to hide it from screen readers when closed.",
      "If \`showOverlay\` is true, the overlay helps trap focus visually and can be used to close the sidebar.",
      "The close button is labeled with \`aria-label='Close sidebar'\`.",
      "Ensure content within the sidebar is navigable and focus is managed appropriately if it contains interactive elements, especially when opened as a modal-like element.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'skeleton-loader', name: 'Skeleton Loader', icon: <Square />, category: 'standard', demo: <ReactifySkeletonLoaderDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifySkeletonLoader } from '@/components/reactify/skeleton-loader';
import { Card } from '@/components/ui/card'; // Assuming ShadCN Card for demo

function SkeletonDemo() {
  return (
    <div className="space-y-6">
      {/* Text Line */}
      <ReactifySkeletonLoader className="h-4 w-3/4 rounded-sm" />
      <ReactifySkeletonLoader className="h-4 w-1/2 rounded-sm" />

      {/* Avatar/Circle */}
      <ReactifySkeletonLoader className="h-12 w-12 rounded-full" />

      {/* Rectangle Block */}
      <ReactifySkeletonLoader className="h-20 w-full rounded-md" />

      {/* Card Skeleton Example */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center space-x-4">
          <ReactifySkeletonLoader className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <ReactifySkeletonLoader className="h-4 w-3/4 rounded-sm" />
            <ReactifySkeletonLoader className="h-4 w-1/2 rounded-sm" />
          </div>
        </div>
        <ReactifySkeletonLoader className="h-32 w-full rounded-md" />
      </Card>
    </div>
  );
}
`,
    accessibilityNotes: [
      "Skeleton loaders are visual placeholders and should not contain meaningful content for screen readers.",
      "The container holding the content that will eventually replace the skeleton should have \`aria-busy='true'\` while loading.",
      "The skeleton elements themselves are typically decorative and can have \`aria-hidden='true'\` if they are not conveying any structural information that would be otherwise lost.",
      "The \`animate-pulse\` class provides a visual indication of activity.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'spinner',
    name: 'Spinner',
    icon: <Loader2 />,
    category: 'standard',
    demo: <ReactifySpinnerDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifySpinner } from '@/components/reactify/spinner';

// Default (Primary, md)
<ReactifySpinner />

// With different variants
<ReactifySpinner variant="secondary" />
<ReactifySpinner variant="destructive" />
<ReactifySpinner variant="success" />

// With different sizes
<ReactifySpinner size="sm" />
<ReactifySpinner size="lg" />
<ReactifySpinner size="xl" />

// In context with a label for accessibility
<div className="flex items-center gap-2">
  <ReactifySpinner />
  <p>Loading data...</p>
</div>
`,
    accessibilityNotes: [
      "The spinner wrapper has `role='status'` to indicate it's a live region.",
      "A visually hidden `<span>` with the `label` prop is included for screen reader users to announce the loading state (e.g., 'Loading...').",
      "The SVG itself is decorative and will be ignored by screen readers, which will focus on the role and label.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'tabs', name: 'Tabs', icon: <Folders />, category: 'standard', demo: <ReactifyTabsDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyTabs, ReactifyTab } from '@/components/reactify/tabs';
import { User, Settings, ShieldCheck } from 'lucide-react';

function TabsExample() {
  return (
    <>
      {/* Line Tabs (Default) */}
      <ReactifyTabs defaultActiveTab={0} onTabChange={(index) => console.log('Tab changed to:', index)}>
        <ReactifyTab label="Profile">
          <div className="p-2"><User className="inline mr-1 h-4 w-4" />Profile Content</div>
        </ReactifyTab>
        <ReactifyTab label="Settings">
          <div className="p-2"><Settings className="inline mr-1 h-4 w-4" />Settings Content</div>
        </ReactifyTab>
        <ReactifyTab label="Security" disabled>
          <div className="p-2"><ShieldCheck className="inline mr-1 h-4 w-4" />Security Content (Disabled)</div>
        </ReactifyTab>
      </ReactifyTabs>

      {/* Enclosed Tabs */}
      <ReactifyTabs variant="enclosed" defaultActiveTab={1}>
        <ReactifyTab label="Analytics">Analytics Content</ReactifyTab>
        <ReactifyTab label="Users">Users Content</ReactifyTab>
      </ReactifyTabs>
    </>
  );
}
`,
    accessibilityNotes: [
      "The tabs container (\`ReactifyTabs\`) has \`role='tablist'\` and \`aria-orientation='horizontal'\`.",
      "Each tab button (\`ReactifyTab\` label part) has \`role='tab'\`, \`aria-selected\`, \`aria-controls\` (pointing to its panel ID), and \`id\`.",
      "Each tab panel (\`ReactifyTab\` children part) has \`role='tabpanel'\`, \`aria-labelledby\` (pointing to its tab button ID), and is hidden with the \`hidden\` attribute when not active.",
      "Keyboard navigation (Arrow keys to switch tabs) is handled by the component. Enter/Space to activate a tab is standard.",
      "Disabled tabs are marked with the \`disabled\` attribute.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'textarea', name: 'Textarea', icon: <TypeIcon />, category: 'standard', demo: <ReactifyTextareaDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyTextarea } from '@/components/reactify/textarea';
import { Label } from '@/components/ui/label';

function TextareaExample() {
  return (
    <>
      <div>
        <Label htmlFor="demo-comment">Your Comment</Label>
        <ReactifyTextarea id="demo-comment" placeholder="Type your comment here..." />
      </div>

      {/* Textarea with more rows */}
      <div>
        <Label htmlFor="demo-bio">Biography</Label>
        <ReactifyTextarea id="demo-bio" placeholder="Tell us about yourself." rows={6} />
      </div>

      {/* Textarea with Error State */}
      <div>
        <Label htmlFor="demo-feedback-error">Feedback</Label>
        <ReactifyTextarea id="demo-feedback-error" placeholder="Provide feedback..." error />
        <p className="text-sm text-destructive mt-1">This field is required.</p>
      </div>

      {/* Disabled Textarea */}
      <div>
        <Label htmlFor="demo-notes-disabled">Notes (Read-only)</Label>
        <ReactifyTextarea id="demo-notes-disabled" defaultValue="These notes are read-only." disabled />
      </div>
    </>
  );
}
`,
    accessibilityNotes: [
      "Always associate textareas with a \`<label>\` using matching \`htmlFor\` and \`id\` attributes.",
      "Provide a clear \`placeholder\` if needed.",
      "The \`error\` prop sets \`aria-invalid='true'\`.",
      "Ensure sufficient color contrast for borders and text.",
      "Disabled textareas use the native \`disabled\` attribute.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'toaster',
    name: 'Toaster (Notifications)',
    icon: <Bell />,
    category: 'standard',
    demo: <ReactifyToasterDemo />,
    version: '1.0.0',
    codeExample: `
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button'; // Or ReactifyButton
import { ToastAction } from "@/components/ui/toast";

function MyComponentWithToasts() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col space-y-2">
      <Button
        onClick={() => {
          toast({
            title: "Basic Toast",
            description: "This is a default notification.",
          });
        }}
      >
        Show Default Toast
      </Button>

      <Button
        variant="destructive"
        onClick={() => {
          toast({
            variant: "destructive",
            title: "Error Occurred",
            description: "Something went wrong with your request.",
          });
        }}
      >
        Show Destructive Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Update Complete",
            description: "Your profile has been updated.",
            action: <ToastAction altText="Undo update" onClick={() => console.log('Undo toast action!')}>Undo</ToastAction>,
          });
        }}
      >
        Show Toast with Action
      </Button>
    </div>
  );
}

// Ensure <Toaster /> is rendered in your root layout (e.g., src/app/layout.tsx)
// import { Toaster } from "@/components/ui/toaster";
// ...
// <Toaster /> // This component renders all the toasts
// ...
`,
    accessibilityNotes: [
      "Toasts use \`role='status'\` or \`role='alert'\` (for destructive variant) to announce messages to screen readers.",
      "They are designed to be non-intrusive and typically disappear after a timeout (default 5s).",
      "If toasts contain actions, ensure the action buttons are clearly labeled (e.g., with \`altText\` for \`ToastAction\`) and keyboard accessible.",
      "ShadCN's toast system is built on Radix UI's Toast primitive, which handles focus management and other accessibility concerns.",
      "Ensure toast content is concise and provides clear information. Avoid overly long descriptions.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'toggle-switch', name: 'Toggle Switch', icon: <ToggleLeft />, category: 'standard', demo: <ReactifyToggleSwitchDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyToggleSwitch } from '@/components/reactify/toggle-switch';
import { useState } from 'react';

function ToggleExample() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <>
      <ReactifyToggleSwitch
        id="notifications"
        label="Enable Notifications"
        checked={isEnabled}
        onChange={(e) => setIsEnabled(e.target.checked)}
      />
      <p>Notifications: {isEnabled ? 'On' : 'Off'}</p>

      {/* Label on the left */}
      <ReactifyToggleSwitch id="dark-mode" label="Dark Mode" labelPosition="left" />

      {/* Sizes */}
      <ReactifyToggleSwitch id="size-sm" label="Small" size="sm" />
      <ReactifyToggleSwitch id="size-lg" label="Large" size="lg" />

      {/* Disabled */}
      <ReactifyToggleSwitch id="disabled-off" label="Disabled (Off)" disabled />
      <ReactifyToggleSwitch id="disabled-on" label="Disabled (On)" checked disabled />

      {/* No visible label (requires aria-label) */}
      <ReactifyToggleSwitch id="no-label-toggle" aria-label="Feature X toggle" />
    </>
  );
}
`,
    accessibilityNotes: [
      "The input element has \`role='switch'\` and \`aria-checked\` reflecting its state.",
      "A visible \`label\` should be provided via the prop, or an \`aria-label\` if the label is not visually present.",
      "The component ensures the label is correctly associated with the switch input.",
      "Disabled state is handled with the \`disabled\` attribute on the input.",
      "The switch is keyboard focusable and can be toggled using the Space key.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'tooltip', name: 'Tooltip', icon: <Info />, category: 'standard', demo: <ReactifyTooltipDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyTooltip } from '@/components/reactify/tooltip';
import { ReactifyButton } from '@/components/reactify/button';
import { Info, HelpCircle } from 'lucide-react';

function TooltipExample() {
  return (
    <div className="flex gap-4 p-8">
      <ReactifyTooltip content="Tooltip on Top (Default)">
        <ReactifyButton variant="outline">Hover Me (Top)</ReactifyButton>
      </ReactifyTooltip>

      <ReactifyTooltip content="Tooltip on the bottom." position="bottom">
        <ReactifyButton variant="secondary">Hover Me (Bottom)</ReactifyButton>
      </ReactifyTooltip>

      <ReactifyTooltip content="Left-aligned tooltip." position="left">
        <ReactifyButton variant="ghost">Hover Me (Left)</ReactifyButton>
      </ReactifyTooltip>

      <ReactifyTooltip content="Right-aligned tooltip with delay." position="right" delay={500}>
        <ReactifyButton variant="destructive">Hover Me (Right, 500ms)</ReactifyButton>
      </ReactifyTooltip>

      <ReactifyTooltip content="Information icon tooltip." position="top">
        <Info className="h-6 w-6 text-primary cursor-pointer" />
      </ReactifyTooltip>

       <ReactifyTooltip
        content={
          <div className="text-left">
            <p className="font-bold">Rich Content!</p>
            <ul className="list-disc list-inside text-xs"><li>Item 1</li></ul>
          </div>
        }
        position="bottom"
      >
        <span className="cursor-help text-accent underline">Rich Tooltip Trigger</span>
      </ReactifyTooltip>
    </div>
  );
}
`,
    accessibilityNotes: [
      "Tooltips provide supplementary information for an element.",
      "The component has \`role='tooltip'\` and is associated with its trigger element (implicitly through hover/focus).",
      "Tooltips should not contain essential information or interactive content; if they do, consider a Popover or Disclosure widget instead.",
      "They appear on hover and focus of the trigger element, and disappear on blur or mouse out.",
      "Ensure the trigger element itself is focusable if it's not an inherently focusable element (like a button). ReactifyTooltip adds \`tabIndex=0\` to its wrapper if the child isn't focusable.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  // Advanced
  {
    id: 'advanced-table',
    name: 'Advanced Table',
    icon: <Table2 />,
    category: 'advanced',
    demo: <ReactifyAdvancedTableDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyAdvancedTable, type ColumnDef } from '@/components/reactify/advanced-table';
import { ReactifyBadge } from '@/components/reactify/badge'; // Import custom components
import { ReactifyButton } from '@/components/reactify/button';
import { useState, useEffect, useMemo } from 'react';

// Define your data structure
interface MyDataType {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// Sample data
const sampleData: MyDataType[] = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', status: 'Active' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Pending' },
];

function MyTablePage() {
  // ... (state and useEffect logic for fetching data can be added here)
  
  // Define columns and use the 'cell' renderer for custom content
  const columns = useMemo((): ColumnDef<MyDataType>[] => [
    { key: 'id', header: 'User ID' },
    { 
      key: 'name', 
      header: 'User Name',
      // You can render any React node inside a cell
      cell: (row) => <span className="font-bold text-primary">{row.name}</span>
    },
    { key: 'email', header: 'Email Address' },
    { 
      key: 'status', 
      header: 'Status',
      // Example: Rendering a custom Badge component based on status
      cell: (row) => {
        const variantMap = {
          Active: 'success',
          Inactive: 'destructive',
          Pending: 'warning',
        };
        return (
          <ReactifyBadge variant={variantMap[row.status] as any}>
            {row.status}
          </ReactifyBadge>
        );
      }
    },
    { 
      key: 'actions', 
      header: 'Actions',
      // Example: Rendering interactive buttons
      cell: (row) => (
        <ReactifyButton 
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // Prevent onRowClick if it exists
            alert('Viewing details for ' + row.name)
          }}
        >
          View Details
        </ReactifyButton>
      ) 
    }
  ], []);

  return (
    <ReactifyAdvancedTable
      columns={columns}
      data={sampleData} // Using static data for this example
      onRowClick={(row) => alert(\`Row clicked: \${row.name}\`)}
    />
  );
}
    `,
    accessibilityNotes: [
      "Tables should use proper HTML semantics (\`<table>\`, \`<thead>\`, \`<tbody>\`, \`<th>\`, \`<td>\`).",
      "\`<th>\` elements should have a \`scope\` attribute (\`col\` or \`row\`). The component implies scope='col'.",
      "Interactive elements within the table (sorting buttons, action buttons in cells, resize handles, drag handles) must be keyboard accessible and properly labeled (e.g., using \`aria-label\` or visually hidden text).",
      "For column resizing and reordering, ensure ARIA attributes are used to announce states and provide keyboard alternatives if drag-and-drop is not accessible to all users. (Keyboard alternatives for reordering are not yet implemented in this version).",
      "Pagination controls should be clearly labeled and operable via keyboard.",
      "Loading states should be announced (e.g., \`aria-busy\`).",
      "Ensure sufficient color contrast for text and interactive elements.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'autocomplete',
    name: 'Autocomplete (Combobox)',
    icon: <Search />,
    category: 'advanced',
    demo: <ReactifyAutocompleteDemo />,
    version: '1.0.0',
    codeExample: `
import { useState, useMemo } from 'react';
import { ReactifyAutocomplete, type AutocompleteSuggestion } from '@/components/reactify/autocomplete';

// Example with simple string array
function SimpleAutocomplete() {
  const allItems = ['Apple', 'Banana', 'Cherry', 'Date'];
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<string | undefined>('');

  const suggestions = useMemo(() => 
    value ? allItems.filter(item => item.toLowerCase().includes(value.toLowerCase())) : [],
    [value]
  );

  return (
    <ReactifyAutocomplete<string>
      suggestions={suggestions}
      value={value}
      onValueChange={setValue}
      onSelect={setSelected}
      placeholder="Search for a fruit..."
    />
  );
}

// Example with object array
interface Framework extends AutocompleteSuggestion {
  id: string;
  name: string;
}

function ObjectAutocomplete() {
  const allFrameworks: Framework[] = [
    { id: 'next', name: 'Next.js' },
    { id: 'svk', name: 'SvelteKit' },
    { id: 'remix', name: 'Remix' },
  ];

  const [value, setValue] = useState('');
  const [selected, setSelected] = useState<Framework | undefined>();

  const suggestions = useMemo(() =>
    value ? allFrameworks.filter(f => f.name.toLowerCase().includes(value.toLowerCase())) : [],
    [value]
  );

  return (
    <ReactifyAutocomplete<Framework>
      suggestions={suggestions}
      value={value}
      onValueChange={setValue}
      onSelect={(item) => {
        setSelected(item);
        if (item) {
          setValue(item.name); // Set input to the display name on selection
        }
      }}
      labelKey="name" // Tell the component which key to display
      placeholder="Search frameworks..."
    />
  );
}
`,
    accessibilityNotes: [
      "The component uses `role='combobox'` on the input, and `role='listbox'` for the suggestion list.",
      "Each suggestion has `role='option'` and `aria-selected` to indicate focus.",
      "The input's `aria-expanded` attribute reflects the visibility of the suggestion list.",
      "`aria-controls` links the input to the suggestion list.",
      "`aria-activedescendant` is used to announce the currently focused suggestion to screen readers during keyboard navigation.",
      "Keyboard navigation is supported: Arrow Up/Down to navigate, Enter to select, and Escape to close.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
   {
    id: 'feature-flag-manager',
    name: 'Feature Flag Manager',
    icon: <ToggleRight />,
    category: 'advanced',
    demo: (
      <ReactifyCard>
        <ReactifyCardHeader>
          <ReactifyCardTitle>Feature Flag Management Tool</ReactifyCardTitle>
        </ReactifyCardHeader>
        <ReactifyCardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            This tool demonstrates viewing, toggling, and simulating the configuration of feature flags.
          </p>
          <ReactifyButton asChild>
            <Link href="/advanced-tools/feature-flag-manager">
              Open Feature Flag Manager
            </Link>
          </ReactifyButton>
        </ReactifyCardContent>
      </ReactifyCard>
    ),
    version: '1.0.0',
    codeExample: `
// In src/contexts/feature-flag-context.tsx (simplified example)
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  rolloutConditions: Array<{ type: string; value: any; description: string; }>;
}

// In your page/component using the context
import { useFeatureFlags } from '@/hooks/use-feature-flags';

function MyComponentUsingFlags() {
  const { featureFlags, toggleFlag, isFlagEnabled } = useFeatureFlags();
  const showNewFeature = isFlagEnabled('new-feature-id');

  return (
    <div>
      {showNewFeature && <p>The new feature is ON!</p>}
      {/* UI to list and toggle flags would use featureFlags and toggleFlag */}
    </div>
  );
}

// Ensure FeatureFlagProvider is in your layout.tsx
// <FeatureFlagProvider>
//   <YourApp />
// </FeatureFlagProvider>

// The actual dashboard UI is in:
// src/app/advanced-tools/feature-flag-manager/page.tsx
// src/app/advanced-tools/feature-flag-manager/_components/feature-flag-dashboard.tsx
`,
    accessibilityNotes: [
      "Ensure toggle switches for flags are properly labeled with \`aria-label\` or associated visible labels.",
      "The dashboard UI should be keyboard navigable.",
      "Modal dialogs for editing conditions must trap focus and be dismissible via Escape key.",
      "Clearly indicate the current status of each flag.",
      "Provide descriptive text for rollout conditions.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'form-wizard', name: 'Form Wizard', icon: <ListChecks />, category: 'advanced', demo: <ReactifyFormWizardDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifyFormWizard, type WizardStepConfig } from '@/components/reactify/form-wizard';
import { z } from 'zod'; // For schema definition
import { useState } from 'react';

const stepsConfig: WizardStepConfig[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
    ],
    schema: z.object({
      name: z.string().min(2, 'Name is too short.'),
      email: z.string().email('Invalid email.'),
    }),
  },
  {
    id: 'address',
    title: 'Address',
    fields: [
      { name: 'street', label: 'Street', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
    ],
    schema: z.object({
      street: z.string().min(5, 'Street is required.'),
      city: z.string().min(2, 'City is required.'),
    }),
  },
  { // Confirmation step
    id: 'confirmation',
    title: 'Review & Submit',
    description: 'Please review your details.',
    fields: [], // No fields, will display summary
    schema: z.object({}), // No validation for confirmation step itself
  },
];

function WizardDemo() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFinalSubmit = (data: Record<string, any>) => {
    console.log('Wizard Submitted:', data);
    setSubmittedData(data);
    alert('Form submitted! Check console.');
  };

  return (
    <div>
      {!submittedData ? (
        <ReactifyFormWizard
          steps={stepsConfig}
          onFinalSubmit={handleFinalSubmit}
          // initialData={{ personal: { name: 'Prefilled Name' } }} // Optional
        />
      ) : (
        <div>
          <h3>Submission Complete!</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          <button onClick={() => setSubmittedData(null)}>Start Over</button>
        </div>
      )}
    </div>
  );
}
`,
    accessibilityNotes: [
      "Ensure each step (\`ReactifyCardTitle\`, \`ReactifyCardDescription\`) is clearly titled.",
      "Field labels (\`<Label>\`) must be associated with their inputs.",
      "Validation errors are displayed and should be announced to screen readers (standard behavior of error messages near inputs).",
      "Navigation buttons (Previous, Next, Submit) are clear and keyboard accessible.",
      "The 'Step X of Y' indicator helps users understand their progress.",
      "The confirmation step should clearly present all entered data for review.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'keyboard-shortcut-manager',
    name: 'Shortcut Manager',
    icon: <CommandIcon />,
    category: 'advanced',
    demo: <ReactifyKeyboardShortcutManagerDemo />,
    version: '1.0.0',
    codeExample: `
import { useEffect } from 'react';
import { useKeyboardShortcuts, type Shortcut } from '@/contexts/keyboard-shortcut-context';
import { useToast } from '@/hooks/use-toast';
import { ReactifyButton } from '@/components/reactify/button'; // For manual palette trigger

function MyComponentWithShortcuts() {
  const { registerShortcut, unregisterShortcut, openPalette } = useKeyboardShortcuts();
  const { toast } = useToast();

  useEffect(() => {
    const myShortcut: Shortcut = {
      id: 'my-custom-action',
      name: 'Perform My Custom Action',
      keys: ['Control', 'Alt', 'm'], // Define for non-Mac
      macKeys: ['Meta', 'Alt', 'm'],   // Define for Mac (Cmd+Option+M)
      action: (event) => {
        event.preventDefault(); 
        toast({ title: 'Custom Action Triggered!', description: 'You pressed the magic keys!' });
      },
      group: 'My Custom Group' // Optional: for organizing in the palette
    };

    registerShortcut(myShortcut);

    // Clean up shortcuts when component unmounts
    return () => {
      unregisterShortcut(myShortcut.id);
    };
  }, [registerShortcut, unregisterShortcut, toast]);

  return (
    <div>
      <p>Try pressing Ctrl+Alt+M (or Cmd+Option+M on Mac).</p>
      <p>Press Ctrl+K (or Cmd+K) to open the shortcut palette.</p>
      <ReactifyButton onClick={openPalette} variant="outline" className="mt-2">
        Open Palette Manually
      </ReactifyButton>
    </div>
  );
}

// IMPORTANT: Ensure KeyboardShortcutProvider is an ancestor in your app layout:
// // In your src/app/layout.tsx or equivalent:
// import { KeyboardShortcutProvider } from '@/contexts/keyboard-shortcut-context';
// import { KeyboardShortcutManager } from '@/components/reactify/keyboard-shortcut-manager';
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <KeyboardShortcutProvider>
//           {/* Your app structure, e.g., Header, main content */}
//           {children}
//           <KeyboardShortcutManager /> {/* Renders the palette UI globally */}
//         </KeyboardShortcutProvider>
//       </body>
//     </html>
//   );
// }
export default MyComponentWithShortcuts;
`,
    accessibilityNotes: [
      "Ensure shortcut combinations do not conflict with common browser or assistive technology shortcuts. Test thoroughly.",
      "Provide clear, concise, and user-friendly names for each shortcut in the palette.",
      "The shortcut palette UI itself must be keyboard navigable (search input, list items, close button).",
      "Use appropriate ARIA roles (e.g., \`dialog\`, \`listbox\`, \`option\`) and states (e.g., \`aria-modal\`, \`aria-activedescendant\`) within the palette.",
      "The palette should be closeable via the Escape key.",
      "Clearly indicate modifier keys (Ctrl, Cmd, Alt, Shift) and the main action key. Use platform-conventional symbols (e.g., ⌘ for Command on Mac).",
      "Consider allowing users to customize or disable shortcuts, especially if they conflict with user-defined or assistive tech shortcuts (not implemented in this version).",
      "When a shortcut triggers an action, provide clear feedback to the user (e.g., toast, visual change).",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'multi-select',
    name: 'Multi Select',
    icon: <ListTree />,
    category: 'advanced',
    demo: <ReactifyMultiSelectDemo />,
    version: '1.0.0',
    codeExample: `
import { useState } from 'react';
import { ReactifyMultiSelect, type MultiSelectOption } from '@/components/reactify/multi-select';
import { Code } from 'lucide-react'; // Example icon

const FRAMEWORKS: MultiSelectOption[] = [
  { value: 'next.js', label: 'Next.js', icon: <Code size={16} /> },
  { value: 'sveltekit', label: 'SvelteKit', icon: <Code size={16} /> },
  { value: 'nuxt.js', label: 'Nuxt.js' }, // Can omit icon
  { value: 'remix', label: 'Remix', icon: <Code size={16} /> },
];

function MyMultiSelectComponent() {
  const [selected, setSelected] = useState<string[]>(['next.js']);

  return (
    <ReactifyMultiSelect
      options={FRAMEWORKS}
      selected={selected}
      onChange={setSelected}
      placeholder="Select frameworks..."
    />
  );
}
`,
    accessibilityNotes: [
      "The trigger button has 'aria-haspopup=\"listbox\"' and 'aria-expanded' to indicate the state of the dropdown.",
      "The popover content containing the options has 'role=\"listbox\"'.",
      "Each option has an associated 'label' and checkbox for clear selection state.",
      "The search input within the popover helps filter long lists.",
      "Ensure popover content is properly managed for focus when it opens.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'network-aware-wrapper',
    name: 'Network Aware Wrapper',
    icon: <Wifi />,
    category: 'advanced',
    demo: <ReactifyNetworkAwareDemo />,
    version: '1.0.0',
    codeExample: `
import { NetworkAwareWrapper } from '@/components/reactify/network-aware-wrapper';
import { ReactifyButton } from '@/components/reactify/button';
import { WifiOff, Wifi } from 'lucide-react';

function MyAppContent() {
  const handleRetry = () => {
    alert('Retry logic would run here! For example, re-fetch data.');
  };

  const MyOfflineBanner = (
    <div style={{ 
        position: 'fixed', bottom: '0', left: '0', right: '0',
        background: 'rgba(220, 53, 69, 0.9)', color: 'white', 
        padding: '12px', textAlign: 'center', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
    }}>
      <WifiOff size={20} />
      <span>You are currently offline. Some features might be unavailable.</span>
      <ReactifyButton 
        onClick={handleRetry} 
        variant="outline"
        size="sm"
        className="bg-white text-destructive hover:bg-gray-100 border-destructive hover:border-destructive"
      >
        Retry Action
      </ReactifyButton>
    </div>
  );

  const MyOnlineBanner = (
    <div style={{ 
        position: 'fixed', bottom: '0', left: '0', right: '0',
        background: 'rgba(25, 135, 84, 0.9)', color: 'white', 
        padding: '12px', textAlign: 'center', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
    }}>
      <Wifi size={20} />
      <span>You are back online!</span>
    </div>
  );

  return (
    <NetworkAwareWrapper
      offlineBanner={MyOfflineBanner}
      onlineBanner={MyOnlineBanner}
      showOnlineBannerDuration={4000} // Show "back online" for 4 seconds
    >
      {/* Your main app content goes here */}
      <h1>Welcome to My App</h1>
      <p>This content is wrapped and will show banners based on network state.</p>
      <p>Try toggling your network connection or using the simulation buttons in the demo.</p>
    </NetworkAwareWrapper>
  );
}

// To use the default banners (which also appear at the bottom):
// <NetworkAwareWrapper>
//   <p>Content using default banners.</p>
// </NetworkAwareWrapper>
`,
    accessibilityNotes: [
      "Network status banners should be announced by screen readers. The default banners use \`role='status'\` and \`aria-live\` attributes. Ensure custom banners also provide appropriate ARIA feedback.",
      "Content within banners, especially interactive elements like a 'Retry' button, must be keyboard accessible and clearly labeled.",
      "Ensure sufficient color contrast for text and icons within the banners.",
      "The wrapper itself does not add specific ARIA roles to the main children content, as it primarily controls the visibility of banners. The accessibility of the banners themselves is key.",
      "Test with screen readers to ensure transitions between online/offline states are clearly communicated."
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'protected-content', name: 'Protected Content', icon: <ShieldCheck />, category: 'advanced', demo: <ReactifyProtectedContentDemo />,
    version: '1.0.0',
    codeExample: `
import { ProtectedContent } from '@/components/reactify/protected-content';
import { MockAuthProvider, useMockAuth, type UserRole } from '@/contexts/mock-auth-context'; // For demo
import { Button } from '@/components/ui/button'; // For demo role switching

// --- In your page/component using ProtectedContent ---
// Ensure MockAuthProvider (or your actual AuthProvider) is an ancestor

function MySecurePage() {
  // const { currentRole, setCurrentRole } = useMockAuth(); // If you need to switch roles for testing

  return (
    <div>
      <h2>Public Area</h2>
      <p>This is visible to everyone.</p>

      <ProtectedContent requiredRole="user">
        <section>
          <h3>User Dashboard</h3>
          <p>Welcome, valued user!</p>
        </section>
      </ProtectedContent>

      <ProtectedContent requiredRole="editor" fallback={<p>Content restricted to editors.</p>}>
        <section>
          <h3>Editor Tools</h3>
          <Button>Edit Page</Button>
        </section>
      </ProtectedContent>

      <ProtectedContent requiredRole="admin">
        <section>
          <h3>Admin Panel</h3>
          <p>Full administrative controls here.</p>
        </section>
      </ProtectedContent>
      
      <ProtectedContent requiredRole={['user', 'editor']}>
        <p>This content is visible to users OR editors (and admins due to hierarchy).</p>
      </ProtectedContent>
    </div>
  );
}

// --- Example of setting up the context for the demo (usually done in layout) ---
export default function PageWithProtection() {
  return (
    <MockAuthProvider>
      <MySecurePage />
    </MockAuthProvider>
  );
}
`,
    accessibilityNotes: [
      "Ensure that when content appears or disappears dynamically based on roles, it doesn't cause layout shifts that disorient users.",
      "If significant sections of a page are hidden, consider if this impacts the overall page structure or navigation for assistive technologies. Usually, simple conditional rendering is fine.",
      "The `fallback` prop can be used to provide alternative content or an explanation if access is denied, which can be more user-friendly than just hiding content.",
      "If content appearance/disappearance is frequent or based on rapid user interaction, consider using \`aria-live\` regions on a container to announce changes, though this is often not necessary for role-based access which changes less frequently.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
  {
    id: 'smart-empty-state',
    name: 'Smart Empty State',
    icon: <Inbox />,
    category: 'advanced',
    demo: <ReactifySmartEmptyStateDemo />,
    version: '1.0.0',
    codeExample: `
import { ReactifySmartEmptyState } from '@/components/reactify/smart-empty-state';
import { ReactifyButton } from '@/components/reactify/button';
import { useState, useEffect } from 'react';
import { PlusCircle, Ghost, Loader2 } from 'lucide-react';

interface MyItem { id: string; name: string; }

function MyListComponent() {
  const [items, setItems] = useState<MyItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      // setItems([{ id: '1', name: 'Initial Item' }]); // To test with data
      setItems([]); // To test empty state
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleAddItem = () => {
    setItems(prev => [...prev, { id: \`\${prev.length + 1}\`, name: \`New Item \${prev.length + 1}\` }]);
  };

  const customLoading = (
    <div className="flex flex-col items-center p-6">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
      <p className="text-muted-foreground">Fetching your awesome data...</p>
    </div>
  );

  return (
    <ReactifySmartEmptyState
      data={items}
      isLoading={isLoading}
      // loadingStateContent={customLoading} // Optional custom loading
      emptyStateTitle="No Items Yet!"
      emptyStateDescription="It looks a bit lonely here. Why not add something?"
      emptyStateIcon={<Ghost className="h-12 w-12 text-muted-foreground/80" />}
      emptyStateActions={
        <ReactifyButton onClick={handleAddItem} leftIcon={<PlusCircle size={16} />}>
          Add Your First Item
        </ReactifyButton>
      }
    >
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id} className="p-3 border rounded-md bg-background">
            {item.name}
          </li>
        ))}
      </ul>
    </ReactifySmartEmptyState>
  );
}
    `,
    accessibilityNotes: [
      "Ensure the empty state provides clear information and guidance to the user.",
      "If the empty state includes interactive elements (like an 'Add Item' button), ensure they are keyboard accessible and properly labeled.",
      "If the transition from loading to empty or to data state is abrupt, consider using \`aria-live\` regions on a container to announce changes, though the component itself focuses on conditional rendering rather than live announcements.",
      "Default loading skeleton uses \`aria-busy\` on its container if wrapped appropriately by the parent application.",
      "Icons used in the empty state should be decorative or have appropriate ARIA labels if they convey meaning not present in text.",
    ],
    codeBlockScrollAreaClassName: "max-h-none",
  },
];


const displayCategories: Array<{ id: ComponentCategory; title: string }> = [
  { id: 'standard', title: 'Standard Components' },
  { id: 'advanced', title: 'Advanced Tools' },
];


export default function ComponentsPage() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(components[0]?.id ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  const sortedComponentsByName = useMemo(() => [...components].sort((a, b) => a.name.localeCompare(b.name)), []);

  const globallyFilteredComponents = useMemo(() =>
    sortedComponentsByName.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [sortedComponentsByName, searchTerm]);

  const activeComponentDetails = useMemo(() =>
    components.find(comp => comp.id === selectedComponentId), [selectedComponentId]);
  
  useEffect(() => {
    const isSelectedVisible = globallyFilteredComponents.some(c => c.id === selectedComponentId);
    if (globallyFilteredComponents.length > 0 && !isSelectedVisible) {
      setSelectedComponentId(globallyFilteredComponents[0].id);
    }
  }, [globallyFilteredComponents, selectedComponentId]);


  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4 flex flex-col gap-3">
            <div className="w-full flex items-center justify-between">
              <h2 className="font-headline text-lg font-semibold group-data-[collapsible=icon]:hidden mt-[70px]">Categories</h2>
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <SidebarInput
                placeholder="Search all components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-4 pt-2">
              {displayCategories.map(category => {
                const componentsInCategory = globallyFilteredComponents.filter(
                  comp => comp.category === category.id
                );
                if (componentsInCategory.length === 0 && searchTerm) {
                    return null;
                }
                return (
                  <div key={category.id} className="mb-4">
                    <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                      {category.title}
                    </h3>
                    {componentsInCategory.map((component) => (
                      <SidebarMenuItem key={component.id}>
                        <SidebarMenuButton
                          onClick={() => setSelectedComponentId(component.id)}
                          isActive={selectedComponentId === component.id}
                          tooltip={{ children: component.name, side: 'right' }}
                        >
                          {React.cloneElement(component.icon, { className: 'h-5 w-5' })}
                          <span className="group-data-[collapsible=icon]:hidden flex-1">{component.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                );
              })}
               {globallyFilteredComponents.length === 0 && searchTerm && (
                <div className="p-4 text-sm text-muted-foreground text-center group-data-[collapsible=icon]:hidden">
                  No components match your search.
                </div>
              )}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-headline font-bold">Reactify Component Showcase</h1>
              <SidebarTrigger className="md:hidden" />
            </div>
            <p className="text-muted-foreground mb-8">
              Explore our versatile collection of UI components, from standard elements to advanced tools. Each is designed for reusability, accessibility, and easy theming.
            </p>
            {activeComponentDetails ? (
              <div key={activeComponentDetails.id} className="mb-12">
                <ComponentDisplay
                  title={activeComponentDetails.name}
                  description={`Examples and usage of the Reactify ${activeComponentDetails.name} component.`}
                  codeExample={activeComponentDetails.codeExample}
                  accessibilityNotes={activeComponentDetails.accessibilityNotes}
                  codeBlockScrollAreaClassName={activeComponentDetails.codeBlockScrollAreaClassName}
                  version={activeComponentDetails.version}
                >
                  {activeComponentDetails.demo}
                </ComponentDisplay>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-10">
                {globallyFilteredComponents.length > 0 ? "Select a component from the sidebar to view its details." :
                 (searchTerm ? "No components match your search term." : "No components available to display.")
                }
              </p>
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
