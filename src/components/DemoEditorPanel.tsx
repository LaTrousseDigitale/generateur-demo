import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FullDemoView } from "./FullDemoView";
import { ColorCustomizer } from "./ColorCustomizer";
import { LogoUploader } from "./LogoUploader";
import { 
  ArrowLeft, Eye, RefreshCw, Sparkles, Car, UtensilsCrossed, 
  Building2, Stethoscope, ShoppingBag, Briefcase, GraduationCap,
  Hammer, Palette, Check, Globe, Lock, Users, FileText, ShoppingCart
} from "lucide-react";
import { Link } from "react-router-dom";
import { INDUSTRIES, MODULES } from "@/types/questionnaire";
import type { DemoConfig, ServiceType } from "./DemoGenerator";

// Types de solutions détaillés
const WEBSITE_TYPES = [
  { 
    id: "vitrine", 
    label: "Site Vitrine", 
    description: "Présentation de vos services et produits",
    icon: Globe,
  },
  { 
    id: "ecommerce", 
    label: "E-commerce", 
    description: "Boutique en ligne complète",
    icon: ShoppingCart,
  },
  { 
    id: "organisationnel", 
    label: "Organisationnel", 
    description: "Intranet / Documentation interne",
    icon: FileText,
  },
];

const PORTAL_TYPES = [
  { 
    id: "client", 
    label: "Portail Client", 
    description: "Espace client sécurisé",
    icon: Users,
  },
  { 
    id: "employes", 
    label: "Portail Employés", 
    description: "Gestion d'équipe et projets",
    icon: Briefcase,
  },
  { 
    id: "rh", 
    label: "Portail RH", 
    description: "Ressources humaines",
    icon: Users,
  },
  { 
    id: "mixte", 
    label: "Portail Mixte", 
    description: "Combinaison de plusieurs types",
    icon: Lock,
  },
];

// Fonctionnalités par type
const VITRINE_PAGES = [
  "Accueil", "À propos", "Services", "Portfolio", "Blog", "Contact"
];

const VITRINE_SECTIONS = [
  "Témoignages clients", "FAQ", "Galerie photos", "Équipe", "Coordonnées"
];

const ECOMMERCE_FEATURES = [
  "Variantes de produits (tailles, couleurs)",
  "Abonnements récurrents",
  "Print on Demand (POD)",
  "Paiements en ligne sécurisés",
  "Calcul automatique de livraison",
  "Dropshipping",
  "Connexion FTP pour inventaire",
];

const PORTAL_CLIENT_FEATURES = [
  "Consultation de documents",
  "Signatures électroniques",
  "Factures et paiements",
  "Historique des transactions",
  "Formulaires personnalisés",
];

const PORTAL_EMPLOYEE_FEATURES = [
  "Feuilles de temps",
  "Gestion de projets",
  "Documentation interne",
  "Onboarding automatisé",
  "Chat d'équipe",
];

const PORTAL_HR_FEATURES = [
  "Dossiers employés",
  "Gestion des congés",
  "Formations et certifications",
  "Calendriers d'équipe",
  "Recrutement et candidatures",
  "Évaluations de performance",
];

const AUTO_FEATURES = [
  "Recherche par année/marque/modèle",
  "Recherche par numéro VIN",
  "Diagrammes et schémas de pièces",
  "Compatibilité automatique des pièces",
  "Catalogue pièces OEM vs aftermarket",
];

const RESTAURANT_FEATURES = [
  "Menu en ligne avec photos et descriptions",
  "Système de réservation de tables",
  "Commande en ligne (pick-up / livraison)",
  "Gestion des allergènes et restrictions alimentaires",
  "Programme de fidélité",
  "Horaires d'ouverture dynamiques",
];

