import { useQuiz } from "./QuizContext";
import { useQuizRecommendations, SOLUTION_EXPLANATIONS } from "./useQuizRecommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, Target, Building2, Layers, Check, 
  ArrowRight, Lightbulb, Star, TrendingUp, Puzzle, Palette,
  Eye, Clock, Wand2, Gem, Rocket, Globe, Lock, Settings, Package,
  Sun, Moon, RefreshCw, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { INDUSTRIES } from "@/types/questionnaire";
import { LucideIcon } from "lucide-react";

// Mapping des priorités vers labels avec icônes Lucide
const PRIORITY_LABELS: Record<string, { label: string; Icon: LucideIcon }> = {
  revenue: { label: "Augmenter les ventes", Icon: TrendingUp },
  visibility: { label: "Améliorer ma visibilité", Icon: Eye },
  efficiency: { label: "Gagner du temps", Icon: Clock },
  image: { label: "Moderniser mon image", Icon: Wand2 },
  loyalty: { label: "Fidéliser mes clients", Icon: Gem },
  expansion: { label: "Nouveaux marchés", Icon: Rocket },
};

// Mapping des icônes de solutions
const SOLUTION_ICONS: Record<string, LucideIcon> = {
  website: Globe,
  portal: Lock,
  module: Settings,
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
      <Card className="h-full border-dashed bg-gradient-to-b from-background to-muted/30 overflow-hidden relative">
        {/* Animated background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-accent/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        
        <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center relative z-10">
          {/* Browser window mockup - Enhanced style */}
          <div className="w-full max-w-[260px] mb-6 relative">
            {/* Main browser mockup */}
            <div className="rounded-xl border-2 border-border/60 bg-card shadow-2xl overflow-hidden">
              {/* Browser header with traffic lights */}
              <div className="h-8 bg-muted/80 border-b border-border/50 flex items-center px-3 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[hsl(0,84%,60%)]" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(44,96%,66%)]" />
                  <div className="w-3 h-3 rounded-full bg-[hsl(142,71%,45%)]" />
                </div>
                <div className="flex-1 mx-3 h-4 bg-background/80 rounded-md flex items-center justify-center">
                  <span className="text-[8px] text-muted-foreground/60 font-medium">demo.latroussedigitale.ca</span>
                </div>
              </div>
              
              {/* Content area */}
              <div className="p-4 bg-background space-y-3">
                {/* Logo + Title row */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                </div>
                
                {/* Section title with accent */}
                <div className="pt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-36 bg-accent/30 rounded animate-pulse" />
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full mt-2" />
                </div>
                
                {/* Preview box */}
                <div className="h-16 bg-muted/50 rounded-lg flex items-center justify-center border border-border/30">
                  <span className="text-[10px] text-muted-foreground/50">En construction...</span>
                </div>
                
                {/* Color palette section */}
                <div className="pt-1">
                  <div className="text-[9px] text-accent font-medium mb-2">Palette de couleurs</div>
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <div className="h-12 rounded-xl bg-primary shadow-lg transition-transform hover:scale-105" />
                      <span className="text-[8px] text-muted-foreground/60 block text-center">Principal</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-12 rounded-xl bg-accent shadow-lg transition-transform hover:scale-105" />
                      <span className="text-[8px] text-muted-foreground/60 block text-center">Accent</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-12 rounded-xl bg-secondary shadow-lg transition-transform hover:scale-105" />
                      <span className="text-[8px] text-muted-foreground/60 block text-center">Secondaire</span>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons row */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex items-center gap-1 text-[8px] text-primary">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Démarrer mon projet</span>
                  </div>
                  <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Appel découverte</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements around the mockup */}
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center animate-bounce" style={{ animationDuration: "3s" }}>
              <Star className="w-4 h-4 text-secondary" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-7 h-7 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center animate-pulse">
              <Zap className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="absolute top-1/2 -right-4 w-6 h-6 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center animate-pulse" style={{ animationDelay: "0.5s" }}>
              <Rocket className="w-3 h-3 text-primary" />
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">Votre solution personnalisée</h3>
          <p className="text-sm text-muted-foreground max-w-[220px]">
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
                  const PriorityIcon = priority?.Icon;
                  return (
                    <Badge 
                      key={id} 
                      variant="secondary"
                      className="flex items-center gap-1.5 py-1.5"
                    >
                      {PriorityIcon && <PriorityIcon className="w-3.5 h-3.5" />}
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
                              {(() => {
                                const SolutionIcon = SOLUTION_ICONS[rec.solutionId] || Package;
                                return <SolutionIcon className="w-5 h-5 text-primary" />;
                              })()}
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
                          {(() => {
                            const SolutionIcon = SOLUTION_ICONS[id] || Package;
                            return <SolutionIcon className="w-4 h-4 text-primary" />;
                          })()}
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

          {/* Style sélectionné */}
          {(data.theme || data.portalStyle) && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Palette className="w-4 h-4" />
                  <span>Style visuel</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.theme && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      {data.theme === "moderne" ? <Sun className="w-3 h-3" /> : 
                       data.theme === "rustique" ? <Moon className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                      {data.theme === "moderne" ? "Moderne" : 
                       data.theme === "rustique" ? "Sombre" : "Futuriste"}
                    </Badge>
                  )}
                  {data.portalStyle && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      {data.portalStyle === "light" ? <Sun className="w-3 h-3" /> : 
                       data.portalStyle === "dark" ? <Moon className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                      {data.portalStyle === "light" ? "Mode clair" : 
                       data.portalStyle === "dark" ? "Mode sombre" : "Auto"}
                    </Badge>
                  )}
                </div>
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
