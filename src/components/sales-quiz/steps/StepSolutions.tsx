import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { useQuizRecommendations, SOLUTION_EXPLANATIONS } from "../useQuizRecommendations";
import { Layers, Check, Star, Info, ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
  const recommendations = useQuizRecommendations(state.data);
  const [expandedInfo, setExpandedInfo] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    const updated = selectedSolutions.includes(id)
      ? selectedSolutions.filter((s) => s !== id)
      : [...selectedSolutions, id];
    updateData({ solutionTypes: updated });
  };

  const toggleInfo = (id: string) => {
    setExpandedInfo(expandedInfo === id ? null : id);
  };

  const hasRecommendations = recommendations.solutions.some(r => r.score > 0);

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-glow">
          <Layers className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          De quoi avez-vous besoin?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sélectionnez les solutions qui correspondent à vos objectifs
        </p>
      </div>

      {/* Recommendation Banner */}
      {hasRecommendations && (
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border border-accent/30 rounded-xl p-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">💡 Recommandation personnalisée</h3>
              <p className="text-sm text-muted-foreground">
                {recommendations.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SOLUTIONS.map((solution, index) => {
          const isSelected = selectedSolutions.includes(solution.id);
          const recommendation = recommendations.solutions.find(r => r.solutionId === solution.id);
          const isRecommended = recommendation && recommendation.score > 0;
          const isTopRecommended = recommendation?.priority === "high";
          const explanation = SOLUTION_EXPLANATIONS[solution.id as keyof typeof SOLUTION_EXPLANATIONS];
          const isExpanded = expandedInfo === solution.id;

          return (
            <div
              key={solution.id}
              className={cn(
                "relative rounded-2xl border-2 transition-all duration-300 animate-fade-in overflow-hidden",
                "shadow-[0_0_20px_-5px_hsl(var(--primary)/0.2)]",
                isSelected
                  ? "border-primary bg-primary/5 shadow-[0_0_40px_-5px_hsl(var(--primary)/0.4)]"
                  : isTopRecommended
                  ? "border-accent/50 bg-accent/5 shadow-[0_0_30px_-5px_hsl(var(--accent)/0.3)]"
                  : "border-border bg-card hover:border-primary/50 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]"
              )}
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
            >
              {/* Recommendation Badge */}
              {isTopRecommended && !isSelected && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent to-primary text-white text-xs font-medium py-1 px-3 text-center">
                  <Star className="w-3 h-3 inline mr-1" />
                  Recommandé pour vous
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleSolution(solution.id)}
                className={cn(
                  "w-full p-5 text-left",
                  isTopRecommended && !isSelected && "pt-9"
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all",
                    isSelected 
                      ? "bg-primary/20" 
                      : "bg-muted"
                  )}>
                    {explanation?.icon || "📦"}
                  </div>
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                    isSelected
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className={cn(
                  "text-lg font-bold mb-1 transition-colors",
                  isSelected && "text-primary"
                )}>
                  {solution.label}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {solution.description}
                </p>

                {/* Recommendation Reason */}
                {isRecommended && recommendation.reasons[0] && (
                  <div className="flex items-start gap-2 mb-3 p-2 rounded-lg bg-accent/10 border border-accent/20">
                    <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-accent-foreground/80">
                      {recommendation.reasons[0]}
                    </p>
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-1.5">
                  {solution.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        isSelected ? "bg-primary" : "bg-muted-foreground/50"
                      )} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </button>

              {/* Learn More Toggle */}
              <div className="border-t border-border/50">
                <button
                  type="button"
                  onClick={() => toggleInfo(solution.id)}
                  className="w-full px-5 py-2.5 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>En savoir plus</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Expanded Educational Content */}
                {isExpanded && explanation && (
                  <div className="px-5 pb-4 space-y-3 animate-fade-in">
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        C'est quoi?
                      </h4>
                      <p className="text-sm">{explanation.whatItIs}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Avantages clés
                      </h4>
                      <ul className="space-y-1">
                        {explanation.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-3 h-3 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                        Idéal pour
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {explanation.bestFor.map((item, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <QuizNavigation canContinue={selectedSolutions.length > 0} />
    </div>
  );
};
