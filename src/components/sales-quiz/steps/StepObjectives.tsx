import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { Target, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Priorités business universelles (le "pourquoi")
const BUSINESS_PRIORITIES = [
  { 
    id: "revenue", 
    label: "Augmenter les ventes", 
    description: "Générer plus de revenus et convertir plus de prospects",
    icon: "📈" 
  },
  { 
    id: "visibility", 
    label: "Améliorer ma visibilité", 
    description: "Être trouvé plus facilement par mes clients potentiels",
    icon: "👁️" 
  },
  { 
    id: "efficiency", 
    label: "Gagner du temps", 
    description: "Automatiser les tâches répétitives et réduire les erreurs",
    icon: "⏱️" 
  },
  { 
    id: "image", 
    label: "Moderniser mon image", 
    description: "Projeter une image professionnelle et actuelle",
    icon: "✨" 
  },
  { 
    id: "loyalty", 
    label: "Fidéliser mes clients", 
    description: "Créer des relations durables et encourager les achats récurrents",
    icon: "💎" 
  },
  { 
    id: "expansion", 
    label: "Atteindre de nouveaux marchés", 
    description: "Élargir ma clientèle géographiquement ou démographiquement",
    icon: "🚀" 
  },
];

export const StepObjectives = () => {
  const { state, updateData } = useQuiz();
  const selectedObjectives = state.data.mainObjectives || [];

  const toggleObjective = (id: string) => {
    const updated = selectedObjectives.includes(id)
      ? selectedObjectives.filter((o) => o !== id)
      : [...selectedObjectives, id];
    updateData({ mainObjectives: updated });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-secondary text-white shadow-glow">
          <Target className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Quelles sont vos priorités?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Qu'est-ce qui est le plus important pour votre entreprise en ce moment?
        </p>
      </div>

      {/* Selection Counter */}
      {selectedObjectives.length > 0 && (
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {selectedObjectives.length} priorité{selectedObjectives.length > 1 ? "s" : ""} sélectionnée{selectedObjectives.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Priorities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {BUSINESS_PRIORITIES.map((priority, index) => {
          const isSelected = selectedObjectives.includes(priority.id);

          return (
            <button
              key={priority.id}
              type="button"
              onClick={() => toggleObjective(priority.id)}
              className={cn(
                "group relative flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300",
                "border-2 animate-fade-in",
                "shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)]",
                isSelected
                  ? "bg-primary text-white border-primary shadow-[0_0_40px_-5px_hsl(var(--primary)/0.5)]"
                  : "bg-card border-border hover:border-primary/50 hover:bg-muted/50"
              )}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300",
                  isSelected
                    ? "bg-white/20"
                    : "bg-muted group-hover:bg-primary/10"
                )}
              >
                {priority.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="block font-semibold text-base">{priority.label}</span>
                <span className={cn(
                  "block text-sm mt-0.5 line-clamp-2",
                  isSelected ? "text-white/80" : "text-muted-foreground"
                )}>
                  {priority.description}
                </span>
              </div>

              {/* Checkbox */}
              <div
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300",
                  isSelected
                    ? "bg-white/30"
                    : "border-2 border-muted-foreground/30 group-hover:border-primary"
                )}
              >
                {isSelected && <Check className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>

      <QuizNavigation canContinue={selectedObjectives.length > 0} />
    </div>
  );
};
