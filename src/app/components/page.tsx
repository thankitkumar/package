import React from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { ComponentDisplay } from './_components/component-display';
import { Button } from '@/components/ui/button'; // Example component
import { Input } from '@/components/ui/input'; // Example component
import { Card } from '@/components/ui/card'; // Example component
import { Puzzle, LayoutDashboard, Palette, Settings, Info, SquareStack } from 'lucide-react';
import ReactifyButtonDemo from './_components/reactify-button-demo';
import ReactifyInputDemo from './_components/reactify-input-demo';
import ReactifyCardDemo from './_components/reactify-card-demo';
import ReactifyModalDemo from './_components/reactify-modal-demo';
import ReactifyDropdownDemo from './_components/reactify-dropdown-demo';

export default function ComponentsPage() {
  const components = [
    { id: 'button', name: 'Button', icon: <SquareStack />, demo: <ReactifyButtonDemo /> },
    { id: 'input', name: 'Input', icon: <InputIcon />, demo: <ReactifyInputDemo /> },
    { id: 'card', name: 'Card', icon: <CardIcon />, demo: <ReactifyCardDemo /> },
    { id: 'modal', name: 'Modal', icon: <ModalIcon />, demo: <ReactifyModalDemo /> },
    { id: 'dropdown', name: 'Dropdown', icon: <DropdownIcon />, demo: <ReactifyDropdownDemo /> },
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
                <ComponentDisplay title={component.name} description={`Examples and usage of the Reactify ${component.name} component.`}>
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

