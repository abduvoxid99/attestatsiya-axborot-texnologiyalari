import { useState } from "react";
import { QuizProvider } from "@/context/QuizContext";
import { QuizPage } from "@/pages/QuizPage";
import { CategorySelection } from "@/pages/CategorySelection";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (!selectedCategory) {
    return <CategorySelection onSelectCategory={handleSelectCategory} />;
  }

  return (
    <QuizProvider>
      <QuizPage category={selectedCategory} onBack={handleBackToCategories} />
    </QuizProvider>
  );
}

export default App;
