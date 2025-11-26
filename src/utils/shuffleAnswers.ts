import type { QuizQuestion } from "@/types/quiz";

/**
 * Shuffles the answers array and tracks which index is the correct answer
 * The first answer in the original array is always correct
 */
export function shuffleQuestionAnswers(question: QuizQuestion): QuizQuestion {
  const answers = [...question.Javob];

  // Create array of indices
  const indices = answers.map((_, index) => index);

  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Apply the shuffle to answers
  const shuffledAnswers = indices.map((oldIndex) => answers[oldIndex]);

  // Find where the correct answer (originally at index 0) ended up
  const correctAnswerIndex = indices.indexOf(0);

  return {
    ...question,
    Javob: shuffledAnswers,
    correctAnswerIndex,
  };
}

/**
 * Shuffles all questions' answers
 */
export function shuffleAllQuestionAnswers(
  questions: QuizQuestion[]
): QuizQuestion[] {
  return questions.map(shuffleQuestionAnswers);
}
