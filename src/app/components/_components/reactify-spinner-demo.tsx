'use client';
import { ReactifySpinner } from '@/components/reactify/spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReactifySpinnerDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spinner Variants and Sizes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Variants</h3>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner variant="primary" />
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner variant="secondary" />
              <span className="text-xs text-muted-foreground">Secondary</span>
            </div>
             <div className="flex flex-col items-center gap-1">
              <ReactifySpinner variant="default" />
              <span className="text-xs text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner variant="destructive" />
              <span className="text-xs text-muted-foreground">Destructive</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner variant="success" />
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner variant="warning" />
              <span className="text-xs text-muted-foreground">Warning</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Sizes</h3>
          <div className="flex flex-wrap items-end gap-6">
             <div className="flex flex-col items-center gap-1">
              <ReactifySpinner size="sm" />
              <span className="text-xs text-muted-foreground">Small (sm)</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner size="md" />
              <span className="text-xs text-muted-foreground">Medium (md)</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReactifySpinner size="lg" />
              <span className="text-xs text-muted-foreground">Large (lg)</span>
            </div>
             <div className="flex flex-col items-center gap-1">
              <ReactifySpinner size="xl" />
              <span className="text-xs text-muted-foreground">Extra Large (xl)</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Usage in Context</h3>
          <div className="flex items-center gap-2 p-4 border rounded-md">
            <ReactifySpinner />
            <p className="text-muted-foreground">Loading user data...</p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
