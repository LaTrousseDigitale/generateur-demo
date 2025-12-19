import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { SolutionCard } from "../SolutionCard";
import { Layers } from "lucide-react";

const SOLUTIONS = [
  {
    id: "website",
    label: "Site Web",
    description: "Votre vitrine en ligne professionnelle pour attirer et convertir des clients.",
    features: [
      "Design moderne et responsive",
      "Optimisé pour le référencement (SEO)",
      "Formulaires de contact intégrés",
      "Analytics et suivi des visiteurs",
    ],
  },
  {
    id: "portal",
    label: "Portail",
    description: "Espace sécurisé pour vos clients, employés ou partenaires.",
    features: [
      "Authentification sécurisée",
      "Tableau de bord personnalisé",
      "Gestion des documents",
      "Notifications automatiques",
    ],
  },
  {
    id: "module",
    label: "Modules",
    description: "Fonctionnalités additionnelles pour automatiser vos opérations.",
    features: [
      "CRM et gestion clients",
      "Facturation automatique",
      "Gestion de projets",
      "Intégrations tierces",
    ],
  },
];

export const StepSolutions = () => {
  const { state, updateData } = useQuiz();
  const selectedSolutions = state.data.solutionTypes || [];

  const toggleSolution = (id: string) => {
    const updated = selectedSolutions.includes(id)
      ? selectedSolutions.filter((s) => s !== id)
      : [...selectedSolutions, id];
    updateData({ solutionTypes: updated });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-glow">
          <Layers className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          De quoi avez-vous besoin?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sélectionnez toutes les solutions qui vous intéressent
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SOLUTIONS.map((solution, index) => (
          <SolutionCard
            key={solution.id}
            {...solution}
            isSelected={selectedSolutions.includes(solution.id)}
            onToggle={() => toggleSolution(solution.id)}
            index={index}
          />
        ))}
      </div>

      {/* Recommendation based on objectives */}
      {state.data.mainObjectives && state.data.mainObjectives.length > 0 && selectedSolutions.length === 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            💡 <span className="font-medium text-primary">Recommandation:</span>{" "}
            Basé sur vos objectifs, nous vous suggérons de commencer par un <strong>Site Web</strong>.
          </p>
        </div>
      )}

      <QuizNavigation canContinue={selectedSolutions.length > 0} />
    </div>
  );
};
