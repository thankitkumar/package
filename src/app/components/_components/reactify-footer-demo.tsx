
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
        <ReactifyFooter>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
          <div className="mt-1">
            <a href="#" className="text-primary hover:underline text-xs">Privacy Policy</a>
            <span className="mx-1 text-xs">|</span>
            <a href="#" className="text-primary hover:underline text-xs">Terms of Service</a>
          </div>
        </ReactifyFooter>
      </CardContent>
    </Card>
  );
}
