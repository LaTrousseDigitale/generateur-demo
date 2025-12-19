import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DemoPreview } from "./DemoPreview";
import { FullDemoView } from "./FullDemoView";
import { QuoteModal } from "./QuoteModal";
import { Eye, RefreshCw, Building2, Settings, Palette, Globe, CreditCard, Mail, Puzzle, Send, CheckCircle2, Circle, ChevronRight, Sparkles, Phone, ShoppingCart } from "lucide-react";
import { useCartSync } from "@/hooks/useCartSync";
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
  const {
    submitQuote
  } = useQuoteSubmission();
  const { itemCount: cartItemCount, sessionId: cartSessionId } = useCartSync();
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
    const general = [!!questionnaireData.companyName, !!questionnaireData.industry, (questionnaireData.solutionTypes || []).length > 0];
    const config = [questionnaireData.websiteType || questionnaireData.portalType, (questionnaireData.websitePages || []).length > 0 || (questionnaireData.portalClientFeatures || []).length > 0];
    const modules = [(questionnaireData.selectedModules || []).length > 0 || (questionnaireData.canvaServices || []).length > 0];
    const branding = [!!questionnaireData.logo || !!questionnaireData.companyName, questionnaireData.primaryColor !== "#1c61fe"];
    const technique = [!!questionnaireData.domainType, !!questionnaireData.hostingPreference];
    const finances = [!!questionnaireData.paymentMode, !!questionnaireData.maintenanceLevel];
    const contact = [!!questionnaireData.clientEmail, !!questionnaireData.contactMethod];
    return {
      general: Math.round(general.filter(Boolean).length / general.length * 100),
      config: Math.round(config.filter(Boolean).length / config.length * 100),
      modules: modules[0] ? 100 : 0,
      branding: Math.round(branding.filter(Boolean).length / branding.length * 100),
      technique: Math.round(technique.filter(Boolean).length / technique.length * 100),
      finances: Math.round(finances.filter(Boolean).length / finances.length * 100),
      contact: Math.round(contact.filter(Boolean).length / contact.length * 100)
    };
  }, [questionnaireData]);
  const overallProgress = useMemo(() => {
    const weights = {
      general: 25,
      config: 20,
      modules: 10,
      branding: 10,
      technique: 10,
      finances: 10,
      contact: 15
    };
    const total = Object.entries(tabProgress).reduce((acc, [key, value]) => {
      return acc + value * weights[key as keyof typeof weights] / 100;
    }, 0);
    return Math.round(total);
  }, [tabProgress]);
  const tabs = [{
    id: "general",
    label: "Général",
    icon: Building2,
    progress: tabProgress.general
  }, {
    id: "config",
    label: "Configuration",
    icon: Settings,
    progress: tabProgress.config
  }, {
    id: "modules",
    label: "Modules",
    icon: Puzzle,
    progress: tabProgress.modules
  }, {
    id: "branding",
    label: "Branding",
    icon: Palette,
    progress: tabProgress.branding
  }, {
    id: "technique",
    label: "Technique",
    icon: Globe,
    progress: tabProgress.technique
  }, {
    id: "finances",
    label: "Finances",
    icon: CreditCard,
    progress: tabProgress.finances
  }, {
    id: "contact",
    label: "Contact",
    icon: Mail,
    progress: tabProgress.contact
  }];
  const currentTabIndex = tabs.findIndex(t => t.id === activeTab);
  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };
  const calculateEstimatedPrice = (): number => {
    let monthlyPrice = 0;
    // Sites Web
    if ((questionnaireData.solutionTypes || []).includes("website")) {
      if (questionnaireData.websiteType === "vitrine") monthlyPrice += 80;else if (questionnaireData.websiteType === "ecommerce") monthlyPrice += 120;else if (questionnaireData.websiteType === "organisationnel") monthlyPrice += 120;else monthlyPrice += 80; // default
    }
    // Portails
    if ((questionnaireData.solutionTypes || []).includes("portal")) {
      const portalPrices: Record<string, number> = {
        client: 90,
        employes: 70,
        rh: 90,
        partenaires: 90,
        admin: 110,
        mixte: 100
      };
      monthlyPrice += portalPrices[questionnaireData.portalType || "client"] || 90;
    }
    // Modules (prix moyen de 50$/mois par module)
    monthlyPrice += (questionnaireData.selectedModules?.length || 0) * 50;
    return monthlyPrice;
  };
  const handleReset = () => {
    localStorage.removeItem("questionnaire-data");
    setQuestionnaireData(initialQuestionnaireData);
    setActiveTab("general");
  };
  const canSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return questionnaireData.companyName && questionnaireData.industry && questionnaireData.solutionTypes?.length > 0 && questionnaireData.clientEmail && emailRegex.test(questionnaireData.clientEmail) && questionnaireData.contactMethod;
  };
  const handleSubmit = async () => {
    await submitQuote(questionnaireData);
    setShowPreview(true);
    setTimeout(() => setShowQuoteModal(true), 1000);
  };
  const navLinks = [{
    label: "Accueil",
    href: "https://latroussedigitale.ca"
  }, {
    label: "Applications",
    href: "https://latroussedigitale.ca/#applications"
  }, {
    label: "Démos",
    href: "https://latroussedigitale.ca/#demos"
  }, {
    label: "Avantages",
    href: "https://latroussedigitale.ca/#avantages"
  }, {
    label: "Tarifs",
    href: "https://latroussedigitale.ca/#tarifs"
  }, {
    label: "Contact",
    href: "https://latroussedigitale.ca/#contact"
  }];

  // Show full demo preview
  if (showPreview) {
    return <>
        <FullDemoView config={demoConfig} onBack={() => setShowPreview(false)} />
        <QuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} data={questionnaireData} />
      </>;
  }
  const hasWebsite = (questionnaireData.solutionTypes || []).includes("website");
  const hasPortal = (questionnaireData.solutionTypes || []).includes("portal");
  return <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <img src={logoTrousseDigitale} alt="La Trousse Digitale" className="h-24 sm:h-28 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map(link => <a key={link.label} href={link.href} className="text-sm text-gray-600 hover:text-primary transition-colors font-medium relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                  {link.label}
                </a>)}
            </nav>

            {/* Cart Icon & CTA Button */}
            <div className="flex items-center gap-4">
              <a href={`https://latroussedigitale.ca/panier?session_id=${cartSessionId}`} className="relative text-gray-600 hover:text-primary transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ff6b3d] text-white text-[10px] font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </a>
              <Button className="bg-[#ff6b3d] hover:bg-[#e55a2d] text-white rounded-md px-4 sm:px-6 py-2 text-sm font-medium" onClick={() => setActiveTab("general")}>
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
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-relaxed pb-1">
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
          return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${isActive ? "bg-primary/10 text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                <div className="relative">
                  {isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <Icon className={`w-6 h-6 ${isActive ? "text-primary" : ""}`} />}
                  {tab.progress > 0 && tab.progress < 100 && <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-amber-500 text-white text-[8px] flex items-center justify-center font-bold">
                      !
                    </div>}
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
                {tab.progress > 0 && tab.progress < 100 && <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all" style={{
                width: `${tab.progress}%`
              }} />
                  </div>}
              </button>;
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
                    return <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1.5 px-3 py-2 text-xs relative">
                          <Icon className="w-3.5 h-3.5" />
                          {tab.progress === 100 && <CheckCircle2 className="w-3 h-3 text-green-600 absolute -top-1 -right-1" />}
                        </TabsTrigger>;
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
                    {hasWebsite && <div>
                        <Section3Website data={questionnaireData} onChange={updateData} />
                      </div>}
                    {hasPortal && <div className={hasWebsite ? "border-t pt-6" : ""}>
                        <Section4Portal data={questionnaireData} onChange={updateData} />
                      </div>}
                    {!hasWebsite && !hasPortal && <div className="text-center py-12 text-muted-foreground">
                        <Settings className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>Sélectionnez d'abord un type de solution dans l'onglet "Général"</p>
                        <Button variant="link" onClick={() => setActiveTab("general")} className="mt-2">
                          Aller à Général →
                        </Button>
                      </div>}
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
                    <Section5Modules data={questionnaireData} onChange={updateData} isModuleSelected={(questionnaireData.solutionTypes || []).includes("module")} />
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
                    <LogoUploader logo={questionnaireData.logo} companyName={questionnaireData.companyName} onLogoChange={logo => updateData({
                    logo
                  })} onCompanyNameChange={name => updateData({
                    companyName: name
                  })} />
                    <div className="border-t pt-6">
                      <ColorCustomizer primaryColor={questionnaireData.primaryColor} accentColor={questionnaireData.accentColor} secondaryColor={questionnaireData.secondaryColor} onColorChange={updateData} />
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
                    
                    {/* Upsell - Services graphiques */}
                    <div className="border-t pt-6">
                      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-base">Vous aimeriez peut-être...</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Ajoutez des services de design graphique pour compléter votre solution digitale.
                        </p>
                        <Section6Canva data={questionnaireData} onChange={updateData} />
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="border-t pt-6 space-y-4">
                      <div className="flex justify-start">
                        <Button variant="outline" onClick={() => setActiveTab("finances")}>
                          ← Finances
                        </Button>
                      </div>
                      <Button onClick={handleSubmit} disabled={!canSubmit()} className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white py-6 text-lg font-semibold" size="lg">
                        <Send className="w-5 h-5 mr-2" />
                        Voir ma démo personnalisée
                      </Button>
                      {!canSubmit() && <p className="text-xs text-muted-foreground text-center">
                          Veuillez remplir les champs obligatoires (entreprise, industrie, solution, email, méthode de contact)
                        </p>}
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
                    <Button variant="ghost" size="sm" onClick={() => setShowPreview(true)}>
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

      {/* CTA Section - Blue with floating icons */}
      <section className="relative py-20 bg-[#4285f4] overflow-hidden">
        {/* Floating decorative icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-16 text-white/20 text-4xl">&lt;/&gt;</div>
          <div className="absolute top-32 left-20 text-white/20 text-3xl">◐</div>
          <div className="absolute top-48 left-16 text-white/20 text-3xl">☰</div>
          <div className="absolute bottom-32 left-36 text-white/20 text-3xl">⚙</div>
          <div className="absolute bottom-16 left-48 text-white/20 text-3xl">🖥</div>
          <div className="absolute top-16 right-16 text-white/20 text-3xl">▢</div>
          <div className="absolute top-32 right-20 text-white/20 text-3xl">⊕</div>
          <div className="absolute top-48 right-16 text-white/20 text-3xl">☰</div>
          <div className="absolute bottom-32 right-36 text-white/20 text-3xl">✦</div>
          <div className="absolute bottom-16 right-48 text-white/20 text-3xl">☰</div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Prêt à commencer?
          </div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Votre solution vous<br />attend
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            En 5 minutes, visualisez exactement ce que vous obtiendrez. Gratuit, sans engagement, 100% en ligne.
          </p>
          
          {/* Main CTA Button */}
          <Button size="lg" className="bg-white text-[#4285f4] hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-full mb-8" onClick={() => window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })}>
            <Sparkles className="w-5 h-5 mr-2" />
            Générer ma démo gratuite
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          
          {/* Separator */}
          <div className="w-32 h-px bg-white/30 mx-auto mb-6" />
          
          {/* Secondary CTA */}
          <p className="text-white/70 text-sm mb-3">Besoin d'un accompagnement personnalisé?</p>
          <a href="https://latroussedigitale.ca/contact" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Réserver un appel découverte
          </a>
        </div>
      </section>

      {/* Footer Header - Brand red-orange bar */}
      <div className="bg-accent py-5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logoTrousseDigitale} alt="La Trousse Digitale" className="h-32 brightness-0 invert" />
          <p className="text-white text-2xl font-montserrat font-semibold md:text-4xl">
            Le numérique, simplement.
          </p>
          <div className="flex gap-3">
            <a href="mailto:info@latroussedigitale.ca" className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-5 py-2.5 rounded-lg hover:bg-[#1a1a2e]/90 transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" />
              Écrivez-nous
            </a>
            <a href="tel:4188087849" className="inline-flex items-center gap-2 border-2 border-white/60 text-white px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium">
              <Phone className="w-4 h-4" />
              (418) 808-7849
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-[#1a1a2e] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1 - Solutions */}
            <div>
              <h4 className="font-bold text-accent mb-4">Solutions digitales pour PME</h4>
              <p className="text-white/70 text-sm mb-6">
                La Trousse Digitale est votre partenaire pour simplifier la gestion de votre entreprise. Sites Web, portails d'affaires et modules personnalisés pour automatiser votre quotidien.
              </p>
              <a href="sms:4188087849" className="inline-flex items-center gap-3 bg-[#1e1e2a] text-white px-5 py-3 rounded-xl hover:opacity-90 transition-opacity border-l-2 border-[#ff6b3d]">
                <div className="w-11 h-11 bg-[#ff6b3d] rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/60 font-light">Envoyez-nous un SMS</div>
                  <div className="font-montserrat font-semibold">(418) 808-7849</div>
                </div>
              </a>
            </div>
            
            {/* Column 2 - Liens rapides */}
            <div>
              <h4 className="font-bold text-white mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="https://latroussedigitale.ca/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" />Accueil</a></li>
                <li><a href="https://latroussedigitale.ca/#services" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" />Services</a></li>
                <li><a href="/" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" />Générateur de démos</a></li>
                <li><a href="https://latroussedigitale.ca/#tarifs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" />Tarifs</a></li>
                <li><a href="https://latroussedigitale.ca/#apropos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" />À propos</a></li>
                <li><a href="https://latroussedigitale.ca/#faq" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" />FAQ</a></li>
              </ul>
            </div>
            
            {/* Column 3 - Liste de diffusion */}
            <div>
              <h4 className="font-bold text-white mb-4">Liste de diffusion</h4>
              <p className="text-white/70 text-sm mb-4">
                Recevez nos conseils et les dernières tendances en matière de solutions numériques!
              </p>
              <div className="space-y-3">
                <input type="email" placeholder="votre@courriel.com" className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-accent" />
                <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg">
                  S'abonner
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Column 4 - Suivez-nous */}
            <div>
              <h4 className="font-bold text-white mb-4">Suivez-nous</h4>
              <p className="text-white/70 text-sm mb-4">
                Rejoignez notre communauté pour des astuces exclusives et des nouvelles de l'industrie.
              </p>
              <div className="flex gap-3">
                <a href="https://facebook.com/latroussedigitale" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/latroussedigitale" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} <span className="text-accent">La Trousse Digitale</span>. Tous droits réservés.
            </p>
            <div className="flex gap-4 text-sm text-white/60">
              <a href="https://latroussedigitale.ca/confidentialite" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Confidentialité
              </a>
              <span>|</span>
              <a href="https://latroussedigitale.ca/conditions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Conditions
              </a>
              <span>|</span>
              <a href="https://latroussedigitale.ca/cookies" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};