
'use client';
import { ReactifyFooter } from '@/components/reactify/footer';
import { Card, CardContent } from '@/components/ui/card';

export default function ReactifyFooterDemo() {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
         <div className="p-6 text-sm text-muted-foreground h-24">
          <p>Content above the footer.</p>
           <p>The ReactifyFooter component provides a basic structure for a site or section footer. It defaults to the HTML <code className="font-code bg-muted px-1 py-0.5 rounded-sm">&lt;footer&gt;</code> tag.</p>
        </div>
        <ReactifyFooter />
      </CardContent>
    </Card>
  );
}

