import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PackageCheck } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 text-center">
        <PackageCheck className="mx-auto h-20 w-20 text-primary mb-6" />
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-foreground">
          Build Universally with <span className="text-primary">Reactify</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          A comprehensive library of unstyled, accessible, and composable UI components for the React ecosystem, designed to work seamlessly in Next.js, Vite, Create React App, and more.
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
        <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-border">
            <Image 
                src="https://placehold.co/1200x675.png" 
                alt="Abstract UI components collage" 
                layout="fill"
                objectFit="cover"
                data-ai-hint="UI collage"
                className="transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white text-xs font-mono">#React #NextJS #Vite #WebApp #Components</div>
        </div>
      </div>
    </section>
  );
}
