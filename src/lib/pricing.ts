// Tarification complète - La Trousse Digitale
// Tous les prix sont en CAD / mois

// === SITES WEB ===
export const WEBSITE_PRICES = {
  landing: 60,
  vitrine: 80,
  organisationnel: 120,
  blog: 40, // par page additionnelle
  traduction: 30, // par page traduite
  ecommerce: 120,
};

// === PORTAILS ===
export const PORTAL_PRICES = {
  client: 90,
  employes: 70,
  rh: 90,
  partenaires: 90,
  admin: 110,
  multifonctions: 150,
  // Prix par utilisateur additionnel (au-delà de 5)
  utilisateurAdditionnel: 5,
};

// === MODULES - Prix mensuels ===
export const MODULE_PRICES: Record<string, { name: string; price: number; category: string }> = {
  // Gestion & Organisation
  "gestionnaire-mdp": { name: "Gestionnaire de mots de passe", price: 30, category: "gestion" },
  "agenda-personnel": { name: "Agenda personnel", price: 40, category: "gestion" },
  "projets": { name: "Gestionnaire de projets", price: 80, category: "gestion" },
  "pointeuse": { name: "Pointeuse de temps", price: 60, category: "gestion" },
  
  // Documents & Facturation
  "documents-ia": { name: "Générateur de documents intelligents", price: 70, category: "documents" },
  "facturation": { name: "Facturation", price: 60, category: "documents" },
  "devis-pdf": { name: "Générateur de devis + PDF", price: 50, category: "documents" },
  
  // Paiements & CRM
  "paiements": { name: "Paiements en ligne", price: 40, category: "crm" },
  "crm": { name: "CRM", price: 70, category: "crm" },
  
  // Calculateurs spécialisés
  "calculateur-intelligent": { name: "Calculateur intelligent", price: 60, category: "calculateurs" },
  "calculateur-distance": { name: "Calculateur de distance", price: 50, category: "calculateurs" },
  "calculateur-superficie": { name: "Calculateur de superficies", price: 50, category: "calculateurs" },
  "calculateur-hypothecaire": { name: "Calculateur hypothécaire", price: 60, category: "calculateurs" },
  
  // IA & Automatisation
  "ia-conversationnelle": { name: "IA conversationnelle", price: 80, category: "ia" },
  
  // Legacy mappings (pour compatibilité avec anciens modules)
  "crm-lite": { name: "CRM", price: 70, category: "crm" },
  "calculateur-pdf": { name: "Calculateur + Devis PDF", price: 110, category: "crm" },
  "projets-lite": { name: "Gestion de projets", price: 80, category: "operations" },
  "taches": { name: "Tâches & échéanciers", price: 50, category: "operations" },
  "calendrier": { name: "Calendrier partagé", price: 40, category: "operations" },
  "rendez-vous": { name: "Gestionnaire de rendez-vous", price: 50, category: "operations" },
  "pointage": { name: "Pointage de temps", price: 60, category: "operations" },
  "productivite": { name: "Suivi de productivité", price: 60, category: "operations" },
  "documents": { name: "Gestion de documents", price: 50, category: "content" },
  "base-connaissances": { name: "Base de connaissances", price: 60, category: "content" },
  "procedures": { name: "Procédures internes", price: 50, category: "content" },
  "tickets": { name: "Tickets de support", price: 60, category: "support" },
  "chat-interne": { name: "Messagerie interne", price: 40, category: "support" },
  "notifications": { name: "Notifications automatiques", price: 40, category: "support" },
  "rh-lite": { name: "Gestion des employés", price: 60, category: "hr" },
  "conges": { name: "Congés & absences", price: 40, category: "hr" },
  "documents-rh": { name: "Documents RH", price: 40, category: "hr" },
  "suivi-rh": { name: "Suivi RH", price: 50, category: "hr" },
  "roles-permissions": { name: "Rôles & permissions", price: 50, category: "security" },
  "journal-activite": { name: "Journal d'activité", price: 0, category: "security" },
  "automatisations": { name: "Automatisations", price: 70, category: "ai" },
  "courriels-calendriers": { name: "Courriels & calendriers", price: 40, category: "integrations" },
  "api-webhooks": { name: "API / Webhooks", price: 60, category: "integrations" },
  "onboarding": { name: "Onboarding automatisé", price: 50, category: "hr" },
  "signatures": { name: "Signatures électroniques", price: 50, category: "content" },
  "kpi-dashboard": { name: "KPI & Tableaux de bord", price: 60, category: "operations" },
};

