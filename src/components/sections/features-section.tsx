import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Puzzle, Palette, Accessibility, Smartphone } from 'lucide-react'; // BrainCircuit removed

const features = [
  {
    icon: <Puzzle className="h-10 w-10 text-primary mb-4" />,
    title: 'Core Components',
    description: 'Reusable, unstyled UI blocks like buttons, inputs, modals, and dropdowns, built for accessibility and composition.',
  },
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: 'Framework Adapters',
    description: 'Seamless integration with React, Vue, Angular, and Next.js through dedicated wrappers and adapters.',
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
    description: 'Develop once, deploy anywhere. Code works across Web, Mobile, and Desktop environments.',
  },
  // Removed AI Component Generator feature
  // {
  //   icon: <BrainCircuit className="h-10 w-10 text-primary mb-4" />,
  //   title: 'AI Component Generator',
  //   description: 'Leverage AI to suggest component variants and modifications based on your design requirements.',
  // },
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
