import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitcher } from './_components/theme-switcher';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label';
import { CodeBlock } from '@/components/ui/code-block';

export default function ThemingPage() {
  const themingCode = `
:root {
  --primary: 209 100% 60%; /* Deep Sky Blue */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --accent: 266 100% 46%; /* Electric Indigo */
  --accent-foreground: 210 40% 98%;
  --background: 210 29% 95%; /* Light Gray */
  --foreground: 222.2 84% 4.9%;
  /* ... and more ... */
}
  `.trim();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-foreground">Flexible Theming System</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Customize the appearance of Reactify components using CSS variables. Experiment with colors below to see live updates.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Theme Controls</CardTitle>
            <CardDescription>Adjust CSS variables to change the theme.</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSwitcher />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Live Preview</CardTitle>
            <CardDescription>Components update in real-time as you change theme variables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 border rounded-md bg-background flex flex-wrap gap-4 items-center justify-center">
              <ReactifyButton variant="primary">Primary Button</ReactifyButton>
              <ReactifyButton variant="secondary">Secondary Button</ReactifyButton>
              <ReactifyButton variant="accent" style={{backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))'}}>Accent Button</ReactifyButton>
            </div>
            <div className="p-6 border rounded-md bg-background">
              <Label htmlFor="theme-input-name">Name</Label>
              <ReactifyInput type="text" id="theme-input-name" placeholder="Enter your name" className="mt-1" />
              <Label htmlFor="theme-input-email" className="mt-4 block">Email (Error)</Label>
              <ReactifyInput type="email" id="theme-input-email" placeholder="your@email.com" error className="mt-1" />
            </div>
            <div className="p-6 border rounded-md bg-card">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Card Component</h3>
              <p className="text-sm text-card-foreground/80">This card also adapts to the theme settings.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">How Theming Works</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Reactify components use CSS custom properties (variables) for styling. You can override these variables in your global stylesheet or on specific component instances to create custom themes.
          </p>
          <h4 className="font-semibold mb-2">Example CSS Variables:</h4>
          <CodeBlock code={themingCode} lang="css" />
          <p className="text-muted-foreground mt-4">
            By changing these HSL values, you can globally alter the look and feel of all Reactify components.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
