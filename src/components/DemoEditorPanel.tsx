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
  Hammer, Palette, Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { INDUSTRIES, MODULES } from "@/types/questionnaire";
import type { DemoConfig, ServiceType } from "./DemoGenerator";

// Industry Templates with pre-configured settings
const DEMO_TEMPLATES: Array<{
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  config: Partial<DemoConfig>;
}> = [
  {
    id: "auto-parts",
    name: "Pièces Automobiles",
    description: "E-commerce spécialisé avec recherche VIN et compatibilité véhicules",
    icon: <Car className="w-6 h-6" />,
    config: {
      industry: "auto",
      serviceType: "website",
      companyName: "AutoParts Pro",
      primaryColor: "#dc2626",
      accentColor: "#f97316",
      secondaryColor: "#fbbf24",
      features: ["accueil", "catalogue", "contact", "faq"],
      ecommerceNeeds: ["catalogue", "panier", "paiement", "filtres", "inventaire"],
      autoCompatibility: ["vin-search", "ymm-search", "compatibility", "diagrams", "oem-aftermarket"],
      autoSearchFeatures: ["vin", "year-make-model"],
      autoProductType: "pieces",
      autoCustomerType: "b2c",
    },
  },
  {
    id: "restaurant",
    name: "Restaurant & Café",
    description: "Site vitrine avec menu, réservations et commandes en ligne",
    icon: <UtensilsCrossed className="w-6 h-6" />,
    config: {
      industry: "restauration",
      serviceType: "website",
      companyName: "Le Gourmet",
      primaryColor: "#b45309",
      accentColor: "#d97706",
      secondaryColor: "#fcd34d",
      features: ["accueil", "about", "contact", "testimonials"],
      restaurantFeatures: ["menu", "reservation", "commande", "livraison", "fidelite"],
      restaurantType: "gastronomique",
      restaurantSalesType: "sur-place",
    },
  },
  {
    id: "architecture",
    name: "Architecture & Design",
    description: "Portfolio élégant pour présenter vos projets et réalisations",
    icon: <Building2 className="w-6 h-6" />,
    config: {
      industry: "architecture",
      serviceType: "website",
      companyName: "Studio Archi",
      primaryColor: "#1e293b",
      accentColor: "#64748b",
      secondaryColor: "#94a3b8",
      features: ["accueil", "about", "portfolio", "services", "contact", "team"],
    },
  },
  {
    id: "health-clinic",
    name: "Clinique Santé",
    description: "Site médical avec prise de rendez-vous et portail patient",
    icon: <Stethoscope className="w-6 h-6" />,
    config: {
      industry: "sante",
      serviceType: "website",
      companyName: "Clinique Santé Plus",
      primaryColor: "#0891b2",
      accentColor: "#06b6d4",
      secondaryColor: "#67e8f9",
      features: ["accueil", "services", "team", "contact", "faq", "rendez-vous"],
    },
  },
  {
    id: "retail-store",
    name: "Commerce de Détail",
    description: "Boutique en ligne complète avec gestion des stocks",
    icon: <ShoppingBag className="w-6 h-6" />,
    config: {
      industry: "commerce",
      serviceType: "website",
      companyName: "Ma Boutique",
      primaryColor: "#7c3aed",
      accentColor: "#a78bfa",
      secondaryColor: "#c4b5fd",
      features: ["accueil", "about", "contact", "blog"],
      ecommerceNeeds: ["catalogue", "panier", "paiement", "promotions", "wishlist", "reviews"],
      retailFeatures: ["stocks", "fidelite"],
    },
  },
  {
    id: "professional-services",
    name: "Services Professionnels",
    description: "Site corporatif pour cabinets et consultants",
    icon: <Briefcase className="w-6 h-6" />,
    config: {
      industry: "services",
      serviceType: "website",
      companyName: "Expertise Conseil",
      primaryColor: "#1d4ed8",
      accentColor: "#3b82f6",
      secondaryColor: "#93c5fd",
      features: ["accueil", "about", "services", "team", "testimonials", "contact", "blog"],
    },
  },
  {
    id: "construction",
    name: "Construction & Rénovation",
    description: "Site vitrine avec projets et demande de soumission",
    icon: <Hammer className="w-6 h-6" />,
    config: {
      industry: "construction",
      serviceType: "website",
      companyName: "Constructions ABC",
      primaryColor: "#ea580c",
      accentColor: "#f97316",
      secondaryColor: "#fdba74",
      features: ["accueil", "services", "portfolio", "testimonials", "contact"],
    },
  },
  {
    id: "education",
    name: "Éducation & Formation",
    description: "Plateforme éducative avec portail étudiant",
    icon: <GraduationCap className="w-6 h-6" />,
    config: {
      industry: "education",
      serviceType: "portal",
      companyName: "Centre Formation Pro",
      primaryColor: "#059669",
      accentColor: "#10b981",
      secondaryColor: "#6ee7b7",
      features: ["accueil", "services", "about", "contact", "faq"],
    },
  },
  {
    id: "creative-agency",
    name: "Agence Créative",
    description: "Portfolio créatif pour agences et designers",
    icon: <Palette className="w-6 h-6" />,
    config: {
      industry: "arts-scene",
      serviceType: "website",
      companyName: "Studio Créatif",
      primaryColor: "#db2777",
      accentColor: "#ec4899",
      secondaryColor: "#f9a8d4",
      features: ["accueil", "portfolio", "services", "about", "team", "contact", "blog"],
    },
  },
];

