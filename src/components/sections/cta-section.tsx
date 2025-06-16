import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-accent">
      <div className="container mx-auto px-4 text-center">
        <Rocket className="mx-auto h-16 w-16 text-primary-foreground mb-6" />
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 text-primary-foreground">
          Ready to Elevate Your UI Development?
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          Join thousands of developers building stunning, accessible applications faster than ever before with Reactify.
        </p>
        <Button asChild size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <Link href="/components">
            Get Started Now
          </Link>
        </Button>
      </div>
    </section>
  );
}
