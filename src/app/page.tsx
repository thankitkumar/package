import { HeroSection } from '@/components/sections/hero-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { CtaSection } from '@/components/sections/cta-section';
import { CustomFooter } from '@/components/layout/custom-footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
      <CustomFooter />
    </div>
  );
}
