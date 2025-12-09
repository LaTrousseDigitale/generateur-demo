import { z } from "zod";

// Maximum lengths for text fields
const MAX_SHORT_TEXT = 100;
const MAX_MEDIUM_TEXT = 255;
const MAX_LONG_TEXT = 1000;
const MAX_ARRAY_LENGTH = 50;

// Sanitize string by trimming and limiting length
const sanitizedString = (maxLength: number) =>
  z.string().trim().max(maxLength).default("");

// Sanitize optional string
const optionalSanitizedString = (maxLength: number) =>
  z.string().trim().max(maxLength).optional().nullable();

// Sanitize array of strings
const sanitizedStringArray = (maxLength: number = MAX_ARRAY_LENGTH) =>
  z.array(z.string().trim().max(MAX_SHORT_TEXT)).max(maxLength).default([]);

// Email validation with proper format check
const emailSchema = z
  .string()
  .trim()
  .max(MAX_MEDIUM_TEXT)
  .refine(
    (val) => {
      if (!val) return true; // Allow empty
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val);
    },
    { message: "Format d'email invalide" }
  );

// Color validation (hex format)
const colorSchema = z
  .string()
  .trim()
  .regex(/^#[0-9A-Fa-f]{6}$/, "Format de couleur invalide")
  .optional()
  .nullable()
  .or(z.literal(""));

// Valid industry values
const validIndustries = [
  "services", "commerce", "transport", "sante", "construction",
  "tech", "education", "obnl", "restauration", "architecture",
  "auto", "arts-scene", "demenagement", "immobilier", "finances", "autre"
];

// Valid module IDs
const validModules = [
  "calculateur-pdf", "rendez-vous", "tickets", "crm-lite",
  "projets-lite", "rh-lite", "base-connaissances", "chat-interne",
  "onboarding", "signatures", "kpi-dashboard"
];

// Valid solution types
const validSolutionTypes = ["website", "portal", "module"];

// Valid website types
const validWebsiteTypes = ["vitrine", "ecommerce", "organisationnel", null];

// Valid portal types  
const validPortalTypes = ["client", "employes", "rh", "mixte", null];

// Valid payment modes
const validPaymentModes = ["abonnement", "proprietaire", "financement", null];

// Valid maintenance levels
const validMaintenanceLevels = ["essentiel", "avance", "premium", ""];

// Valid domain types
const validDomainTypes = ["nouveau", "existant", "transfert", ""];

// Valid hosting preferences
const validHostingPreferences = ["lovable", "externe", ""];

export const questionnaireSchema = z.object({
  // Section 1: Informations générales
  companyName: sanitizedString(MAX_SHORT_TEXT),
  industry: z.string().refine(
    (val) => !val || validIndustries.includes(val),
    { message: "Industrie invalide" }
  ).default(""),
  mainObjectives: sanitizedStringArray(),
  startDate: optionalSanitizedString(MAX_SHORT_TEXT),
  financing: optionalSanitizedString(MAX_SHORT_TEXT),

  // Section 2: Type de solution
  solutionTypes: z.array(
    z.string().refine((val) => validSolutionTypes.includes(val))
  ).max(3).default([]),

  // Section 3: Sites Web
  websiteType: z.enum(["vitrine", "ecommerce", "organisationnel"]).nullable().default(null),
  websitePages: sanitizedStringArray(),
  websiteContent: sanitizedStringArray(),
  websiteSections: sanitizedStringArray(),
  ecommerceProductCount: optionalSanitizedString(MAX_SHORT_TEXT),
  ecommerceExistingPlatform: optionalSanitizedString(MAX_SHORT_TEXT),
  ecommerceNeeds: sanitizedStringArray(),
  ecommercePlatform: optionalSanitizedString(MAX_SHORT_TEXT),
  organisationalPages: sanitizedStringArray(),
  organisationalFeatures: sanitizedStringArray(),

  // Industry-specific e-commerce questions
  autoCompatibility: sanitizedStringArray(),
  autoSearchFeatures: sanitizedStringArray(),
  autoProductType: optionalSanitizedString(MAX_SHORT_TEXT),
  autoCustomerType: optionalSanitizedString(MAX_SHORT_TEXT),
  autoCurrentSales: optionalSanitizedString(MAX_SHORT_TEXT),
  restaurantFeatures: sanitizedStringArray(),
  restaurantType: optionalSanitizedString(MAX_SHORT_TEXT),
  restaurantSalesType: optionalSanitizedString(MAX_SHORT_TEXT),
  retailFeatures: sanitizedStringArray(),
  retailType: optionalSanitizedString(MAX_SHORT_TEXT),
  retailProductTypes: optionalSanitizedString(MAX_SHORT_TEXT),

  // Industry-specific all site types
  healthCompliance: sanitizedStringArray(),
  educationFeatures: sanitizedStringArray(),
  nonprofitFeatures: sanitizedStringArray(),
  constructionServices: sanitizedStringArray(),
  constructionFeatures: sanitizedStringArray(),
  servicesFeatures: sanitizedStringArray(),
  architectureFeatures: sanitizedStringArray(),
  artsFeatures: sanitizedStringArray(),
  transportFeatures: sanitizedStringArray(),
  techFeatures: sanitizedStringArray(),

  // Section 4: Portails
  portalType: z.enum(["client", "employes", "rh", "mixte"]).nullable().default(null),
  portalUsers: optionalSanitizedString(MAX_SHORT_TEXT),
  portalRoles: optionalSanitizedString(MAX_SHORT_TEXT),
  portalClientFeatures: sanitizedStringArray(),
  portalEmployeeFeatures: sanitizedStringArray(),
  portalHRFeatures: sanitizedStringArray(),

  // Section 5: Modules
  selectedModules: z.array(
    z.string().refine((val) => validModules.includes(val), { message: "Module invalide" })
  ).max(20).default([]),
  customModule: optionalSanitizedString(MAX_LONG_TEXT),

  // Section 6: Services Canva
  canvaServices: sanitizedStringArray(),
  canvaQuantity: optionalSanitizedString(MAX_SHORT_TEXT),
  canvaFrequency: optionalSanitizedString(MAX_SHORT_TEXT),
  canvaDeadline: optionalSanitizedString(MAX_SHORT_TEXT),
  canvaSpecifications: optionalSanitizedString(MAX_LONG_TEXT),
  infographicSupports: sanitizedStringArray(),
  canvaCustomQuantity: optionalSanitizedString(MAX_SHORT_TEXT),
  canvaCustomDesignTypes: optionalSanitizedString(MAX_MEDIUM_TEXT),
  canvaCustomDeadline: optionalSanitizedString(MAX_SHORT_TEXT),

  // Section 7: Branding
  logo: optionalSanitizedString(MAX_LONG_TEXT), // Base64 or URL
  primaryColor: colorSchema,
  accentColor: colorSchema,
  secondaryColor: colorSchema,
  typography: optionalSanitizedString(MAX_SHORT_TEXT),

  // Section 8: Domaine & hébergement
  domainType: z.string().refine(
    (val) => !val || validDomainTypes.includes(val),
    { message: "Type de domaine invalide" }
  ).default(""),
  hostingPreference: z.string().refine(
    (val) => !val || validHostingPreferences.includes(val),
    { message: "Préférence d'hébergement invalide" }
  ).default(""),
  hostingProvider: optionalSanitizedString(MAX_SHORT_TEXT),

  // Section 9: Finances
  paymentMode: z.enum(["abonnement", "proprietaire", "financement"]).nullable().default(null),
  financingTerm: optionalSanitizedString(MAX_SHORT_TEXT),
  monthlyBudget: optionalSanitizedString(MAX_SHORT_TEXT),

  // Maintenance
  maintenanceLevel: z.string().refine(
    (val) => !val || validMaintenanceLevels.includes(val),
    { message: "Niveau de maintenance invalide" }
  ).default(""),
  maintenancePaymentFrequency: optionalSanitizedString(MAX_SHORT_TEXT),

  // Section 10: Résumé
  otherNeeds: optionalSanitizedString(MAX_LONG_TEXT),
  contactMethod: emailSchema.default(""),

  // Legacy fields
  serviceType: z.enum(["portal", "website", "module"]).nullable().default(null),
  features: sanitizedStringArray(),
  companySize: optionalSanitizedString(MAX_SHORT_TEXT),
  budget: optionalSanitizedString(MAX_SHORT_TEXT),
  timeline: optionalSanitizedString(MAX_SHORT_TEXT),
});

export type ValidatedQuestionnaireData = z.infer<typeof questionnaireSchema>;

// Validation function that returns sanitized data or throws error
export function validateQuestionnaireData(data: unknown): ValidatedQuestionnaireData {
  return questionnaireSchema.parse(data);
}

// Safe validation that returns result object instead of throwing
export function safeValidateQuestionnaireData(data: unknown): {
  success: boolean;
  data?: ValidatedQuestionnaireData;
  errors?: z.ZodError;
} {
  const result = questionnaireSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}
