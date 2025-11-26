import { Check, X, BarChart3 } from "lucide-react";
import type { QuizStats } from "@/types/quiz";
import { Button } from "@/components/ui/button";

interface ResultsCardProps {
  stats: QuizStats;
  category: string;
  onRestart: () => void;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({
  stats,
  category,
  onRestart,
}) => {
  const getResultMessage = () => {
    if (stats.percentage >= 80) return "A'LO!";
    if (stats.percentage >= 60) return "YAXSHI!";
    if (stats.percentage >= 40) return "QONIQARLI!";
    return "YANA!";
  };

  const getResultColor = () => {
    if (stats.percentage >= 80) return "text-green-600";
    if (stats.percentage >= 60) return "text-blue-600";
    if (stats.percentage >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getResultIcon = () => {
    if (stats.percentage >= 80) return "🎉"; // Party/celebration
    if (stats.percentage >= 60) return "😊"; // Happy
    if (stats.percentage >= 40) return "😐"; // Neutral
    return "😢"; // Sad
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 text-center">
      <div className="text-5xl md:text-6xl mb-4 md:mb-6">{getResultIcon()}</div>
      <h1 className="text-2xl md:text-4xl font-bold text-indigo-600 mb-4 md:mb-6">
        Test yakunlandi!
      </h1>

      <div className="bg-indigo-50 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
        <div className="text-indigo-600 font-semibold text-sm md:text-base mb-2">
          {category}
        </div>
        <div className="text-4xl md:text-6xl font-bold text-indigo-700 mb-3 md:mb-4">
          {stats.correct}/{stats.total}
        </div>
        <div className={cn("text-2xl md:text-4xl font-bold", getResultColor())}>
          {getResultMessage()}
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 mb-6">
        <div className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg">
          <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
          <span className="font-semibold">To'g'ri:</span>
          <span className="text-green-600 font-bold">{stats.correct}</span>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg">
          <X className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          <span className="font-semibold">Noto'g'ri:</span>
          <span className="text-red-600 font-bold">{stats.incorrect}</span>
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg">
          <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
          <span className="font-semibold">Natija:</span>
          <span className="text-indigo-600 font-bold">{stats.percentage}%</span>
        </div>
      </div>

      <Button
        onClick={onRestart}
        size="lg"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg w-full md:w-auto"
      >
        ↻ Qaytadan
      </Button>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
