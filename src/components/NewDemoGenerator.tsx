import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import { QuestionnaireData } from "@/types/questionnaire";
import { QuestionnaireModal } from "./questionnaire/QuestionnaireModal";
import { FullDemoView } from "./FullDemoView";
import { QuoteModal } from "./QuoteModal";
import { DemoConfig } from "./DemoGenerator";

// Convert QuestionnaireData to DemoConfig for backward compatibility
const convertToDemoConfig = (data: QuestionnaireData): DemoConfig => {
  // Determine primary service type
  let serviceType: "portal" | "website" | "module" | null = null;
  if ((data.solutionTypes || []).includes("website")) {
    serviceType = "website";
  } else if ((data.solutionTypes || []).includes("portal")) {
    serviceType = "portal";
  } else if ((data.solutionTypes || []).includes("module")) {
    serviceType = "module";
  }

  // Combine all features
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

export const NewDemoGenerator = () => {
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(() => {
    // Try to load saved data from localStorage
    const saved = localStorage.getItem("questionnaire-data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // If parsing fails, return default
      }
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
      // Legacy fields
      serviceType: null,
      features: [],
      companySize: "",
      budget: "",
      timeline: "",
    };
  });

  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const updateQuestionnaireData = (updates: Partial<QuestionnaireData>) => {
    setQuestionnaireData((prev) => ({ ...prev, ...updates }));
  };

  const handleQuestionnaireComplete = () => {
    setShowQuestionnaire(false);
    setShowDemo(true);
    setTimeout(() => setShowQuote(true), 1000);
  };

  const demoConfig = convertToDemoConfig(questionnaireData);

  if (showDemo) {
    return (
      <>
        <FullDemoView config={demoConfig} onBack={() => {
          setShowDemo(false);
          setShowQuestionnaire(true);
        }} />
        <QuoteModal open={showQuote} onOpenChange={setShowQuote} config={demoConfig} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-8 text-center animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Layout className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Générateur de Démos Personnalisées
          </h1>
        </div>
        <p className="text-muted-foreground text-lg mb-8">
          Découvrez votre solution idéale en quelques questions
        </p>

        {!showQuestionnaire && (
          <Button size="lg" onClick={() => setShowQuestionnaire(true)} className="shadow-elegant">
            Commencer le questionnaire
          </Button>
        )}
      </div>

      {/* Preview Demo in background (blurred when questionnaire is active) */}
      {showQuestionnaire && (
        <div className={`${isMinimized ? "" : "blur-sm opacity-50"} transition-all duration-300`}>
          <div className="container mx-auto px-4">
            <FullDemoView config={demoConfig} onBack={() => {}} hideBackButton />
          </div>
        </div>
      )}

      {/* Questionnaire Modal */}
      {showQuestionnaire && (
        <QuestionnaireModal
          data={questionnaireData}
          onChange={updateQuestionnaireData}
          onComplete={handleQuestionnaireComplete}
          onMinimize={() => setIsMinimized(!isMinimized)}
          isMinimized={isMinimized}
        />
      )}
    </div>
  );
};
