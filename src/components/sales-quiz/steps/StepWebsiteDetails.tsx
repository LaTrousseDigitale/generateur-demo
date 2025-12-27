import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  Globe, Check, FileText, ShoppingCart, Building2, 
  Newspaper, Languages, Image, MessageSquare, Calendar,
  CreditCard, Package, Search, Tag, Truck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// ============ LANDING PAGE ============
const LANDING_FEATURES = [
  { id: "hero-video", label: "Vidéo en fond (Hero)", icon: Image },
  { id: "lead-form", label: "Formulaire de capture", icon: MessageSquare, essential: true },
  { id: "cta-multiple", label: "Multiples appels à l'action", icon: FileText },
  { id: "temoignages", label: "Section témoignages", icon: MessageSquare },
  { id: "countdown", label: "Compte à rebours", icon: Calendar },
  { id: "pricing-table", label: "Tableau de prix", icon: CreditCard },
];

// ============ SITE VITRINE ============
const VITRINE_PAGES = [
  { id: "accueil", label: "Page d'accueil", essential: true },
  { id: "apropos", label: "À propos / Notre histoire" },
  { id: "services", label: "Nos services / Solutions" },
  { id: "portfolio", label: "Portfolio / Réalisations" },
  { id: "equipe", label: "Notre équipe" },
  { id: "contact", label: "Contact", essential: true },
  { id: "faq", label: "FAQ" },
  { id: "carriere", label: "Carrières / Emplois" },
];

const VITRINE_SECTIONS = [
  { id: "galerie", label: "Galerie photos" },
  { id: "carte", label: "Carte / Localisation" },
  { id: "formulaire", label: "Formulaire de contact", essential: true },
  { id: "newsletter", label: "Inscription newsletter" },
  { id: "reseaux", label: "Liens réseaux sociaux" },
  { id: "chat", label: "Chat en direct" },
];

// ============ E-COMMERCE ============
const ECOMMERCE_ESSENTIALS = [
  { id: "catalogue", label: "Catalogue produits", essential: true },
  { id: "panier", label: "Panier d'achat", essential: true },
  { id: "paiement", label: "Paiement sécurisé (Stripe)", essential: true },
  { id: "comptes-clients", label: "Comptes clients" },
];

const ECOMMERCE_FEATURES = [
  { id: "recherche", label: "Recherche avancée", icon: Search },
  { id: "filtres", label: "Filtres par catégorie/prix", icon: Tag },
  { id: "variantes", label: "Variantes (tailles, couleurs)", icon: Package },
  { id: "avis", label: "Avis clients vérifiés", icon: MessageSquare },
  { id: "promo", label: "Codes promo / Remises", icon: Tag },
  { id: "livraison", label: "Calcul frais de livraison", icon: Truck },
  { id: "stocks", label: "Gestion des stocks temps réel", icon: Package },
  { id: "abonnements", label: "Abonnements récurrents", icon: CreditCard },
];

const ECOMMERCE_PRODUCT_COUNTS = [
  { value: "1-50", label: "1-50 produits" },
  { value: "51-200", label: "51-200 produits" },
  { value: "201-500", label: "201-500 produits" },
  { value: "500+", label: "500+ produits" },
];

// ============ ORGANISATIONNEL ============
const ORGANISATIONAL_FEATURES = [
  { id: "docs-publics", label: "Documents publics téléchargeables" },
  { id: "calendrier-events", label: "Calendrier d'événements" },
  { id: "actualites", label: "Section actualités / Blog" },
  { id: "membres", label: "Espace membres" },
  { id: "inscription-events", label: "Inscription aux événements" },
  { id: "rapports", label: "Rapports annuels" },
  { id: "newsletter-org", label: "Infolettre automatisée" },
];

