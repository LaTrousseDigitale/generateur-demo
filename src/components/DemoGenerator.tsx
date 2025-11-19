import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionnaireStep } from "./QuestionnaireStep";
import { DemoPreview } from "./DemoPreview";
import { ColorCustomizer } from "./ColorCustomizer";
import { LogoUploader } from "./LogoUploader";
import { FullDemoView } from "./FullDemoView";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

export type ServiceType = "portal" | "website" | "module" | null;
export type PortalFeature = "crm" | "projects" | "hr" | "support";
export type WebsiteType = "vitrine" | "ecommerce" | "careers" | "booking";
export type ModuleType = "calculator" | "project-manager" | "hr-dashboard" | "it-support";

export interface DemoConfig {
  serviceType: ServiceType;
  features: string[];
  industry: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  logo: string | null;
  companyName: string;
}

const TOTAL_STEPS = 5;

export const DemoGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [demoConfig, setDemoConfig] = useState<DemoConfig>({
    serviceType: null,
    features: [],
    industry: "",
    primaryColor: "#1c61fe",
    accentColor: "#ff6b3d",
    secondaryColor: "#fbca58",
    logo: null,
    companyName: "Votre Entreprise",
  });
  const [showFinalDemo, setShowFinalDemo] = useState(false);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finaliser - afficher la démo complète
      setShowFinalDemo(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateConfig = (updates: Partial<DemoConfig>) => {
    setDemoConfig({ ...demoConfig, ...updates });
  };

  if (showFinalDemo) {
    return <FullDemoView config={demoConfig} onBack={() => setShowFinalDemo(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Générateur de Démos
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Créez votre démo personnalisée en quelques clics
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Étape {currentStep} sur {TOTAL_STEPS}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Questionnaire */}
          <Card className="p-6 shadow-elegant animate-slide-up">
            <div className="space-y-6">
              {currentStep === 1 && (
                <QuestionnaireStep
                  step={1}
                  title="Quel type de service souhaitez-vous découvrir ?"
                  options={[
                    {
                      value: "portal",
                      label: "Portail d'Entreprise",
                      description: "CRM, projets, RH et support intégrés",
                    },
                    {
                      value: "website",
                      label: "Solutions Web",
                      description: "Sites vitrines, e-commerce, carrières",
                    },
                    {
                      value: "module",
                      label: "Modules Complémentaires",
                      description: "Calculatrices, gestionnaires, tableaux de bord",
                    },
                  ]}
                  selectedValue={demoConfig.serviceType}
                  onSelect={(value) => updateConfig({ serviceType: value as ServiceType, features: [] })}
                />
              )}

              {currentStep === 2 && (
                <QuestionnaireStep
                  step={2}
                  title="Quelles fonctionnalités vous intéressent ?"
                  multiSelect
                  options={
                    demoConfig.serviceType === "portal"
                      ? [
                          { value: "crm", label: "CRM", description: "Gestion des clients" },
                          { value: "projects", label: "Projets", description: "Collaboration et tâches" },
                          { value: "hr", label: "RH", description: "Gestion des employés" },
                          { value: "support", label: "Support", description: "Tickets et documentation" },
                        ]
                      : demoConfig.serviceType === "website"
                      ? [
                          { value: "vitrine", label: "Site Vitrine", description: "Design moderne et SEO" },
                          { value: "ecommerce", label: "E-commerce", description: "Boutique en ligne" },
                          { value: "careers", label: "Carrières", description: "Recrutement" },
                          { value: "booking", label: "Réservations", description: "Prise de rendez-vous" },
                        ]
                      : [
                          { value: "calculator", label: "Calculatrice", description: "Soumissions automatiques" },
                          { value: "project-manager", label: "Gestionnaire", description: "Projets et temps" },
                          { value: "hr-dashboard", label: "Tableau RH", description: "Évaluations et onboarding" },
                          { value: "it-support", label: "Support TI", description: "Centre d'assistance" },
                        ]
                  }
                  selectedValues={demoConfig.features}
                  onSelectMultiple={(values) => updateConfig({ features: values })}
                />
              )}

              {currentStep === 3 && (
                <QuestionnaireStep
                  step={3}
                  title="Quelle est votre industrie ?"
                  options={[
                    { value: "construction", label: "Construction", description: "Entrepreneurs, rénovation, gestion de chantiers" },
                    { value: "services-pro", label: "Services Professionnels", description: "Consultation, comptabilité, services juridiques" },
                    { value: "sante", label: "Santé & Bien-être", description: "Cliniques, centres de soins, thérapeutes" },
                    { value: "commerce", label: "Commerce de Détail", description: "Boutiques, e-commerce, distribution" },
                    { value: "technologie", label: "Technologie", description: "Logiciels, IT, solutions numériques" },
                    { value: "education", label: "Éducation", description: "Écoles, formation, cours en ligne" },
                    { value: "restauration", label: "Restauration", description: "Restaurants, traiteurs, cafés" },
                    { value: "immobilier", label: "Immobilier", description: "Agences, courtiers, gestion immobilière" },
                  ]}
                  selectedValue={demoConfig.industry}
                  onSelect={(value) => updateConfig({ industry: value })}
                />
              )}

              {currentStep === 4 && (
                <ColorCustomizer
                  primaryColor={demoConfig.primaryColor}
                  accentColor={demoConfig.accentColor}
                  secondaryColor={demoConfig.secondaryColor}
                  onColorChange={(colors) => updateConfig(colors)}
                />
              )}

              {currentStep === 5 && (
                <LogoUploader
                  logo={demoConfig.logo}
                  companyName={demoConfig.companyName}
                  onLogoChange={(logo) => updateConfig({ logo })}
                  onCompanyNameChange={(name) => updateConfig({ companyName: name })}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && !demoConfig.serviceType) ||
                    (currentStep === 2 && demoConfig.features.length === 0) ||
                    (currentStep === 3 && !demoConfig.industry)
                  }
                  className="flex-1"
                >
                  {currentStep === TOTAL_STEPS ? "Finaliser" : "Suivant"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <DemoPreview config={demoConfig} />
          </div>
        </div>
      </div>
    </div>
  );
};
