
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/components', label: 'Components' },
  { href: '/theming', label: 'Theming' },
  { href: '/ai-generator', label: 'AI Generator' },
  { href: '/docs', label: 'Docs' },
];

export function MainNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="flex items-center flex-wrap gap-x-2 sm:gap-x-4 gap-y-1 lg:gap-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary px-1 py-0.5 sm:px-0 sm:py-0',
            isMounted && pathname === item.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