// Templates pré-configurés
const DEMO_TEMPLATES: Array<{
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  config: Partial<DemoConfig>;
}> = [
  {
    id: "vitrine-services",
    name: "Site Vitrine - Services",
    description: "Site professionnel pour présenter vos services",
    icon: <Globe className="w-6 h-6" />,
    config: {
      serviceType: "website",
      websiteType: "vitrine",
      industry: "services",
      companyName: "Mon Entreprise",
      primaryColor: "#1d4ed8",
      accentColor: "#3b82f6",
      secondaryColor: "#93c5fd",
      features: ["Accueil", "À propos", "Services", "Contact"],
      websitePages: ["Accueil", "À propos", "Services", "Contact"],
      websiteSections: ["Témoignages clients", "FAQ"],
    },
  },
  {
    id: "ecommerce-auto",
    name: "E-commerce - Pièces Auto",
    description: "Boutique spécialisée avec recherche VIN",
    icon: <Car className="w-6 h-6" />,
    config: {
      serviceType: "website",
      websiteType: "ecommerce",
      industry: "auto",
      companyName: "AutoParts Pro",
      primaryColor: "#dc2626",
      accentColor: "#f97316",
      secondaryColor: "#fbbf24",
      ecommerceNeeds: ["Paiements en ligne sécurisés", "Connexion FTP pour inventaire"],
      autoCompatibility: ["Recherche par année/marque/modèle", "Recherche par numéro VIN", "Compatibilité automatique des pièces"],
      autoProductType: "Pièces automobiles neuves",
      autoCustomerType: "Mix B2B et B2C",
    },
  },
  {
    id: "ecommerce-restaurant",
    name: "E-commerce - Restaurant",
    description: "Commande en ligne et réservations",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    config: {
      serviceType: "website",
      websiteType: "ecommerce",
      industry: "restauration",
      companyName: "Le Gourmet",
      primaryColor: "#b45309",
      accentColor: "#d97706",
      secondaryColor: "#fcd34d",
      restaurantFeatures: ["Menu en ligne avec photos et descriptions", "Système de réservation de tables", "Commande en ligne (pick-up / livraison)"],
      restaurantType: "Restaurant traditionnel",
      restaurantSalesType: "Mix (sur place + livraison/emporter)",
    },
  },
  {
    id: "ecommerce-retail",
    name: "E-commerce - Commerce",
    description: "Boutique en ligne avec gestion stocks",
    icon: <ShoppingBag className="w-6 h-6" />,
    config: {
      serviceType: "website",
      websiteType: "ecommerce",
      industry: "commerce",
      companyName: "Ma Boutique",
      primaryColor: "#7c3aed",
      accentColor: "#a78bfa",
      secondaryColor: "#c4b5fd",
      ecommerceNeeds: ["Variantes de produits (tailles, couleurs)", "Paiements en ligne sécurisés"],
      retailType: "Click & Collect (en ligne + magasin)",
    },
  },
  {
    id: "vitrine-architecture",
    name: "Site Vitrine - Architecture",
    description: "Portfolio élégant pour projets",
    icon: <Building2 className="w-6 h-6" />,
    config: {
      serviceType: "website",
      websiteType: "vitrine",
      industry: "architecture",
      companyName: "Studio Archi",
      primaryColor: "#1e293b",
      accentColor: "#64748b",
      secondaryColor: "#94a3b8",
      websitePages: ["Accueil", "À propos", "Portfolio", "Services", "Contact"],
      websiteSections: ["Galerie photos", "Équipe", "Témoignages clients"],
    },
  },
  {
    id: "vitrine-sante",
    name: "Site Vitrine - Santé",
    description: "Site médical avec prise de RDV",
    icon: <Stethoscope className="w-6 h-6" />,
    config: {
      serviceType: "website",
      websiteType: "vitrine",
      industry: "sante",
      companyName: "Clinique Santé Plus",
      primaryColor: "#0891b2",
      accentColor: "#06b6d4",
      secondaryColor: "#67e8f9",
      websitePages: ["Accueil", "Services", "À propos", "Contact"],
      websiteSections: ["Équipe", "FAQ", "Coordonnées"],
    },
  },
  {
    id: "portal-client",
    name: "Portail Client",
    description: "Espace client sécurisé avec documents",
    icon: <Users className="w-6 h-6" />,
    config: {
      serviceType: "portal",
      portalType: "client",
      industry: "services",
      companyName: "Mon Portail Client",
      primaryColor: "#059669",
      accentColor: "#10b981",
      secondaryColor: "#6ee7b7",
      portalClientFeatures: ["Consultation de documents", "Factures et paiements", "Historique des transactions"],
      portalUsers: "11-20 utilisateurs",
      portalRoles: "2 rôles (ex: admin et utilisateur)",
    },
  },
  {
    id: "portal-employes",
    name: "Portail Employés",
    description: "Gestion d'équipe et projets",
    icon: <Briefcase className="w-6 h-6" />,
    config: {
      serviceType: "portal",
      portalType: "employes",
      industry: "services",
      companyName: "Mon Portail Employés",
      primaryColor: "#4f46e5",
      accentColor: "#6366f1",
      secondaryColor: "#a5b4fc",
      portalEmployeeFeatures: ["Feuilles de temps", "Gestion de projets", "Documentation interne", "Chat d'équipe"],
      portalUsers: "21-50 utilisateurs",
      portalRoles: "3+ rôles (hiérarchie complexe)",
    },
  },
  {
    id: "portal-rh",
    name: "Portail RH",
    description: "Ressources humaines complètes",
    icon: <Users className="w-6 h-6" />,
    config: {
      serviceType: "portal",
      portalType: "rh",
      industry: "services",
      companyName: "Mon Portail RH",
      primaryColor: "#db2777",
      accentColor: "#ec4899",
      secondaryColor: "#f9a8d4",
      portalHRFeatures: ["Dossiers employés", "Gestion des congés", "Formations et certifications", "Recrutement et candidatures"],
      portalUsers: "50+ utilisateurs",
      portalRoles: "3+ rôles (hiérarchie complexe)",
    },
  },
];

