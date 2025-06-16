'use server';
/**
 * @fileOverview An AI agent that suggests modifications to component parameters based on a style guide or design goal.
 *
 * - suggestComponentModifications - A function that handles the component modification suggestion process.
 * - SuggestComponentModificationsInput - The input type for the suggestComponentModifications function.
 * - SuggestComponentModificationsOutput - The return type for the suggestComponentModifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComponentModificationsInputSchema = z.object({
  componentDescription: z
    .string()
    .describe('A detailed description of the component to be modified.'),
  styleGuide: z
    .string()
    .describe('The style guide or design goal to adhere to.'),
  currentParameters: z
    .string()
    .describe('The current parameters of the component, such as color, dimension, and position, in JSON format.'),
});
export type SuggestComponentModificationsInput = z.infer<
  typeof SuggestComponentModificationsInputSchema
>;

const SuggestComponentModificationsOutputSchema = z.object({
  suggestedModifications: z
    .string()
    .describe(
      'Suggested modifications to the component parameters in JSON format.'
    ),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested modifications.'),
});
export type SuggestComponentModificationsOutput = z.infer<
  typeof SuggestComponentModificationsOutputSchema
>;

export async function suggestComponentModifications(
  input: SuggestComponentModificationsInput
): Promise<SuggestComponentModificationsOutput> {
  return suggestComponentModificationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComponentModificationsPrompt',
  input: {schema: SuggestComponentModificationsInputSchema},
  output: {schema: SuggestComponentModificationsOutputSchema},
  prompt: `You are an AI expert in UI design and component styling. Based on the provided component description, style guide, and current parameters, suggest modifications to the component parameters to better align with the style guide.

Component Description: {{{componentDescription}}}

Style Guide: {{{styleGuide}}}

Current Parameters: {{{currentParameters}}}

Consider parameters like color, dimension, and position. Provide your suggestions in JSON format, and explain your reasoning for each modification.

Ensure that the suggested modifications are practical and contribute to a more consistent and visually appealing design.
`, 
});

const suggestComponentModificationsFlow = ai.defineFlow(
  {
    name: 'suggestComponentModificationsFlow',
    inputSchema: SuggestComponentModificationsInputSchema,
    outputSchema: SuggestComponentModificationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
