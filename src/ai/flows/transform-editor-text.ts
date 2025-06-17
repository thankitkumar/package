
'use server';
/**
 * @fileOverview An AI agent that transforms text within the rich text editor.
 *
 * - transformEditorText - A function that handles text transformation.
 * - TransformEditorTextInput - The input type for the transformEditorText function.
 * - TransformEditorTextOutput - The return type for the transformEditorText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TransformEditorTextInputSchema = z.object({
  text: z.string().describe('The text content to be transformed.'),
  transformationType: z
    .enum(['summarize', 'makeFormal', 'suggestHeadline'])
    .describe(
      'The type of transformation to perform: "summarize", "makeFormal", or "suggestHeadline".'
    ),
});
export type TransformEditorTextInput = z.infer<typeof TransformEditorTextInputSchema>;

const TransformEditorTextOutputSchema = z.object({
  transformedText: z
    .string()
    .describe('The text after the specified transformation has been applied.'),
});
export type TransformEditorTextOutput = z.infer<typeof TransformEditorTextOutputSchema>;

export async function transformEditorText(
  input: TransformEditorTextInput
): Promise<TransformEditorTextOutput> {
  return transformEditorTextFlow(input);
}

const generatePrompt = (transformationType: TransformEditorTextInput['transformationType']) => {
  switch (transformationType) {
    case 'summarize':
      return 'Summarize the following text concisely:';
    case 'makeFormal':
      return 'Rephrase the following text in a more formal tone:';
    case 'suggestHeadline':
      return 'Suggest a short, compelling headline (max 5-7 words) for the following text. Output only the headline itself:';
    default:
      return 'Process the following text:'; // Fallback, should not happen with enum
  }
};

const transformEditorTextFlow = ai.defineFlow(
  {
    name: 'transformEditorTextFlow',
    inputSchema: TransformEditorTextInputSchema,
    outputSchema: TransformEditorTextOutputSchema,
  },
  async ({text, transformationType}) => {
    const systemPrompt = generatePrompt(transformationType);
    
    const llmResponse = await ai.generate({
      prompt: `${systemPrompt}\n\n---\n\n${text}`,
      config: {
        // Adjust temperature or other parameters as needed for different transformation types
        temperature: transformationType === 'suggestHeadline' ? 0.7 : 0.4, 
      }
    });

    return {transformedText: llmResponse.text.trim()};
  }
);
