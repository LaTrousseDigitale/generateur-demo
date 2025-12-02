import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MODULES } from "@/types/questionnaire";
import { Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Section5Props {
  data: any;
  onChange: (updates: any) => void;
  isModuleSelected: boolean;
}

// Modules recommandés par industrie
const INDUSTRY_RECOMMENDED_MODULES: Record<string, string[]> = {
  auto: ["calculateur-pdf", "crm-lite", "tickets"],
  restauration: ["rendez-vous", "crm-lite", "kpi-dashboard"],
  commerce: ["crm-lite", "kpi-dashboard", "tickets"],
  sante: ["rendez-vous", "base-connaissances", "signatures"],
  construction: ["projets-lite", "calculateur-pdf", "signatures"],
  education: ["base-connaissances", "onboarding", "kpi-dashboard"],
  obnl: ["crm-lite", "base-connaissances", "kpi-dashboard"],
  services: ["rendez-vous", "crm-lite", "calculateur-pdf"],
  architecture: ["projets-lite", "calculateur-pdf", "signatures"],
  tech: ["tickets", "base-connaissances", "projets-lite"],
  transport: ["projets-lite", "kpi-dashboard", "chat-interne"],
  "arts-scene": ["rendez-vous", "crm-lite", "kpi-dashboard"],
};

// Descriptions personnalisées par industrie
const INDUSTRY_MODULE_DESCRIPTIONS: Record<string, Record<string, string>> = {
  auto: {
    "calculateur-pdf": "Générez des devis pour pièces et main d'œuvre automatiquement",
    "crm-lite": "Suivez vos clients particuliers et garages partenaires",
    "tickets": "Gérez les demandes de garantie et réclamations",
  },
  restauration: {
    "rendez-vous": "Système de réservation de tables en ligne",
    "crm-lite": "Fidélisez vos clients réguliers et gérez les événements",
    "kpi-dashboard": "Suivez vos ventes, réservations et performance",
  },
  sante: {
    "rendez-vous": "Prise de rendez-vous patients avec rappels automatiques",
    "base-connaissances": "Documentation médicale et protocoles internes",
    "signatures": "Consentements et formulaires patients signés électroniquement",
  },
  construction: {
    "projets-lite": "Suivez vos chantiers, tâches et sous-traitants",
    "calculateur-pdf": "Générez des soumissions détaillées en PDF",
    "signatures": "Contrats et bons de commande signés électroniquement",
  },
  education: {
    "base-connaissances": "Cours, documentation et ressources pédagogiques",
    "onboarding": "Parcours d'inscription et accueil des nouveaux étudiants",
    "kpi-dashboard": "Suivez les inscriptions, présences et résultats",
  },
  obnl: {
    "crm-lite": "Gérez vos donateurs, membres et bénévoles",
    "base-connaissances": "Ressources et documentation pour bénévoles",
    "kpi-dashboard": "Suivez les dons, bénévolat et impact",
  },
};

export const Section5Modules = ({ data, onChange, isModuleSelected }: Section5Props) => {
  const recommendedModules = INDUSTRY_RECOMMENDED_MODULES[data.industry] || [];
  const industryDescriptions = INDUSTRY_MODULE_DESCRIPTIONS[data.industry] || {};

  const toggleModule = (moduleId: string) => {
    const current = data.selectedModules || [];
    const updated = current.includes(moduleId)
      ? current.filter((m: string) => m !== moduleId)
      : [...current, moduleId];
    onChange({ selectedModules: updated });
  };

  // Séparer les modules recommandés des autres
  const sortedModules = [...MODULES].sort((a, b) => {
    const aRecommended = recommendedModules.includes(a.id);
    const bRecommended = recommendedModules.includes(b.id);
    if (aRecommended && !bRecommended) return -1;
    if (!aRecommended && bRecommended) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Modules additionnels
        </h3>
        <p className="text-sm text-muted-foreground">
          {isModuleSelected
            ? "Sélectionnez les modules qui vous intéressent"
            : "Découvrez nos modules pour enrichir votre solution"}
        </p>
      </div>

      {/* Section modules recommandés */}
      {recommendedModules.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="font-semibold text-sm">Recommandés pour votre industrie</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Ces modules sont particulièrement utiles pour votre secteur d'activité
          </p>
        </Card>
      )}

      <div className="grid gap-3">
        {sortedModules.map((module) => {
          const isSelected = (data.selectedModules || []).includes(module.id);
          const isRecommended = recommendedModules.includes(module.id);
          const customDescription = industryDescriptions[module.id];

          return (
            <Card
              key={module.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected 
                  ? "border-primary border-2 bg-primary/5" 
                  : isRecommended 
                    ? "border-primary/50 bg-primary/5" 
                    : "border-border hover:border-primary/30"
              }`}
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={module.id}
                  checked={isSelected}
                  onCheckedChange={() => toggleModule(module.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Label htmlFor={module.id} className="font-semibold cursor-pointer">
                      {module.label}
                    </Label>
                    {isRecommended && (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Recommandé
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {customDescription || module.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom module */}
      <div className="space-y-2">
        <Label htmlFor="custom-module">Autre module personnalisé</Label>
        <Textarea
          id="custom-module"
          value={data.customModule || ""}
          onChange={(e) => onChange({ customModule: e.target.value })}
          placeholder="Décrivez un module spécifique dont vous avez besoin..."
          rows={3}
        />
      </div>
    </div>
  );
};
