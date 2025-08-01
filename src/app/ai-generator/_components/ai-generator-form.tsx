
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { CodeBlock } from '@/components/ui/code-block';

// Genkit flows have been removed. Placeholder types and functions:
type GenerateComponentVariantsInput = { componentDescription: string };
type GenerateComponentVariantsOutput = { variants: string[] };
type SuggestComponentModificationsInput = { componentDescription: string; styleGuide: string; currentParameters: string; };
type SuggestComponentModificationsOutput = { suggestedModifications: string; reasoning: string; };

const placeholderGenerateComponentVariants = async (input: GenerateComponentVariantsInput): Promise<GenerateComponentVariantsOutput> => {
  console.warn("generateComponentVariants called, but Genkit is removed. Returning placeholder data.");
  return { variants: ["Variant 1 (Genkit Removed)", "Variant 2 (Genkit Removed)"] };
};
const placeholderSuggestComponentModifications = async (input: SuggestComponentModificationsInput): Promise<SuggestComponentModificationsOutput> => {
  console.warn("suggestComponentModifications called, but Genkit is removed. Returning placeholder data.");
  return { suggestedModifications: '{ "info": "Genkit removed" }', reasoning: "Genkit removed." };
};
// End of placeholder Genkit-related code

const variantsSchema = z.object({
  componentDescriptionVariants: z.string().min(10, 'Please provide a detailed component description.'),
});

