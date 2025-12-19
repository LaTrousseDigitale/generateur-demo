import { useQuiz } from "./QuizContext";
import { useQuizRecommendations, SOLUTION_EXPLANATIONS } from "./useQuizRecommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, Target, Building2, Layers, Check, 
  ArrowRight, Lightbulb, Star, TrendingUp, Puzzle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/types/questionnaire";

// Mapping des priorités vers labels
const PRIORITY_LABELS: Record<string, { label: string; icon: string }> = {
  revenue: { label: "Augmenter les ventes", icon: "📈" },
  visibility: { label: "Améliorer ma visibilité", icon: "👁️" },
  efficiency: { label: "Gagner du temps", icon: "⏱️" },
  image: { label: "Moderniser mon image", icon: "✨" },
  loyalty: { label: "Fidéliser mes clients", icon: "💎" },
  expansion: { label: "Nouveaux marchés", icon: "🚀" },
};

export const QuizSummaryPanel = () => {
  const { state } = useQuiz();
  const { data } = state;
  const recommendations = useQuizRecommendations(data);

  const hasSelections = 
    data.industry || 
    (data.mainObjectives && data.mainObjectives.length > 0) ||
    (data.solutionTypes && data.solutionTypes.length > 0);

  if (!hasSelections) {
    return (
      <Card className="h-full border-dashed bg-muted/30">
        <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Votre solution personnalisée</h3>
          <p className="text-sm text-muted-foreground">
            Vos choix et nos recommandations apparaîtront ici au fur et à mesure.
          </p>
        </CardContent>
      </Card>
    );
  }

  const industryLabel = data.industry 
    ? INDUSTRIES.find(i => i.value === data.industry)?.label 
    : null;

  return (
    <Card className="h-full overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          Votre parcours
        </CardTitle>
      </CardHeader>
      
      <ScrollArea className="h-[calc(100%-4rem)]">
        <CardContent className="p-4 space-y-5">
          {/* Industrie */}
          {industryLabel && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>Votre secteur</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <span className="font-semibold">{industryLabel}</span>
              </div>
            </div>
          )}

          {/* Priorités */}
          {data.mainObjectives && data.mainObjectives.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Target className="w-4 h-4" />
                <span>Vos priorités</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.mainObjectives.map((id) => {
                  const priority = PRIORITY_LABELS[id];
                  return (
                    <Badge 
                      key={id} 
                      variant="secondary"
                      className="flex items-center gap-1.5 py-1.5"
                    >
                      <span>{priority?.icon}</span>
                      <span>{priority?.label || id}</span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommandations intelligentes */}
          {recommendations.solutions.filter(r => r.score > 0).length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span>Nos recommandations</span>
                </div>
                
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm">{recommendations.summary}</p>
                </div>

                <div className="space-y-2">
                  {recommendations.solutions
                    .filter(r => r.score > 0)
                    .map((rec) => {
                      const solution = SOLUTION_EXPLANATIONS[rec.solutionId as keyof typeof SOLUTION_EXPLANATIONS];
                      const isSelected = data.solutionTypes?.includes(rec.solutionId);
                      
                      return (
                        <div 
                          key={rec.solutionId}
                          className={cn(
                            "p-3 rounded-lg border transition-all",
                            isSelected 
                              ? "bg-primary/10 border-primary" 
                              : "bg-card border-border"
                          )}
                        >
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{solution?.icon}</span>
                              <span className="font-medium">{solution?.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {rec.priority === "high" && (
                                <Badge variant="default" className="text-xs bg-primary">
                                  <Star className="w-3 h-3 mr-1" />
                                  Idéal
                                </Badge>
                              )}
                              {isSelected && (
                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {rec.reasons[0]}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}

          {/* Solutions sélectionnées */}
          {data.solutionTypes && data.solutionTypes.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Layers className="w-4 h-4" />
                  <span>Solutions choisies</span>
                </div>
                <div className="space-y-2">
                  {data.solutionTypes.map((id) => {
                    const solution = SOLUTION_EXPLANATIONS[id as keyof typeof SOLUTION_EXPLANATIONS];
                    return (
                      <div 
                        key={id}
                        className="flex items-center gap-3 p-2 rounded-lg bg-primary/5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span>{solution?.icon || "📦"}</span>
                        </div>
                        <div>
                          <span className="font-medium text-sm">{solution?.title || id}</span>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {solution?.whatItIs}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* Fonctionnalités sélectionnées */}
          {((data.features && data.features.length > 0) || (data.selectedModules && data.selectedModules.length > 0)) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Puzzle className="w-4 h-4" />
                  <span>Fonctionnalités</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.features?.slice(0, 6).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {data.features && data.features.length > 6 && (
                    <Badge variant="secondary" className="text-xs">
                      +{data.features.length - 6}
                    </Badge>
                  )}
                </div>
                {data.selectedModules && data.selectedModules.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {data.selectedModules.map((module) => (
                      <Badge key={module} className="text-xs bg-accent/20 text-accent-foreground">
                        {module}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="pt-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <TrendingUp className="w-3 h-3" />
              <span>Progression du questionnaire</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${((state.step + 1) / state.totalSteps) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Étape {state.step + 1} sur {state.totalSteps}
            </p>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
