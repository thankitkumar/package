'use client'; // This component now needs client-side hooks

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PackageCheck, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Abstracted component for the collage
const AnimatedUiCollage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Start animations after component mounts
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardBase = "absolute rounded-lg bg-card shadow-lg border border-border/20 p-4 transform transition-all duration-500 ease-out";
  const itemBase = "absolute rounded-md bg-card shadow-md border border-border/20 transform transition-all duration-500 ease-out";
  const animationClass = isMounted ? "opacity-100 translate-y-0 scale-100" : "opacity-0 scale-95";

  return (
    <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-border bg-slate-50 dark:bg-slate-800/50">
      {/* Main Card */}
      <div className={cn(
        cardBase,
        "w-3/5 top-8 left-8 space-y-3",
        animationClass,
        isMounted ? "translate-y-0" : "-translate-y-8"
      )} style={{ transitionDelay: '100ms' }}>
        <div className="h-5 w-1/2 bg-muted-foreground/20 rounded-md"></div>
        <div className="space-y-1.5">
          <div className="h-3 w-full bg-muted-foreground/10 rounded-md"></div>
          <div className="h-3 w-5/6 bg-muted-foreground/10 rounded-md"></div>
          <div className="h-3 w-3/4 bg-muted-foreground/10 rounded-md"></div>
        </div>
      </div>

      {/* Primary Button */}
      <div className={cn(
        itemBase,
        "flex items-center justify-center h-12 w-32 bg-primary text-primary-foreground font-semibold bottom-12 left-1/2 -translate-x-1/2 hover:scale-105",
        animationClass,
        isMounted ? "translate-y-0" : "translate-y-8"
      )} style={{ transitionDelay: '400ms' }}>
        Get Started
      </div>

      {/* Avatar */}
       <div className={cn(
        itemBase,
        "h-16 w-16 rounded-full bg-secondary bottom-8 left-8 flex items-center justify-center",
        animationClass
      )} style={{ transitionDelay: '300ms' }}>
         <Heart className="h-6 w-6 text-secondary-foreground/70" />
      </div>

       {/* Toggle Switch */}
       <div className={cn(
        itemBase,
        "w-20 h-10 bg-muted flex items-center p-1.5 rounded-full top-12 right-12",
        animationClass,
        isMounted ? "translate-x-0" : "translate-x-8"
       )} style={{ transitionDelay: '200ms' }}>
        <div className="h-7 w-7 rounded-full bg-card shadow-inner"></div>
      </div>
      
      {/* Small notification card */}
      <div className={cn(
        cardBase,
        "w-1/3 top-32 right-8 flex items-center gap-3 p-3",
        animationClass,
        isMounted ? "translate-x-0" : "translate-x-8"
      )} style={{ transitionDelay: '500ms' }}>
        <div className="h-8 w-8 rounded-full bg-accent"></div>
        <div className="flex-1 space-y-1">
          <div className="h-2.5 w-full rounded-sm bg-accent/30"></div>
          <div className="h-2.5 w-2/3 rounded-sm bg-accent/30"></div>
        </div>
      </div>

      {/* NEW: Input Field element */}
      <div className={cn(
        itemBase,
        "w-2/5 h-10 top-48 left-8 bg-muted p-2 flex items-center",
        animationClass,
        isMounted ? "translate-y-0" : "translate-y-8"
      )} style={{ transitionDelay: '600ms' }}>
        <div className="h-3 w-full bg-muted-foreground/10 rounded-sm"></div>
      </div>

      {/* NEW: Chart element */}
      <div className={cn(
        itemBase,
        "w-1/4 h-20 bottom-8 right-8 p-2",
        animationClass,
        isMounted ? "translate-x-0" : "translate-x-8"
      )} style={{ transitionDelay: '700ms' }}>
        <div className="flex items-end justify-between h-full w-full">
            <div className="w-1/4 h-1/2 bg-primary/30 rounded-t-sm"></div>
            <div className="w-1/4 h-3/4 bg-primary/30 rounded-t-sm"></div>
            <div className="w-1/4 h-1/3 bg-primary/30 rounded-t-sm"></div>
            <div className="w-1/4 h-1/2 bg-primary/30 rounded-t-sm"></div>
        </div>
      </div>
    </div>
  );
};


export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <PackageCheck className="mx-auto h-20 w-20 text-primary mb-6" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-foreground">
          Build Universally with <span className="text-primary">Reactify</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          A comprehensive library of unstyled, accessible, and composable UI components for any React-based project, designed to work seamlessly in Next.js, Vite, Create React App, and more.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
            <Link href="/components">
              Explore Components <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          {/* Removed AI Component Generator Button
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/50 transition-shadow duration-300">
            <Link href="/ai-generator">
              AI Component Generator
            </Link>
          </Button>
          */}
        </div>
        <AnimatedUiCollage />
      </div>
    </section>
  );
}
