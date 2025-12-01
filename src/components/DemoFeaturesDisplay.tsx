import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, TrendingUp, Clock, Shield, Zap, Award, 
  CheckCircle2, Sparkles, DollarSign
} from "lucide-react";
import { DemoConfig } from "./DemoGenerator";

interface DemoFeaturesDisplayProps {
  config: DemoConfig;
}

// Prix alignés avec le questionnaire (Section8Finances et DemoGenerator)
const PRICING = {
  website: 2000,
  portal: 5000,
  module: 1500,
  additionalModule: 500,
  canvaService: 50,
  // Maintenance mensuelle selon les niveaux
  maintenance: {
    basic: 50,
    standard: 150,
    premium: 300,
    enterprise: 450,
  },
};

// Calcul du prix estimé en CAD - aligné avec calculateEstimatedPrice du questionnaire
const calculatePricing = (config: DemoConfig) => {
  let basePrice = 0;
  const items: { label: string; price: number }[] = [];

  // Prix de base par type de service (même logique que DemoGenerator)
  if (config.serviceType === "website") {
    basePrice += PRICING.website;
    items.push({ label: "Site web professionnel", price: PRICING.website });
  }
  if (config.serviceType === "portal") {
    basePrice += PRICING.portal;
    items.push({ label: "Portail client/employé", price: PRICING.portal });
  }
  if (config.serviceType === "module") {
    basePrice += PRICING.module;
    items.push({ label: "Module personnalisé", price: PRICING.module });
  }

  // Fonctionnalités sélectionnées (pages, etc.) - considérées comme modules additionnels
  const featuresCount = config.features?.length || 0;
  if (featuresCount > 0) {
    const featuresPrice = featuresCount * PRICING.additionalModule;
    basePrice += featuresPrice;
    items.push({ label: `Modules additionnels (${featuresCount})`, price: featuresPrice });
  }

  // E-commerce features
  const ecommerceCount = config.ecommerceNeeds?.length || 0;
  if (ecommerceCount > 0) {
    const ecommercePrice = ecommerceCount * PRICING.additionalModule;
    basePrice += ecommercePrice;
    items.push({ label: `Fonctionnalités e-commerce (${ecommerceCount})`, price: ecommercePrice });
  }

  // Auto features
  const autoCount = config.autoCompatibility?.length || 0;
  if (autoCount > 0) {
    const autoPrice = autoCount * PRICING.additionalModule;
    basePrice += autoPrice;
    items.push({ label: `Outils automobile (${autoCount})`, price: autoPrice });
  }

  // Restaurant features
  const restaurantCount = config.restaurantFeatures?.length || 0;
  if (restaurantCount > 0) {
    const restaurantPrice = restaurantCount * PRICING.additionalModule;
    basePrice += restaurantPrice;
    items.push({ label: `Fonctionnalités restauration (${restaurantCount})`, price: restaurantPrice });
  }

  return {
    basePrice,
    items,
  };
};

// Avantages par industrie
const getIndustryBenefits = (industry: string) => {
  const benefits: Record<string, { title: string; items: string[] }> = {
    auto: {
      title: "Avantages pour votre commerce automobile",
      items: [
        "Réduction de 60% du temps de recherche de pièces",
        "Augmentation moyenne de 35% des ventes en ligne",
        "Diminution des retours grâce à la vérification de compatibilité",
        "Base de données de millions de véhicules",
      ],
    },
    restauration: {
      title: "Avantages pour votre restaurant",
      items: [
        "Augmentation de 40% des réservations en ligne",
        "Réduction des erreurs de commande de 85%",
        "Fidélisation client améliorée de 50%",
        "Gestion simplifiée des menus et promotions",
      ],
    },
    commerce: {
      title: "Avantages pour votre commerce",
      items: [
        "Ventes 24/7 sans personnel supplémentaire",
        "Augmentation du panier moyen de 25%",
        "Gestion automatisée des stocks",
        "Analyse des comportements d'achat",
      ],
    },
    default: {
      title: "Avantages pour votre entreprise",
      items: [
        "Présence professionnelle en ligne 24/7",
        "Génération automatique de prospects",
        "Image de marque renforcée",
        "Retour sur investissement en 6 mois",
      ],
    },
  };

  return benefits[industry] || benefits.default;
};

