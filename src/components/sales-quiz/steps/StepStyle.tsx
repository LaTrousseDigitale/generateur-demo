import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  Palette, Check, Sun, Moon, Zap, Smartphone, Monitor,
  Sparkles, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DEMO_THEMES, getDefaultThemeForIndustry } from "@/types/demoThemes";
import { INDUSTRIES } from "@/types/questionnaire";

// ============ STYLES POUR PORTAILS/MODULES ============

const PORTAL_STYLES = [
  {
    id: "light",
    name: "Mode Clair",
    description: "Interface lumineuse et professionnelle, idéale pour le travail de bureau",
    icon: Sun,
    preview: {
      bgGradient: "from-white via-slate-50 to-white",
      cardBg: "bg-white",
      accent: "bg-blue-500",
    },
    tip: "Recommandé pour une utilisation quotidienne en environnement lumineux",
  },
  {
    id: "dark",
    name: "Mode Sombre",
    description: "Réduction de la fatigue oculaire, élégant et moderne",
    icon: Moon,
    preview: {
      bgGradient: "from-slate-900 via-slate-800 to-slate-900",
      cardBg: "bg-slate-800",
      accent: "bg-blue-500",
    },
    tip: "Idéal pour les utilisateurs passant beaucoup de temps devant l'écran",
  },
  {
    id: "auto",
    name: "Mode Automatique",
    description: "S'adapte automatiquement aux préférences système de l'utilisateur",
    icon: Monitor,
    preview: {
      bgGradient: "from-slate-100 via-white to-slate-900",
      cardBg: "bg-gradient-to-r from-white to-slate-800",
      accent: "bg-blue-500",
    },
    tip: "La meilleure expérience pour tous les utilisateurs",
  },
];

const MOBILE_OPTIONS = [
  {
    id: "responsive",
    name: "Site Responsive",
    description: "S'adapte à tous les écrans (mobile, tablette, ordinateur)",
    icon: Monitor,
    included: true,
  },
  {
    id: "pwa",
    name: "Application Web Progressive (PWA)",
    description: "Installable comme une app, fonctionne hors-ligne",
    icon: Smartphone,
    tip: "Peut être ajoutée à l'écran d'accueil du téléphone",
  },
  {
    id: "native-look",
    name: "Style Application Native",
    description: "Interface optimisée pour mobile avec navigation tactile",
    icon: Smartphone,
    tip: "Expérience utilisateur similaire aux apps natives",
  },
];

