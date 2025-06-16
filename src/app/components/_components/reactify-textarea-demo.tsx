
'use client';
import { ReactifyTextarea } from '@/components/reactify/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function ReactifyTextareaDemo() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Standard Textarea</h3>
          <Label htmlFor="demo-comment" className="mb-1 block">Your Comment</Label>
          <ReactifyTextarea id="demo-comment" placeholder="Type your comment here..." />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Textarea with More Rows</h3>
          <Label htmlFor="demo-bio" className="mb-1 block">Biography</Label>
          <ReactifyTextarea id="demo-bio" placeholder="Tell us about yourself." rows={6} />
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Textarea with Error State</h3>
          <Label htmlFor="demo-feedback-error" className="mb-1 block">Feedback</Label>
          <ReactifyTextarea id="demo-feedback-error" placeholder="Provide feedback..." error />
          <p className="text-sm text-destructive mt-1">This field is required.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Disabled Textarea</h3>
          <Label htmlFor="demo-notes-disabled" className="mb-1 block">Notes (Read-only)</Label>
          <ReactifyTextarea id="demo-notes-disabled" defaultValue="These are some pre-filled notes that cannot be edited." disabled />
        </div>
      </CardContent>
    </Card>
  );
}
