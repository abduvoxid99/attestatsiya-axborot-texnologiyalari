import { Building2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategorySelectionProps {
  onSelectCategory: (category: string) => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  onSelectCategory,
}) => {
  const categories = [
    // {
    //   id: "Hammasi_aralash",
    //   title: "Hammasi",
    //   subtitle: "Barcha bo'limlardan aralash savollar",
    //   icon: Database,
    //   color: "from-slate-600 to-slate-800",
    //   questionCount: 255,
    // },
    {
      id: "Barchasi_aralash",
      title: "Axborot texnologiyalari departamenti",
      subtitle: "",
      icon: Layers,
      color: "from-red-500 to-pink-600",
      questionCount: 50,
    },
    // {
    //   id: "Axborot_texnologiyalar_departamenti",
    //   title: "AT",
    //   subtitle: "Axborot texnologiyalari departamenti",
    //   icon: Computer,
    //   color: "from-cyan-500 to-blue-600",
    //   questionCount: 150,
    // },
    // {
    //   id: "Strategiya_barchaga",
    //   title: "Strategiya",
    //   subtitle: "Bankimiz Strategiyasi bo'yicha",
    //   icon: BookOpen,
    //   color: "from-blue-500 to-indigo-600",
    //   questionCount: 29,
    // },
    // {
    //   id: "Komplaens_barchaga",
    //   title: "Komplaens",
    //   subtitle: "Ichki nazorat va Korrupsiyaga qarshi kurashish",
    //   icon: Shield,
    //   color: "from-green-500 to-emerald-600",
    //   questionCount: 18,
    // },
    // {
    //   id: "Odob_axloq_barchaga",
    //   title: "Odob-Axloq",
    //   subtitle: "Xizmat odob-axloqi va professional etika",
    //   icon: Award,
    //   color: "from-pink-500 to-rose-600",
    //   questionCount: 15,
    // },
    // {
    //   id: "Ijro_barchaga",
    //   title: "Ijro",
    //   subtitle: "Ijro intizomi va boshqaruv faoliyati",
    //   icon: Briefcase,
    //   color: "from-amber-500 to-orange-600",
    //   questionCount: 30,
    // },
    // {
    //   id: "Yuridik_barchaga",
    //   title: "Yuridik",
    //   subtitle: "Huquqiy asoslar va qonunchilik",
    //   icon: Scale,
    //   color: "from-purple-500 to-violet-600",
    //   questionCount: 13,
    // },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Building2 className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-indigo-600">
              BRB Attestatsiya
            </h1>
          </div>
          <p className="text-gray-600 text-sm md:text-lg">
            BRB Attestatsiya - Interaktiv Test Platformasi
          </p>
        </div>

        {/* Category Cards */}
        <div className="flex justify-center  gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] max-w-[400px]"
              >
                <div
                  className={`bg-linear-to-br ${category.color} p-6 md:p-8 text-white`}
                >
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <Icon className="w-12 h-12 md:w-16 md:h-16" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
                    {category.title}
                  </h2>
                  <p className="text-center text-white/90 text-xs md:text-sm">
                    {category.subtitle}
                  </p>
                </div>

                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
                    <div className="bg-gray-100 rounded-full px-3 py-1.5 md:px-4 md:py-2">
                      <span className="text-gray-700 font-semibold text-sm md:text-base">
                        {category.questionCount} ta savol
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => onSelectCategory(category.id)}
                    size="lg"
                    className={`w-full bg-linear-to-r ${category.color} hover:opacity-90 text-white text-base md:text-lg py-5 md:py-6`}
                  >
                    Testni boshlash
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
