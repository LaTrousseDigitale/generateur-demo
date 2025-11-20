import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DemoPreview } from "./DemoPreview";
import { FullDemoView } from "./FullDemoView";
import { QuoteModal } from "./QuoteModal";
import { ArrowRight, ArrowLeft, Layout } from "lucide-react";
import { QuestionnaireData } from "@/types/questionnaire";
import { Section1General } from "./questionnaire/Section1General";
import { Section2SolutionType } from "./questionnaire/Section2SolutionType";
import { Section3Website } from "./questionnaire/Section3Website";
import { Section4Portal } from "./questionnaire/Section4Portal";
import { Section5Modules } from "./questionnaire/Section5Modules";
import { ColorCustomizer } from "./ColorCustomizer";
import { LogoUploader } from "./LogoUploader";
import { Section7Domain } from "./questionnaire/Section7Domain";
import { Section8Finances } from "./questionnaire/Section8Finances";
import { Section9Summary } from "./questionnaire/Section9Summary";

export type ServiceType = "portal" | "website" | "module" | null;

export interface DemoConfig {
  serviceType: ServiceType;
  features: string[];
  industry: string;
  companySize: string;
  mainObjectives: string[];
  budget: string;
  timeline: string;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  logo: string | null;
  companyName: string;
}

const TOTAL_STEPS = 10;

// Convert QuestionnaireData to DemoConfig
const convertToDemoConfig = (data: QuestionnaireData): DemoConfig => {
  let serviceType: ServiceType = null;
  if ((data.solutionTypes || []).includes("website")) {
    serviceType = "website";
  } else if ((data.solutionTypes || []).includes("portal")) {
    serviceType = "portal";
  } else if ((data.solutionTypes || []).includes("module")) {
    serviceType = "module";
  }

  const features = [
    ...(data.websitePages || []),
    ...(data.websiteSections || []),
    ...(data.ecommerceNeeds || []),
    ...(data.portalClientFeatures || []),
    ...(data.portalEmployeeFeatures || []),
    ...(data.portalHRFeatures || []),
    ...(data.selectedModules || []),
  ];

  return {
    serviceType,
    features,
    industry: data.industry,
    companySize: data.portalUsers || "small",
    mainObjectives: data.mainObjectives || [],
    budget: data.monthlyBudget || "medium",
    timeline: data.startDate || "flexible",
    primaryColor: data.primaryColor,
    accentColor: data.accentColor,
    secondaryColor: data.secondaryColor,
    logo: data.logo,
    companyName: data.companyName,
  };
};

