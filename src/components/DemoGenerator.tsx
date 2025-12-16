import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DemoPreview } from "./DemoPreview";
import { FullDemoView } from "./FullDemoView";
import { QuoteModal } from "./QuoteModal";
import { ArrowRight, ArrowLeft, Layout, RotateCcw, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { QuestionnaireData } from "@/types/questionnaire";
import { Section1General } from "./questionnaire/Section1General";
import { Section2SolutionType } from "./questionnaire/Section2SolutionType";
import { Section3Website } from "./questionnaire/Section3Website";
import { Section4Portal } from "./questionnaire/Section4Portal";
import { Section5Modules } from "./questionnaire/Section5Modules";
import { Section6Canva } from "./questionnaire/Section6Canva";
import { ColorCustomizer } from "./ColorCustomizer";
import { LogoUploader } from "./LogoUploader";
import { Section7Domain } from "./questionnaire/Section7Domain";
import { Section8Finances } from "./questionnaire/Section8Finances";
import { Section9Summary } from "./questionnaire/Section9Summary";
import { useQuoteSubmission } from "@/hooks/useQuoteSubmission";
import type { DemoTheme } from "@/types/demoThemes";

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
  // Theme/Style
  theme?: DemoTheme;
  // Website types
  websiteType?: "vitrine" | "ecommerce" | "organisationnel" | null;
  websitePages?: string[];
  websiteSections?: string[];
  // Portal types
  portalType?: "client" | "employes" | "rh" | "mixte" | null;
  portalUsers?: string;
  portalRoles?: string;
  portalClientFeatures?: string[];
  portalEmployeeFeatures?: string[];
  portalHRFeatures?: string[];
  // Industry-specific features
  ecommerceNeeds?: string[];
  autoCompatibility?: string[];
  autoSearchFeatures?: string[];
  autoProductType?: string;
  autoCustomerType?: string;
  autoCurrentSales?: string;
  restaurantFeatures?: string[];
  restaurantType?: string;
  restaurantSalesType?: string;
  retailFeatures?: string[];
  retailType?: string;
  retailProductTypes?: string;
  // Modules
  selectedModules?: string[];
}
const TOTAL_STEPS = 11;

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
  const features = [...(data.websitePages || []), ...(data.websiteSections || []), ...(data.ecommerceNeeds || []), ...(data.portalClientFeatures || []), ...(data.portalEmployeeFeatures || []), ...(data.portalHRFeatures || []), ...(data.selectedModules || [])];
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
    // Website type
    websiteType: data.websiteType,
    websitePages: data.websitePages,
    websiteSections: data.websiteSections,
    // Portal type
    portalType: data.portalType,
    portalUsers: data.portalUsers,
    portalRoles: data.portalRoles,
    portalClientFeatures: data.portalClientFeatures,
    portalEmployeeFeatures: data.portalEmployeeFeatures,
    portalHRFeatures: data.portalHRFeatures,
    // Industry-specific features
    ecommerceNeeds: data.ecommerceNeeds,
    autoCompatibility: data.autoCompatibility,
    autoSearchFeatures: data.autoSearchFeatures,
    autoProductType: data.autoProductType,
    autoCustomerType: data.autoCustomerType,
    autoCurrentSales: data.autoCurrentSales,
    restaurantFeatures: data.restaurantFeatures,
    restaurantType: data.restaurantType,
    restaurantSalesType: data.restaurantSalesType,
    retailFeatures: data.retailFeatures,
    retailType: data.retailType,
    retailProductTypes: data.retailProductTypes,
    // Modules
    selectedModules: data.selectedModules
  };
};
export const DemoGenerator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    submitQuote
  } = useQuoteSubmission();
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
      autoCompatibility: [],
      autoSearchFeatures: [],
      autoProductType: "",
      autoCustomerType: "",
      autoCurrentSales: "",
      restaurantFeatures: [],
      restaurantType: "",
      restaurantSalesType: "",
      retailFeatures: [],
      retailType: "",
      retailProductTypes: "",
      healthCompliance: [],
      educationFeatures: [],
      nonprofitFeatures: [],
      portalType: null,
      portalUsers: "",
      portalRoles: "",
      portalClientFeatures: [],
      portalEmployeeFeatures: [],
      portalHRFeatures: [],
      selectedModules: [],
      customModule: "",
      canvaServices: [],
      canvaQuantity: "",
      canvaFrequency: "",
      canvaDeadline: "",
      canvaSpecifications: "",
      infographicSupports: [],
      canvaCustomQuantity: "",
      canvaCustomDesignTypes: "",
      canvaCustomDeadline: "",
      logo: null,
      primaryColor: "#1c61fe",
      accentColor: "#ff6b3d",
      secondaryColor: "#fbca58",
      typography: "",
      domainType: "",
      hostingPreference: "",
      hostingProvider: "",
      paymentMode: null,
      financingTerm: "",
      monthlyBudget: "",
      maintenanceLevel: "",
      maintenancePaymentFrequency: "monthly",
      otherNeeds: "",
      contactMethod: "",
      contactEmail: "",
      contactPhone: "",
      contactName: "",
      serviceType: null,
      features: [],
      companySize: "",
      budget: "",
      timeline: ""
    };
  });
  const [showFinalDemo, setShowFinalDemo] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Auto-save
  useEffect(() => {
    localStorage.setItem("questionnaire-data", JSON.stringify(questionnaireData));
  }, [questionnaireData]);
  const demoConfig = convertToDemoConfig(questionnaireData);
  const progress = currentStep / TOTAL_STEPS * 100;
  const updateData = (updates: Partial<QuestionnaireData>) => {
    setQuestionnaireData({
      ...questionnaireData,
      ...updates
    });
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
        const hasCanvaServices = questionnaireData.canvaServices && questionnaireData.canvaServices.length > 0;
        const hasQuantity = questionnaireData.canvaQuantity;
        const hasFrequency = questionnaireData.canvaFrequency;
        if (!hasCanvaServices || !hasQuantity || !hasFrequency) return false;

        // Si forfait sur mesure (20+), vérifier les champs additionnels
        if (questionnaireData.canvaQuantity === "20+") {
          return questionnaireData.canvaCustomQuantity && questionnaireData.canvaCustomDesignTypes && questionnaireData.canvaCustomDeadline;
        }
        return true;
      case 7:
        return questionnaireData.companyName;
      case 8:
        return questionnaireData.domainType && questionnaireData.hostingPreference;
      case 9:
        return questionnaireData.paymentMode && questionnaireData.maintenanceLevel;
      case 10:
        // Require name, email, and contact method
        const hasEmail = questionnaireData.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(questionnaireData.contactEmail);
        return questionnaireData.contactName && hasEmail && questionnaireData.contactMethod;
      default:
        return true;
    }
  };
  const calculateEstimatedPrice = (): number => {
    let basePrice = 0;

    // Base price by solution type
    if ((questionnaireData.solutionTypes || []).includes("website")) basePrice += 2000;
    if ((questionnaireData.solutionTypes || []).includes("portal")) basePrice += 5000;
    if ((questionnaireData.solutionTypes || []).includes("module")) basePrice += 1500;

    // Additional modules
    basePrice += (questionnaireData.selectedModules?.length || 0) * 500;

    // Canva services
    const canvaCount = parseInt(questionnaireData.canvaQuantity || "0") || 0;
    basePrice += canvaCount * 50;
    return basePrice;
  };
  const handleSubmitDemo = async () => {
    try {
      const calculatedPrice = calculateEstimatedPrice();
      const response = await fetch('https://ohbrtlbdabiojwohdoxj.supabase.co/functions/v1/receive-demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_name: questionnaireData.companyName,
          industry: questionnaireData.industry,
          contact_name: questionnaireData.contactName || questionnaireData.companyName,
          contact_email: questionnaireData.contactEmail,
          contact_phone: questionnaireData.contactPhone || "",
          questionnaire_responses: {
            "Type de solution": questionnaireData.solutionTypes?.join(", "),
            "Industrie": questionnaireData.industry,
            "Objectifs principaux": questionnaireData.mainObjectives?.join(", "),
            "Date de début": questionnaireData.startDate,
            "Financement": questionnaireData.financing,
            "Type de site web": questionnaireData.websiteType,
            "Type de portail": questionnaireData.portalType,
            "Modules sélectionnés": questionnaireData.selectedModules?.join(", "),
            "Services Canva": questionnaireData.canvaServices?.join(", "),
            "Type de domaine": questionnaireData.domainType,
            "Mode de paiement": questionnaireData.paymentMode,
            "Niveau de maintenance": questionnaireData.maintenanceLevel,
            "Budget mensuel": questionnaireData.monthlyBudget,
            "Autres besoins": questionnaireData.otherNeeds
          },
          estimated_amount: calculatedPrice,
          demo_description: `Démo personnalisée pour ${questionnaireData.companyName} - ${questionnaireData.industry}`
        })
      });
      const result = await response.json();
      if (result.success && result.signup_url) {
        window.location.href = result.signup_url;
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi au portail:', error);
    }
  };
  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      const nextSection = getNextSection(currentStep);
      setCurrentStep(nextSection);
    } else {
      // Save quote to database when completing the questionnaire
      await submitQuote(questionnaireData);

      // Send to external portal
      await handleSubmitDemo();
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
  const handleReset = () => {
    const initialData: QuestionnaireData = {
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
      autoCompatibility: [],
      autoSearchFeatures: [],
      autoProductType: "",
      autoCustomerType: "",
      autoCurrentSales: "",
      restaurantFeatures: [],
      restaurantType: "",
      restaurantSalesType: "",
      retailFeatures: [],
      retailType: "",
      retailProductTypes: "",
      healthCompliance: [],
      educationFeatures: [],
      nonprofitFeatures: [],
      constructionServices: [],
      constructionFeatures: [],
      servicesFeatures: [],
      architectureFeatures: [],
      artsFeatures: [],
      transportFeatures: [],
      techFeatures: [],
      portalType: null,
      portalUsers: "",
      portalRoles: "",
      portalClientFeatures: [],
      portalEmployeeFeatures: [],
      portalHRFeatures: [],
      selectedModules: [],
      customModule: "",
      canvaServices: [],
      canvaQuantity: "",
      canvaFrequency: "",
      canvaDeadline: "",
      canvaSpecifications: "",
      infographicSupports: [],
      canvaCustomQuantity: "",
      canvaCustomDesignTypes: "",
      canvaCustomDeadline: "",
      logo: null,
      primaryColor: "#1c61fe",
      accentColor: "#ff6b3d",
      secondaryColor: "#fbca58",
      typography: "",
      domainType: "",
      hostingPreference: "",
      hostingProvider: "",
      paymentMode: null,
      financingTerm: "",
      monthlyBudget: "",
      maintenanceLevel: "",
      maintenancePaymentFrequency: "monthly",
      otherNeeds: "",
      contactMethod: "",
      contactEmail: "",
      contactPhone: "",
      contactName: "",
      serviceType: null,
      features: [],
      companySize: "",
      budget: "",
      timeline: ""
    };
    localStorage.removeItem("questionnaire-data");
    setQuestionnaireData(initialData);
    setCurrentStep(1);
  };
  if (showFinalDemo) {
    return <>
        <FullDemoView config={demoConfig} onBack={() => setShowFinalDemo(false)} />
        <QuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} data={questionnaireData} />
      </>;
  }
  const getSectionTitle = () => {
    const titles = ["Informations générales", "Type de solution", "Configuration site web", "Configuration portail", "Modules additionnels", "Services graphiques", "Identité de marque", "Domaine et hébergement", "Options financières", "Résumé et contact", "Aperçu final"];
    return titles[currentStep - 1];
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4 relative">
            <Layout className="w-6 h-6 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Générateur de démo</h1>
            <div className="absolute right-2 sm:right-4 flex gap-1">
              <Link to="/editor">
                <Button variant="ghost" size="icon" title="Éditeur rapide">
                  <Pencil className="w-4 h-4" />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" title="Réinitialiser le questionnaire">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Réinitialiser le questionnaire ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action effacera toutes vos réponses et vous ramènera au début du questionnaire. 
                    Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReset}>
                    Réinitialiser
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg px-2">
            Créez votre démo en répondant à quelques questions
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-4 sm:mb-8 px-2">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-xs sm:text-sm font-medium text-foreground truncate">
              {getSectionTitle()} - {currentStep}/{TOTAL_STEPS}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 max-w-7xl mx-auto">
          {/* Left Panel - Questionnaire */}
          <Card className="p-3 sm:p-6 shadow-elegant animate-slide-up">
            <div className="space-y-6">
              {currentStep === 1 && <Section1General data={questionnaireData} onChange={updateData} />}
              {currentStep === 2 && <Section2SolutionType data={questionnaireData} onChange={updateData} />}
              {currentStep === 3 && <Section3Website data={questionnaireData} onChange={updateData} />}
              {currentStep === 4 && <Section4Portal data={questionnaireData} onChange={updateData} />}
              {currentStep === 5 && <Section5Modules data={questionnaireData} onChange={updateData} isModuleSelected={(questionnaireData.solutionTypes || []).includes("module")} />}
              {currentStep === 6 && <Section6Canva data={questionnaireData} onChange={updateData} />}
              {currentStep === 7 && <div className="space-y-6">
                  <LogoUploader logo={questionnaireData.logo} companyName={questionnaireData.companyName} onLogoChange={logo => updateData({
                logo
              })} onCompanyNameChange={name => updateData({
                companyName: name
              })} />
                  <ColorCustomizer primaryColor={questionnaireData.primaryColor} accentColor={questionnaireData.accentColor} secondaryColor={questionnaireData.secondaryColor} onColorChange={updateData} />
                </div>}
              {currentStep === 8 && <Section7Domain data={questionnaireData} onChange={updateData} />}
              {currentStep === 9 && <Section8Finances data={questionnaireData} onChange={updateData} />}
              {currentStep === 10 && <Section9Summary data={questionnaireData} onChange={updateData} />}
              {currentStep === 11 && <div className="text-center py-12 space-y-4">
                  <h3 className="text-2xl font-bold text-primary">🎉 Prêt à découvrir votre démo !</h3>
                  <p className="text-muted-foreground text-lg">
                    Cliquez sur "Voir ma démo" pour visualiser votre solution personnalisée
                  </p>
                </div>}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-2 mt-4 sm:mt-8 pt-4 sm:pt-6 border-t">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="flex-1 sm:flex-initial" size="sm">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Précédent</span>
              </Button>

              <Button onClick={handleNext} disabled={!canProceed()} className="flex-1 sm:flex-initial" size="sm">
                <span className="text-xs sm:text-sm">
                  {currentStep === TOTAL_STEPS ? "Voir ma démo" : "Suivant"}
                </span>
                {currentStep < TOTAL_STEPS && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-2" />}
              </Button>
            </div>
          </Card>

          {/* Right Panel - Live Preview */}
          <div className="relative hidden lg:block">
            <div className="sticky top-8">
              <DemoPreview config={demoConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>;
};