export const StepWebsiteDetails = () => {
  const { state, updateData } = useQuiz();
  const { websiteType, industry } = state.data;
  
  const websitePages = state.data.websitePages || [];
  const websiteSections = state.data.websiteSections || [];
  const websiteContent = state.data.websiteContent || [];
  const ecommerceNeeds = state.data.ecommerceNeeds || [];
  const organisationalFeatures = state.data.organisationalFeatures || [];

  const toggleItem = (field: string, items: string[], id: string) => {
    const updated = items.includes(id)
      ? items.filter(i => i !== id)
      : [...items, id];
    updateData({ [field]: updated });
  };

  const totalSelected = websitePages.length + websiteSections.length + 
    websiteContent.length + ecommerceNeeds.length + organisationalFeatures.length;

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
          <Globe className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Configuration de votre {websiteType === "landing" ? "Landing Page" : 
            websiteType === "vitrine" ? "Site Vitrine" :
            websiteType === "ecommerce" ? "Boutique en ligne" : "Site Organisationnel"}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Sélectionnez les fonctionnalités et pages dont vous avez besoin
        </p>
      </div>

      {/* Selection Counter */}
      {totalSelected > 0 && (
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {totalSelected} élément{totalSelected > 1 ? "s" : ""} sélectionné{totalSelected > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* ===== LANDING PAGE ===== */}
      {websiteType === "landing" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Éléments de la page
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {LANDING_FEATURES.map((feature) => {
                const isSelected = websiteContent.includes(feature.id);
                const Icon = feature.icon;
                return (
                  <label
                    key={feature.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleItem("websiteContent", websiteContent, feature.id)}
                    />
                    <Icon className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                    <span className="flex-1">{feature.label}</span>
                    {feature.essential && (
                      <Badge variant="secondary" className="text-xs">Recommandé</Badge>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== SITE VITRINE ===== */}
      {websiteType === "vitrine" && (
        <div className="space-y-6">
          {/* Pages */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Pages du site
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {VITRINE_PAGES.map((page) => {
                const isSelected = websitePages.includes(page.id);
                return (
                  <label
                    key={page.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleItem("websitePages", websitePages, page.id)}
                    />
                    <span className="flex-1">{page.label}</span>
                    {page.essential && (
                      <Badge variant="secondary" className="text-xs">Essentiel</Badge>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sections */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Sections et fonctionnalités
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {VITRINE_SECTIONS.map((section) => {
                const isSelected = websiteSections.includes(section.id);
                return (
                  <label
                    key={section.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleItem("websiteSections", websiteSections, section.id)}
                    />
                    <span className="flex-1">{section.label}</span>
                    {section.essential && (
                      <Badge variant="secondary" className="text-xs">Recommandé</Badge>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Blog & Traduction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-primary" />
                Blog / Actualités
              </h3>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Combien d'articles de blog initiaux?
              </Label>
              <Input
                type="number"
                min={0}
                max={50}
                value={state.data.blogPages || 0}
                onChange={(e) => updateData({ blogPages: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Chaque article: +15$/mois en SaaS
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                Pages traduites
              </h3>
              <Label className="text-sm text-muted-foreground mb-2 block">
                Combien de pages à traduire?
              </Label>
              <Input
                type="number"
                min={0}
                max={50}
                value={state.data.translatedPages || 0}
                onChange={(e) => updateData({ translatedPages: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Chaque page traduite: +20$/mois
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== E-COMMERCE ===== */}
      {websiteType === "ecommerce" && (
        <div className="space-y-6">
          {/* Nombre de produits */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Volume de produits
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ECOMMERCE_PRODUCT_COUNTS.map((count) => {
                const isSelected = state.data.ecommerceProductCount === count.value;
                return (
                  <button
                    key={count.value}
                    type="button"
                    onClick={() => updateData({ ecommerceProductCount: count.value })}
                    className={cn(
                      "p-4 rounded-xl border-2 text-center transition-all",
                      isSelected 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <span className="font-medium">{count.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fonctionnalités essentielles (auto-cochées) */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Inclus de base
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ECOMMERCE_ESSENTIALS.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background"
                >
                  <Check className="w-5 h-5 text-primary" />
                  <span>{feature.label}</span>
                  <Badge className="ml-auto text-xs">Inclus</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Fonctionnalités optionnelles */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              Fonctionnalités additionnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ECOMMERCE_FEATURES.map((feature) => {
                const isSelected = ecommerceNeeds.includes(feature.id);
                const Icon = feature.icon;
                return (
                  <label
                    key={feature.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleItem("ecommerceNeeds", ecommerceNeeds, feature.id)}
                    />
                    <Icon className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                    <span className="flex-1">{feature.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Plateforme existante */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-3">Avez-vous déjà une boutique en ligne?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Non", "Shopify", "WooCommerce", "Autre"].map((platform) => {
                const isSelected = state.data.ecommerceExistingPlatform === platform;
                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => updateData({ ecommerceExistingPlatform: platform })}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all",
                      isSelected 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== ORGANISATIONNEL ===== */}
      {websiteType === "organisationnel" && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Fonctionnalités organisationnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ORGANISATIONAL_FEATURES.map((feature) => {
                const isSelected = organisationalFeatures.includes(feature.id);
                return (
                  <label
                    key={feature.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      isSelected 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleItem("organisationalFeatures", organisationalFeatures, feature.id)}
                    />
                    <span className="flex-1">{feature.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <QuizNavigation canContinue={true} />
    </div>
  );
};
