
'use client';
import { ReactifySkeletonLoader } from '@/components/reactify/skeleton-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReactifySkeletonLoaderDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skeleton Loader Examples</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-3">Basic Shapes</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Text Line:</p>
              <ReactifySkeletonLoader className="h-4 w-3/4 rounded-sm" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Text Line (Shorter):</p>
              <ReactifySkeletonLoader className="h-4 w-1/2 rounded-sm" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avatar/Circle:</p>
              <ReactifySkeletonLoader className="h-12 w-12 rounded-full" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Rectangle Block:</p>
              <ReactifySkeletonLoader className="h-20 w-full rounded-md" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Card Skeleton Example</h3>
          <Card className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <ReactifySkeletonLoader className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <ReactifySkeletonLoader className="h-4 w-3/4 rounded-sm" />
                <ReactifySkeletonLoader className="h-4 w-1/2 rounded-sm" />
              </div>
            </div>
            <ReactifySkeletonLoader className="h-32 w-full rounded-md" />
            <div className="space-y-2">
                <ReactifySkeletonLoader className="h-4 w-full rounded-sm" />
                <ReactifySkeletonLoader className="h-4 w-5/6 rounded-sm" />
            </div>
          </Card>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">List Item Skeleton Example</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3 p-2 border rounded-md">
                <ReactifySkeletonLoader className="h-8 w-8 rounded-sm" />
                <div className="space-y-1.5 flex-1">
                  <ReactifySkeletonLoader className="h-3 w-4/5 rounded-sm" />
                  <ReactifySkeletonLoader className="h-3 w-3/5 rounded-sm" />
                </div>
                <ReactifySkeletonLoader className="h-6 w-12 rounded-md" />
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
