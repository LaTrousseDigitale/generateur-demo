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
        {/* Animated background glow - more dynamic */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-secondary/20 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "0.5s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-primary/15 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        
        <CardContent className="h-full flex flex-col items-center justify-center p-4 text-center relative z-10">
          {/* Browser window mockup - LARGER & More dynamic */}
          <div className="w-full max-w-[500px] mb-5 relative animate-float-gentle">
            {/* Main browser mockup */}
            <div className="rounded-2xl border-2 border-border/70 bg-card shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              {/* Browser header with traffic lights */}
              <div className="h-9 bg-gradient-to-r from-muted/90 to-muted/70 border-b border-border/50 flex items-center px-3 gap-2">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-destructive shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary shadow-sm" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[hsl(142,71%,45%)] shadow-sm" />
                </div>
                <div className="flex-1 mx-3 h-5 bg-background/90 rounded-md flex items-center justify-center shadow-inner">
                  <span className="text-[9px] text-muted-foreground font-medium">demo.latroussedigitale.ca</span>
                </div>
              </div>
              
              {/* Content area */}
              <div className="p-5 bg-gradient-to-b from-background to-muted/10 space-y-4">
                {/* Logo + Title row */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg animate-pulse-soft">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3.5 w-24 bg-muted rounded-md animate-shimmer-slow" />
                    <div className="h-2.5 w-16 bg-muted/60 rounded animate-shimmer-slow" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
                
                {/* Section title with accent */}
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-44 bg-gradient-to-r from-accent/40 to-accent/20 rounded-md animate-shimmer-slow" />
                  </div>
                  <div className="h-2 w-full bg-gradient-to-r from-secondary via-accent to-primary rounded-full mt-3 animate-gradient-x" />
                </div>
                
                {/* Preview box with shimmer */}
                <div className="h-20 bg-gradient-to-br from-muted/60 to-muted/30 rounded-xl flex items-center justify-center border border-border/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-fast" />
                  <span className="text-xs text-muted-foreground/60 font-medium">En construction...</span>
                </div>
                
                {/* Color palette section - LARGER */}
                <div className="pt-2">
                  <div className="text-[11px] text-accent font-semibold mb-3 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" />
                    Palette de couleurs
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-1.5 group">
                      <div className="h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 ring-2 ring-primary/20" />
                      <span className="text-[10px] text-muted-foreground block text-center font-medium">Principal</span>
                    </div>
                    <div className="flex-1 space-y-1.5 group">
                      <div className="h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 ring-2 ring-accent/20" />
                      <span className="text-[10px] text-muted-foreground block text-center font-medium">Accent</span>
                    </div>
                    <div className="flex-1 space-y-1.5 group">
                      <div className="h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 shadow-lg transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 ring-2 ring-secondary/20" />
                      <span className="text-[10px] text-muted-foreground block text-center font-medium">Secondaire</span>
                    </div>
                  </div>
                </div>
                
                {/* Action buttons row - More styled */}
                <div className="flex items-center justify-center gap-4 pt-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-primary font-medium px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer">
                    <Sparkles className="w-3 h-3 animate-spin-slow" />
                    <span>Démarrer mon projet</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <Clock className="w-3 h-3" />
                    <span>Appel découverte</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements around the mockup - More dynamic */}
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/30 to-secondary/10 backdrop-blur-sm border border-secondary/40 flex items-center justify-center animate-float-bounce shadow-lg">
              <Star className="w-5 h-5 text-secondary drop-shadow-sm" />
            </div>
            <div className="absolute -bottom-3 -left-3 w-9 h-9 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 backdrop-blur-sm border border-accent/40 flex items-center justify-center animate-pulse-glow shadow-lg">
              <Zap className="w-4 h-4 text-accent drop-shadow-sm" />
            </div>
            <div className="absolute top-1/3 -right-5 w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-primary/40 flex items-center justify-center animate-float-slow shadow-lg">
              <Rocket className="w-4 h-4 text-primary drop-shadow-sm" />
            </div>
            <div className="absolute top-2/3 -left-4 w-7 h-7 rounded-lg bg-gradient-to-br from-accent/25 to-secondary/15 backdrop-blur-sm border border-accent/30 flex items-center justify-center animate-spin-slow shadow-md">
              <Gem className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="absolute -top-2 left-1/4 w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center animate-float-gentle shadow-md">
              <Globe className="w-3 h-3 text-primary" />
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mb-1.5 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Votre solution personnalisée</h3>
          <p className="text-sm text-muted-foreground max-w-[260px]">
            Vos choix et nos recommandations apparaîtront ici au fur et à mesure.
          </p>
        </CardContent>
        
        {/* Dynamic animations */}
        <style>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { transform: translateY(-15px) scale(1.05); opacity: 0.8; }
          }
          @keyframes float-gentle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes float-bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(5deg); }
            75% { transform: translateY(-4px) rotate(-5deg); }
          }
          @keyframes shimmer-slow {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
          @keyframes shimmer-fast {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes pulse-soft {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(28, 97, 254, 0.4); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px 5px rgba(28, 97, 254, 0.2); }
          }
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 10px rgba(255, 107, 61, 0.3); }
            50% { box-shadow: 0 0 25px rgba(255, 107, 61, 0.6); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
          .animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
          .animate-float-bounce { animation: float-bounce 2.5s ease-in-out infinite; }
          .animate-shimmer-slow { animation: shimmer-slow 2s ease-in-out infinite; }
          .animate-shimmer-fast { animation: shimmer-fast 1.5s infinite; }
          .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
          .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }
          .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        `}</style>
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
