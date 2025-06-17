
'use client';

import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger, SidebarInput } from '@/components/ui/sidebar';
import { ComponentDisplay } from './_components/component-display';
import { 
  SquareStack, TerminalSquare, LayoutGrid, Rows, ChevronDownCircle, Type as TypeIcon, PilcrowSquare, Square,
  MessageSquareWarning, BadgePercent, CheckSquare, Folders, Info, Sigma,
  PanelTop, PanelBottom, PanelLeft, UserCircle, Dot, ToggleLeft,
  SeparatorHorizontal, Gauge, BarChartBig, LineChart as LineChartIcon, ScatterChart, FileText,
  Briefcase, Heading as HeadingLucideIcon, AlignJustify, ListChecks, Wand2
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
import ReactifyBarChartDemo from './_components/charts/reactify-bar-chart-demo';
import ReactifyLineChartDemo from './_components/charts/reactify-line-chart-demo';
import ReactifyBubbleChartDemo from './_components/charts/reactify-bubble-chart-demo';
import ReactifyMarkdownEditorDemo from './_components/reactify-markdown-editor-demo';
import ReactifyRichTextEditorDemo from './_components/reactify-rich-text-editor-demo';
import ReactifySkeletonLoaderDemo from './_components/reactify-skeleton-loader-demo';
import ReactifyFormWizardDemo from './_components/reactify-form-wizard-demo';

type ComponentCategory = 'standard' | 'charts' | 'advanced';

interface ComponentDefinition {
  id: string;
  name: string;
  icon: React.ReactElement;
  category: ComponentCategory;
  demo: React.ReactElement;
  codeExample: string;
  accessibilityNotes: string[];
  codeBlockScrollAreaClassName?: string;
}

const components: ComponentDefinition[] = [
  {
    id: 'alert', name: 'Alert', icon: <MessageSquareWarning />, category: 'standard', demo: <ReactifyAlertDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'avatar', name: 'Avatar', icon: <UserCircle />, category: 'standard', demo: <ReactifyAvatarDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'badge', name: 'Badge', icon: <BadgePercent />, category: 'standard', demo: <ReactifyBadgeDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'button', name: 'Button', icon: <SquareStack />, category: 'standard', demo: <ReactifyButtonDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'card', name: 'Card', icon: <LayoutGrid />, category: 'standard', demo: <ReactifyCardDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'checkbox', name: 'Checkbox', icon: <CheckSquare />, category: 'standard', demo: <ReactifyCheckboxDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'divider', name: 'Divider', icon: <SeparatorHorizontal />, category: 'standard', demo: <ReactifyDividerDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'dropdown', name: 'Dropdown Menu', icon: <ChevronDownCircle />, category: 'standard', demo: <ReactifyDropdownDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'footer', name: 'Footer', icon: <PanelBottom />, category: 'standard', demo: <ReactifyFooterDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'header', name: 'Header', icon: <PanelTop />, category: 'standard', demo: <ReactifyHeaderDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'input', name: 'Input', icon: <TerminalSquare />, category: 'standard', demo: <ReactifyInputDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'modal', name: 'Modal', icon: <Rows />, category: 'standard', demo: <ReactifyModalDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'progress-bar', name: 'Progress Bar', icon: <Gauge />, category: 'standard', demo: <ReactifyProgressBarDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'radio-group', name: 'Radio Group', icon: <Dot />, category: 'standard', demo: <ReactifyRadioGroupDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'sidebar-component', name: 'Sidebar (Component)', icon: <PanelLeft />, category: 'standard', demo: <ReactifySidebarDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'skeleton-loader', name: 'Skeleton Loader', icon: <Square />, category: 'standard', demo: <ReactifySkeletonLoaderDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'tabs', name: 'Tabs', icon: <Folders />, category: 'standard', demo: <ReactifyTabsDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'textarea', name: 'Textarea', icon: <TypeIcon />, category: 'standard', demo: <ReactifyTextareaDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'toggle-switch', name: 'Toggle Switch', icon: <ToggleLeft />, category: 'standard', demo: <ReactifyToggleSwitchDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'tooltip', name: 'Tooltip', icon: <Info />, category: 'standard', demo: <ReactifyTooltipDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  // Charts
  {
    id: 'bar-chart', name: 'Bar Chart', icon: <BarChartBig />, category: 'charts', demo: <ReactifyBarChartDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'bubble-chart', name: 'Bubble Chart', icon: <ScatterChart />, category: 'charts', demo: <ReactifyBubbleChartDemo />,
    codeBlockScrollAreaClassName: "max-h-none", 
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'line-chart', name: 'Line Chart', icon: <LineChartIcon />, category: 'charts', demo: <ReactifyLineChartDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  // Advanced
  {
    id: 'form-wizard', name: 'Form Wizard', icon: <ListChecks />, category: 'advanced', demo: <ReactifyFormWizardDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'markdown-editor', name: 'Markdown Editor', icon: <FileText />, category: 'advanced', demo: <ReactifyMarkdownEditorDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
  {
    id: 'rich-text-editor', name: 'Rich Text Editor', icon: <PilcrowSquare />, category: 'advanced', demo: <ReactifyRichTextEditorDemo />,
    codeBlockScrollAreaClassName: "max-h-none",
    codeExample: `...`, accessibilityNotes: [`...`]
  },
].map(comp => ({ // Fill in boilerplate for example and notes if missing
  ...comp,
  codeExample: comp.codeExample || `Code example for ${comp.name}`,
  accessibilityNotes: comp.accessibilityNotes || [`Standard accessibility notes for ${comp.name}.`],
}));


const displayCategories: Array<{ id: ComponentCategory; title: string }> = [
  { id: 'standard', title: 'Standard Components' },
  { id: 'charts', title: 'Charts' },
  { id: 'advanced', title: 'Advanced Tools' },
];

export default function ComponentsPage() {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(components[0]?.id ?? '');
  const [searchTerm, setSearchTerm] = useState('');

  const activeComponentDetails = components.find(comp => comp.id === selectedComponentId);

  const sortedComponentsByName = [...components].sort((a, b) => a.name.localeCompare(b.name));
  
  const globallyFilteredComponents = sortedComponentsByName.filter(component =>
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    if (globallyFilteredComponents.length > 0 && !globallyFilteredComponents.find(comp => comp.id === selectedComponentId)) {
      setSelectedComponentId(globallyFilteredComponents[0].id);
    } else if (globallyFilteredComponents.length === 0 && components.length > 0 && selectedComponentId) {
      // If search yields no results, and a component was selected, clear selection or keep?
      // For now, if current selection is filtered out, try to select first of global filter.
      // If global filter is empty, it means nothing matches search.
    }
  }, [searchTerm, selectedComponentId, globallyFilteredComponents]);


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
                return (
                  <div key={category.id} className="mb-4">
                    <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                      {category.title}
                    </h3>
                    {componentsInCategory.length > 0 ? (
                      componentsInCategory.map((component) => (
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
                      ))
                    ) : (
                      searchTerm && (
                        <div className="px-2 py-1 text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                          No matching components in this category.
                        </div>
                      )
                    )}
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
