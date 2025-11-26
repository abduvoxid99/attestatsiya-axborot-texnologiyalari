export interface QuizQuestion {
  "№": number;
  "Savol": string;
  "Javob": string[];
  "correctAnswerIndex"?: number; // Track the correct answer after shuffling
}

export interface QuizAnswer {
  questionIndex: number;
  selectedAnswerIndex: number;
  isCorrect: boolean;
}

export interface QuizStats {
  total: number;
  correct: number;
  incorrect: number;
  percentage: number;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  isCompleted: boolean;
  stats: QuizStats;
}

