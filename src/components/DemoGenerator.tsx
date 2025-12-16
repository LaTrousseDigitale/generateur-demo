import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DemoPreview } from "./DemoPreview";
import { FullDemoView } from "./FullDemoView";
import { QuoteModal } from "./QuoteModal";
import { 
  Eye, RefreshCw, Building2, Settings, Palette, Globe, 
  CreditCard, Mail, Puzzle, Send, CheckCircle2, Circle, ChevronRight
} from "lucide-react";
import logoTrousseDigitale from "@/assets/logo-trousse-digitale.png";
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
  theme?: DemoTheme;
  websiteType?: "vitrine" | "ecommerce" | "organisationnel" | null;
  websitePages?: string[];
  websiteSections?: string[];
  portalType?: "client" | "employes" | "rh" | "mixte" | null;
  portalUsers?: string;
  portalRoles?: string;
  portalClientFeatures?: string[];
  portalEmployeeFeatures?: string[];
  portalHRFeatures?: string[];
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
  selectedModules?: string[];
}

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
    ...(data.selectedModules || [])
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
    websiteType: data.websiteType,
    websitePages: data.websitePages,
    websiteSections: data.websiteSections,
    portalType: data.portalType,
    portalUsers: data.portalUsers,
    portalRoles: data.portalRoles,
    portalClientFeatures: data.portalClientFeatures,
    portalEmployeeFeatures: data.portalEmployeeFeatures,
    portalHRFeatures: data.portalHRFeatures,
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
    selectedModules: data.selectedModules
  };
};

const initialQuestionnaireData: QuestionnaireData = {
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
  clientEmail: "",
  clientPhone: "",
  serviceType: null,
  features: [],
  companySize: "",
  budget: "",
  timeline: ""
};

