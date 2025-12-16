// Tarification complète - La Trousse Digitale
// Tous les prix sont en CAD / mois

// === SITES WEB ===
export const WEBSITE_PRICES = {
  landing: 60,
  vitrine: 80,
  organisationnel: 120,
  blog: 40,
  traduction: 30,
  ecommerce: 120,
};

// === PORTAILS ===
export const PORTAL_PRICES = {
  client: 90,
  employes: 70,
  rh: 90,
  partenaires: 90,
  admin: 110,
  mixte: 100, // moyenne
};

// === RELATION CLIENT & VENTES ===
export const CRM_PRICES = {
  crm: 70,
  calculateur: 60,
  devisPdf: 50,
  facturation: 60,
  paiements: 40,
  suiviClient: 50,
};

// === PLANIFICATION & OPÉRATIONS ===
export const OPERATIONS_PRICES = {
  projets: 80,
  taches: 50,
  calendrier: 40,
  rendezvous: 50,
  pointage: 60,
  productivite: 60,
};

// === CONTENU & ORGANISATION ===
export const CONTENT_PRICES = {
  documents: 50,
  connaissances: 60,
  procedures: 50,
};

// === SUPPORT & COMMUNICATION ===
export const SUPPORT_PRICES = {
  tickets: 60,
  messagerie: 40,
  notifications: 40,
};

// === RESSOURCES HUMAINES ===
export const HR_PRICES = {
  employes: 60,
  conges: 40,
  documentsRh: 40,
  suiviRh: 50,
};

// === SÉCURITÉ & ACCÈS ===
export const SECURITY_PRICES = {
  roles: 50,
  journal: 0, // Inclus
};

// === AUTOMATISATION & IA ===
export const AI_PRICES = {
  automatisations: 70,
  iaConversationnelle: 80,
};

// === INTÉGRATIONS ===
export const INTEGRATION_PRICES = {
  courrielsCalendriers: 40,
  apiWebhooks: 60,
};

// === MODULES MAPPÉS (pour le questionnaire) ===
export const MODULE_PRICES: Record<string, { name: string; price: number; category: string }> = {
  // Relation client & ventes
  "crm-lite": { name: "CRM", price: 70, category: "crm" },
  "calculateur-pdf": { name: "Calculateur en ligne + Devis PDF", price: 110, category: "crm" }, // 60+50
  "facturation": { name: "Facturation", price: 60, category: "crm" },
  "paiements": { name: "Paiements en ligne", price: 40, category: "crm" },
  "suivi-client": { name: "Suivi client", price: 50, category: "crm" },
  
  // Planification & opérations
  "projets-lite": { name: "Gestion de projets", price: 80, category: "operations" },
  "taches": { name: "Tâches & échéanciers", price: 50, category: "operations" },
  "calendrier": { name: "Calendrier partagé", price: 40, category: "operations" },
  "rendez-vous": { name: "Gestionnaire de rendez-vous", price: 50, category: "operations" },
  "pointage": { name: "Pointage de temps", price: 60, category: "operations" },
  "productivite": { name: "Suivi de productivité", price: 60, category: "operations" },
  
  // Contenu & organisation
  "documents": { name: "Gestion de documents", price: 50, category: "content" },
  "base-connaissances": { name: "Base de connaissances", price: 60, category: "content" },
  "procedures": { name: "Procédures internes", price: 50, category: "content" },
  
  // Support & communication
  "tickets": { name: "Tickets de support", price: 60, category: "support" },
  "chat-interne": { name: "Messagerie interne", price: 40, category: "support" },
  "notifications": { name: "Notifications automatiques", price: 40, category: "support" },
  
  // Ressources humaines
  "rh-lite": { name: "Gestion des employés", price: 60, category: "hr" },
  "conges": { name: "Congés & absences", price: 40, category: "hr" },
  "documents-rh": { name: "Documents RH", price: 40, category: "hr" },
  "suivi-rh": { name: "Suivi RH", price: 50, category: "hr" },
  
  // Sécurité & accès
  "roles-permissions": { name: "Rôles & permissions", price: 50, category: "security" },
  "journal-activite": { name: "Journal d'activité", price: 0, category: "security" }, // Inclus
  
  // Automatisation & IA
  "automatisations": { name: "Automatisations", price: 70, category: "ai" },
  "ia-conversationnelle": { name: "IA conversationnelle", price: 80, category: "ai" },
  
  // Intégrations
  "courriels-calendriers": { name: "Courriels & calendriers", price: 40, category: "integrations" },
  "api-webhooks": { name: "API / Webhooks", price: 60, category: "integrations" },
  
  // Legacy mappings (pour compatibilité)
  "onboarding": { name: "Onboarding automatisé", price: 50, category: "hr" },
  "signatures": { name: "Signatures électroniques", price: 50, category: "content" },
  "kpi-dashboard": { name: "KPI & Tableaux de bord", price: 60, category: "operations" },
};

// === MAINTENANCE (inchangé) ===
export const MAINTENANCE_PRICES = {
  basic: 50,
  standard: 150,
  premium: 300,
  enterprise: 450,
};

// Fonction helper pour obtenir le prix d'un module
export const getModulePrice = (moduleId: string): number => {
  return MODULE_PRICES[moduleId]?.price || 0;
};

// Fonction helper pour obtenir le nom d'un module
export const getModuleName = (moduleId: string): string => {
  return MODULE_PRICES[moduleId]?.name || moduleId;
};
