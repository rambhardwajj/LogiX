export type ProblemDB = {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD"; // assuming your `difficultyEnum()` has these values
  tags: string[];
  demo: boolean;
  createdBy: string;
  editorial?: Record<string, any>; // JSONB field
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  hints?: string[];
  codeSnippets: {
    language: string;
    snippet: string;
  }[];
  referenceSolutions: {
    language: string;
    solution: string;
  }[];
  testcases: {
    input: string;
    output: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
