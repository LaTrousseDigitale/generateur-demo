import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  Puzzle, Check, Sparkles, Info, Star, ChevronDown, ChevronUp,
  Globe, ShoppingCart, Lock, Users, FileText, Calendar, 
  CreditCard, MessageSquare, BarChart3, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ============ FONCTIONNALITÉS PAR TYPE DE SITE ============

const VITRINE_FEATURES = {
  pages: [
    { id: "accueil", label: "Page d'accueil", essential: true },
    { id: "apropos", label: "À propos", essential: true },
    { id: "services", label: "Services", essential: true },
    { id: "portfolio", label: "Portfolio / Réalisations" },
    { id: "blog", label: "Blog / Actualités" },
    { id: "contact", label: "Contact", essential: true },
    { id: "faq", label: "FAQ" },
    { id: "equipe", label: "Notre équipe" },
  ],
  sections: [
    { id: "temoignages", label: "Témoignages clients", tip: "Augmente la confiance de 72%" },
    { id: "galerie", label: "Galerie photos" },
    { id: "carte", label: "Carte / Localisation" },
    { id: "formulaire", label: "Formulaire de contact", essential: true },
    { id: "newsletter", label: "Inscription newsletter" },
    { id: "reseaux", label: "Réseaux sociaux" },
  ],
};

const ECOMMERCE_FEATURES = {
  core: [
    { id: "catalogue", label: "Catalogue produits", essential: true },
    { id: "panier", label: "Panier d'achat", essential: true },
    { id: "paiement", label: "Paiement sécurisé", essential: true, tip: "Stripe, PayPal, etc." },
    { id: "comptes", label: "Comptes clients" },
    { id: "recherche", label: "Recherche avancée" },
    { id: "filtres", label: "Filtres par catégorie/prix" },
  ],
  advanced: [
    { id: "variantes", label: "Variantes (tailles, couleurs)" },
    { id: "avis", label: "Avis clients vérifiés", tip: "Augmente les ventes de 18%" },
    { id: "promo", label: "Codes promo / Remises" },
    { id: "livraison", label: "Calcul frais de livraison" },
    { id: "stocks", label: "Gestion des stocks temps réel" },
    { id: "abonnements", label: "Abonnements récurrents" },
    { id: "dropship", label: "Dropshipping" },
  ],
};

const PORTAL_CLIENT_FEATURES = [
  { id: "documents", label: "Consultation documents", essential: true },
  { id: "factures", label: "Factures et paiements", tip: "Automatise le suivi des paiements" },
  { id: "historique", label: "Historique des transactions" },
  { id: "signatures", label: "Signatures électroniques" },
  { id: "formulaires", label: "Formulaires personnalisés" },
  { id: "notifications", label: "Notifications automatiques" },
  { id: "messagerie", label: "Messagerie sécurisée" },
];

const PORTAL_EMPLOYEE_FEATURES = [
  { id: "feuilles-temps", label: "Feuilles de temps" },
  { id: "projets", label: "Gestion de projets" },
  { id: "docs-internes", label: "Documentation interne" },
  { id: "onboarding", label: "Onboarding automatisé" },
  { id: "chat", label: "Chat d'équipe" },
  { id: "calendrier", label: "Calendrier partagé" },
];

const PORTAL_HR_FEATURES = [
  { id: "dossiers", label: "Dossiers employés" },
  { id: "conges", label: "Gestion des congés" },
  { id: "formations", label: "Formations et certifications" },
  { id: "recrutement", label: "Recrutement et candidatures" },
  { id: "evaluations", label: "Évaluations de performance" },
  { id: "paie", label: "Intégration paie" },
];

// ============ FONCTIONNALITÉS SPÉCIFIQUES PAR INDUSTRIE ============

