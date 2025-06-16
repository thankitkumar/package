import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { CtaSection } from '@/components/sections/cta-section';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <footer className="py-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} Reactify. All rights reserved.
      </footer>
    </div>
  );
}
