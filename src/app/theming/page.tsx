
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeSwitcher } from './_components/theme-switcher';
import { ReactifyButton } from '@/components/reactify/button';
import { ReactifyInput } from '@/components/reactify/input';
import { Label } from '@/components/ui/label';
import { CodeBlock } from '@/components/ui/code-block';
import { Download, Palette } from 'lucide-react';

export default function ThemingPage() {
  const themingCode = `
/* In your globals.css or theme file */
:root {
  --primary: 209 100% 60%; /* HSL value for Deep Sky Blue */
  --primary-foreground: 210 40% 98%;

  --accent: 266 100% 46%; /* HSL value for Electric Indigo */
  --accent-foreground: 210 40% 98%;

  --background: 210 29% 95%; /* HSL value for Light Gray */
  --foreground: 222.2 84% 4.9%;
  
  /* ... and many more for secondary, muted, card, border, input, ring etc. */
}
  `.trim();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <Palette className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">Zero-Config Theming with Brand Tokens</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Instantly generate a theme by providing your brand's primary, accent, and background colors. 
          Preview live updates and download your theme tokens as JSON or SCSS.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Theme Controls</CardTitle>
            <CardDescription>Adjust your brand colors below. Foreground colors will be adapted.</CardDescription>
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
              <ReactifyButton variant="outline">Outline Button</ReactifyButton>
              <ReactifyButton 
                style={{
                  backgroundColor: 'hsl(var(--accent))', 
                  color: 'hsl(var(--accent-foreground))',
                  borderColor: 'hsl(var(--accent))'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                Accent Button
              </ReactifyButton>
            </div>
            <div className="p-6 border rounded-md bg-background">
              <Label htmlFor="theme-input-name">Name</Label>
              <ReactifyInput type="text" id="theme-input-name" placeholder="Enter your name" className="mt-1" />
              <Label htmlFor="theme-input-email" className="mt-4 block">Email (Error State)</Label>
              <ReactifyInput type="email" id="theme-input-email" placeholder="your@email.com" error className="mt-1" />
            </div>
            <Card className="p-6">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-xl">Card Component</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-card-foreground/80">This card also adapts to the theme settings, using <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--card</code> and <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--card-foreground</code> variables.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-12 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2"><Download size={24}/> How Theming Works & Token Export</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Reactify components use CSS custom properties (variables) defined in HSL format (Hue Saturation Lightness) for all colors. 
            The controls above allow you to set the base <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--primary</code>, <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--accent</code>, and <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--background</code> colors. 
            Other variables like <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--foreground</code>, <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--primary-foreground</code>, <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--secondary</code>, <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--card</code>, <code className="font-code bg-muted px-1 py-0.5 rounded-sm">--border</code>, etc., are defined in <code className="font-code bg-muted px-1 py-0.5 rounded-sm">globals.css</code> and adapt to these primary settings or have their own base values.
          </p>
          <p className="text-muted-foreground mb-4">
            You can download the currently active theme's HSL values as JSON or SCSS using the "Download" buttons in the "Theme Controls" card. This helps you integrate the customized theme into your own projects.
          </p>
          <h4 className="font-semibold mb-2">Example CSS Variables (from <code className="font-code bg-muted px-1 py-0.5 rounded-sm">globals.css</code>):</h4>
          <CodeBlock code={themingCode} lang="css" />
        </CardContent>
      </Card>
    </div>
  );
}
