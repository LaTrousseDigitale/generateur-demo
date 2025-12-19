import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  Target, Check, Sparkles, Info, ArrowRight,
  TrendingUp, Eye, Clock, Wand2, Gem, Rocket, Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

// Priorités business universelles avec contenu pédagogique
const BUSINESS_PRIORITIES: Array<{
  id: string;
  label: string;
  description: string;
  Icon: LucideIcon;
  educationalTip: string;
  solutions: string[];
}> = [
  { 
    id: "revenue", 
    label: "Augmenter les ventes", 
    description: "Générer plus de revenus et convertir plus de prospects",
    Icon: TrendingUp,
    educationalTip: "Un site web optimisé peut augmenter vos conversions de 20-50%. Les formulaires de contact et les appels à l'action stratégiques captent les prospects.",
    solutions: ["Site Web", "Portail client"],
  },
  { 
    id: "visibility", 
    label: "Améliorer ma visibilité", 
    description: "Être trouvé plus facilement par mes clients potentiels",
    Icon: Eye,
    educationalTip: "75% des utilisateurs ne dépassent jamais la première page Google. Un site bien référencé (SEO) vous rend visible auprès des clients qui vous cherchent.",
    solutions: ["Site Web optimisé SEO"],
  },
  { 
    id: "efficiency", 
    label: "Gagner du temps", 
    description: "Automatiser les tâches répétitives et réduire les erreurs",
    Icon: Clock,
    educationalTip: "L'automatisation peut réduire jusqu'à 80% le temps passé sur les tâches administratives : facturation, suivi client, réponses aux questions fréquentes.",
    solutions: ["Portail", "Modules d'automatisation"],
  },
  { 
    id: "image", 
    label: "Moderniser mon image", 
    description: "Projeter une image professionnelle et actuelle",
    Icon: Wand2,
    educationalTip: "94% des premières impressions sont liées au design. Un site moderne et professionnel renforce immédiatement votre crédibilité.",
    solutions: ["Site Web design"],
  },
  { 
    id: "loyalty", 
    label: "Fidéliser mes clients", 
    description: "Créer des relations durables et encourager les achats récurrents",
    Icon: Gem,
    educationalTip: "Acquérir un nouveau client coûte 5x plus cher que de fidéliser un client existant. Un portail client renforce la relation et la satisfaction.",
    solutions: ["Portail client", "CRM"],
  },
  { 
    id: "expansion", 
    label: "Atteindre de nouveaux marchés", 
    description: "Élargir ma clientèle géographiquement ou démographiquement",
    Icon: Rocket,
    educationalTip: "Le web abolit les frontières géographiques. Un site multilingue ou une boutique en ligne peuvent doubler votre zone de chalandise.",
    solutions: ["Site Web", "E-commerce"],
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
    <TooltipProvider>
      <div className="space-y-6 w-full">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-secondary text-white shadow-glow">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Quelles sont vos priorités?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sélectionnez ce qui compte le plus pour votre entreprise — nous adapterons nos recommandations.
          </p>
        </div>

        {/* Educational Banner */}
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Pourquoi ces questions?</span> Comprendre vos objectifs business nous permet de vous recommander les solutions les plus adaptées et d'éviter les fonctionnalités superflues.
              </p>
            </div>
          </div>
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
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    isSelected
                      ? "bg-white/20"
                      : "bg-muted group-hover:bg-primary/10"
                  )}
                >
                  <priority.Icon className={cn(
                    "w-6 h-6",
                    isSelected ? "text-white" : "text-primary"
                  )} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="block font-semibold text-base">{priority.label}</span>
                  <span className={cn(
                    "block text-sm mt-0.5",
                    isSelected ? "text-white/80" : "text-muted-foreground"
                  )}>
                    {priority.description}
                  </span>
                  
                  {/* Solutions hint */}
                  {isSelected && (
                    <div className="mt-2 flex items-center gap-1.5 animate-fade-in">
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-xs text-white/70">
                        {priority.solutions.join(", ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div 
                      className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                        isSelected ? "bg-white/20 hover:bg-white/30" : "bg-muted hover:bg-muted-foreground/20"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info className={cn("w-3.5 h-3.5", isSelected ? "text-white" : "text-muted-foreground")} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p className="text-sm">{priority.educationalTip}</p>
                  </TooltipContent>
                </Tooltip>

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
    </TooltipProvider>
  );
};
