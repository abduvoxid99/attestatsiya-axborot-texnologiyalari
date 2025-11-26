import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { QuizQuestion, QuizAnswer, QuizState, QuizStats } from "@/types/quiz";

interface QuizContextType {
  state: QuizState;
  initializeQuiz: (questions: QuizQuestion[]) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => void;
  restartQuiz: () => void;
  getCurrentQuestion: () => QuizQuestion | null;
  getQuestionAnswer: (questionIndex: number) => QuizAnswer | undefined;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const calculateStats = (
  answers: QuizAnswer[],
  totalQuestions: number
): QuizStats => {
  const correct = answers.filter((a) => a.isCorrect).length;
  const incorrect = answers.filter((a) => !a.isCorrect).length;
  const percentage =
    totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

  return {
    total: totalQuestions,
    correct,
    incorrect,
    percentage,
  };
};

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    isCompleted: false,
    stats: { total: 0, correct: 0, incorrect: 0, percentage: 0 },
  });

  const initializeQuiz = (questions: QuizQuestion[]) => {
    setState({
      questions,
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
      stats: { total: questions.length, correct: 0, incorrect: 0, percentage: 0 },
    });
  };

  const answerQuestion = (answerIndex: number) => {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (!currentQuestion) return;

    // Check if the selected answer is the correct one
    const correctIndex = currentQuestion.correctAnswerIndex ?? 0;
    const isCorrect = answerIndex === correctIndex && answerIndex >= 0;
    const existingAnswerIndex = state.answers.findIndex(
      (a) => a.questionIndex === state.currentQuestionIndex
    );

    let newAnswers: QuizAnswer[];
    if (existingAnswerIndex >= 0) {
      newAnswers = [...state.answers];
      newAnswers[existingAnswerIndex] = {
        questionIndex: state.currentQuestionIndex,
        selectedAnswerIndex: answerIndex,
        isCorrect,
      };
    } else {
      newAnswers = [
        ...state.answers,
        {
          questionIndex: state.currentQuestionIndex,
          selectedAnswerIndex: answerIndex,
          isCorrect,
        },
      ];
    }

    setState({
      ...state,
      answers: newAnswers,
      stats: calculateStats(newAnswers, state.questions.length),
    });
  };

  const nextQuestion = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      });
    }
  };

  const previousQuestion = () => {
    if (state.currentQuestionIndex > 0) {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      });
    }
  };

  const finishQuiz = () => {
    setState({
      ...state,
      isCompleted: true,
    });
  };

  const restartQuiz = () => {
    setState({
      ...state,
      currentQuestionIndex: 0,
      answers: [],
      isCompleted: false,
      stats: { total: state.questions.length, correct: 0, incorrect: 0, percentage: 0 },
    });
  };

  const getCurrentQuestion = (): QuizQuestion | null => {
    return state.questions[state.currentQuestionIndex] || null;
  };

  const getQuestionAnswer = (questionIndex: number): QuizAnswer | undefined => {
    return state.answers.find((a) => a.questionIndex === questionIndex);
  };

  return (
    <QuizContext.Provider
      value={{
        state,
        initializeQuiz,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        finishQuiz,
        restartQuiz,
        getCurrentQuestion,
        getQuestionAnswer,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within QuizProvider");
  }
  return context;
};