const modificationsSchema = z.object({
  componentDescriptionMod: z.string().min(10, 'Component description is required.'),
  styleGuide: z.string().min(10, 'Style guide or design goal is required.'),
  currentParameters: z.string().refine((val) => {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, 'Must be valid JSON.'),
});

type VariantsFormData = z.infer<typeof variantsSchema>;
type ModificationsFormData = z.infer<typeof modificationsSchema>;

export function AiGeneratorForm() {
  const { toast } = useToast();
  const [variantsResult, setVariantsResult] = useState<GenerateComponentVariantsOutput | null>(null);
  const [modificationsResult, setModificationsResult] = useState<SuggestComponentModificationsOutput | null>(null);
  const [isVariantsLoading, setIsVariantsLoading] = useState(false);
  const [isModificationsLoading, setIsModificationsLoading] = useState(false);

  const variantsForm = useForm<VariantsFormData>({
    resolver: zodResolver(variantsSchema),
    defaultValues: { componentDescriptionVariants: '' },
  });

  const modificationsForm = useForm<ModificationsFormData>({
    resolver: zodResolver(modificationsSchema),
    defaultValues: {
      componentDescriptionMod: '',
      styleGuide: '',
      currentParameters: '{\n  "color": "blue",\n  "fontSize": "16px",\n  "padding": "10px 20px"\n}',
    },
  });

  const onVariantsSubmit = async (data: VariantsFormData) => {
    setIsVariantsLoading(true);
    setVariantsResult(null);
    try {
      // Call placeholder function
      const result = await placeholderGenerateComponentVariants({ componentDescription: data.componentDescriptionVariants });
      setVariantsResult(result);
      toast({ title: 'Placeholder Data', description: 'Genkit removed. Displaying placeholder variant data.', variant: 'default' });
    } catch (error) {
      console.error('Error generating variants (placeholder):', error);
      toast({ title: 'Error', description: 'Failed to generate component variants (Genkit removed).', variant: 'destructive' });
    } finally {
      setIsVariantsLoading(false);
    }
  };

  const onModificationsSubmit = async (data: ModificationsFormData) => {
    setIsModificationsLoading(true);
    setModificationsResult(null);
    try {
       // Call placeholder function
      const result = await placeholderSuggestComponentModifications({
        componentDescription: data.componentDescriptionMod,
        styleGuide: data.styleGuide,
        currentParameters: data.currentParameters,
      });
      setModificationsResult(result);
      toast({ title: 'Placeholder Data', description: 'Genkit removed. Displaying placeholder modification data.', variant: 'default' });
    } catch (error) {
      console.error('Error suggesting modifications (placeholder):', error);
      toast({ title: 'Error', description: 'Failed to suggest component modifications (Genkit removed).', variant: 'destructive' });
    } finally {
      setIsModificationsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Generate Variants Form */}
      <form onSubmit={variantsForm.handleSubmit(onVariantsSubmit)} className="space-y-6">
        <h3 className="text-xl font-semibold font-headline">Generate Component Variants</h3>
        <p className="text-sm text-muted-foreground">AI functionality (Genkit) has been removed. This form will show placeholder data.</p>
        <div>
          <Label htmlFor="componentDescriptionVariants">Component Description</Label>
          <Textarea
            id="componentDescriptionVariants"
            placeholder="e.g., A primary call-to-action button for a modern e-commerce site."
            {...variantsForm.register('componentDescriptionVariants')}
            className="mt-1 min-h-[100px] text-sm md:text-base"
          />
          {variantsForm.formState.errors.componentDescriptionVariants && (
            <p className="text-sm text-destructive mt-1">{variantsForm.formState.errors.componentDescriptionVariants.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isVariantsLoading}>
          {isVariantsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate Variants (Placeholder)
        </Button>
      </form>

      {variantsResult && (
        <Card className="mt-6 bg-muted/50">
          <CardHeader>
            <CardTitle>Suggested Variants (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5">
              {variantsResult.variants.map((variant, index) => (
                <li key={index} className="text-sm">{variant}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <Separator className="my-10" />

      {/* Suggest Modifications Form */}
      <form onSubmit={modificationsForm.handleSubmit(onModificationsSubmit)} className="space-y-6">
        <h3 className="text-xl font-semibold font-headline">Suggest Component Modifications</h3>
        <p className="text-sm text-muted-foreground">AI functionality (Genkit) has been removed. This form will show placeholder data.</p>
        <div>
          <Label htmlFor="componentDescriptionMod">Component Description</Label>
          <Textarea
            id="componentDescriptionMod"
            placeholder="e.g., A user profile card displaying avatar, name, and bio."
            {...modificationsForm.register('componentDescriptionMod')}
            className="mt-1 min-h-[80px] text-sm md:text-base"
          />
          {modificationsForm.formState.errors.componentDescriptionMod && (
            <p className="text-sm text-destructive mt-1">{modificationsForm.formState.errors.componentDescriptionMod.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="styleGuide">Style Guide / Design Goal</Label>
          <Textarea
            id="styleGuide"
            placeholder="e.g., Make it look minimalist and modern, using a monochrome color palette."
            {...modificationsForm.register('styleGuide')}
            className="mt-1 min-h-[80px] text-sm md:text-base"
          />
          {modificationsForm.formState.errors.styleGuide && (
            <p className="text-sm text-destructive mt-1">{modificationsForm.formState.errors.styleGuide.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="currentParameters">Current Parameters (JSON)</Label>
          <Textarea
            id="currentParameters"
            {...modificationsForm.register('currentParameters')}
            className="mt-1 font-code min-h-[120px] text-sm md:text-base"
            placeholder='{ "color": "blue", "fontSize": "16px" }'
          />
          {modificationsForm.formState.errors.currentParameters && (
            <p className="text-sm text-destructive mt-1">{modificationsForm.formState.errors.currentParameters.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isModificationsLoading}>
          {isModificationsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Suggest Modifications (Placeholder)
        </Button>
      </form>

      {modificationsResult && (
        <Card className="mt-6 bg-muted/50">
          <CardHeader>
            <CardTitle>Suggested Modifications (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Modified Parameters (JSON):</h4>
              <CodeBlock code={modificationsResult.suggestedModifications} className="mt-1" lang="json" />
            </div>
            <div>
              <h4 className="font-semibold">Reasoning:</h4>
              <p className="text-sm mt-1 whitespace-pre-line">{modificationsResult.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
