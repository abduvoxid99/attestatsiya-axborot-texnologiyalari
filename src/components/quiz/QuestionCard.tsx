import { Check, X } from "lucide-react";
import type { QuizQuestion, QuizAnswer } from "@/types/quiz";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  answer?: QuizAnswer;
  category: string;
  timer?: ReactNode;
  onSelectAnswer: (answerIndex: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  answer,
  category,
  timer,
  onSelectAnswer,
}) => {
  const correctAnswerIndex = question.correctAnswerIndex ?? 0;

  // Capitalize first letter of text
  const capitalizeFirst = (text: string) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  // Get letter label (A, B, C, D) for answer option
  const getAnswerLabel = (index: number): string => {
    return String.fromCharCode(65 + index); // 65 is 'A' in ASCII
  };

  const getAnswerClassName = (index: number) => {
    if (!answer) return "bg-white hover:bg-gray-50 border-gray-200";

    if (answer.selectedAnswerIndex === index) {
      return answer.isCorrect
        ? "bg-green-50 border-green-400 border-2"
        : "bg-red-50 border-red-400 border-2";
    }

    // Show the correct answer in green after answering incorrectly
    if (index === correctAnswerIndex) {
      return "bg-green-50 border-green-400 border-2";
    }

    return "bg-white border-gray-200";
  };

  const getAnswerBadge = (index: number) => {
    if (!answer) return null;

    if (answer.selectedAnswerIndex === index) {
      return answer.isCorrect ? (
        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
          <Check className="w-4 h-4" /> To'g'ri
        </span>
      ) : (
        <span className="flex items-center gap-1 text-red-600 font-semibold text-sm">
          <X className="w-4 h-4" /> Noto'g'ri
        </span>
      );
    }

    // Show correct answer badge after user answered incorrectly
    if (
      index === correctAnswerIndex &&
      answer.selectedAnswerIndex !== correctAnswerIndex
    ) {
      return (
        <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
          <Check className="w-4 h-4" /> To'g'ri
        </span>
      );
    }

    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4 mb-4 md:mb-6">
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base">
          Savol {questionNumber} / {totalQuestions}
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-semibold text-sm md:text-base">
          {category}
        </div>
        {timer && <div className="w-full sm:w-auto">{timer}</div>}
      </div>

      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 leading-relaxed">
        {question["Savol"]}
      </h2>

      <div className="space-y-3 md:space-y-4">
        {question["Javob"].map((answerText, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            disabled={!!answer}
            className={cn(
              "w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-200",
              "flex items-center justify-between gap-2 md:gap-4",
              getAnswerClassName(index),
              !answer && "cursor-pointer active:scale-[0.98]"
            )}
          >
            <div className="flex items-start gap-3 md:gap-4 flex-1">
              <span className="shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm md:text-base flex items-center justify-center">
                {getAnswerLabel(index)}
              </span>
              <span className="text-gray-800 flex-1 text-sm md:text-base">
                {capitalizeFirst(answerText)}
              </span>
            </div>
            {getAnswerBadge(index)}
          </button>
        ))}
      </div>
    </div>
  );
};
