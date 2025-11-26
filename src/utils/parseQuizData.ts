import type { QuizQuestion } from "@/types/quiz";

/**
 * Parses raw quiz JSON data where each question has multiple "Жавоб" fields
 * The first "Жавоб" is always the correct answer, others are incorrect
 */
export function parseQuizJSON(rawData: any): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Handle different JSON structures
  const questionArray = Array.isArray(rawData)
    ? rawData
    : Object.values(rawData)[0];

  if (!Array.isArray(questionArray)) {
    console.error("Invalid JSON structure");
    return [];
  }

  for (const item of questionArray) {
    // Collect all answers
    const answers: string[] = [];

    // Loop through the object to find all "Javob" keys
    for (const key in item) {
      if (key === "Javob") {
        // Could be a string or array
        if (typeof item[key] === "string") {
          answers.push(item[key]);
        } else if (Array.isArray(item[key])) {
          answers.push(...item[key]);
        }
      }
    }

    // Get unique answers (in case of duplicates)
    const uniqueAnswers = [...new Set(answers)];

    // Create question object
    const question: QuizQuestion = {
      "№": item["№"] || questions.length + 1,
      Savol: item["Savol"] || "",
      Javob: uniqueAnswers,
    };

    questions.push(question);
  }

  return questions;
}

/**
 * Validates quiz data structure
 */
export function validateQuizData(questions: QuizQuestion[]): boolean {
  if (!Array.isArray(questions) || questions.length === 0) {
    console.error("No questions found");
    return false;
  }

  for (const q of questions) {
    if (!q["Savol"] || q["Savol"].trim() === "") {
      console.error(`Question ${q["№"]} has no question text`);
      return false;
    }

    if (!Array.isArray(q["Javob"]) || q["Javob"].length < 2) {
      console.error(`Question ${q["№"]} must have at least 2 answers`);
      return false;
    }
  }

  return true;
}
