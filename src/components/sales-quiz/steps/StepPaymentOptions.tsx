import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  CreditCard, Wrench, Globe, Users, FileText, Languages,
  Check, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PAYMENT_MODES, 
  FINANCING_TERMS, 
  MAINTENANCE_LEVELS, 
  HOSTING_OPTIONS, 
  DOMAIN_OPTIONS 
} from "@/types/questionnaire";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const StepPaymentOptions = () => {
  const { state, updateData } = useQuiz();
  const { 
    paymentMode, 
    financingTerm, 
    maintenanceLevel, 
    hostingPreference, 
    domainType,
    numberOfUsers,
    numberOfBlogPages,
    numberOfTranslatedPages,
  } = state.data;

  const showHostingOptions = paymentMode === "achat";
  const showFinancingTerms = paymentMode === "financement";
  const hasPortal = (state.data.solutionTypes || []).includes("portal");
  const hasWebsite = (state.data.solutionTypes || []).includes("website");

  const canContinue = !!paymentMode && !!maintenanceLevel;

  return (
    <TooltipProvider>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
            <CreditCard className="w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Options de paiement et services
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choisissez comment vous souhaitez payer et les services additionnels
          </p>
        </div>

        {/* Payment Mode */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Mode de paiement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PAYMENT_MODES.map((mode, index) => {
              const isSelected = paymentMode === mode.value;

              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => updateData({ paymentMode: mode.value as any })}
                  className={cn(
                    "group relative p-5 rounded-xl text-left transition-all duration-300",
                    "border-2 animate-slide-up",
                    isSelected
                      ? "bg-primary/10 border-primary shadow-elegant"
                      : "bg-card border-border hover:border-primary/50"
                  )}
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
                >
                  {mode.value === "saas" && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-white">
                      Populaire
                    </Badge>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={cn("font-bold text-lg mb-1", isSelected && "text-primary")}>
                        {mode.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{mode.description}</p>
                    </div>
                    {isSelected && (
                      <Check className="w-5 h-5 text-primary shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Financing Terms (conditional) */}
        {showFinancingTerms && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Durée du financement
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {FINANCING_TERMS.map((term) => {
                const isSelected = financingTerm === term.value;

                return (
                  <button
                    key={term.value}
                    type="button"
                    onClick={() => updateData({ financingTerm: term.value })}
                    className={cn(
                      "p-4 rounded-xl text-center transition-all duration-300",
                      "border-2",
                      isSelected
                        ? "bg-accent/10 border-accent"
                        : "bg-card border-border hover:border-accent/50"
                    )}
                  >
                    <h4 className={cn("font-bold text-xl", isSelected && "text-accent")}>
                      {term.label}
                    </h4>
                    <p className="text-sm text-muted-foreground">{term.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Hosting & Domain (conditional - only for purchase) */}
        {showHostingOptions && (
          <div className="space-y-6 animate-fade-in">
            {/* Hosting */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Hébergement
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {HOSTING_OPTIONS.map((option) => {
                  const isSelected = hostingPreference === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateData({ hostingPreference: option.value })}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-300",
                        "border-2",
                        isSelected
                          ? "bg-primary/10 border-primary"
                          : "bg-card border-border hover:border-primary/50"
                      )}
                    >
                      <h4 className={cn("font-semibold", isSelected && "text-primary")}>
                        {option.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      {option.price !== 0 && (
                        <p className="text-xs font-medium text-primary mt-1">
                          {option.price > 0 ? `+${option.price}$/mois` : `${option.price}$/mois`}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Domain */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent" />
                Nom de domaine
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {DOMAIN_OPTIONS.map((option) => {
                  const isSelected = domainType === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateData({ domainType: option.value })}
                      className={cn(
                        "p-4 rounded-xl text-left transition-all duration-300",
                        "border-2",
                        isSelected
                          ? "bg-accent/10 border-accent"
                          : "bg-card border-border hover:border-accent/50"
                      )}
                    >
                      <h4 className={cn("font-semibold", isSelected && "text-accent")}>
                        {option.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      {option.price > 0 && (
                        <p className="text-xs font-medium text-accent mt-1">
                          +{option.price}$/an
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Level */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Wrench className="w-5 h-5 text-primary" />
            Niveau de maintenance
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  La maintenance inclut les mises à jour de sécurité, le support technique et la surveillance de votre solution.
                </p>
              </TooltipContent>
            </Tooltip>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MAINTENANCE_LEVELS.map((level, index) => {
              const isSelected = maintenanceLevel === level.value;

              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => updateData({ maintenanceLevel: level.value })}
                  className={cn(
                    "group relative p-4 rounded-xl text-left transition-all duration-300",
                    "border-2 animate-slide-up",
                    isSelected
                      ? "bg-primary/10 border-primary shadow-elegant"
                      : "bg-card border-border hover:border-primary/50"
                  )}
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
                >
                  {level.value === "standard" && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs">
                      Recommandé
                    </Badge>
                  )}
                  <h4 className={cn("font-semibold", isSelected && "text-primary")}>
                    {level.label}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{level.description}</p>
                  <p className="text-lg font-bold text-primary mt-2">
                    {level.price}$/mois
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-6 p-6 rounded-xl bg-muted/30 border">
          <h3 className="text-lg font-semibold">Options additionnelles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Number of Users (for portals) */}
            {hasPortal && (
              <div className="space-y-2">
                <Label htmlFor="users" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Nombre d'utilisateurs
                </Label>
                <Input
                  id="users"
                  type="number"
                  min={1}
                  placeholder="5 inclus"
                  value={numberOfUsers || ""}
                  onChange={(e) => updateData({ numberOfUsers: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">5 utilisateurs inclus, +5$/mois par utilisateur</p>
              </div>
            )}

            {/* Blog Pages (for websites) */}
            {hasWebsite && (
              <div className="space-y-2">
                <Label htmlFor="blog" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Pages blog additionnelles
                </Label>
                <Input
                  id="blog"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={numberOfBlogPages || ""}
                  onChange={(e) => updateData({ numberOfBlogPages: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">+40$/mois par page</p>
              </div>
            )}

            {/* Translated Pages */}
            {hasWebsite && (
              <div className="space-y-2">
                <Label htmlFor="translations" className="flex items-center gap-2">
                  <Languages className="w-4 h-4" />
                  Pages à traduire
                </Label>
                <Input
                  id="translations"
                  type="number"
                  min={0}
                  placeholder="0"
                  value={numberOfTranslatedPages || ""}
                  onChange={(e) => updateData({ numberOfTranslatedPages: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-muted-foreground">+30$/mois par page traduite</p>
              </div>
            )}
          </div>
        </div>

        <QuizNavigation canContinue={canContinue} />
      </div>
    </TooltipProvider>
  );
};
