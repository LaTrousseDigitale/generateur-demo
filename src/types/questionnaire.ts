export type ServiceType = "portal" | "website" | "module" | null;
export type WebsiteType = "landing" | "vitrine" | "ecommerce" | "organisationnel" | null;
export type PortalType = "client" | "employes" | "rh" | "admin" | "multifonctions" | null;
export type PaymentMode = "saas" | "financement" | "achat" | null;
export type CompanySize = "solo" | "petite" | "moyenne" | "grande" | null;

export interface QuestionnaireData {
  // PHASE 1: Génération de la démo
  // =============================
  
  // Étape 1: Identification entreprise
  companyName: string;
  industry: string;
  companyType: string; // type d'entreprise (B2B, B2C, mixte, etc.)
  companySize: CompanySize;
  
  // Étape 2: Besoins généraux
  solutionTypes: string[]; // "website", "portal", "module"
  
  // Étape 3: Types de solutions
  websiteType: WebsiteType;
  portalType: PortalType;
  
  // Étape 4: Modules sélectionnés
  selectedModules: string[];
  
  // Étape 5: Fonctionnalités détaillées (questions conditionnelles)
  // Sites Web
  websitePages: string[];
  websiteContent: string[];
  websiteSections: string[];
  blogPages: number; // nombre de pages blog
  translatedPages: number; // nombre de pages à traduire
  
  // E-commerce
  ecommerceProductCount: string;
  ecommerceExistingPlatform: string;
  ecommerceNeeds: string[];
  ecommercePlatform: string;
  
  // Organisationnel
  organisationalPages: string[];
  organisationalFeatures: string[];
  
  // Questions spécifiques par industrie - E-commerce
  autoCompatibility: string[];
  autoSearchFeatures: string[];
  autoProductType: string;
  autoCustomerType: string;
  autoCurrentSales: string;
  restaurantFeatures: string[];
  restaurantType: string;
  restaurantSalesType: string;
  retailFeatures: string[];
  retailType: string;
  retailProductTypes: string;
  
  // Questions spécifiques par industrie - Tous types de sites
  healthCompliance: string[];
  educationFeatures: string[];
  nonprofitFeatures: string[];
  constructionServices: string[];
  constructionFeatures: string[];
  servicesFeatures: string[];
  architectureFeatures: string[];
  artsFeatures: string[];
  transportFeatures: string[];
  techFeatures: string[];

  // Portails
  portalUsers: string; // nombre d'utilisateurs estimé
  portalRoles: string;
  portalClientFeatures: string[];
  portalEmployeeFeatures: string[];
  portalHRFeatures: string[];
  portalAdminFeatures: string[];

  // Branding & Style (pour la démo)
  logo: string | null;
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  typography: string;
  theme: string; // moderne, rustique, futuriste
  portalStyle: string; // light, dark, auto
  mobileOptions: string[];

  // PHASE 2: Options de devis et achat
  // ==================================
  
  // Mode de paiement
  paymentMode: PaymentMode;
  financingTerm: string; // 12, 24, 36 mois
  
  // Hébergement & Domaine (si achat)
  domainType: string; // nouveau, existant, aucun
  domainName: string;
  hostingPreference: string; // inclus, propre, aucun
  hostingProvider: string;
  
  // Maintenance
  maintenanceLevel: string; // basic, standard, premium, enterprise
  maintenancePaymentFrequency: string; // mensuel, annuel
  
  // Options additionnelles
  numberOfUsers: number; // nombre d'utilisateurs pour portails/modules
  numberOfBlogPages: number; // pages blog additionnelles
  numberOfTranslatedPages: number; // pages à traduire
  
  // Services Canva
  canvaServices: string[];
  canvaQuantity: string;
  canvaFrequency: string;
  canvaDeadline: string;
  canvaSpecifications: string;
  infographicSupports: string[];
  canvaCustomQuantity: string;
  canvaCustomDesignTypes: string;
  canvaCustomDeadline: string;

  // Contact et soumission
  otherNeeds: string;
  contactMethod: string;
  clientEmail: string;
  clientPhone: string;
  clientName: string;
  
  // Module personnalisé
  customModule: string;

  // Champs calculés/legacy
  monthlyBudget: string;
  mainObjectives: string[];
  startDate: string;
  financing: string;
  serviceType: ServiceType;
  features: string[];
  budget: string;
  timeline: string;
}

export const INDUSTRIES = [
  { value: "demenagement", label: "Déménagement" },
  { value: "transport", label: "Transport et logistique" },
  { value: "construction", label: "Construction et rénovation" },
  { value: "architecture", label: "Architecture et design" },
  { value: "auto", label: "Vente automobile et pièces" },
  { value: "immobilier", label: "Secteur immobilier" },
  { value: "obnl", label: "Organisme à but non lucratif" },
  { value: "education", label: "Éducation et formation" },
  { value: "tech", label: "Technologie et informatique" },
  { value: "finances", label: "Services financiers et comptabilité" },
  { value: "restauration", label: "Restauration" },
  { value: "commerce", label: "Commerce de détail" },
  { value: "sante", label: "Santé et bien-être" },
  { value: "beaute", label: "Beauté et esthétique" },
  { value: "arts-scene", label: "Arts de la scène" },
  { value: "services", label: "Services professionnels" },
];

