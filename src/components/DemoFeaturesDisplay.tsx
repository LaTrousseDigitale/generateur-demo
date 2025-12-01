import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Rocket, TrendingUp, Clock, Shield, Zap, Award, 
  CheckCircle2, ArrowRight, Sparkles, DollarSign
} from "lucide-react";
import { DemoConfig } from "./DemoGenerator";

interface DemoFeaturesDisplayProps {
  config: DemoConfig;
}

// Calcul du prix estimé en CAD
const calculatePricing = (config: DemoConfig) => {
  let basePrice = 0;
  let monthlyPrice = 0;
  const items: { label: string; price: number }[] = [];

  // Prix de base par type de service
  if (config.serviceType === "website") {
    basePrice += 2500;
    items.push({ label: "Site web professionnel", price: 2500 });
  }
  if (config.serviceType === "portal") {
    basePrice += 5000;
    items.push({ label: "Portail client/employé", price: 5000 });
  }

  // E-commerce
  const ecommerceCount = config.ecommerceNeeds?.length || 0;
  if (ecommerceCount > 0) {
    const ecommercePrice = ecommerceCount * 400;
    basePrice += ecommercePrice;
    items.push({ label: `Fonctionnalités e-commerce (${ecommerceCount})`, price: ecommercePrice });
  }

  // Auto features
  const autoCount = config.autoCompatibility?.length || 0;
  if (autoCount > 0) {
    const autoPrice = autoCount * 600;
    basePrice += autoPrice;
    items.push({ label: `Outils automobile avancés (${autoCount})`, price: autoPrice });
  }

  // Restaurant features
  const restaurantCount = config.restaurantFeatures?.length || 0;
  if (restaurantCount > 0) {
    const restaurantPrice = restaurantCount * 350;
    basePrice += restaurantPrice;
    items.push({ label: `Fonctionnalités restauration (${restaurantCount})`, price: restaurantPrice });
  }

  // Pages standard
  const pagesCount = config.features?.length || 0;
  if (pagesCount > 0) {
    const pagesPrice = pagesCount * 150;
    basePrice += pagesPrice;
    items.push({ label: `Pages personnalisées (${pagesCount})`, price: pagesPrice });
  }

  // Maintenance mensuelle
  monthlyPrice = Math.round(basePrice * 0.08);

  return {
    basePrice,
    monthlyPrice,
    items,
    totalValue: Math.round(basePrice * 1.4), // Valeur perçue
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
                <p className="text-sm text-muted-foreground">Prix en dollars canadiens</p>
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

            {/* Maintenance */}
            <div className="mt-4 p-4 bg-muted/50 rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm">Maintenance & support mensuel</span>
              </div>
              <span className="font-semibold">{pricing.monthlyPrice.toLocaleString("fr-CA")} $/mois</span>
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

            {/* ROI estimé */}
            <div 
              className="rounded-xl p-6 border-2"
              style={{ borderColor: config.accentColor + "40" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Valeur estimée du projet</span>
                <Badge variant="secondary">ROI potentiel</Badge>
              </div>
              <div className="flex items-end gap-2">
                <span 
                  className="text-3xl font-bold"
                  style={{ color: config.accentColor }}
                >
                  {pricing.totalValue.toLocaleString("fr-CA")} $
                </span>
                <span className="text-muted-foreground text-sm mb-1">
                  valeur perçue
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Économie de{" "}
                <span className="font-semibold text-foreground">
                  {(pricing.totalValue - pricing.basePrice).toLocaleString("fr-CA")} $
                </span>{" "}
                par rapport au marché
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
