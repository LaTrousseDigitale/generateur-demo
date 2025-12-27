export type ServiceType = "portal" | "website" | "module" | null;
export type WebsiteType = "vitrine" | "ecommerce" | "organisationnel" | null;
export type PortalType = "client" | "employes" | "rh" | "mixte" | null;
export type PaymentMode = "abonnement" | "proprietaire" | "financement" | null;

export interface QuestionnaireData {
  // Section 1: Informations générales
  companyName: string;
  industry: string;
  mainObjectives: string[];
  startDate: string;
  financing: string;

  // Section 2: Type de solution
  solutionTypes: string[]; // Peut contenir "website", "portal", "module"

  // Section 3: Sites Web
  websiteType: WebsiteType;
  websitePages: string[];
  websiteContent: string[];
  websiteSections: string[];
  ecommerceProductCount: string;
  ecommerceExistingPlatform: string;
  ecommerceNeeds: string[];
  ecommercePlatform: string;
  organisationalPages: string[];
  organisationalFeatures: string[];
  
  // Questions spécifiques par industrie - E-commerce
  autoCompatibility: string[]; // Auto: compatibilité véhicules
  autoSearchFeatures: string[]; // Auto: recherche par VIN, année/marque/modèle
  autoProductType: string; // Auto: type de produits vendus
  autoCustomerType: string; // Auto: type d'acheteur
  autoCurrentSales: string; // Auto: processus de vente actuel
  restaurantFeatures: string[]; // Restaurant: menu, réservations, livraison
  restaurantType: string; // Restaurant: type de restaurant
  restaurantSalesType: string; // Restaurant: type de service (sur place, livraison, etc.)
  retailFeatures: string[]; // Commerce: stocks, fidélité
  retailType: string; // Commerce: type de commerce
  retailProductTypes: string; // Commerce: types de produits vendus
  
  // Questions spécifiques par industrie - Tous types de sites
  healthCompliance: string[]; // Santé: dossiers patients, conformité
  educationFeatures: string[]; // Éducation: portail étudiants
  nonprofitFeatures: string[]; // OBNL: dons, bénévoles
  constructionServices: string[]; // Construction: types de services
  constructionFeatures: string[]; // Construction: fonctionnalités
  servicesFeatures: string[]; // Services pro: fonctionnalités
  architectureFeatures: string[]; // Architecture: portfolio
  artsFeatures: string[]; // Arts de la scène: billetterie
  transportFeatures: string[]; // Transport: logistique
  techFeatures: string[]; // Tech: SaaS, documentation

  // Section 4: Portails
  portalType: PortalType;
  portalUsers: string;
  portalRoles: string;
  portalClientFeatures: string[];
  portalEmployeeFeatures: string[];
  portalHRFeatures: string[];

  // Section 5: Modules
  selectedModules: string[];
  customModule: string;

  // Section 6: Services Canva
  canvaServices: string[];
  canvaQuantity: string;
  canvaFrequency: string;
  canvaDeadline: string;
  canvaSpecifications: string;
  infographicSupports: string[];
  canvaCustomQuantity: string;
  canvaCustomDesignTypes: string;
  canvaCustomDeadline: string;

  // Section 7: Branding & Style
  logo: string | null;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  typography: string;
  theme: string; // moderne, rustique, futuriste (pour sites web)
  portalStyle: string; // light, dark, auto (pour portails/modules)
  mobileOptions: string[]; // responsive, pwa, native-look

  // Section 8: Domaine & hébergement
  domainType: string;
  hostingPreference: string;
  hostingProvider: string;

  // Section 9: Finances
  paymentMode: PaymentMode;
  financingTerm: string;
  monthlyBudget: string;
  
  // Maintenance et entretien
  maintenanceLevel: string;
  maintenancePaymentFrequency: string;

  // Section 10: Résumé
  otherNeeds: string;
  contactMethod: string;
  clientEmail: string;
  clientPhone: string;

  // Legacy fields for compatibility
  serviceType: ServiceType;
  features: string[];
  companySize: string;
  budget: string;
  timeline: string;
}

export const INDUSTRIES = [
  { value: "commerce", label: "Commerce de détail" },
  { value: "transport", label: "Transport et logistique" },
  { value: "sante", label: "Santé et bien-être" },
  { value: "construction", label: "Construction et rénovation" },
  { value: "tech", label: "Technologie et informatique" },
  { value: "education", label: "Éducation et formation" },
  { value: "obnl", label: "Organisme à but non lucratif" },
  { value: "restauration", label: "Restauration" },
  { value: "architecture", label: "Architecture et design" },
  { value: "auto", label: "Vente automobile et pièces" },
  { value: "arts-scene", label: "Arts de la scène" },
  { value: "demenagement", label: "Déménagement" },
  { value: "immobilier", label: "Secteur immobilier" },
  { value: "finances", label: "Services financiers et comptabilité" },
  { value: "beaute", label: "Beauté et esthétique" },
];

export const MODULES = [
  {
    id: "calculateur-pdf",
    label: "Calculateur PDF",
    description: "Générez des devis et estimations en PDF automatiquement",
  },
  {
    id: "rendez-vous",
    label: "Système de rendez-vous",
    description: "Calendrier de réservation en ligne avec confirmations automatiques",
  },
  {
    id: "tickets",
    label: "Gestion de tickets",
    description: "Support client et suivi des demandes d'assistance",
  },
  {
    id: "crm-lite",
    label: "CRM Lite",
    description: "Gestion simplifiée de vos contacts et opportunités",
  },
  {
    id: "projets-lite",
    label: "Gestion de projets Lite",
    description: "Suivi de projets, tâches et délais",
  },
  {
    id: "rh-lite",
    label: "RH Lite",
    description: "Gestion simplifiée des ressources humaines",
  },
  {
    id: "base-connaissances",
    label: "Base de connaissances",
    description: "Documentation centralisée et recherche intelligente",
  },
  {
    id: "chat-interne",
    label: "Chat interne",
    description: "Messagerie instantanée pour votre équipe",
  },
  {
    id: "onboarding",
    label: "Onboarding automatisé",
    description: "Parcours d'accueil personnalisé pour nouveaux utilisateurs",
  },
  {
    id: "signatures",
    label: "Signatures électroniques",
    description: "Signature de documents en ligne sécurisée",
  },
  {
    id: "kpi-dashboard",
    label: "KPI & Tableaux de bord",
    description: "Visualisation de données et indicateurs de performance",
  },
];