export const StepStyle = () => {
  const { state, updateData } = useQuiz();
  const { solutionTypes = [], industry } = state.data;
  
  const hasWebsite = solutionTypes.includes("website");
  const hasPortalOrModule = solutionTypes.includes("portal") || solutionTypes.includes("module");

  // Website theme
  const selectedTheme = state.data.theme || "";
  const suggestedTheme = industry ? getDefaultThemeForIndustry(industry) : "moderne";

  // Portal/Module style
  const selectedPortalStyle = state.data.portalStyle || "";
  const selectedMobileOptions = state.data.mobileOptions || [];

  const toggleMobileOption = (optionId: string) => {
    const updated = selectedMobileOptions.includes(optionId)
      ? selectedMobileOptions.filter(o => o !== optionId)
      : [...selectedMobileOptions, optionId];
    updateData({ mobileOptions: updated });
  };

  const canContinue = 
    (!hasWebsite || !!selectedTheme) && 
    (!hasPortalOrModule || !!selectedPortalStyle);

  const industryLabel = industry 
    ? INDUSTRIES.find(i => i.value === industry)?.label 
    : null;

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-glow">
          <Palette className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Quel style visuel préférez-vous?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Choisissez l'apparence qui correspond le mieux à votre image de marque
        </p>
      </div>

      {/* ===== WEBSITE THEMES ===== */}
      {hasWebsite && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Style du site web
            </h3>
            {industryLabel && suggestedTheme && (
              <Badge variant="outline" className="text-xs">
                Suggéré pour {industryLabel}: {DEMO_THEMES.find(t => t.id === suggestedTheme)?.name}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_THEMES.map((theme, index) => {
              const isSelected = selectedTheme === theme.id;
              const isSuggested = theme.id === suggestedTheme;

              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => updateData({ theme: selectedTheme === theme.id ? "" : theme.id })}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in",
                    "border-2",
                    isSelected
                      ? "border-primary shadow-[0_0_40px_-5px_hsl(var(--primary)/0.4)] scale-[1.02]"
                      : isSuggested
                      ? "border-accent/50 hover:border-accent"
                      : "border-border hover:border-primary/50"
                  )}
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                >
                  {/* Suggested Badge */}
                  {isSuggested && !isSelected && (
                    <div className="absolute top-0 left-0 right-0 bg-accent text-white text-xs font-medium py-1 px-3 text-center z-10">
                      ⭐ Suggéré pour votre industrie
                    </div>
                  )}

                  {/* Theme Preview */}
                  <div className={cn(
                    "h-32 relative overflow-hidden bg-gradient-to-br",
                    theme.preview.bgGradient,
                    isSuggested && !isSelected && "pt-6"
                  )}>
                    {/* Mini preview elements */}
                    <div className="absolute inset-3 flex flex-col gap-2">
                      <div className={cn(
                        "h-4 w-16 rounded",
                        theme.id === "moderne" ? "bg-slate-800" : 
                        theme.id === "rustique" ? "bg-amber-600" : "bg-indigo-500"
                      )} />
                      <div className={cn(
                        "flex-1 rounded",
                        theme.id === "moderne" ? "bg-slate-100" : 
                        theme.id === "rustique" ? "bg-stone-700/50" : "bg-white/10"
                      )}>
                        <div className="p-2 space-y-1.5">
                          <div className={cn(
                            "h-2.5 w-full rounded",
                            theme.id === "moderne" ? "bg-slate-200" : 
                            theme.id === "rustique" ? "bg-amber-900/30" : "bg-indigo-500/30"
                          )} />
                          <div className={cn(
                            "h-2.5 w-3/4 rounded",
                            theme.id === "moderne" ? "bg-slate-200" : 
                            theme.id === "rustique" ? "bg-amber-900/30" : "bg-purple-500/30"
                          )} />
                          <div className={cn(
                            "h-2.5 w-1/2 rounded",
                            theme.id === "moderne" ? "bg-slate-300" : 
                            theme.id === "rustique" ? "bg-amber-800/30" : "bg-indigo-400/30"
                          )} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Glow effect for futuriste */}
                    {theme.preview.accentGlow && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-purple-500/20" />
                    )}

                    {/* Selected checkmark */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Theme Info */}
                  <div className="p-4 bg-card">
                    <div className="flex items-center gap-2 mb-1">
                      {theme.id === "moderne" && <Sun className="w-4 h-4 text-amber-500" />}
                      {theme.id === "rustique" && <Moon className="w-4 h-4 text-amber-700" />}
                      {theme.id === "futuriste" && <Zap className="w-4 h-4 text-indigo-500" />}
                      <h4 className="font-semibold">{theme.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== PORTAL/MODULE STYLES ===== */}
      {hasPortalOrModule && (
        <div className="space-y-6">
          {/* Color Mode */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Monitor className="w-5 h-5 text-accent" />
              Mode d'affichage
            </h3>
            <p className="text-sm text-muted-foreground">
              Choisissez le thème de couleur pour votre portail ou application
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PORTAL_STYLES.map((style, index) => {
                const Icon = style.icon;
                const isSelected = selectedPortalStyle === style.id;

                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => updateData({ portalStyle: selectedPortalStyle === style.id ? "" : style.id })}
                    className={cn(
                      "group relative rounded-2xl overflow-hidden transition-all duration-300 animate-fade-in",
                      "border-2",
                      isSelected
                        ? "border-primary shadow-[0_0_40px_-5px_hsl(var(--primary)/0.4)]"
                        : "border-border hover:border-primary/50"
                    )}
                    style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                  >
                    {/* Style Preview */}
                    <div className={cn(
                      "h-24 relative overflow-hidden bg-gradient-to-br",
                      style.preview.bgGradient
                    )}>
                      {/* Mini UI elements */}
                      <div className="absolute inset-3 flex gap-2">
                        <div className={cn(
                          "w-8 h-full rounded",
                          style.id === "light" ? "bg-slate-200" : 
                          style.id === "dark" ? "bg-slate-700" : "bg-gradient-to-b from-slate-200 to-slate-700"
                        )} />
                        <div className="flex-1 flex flex-col gap-1.5">
                          <div className={cn(
                            "h-3 rounded",
                            style.id === "light" ? "bg-slate-100" : 
                            style.id === "dark" ? "bg-slate-700" : "bg-slate-400/50"
                          )} />
                          <div className={cn(
                            "flex-1 rounded",
                            style.preview.cardBg
                          )} />
                        </div>
                      </div>

                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Style Info */}
                    <div className="p-4 bg-card">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className={cn(
                          "w-4 h-4",
                          style.id === "light" ? "text-amber-500" :
                          style.id === "dark" ? "text-indigo-500" : "text-primary"
                        )} />
                        <h4 className="font-semibold">{style.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Options */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-secondary" />
              Version mobile
            </h3>
            <p className="text-sm text-muted-foreground">
              Comment souhaitez-vous que vos utilisateurs accèdent au portail sur mobile?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {MOBILE_OPTIONS.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedMobileOptions.includes(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleMobileOption(option.id)}
                    className={cn(
                      "group relative flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-300",
                      "border-2 animate-fade-in",
                      isSelected
                        ? "bg-secondary/10 border-secondary"
                        : "bg-card border-border hover:border-secondary/50"
                    )}
                    style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      isSelected 
                        ? "bg-secondary text-white" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{option.name}</span>
                        {option.included && (
                          <Badge variant="secondary" className="text-xs py-0">
                            Inclus
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                      {option.tip && (
                        <p className="text-xs text-secondary mt-1 flex items-center gap-1">
                          <Info className="w-3 h-3" />
                          {option.tip}
                        </p>
                      )}
                    </div>

                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0",
                      isSelected
                        ? "bg-secondary border-secondary"
                        : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <QuizNavigation canContinue={canContinue} />
    </div>
  );
};
