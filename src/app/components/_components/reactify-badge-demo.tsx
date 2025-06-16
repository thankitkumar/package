
'use client';
import { ReactifyBadge } from '@/components/reactify/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactifyBadgeDemo() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">Badge Variants</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <ReactifyBadge variant="primary">Primary</ReactifyBadge>
            <ReactifyBadge variant="secondary">Secondary</ReactifyBadge>
            <ReactifyBadge variant="destructive">Destructive</ReactifyBadge>
            <ReactifyBadge variant="outline">Outline</ReactifyBadge>
            <ReactifyBadge variant="success">Success</ReactifyBadge>
            <ReactifyBadge variant="warning">Warning</ReactifyBadge>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Badge Sizes</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <ReactifyBadge variant="primary" size="sm">Small</ReactifyBadge>
            <ReactifyBadge variant="secondary" size="md">Medium (Default)</ReactifyBadge>
            <ReactifyBadge variant="success" size="lg">Large</ReactifyBadge>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Usage Example</h3>
          <p className="text-muted-foreground">
            You have <ReactifyBadge variant="primary" size="sm">3</ReactifyBadge> new messages. 
            The task status is <ReactifyBadge variant="success" size="sm">Completed</ReactifyBadge>.
            Warning: <ReactifyBadge variant="destructive" size="sm">Action Required</ReactifyBadge>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
