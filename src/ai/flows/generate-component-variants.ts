'use server';

/**
 * @fileOverview Generates component variants based on a text description of design requirements.
 *
 * - generateComponentVariants - A function that generates component variants.
 * - GenerateComponentVariantsInput - The input type for the generateComponentVariants function.
 * - GenerateComponentVariantsOutput - The return type for the generateComponentVariants function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateComponentVariantsInputSchema = z.object({
  componentDescription: z
    .string()
    .describe('A description of the component and its desired variants.'),
});
export type GenerateComponentVariantsInput = z.infer<typeof GenerateComponentVariantsInputSchema>;

const GenerateComponentVariantsOutputSchema = z.object({
  variants: z
    .array(z.string())
    .describe('An array of suggested component variants based on the design requirements.'),
});
export type GenerateComponentVariantsOutput = z.infer<typeof GenerateComponentVariantsOutputSchema>;

export async function generateComponentVariants(
  input: GenerateComponentVariantsInput
): Promise<GenerateComponentVariantsOutput> {
  return generateComponentVariantsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComponentVariantsPrompt',
  input: {schema: GenerateComponentVariantsInputSchema},
  output: {schema: GenerateComponentVariantsOutputSchema},
  prompt: `You are a UI design expert. Based on the provided component description, suggest several component variants.

Component Description: {{{componentDescription}}}

Provide the variants as a numbered list. Each variant should be a short paragraph describing the suggested changes to the component. Focus on parameters such as color, dimension and position.

Example Output:
1.  Change the primary color to red.
2.  Increase the font size by 2 points.
3.  Move the button to the top right corner.
`,
});

const generateComponentVariantsFlow = ai.defineFlow(
  {
    name: 'generateComponentVariantsFlow',
    inputSchema: GenerateComponentVariantsInputSchema,
    outputSchema: GenerateComponentVariantsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
