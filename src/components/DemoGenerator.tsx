import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionnaireStep } from "./QuestionnaireStep";
import { DemoPreview } from "./DemoPreview";
import { ColorCustomizer } from "./ColorCustomizer";
import { LogoUploader } from "./LogoUploader";
import { FullDemoView } from "./FullDemoView";
import { QuoteModal } from "./QuoteModal";
import { ArrowRight, ArrowLeft, Layout } from "lucide-react";

export type ServiceType = "portal" | "website" | "module" | null;

export interface DemoConfig {
  serviceType: ServiceType;
  features: string[];
  industry: string;
  companySize: string;
  mainObjective: string;
  budget: string;
  timeline: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  logo: string | null;
  companyName: string;
}

const TOTAL_STEPS = 6;

export const DemoGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [demoConfig, setDemoConfig] = useState<DemoConfig>({
    serviceType: null,
    features: [],
    industry: "",
    companySize: "",
    mainObjective: "",
    budget: "",
    timeline: "",
    primaryColor: "#1c61fe",
    accentColor: "#ff6b3d",
    secondaryColor: "#fbca58",
    logo: null,
    companyName: "Votre Entreprise",
  });
  const [showFinalDemo, setShowFinalDemo] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finaliser - afficher la démo complète et le modal de devis
      setShowFinalDemo(true);
      setTimeout(() => setShowQuoteModal(true), 1000);
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
    return (
      <>
        <FullDemoView config={demoConfig} onBack={() => setShowFinalDemo(false)} />
        <QuoteModal 
          open={showQuoteModal} 
          onOpenChange={setShowQuoteModal}
          config={demoConfig}
        />
      </>
    );
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
                  title="Quel service souhaitez-vous découvrir?"
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
                    { value: "technologie", label: "Technologie", description: "Développement logiciel, IT, startups tech" },
                    { value: "transport", label: "Transport et Logistique", description: "Expédition, livraison, gestion de flotte" },
                    { value: "autre", label: "Autre", description: "Autre secteur d'activité" },
                  ]}
                  selectedValue={demoConfig.industry}
                  onSelect={(value) => updateConfig({ industry: value })}
                />
              )}

              {currentStep === 3 && (
                <QuestionnaireStep
                  step={3}
                  title="Quelle est la taille de votre organisation ?"
                  options={[
                    { value: "solo", label: "Travailleur Autonome", description: "1 personne" },
                    { value: "small", label: "Petite Entreprise", description: "2-10 employés" },
                    { value: "medium", label: "Entreprise Moyenne", description: "11-50 employés" },
                    { value: "large", label: "Grande Entreprise", description: "50+ employés" },
                  ]}
                  selectedValue={demoConfig.companySize}
                  onSelect={(value) => updateConfig({ companySize: value })}
                />
              )}

              {currentStep === 4 && (
                <QuestionnaireStep
                  step={4}
                  title="Quel est votre objectif principal avec ce projet ?"
                  options={[
                    { value: "automation", label: "Automatiser les Processus", description: "Réduire le travail manuel et gagner du temps" },
                    { value: "growth", label: "Accélérer la Croissance", description: "Augmenter les revenus et acquérir plus de clients" },
                    { value: "efficiency", label: "Améliorer l'Efficacité", description: "Optimiser les opérations et la productivité" },
                    { value: "experience", label: "Expérience Utilisateur", description: "Offrir une meilleure expérience client/employé" },
                    { value: "visibility", label: "Augmenter la Visibilité", description: "Renforcer la présence en ligne et la notoriété" },
                  ]}
                  selectedValue={demoConfig.mainObjective}
                  onSelect={(value) => updateConfig({ mainObjective: value })}
                />
              )}

              {currentStep === 5 && (
                <QuestionnaireStep
                  step={5}
                  title="Dans quel délai souhaitez-vous lancer ?"
                  options={[
                    { value: "urgent", label: "Très Urgent (2-4 semaines)", description: "Besoin immédiat, démarrage rapide prioritaire" },
                    { value: "normal", label: "Standard (2-3 mois)", description: "Timeline normale avec planification" },
                    { value: "flexible", label: "Flexible (3+ mois)", description: "Pas de date limite précise" },
                  ]}
                  selectedValue={demoConfig.timeline}
                  onSelect={(value) => updateConfig({ timeline: value })}
                />
              )}

              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      6
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
                    (currentStep === 2 && !demoConfig.industry) ||
                    (currentStep === 3 && !demoConfig.companySize) ||
                    (currentStep === 4 && !demoConfig.mainObjective) ||
                    (currentStep === 5 && !demoConfig.timeline)
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
