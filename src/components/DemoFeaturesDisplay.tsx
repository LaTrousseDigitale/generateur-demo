import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Package, Search, Truck, Shield, Heart, Star, Wrench, FileText, Users, CreditCard, BarChart3, Settings } from "lucide-react";
import { DemoConfig } from "./DemoGenerator";
interface DemoFeaturesDisplayProps {
  config: DemoConfig;
}
export const DemoFeaturesDisplay = ({
  config
}: DemoFeaturesDisplayProps) => {
  // Collect all selected features
  const allFeatures: {
    name: string;
    category: string;
  }[] = [];

  // E-commerce general features
  if (config.ecommerceNeeds?.length > 0) {
    config.ecommerceNeeds.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "E-commerce"
      });
    });
  }

  // Industry-specific features - Auto
  if (config.autoCompatibility?.length > 0) {
    config.autoCompatibility.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Automobile - Recherche"
      });
    });
  }
  if (config.autoSearchFeatures?.length > 0) {
    config.autoSearchFeatures.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Automobile - Fonctionnalités"
      });
    });
  }

  // Restaurant features
  if (config.restaurantFeatures?.length > 0) {
    config.restaurantFeatures.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Restauration"
      });
    });
  }

  // Retail features
  if (config.retailFeatures?.length > 0) {
    config.retailFeatures.forEach(feature => {
      allFeatures.push({
        name: feature,
        category: "Commerce de détail"
      });
    });
  }

  // Group features by category
  const featuresByCategory: Record<string, string[]> = {};
  allFeatures.forEach(({
    name,
    category
  }) => {
    if (!featuresByCategory[category]) {
      featuresByCategory[category] = [];
    }
    featuresByCategory[category].push(name);
  });

  // Icon mapping for features
  const getFeatureIcon = (featureName: string) => {
    const iconMap: Record<string, any> = {
      "recherche": Search,
      "paiement": CreditCard,
      "livraison": Truck,
      "inventaire": Package,
      "garantie": Shield,
      "fidélité": Heart,
      "avis": Star,
      "installation": Wrench,
      "devis": FileText,
      "client": Users,
      "analytics": BarChart3,
      "default": CheckCircle2
    };
    const key = Object.keys(iconMap).find(k => featureName.toLowerCase().includes(k));
    return iconMap[key || "default"];
  };
  if (allFeatures.length === 0) {
    return null;
  }
  return <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" style={{
          backgroundColor: config.primaryColor
        }}>
            Fonctionnalités Incluses
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Votre solution <span style={{
            color: config.primaryColor
          }}>sur mesure</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez toutes les fonctionnalités que vous avez sélectionnées pour votre projet
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(featuresByCategory).map(([category, features]) => {})}
        </div>

        {/* Add business context for auto industry */}
        {config.industry === "auto" && (config.autoProductType || config.autoCustomerType) && <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-bold text-xl mb-4">Configuration du projet - Automobile</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {config.autoProductType && <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de produits</p>
                  <p className="font-medium">{config.autoProductType}</p>
                </div>}
              {config.autoCustomerType && <div>
                  <p className="text-sm text-muted-foreground mb-1">Type d'acheteur</p>
                  <p className="font-medium">{config.autoCustomerType}</p>
                </div>}
              {config.autoCurrentSales && <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Processus de vente actuel</p>
                  <p className="font-medium">{config.autoCurrentSales}</p>
                </div>}
            </div>
          </Card>}

        {/* Add business context for restaurant industry */}
        {config.industry === "restauration" && (config.restaurantType || config.restaurantSalesType) && <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-bold text-xl mb-4">Configuration du projet - Restauration</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {config.restaurantType && <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de restaurant</p>
                  <p className="font-medium">{config.restaurantType}</p>
                </div>}
              {config.restaurantSalesType && <div>
                  <p className="text-sm text-muted-foreground mb-1">Service de vente</p>
                  <p className="font-medium">{config.restaurantSalesType}</p>
                </div>}
            </div>
          </Card>}

        {/* Add business context for retail industry */}
        {config.industry === "commerce" && (config.retailType || config.retailProductTypes) && <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
            <h3 className="font-bold text-xl mb-4">Configuration du projet - Commerce</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {config.retailType && <div>
                  <p className="text-sm text-muted-foreground mb-1">Type de commerce</p>
                  <p className="font-medium">{config.retailType}</p>
                </div>}
              {config.retailProductTypes && <div>
                  <p className="text-sm text-muted-foreground mb-1">Types de produits</p>
                  <p className="font-medium">{config.retailProductTypes}</p>
                </div>}
            </div>
          </Card>}
      </div>
    </section>;
};