export const DemoGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(() => {
    const saved = localStorage.getItem("questionnaire-data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      companyName: "",
      industry: "",
      mainObjectives: [],
      startDate: "",
      financing: "",
      solutionTypes: [],
      websiteType: null,
      websitePages: [],
      websiteContent: [],
      websiteSections: [],
      ecommerceProductCount: "",
      ecommerceExistingPlatform: "",
      ecommerceNeeds: [],
      ecommercePlatform: "",
      organisationalPages: [],
      organisationalFeatures: [],
      portalType: null,
      portalUsers: "",
      portalRoles: "",
      portalClientFeatures: [],
      portalEmployeeFeatures: [],
      portalHRFeatures: [],
      selectedModules: [],
      customModule: "",
      logo: null,
      primaryColor: "#1c61fe",
      accentColor: "#ff6b3d",
      secondaryColor: "#fbca58",
      typography: "",
      domainType: "",
      hostingPreference: "",
      paymentMode: null,
      financingTerm: "",
      monthlyBudget: "",
      otherNeeds: "",
      contactMethod: "",
      serviceType: null,
      features: [],
      companySize: "",
      budget: "",
      timeline: "",
    };
  });
  const [showFinalDemo, setShowFinalDemo] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Auto-save
  useEffect(() => {
    localStorage.setItem("questionnaire-data", JSON.stringify(questionnaireData));
  }, [questionnaireData]);

  const demoConfig = convertToDemoConfig(questionnaireData);
  const progress = (currentStep / TOTAL_STEPS) * 100;

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setQuestionnaireData({ ...questionnaireData, ...updates });
  };

  // Navigation logic with conditional sections
  const getNextSection = (current: number) => {
    const hasWebsite = (questionnaireData.solutionTypes || []).includes("website");
    const hasPortal = (questionnaireData.solutionTypes || []).includes("portal");

    if (current === 2 && !hasWebsite) return 4;
    if (current === 3 && !hasPortal) return 5;
    return current + 1;
  };

  const getPreviousSection = (current: number) => {
    const hasWebsite = (questionnaireData.solutionTypes || []).includes("website");
    const hasPortal = (questionnaireData.solutionTypes || []).includes("portal");

    if (current === 5 && !hasPortal) return 3;
    if (current === 4 && !hasWebsite) return 2;
    return current - 1;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return questionnaireData.companyName && questionnaireData.industry && questionnaireData.startDate && questionnaireData.financing;
      case 2:
        return questionnaireData.solutionTypes && questionnaireData.solutionTypes.length > 0;
      case 3:
        if (!(questionnaireData.solutionTypes || []).includes("website")) return true;
        return questionnaireData.websiteType;
      case 4:
        if (!(questionnaireData.solutionTypes || []).includes("portal")) return true;
        return questionnaireData.portalType && questionnaireData.portalUsers && questionnaireData.portalRoles;
      case 6:
        return questionnaireData.companyName;
      case 7:
        return questionnaireData.domainType && questionnaireData.hostingPreference;
      case 8:
        return questionnaireData.paymentMode;
      case 9:
        return questionnaireData.contactMethod;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      const nextSection = getNextSection(currentStep);
      setCurrentStep(nextSection);
    } else {
      setShowFinalDemo(true);
      setTimeout(() => setShowQuoteModal(true), 1000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevSection = getPreviousSection(currentStep);
      setCurrentStep(prevSection);
    }
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

  const getSectionTitle = () => {
    const titles = [
      "Informations Générales",
      "Type de Solution",
      "Configuration Site Web",
      "Configuration Portail",
      "Modules Additionnels",
      "Identité de Marque",
      "Domaine & Hébergement",
      "Options Financières",
      "Résumé et Contact",
      "Aperçu Final",
    ];
    return titles[currentStep - 1];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layout className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Générateur de Démos Personnalisées
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Créez votre démo en répondant à quelques questions
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {getSectionTitle()} - Étape {currentStep} sur {TOTAL_STEPS}
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
              {currentStep === 1 && <Section1General data={questionnaireData} onChange={updateData} />}
              {currentStep === 2 && <Section2SolutionType data={questionnaireData} onChange={updateData} />}
              {currentStep === 3 && <Section3Website data={questionnaireData} onChange={updateData} />}
              {currentStep === 4 && <Section4Portal data={questionnaireData} onChange={updateData} />}
              {currentStep === 5 && (
                <Section5Modules
                  data={questionnaireData}
                  onChange={updateData}
                  isModuleSelected={(questionnaireData.solutionTypes || []).includes("module")}
                />
              )}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <LogoUploader
                    logo={questionnaireData.logo}
                    companyName={questionnaireData.companyName}
                    onLogoChange={(logo) => updateData({ logo })}
                    onCompanyNameChange={(name) => updateData({ companyName: name })}
                  />
                  <ColorCustomizer
                    primaryColor={questionnaireData.primaryColor}
                    accentColor={questionnaireData.accentColor}
                    secondaryColor={questionnaireData.secondaryColor}
                    onColorChange={updateData}
                  />
                </div>
              )}
              {currentStep === 7 && <Section7Domain data={questionnaireData} onChange={updateData} />}
              {currentStep === 8 && <Section8Finances data={questionnaireData} onChange={updateData} />}
              {currentStep === 9 && <Section9Summary data={questionnaireData} onChange={updateData} />}
              {currentStep === 10 && (
                <div className="text-center py-12 space-y-4">
                  <h3 className="text-2xl font-bold text-primary">🎉 Prêt à découvrir votre démo !</h3>
                  <p className="text-muted-foreground text-lg">
                    Cliquez sur "Voir ma démo" pour visualiser votre solution personnalisée
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === TOTAL_STEPS ? "Voir ma démo" : "Suivant"}
                {currentStep < TOTAL_STEPS && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </Card>

          {/* Right Panel - Live Preview */}
          <div className="relative">
            <div className="sticky top-8">
              <DemoPreview config={demoConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