// === MAINTENANCE ===
export const MAINTENANCE_PRICES = {
  basic: 50,
  standard: 150,
  premium: 300,
  enterprise: 450,
};

// === HÉBERGEMENT & DOMAINE ===
export const HOSTING_PRICES = {
  inclus: 0,
  propre: -20, // rabais si le client gère son hébergement
};

export const DOMAIN_PRICES = {
  nouveau: 20,
  existant: 0,
  aucun: 0,
};

// === MULTIPLICATEURS DE PAIEMENT ===
export const PAYMENT_MULTIPLIERS = {
  saas: 1, // prix mensuel standard
  financement: 0.9, // 10% rabais
  achat: 10, // 10x le mensuel (économie de 2 mois)
};

// === FONCTIONS HELPER ===

export const getModulePrice = (moduleId: string): number => {
  return MODULE_PRICES[moduleId]?.price || 0;
};

export const getModuleName = (moduleId: string): string => {
  return MODULE_PRICES[moduleId]?.name || moduleId;
};

export const getWebsitePrice = (type: string): number => {
  return WEBSITE_PRICES[type as keyof typeof WEBSITE_PRICES] || 0;
};

export const getPortalPrice = (type: string): number => {
  return PORTAL_PRICES[type as keyof typeof PORTAL_PRICES] || 0;
};

export const getMaintenancePrice = (level: string): number => {
  return MAINTENANCE_PRICES[level as keyof typeof MAINTENANCE_PRICES] || 0;
};

// Calculer le prix total mensuel
export interface PriceBreakdown {
  website: number;
  portal: number;
  modules: number;
  maintenance: number;
  hosting: number;
  domain: number;
  additionalUsers: number;
  blogPages: number;
  translations: number;
  subtotal: number;
  total: number;
  paymentMode: string;
  paymentMultiplier: number;
}

export const calculateTotalPrice = (data: {
  websiteType?: string | null;
  portalType?: string | null;
  selectedModules?: string[];
  maintenanceLevel?: string;
  hostingPreference?: string;
  domainType?: string;
  numberOfUsers?: number;
  numberOfBlogPages?: number;
  numberOfTranslatedPages?: number;
  paymentMode?: string | null;
}): PriceBreakdown => {
  const websitePrice = data.websiteType ? getWebsitePrice(data.websiteType) : 0;
  const portalPrice = data.portalType ? getPortalPrice(data.portalType) : 0;
  
  const modulesPrice = (data.selectedModules || []).reduce((sum, moduleId) => {
    return sum + getModulePrice(moduleId);
  }, 0);
  
  const maintenancePrice = data.maintenanceLevel ? getMaintenancePrice(data.maintenanceLevel) : 0;
  
  const hostingPrice = HOSTING_PRICES[data.hostingPreference as keyof typeof HOSTING_PRICES] || 0;
  const domainPrice = DOMAIN_PRICES[data.domainType as keyof typeof DOMAIN_PRICES] || 0;
  
  // Utilisateurs additionnels (au-delà de 5 inclus)
  const additionalUsers = Math.max(0, (data.numberOfUsers || 0) - 5);
  const additionalUsersPrice = additionalUsers * PORTAL_PRICES.utilisateurAdditionnel;
  
  // Pages blog additionnelles
  const blogPagesPrice = (data.numberOfBlogPages || 0) * WEBSITE_PRICES.blog;
  
  // Traductions
  const translationsPrice = (data.numberOfTranslatedPages || 0) * WEBSITE_PRICES.traduction;
  
  const subtotal = websitePrice + portalPrice + modulesPrice + maintenancePrice + 
                   hostingPrice + domainPrice + additionalUsersPrice + blogPagesPrice + translationsPrice;
  
  const paymentMode = data.paymentMode || "saas";
  const paymentMultiplier = PAYMENT_MULTIPLIERS[paymentMode as keyof typeof PAYMENT_MULTIPLIERS] || 1;
  
  const total = subtotal * paymentMultiplier;
  
  return {
    website: websitePrice,
    portal: portalPrice,
    modules: modulesPrice,
    maintenance: maintenancePrice,
    hosting: hostingPrice,
    domain: domainPrice,
    additionalUsers: additionalUsersPrice,
    blogPages: blogPagesPrice,
    translations: translationsPrice,
    subtotal,
    total,
    paymentMode,
    paymentMultiplier,
  };
};