const DEFAULT_CONFIG: DemoConfig = {
  serviceType: "website",
  websiteType: "vitrine",
  features: [],
  industry: "services",
  companySize: "small",
  mainObjectives: [],
  budget: "medium",
  timeline: "flexible",
  primaryColor: "#1c61fe",
  accentColor: "#ff6b3d",
  secondaryColor: "#fbca58",
  logo: null,
  companyName: "Ma Démo",
  websitePages: [],
  websiteSections: [],
  portalType: null,
  portalClientFeatures: [],
  portalEmployeeFeatures: [],
  portalHRFeatures: [],
  ecommerceNeeds: [],
  autoCompatibility: [],
  autoSearchFeatures: [],
  restaurantFeatures: [],
  retailFeatures: [],
};

export const DemoEditorPanel = () => {
  const [config, setConfig] = useState<DemoConfig>(DEFAULT_CONFIG);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const updateConfig = (updates: Partial<DemoConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const applyTemplate = (template: typeof DEMO_TEMPLATES[0]) => {
    setConfig({ ...DEFAULT_CONFIG, ...template.config });
    setSelectedTemplate(template.id);
  };

  const toggleArrayFeature = (key: keyof DemoConfig, feature: string) => {
    const currentArray = (config[key] as string[]) || [];
    if (currentArray.includes(feature)) {
      updateConfig({ [key]: currentArray.filter(f => f !== feature) });
    } else {
      updateConfig({ [key]: [...currentArray, feature] });
    }
    setSelectedTemplate(null);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
    setSelectedTemplate(null);
  };

  if (showPreview) {
    return (
      <FullDemoView 
        config={config} 
        onBack={() => setShowPreview(false)} 
      />
    );
  }

  // Calcul du total des fonctionnalités
  const totalFeatures = 
    (config.websitePages?.length || 0) +
    (config.websiteSections?.length || 0) +
    (config.ecommerceNeeds?.length || 0) + 
    (config.autoCompatibility?.length || 0) + 
    (config.restaurantFeatures?.length || 0) +
    (config.portalClientFeatures?.length || 0) +
    (config.portalEmployeeFeatures?.length || 0) +
    (config.portalHRFeatures?.length || 0);

  // Labels pour l'affichage
  const getServiceTypeLabel = () => {
    if (config.serviceType === "website") {
      const type = WEBSITE_TYPES.find(t => t.id === config.websiteType);
      return type ? `Site Web - ${type.label}` : "Site Web";
    }
    if (config.serviceType === "portal") {
      const type = PORTAL_TYPES.find(t => t.id === config.portalType);
      return type ? `Portail - ${type.label}` : "Portail";
    }
    return "Module";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Éditeur de Démos
              </h1>
              <p className="text-sm text-muted-foreground">
                Créez et personnalisez vos démos directement
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Réinitialiser
            </Button>
            <Button onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Aperçu complet
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Configuration Tabs */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="templates" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="templates" className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span className="hidden sm:inline">Templates</span>
                    </TabsTrigger>
                    <TabsTrigger value="solution">Solution</TabsTrigger>
                    <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                  </TabsList>

                  {/* Templates Tab */}
                  <TabsContent value="templates" className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Choisissez un template pour commencer</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {DEMO_TEMPLATES.map(template => (
                        <Card 
                          key={template.id}
                          className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] ${
                            selectedTemplate === template.id 
                              ? 'ring-2 ring-primary shadow-lg' 
                              : 'hover:border-primary/50'
                          }`}
                          onClick={() => applyTemplate(template)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div 
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: template.config.primaryColor }}
                              >
                                {template.icon}
                              </div>
                              {selectedTemplate === template.id && (
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-4 h-4 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                            <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                              {template.description}
                            </p>
                            <div className="flex gap-1">
                              <div 
                                className="w-4 h-4 rounded-full border" 
                                style={{ backgroundColor: template.config.primaryColor }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full border" 
                                style={{ backgroundColor: template.config.accentColor }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full border" 
                                style={{ backgroundColor: template.config.secondaryColor }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Solution Tab */}
                  <TabsContent value="solution" className="space-y-6">
                    {/* Infos générales */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Nom de l'entreprise</Label>
                        <Input
                          id="companyName"
                          value={config.companyName}
                          onChange={(e) => {
                            updateConfig({ companyName: e.target.value });
                            setSelectedTemplate(null);
                          }}
                          placeholder="Nom de l'entreprise"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Industrie</Label>
                        <Select
                          value={config.industry}
                          onValueChange={(value) => {
                            updateConfig({ industry: value });
                            setSelectedTemplate(null);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une industrie" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRIES.map(ind => (
                              <SelectItem key={ind.value} value={ind.value}>
                                {ind.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Type de solution principal */}
                    <div className="space-y-3">
                      <Label>Type de solution</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Card 
                          className={`p-4 cursor-pointer transition-all ${
                            config.serviceType === "website" ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => {
                            updateConfig({ serviceType: "website", portalType: null });
                            setSelectedTemplate(null);
                          }}
                        >
                          <Globe className="w-6 h-6 mb-2 text-primary" />
                          <h4 className="font-semibold">Site Web</h4>
                          <p className="text-xs text-muted-foreground">Vitrine, E-commerce ou Organisationnel</p>
                        </Card>
                        <Card 
                          className={`p-4 cursor-pointer transition-all ${
                            config.serviceType === "portal" ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                          }`}
                          onClick={() => {
                            updateConfig({ serviceType: "portal", websiteType: null });
                            setSelectedTemplate(null);
                          }}
                        >
                          <Lock className="w-6 h-6 mb-2 text-primary" />
                          <h4 className="font-semibold">Portail</h4>
                          <p className="text-xs text-muted-foreground">Client, Employés, RH ou Mixte</p>
                        </Card>
                      </div>
                    </div>

                    {/* Types de sites web */}
                    {config.serviceType === "website" && (
                      <div className="space-y-3">
                        <Label>Type de site web</Label>
                        <div className="grid gap-3">
                          {WEBSITE_TYPES.map(type => (
                            <Card 
                              key={type.id}
                              className={`p-4 cursor-pointer transition-all ${
                                config.websiteType === type.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                              }`}
                              onClick={() => {
                                updateConfig({ websiteType: type.id as any });
                                setSelectedTemplate(null);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <type.icon className="w-5 h-5 text-primary" />
                                <div>
                                  <h4 className="font-semibold text-sm">{type.label}</h4>
                                  <p className="text-xs text-muted-foreground">{type.description}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Types de portails */}
                    {config.serviceType === "portal" && (
                      <div className="space-y-3">
                        <Label>Type de portail</Label>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {PORTAL_TYPES.map(type => (
                            <Card 
                              key={type.id}
                              className={`p-4 cursor-pointer transition-all ${
                                config.portalType === type.id ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                              }`}
                              onClick={() => {
                                updateConfig({ portalType: type.id as any });
                                setSelectedTemplate(null);
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <type.icon className="w-5 h-5 text-primary" />
                                <div>
                                  <h4 className="font-semibold text-sm">{type.label}</h4>
                                  <p className="text-xs text-muted-foreground">{type.description}</p>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-6">
                    {/* Site Vitrine */}
                    {config.serviceType === "website" && config.websiteType === "vitrine" && (
                      <>
                        <div>
                          <h3 className="font-medium mb-3">Pages principales</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {VITRINE_PAGES.map(page => (
                              <label
                                key={page}
                                className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  checked={(config.websitePages || []).includes(page)}
                                  onCheckedChange={() => toggleArrayFeature("websitePages", page)}
                                />
                                <span className="text-sm">{page}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-3">Sections importantes</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {VITRINE_SECTIONS.map(section => (
                              <label
                                key={section}
                                className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  checked={(config.websiteSections || []).includes(section)}
                                  onCheckedChange={() => toggleArrayFeature("websiteSections", section)}
                                />
                                <span className="text-sm">{section}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {/* E-commerce */}
                    {config.serviceType === "website" && config.websiteType === "ecommerce" && (
                      <>
                        <div>
                          <h3 className="font-medium mb-3">Fonctionnalités E-commerce</h3>
                          <div className="grid gap-3">
                            {ECOMMERCE_FEATURES.map(feature => (
                              <label
                                key={feature}
                                className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                              >
                                <Checkbox
                                  checked={(config.ecommerceNeeds || []).includes(feature)}
                                  onCheckedChange={() => toggleArrayFeature("ecommerceNeeds", feature)}
                                />
                                <span className="text-sm">{feature}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Auto specifics */}
                        {config.industry === "auto" && (
                          <div>
                            <h3 className="font-medium mb-3">Fonctionnalités Automobile</h3>
                            <div className="grid gap-3">
                              {AUTO_FEATURES.map(feature => (
                                <label
                                  key={feature}
                                  className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                                >
                                  <Checkbox
                                    checked={(config.autoCompatibility || []).includes(feature)}
                                    onCheckedChange={() => toggleArrayFeature("autoCompatibility", feature)}
                                  />
                                  <span className="text-sm">{feature}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Restaurant specifics */}
                        {config.industry === "restauration" && (
                          <div>
                            <h3 className="font-medium mb-3">Fonctionnalités Restauration</h3>
                            <div className="grid gap-3">
                              {RESTAURANT_FEATURES.map(feature => (
                                <label
                                  key={feature}
                                  className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                                >
                                  <Checkbox
                                    checked={(config.restaurantFeatures || []).includes(feature)}
                                    onCheckedChange={() => toggleArrayFeature("restaurantFeatures", feature)}
                                  />
                                  <span className="text-sm">{feature}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Portail Client */}
                    {config.serviceType === "portal" && (config.portalType === "client" || config.portalType === "mixte") && (
                      <div>
                        <h3 className="font-medium mb-3">Fonctionnalités Portail Client</h3>
                        <div className="grid gap-3">
                          {PORTAL_CLIENT_FEATURES.map(feature => (
                            <label
                              key={feature}
                              className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                checked={(config.portalClientFeatures || []).includes(feature)}
                                onCheckedChange={() => toggleArrayFeature("portalClientFeatures", feature)}
                              />
                              <span className="text-sm">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Portail Employés */}
                    {config.serviceType === "portal" && (config.portalType === "employes" || config.portalType === "mixte") && (
                      <div>
                        <h3 className="font-medium mb-3">Fonctionnalités Portail Employés</h3>
                        <div className="grid gap-3">
                          {PORTAL_EMPLOYEE_FEATURES.map(feature => (
                            <label
                              key={feature}
                              className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                checked={(config.portalEmployeeFeatures || []).includes(feature)}
                                onCheckedChange={() => toggleArrayFeature("portalEmployeeFeatures", feature)}
                              />
                              <span className="text-sm">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Portail RH */}
                    {config.serviceType === "portal" && (config.portalType === "rh" || config.portalType === "mixte") && (
                      <div>
                        <h3 className="font-medium mb-3">Fonctionnalités Portail RH</h3>
                        <div className="grid gap-3">
                          {PORTAL_HR_FEATURES.map(feature => (
                            <label
                              key={feature}
                              className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                checked={(config.portalHRFeatures || []).includes(feature)}
                                onCheckedChange={() => toggleArrayFeature("portalHRFeatures", feature)}
                              />
                              <span className="text-sm">{feature}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message si pas de type sélectionné */}
                    {config.serviceType === "website" && !config.websiteType && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Sélectionnez un type de site web dans l'onglet "Solution"</p>
                      </div>
                    )}
                    {config.serviceType === "portal" && !config.portalType && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Sélectionnez un type de portail dans l'onglet "Solution"</p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Branding Tab */}
                  <TabsContent value="branding" className="space-y-6">
                    <LogoUploader
                      logo={config.logo}
                      companyName={config.companyName}
                      onLogoChange={(logo) => {
                        updateConfig({ logo });
                        setSelectedTemplate(null);
                      }}
                      onCompanyNameChange={(name) => {
                        updateConfig({ companyName: name });
                        setSelectedTemplate(null);
                      }}
                    />
                    <ColorCustomizer
                      primaryColor={config.primaryColor}
                      accentColor={config.accentColor}
                      secondaryColor={config.secondaryColor}
                      onColorChange={(colors) => {
                        updateConfig(colors);
                        setSelectedTemplate(null);
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right: Live Preview Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Résumé de la démo
                  {selectedTemplate && (
                    <Badge variant="secondary" className="text-xs">
                      Template actif
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Entreprise</p>
                  <p className="font-medium">{config.companyName || "Non défini"}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Industrie</p>
                  <p className="font-medium">
                    {INDUSTRIES.find(i => i.value === config.industry)?.label || config.industry}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Type de solution</p>
                  <p className="font-medium">{getServiceTypeLabel()}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Fonctionnalités</p>
                  <p className="font-medium">{totalFeatures} sélectionnées</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Couleurs</p>
                  <div className="flex gap-2">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: config.primaryColor }}
                      title="Primaire"
                    />
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: config.accentColor }}
                      title="Accent"
                    />
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: config.secondaryColor }}
                      title="Secondaire"
                    />
                  </div>
                </div>
                {config.logo && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Logo</p>
                    <img 
                      src={config.logo} 
                      alt="Logo" 
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                )}
                <Button 
                  className="w-full mt-4" 
                  onClick={() => setShowPreview(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Voir l'aperçu complet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
