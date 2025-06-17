
'use client';

import { ReactifyButton } from '@/components/reactify/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ReactifyToasterDemo() {
  const { toast } = useToast();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Toaster Demo</CardTitle>
        <CardDescription>
          Click the buttons below to trigger different types of toasts.
          The Toaster component is globally available (already in your root layout).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <ReactifyButton
            onClick={() => {
              toast({
                title: 'Scheduled: Catch up',
                description: 'Friday, February 10, 2023 at 5:57 PM',
              });
            }}
          >
            Show Default Toast
          </ReactifyButton>

          <ReactifyButton
            variant="destructive"
            onClick={() => {
              toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.',
              });
            }}
          >
            Show Destructive Toast
          </ReactifyButton>

          <ReactifyButton
            variant="outline"
            onClick={() => {
              toast({
                title: 'Update Complete',
                description: 'Your profile has been successfully updated.',
                action: (
                  <ToastAction 
                    altText="Undo update" 
                    onClick={() => console.log('Undo action clicked from toast!')}
                  >
                    Undo
                  </ToastAction>
                ),
              });
            }}
          >
            Show Toast with Action
          </ReactifyButton>
        </div>
         <p className="text-xs text-muted-foreground pt-4">
            Note: The Toaster component itself is rendered in the root layout. These buttons simply call the <code className="font-code bg-muted px-1 rounded-sm">toast()</code> function provided by the <code className="font-code bg-muted px-1 rounded-sm">useToast</code> hook.
            ShadCN's Toast system uses <code className="font-code bg-muted px-1 rounded-sm">@radix-ui/react-toast</code> primitives.
        </p>
      </CardContent>
    </Card>
  );
}
