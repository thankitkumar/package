
'use client';
import { ReactifyHeader } from '@/components/reactify/header';
import { ReactifyButton } from '@/components/reactify/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

export default function ReactifyHeaderDemo() {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
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
        <div className="p-6 text-sm text-muted-foreground">
          <p>Content below the header.</p>
          <p>The ReactifyHeader component provides a basic structure for a site or section header. It's a block-level element that defaults to the HTML <code className="font-code bg-muted px-1 py-0.5 rounded-sm">&lt;header&gt;</code> tag but can be changed using the <code className="font-code bg-muted px-1 py-0.5 rounded-sm">as</code> prop.</p>
        </div>
      </CardContent>
    </Card>
  );
}