export const DemoFeaturesDisplay = ({ config }: DemoFeaturesDisplayProps) => {
  const pricing = calculatePricing(config);
  const benefits = getIndustryBenefits(config.industry);

  if (pricing.items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header avec effet */}
        <div className="text-center mb-16 relative">
          <div 
            className="absolute inset-0 blur-3xl opacity-20 -z-10"
            style={{ background: `radial-gradient(circle, ${config.primaryColor} 0%, transparent 70%)` }}
          />
          <Badge 
            className="mb-4 text-white animate-pulse" 
            style={{ backgroundColor: config.primaryColor }}
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Offre personnalisée
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Votre investissement,{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
            >
              notre expertise
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une solution clé en main adaptée à {config.companyName}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Carte de prix principale */}
          <Card className="p-8 relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-500">
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 -z-10"
              style={{ background: `radial-gradient(circle, ${config.primaryColor} 0%, transparent 70%)` }}
            />
            
            <div className="flex items-center gap-2 mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: config.primaryColor }}
              >
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Estimation du projet</h3>
                <p className="text-sm text-muted-foreground">Prix en dollars canadiens (CAD)</p>
              </div>
            </div>

            {/* Liste des éléments */}
            <div className="space-y-3 mb-6">
              {pricing.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between items-center py-2 border-b border-dashed last:border-0"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.price.toLocaleString("fr-CA")} $</span>
                </div>
              ))}
            </div>

            {/* Prix total */}
            <div 
              className="rounded-xl p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: config.primaryColor }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
              <div className="relative">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-white/80">Investissement total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold">
                      {pricing.basePrice.toLocaleString("fr-CA")} $
                    </span>
                    <span className="text-white/80 text-sm ml-1">CAD</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-white/70">
                  <span>ou à partir de</span>
                  <span className="font-medium">
                    {Math.round(pricing.basePrice / 12).toLocaleString("fr-CA")} $/mois × 12 mois
                  </span>
                </div>
              </div>
            </div>

            {/* Options de maintenance */}
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium text-muted-foreground">+ Maintenance mensuelle (au choix)</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="font-bold">{PRICING.maintenance.basic} $ CAD/mois</p>
                  <p className="text-xs text-muted-foreground">Service de base</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="font-bold">{PRICING.maintenance.standard} $ CAD/mois</p>
                  <p className="text-xs text-muted-foreground">Standard</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="font-bold">{PRICING.maintenance.premium} $ CAD/mois</p>
                  <p className="text-xs text-muted-foreground">Premium</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg text-center">
                  <p className="font-bold">{PRICING.maintenance.enterprise} $ CAD/mois</p>
                  <p className="text-xs text-muted-foreground">Entreprise</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Carte des avantages */}
          <Card className="p-8 relative overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 opacity-5 -z-10"
              style={{ background: `radial-gradient(circle, ${config.accentColor} 0%, transparent 70%)` }}
            />
            
            <div className="flex items-center gap-2 mb-6">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: config.accentColor }}
              >
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{benefits.title}</h3>
                <p className="text-sm text-muted-foreground">Résultats concrets</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {benefits.items.map((benefit, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <CheckCircle2 
                    className="w-5 h-5 mt-0.5 shrink-0" 
                    style={{ color: config.primaryColor }}
                  />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Option abonnement */}
            <div 
              className="rounded-xl p-6 border-2"
              style={{ borderColor: config.accentColor + "40" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Alternative : Abonnement mensuel</span>
                <Badge variant="secondary">Populaire</Badge>
              </div>
              <div className="flex items-end gap-2">
                <span 
                  className="text-3xl font-bold"
                  style={{ color: config.accentColor }}
                >
                  80 $ CAD
                </span>
                <span className="text-muted-foreground text-sm mb-1">
                  /mois
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Flexibilité maximale, mises à jour incluses, support prioritaire, sans engagement long terme
              </p>
            </div>
          </Card>
        </div>

        {/* Badges de confiance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Rocket, label: "Livraison rapide", value: "4-8 semaines" },
            { icon: Clock, label: "Support inclus", value: "12 mois" },
            { icon: Shield, label: "Garantie", value: "100% satisfait" },
            { icon: Award, label: "Qualité", value: "Code premium" },
          ].map((item, idx) => (
            <Card 
              key={idx} 
              className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <item.icon 
                className="w-8 h-8 mx-auto mb-2" 
                style={{ color: config.primaryColor }}
              />
              <p className="font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