const DEFAULT_CONFIG: DemoConfig = {
  serviceType: "website",
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
  ecommerceNeeds: [],
  autoCompatibility: [],
  autoSearchFeatures: [],
  restaurantFeatures: [],
  retailFeatures: [],
};

const WEBSITE_FEATURES = [
  { id: "accueil", label: "Page d'accueil" },
  { id: "about", label: "À propos" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio/Projets" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
  { id: "testimonials", label: "Témoignages" },
  { id: "faq", label: "FAQ" },
  { id: "pricing", label: "Tarifs" },
  { id: "team", label: "Équipe" },
];

const ECOMMERCE_FEATURES = [
  { id: "catalogue", label: "Catalogue produits" },
  { id: "panier", label: "Panier d'achat" },
  { id: "paiement", label: "Paiement en ligne" },
  { id: "inventaire", label: "Gestion d'inventaire" },
  { id: "promotions", label: "Promotions/Coupons" },
  { id: "wishlist", label: "Liste de souhaits" },
  { id: "reviews", label: "Avis clients" },
  { id: "filtres", label: "Filtres avancés" },
];

const AUTO_FEATURES = [
  { id: "vin-search", label: "Recherche par VIN" },
  { id: "ymm-search", label: "Année/Marque/Modèle" },
  { id: "compatibility", label: "Compatibilité véhicules" },
  { id: "diagrams", label: "Diagrammes de pièces" },
  { id: "oem-aftermarket", label: "OEM vs Aftermarket" },
];

const RESTAURANT_FEATURES = [
  { id: "menu", label: "Menu en ligne" },
  { id: "reservation", label: "Réservations" },
  { id: "commande", label: "Commande en ligne" },
  { id: "livraison", label: "Livraison" },
  { id: "fidelite", label: "Programme fidélité" },
];

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

  const toggleFeature = (feature: string) => {
    const currentFeatures = config.features || [];
    if (currentFeatures.includes(feature)) {
      updateConfig({ features: currentFeatures.filter(f => f !== feature) });
    } else {
      updateConfig({ features: [...currentFeatures, feature] });
    }
    setSelectedTemplate(null);
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

  const totalFeatures = 
    config.features.length + 
    (config.ecommerceNeeds?.length || 0) + 
    (config.autoCompatibility?.length || 0) + 
    (config.restaurantFeatures?.length || 0);

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
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="templates" className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span className="hidden sm:inline">Templates</span>
                    </TabsTrigger>
                    <TabsTrigger value="general">Général</TabsTrigger>
                    <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                    <TabsTrigger value="industry">Industrie</TabsTrigger>
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
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Sélectionnez un template puis personnalisez-le dans les autres onglets
                    </p>
                  </TabsContent>

                  {/* General Tab */}
                  <TabsContent value="general" className="space-y-6">
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

                    <div className="space-y-2">
                      <Label>Type de solution</Label>
                      <Select
                        value={config.serviceType || "website"}
                        onValueChange={(value) => {
                          updateConfig({ serviceType: value as ServiceType });
                          setSelectedTemplate(null);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Site Web</SelectItem>
                          <SelectItem value="portal">Portail</SelectItem>
                          <SelectItem value="module">Module</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Pages du site</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {WEBSITE_FEATURES.map(feature => (
                          <label
                            key={feature.id}
                            className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              checked={config.features.includes(feature.id)}
                              onCheckedChange={() => toggleFeature(feature.id)}
                            />
                            <span className="text-sm">{feature.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">E-commerce</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {ECOMMERCE_FEATURES.map(feature => (
                          <label
                            key={feature.id}
                            className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              checked={(config.ecommerceNeeds || []).includes(feature.id)}
                              onCheckedChange={() => toggleArrayFeature("ecommerceNeeds", feature.id)}
                            />
                            <span className="text-sm">{feature.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Modules additionnels</h3>
                      <div className="grid gap-3">
                        {MODULES.slice(0, 6).map(module => (
                          <label
                            key={module.id}
                            className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              checked={config.features.includes(module.id)}
                              onCheckedChange={() => toggleFeature(module.id)}
                            />
                            <div>
                              <span className="text-sm font-medium">{module.label}</span>
                              <p className="text-xs text-muted-foreground">{module.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Industry Tab */}
                  <TabsContent value="industry" className="space-y-6">
                    {config.industry === "auto" && (
                      <div>
                        <h3 className="font-medium mb-3">Fonctionnalités Automobile</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {AUTO_FEATURES.map(feature => (
                            <label
                              key={feature.id}
                              className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                checked={(config.autoCompatibility || []).includes(feature.id)}
                                onCheckedChange={() => toggleArrayFeature("autoCompatibility", feature.id)}
                              />
                              <span className="text-sm">{feature.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {config.industry === "restauration" && (
                      <div>
                        <h3 className="font-medium mb-3">Fonctionnalités Restauration</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {RESTAURANT_FEATURES.map(feature => (
                            <label
                              key={feature.id}
                              className="flex items-center gap-2 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <Checkbox
                                checked={(config.restaurantFeatures || []).includes(feature.id)}
                                onCheckedChange={() => toggleArrayFeature("restaurantFeatures", feature.id)}
                              />
                              <span className="text-sm">{feature.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    {!["auto", "restauration"].includes(config.industry) && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Sélectionnez "Automobile" ou "Restauration" dans l'onglet Général</p>
                        <p className="text-sm">pour voir les fonctionnalités spécifiques à l'industrie</p>
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
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">
                    {config.serviceType === "website" ? "Site Web" : 
                     config.serviceType === "portal" ? "Portail" : 
                     config.serviceType === "module" ? "Module" : "Site Web"}
                  </p>
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
