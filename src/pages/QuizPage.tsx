import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Square, Home } from "lucide-react";
import { useQuiz } from "@/context/QuizContext";
import { QuizHeader } from "@/components/quiz/QuizHeader";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { ResultsCard } from "@/components/quiz/ResultsCard";
import { TotalTimer } from "@/components/quiz/TotalTimer";
import { Button } from "@/components/ui/button";
import questionsData from "@/data/questions.json";
import { shuffleAllQuestionAnswers } from "@/utils/shuffleAnswers";

interface QuizPageProps {
  category: string;
  onBack: () => void;
}

const categoryNames: Record<string, string> = {
  Hammasi_aralash: "Hammasi",
  Barchasi_aralash: "Aralash",
  Axborot_texnologiyalar_departamenti: "AT",
  Strategiya_barchaga: "Strategiya",
  Komplaens_barchaga: "Komplaens",
  Odob_axloq_barchaga: "Odob-Axloq",
  Ijro_barchaga: "Ijro",
  Yuridik_barchaga: "Yuridik",
};

export const QuizPage: React.FC<QuizPageProps> = ({ category, onBack }) => {
  const {
    state,
    initializeQuiz,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    getCurrentQuestion,
    getQuestionAnswer,
  } = useQuiz();

  const [totalMinutes, setTotalMinutes] = useState(0);

  // Function to generate questions based on category
  const generateQuestions = useCallback(() => {
    let questions: any[] = [];

    if (category === "Hammasi_aralash") {
      // All questions from all categories, completely mixed
      const allCategories = [
        "Axborot_texnologiyalar_departamenti",
        "Strategiya_barchaga",
        "Komplaens_barchaga",
        "Odob_axloq_barchaga",
        "Ijro_barchaga",
        "Yuridik_barchaga",
        "Axborot_xavfsizligi_departamenti",
      ];

      const allQuestions: any[] = [];
      allCategories.forEach((cat) => {
        const catData = questionsData[cat as keyof typeof questionsData];
        if (catData) {
          catData.forEach((q: any) => allQuestions.push(q));
        }
      });

      // Shuffle all questions randomly
      questions = allQuestions
        .sort(() => Math.random() - 0.5)
        .map((q: any) => ({
          "№": q["№"],
          Savol: q["Savol"],
          Javob: q["Javob"],
        }));
    } else if (category === "Barchasi_aralash") {
      // Special mixed category with specific distribution:
      // 33 from Axborot_texnologiyalar_departamenti
      // 5 from Axborot_xavfsizligi_departamenti
      // 3 from Komplaens_barchaga
      // 3 from Strategiya_barchaga
      // 2 from each of the other categories (Odob_axloq_barchaga, Ijro_barchaga, Yuridik_barchaga)
      // Total: 50 questions

      const selectedQuestions: any[] = [];

      // Helper function to randomly select N questions from a category
      const selectRandomQuestions = (
        categoryData: any[],
        count: number
      ): any[] => {
        if (!categoryData || categoryData.length === 0) return [];
        const shuffled = [...categoryData].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
      };

      // 33 questions from Axborot_texnologiyalar_departamenti
      const atData = questionsData.Axborot_texnologiyalar_departamenti || [];
      selectedQuestions.push(...selectRandomQuestions(atData, 33));

      // 5 questions from Axborot_xavfsizligi_departamenti
      const axData = questionsData.Axborot_xavfsizligi_departamenti || [];
      selectedQuestions.push(...selectRandomQuestions(axData, 5));

      // 3 questions from Komplaens_barchaga
      const komplaensData = questionsData.Komplaens_barchaga || [];
      selectedQuestions.push(...selectRandomQuestions(komplaensData, 3));

      // 3 questions from Strategiya_barchaga
      const strategiyaData = questionsData.Strategiya_barchaga || [];
      selectedQuestions.push(...selectRandomQuestions(strategiyaData, 3));

      // 2 questions from each of the other categories
      const otherCategories = [
        "Odob_axloq_barchaga",
        "Ijro_barchaga",
        "Yuridik_barchaga",
      ];

      otherCategories.forEach((cat) => {
        const catData = questionsData[cat as keyof typeof questionsData];
        if (catData) {
          selectedQuestions.push(...selectRandomQuestions(catData, 2));
        }
      });

      // Mix all selected questions randomly
      questions = selectedQuestions
        .sort(() => Math.random() - 0.5)
        .map((q: any) => ({
          "№": q["№"],
          Savol: q["Savol"],
          Javob: q["Javob"],
        }));
    } else {
      // Normal category
      const categoryData =
        questionsData[category as keyof typeof questionsData];

      if (!categoryData) {
        console.error(`Category ${category} not found`);
        return [];
      }

      questions = categoryData.map((q: any) => ({
        "№": q["№"],
        Savol: q["Savol"],
        Javob: q["Javob"],
      }));
    }

    // Shuffle answers for all questions
    const shuffledQuestions = shuffleAllQuestionAnswers(questions);

    return shuffledQuestions;
  }, [category]);

  useEffect(() => {
    const shuffledQuestions = generateQuestions();
    if (shuffledQuestions.length > 0) {
      initializeQuiz(shuffledQuestions);
      setTotalMinutes(45);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleTimeUp = useCallback(() => {
    // Time's up - finish the quiz
    finishQuiz();
  }, [finishQuiz]);

  const currentQuestion = getCurrentQuestion();
  const currentAnswer = getQuestionAnswer(state.currentQuestionIndex);
  const canGoNext =
    state.currentQuestionIndex < state.questions.length - 1 && currentAnswer;
  const canGoPrevious = state.currentQuestionIndex > 0;
  const categoryName = categoryNames[category] || category;

  if (state.isCompleted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <QuizHeader stats={state.stats} />
          <ResultsCard
            stats={state.stats}
            category={categoryName}
            onRestart={() => {
              const shuffledQuestions = generateQuestions();
              if (shuffledQuestions.length > 0) {
                initializeQuiz(shuffledQuestions);
              }
            }}
          />
          <div className="flex justify-center mt-4 md:mt-6">
            <Button
              onClick={onBack}
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-gray-100 text-gray-800 w-full md:w-auto"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Bosh sahifaga qaytish
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Button */}
        <div className="mb-4">
          <Button
            onClick={onBack}
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-800"
          >
            <Home className="w-4 h-4 mr-2" />
            Bosh sahifaga
          </Button>
        </div>

        <QuizHeader stats={state.stats} />

        <QuestionCard
          question={currentQuestion}
          questionNumber={state.currentQuestionIndex + 1}
          totalQuestions={state.questions.length}
          answer={currentAnswer}
          category={categoryName}
          timer={
            <TotalTimer
              totalMinutes={totalMinutes}
              isRunning={!state.isCompleted}
              onTimeUp={handleTimeUp}
            />
          }
          onSelectAnswer={answerQuestion}
        />

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-4 md:mt-6">
          <Button
            onClick={previousQuestion}
            disabled={!canGoPrevious}
            variant="secondary"
            size="lg"
            className="bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50 flex-1 sm:flex-none"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Orqaga
          </Button>

          {canGoNext && (
            <Button
              onClick={nextQuestion}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white flex-1 sm:flex-none"
            >
              Keyingi
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
            </Button>
          )}

          <Button
            onClick={finishQuiz}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white flex-1 sm:flex-none"
          >
            <Square className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
            Yakunlash
          </Button>
        </div>
      </div>
    </div>
  );
};
