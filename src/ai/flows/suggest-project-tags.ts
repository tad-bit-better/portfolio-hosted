// src/ai/flows/suggest-project-tags.ts
'use server';

/**
 * @fileOverview AI-powered tool that analyzes project descriptions and automatically suggests relevant tags or keywords.
 *
 * - suggestProjectTags - A function that handles the project tag suggestion process.
 * - SuggestProjectTagsInput - The input type for the suggestProjectTags function.
 * - SuggestProjectTagsOutput - The return type for the suggestProjectTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectTagsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The description of the project to analyze.'),
});
export type SuggestProjectTagsInput = z.infer<typeof SuggestProjectTagsInputSchema>;

const SuggestProjectTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of suggested tags or keywords for the project.'),
});
export type SuggestProjectTagsOutput = z.infer<typeof SuggestProjectTagsOutputSchema>;

export async function suggestProjectTags(input: SuggestProjectTagsInput): Promise<SuggestProjectTagsOutput> {
  return suggestProjectTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectTagsPrompt',
  input: {schema: SuggestProjectTagsInputSchema},
  output: {schema: SuggestProjectTagsOutputSchema},
  prompt: `You are an expert in identifying relevant tags and keywords for project descriptions.

  Analyze the following project description and suggest an array of tags or keywords that would be relevant for categorizing and improving the discoverability of the project.
  Return the tags as a JSON array.

  Project Description: {{{projectDescription}}}`,
});

const suggestProjectTagsFlow = ai.defineFlow(
  {
    name: 'suggestProjectTagsFlow',
    inputSchema: SuggestProjectTagsInputSchema,
    outputSchema: SuggestProjectTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
