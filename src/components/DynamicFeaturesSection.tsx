import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { 
  CheckCircle2, FileText, Layout, Cog, Globe, Users, 
  ShoppingCart, Calendar, Shield, Zap, Star, Award
} from "lucide-react";

interface DynamicFeaturesSectionProps {
  config: DemoConfig;
  themeConfig: {
    sectionBg?: string;
    sectionAlt?: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
  isLightTheme?: boolean;
}

// Icônes par type de fonctionnalité
const getFeatureIcon = (feature: string) => {
  const featureLower = feature.toLowerCase();
  if (featureLower.includes('rendez-vous') || featureLower.includes('réservation')) return Calendar;
  if (featureLower.includes('sécur') || featureLower.includes('garantie')) return Shield;
  if (featureLower.includes('client') || featureLower.includes('équipe') || featureLower.includes('témoignage')) return Users;
  if (featureLower.includes('boutique') || featureLower.includes('panier') || featureLower.includes('commerce')) return ShoppingCart;
  if (featureLower.includes('galerie') || featureLower.includes('portfolio')) return Layout;
  if (featureLower.includes('blog') || featureLower.includes('article')) return FileText;
  if (featureLower.includes('performance') || featureLower.includes('rapide')) return Zap;
  if (featureLower.includes('premium') || featureLower.includes('vip')) return Star;
  if (featureLower.includes('certif') || featureLower.includes('qualité')) return Award;
  return Cog;
};

const getPageIcon = (page: string) => {
  const pageLower = page.toLowerCase();
  if (pageLower.includes('accueil')) return Globe;
  if (pageLower.includes('contact')) return Users;
  if (pageLower.includes('service')) return Cog;
  if (pageLower.includes('portfolio') || pageLower.includes('galerie')) return Layout;
  if (pageLower.includes('blog')) return FileText;
  if (pageLower.includes('boutique') || pageLower.includes('produit')) return ShoppingCart;
  return FileText;
};

export const DynamicFeaturesSection = ({ config, themeConfig, isLightTheme = false }: DynamicFeaturesSectionProps) => {
  const hasFeatures = 
    (config.websitePages && config.websitePages.length > 0) ||
    (config.websiteSections && config.websiteSections.length > 0) ||
    (config.autoCompatibility && config.autoCompatibility.length > 0) ||
    (config.ecommerceNeeds && config.ecommerceNeeds.length > 0) ||
    (config.restaurantFeatures && config.restaurantFeatures.length > 0) ||
    (config.portalClientFeatures && config.portalClientFeatures.length > 0) ||
    (config.portalEmployeeFeatures && config.portalEmployeeFeatures.length > 0) ||
    (config.selectedModules && config.selectedModules.length > 0);

  if (!hasFeatures) return null;

  const bgClass = themeConfig.sectionAlt || themeConfig.sectionBg || 'bg-slate-50';

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge 
            className="mb-4"
            style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
          >
            Fonctionnalités incluses
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary}`}>
            Votre solution sur mesure
          </h2>
          <p className={`mt-4 text-lg ${themeConfig.textSecondary} max-w-2xl mx-auto`}>
            Découvrez toutes les fonctionnalités personnalisées pour répondre à vos besoins
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Pages principales */}
          {config.websitePages && config.websitePages.map((page, index) => {
            const Icon = getPageIcon(page);
            return (
              <div 
                key={`page-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{page}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Page principale</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Sections */}
          {config.websiteSections && config.websiteSections.map((section, index) => {
            const Icon = getFeatureIcon(section);
            return (
              <div 
                key={`section-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{section}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Section</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fonctionnalités industrie (autoCompatibility) */}
          {config.autoCompatibility && config.autoCompatibility.map((feature, index) => {
            const Icon = getFeatureIcon(feature);
            return (
              <div 
                key={`compat-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.secondaryColor || config.primaryColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{feature}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Fonctionnalité</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fonctionnalités E-commerce */}
          {config.ecommerceNeeds && config.ecommerceNeeds.map((feature, index) => {
            const Icon = getFeatureIcon(feature);
            return (
              <div 
                key={`ecom-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{feature}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>E-commerce</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fonctionnalités Restaurant */}
          {config.restaurantFeatures && config.restaurantFeatures.map((feature, index) => {
            const Icon = getFeatureIcon(feature);
            return (
              <div 
                key={`resto-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{feature}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Restaurant</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fonctionnalités Portail Client */}
          {config.portalClientFeatures && config.portalClientFeatures.map((feature, index) => {
            const Icon = getFeatureIcon(feature);
            return (
              <div 
                key={`portal-client-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{feature}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Portail client</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fonctionnalités Portail Employés */}
          {config.portalEmployeeFeatures && config.portalEmployeeFeatures.map((feature, index) => {
            const Icon = getFeatureIcon(feature);
            return (
              <div 
                key={`portal-emp-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl`}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{feature}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Portail employés</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Modules sélectionnés */}
          {config.selectedModules && config.selectedModules.map((moduleId, index) => {
            const Icon = getFeatureIcon(moduleId);
            return (
              <div 
                key={`module-${index}`}
                className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl border-2`}
                style={{ borderColor: `${config.primaryColor}40` }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    <Star className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{moduleId}</p>
                    <p className={`text-xs ${themeConfig.textSecondary}`}>Module additionnel</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compteur de fonctionnalités */}
        <div className="mt-12 text-center">
          <div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ backgroundColor: `${config.primaryColor}10` }}
          >
            <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
            <span className={`font-semibold ${themeConfig.textPrimary}`}>
              {(config.websitePages?.length || 0) + 
               (config.websiteSections?.length || 0) + 
               (config.autoCompatibility?.length || 0) +
               (config.ecommerceNeeds?.length || 0) +
               (config.restaurantFeatures?.length || 0) +
               (config.portalClientFeatures?.length || 0) +
               (config.portalEmployeeFeatures?.length || 0) +
               (config.selectedModules?.length || 0)} fonctionnalités incluses
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
