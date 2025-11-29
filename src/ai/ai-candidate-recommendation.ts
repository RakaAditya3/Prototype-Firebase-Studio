'use server';

/**
 * @fileOverview Provides AI-powered candidate recommendations for employers based on job requirements.
 *
 * - `getCandidateRecommendations` -  A function that takes job requirements as input and returns a list of suitable candidate profiles.
 * - `CandidateRecommendationInput` - The input type for `getCandidateRecommendations` function.
 * - `CandidateRecommendationOutput` - The output type for `getCandidateRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for the input: Job Requirements
const CandidateRecommendationInputSchema = z.object({
  jobTitle: z.string().describe('The title of the job.'),
  jobDescription: z.string().describe('A detailed description of the job responsibilities and requirements.'),
  requiredSkills: z.array(z.string()).describe('An array of skills required for the job.'),
  experienceLevel: z.enum(['Entry-Level', 'Mid-Level', 'Senior-Level']).describe('The required experience level for the job.'),
  location: z.string().describe('The location of the job.'),
});

export type CandidateRecommendationInput = z.infer<typeof CandidateRecommendationInputSchema>;

// Define the schema for the output: Candidate Profiles
const CandidateProfileSchema = z.object({
  name: z.string().describe('The name of the candidate.'),
  skills: z.array(z.string()).describe('An array of skills possessed by the candidate.'),
  experience: z.string().describe('A summary of the candidate\'s work experience.'),
  matchScore: z.number().describe('A score indicating how well the candidate matches the job requirements (0-100).'),
  contactInfo: z.string().describe('The candidate\'s contact information (e.g., email, phone number).'),
});

const CandidateRecommendationOutputSchema = z.array(CandidateProfileSchema).describe('An array of candidate profiles that are suitable for the job.');

export type CandidateRecommendationOutput = z.infer<typeof CandidateRecommendationOutputSchema>;


export async function getCandidateRecommendations(input: CandidateRecommendationInput): Promise<CandidateRecommendationOutput> {
  return candidateRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'candidateRecommendationPrompt',
  input: {schema: CandidateRecommendationInputSchema},
  output: {schema: CandidateRecommendationOutputSchema},
  prompt: `You are an AI-powered recruiting assistant. Your task is to suggest suitable candidates based on the job requirements provided by the employer.

  Job Title: {{{jobTitle}}}
  Job Description: {{{jobDescription}}}
  Required Skills: {{#each requiredSkills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Experience Level: {{{experienceLevel}}}
  Location: {{{location}}}

  Based on these requirements, suggest a list of candidates with their profiles. Include their name, skills, experience, a match score (0-100), and contact information.

  Format the output as a JSON array of candidate profiles.
  `,
});

const candidateRecommendationFlow = ai.defineFlow(
  {
    name: 'candidateRecommendationFlow',
    inputSchema: CandidateRecommendationInputSchema,
    outputSchema: CandidateRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
