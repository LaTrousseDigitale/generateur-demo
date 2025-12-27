import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  Puzzle, Check, Lock, Calendar, FileText, CreditCard, 
  Users, Calculator, MessageSquare, Briefcase, Brain, MapPin, Ruler, Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/types/questionnaire";
import { LucideIcon } from "lucide-react";

// Mapping des icônes par catégorie
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  gestion: Briefcase,
  documents: FileText,
  crm: Users,
  calculateurs: Calculator,
  ia: Brain,
};

const MODULE_ICONS: Record<string, LucideIcon> = {
  "gestionnaire-mdp": Lock,
  "agenda-personnel": Calendar,
  "projets": Briefcase,
  "pointeuse": Calendar,
  "documents-ia": FileText,
  "facturation": FileText,
  "devis-pdf": FileText,
  "paiements": CreditCard,
  "crm": Users,
  "calculateur-intelligent": Calculator,
  "calculateur-distance": MapPin,
  "calculateur-superficie": Ruler,
  "calculateur-hypothecaire": Home,
  "ia-conversationnelle": MessageSquare,
};

// Grouper les modules par catégorie
const groupedModules = MODULES.reduce((acc, module) => {
  const category = module.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(module);
  return acc;
}, {} as Record<string, typeof MODULES>);

const CATEGORY_LABELS: Record<string, string> = {
  gestion: "Gestion & Organisation",
  documents: "Documents & Facturation",
  crm: "CRM & Paiements",
  calculateurs: "Calculateurs spécialisés",
  ia: "Intelligence Artificielle",
};

// Modules recommandés par industrie
const INDUSTRY_RECOMMENDED: Record<string, string[]> = {
  auto: ["crm", "devis-pdf", "calculateur-intelligent"],
  construction: ["projets", "devis-pdf", "calculateur-superficie"],
  immobilier: ["crm", "calculateur-hypothecaire", "documents-ia"],
  demenagement: ["devis-pdf", "calculateur-distance", "facturation"],
  restauration: ["paiements", "facturation", "crm"],
  commerce: ["paiements", "facturation", "crm"],
  sante: ["agenda-personnel", "documents-ia", "paiements"],
  services: ["crm", "devis-pdf", "projets"],
  finances: ["calculateur-hypothecaire", "documents-ia", "crm"],
  transport: ["calculateur-distance", "pointeuse", "facturation"],
};

export const StepModulesSelection = () => {
  const { state, updateData } = useQuiz();
  const selectedModules = state.data.selectedModules || [];
  const industry = state.data.industry || "";
  
  const recommendedModules = INDUSTRY_RECOMMENDED[industry] || [];

  const toggleModule = (moduleId: string) => {
    const updated = selectedModules.includes(moduleId)
      ? selectedModules.filter((m) => m !== moduleId)
      : [...selectedModules, moduleId];
    updateData({ selectedModules: updated });
  };

  const hasModules = (state.data.solutionTypes || []).includes("module");

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-glow">
          <Puzzle className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Quels modules souhaitez-vous?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Sélectionnez les outils qui correspondent à vos besoins. 
          {recommendedModules.length > 0 && " Les modules recommandés pour votre industrie sont mis en évidence."}
        </p>
      </div>

      {/* Selected Count */}
      {selectedModules.length > 0 && (
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {selectedModules.length} module{selectedModules.length > 1 ? "s" : ""} sélectionné{selectedModules.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Modules by Category */}
      <div className="space-y-6">
        {Object.entries(groupedModules).map(([category, modules], categoryIndex) => {
          const CategoryIcon = CATEGORY_ICONS[category] || Puzzle;
          
          return (
            <div 
              key={category} 
              className="space-y-3 animate-fade-in"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CategoryIcon className="w-5 h-5 text-primary" />
                {CATEGORY_LABELS[category] || category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {modules.map((module, index) => {
                  const isSelected = selectedModules.includes(module.id);
                  const isRecommended = recommendedModules.includes(module.id);
                  const ModuleIcon = MODULE_ICONS[module.id] || Puzzle;

                  return (
                    <button
                      key={module.id}
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className={cn(
                        "group relative p-4 rounded-xl text-left transition-all duration-300",
                        "border-2 animate-slide-up",
                        isSelected
                          ? "bg-primary/10 border-primary shadow-elegant"
                          : isRecommended
                          ? "bg-accent/5 border-accent/30 hover:border-accent"
                          : "bg-card border-border hover:border-primary/50"
                      )}
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s`, animationFillMode: "both" }}
                    >
                      {/* Recommended Badge */}
                      {isRecommended && !isSelected && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-2 -right-2 text-xs bg-accent text-white"
                        >
                          Recommandé
                        </Badge>
                      )}

                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0",
                            isSelected
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          )}
                        >
                          <ModuleIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={cn("font-semibold truncate", isSelected && "text-primary")}>
                              {module.label}
                            </h4>
                            {isSelected && (
                              <Check className="w-4 h-4 text-primary shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {module.description}
                          </p>
                          <p className="text-xs font-medium text-primary mt-1">
                            {module.price}$/mois
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <QuizNavigation canContinue={!hasModules || selectedModules.length > 0} />
    </div>
  );
};
