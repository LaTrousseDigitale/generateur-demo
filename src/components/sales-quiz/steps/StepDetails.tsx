import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { Settings, Globe, Lock, ShoppingCart, Users, Briefcase, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

const WEBSITE_TYPES = [
  {
    id: "vitrine",
    label: "Site Vitrine",
    description: "Présentez votre entreprise et vos services",
    icon: Globe,
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    description: "Vendez vos produits en ligne",
    icon: ShoppingCart,
  },
  {
    id: "organisationnel",
    label: "Site Organisationnel",
    description: "Partagez des ressources et documents",
    icon: Briefcase,
  },
];

const PORTAL_TYPES = [
  {
    id: "client",
    label: "Portail Client",
    description: "Espace sécurisé pour vos clients",
    icon: Users,
  },
  {
    id: "employes",
    label: "Portail Employés",
    description: "Intranet et outils internes",
    icon: Briefcase,
  },
  {
    id: "rh",
    label: "Portail RH",
    description: "Gestion des ressources humaines",
    icon: HeartPulse,
  },
  {
    id: "mixte",
    label: "Portail Mixte",
    description: "Combinaison de plusieurs types",
    icon: Lock,
  },
];

export const StepDetails = () => {
  const { state, updateData } = useQuiz();
  const selectedSolutions = state.data.solutionTypes || [];

  const hasWebsite = selectedSolutions.includes("website");
  const hasPortal = selectedSolutions.includes("portal");

  const websiteType = state.data.websiteType;
  const portalType = state.data.portalType;

  const canContinue = 
    (!hasWebsite || !!websiteType) && 
    (!hasPortal || !!portalType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
          <Settings className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Précisons vos besoins
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Quelques détails supplémentaires pour personnaliser votre démo
        </p>
      </div>

      {/* Website Type Selection */}
      {hasWebsite && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Type de site web
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {WEBSITE_TYPES.map((type, index) => {
              const Icon = type.icon;
              const isSelected = websiteType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateData({ websiteType: type.id as any })}
                  className={cn(
                    "group relative p-4 rounded-xl text-left transition-all duration-300",
                    "border-2 animate-slide-up",
                    isSelected
                      ? "bg-primary/10 border-primary shadow-elegant"
                      : "bg-card border-border hover:border-primary/50"
                  )}
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={cn("font-semibold", isSelected && "text-primary")}>
                        {type.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Portal Type Selection */}
      {hasPortal && (
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            Type de portail
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PORTAL_TYPES.map((type, index) => {
              const Icon = type.icon;
              const isSelected = portalType === type.id;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateData({ portalType: type.id as any })}
                  className={cn(
                    "group relative p-4 rounded-xl text-left transition-all duration-300",
                    "border-2 animate-slide-up",
                    isSelected
                      ? "bg-accent/10 border-accent shadow-elegant"
                      : "bg-card border-border hover:border-accent/50"
                  )}
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        isSelected
                          ? "bg-accent text-white"
                          : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={cn("font-semibold", isSelected && "text-accent")}>
                        {type.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Module Selection placeholder - simplified */}
      {selectedSolutions.includes("module") && !hasWebsite && !hasPortal && (
        <div className="text-center py-8 animate-fade-in">
          <p className="text-muted-foreground">
            Les modules seront configurés en fonction de vos besoins lors de l'étape finale.
          </p>
        </div>
      )}

      <QuizNavigation canContinue={canContinue} />
    </div>
  );
};
