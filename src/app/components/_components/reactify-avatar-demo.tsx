
'use client';
import { ReactifyAvatar } from '@/components/reactify/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { User, Image as ImageIcon } from 'lucide-react';

export default function ReactifyAvatarDemo() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-8">
        <div>
          <h3 className="font-semibold text-lg mb-4">Avatar Sizes & Shapes</h3>
          <div className="flex flex-wrap items-center gap-6">
            <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User A" size="sm" data-ai-hint="person face" />
            <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User B" size="md" data-ai-hint="profile picture" />
            <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User C" size="lg" shape="square" data-ai-hint="abstract avatar" />
            <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User D" size="xl" shape="square" data-ai-hint="geometric pattern" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Avatar Fallbacks (No Src)</h3>
          <div className="flex flex-wrap items-center gap-6">
            <ReactifyAvatar alt="Jane Doe" size="md" />
            <ReactifyAvatar alt="JD" size="md" fallback="JD" />
            <ReactifyAvatar alt="Anonymous" size="lg" fallback={<User className="h-8 w-8" />} />
            <ReactifyAvatar alt="" size="xl" shape="square" fallback={<ImageIcon className="h-10 w-10 text-muted-foreground/50"/>} />
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4">Avatar Group Example (Conceptual)</h3>
          <div className="flex -space-x-4">
            <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User 1" size="md" className="border-2 border-background" data-ai-hint="employee photo"/>
            <ReactifyAvatar src="https://placehold.co/100x100.png" alt="User 2" size="md" className="border-2 border-background" data-ai-hint="team member"/>
            <ReactifyAvatar alt="Lily Evans" size="md" className="border-2 border-background"/>
            <ReactifyAvatar fallback="+3" size="md" className="border-2 border-background !bg-primary !text-primary-foreground" />
          </div>
           <p className="text-xs text-muted-foreground mt-2">Note: Group styles like negative margin and border are applied via Tailwind classes.</p>
        </div>
      </CardContent>
    </Card>
  );
}
