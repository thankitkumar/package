
import Link from 'next/link';
import { Package } from 'lucide-react';
import { MainNav } from './main-nav';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-screen-2xl items-center"> {/* Adjusted height for tagline */}
        <Link href="/" className="mr-6 flex flex-col items-start"> {/* Changed to flex-col and items-start */}
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block text-xl">Reactify</span>
          </div>
          <span className="text-xs italic ml-[calc(1.5rem+0.5rem)] -mt-0.5 text-muted-foreground"> {/* Base style for tagline */}
            A product of <span className="text-destructive font-semibold">Molecular connections</span>
          </span>
        </Link>
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild variant="ghost">
            <a href="https://github.com/your-repo/reactify" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
