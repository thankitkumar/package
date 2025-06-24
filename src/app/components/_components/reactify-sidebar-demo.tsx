
'use client';
import { useState, useCallback } from 'react';
import { ReactifySidebar } from '@/components/reactify/sidebar';
import { ReactifyButton } from '@/components/reactify/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ReactifyInput } from '@/components/reactify/input';

export default function ReactifySidebarDemo() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const handleCloseLeft = useCallback(() => setIsLeftSidebarOpen(false), []);
  const handleOpenLeft = useCallback(() => setIsLeftSidebarOpen(true), []);
  const handleCloseRight = useCallback(() => setIsRightSidebarOpen(false), []);
  const handleOpenRight = useCallback(() => setIsRightSidebarOpen(true), []);

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="flex gap-4">
          <ReactifyButton onClick={handleOpenLeft}>
            Open Left Sidebar
          </ReactifyButton>
          <ReactifyButton variant="secondary" onClick={handleOpenRight}>
            Open Right Sidebar
          </ReactifyButton>
        </div>

        {/* Left Sidebar */}
        <ReactifySidebar
          isOpen={isLeftSidebarOpen}
          onClose={handleCloseLeft}
          position="left"
          title="Left Panel"
          widthClass="w-80"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This is a sidebar positioned on the left.
            </p>
            <div>
              <Label htmlFor="left-sidebar-name">Name</Label>
              <ReactifyInput id="left-sidebar-name" placeholder="Enter your name" className="mt-1" />
            </div>
            <ReactifyButton onClick={() => alert('Action from left sidebar!')} size="sm">
              Do Something
            </ReactifyButton>
             <ReactifyButton variant="outline" size="sm" onClick={handleCloseLeft}>
              Close Panel
            </ReactifyButton>
          </div>
        </ReactifySidebar>

        {/* Right Sidebar */}
        <ReactifySidebar
          isOpen={isRightSidebarOpen}
          onClose={handleCloseRight}
          position="right"
          title="Settings"
          showOverlay={false} // Example: no overlay
          widthClass="w-1/2 md:w-1/3" // Example: responsive width
        >
          <div className="space-y-4">
            <p className="text-sm">
              This sidebar is on the right and does not have an overlay.
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
             <ReactifyButton variant="destructive" size="sm" onClick={handleCloseRight}>
              Close Settings
            </ReactifyButton>
          </div>
        </ReactifySidebar>
        
        <p className="text-xs text-muted-foreground pt-4">
            Note: The demo sidebars contain simple content. You can fill them with navigation links, forms, or any other elements.
        </p>
      </CardContent>
    </Card>
  );
}
