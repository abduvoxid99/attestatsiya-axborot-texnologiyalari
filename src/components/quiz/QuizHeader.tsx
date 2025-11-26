import { Building2 } from "lucide-react";
import type { QuizStats } from "@/types/quiz";

interface QuizHeaderProps {
  stats: QuizStats;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-3 md:p-6 mb-3 md:mb-6">
      <div className="flex items-center justify-center gap-1.5 md:gap-3 mb-2 md:mb-6">
        <Building2 className="w-5 h-5 md:w-8 md:h-8 text-indigo-600" />
        <h1 className="text-base md:text-3xl font-bold text-indigo-600">
          BRB Attestatsiya
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg md:rounded-xl p-2 md:p-4 text-white">
          <div className="text-[10px] md:text-sm opacity-90 mb-0.5 md:mb-1">
            Jami
          </div>
          <div className="text-xl md:text-3xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg md:rounded-xl p-2 md:p-4 text-white">
          <div className="text-[10px] md:text-sm opacity-90 mb-0.5 md:mb-1">
            To'g'ri
          </div>
          <div className="text-xl md:text-3xl font-bold">{stats.correct}</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg md:rounded-xl p-2 md:p-4 text-white">
          <div className="text-[10px] md:text-sm opacity-90 mb-0.5 md:mb-1">
            Noto'g'ri
          </div>
          <div className="text-xl md:text-3xl font-bold">{stats.incorrect}</div>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg md:rounded-xl p-2 md:p-4 text-white">
          <div className="text-[10px] md:text-sm opacity-90 mb-0.5 md:mb-1">
            Natija
          </div>
          <div className="text-xl md:text-3xl font-bold">
            {stats.percentage}%
          </div>
        </div>
      </div>
    </div>
  );
};