const INDUSTRY_FEATURES: Record<string, {
  vitrine?: { title: string; features: Array<{ id: string; label: string; tip?: string }> };
  ecommerce?: { title: string; features: Array<{ id: string; label: string; tip?: string }> };
}> = {
  auto: {
    vitrine: {
      title: "Spécifique Automobile",
      features: [
        { id: "rdv-auto", label: "Prise de rendez-vous atelier" },
        { id: "galerie-vehicules", label: "Galerie véhicules/réalisations" },
        { id: "soumission-auto", label: "Demande de soumission" },
        { id: "horaires", label: "Horaires d'ouverture dynamiques" },
      ],
    },
    ecommerce: {
      title: "E-commerce Automobile",
      features: [
        { id: "recherche-ymm", label: "Recherche Année/Marque/Modèle", tip: "Essentiel pour pièces auto" },
        { id: "recherche-vin", label: "Recherche par numéro VIN" },
        { id: "diagrammes", label: "Diagrammes de pièces interactifs" },
        { id: "compatibilite", label: "Vérification compatibilité auto" },
        { id: "oem-aftermarket", label: "Catalogue OEM vs Aftermarket" },
        { id: "garanties", label: "Gestion des garanties pièces" },
      ],
    },
  },
  restauration: {
    vitrine: {
      title: "Spécifique Restaurant",
      features: [
        { id: "menu-photos", label: "Menu avec photos" },
        { id: "reservations", label: "Réservation de tables", tip: "Réduit les no-shows de 30%" },
        { id: "chef", label: "Présentation du chef" },
        { id: "evenements", label: "Événements spéciaux" },
        { id: "carte-vins", label: "Carte des vins" },
      ],
    },
    ecommerce: {
      title: "Commandes en ligne",
      features: [
        { id: "commande-ligne", label: "Commande en ligne (pick-up/livraison)" },
        { id: "allergenes", label: "Gestion allergènes", tip: "Obligatoire légalement" },
        { id: "fidelite", label: "Programme de fidélité" },
        { id: "horaires-dyn", label: "Horaires de livraison dynamiques" },
      ],
    },
  },
  sante: {
    vitrine: {
      title: "Spécifique Santé",
      features: [
        { id: "rdv-sante", label: "Prise de rendez-vous en ligne", tip: "Réduit les appels de 60%" },
        { id: "specialites", label: "Équipe et spécialités" },
        { id: "faq-sante", label: "FAQ santé" },
        { id: "urgences", label: "Informations d'urgence" },
        { id: "assurances", label: "Assurances acceptées" },
      ],
    },
    ecommerce: {
      title: "E-commerce Santé",
      features: [
        { id: "produits-sante", label: "Boutique produits santé" },
        { id: "rdv-payant", label: "Consultations payantes en ligne" },
        { id: "forfaits", label: "Forfaits et abonnements" },
        { id: "ordonnances", label: "Gestion des ordonnances" },
      ],
    },
  },
  construction: {
    vitrine: {
      title: "Spécifique Construction",
      features: [
        { id: "portfolio-projets", label: "Portfolio de projets" },
        { id: "soumission-constr", label: "Demande de soumission" },
        { id: "certifications", label: "Licences et certifications", tip: "Renforce la crédibilité" },
        { id: "zone-service", label: "Zone de service" },
      ],
    },
    ecommerce: {
      title: "E-commerce Construction",
      features: [
        { id: "catalogue-materiaux", label: "Catalogue de matériaux" },
        { id: "calculateur-qte", label: "Calculateur de quantités" },
        { id: "prix-volume", label: "Prix par volume" },
        { id: "livraison-chantier", label: "Livraison sur chantier" },
        { id: "comptes-b2b", label: "Comptes professionnels B2B" },
      ],
    },
  },
  commerce: {
    ecommerce: {
      title: "Commerce de détail",
      features: [
        { id: "click-collect", label: "Click & Collect" },
        { id: "stocks-magasin", label: "Stock en magasin temps réel" },
        { id: "fidelite-comm", label: "Programme de fidélité" },
        { id: "gift-cards", label: "Cartes-cadeaux" },
      ],
    },
  },
  education: {
    vitrine: {
      title: "Spécifique Éducation",
      features: [
        { id: "programmes", label: "Présentation des programmes" },
        { id: "calendrier-sessions", label: "Calendrier des sessions" },
        { id: "equipe-pedagogique", label: "Équipe pédagogique" },
        { id: "visite-virtuelle", label: "Visite virtuelle" },
      ],
    },
    ecommerce: {
      title: "Formation en ligne",
      features: [
        { id: "cours-ligne", label: "Catalogue de cours" },
        { id: "inscriptions", label: "Inscriptions et paiements" },
        { id: "certificats", label: "Certificats automatisés" },
        { id: "acces-limite", label: "Accès limité dans le temps" },
      ],
    },
  },
  services: {
    vitrine: {
      title: "Spécifique Services",
      features: [
        { id: "processus", label: "Processus de travail illustré" },
        { id: "devis", label: "Demande de devis en ligne" },
        { id: "expertise", label: "Présentation de l'expertise" },
      ],
    },
  },
  obnl: {
    vitrine: {
      title: "Spécifique OBNL",
      features: [
        { id: "mission", label: "Mission et valeurs" },
        { id: "impact", label: "Rapports d'impact" },
        { id: "benevoles", label: "Équipe et bénévoles" },
        { id: "comment-aider", label: "Comment nous aider" },
      ],
    },
    ecommerce: {
      title: "Dons et événements",
      features: [
        { id: "dons", label: "Dons en ligne sécurisés" },
        { id: "campagnes", label: "Campagnes de financement" },
        { id: "billets", label: "Billets d'événements" },
        { id: "recus-fiscaux", label: "Reçus fiscaux automatiques" },
      ],
    },
  },
};

