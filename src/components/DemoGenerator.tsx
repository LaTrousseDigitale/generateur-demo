import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionnaireStep } from "./QuestionnaireStep";
import { DemoPreview } from "./DemoPreview";
import { ColorCustomizer } from "./ColorCustomizer";
import { LogoUploader } from "./LogoUploader";
import { FullDemoView } from "./FullDemoView";
import { ArrowRight, ArrowLeft, Layout } from "lucide-react";

export type ServiceType = "portal" | "website" | "module" | null;
export type PortalFeature = "crm" | "projects" | "hr" | "support";
export type WebsiteType = "vitrine" | "ecommerce" | "careers" | "booking";
export type ModuleType = "calculator" | "project-manager" | "hr-dashboard" | "it-support";

export interface DemoConfig {
  serviceType: ServiceType;
  features: string[];
  industry: string;
  companySize: string;
  mainChallenge: string;
  timeline: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  logo: string | null;
  companyName: string;
}

const TOTAL_STEPS = 7;

export const DemoGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [demoConfig, setDemoConfig] = useState<DemoConfig>({
    serviceType: null,
    features: [],
    industry: "",
    companySize: "",
    mainChallenge: "",
    timeline: "",
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
            <Layout className="w-8 h-8 text-primary" />
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
                    { value: "architecture", label: "Architecture d'Entreprise", description: "Conception, planification, gestion de projets architecturaux" },
                    { value: "arts-scene", label: "Arts de la Scène", description: "Spectacles, événements culturels, gestion artistique" },
                    { value: "construction", label: "Construction", description: "Entrepreneurs, rénovation, gestion de chantiers" },
                    { value: "consulting", label: "Consulting", description: "Conseil stratégique, transformation, expertise" },
                    { value: "commerce", label: "E-commerce", description: "Boutiques en ligne, vente numérique, marketplace" },
                    { value: "education", label: "Éducation", description: "Écoles, formation, cours en ligne" },
                    { value: "evenementiel", label: "Événementiel", description: "Organisation d'événements, coordination, logistique" },
                    { value: "finances", label: "Finances", description: "Services financiers, comptabilité, investissement" },
                    { value: "immobilier", label: "Immobilier", description: "Agences, courtiers, gestion immobilière" },
                    { value: "restauration", label: "Restauration", description: "Restaurants, traiteurs, cafés" },
                    { value: "sante", label: "Santé et Bien-être", description: "Cliniques, centres de soins, thérapeutes" },
                    { value: "services-pro", label: "Services Professionnels", description: "Consultation, comptabilité, services juridiques" },
                    { value: "technologie", label: "Technologie", description: "Logiciels, IT, solutions numériques" },
                    { value: "transports", label: "Transports", description: "Logistique, livraison, gestion de flotte" },
                    { value: "pieces-auto", label: "Vente de Pièces Automobiles", description: "Commerce de pièces, inventaire, distribution" },
                  ]}
                  selectedValue={demoConfig.industry}
                  onSelect={(value) => updateConfig({ industry: value })}
                />
              )}

              {currentStep === 4 && (
                <QuestionnaireStep
                  step={4}
                  title="Quelle est la taille de votre entreprise ?"
                  options={[
                    { value: "solo", label: "Travailleur Autonome", description: "1 personne, gestion personnelle" },
                    { value: "petite", label: "Petite Équipe", description: "2-10 employés, structure simple" },
                    { value: "moyenne", label: "Entreprise Moyenne", description: "11-50 employés, départements établis" },
                    { value: "grande", label: "Grande Entreprise", description: "50+ employés, structure complexe" },
                  ]}
                  selectedValue={demoConfig.companySize}
                  onSelect={(value) => updateConfig({ companySize: value })}
                />
              )}

              {currentStep === 5 && (
                <QuestionnaireStep
                  step={5}
                  title="Quel est votre principal défi actuellement ?"
                  options={[
                    { value: "organisation", label: "Organisation & Processus", description: "Besoin de structure et d'efficacité" },
                    { value: "croissance", label: "Croissance Rapide", description: "Gérer l'expansion et la scalabilité" },
                    { value: "digital", label: "Transformation Digitale", description: "Moderniser les outils et pratiques" },
                    { value: "client", label: "Expérience Client", description: "Améliorer la satisfaction et fidélisation" },
                    { value: "couts", label: "Optimisation des Coûts", description: "Réduire les dépenses et maximiser ROI" },
                  ]}
                  selectedValue={demoConfig.mainChallenge}
                  onSelect={(value) => updateConfig({ mainChallenge: value })}
                />
              )}

              {currentStep === 6 && (
                <QuestionnaireStep
                  step={6}
                  title="Dans quel délai souhaitez-vous implémenter ?"
                  options={[
                    { value: "urgent", label: "Urgent (1-2 semaines)", description: "Besoin immédiat, démarrage rapide" },
                    { value: "court", label: "Court Terme (1 mois)", description: "Implémentation dans le mois" },
                    { value: "moyen", label: "Moyen Terme (2-3 mois)", description: "Planification détaillée" },
                    { value: "long", label: "Long Terme (3+ mois)", description: "Projet stratégique, phase de réflexion" },
                  ]}
                  selectedValue={demoConfig.timeline}
                  onSelect={(value) => updateConfig({ timeline: value })}
                />
              )}

              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        7
                      </div>
                      <h2 className="text-2xl font-bold">Personnalisation Visuelle</h2>
                    </div>
                    <p className="text-muted-foreground ml-10">
                      Dernière étape : ajoutez votre identité visuelle
                    </p>
                  </div>
                  
                  <div className="ml-10 space-y-8">
                    <LogoUploader
                      logo={demoConfig.logo}
                      companyName={demoConfig.companyName}
                      onLogoChange={(logo) => updateConfig({ logo })}
                      onCompanyNameChange={(name) => updateConfig({ companyName: name })}
                    />
                    
                    <div className="pt-4 border-t">
                      <ColorCustomizer
                        primaryColor={demoConfig.primaryColor}
                        accentColor={demoConfig.accentColor}
                        secondaryColor={demoConfig.secondaryColor}
                        onColorChange={(colors) => updateConfig(colors)}
                      />
                    </div>
                  </div>
                </div>
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
                    (currentStep === 3 && !demoConfig.industry) ||
                    (currentStep === 4 && !demoConfig.companySize) ||
                    (currentStep === 5 && !demoConfig.mainChallenge) ||
                    (currentStep === 6 && !demoConfig.timeline)
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