export const COMPANY_TYPES = [
  { value: "b2c", label: "B2C", description: "Vente directe aux consommateurs" },
  { value: "b2b", label: "B2B", description: "Vente à d'autres entreprises" },
  { value: "mixte", label: "B2B + B2C", description: "Les deux types de clients" },
  { value: "interne", label: "Interne", description: "Outils pour usage interne uniquement" },
];

export const COMPANY_SIZES = [
  { value: "solo", label: "Travailleur autonome", description: "1 personne" },
  { value: "petite", label: "Petite entreprise", description: "2-10 employés" },
  { value: "moyenne", label: "Moyenne entreprise", description: "11-50 employés" },
  { value: "grande", label: "Grande entreprise", description: "50+ employés" },
];

export const WEBSITE_TYPES = [
  { value: "landing", label: "Landing Page", description: "Page unique de conversion", price: 60 },
  { value: "vitrine", label: "Site Vitrine", description: "Présentation de votre entreprise", price: 80 },
  { value: "ecommerce", label: "E-commerce", description: "Boutique en ligne complète", price: 120 },
  { value: "organisationnel", label: "Site Organisationnel", description: "Ressources et documents internes", price: 120 },
];

export const PORTAL_TYPES = [
  { value: "client", label: "Portail Client", description: "Espace sécurisé pour vos clients", price: 90 },
  { value: "employes", label: "Portail Employés", description: "Intranet et outils internes", price: 70 },
  { value: "rh", label: "Portail RH", description: "Gestion des ressources humaines", price: 90 },
  { value: "admin", label: "Portail Administrateur", description: "Gestion centralisée complète", price: 110 },
  { value: "multifonctions", label: "Portail Multifonctions", description: "Combinaison de plusieurs types", price: 150 },
];

// Modules disponibles avec pricing
export const MODULES = [
  // Gestion & Organisation
  { id: "gestionnaire-mdp", label: "Gestionnaire de mots de passe", description: "Stockage sécurisé des accès", price: 30, category: "gestion" },
  { id: "agenda-personnel", label: "Agenda personnel", description: "Calendrier et rappels", price: 40, category: "gestion" },
  { id: "projets", label: "Gestionnaire de projets", description: "Suivi des projets et tâches", price: 80, category: "gestion" },
  { id: "pointeuse", label: "Pointeuse de temps", description: "Suivi des heures travaillées", price: 60, category: "gestion" },
  
  // Documents & Facturation
  { id: "documents-ia", label: "Générateur de documents intelligents", description: "Création automatisée de documents", price: 70, category: "documents" },
  { id: "facturation", label: "Facturation", description: "Création et envoi de factures", price: 60, category: "documents" },
  { id: "devis-pdf", label: "Générateur de devis + PDF", description: "Soumissions professionnelles", price: 50, category: "documents" },
  
  // Paiements & CRM
  { id: "paiements", label: "Paiements en ligne", description: "Acceptez les paiements", price: 40, category: "crm" },
  { id: "crm", label: "CRM", description: "Gestion de la relation client", price: 70, category: "crm" },
  
  // Calculateurs spécialisés
  { id: "calculateur-intelligent", label: "Calculateur intelligent", description: "Estimations automatiques", price: 60, category: "calculateurs" },
  { id: "calculateur-distance", label: "Calculateur de distance", description: "Calcul trajets et itinéraires", price: 50, category: "calculateurs" },
  { id: "calculateur-superficie", label: "Calculateur de superficies", description: "Mesures et surfaces", price: 50, category: "calculateurs" },
  { id: "calculateur-hypothecaire", label: "Calculateur hypothécaire", description: "Simulations de financement", price: 60, category: "calculateurs" },
  
  // IA & Automatisation
  { id: "ia-conversationnelle", label: "IA conversationnelle", description: "Chatbot intelligent", price: 80, category: "ia" },
];

// Options de paiement
export const PAYMENT_MODES = [
  { value: "saas", label: "SaaS (Abonnement)", description: "Paiement mensuel tout inclus", multiplier: 1 },
  { value: "financement", label: "Financement", description: "Étalez sur 12, 24 ou 36 mois", multiplier: 0.9 },
  { value: "achat", label: "Achat unique", description: "Payez une seule fois (x12 mensualités)", multiplier: 10 },
];

export const FINANCING_TERMS = [
  { value: "12", label: "12 mois", description: "Paiement en 1 an" },
  { value: "24", label: "24 mois", description: "Paiement en 2 ans" },
  { value: "36", label: "36 mois", description: "Paiement en 3 ans" },
];

export const MAINTENANCE_LEVELS = [
  { value: "basic", label: "Basique", description: "Mises à jour de sécurité", price: 50 },
  { value: "standard", label: "Standard", description: "Mises à jour + support email", price: 150 },
  { value: "premium", label: "Premium", description: "Tout inclus + support prioritaire", price: 300 },
  { value: "enterprise", label: "Entreprise", description: "Support dédié 24/7", price: 450 },
];

export const HOSTING_OPTIONS = [
  { value: "inclus", label: "Hébergement inclus", description: "On s'occupe de tout", price: 0 },
  { value: "propre", label: "Mon propre hébergement", description: "Vous gérez l'hébergement", price: -20 },
];

export const DOMAIN_OPTIONS = [
  { value: "nouveau", label: "Nouveau domaine", description: "On enregistre pour vous", price: 20 },
  { value: "existant", label: "Domaine existant", description: "Vous avez déjà un domaine", price: 0 },
  { value: "aucun", label: "Pas besoin", description: "Sous-domaine gratuit", price: 0 },
];
