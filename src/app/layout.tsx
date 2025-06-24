
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Toaster } from "@/components/ui/toaster";
import { KeyboardShortcutProvider } from '@/contexts/keyboard-shortcut-context';
import { KeyboardShortcutManager } from '@/components/reactify/keyboard-shortcut-manager';
import { FeatureFlagProvider } from '@/contexts/feature-flag-context'; // Added

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Reactify - Universal Component Library',
  description: 'Reusable UI components for any framework, any platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', inter.variable)}>
        <FeatureFlagProvider> {/* Added FeatureFlagProvider */}
          <KeyboardShortcutProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Toaster />
            <KeyboardShortcutManager />
          </KeyboardShortcutProvider>
        </FeatureFlagProvider> {/* Closing tag */}
      </body>
    </html>
  );
}