// ============ MODULES ADDITIONNELS ============

const MODULES = [
  { 
    id: "crm-lite", 
    label: "CRM Lite", 
    description: "Gestion des contacts et prospects",
    icon: Users,
  },
  { 
    id: "rendez-vous", 
    label: "Prise de rendez-vous", 
    description: "Calendrier et réservations",
    icon: Calendar,
  },
  { 
    id: "calculateur-pdf", 
    label: "Calculateur / Soumissions PDF", 
    description: "Générez des devis automatiquement",
    icon: FileText,
  },
  { 
    id: "signatures", 
    label: "Signatures électroniques", 
    description: "Contrats et documents signés",
    icon: FileText,
  },
  { 
    id: "kpi-dashboard", 
    label: "Tableau de bord KPI", 
    description: "Suivez vos indicateurs clés",
    icon: BarChart3,
  },
  { 
    id: "chat-interne", 
    label: "Chat interne", 
    description: "Communication d'équipe",
    icon: MessageSquare,
  },
  { 
    id: "projets-lite", 
    label: "Gestion de projets Lite", 
    description: "Suivi des tâches et projets",
    icon: Briefcase,
  },
  { 
    id: "base-connaissances", 
    label: "Base de connaissances", 
    description: "Documentation et FAQ",
    icon: FileText,
  },
];

// Modules recommandés par industrie
const INDUSTRY_RECOMMENDED_MODULES: Record<string, string[]> = {
  auto: ["calculateur-pdf", "crm-lite", "rendez-vous"],
  restauration: ["rendez-vous", "crm-lite", "kpi-dashboard"],
  commerce: ["crm-lite", "kpi-dashboard"],
  sante: ["rendez-vous", "base-connaissances", "signatures"],
  construction: ["projets-lite", "calculateur-pdf", "signatures"],
  education: ["base-connaissances", "kpi-dashboard"],
  obnl: ["crm-lite", "base-connaissances"],
  services: ["rendez-vous", "crm-lite", "calculateur-pdf"],
};

// ============ COMPONENT ============

