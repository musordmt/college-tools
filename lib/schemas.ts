import { z } from "zod";

export const matchingSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const flashcardSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const quizSchema = z.object({
  question: z.string(),
  options: z
    .array(z.string())
    .length(4)
    .describe(
      "Four possible answers to the question. Only one should be correct. They should all be of equal lengths.",
    ),
  answer: z
    .enum(["A", "B", "C", "D"])
    .describe(
      "The correct answer, where A is the first option, B is the second, and so on.",
    ),
});

export type Quiz = z.infer<typeof quizSchema>;
export type Flashcard = z.infer<typeof flashcardSchema>;
export type Matching = z.infer<typeof matchingSchema>;


export const quizsSchema = z.array(quizSchema).length(4);
export const flashcardsSchema = z.array(flashcardSchema).length(4);
export const matchingsSchema = z.array(matchingSchema).length(4)
