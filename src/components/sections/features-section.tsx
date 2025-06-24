
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Puzzle, Palette, Accessibility, Smartphone, Layers } from 'lucide-react';

const features = [
  {
    icon: <Puzzle className="h-10 w-10 text-primary mb-4" />,
    title: 'Core Components',
    description: 'Reusable, unstyled UI blocks like buttons, inputs, modals, and dropdowns, built for accessibility and composition.',
  },
  {
    icon: <Layers className="h-10 w-10 text-primary mb-4" />,
    title: 'React Ecosystem Ready',
    description: 'Works seamlessly in any React environment, including Next.js, Vite, and Create React App.',
  },
  {
    icon: <Palette className="h-10 w-10 text-primary mb-4" />,
    title: 'Flexible Theming',
    description: 'Customize component appearance easily with CSS variables and a powerful, intuitive theming system.',
  },
  {
    icon: <Accessibility className="h-10 w-10 text-primary mb-4" />,
    title: 'Accessibility First',
    description: 'All components meet WCAG standards, ensuring ARIA attributes and full keyboard navigation support.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary mb-4" />,
    title: 'Platform Agnostic',
    description: 'Designed for the web, components can be used in any web-based platform, including mobile web and desktop (Electron).',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12 text-foreground">
          Why Choose <span className="text-primary">Reactify</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 bg-card">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="font-headline text-2xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
