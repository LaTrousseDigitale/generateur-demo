import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Package, Search, Truck, Shield, Heart, Star, Wrench, FileText, Users, CreditCard, BarChart3 } from "lucide-react";
import { DemoConfig } from "./DemoGenerator";

interface DemoFeaturesDisplayProps {
  config: DemoConfig;
}

// Mapping des IDs vers les libellés français
const FEATURE_LABELS: Record<string, string> = {
  // E-commerce
  "catalogue": "Catalogue produits",
  "panier": "Panier d'achat",
  "paiement": "Paiement en ligne",
  "inventaire": "Gestion d'inventaire",
  "promotions": "Promotions & Coupons",
  "wishlist": "Liste de souhaits",
  "reviews": "Avis clients",
  "filtres": "Filtres avancés",
  
  // Automobile - Recherche
  "vin-search": "Recherche par numéro VIN",
  "ymm-search": "Recherche Année/Marque/Modèle",
  "compatibility": "Vérification de compatibilité",
  "diagrams": "Diagrammes de pièces interactifs",
  "oem-aftermarket": "Comparaison OEM vs Aftermarket",
  
  // Automobile - Fonctionnalités
  "vin": "Décodage VIN automatique",
  "year-make-model": "Sélecteur Année/Marque/Modèle",
  
  // Restaurant
  "menu": "Menu en ligne dynamique",
  "reservation": "Système de réservations",
  "commande": "Commande en ligne",
  "livraison": "Gestion des livraisons",
  "fidelite": "Programme de fidélité",
  
  // Commerce
  "stocks": "Gestion des stocks",
};

// Mapping des valeurs de configuration
const CONFIG_LABELS: Record<string, Record<string, string>> = {
  autoProductType: {
    "pieces": "Pièces détachées",
    "vehicules": "Véhicules complets",
    "accessoires": "Accessoires auto",
    "mixte": "Pièces et véhicules",
  },
  autoCustomerType: {
    "b2c": "Particuliers (B2C)",
    "b2b": "Professionnels (B2B)",
    "mixte": "B2B et B2C",
  },
  restaurantType: {
    "gastronomique": "Restaurant gastronomique",
    "bistro": "Bistro / Brasserie",
    "fast-food": "Restauration rapide",
    "cafe": "Café / Salon de thé",
    "traiteur": "Service traiteur",
  },
  restaurantSalesType: {
    "sur-place": "Service sur place",
    "emporter": "À emporter",
    "livraison": "Livraison",
    "mixte": "Service complet (sur place, emporter, livraison)",
  },
  retailType: {
    "boutique": "Boutique physique",
    "en-ligne": "Commerce en ligne uniquement",
    "mixte": "Commerce hybride",
  },
};

// Fonction pour obtenir le libellé français
const getFeatureLabel = (featureId: string): string => {
  return FEATURE_LABELS[featureId] || featureId;
};

const getConfigLabel = (configKey: string, value: string): string => {
  return CONFIG_LABELS[configKey]?.[value] || value;
};

export const DemoFeaturesDisplay = ({ config }: DemoFeaturesDisplayProps) => {
  // Collect all selected features
  const allFeatures: { name: string; category: string }[] = [];

  // E-commerce general features
  if (config.ecommerceNeeds && config.ecommerceNeeds.length > 0) {
    config.ecommerceNeeds.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "E-commerce"
      });
    });
  }

  // Industry-specific features - Auto
  if (config.autoCompatibility && config.autoCompatibility.length > 0) {
    config.autoCompatibility.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Automobile - Outils de recherche"
      });
    });
  }

  // Restaurant features
  if (config.restaurantFeatures && config.restaurantFeatures.length > 0) {
    config.restaurantFeatures.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Restauration"
      });
    });
  }

  // Retail features
  if (config.retailFeatures && config.retailFeatures.length > 0) {
    config.retailFeatures.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Commerce de détail"
      });
    });
  }

  // Group features by category
  const featuresByCategory: Record<string, string[]> = {};
  allFeatures.forEach(({ name, category }) => {
    if (!featuresByCategory[category]) {
      featuresByCategory[category] = [];
    }
    featuresByCategory[category].push(name);
  });

  if (allFeatures.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" style={{ backgroundColor: config.primaryColor }}>
            Fonctionnalités Incluses
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Votre solution <span style={{ color: config.primaryColor }}>sur mesure</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes les fonctionnalités que vous avez sélectionnées pour votre projet
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(featuresByCategory).map(([category, features]) => (
            <Card key={category} className="p-6">
              <h3 className="font-bold text-xl mb-4">{category}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{getFeatureLabel(feature)}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Configuration du projet - Automobile */}
        {config.industry === "auto" && (config.autoProductType || config.autoCustomerType) && (
          <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-bold text-xl mb-4">Configuration du projet - Automobile</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {config.autoProductType && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de produits</p>
                  <p className="font-medium">{getConfigLabel("autoProductType", config.autoProductType)}</p>
                </div>
              )}
              {config.autoCustomerType && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de clientèle</p>
                  <p className="font-medium">{getConfigLabel("autoCustomerType", config.autoCustomerType)}</p>
                </div>
              )}
              {config.autoCurrentSales && (
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Processus de vente actuel</p>
                  <p className="font-medium">{config.autoCurrentSales}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Configuration du projet - Restauration */}
        {config.industry === "restauration" && (config.restaurantType || config.restaurantSalesType) && (
          <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-bold text-xl mb-4">Configuration du projet - Restauration</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {config.restaurantType && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de restaurant</p>
                  <p className="font-medium">{getConfigLabel("restaurantType", config.restaurantType)}</p>
                </div>
              )}
              {config.restaurantSalesType && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Service de vente</p>
                  <p className="font-medium">{getConfigLabel("restaurantSalesType", config.restaurantSalesType)}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Configuration du projet - Commerce */}
        {config.industry === "commerce" && (config.retailType || config.retailProductTypes) && (
          <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-bold text-xl mb-4">Configuration du projet - Commerce</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {config.retailType && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de commerce</p>
                  <p className="font-medium">{getConfigLabel("retailType", config.retailType)}</p>
                </div>
              )}
              {config.retailProductTypes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Types de produits</p>
                  <p className="font-medium">{config.retailProductTypes}</p>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};
