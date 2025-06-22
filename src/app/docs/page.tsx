import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Terminal, Palette, Puzzle } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';

export default function DocsPage() {
  const installationCode = `
# Using npm
npm install @reactify/components

# Using yarn
yarn add @reactify/components
  `.trim();

  const usageCode = `
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyInput } from '@/components/reactify/input';

function MyFormComponent() {
  return (
    <form>
      <label htmlFor="name">Name:</label>
      <ReactifyInput type="text" id="name" placeholder="Enter your name" />
      <ReactifyButton variant="primary" type="submit" className="mt-4">
        Submit
      </ReactifyButton>
    </form>
  );
}

export default MyFormComponent;
  `.trim();

  const themingCode = `
:root {
  /* Primary Colors */
  --primary: 209 100% 60%; /* HSL value for Deep Sky Blue */
  --primary-foreground: 210 40% 98%;

  /* Accent Colors */
  --accent: 266 100% 46%; /* HSL value for Electric Indigo */
  --accent-foreground: 210 40% 98%;

  /* Background & Foreground */
  --background: 210 29% 95%; /* Light Gray */
  --foreground: 222.2 84% 4.9%;
  
  /* ... and more for border, input, card, etc. */
}
  `.trim();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">Installation & Usage</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Get started with Reactify and integrate beautiful, accessible components into your project.
        </p>
      </div>

      <div className="space-y-10">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Terminal className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-2xl">Installation</CardTitle>
            </div>
            <CardDescription>Follow these simple steps to add Reactify to your project.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Reactify components are designed to be easily integrated. Currently, they are part of this starter project.
              If this were an external library, you would typically install it via npm or yarn:
            </p>
            <CodeBlock code={installationCode} lang="bash" />
            <p className="text-muted-foreground">
              Since the components are included locally in <code className="font-code bg-muted px-1 py-0.5 rounded-sm">@/components/reactify</code>, you can directly import them.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Puzzle className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-2xl">Basic Usage</CardTitle>
            </div>
            <CardDescription>Learn how to import and use Reactify components in your application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Import any Reactify component into your React/Next.js files and use them like standard components:
            </p>
            <CodeBlock code={usageCode} lang="tsx" />
            <p className="text-muted-foreground">
              Each component comes with various props to customize its behavior and appearance. Check the "Components" page for detailed examples and prop lists for each component.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-2xl">Theming</CardTitle>
            </div>
            <CardDescription>Customize the look and feel of Reactify components using CSS variables.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Reactify uses CSS custom properties (variables) for styling, primarily defined in <code className="font-code bg-muted px-1 py-0.5 rounded-sm">src/app/globals.css</code>.
              You can override these variables to create custom themes.
            </p>
            <CodeBlock code={themingCode} lang="css" />
            <p className="text-muted-foreground">
              Visit the "Theming" page for an interactive demonstration of how changing these variables affects the components live.
              The theme switcher tool allows you to use hex color codes as well.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Key Principles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p><strong>Unstyled Core:</strong> Components provide structure and behavior, with minimal opinionated styling, allowing easy integration into any design system.</p>
            <p><strong>Accessibility:</strong> Built with WAI-ARIA standards in mind, ensuring components are usable by everyone, including those using assistive technologies.</p>
            <p><strong>Composability:</strong> Designed to be mixed and matched to build complex UIs.</p>
            <p><strong>Developer Experience:</strong> Clear props, good documentation (like this page!), and TypeScript support make development smoother.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
