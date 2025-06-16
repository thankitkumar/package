import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiGeneratorForm } from './_components/ai-generator-form';
import { BrainCircuit } from 'lucide-react';

export default function AiGeneratorPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <BrainCircuit className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-foreground">AI-Powered Component Generator</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Leverage generative AI to explore component variants and get suggestions for modifications based on your design requirements.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Generate Component Ideas</CardTitle>
          <CardDescription>Describe your component and let AI assist you.</CardDescription>
        </CardHeader>
        <CardContent>
          <AiGeneratorForm />
        </CardContent>
      </Card>
      
      <Card className="max-w-3xl mx-auto shadow-xl mt-12">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">How it Works</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3">
            <p><strong>1. Generate Variants:</strong> Provide a description of a component (e.g., "a primary call-to-action button"). The AI will suggest several design variations for you to consider.</p>
            <p><strong>2. Suggest Modifications:</strong> If you have an existing component and want to align it with a specific style or goal, provide its description, current parameters (as JSON), and your design goal. The AI will suggest specific parameter changes and explain its reasoning.</p>
            <p className="text-sm">This tool utilizes advanced AI models to understand design principles and generate creative suggestions, helping you accelerate your development workflow.</p>
        </CardContent>
      </Card>
    </div>
  );
}