export const DemoGenerator = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showPreview, setShowPreview] = useState(false);
  const { submitQuote } = useQuoteSubmission();
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(() => {
    const saved = localStorage.getItem("questionnaire-data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return initialQuestionnaireData;
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem("questionnaire-data", JSON.stringify(questionnaireData));
  }, [questionnaireData]);

  const demoConfig = convertToDemoConfig(questionnaireData);

  const updateData = (updates: Partial<QuestionnaireData>) => {
    setQuestionnaireData({
      ...questionnaireData,
      ...updates
    });
  };

  // Calculate progress for each tab
  const tabProgress = useMemo(() => {
    const general = [
      !!questionnaireData.companyName,
      !!questionnaireData.industry,
      (questionnaireData.solutionTypes || []).length > 0
    ];
    
    const config = [
      questionnaireData.websiteType || questionnaireData.portalType,
      (questionnaireData.websitePages || []).length > 0 || (questionnaireData.portalClientFeatures || []).length > 0
    ];
    
    const modules = [
      (questionnaireData.selectedModules || []).length > 0 || (questionnaireData.canvaServices || []).length > 0
    ];
    
    const branding = [
      !!questionnaireData.logo || !!questionnaireData.companyName,
      questionnaireData.primaryColor !== "#1c61fe"
    ];
    
    const technique = [
      !!questionnaireData.domainType,
      !!questionnaireData.hostingPreference
    ];
    
    const finances = [
      !!questionnaireData.paymentMode,
      !!questionnaireData.maintenanceLevel
    ];
    
    const contact = [
      !!questionnaireData.clientEmail,
      !!questionnaireData.contactMethod
    ];

    return {
      general: Math.round((general.filter(Boolean).length / general.length) * 100),
      config: Math.round((config.filter(Boolean).length / config.length) * 100),
      modules: modules[0] ? 100 : 0,
      branding: Math.round((branding.filter(Boolean).length / branding.length) * 100),
      technique: Math.round((technique.filter(Boolean).length / technique.length) * 100),
      finances: Math.round((finances.filter(Boolean).length / finances.length) * 100),
      contact: Math.round((contact.filter(Boolean).length / contact.length) * 100)
    };
  }, [questionnaireData]);

  const overallProgress = useMemo(() => {
    const weights = { general: 25, config: 20, modules: 10, branding: 10, technique: 10, finances: 10, contact: 15 };
    const total = Object.entries(tabProgress).reduce((acc, [key, value]) => {
      return acc + (value * weights[key as keyof typeof weights]) / 100;
    }, 0);
    return Math.round(total);
  }, [tabProgress]);

  const tabs = [
    { id: "general", label: "Général", icon: Building2, progress: tabProgress.general },
    { id: "config", label: "Configuration", icon: Settings, progress: tabProgress.config },
    { id: "modules", label: "Modules", icon: Puzzle, progress: tabProgress.modules },
    { id: "branding", label: "Branding", icon: Palette, progress: tabProgress.branding },
    { id: "technique", label: "Technique", icon: Globe, progress: tabProgress.technique },
    { id: "finances", label: "Finances", icon: CreditCard, progress: tabProgress.finances },
    { id: "contact", label: "Contact", icon: Mail, progress: tabProgress.contact }
  ];

  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const calculateEstimatedPrice = (): number => {
    let basePrice = 0;
    if ((questionnaireData.solutionTypes || []).includes("website")) basePrice += 2000;
    if ((questionnaireData.solutionTypes || []).includes("portal")) basePrice += 5000;
    if ((questionnaireData.solutionTypes || []).includes("module")) basePrice += 1500;
    basePrice += (questionnaireData.selectedModules?.length || 0) * 500;
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
          contact_name: questionnaireData.companyName,
          contact_email: questionnaireData.clientEmail,
          contact_phone: questionnaireData.clientPhone,
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

  const handleReset = () => {
    localStorage.removeItem("questionnaire-data");
    setQuestionnaireData(initialQuestionnaireData);
    setActiveTab("general");
  };

  const canSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      questionnaireData.companyName &&
      questionnaireData.industry &&
      questionnaireData.solutionTypes?.length > 0 &&
      questionnaireData.clientEmail &&
      emailRegex.test(questionnaireData.clientEmail) &&
      questionnaireData.contactMethod
    );
  };

  const handleSubmit = async () => {
    await submitQuote(questionnaireData);
    await handleSubmitDemo();
    setShowPreview(true);
    setTimeout(() => setShowQuoteModal(true), 1000);
  };

  const navLinks = [
    { label: "Accueil", href: "https://latroussedigitale.ca" },
    { label: "Services", href: "https://latroussedigitale.ca/#services" },
    { label: "Avantages", href: "https://latroussedigitale.ca/#avantages" },
    { label: "Tarifs", href: "https://latroussedigitale.ca/#tarifs" },
    { label: "FAQ", href: "https://latroussedigitale.ca/#faq" },
    { label: "Contact", href: "https://latroussedigitale.ca/#contact" }
  ];

  // Show full demo preview
  if (showPreview) {
    return (
      <>
        <FullDemoView config={demoConfig} onBack={() => setShowPreview(false)} />
        <QuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} data={questionnaireData} />
      </>
    );
  }

  const hasWebsite = (questionnaireData.solutionTypes || []).includes("website");
  const hasPortal = (questionnaireData.solutionTypes || []).includes("portal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <img src={logoTrousseDigitale} alt="La Trousse Digitale" className="h-12 sm:h-16 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-sm text-gray-600 hover:text-primary transition-colors font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="flex items-center gap-2">
              <Button 
                className="bg-[#ff6b3d] hover:bg-[#e55a2d] text-white rounded-md px-4 sm:px-6 py-2 text-sm font-medium"
                onClick={() => setActiveTab("general")}
              >
                <span className="hidden sm:inline">Générer ma démo</span>
                <span className="sm:hidden">Démo</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Global Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Configurez votre solution
            </h1>
            <span className="text-lg font-semibold text-primary">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3 bg-muted" />
          <p className="text-muted-foreground text-sm mt-2">
            {overallProgress < 30 && "Commencez par remplir les informations générales"}
            {overallProgress >= 30 && overallProgress < 60 && "Continuez à personnaliser votre solution"}
            {overallProgress >= 60 && overallProgress < 90 && "Presque terminé ! Complétez les derniers détails"}
            {overallProgress >= 90 && "Excellent ! Vous pouvez maintenant générer votre démo"}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="hidden md:flex items-center justify-between mb-6 bg-card rounded-xl p-4 border shadow-sm">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isCompleted = tab.progress === 100;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : isCompleted 
                      ? "text-green-600" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="relative">
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Icon className={`w-6 h-6 ${isActive ? "text-primary" : ""}`} />
                  )}
                  {tab.progress > 0 && tab.progress < 100 && (
                    <div 
                      className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-500 text-white text-[8px] flex items-center justify-center font-bold"
                    >
                      !
                    </div>
                  )}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
                {tab.progress > 0 && tab.progress < 100 && (
                  <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 transition-all" 
                      style={{ width: `${tab.progress}%` }} 
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Réinitialiser le questionnaire ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action effacera toutes vos réponses. Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>Réinitialiser</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={() => setShowPreview(true)} variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Aperçu
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Configuration Tabs */}
          <div>
            <Card>
              <CardContent className="p-4 sm:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  {/* Mobile TabsList - hidden on desktop since we have step indicator */}
                  <TabsList className="md:hidden flex flex-wrap w-full justify-start gap-1 mb-6 h-auto p-1 bg-muted/50">
                    {tabs.map(tab => {
                      const Icon = tab.icon;
                      return (
                        <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5 px-3 py-2 text-xs relative">
                          <Icon className="w-3.5 h-3.5" />
                          {tab.progress === 100 && (
                            <CheckCircle2 className="w-3 h-3 text-green-600 absolute -top-1 -right-1" />
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {/* General Tab - Company Info + Solution Type */}
                  <TabsContent value="general" className="space-y-6 mt-0">
                    <Section1General data={questionnaireData} onChange={updateData} />
                    <div className="border-t pt-6">
                      <Section2SolutionType data={questionnaireData} onChange={updateData} />
                    </div>
                    <div className="flex justify-end pt-4 border-t">
                      <Button onClick={() => setActiveTab("config")} className="gap-2">
                        Suivant : Configuration
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Configuration Tab - Website + Portal */}
                  <TabsContent value="config" className="space-y-6 mt-0">
                    {hasWebsite && (
                      <div>
                        <Section3Website data={questionnaireData} onChange={updateData} />
                      </div>
                    )}
                    {hasPortal && (
                      <div className={hasWebsite ? "border-t pt-6" : ""}>
                        <Section4Portal data={questionnaireData} onChange={updateData} />
                      </div>
                    )}
                    {!hasWebsite && !hasPortal && (
                      <div className="text-center py-12 text-muted-foreground">
                        <Settings className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Sélectionnez d'abord un type de solution dans l'onglet "Général"</p>
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab("general")}
                          className="mt-2"
                        >
                          Aller à Général →
                        </Button>
                      </div>
                    )}
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={() => setActiveTab("general")}>
                        ← Général
                      </Button>
                      <Button onClick={() => setActiveTab("modules")} className="gap-2">
                        Suivant : Modules
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Modules Tab */}
                  <TabsContent value="modules" className="space-y-6 mt-0">
                    <Section5Modules 
                      data={questionnaireData} 
                      onChange={updateData} 
                      isModuleSelected={(questionnaireData.solutionTypes || []).includes("module")} 
                    />
                    <div className="border-t pt-6">
                      <Section6Canva data={questionnaireData} onChange={updateData} />
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={() => setActiveTab("config")}>
                        ← Configuration
                      </Button>
                      <Button onClick={() => setActiveTab("branding")} className="gap-2">
                        Suivant : Branding
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Branding Tab */}
                  <TabsContent value="branding" className="space-y-6 mt-0">
                    <LogoUploader 
                      logo={questionnaireData.logo} 
                      companyName={questionnaireData.companyName} 
                      onLogoChange={logo => updateData({ logo })} 
                      onCompanyNameChange={name => updateData({ companyName: name })} 
                    />
                    <div className="border-t pt-6">
                      <ColorCustomizer 
                        primaryColor={questionnaireData.primaryColor} 
                        accentColor={questionnaireData.accentColor} 
                        secondaryColor={questionnaireData.secondaryColor} 
                        onColorChange={updateData} 
                      />
                    </div>
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={() => setActiveTab("modules")}>
                        ← Modules
                      </Button>
                      <Button onClick={() => setActiveTab("technique")} className="gap-2">
                        Suivant : Technique
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Technique Tab - Domain & Hosting */}
                  <TabsContent value="technique" className="space-y-6 mt-0">
                    <Section7Domain data={questionnaireData} onChange={updateData} />
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={() => setActiveTab("branding")}>
                        ← Branding
                      </Button>
                      <Button onClick={() => setActiveTab("finances")} className="gap-2">
                        Suivant : Finances
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Finances Tab */}
                  <TabsContent value="finances" className="space-y-6 mt-0">
                    <Section8Finances data={questionnaireData} onChange={updateData} />
                    <div className="flex justify-between pt-4 border-t">
                      <Button variant="outline" onClick={() => setActiveTab("technique")}>
                        ← Technique
                      </Button>
                      <Button onClick={() => setActiveTab("contact")} className="gap-2">
                        Suivant : Contact
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Contact Tab */}
                  <TabsContent value="contact" className="space-y-6 mt-0">
                    <Section9Summary data={questionnaireData} onChange={updateData} />
                    
                    {/* Submit Button */}
                    <div className="border-t pt-6 space-y-4">
                      <div className="flex justify-start">
                        <Button variant="outline" onClick={() => setActiveTab("finances")}>
                          ← Finances
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSubmit}
                        disabled={!canSubmit()}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-6 text-lg font-semibold"
                        size="lg"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Voir ma démo personnalisée
                      </Button>
                      {!canSubmit() && (
                        <p className="text-xs text-muted-foreground text-center">
                          Veuillez remplir les champs obligatoires (entreprise, industrie, solution, email, méthode de contact)
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right: Live Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-muted/30 px-4 py-3 border-b flex items-center justify-between">
                    <span className="text-sm font-medium">Aperçu en direct</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowPreview(true)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Plein écran
                    </Button>
                  </div>
                  <DemoPreview config={demoConfig} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
