
import type { ReactNode } from 'react';
import { Package } from 'lucide-react';

export default function AuthDemoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8 flex flex-col items-center text-center">
        <Package className="h-12 w-12 text-primary mb-3" />
        <h1 className="text-3xl font-bold font-headline text-foreground">Reactify Auth</h1>
        <p className="text-muted-foreground">Showcasing reusable authentication form components.</p>
         <p className="text-xs text-muted-foreground mt-2">(Note: These are UI components only. No actual authentication is performed.)</p>
      </div>
      {children}
    </div>
  );
}