export const StepFeatures = () => {
  const { state, updateData } = useQuiz();
  const { industry, websiteType, portalType, solutionTypes = [] } = state.data;
  
  const [expandedSections, setExpandedSections] = useState<string[]>(["industry", "modules"]);

  // Get current feature selections - using existing 'features' field from QuestionnaireData
  const selectedFeatures = state.data.features || [];
  const selectedModules = state.data.selectedModules || [];

  const toggleFeature = (featureId: string) => {
    const updated = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(f => f !== featureId)
      : [...selectedFeatures, featureId];
    updateData({ features: updated });
  };

  const toggleModule = (moduleId: string) => {
    const updated = selectedModules.includes(moduleId)
      ? selectedModules.filter(m => m !== moduleId)
      : [...selectedModules, moduleId];
    updateData({ selectedModules: updated });
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const hasWebsite = solutionTypes.includes("website");
  const hasPortal = solutionTypes.includes("portal");
  const hasModule = solutionTypes.includes("module");

  const isVitrine = websiteType === "vitrine";
  const isEcommerce = websiteType === "ecommerce";

  const industryFeatures = industry ? INDUSTRY_FEATURES[industry] : null;
  const recommendedModules = industry ? INDUSTRY_RECOMMENDED_MODULES[industry] || [] : [];

  const totalSelected = selectedFeatures.length + selectedModules.length;

  return (
    <TooltipProvider>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent text-white shadow-glow">
            <Puzzle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Quelles fonctionnalités souhaitez-vous?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Sélectionnez les fonctionnalités importantes pour vous. Les options marquées ⭐ sont recommandées pour votre industrie.
          </p>
        </div>

        {/* Selection Counter */}
        {totalSelected > 0 && (
          <div className="flex items-center justify-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {totalSelected} fonctionnalité{totalSelected > 1 ? "s" : ""} sélectionnée{totalSelected > 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* ===== WEBSITE FEATURES ===== */}
        {hasWebsite && (
          <div className="space-y-4">
            {/* Site Vitrine Features */}
            {isVitrine && (
              <>
                <FeatureSection
                  title="Pages du site"
                  icon={<Globe className="w-4 h-4" />}
                  features={VITRINE_FEATURES.pages}
                  selectedFeatures={selectedFeatures}
                  onToggle={toggleFeature}
                />
                <FeatureSection
                  title="Sections importantes"
                  icon={<FileText className="w-4 h-4" />}
                  features={VITRINE_FEATURES.sections}
                  selectedFeatures={selectedFeatures}
                  onToggle={toggleFeature}
                />
              </>
            )}

            {/* E-commerce Features */}
            {isEcommerce && (
              <>
                <FeatureSection
                  title="Fonctionnalités essentielles"
                  icon={<ShoppingCart className="w-4 h-4" />}
                  features={ECOMMERCE_FEATURES.core}
                  selectedFeatures={selectedFeatures}
                  onToggle={toggleFeature}
                />
                <FeatureSection
                  title="Fonctionnalités avancées"
                  icon={<Sparkles className="w-4 h-4" />}
                  features={ECOMMERCE_FEATURES.advanced}
                  selectedFeatures={selectedFeatures}
                  onToggle={toggleFeature}
                  collapsible
                  defaultExpanded={false}
                />
              </>
            )}

            {/* Industry-Specific Features */}
            {industryFeatures && (
              <>
                {isVitrine && industryFeatures.vitrine && (
                  <FeatureSection
                    title={industryFeatures.vitrine.title}
                    icon={<Star className="w-4 h-4 text-accent" />}
                    features={industryFeatures.vitrine.features}
                    selectedFeatures={selectedFeatures}
                    onToggle={toggleFeature}
                    highlighted
                    badge="Recommandé"
                  />
                )}
                {isEcommerce && industryFeatures.ecommerce && (
                  <FeatureSection
                    title={industryFeatures.ecommerce.title}
                    icon={<Star className="w-4 h-4 text-accent" />}
                    features={industryFeatures.ecommerce.features}
                    selectedFeatures={selectedFeatures}
                    onToggle={toggleFeature}
                    highlighted
                    badge="Recommandé"
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* ===== PORTAL FEATURES ===== */}
        {hasPortal && (
          <div className="space-y-4">
            {(portalType === "client" || portalType === "mixte") && (
              <FeatureSection
                title="Portail Client"
                icon={<Users className="w-4 h-4" />}
                features={PORTAL_CLIENT_FEATURES}
                selectedFeatures={selectedFeatures}
                onToggle={toggleFeature}
              />
            )}
            {(portalType === "employes" || portalType === "mixte") && (
              <FeatureSection
                title="Portail Employés"
                icon={<Briefcase className="w-4 h-4" />}
                features={PORTAL_EMPLOYEE_FEATURES}
                selectedFeatures={selectedFeatures}
                onToggle={toggleFeature}
              />
            )}
            {(portalType === "rh" || portalType === "mixte") && (
              <FeatureSection
                title="Portail RH"
                icon={<Users className="w-4 h-4" />}
                features={PORTAL_HR_FEATURES}
                selectedFeatures={selectedFeatures}
                onToggle={toggleFeature}
              />
            )}
          </div>
        )}

        {/* ===== MODULES ===== */}
        {(hasModule || hasWebsite || hasPortal) && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Modules additionnels</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                Optionnel
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Ces modules peuvent être ajoutés à votre solution pour plus de fonctionnalités.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MODULES.map((module, index) => {
                const Icon = module.icon;
                const isSelected = selectedModules.includes(module.id);
                const isRecommended = recommendedModules.includes(module.id);

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className={cn(
                      "group relative flex items-start gap-3 p-4 rounded-xl text-left transition-all duration-300",
                      "border-2 animate-fade-in",
                      isSelected
                        ? "bg-primary/10 border-primary"
                        : isRecommended
                        ? "border-accent/50 bg-accent/5 hover:border-accent"
                        : "bg-card border-border hover:border-primary/50"
                    )}
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      isSelected 
                        ? "bg-primary text-white" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{module.label}</span>
                        {isRecommended && (
                          <Badge variant="secondary" className="text-xs py-0">
                            ⭐ Suggéré
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>

                    <div className={cn(
                      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0",
                      isSelected
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    )}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <QuizNavigation canContinue={true} />
      </div>
    </TooltipProvider>
  );
};

// ============ FEATURE SECTION COMPONENT ============

interface FeatureSectionProps {
  title: string;
  icon: React.ReactNode;
  features: Array<{ id: string; label: string; essential?: boolean; tip?: string }>;
  selectedFeatures: string[];
  onToggle: (id: string) => void;
  highlighted?: boolean;
  badge?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

const FeatureSection = ({
  title,
  icon,
  features,
  selectedFeatures,
  onToggle,
  highlighted = false,
  badge,
  collapsible = false,
  defaultExpanded = true,
}: FeatureSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all",
      highlighted ? "border-accent/50 bg-accent/5" : "border-border bg-card"
    )}>
      <button
        type="button"
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between w-full",
          collapsible && "cursor-pointer"
        )}
        disabled={!collapsible}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold">{title}</h3>
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
        {collapsible && (
          isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {(!collapsible || isExpanded) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
          {features.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);

            return (
              <label
                key={feature.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all",
                  "border hover:bg-muted/50",
                  isSelected 
                    ? "border-primary/50 bg-primary/5" 
                    : "border-transparent"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggle(feature.id)}
                />
                <span className="text-sm flex-1">
                  {feature.label}
                  {feature.essential && (
                    <span className="text-primary ml-1">*</span>
                  )}
                </span>
                {feature.tip && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">{feature.tip}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};
