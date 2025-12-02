import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DemoConfig } from "./DemoGenerator";
import { 
  CheckCircle2, FileText, Layout, Cog, Globe, Users, 
  ShoppingCart, Calendar, Shield, Zap, Star, Award,
  X, Play, Clock, Phone, Mail, MapPin, CreditCard,
  Eye, ArrowRight, Bell, MessageSquare, Send
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

interface FeatureItem {
  name: string;
  type: string;
  icon: any;
  color: string;
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
  if (featureLower.includes('horaire') || featureLower.includes('ouverture')) return Clock;
  if (featureLower.includes('soumission') || featureLower.includes('devis')) return FileText;
  if (featureLower.includes('contact') || featureLower.includes('formulaire')) return Mail;
  if (featureLower.includes('carte') || featureLower.includes('direction')) return MapPin;
  if (featureLower.includes('paiement')) return CreditCard;
  if (featureLower.includes('notification') || featureLower.includes('rappel')) return Bell;
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

// Composant de prévisualisation interactive pour chaque fonctionnalité
const FeaturePreview = ({ feature, config }: { feature: FeatureItem; config: DemoConfig }) => {
  const featureLower = feature.name.toLowerCase();
  
  // Prise de rendez-vous
  if (featureLower.includes('rendez-vous') || featureLower.includes('réservation')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Système de prise de rendez-vous en ligne avec calendrier interactif
        </p>
        <div className="grid grid-cols-7 gap-1 p-4 bg-muted/30 rounded-lg">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
          ))}
          {Array.from({ length: 28 }, (_, i) => (
            <button
              key={i}
              className={`text-center py-2 text-sm rounded hover:bg-primary/20 transition-colors ${
                i === 14 ? 'text-white' : ''
              }`}
              style={i === 14 ? { backgroundColor: config.primaryColor } : {}}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
            <button
              key={time}
              className="px-4 py-2 text-sm border rounded-lg hover:border-primary transition-colors"
            >
              {time}
            </button>
          ))}
        </div>
        <Button className="w-full text-white" style={{ backgroundColor: config.primaryColor }}>
          Confirmer le rendez-vous
        </Button>
      </div>
    );
  }

  // Demande de soumission / Devis
  if (featureLower.includes('soumission') || featureLower.includes('devis')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Formulaire de demande de soumission personnalisé
        </p>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Votre nom complet"
            className="w-full px-4 py-3 border rounded-lg bg-background"
          />
          <input 
            type="email" 
            placeholder="Votre courriel"
            className="w-full px-4 py-3 border rounded-lg bg-background"
          />
          <input 
            type="tel" 
            placeholder="Votre téléphone"
            className="w-full px-4 py-3 border rounded-lg bg-background"
          />
          <select className="w-full px-4 py-3 border rounded-lg bg-background">
            <option>Type de service requis</option>
            <option>Consultation</option>
            <option>Réparation</option>
            <option>Installation</option>
          </select>
          <textarea 
            placeholder="Décrivez votre projet..."
            className="w-full px-4 py-3 border rounded-lg bg-background h-24 resize-none"
          />
        </div>
        <Button className="w-full text-white" style={{ backgroundColor: config.primaryColor }}>
          <Send className="w-4 h-4 mr-2" />
          Envoyer la demande
        </Button>
      </div>
    );
  }

  // Horaires d'ouverture
  if (featureLower.includes('horaire') || featureLower.includes('ouverture')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Affichage dynamique des horaires d'ouverture
        </p>
        <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
          {[
            { day: 'Lundi', hours: '8h00 - 18h00', open: true },
            { day: 'Mardi', hours: '8h00 - 18h00', open: true },
            { day: 'Mercredi', hours: '8h00 - 18h00', open: true },
            { day: 'Jeudi', hours: '8h00 - 18h00', open: true },
            { day: 'Vendredi', hours: '8h00 - 17h00', open: true },
            { day: 'Samedi', hours: '9h00 - 12h00', open: true },
            { day: 'Dimanche', hours: 'Fermé', open: false },
          ].map((item) => (
            <div key={item.day} className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="font-medium">{item.day}</span>
              <span className={item.open ? 'text-green-600' : 'text-red-500'}>
                {item.hours}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${config.primaryColor}15` }}>
          <Clock className="w-5 h-5" style={{ color: config.primaryColor }} />
          <span className="text-sm font-medium" style={{ color: config.primaryColor }}>
            Actuellement ouvert
          </span>
        </div>
      </div>
    );
  }

  // Témoignages clients
  if (featureLower.includes('témoignage') || featureLower.includes('avis')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Section de témoignages clients avec notation
        </p>
        <div className="space-y-4">
          {[
            { name: 'Marie L.', text: 'Service exceptionnel, je recommande!', rating: 5 },
            { name: 'Pierre D.', text: 'Équipe professionnelle et à l\'écoute.', rating: 5 },
          ].map((testimonial, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg">
              <div className="flex gap-1 mb-2">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm italic mb-2">"{testimonial.text}"</p>
              <p className="text-xs font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Galerie / Portfolio
  if (featureLower.includes('galerie') || featureLower.includes('portfolio')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Galerie de photos interactive avec lightbox
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div 
              key={i}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
              style={{ backgroundColor: `${config.primaryColor}${20 + i * 10}` }}
            >
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Contact / Formulaire
  if (featureLower.includes('contact') || featureLower.includes('formulaire') || featureLower.includes('coordonnées')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Informations de contact et formulaire
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Phone className="w-5 h-5" style={{ color: config.primaryColor }} />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <Mail className="w-5 h-5" style={{ color: config.primaryColor }} />
            <span>contact@entreprise.com</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <MapPin className="w-5 h-5" style={{ color: config.primaryColor }} />
            <span>123 Rue Principale, Montréal</span>
          </div>
        </div>
      </div>
    );
  }

  // Carte / Directions
  if (featureLower.includes('carte') || featureLower.includes('direction') || featureLower.includes('localisation')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Carte interactive avec directions
        </p>
        <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200" />
          <div 
            className="absolute w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            <MapPin className="w-5 h-5" />
          </div>
        </div>
        <Button variant="outline" className="w-full">
          <MapPin className="w-4 h-4 mr-2" />
          Obtenir l'itinéraire
        </Button>
      </div>
    );
  }

  // FAQ
  if (featureLower.includes('faq')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Section de questions fréquentes
        </p>
        <div className="space-y-2">
          {[
            { q: 'Quels sont vos délais?', a: 'Nos délais varient selon le projet...' },
            { q: 'Offrez-vous une garantie?', a: 'Oui, tous nos services sont garantis...' },
            { q: 'Comment prendre rendez-vous?', a: 'Vous pouvez réserver en ligne...' },
          ].map((item, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button className="w-full p-4 text-left font-medium flex justify-between items-center">
                {item.q}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Équipe
  if (featureLower.includes('équipe')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Présentation de votre équipe
        </p>
        <div className="grid grid-cols-3 gap-4">
          {['Jean D.', 'Marie L.', 'Pierre B.'].map((name, i) => (
            <div key={i} className="text-center">
              <div 
                className="w-16 h-16 mx-auto rounded-full mb-2 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: config.primaryColor }}
              >
                {name.charAt(0)}
              </div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">Expert</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Panier / E-commerce
  if (featureLower.includes('panier') || featureLower.includes('paiement') || featureLower.includes('boutique')) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-4">
          Système de panier et paiement sécurisé
        </p>
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
          {[
            { name: 'Produit exemple 1', price: '99,99 $', qty: 1 },
            { name: 'Produit exemple 2', price: '149,99 $', qty: 2 },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qté: {item.qty}</p>
              </div>
              <span className="font-bold">{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-bold">Total</span>
            <span className="font-bold text-lg" style={{ color: config.primaryColor }}>399,97 $</span>
          </div>
        </div>
        <Button className="w-full text-white" style={{ backgroundColor: config.primaryColor }}>
          <CreditCard className="w-4 h-4 mr-2" />
          Procéder au paiement
        </Button>
      </div>
    );
  }

  // Default preview
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Cette fonctionnalité sera intégrée à votre solution
      </p>
      <div className="p-6 bg-muted/30 rounded-lg text-center">
        <div 
          className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-white mb-4"
          style={{ backgroundColor: config.primaryColor }}
        >
          <feature.icon className="w-8 h-8" />
        </div>
        <h4 className="font-bold mb-2">{feature.name}</h4>
        <p className="text-sm text-muted-foreground">
          Fonctionnalité personnalisée selon vos besoins
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span>Inclus dans votre solution</span>
      </div>
    </div>
  );
};

export const DynamicFeaturesSection = ({ config, themeConfig, isLightTheme = false }: DynamicFeaturesSectionProps) => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  // Collecter toutes les fonctionnalités
  const allFeatures: FeatureItem[] = [];

  config.websitePages?.forEach((page) => {
    allFeatures.push({ name: page, type: 'Page principale', icon: getPageIcon(page), color: config.primaryColor });
  });

  config.websiteSections?.forEach((section) => {
    allFeatures.push({ name: section, type: 'Section', icon: getFeatureIcon(section), color: config.accentColor });
  });

  config.autoCompatibility?.forEach((feature) => {
    allFeatures.push({ name: feature, type: 'Fonctionnalité', icon: getFeatureIcon(feature), color: config.secondaryColor || config.primaryColor });
  });

  config.ecommerceNeeds?.forEach((feature) => {
    allFeatures.push({ name: feature, type: 'E-commerce', icon: getFeatureIcon(feature), color: config.primaryColor });
  });

  config.restaurantFeatures?.forEach((feature) => {
    allFeatures.push({ name: feature, type: 'Restaurant', icon: getFeatureIcon(feature), color: config.accentColor });
  });

  config.portalClientFeatures?.forEach((feature) => {
    allFeatures.push({ name: feature, type: 'Portail client', icon: getFeatureIcon(feature), color: config.primaryColor });
  });

  config.portalEmployeeFeatures?.forEach((feature) => {
    allFeatures.push({ name: feature, type: 'Portail employés', icon: getFeatureIcon(feature), color: config.accentColor });
  });

  config.selectedModules?.forEach((moduleId) => {
    allFeatures.push({ name: moduleId, type: 'Module additionnel', icon: Star, color: config.primaryColor });
  });

  if (allFeatures.length === 0) return null;

  const bgClass = themeConfig.sectionAlt || themeConfig.sectionBg || 'bg-slate-50';

  return (
    <>
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
              Cliquez sur une fonctionnalité pour voir un aperçu interactif
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isModule = feature.type === 'Module additionnel';
              
              return (
                <button
                  key={`feature-${index}`}
                  onClick={() => setSelectedFeature(feature)}
                  className={`p-5 ${themeConfig.cardBg} transition-all duration-300 hover:scale-105 rounded-xl text-left group cursor-pointer ${
                    isModule ? 'border-2' : ''
                  }`}
                  style={isModule ? { borderColor: `${config.primaryColor}40` } : {}}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: isModule ? undefined : feature.color, background: isModule ? `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` : undefined }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`font-bold truncate ${themeConfig.textPrimary}`}>{feature.name}</p>
                      <p className={`text-xs ${themeConfig.textSecondary}`}>{feature.type}</p>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      style={{ backgroundColor: `${config.primaryColor}20` }}
                    >
                      <Play className="w-4 h-4" style={{ color: config.primaryColor }} />
                    </div>
                  </div>
                </button>
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
                {allFeatures.length} fonctionnalités incluses
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de prévisualisation */}
      <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedFeature && (
                <>
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: selectedFeature.color }}
                  >
                    <selectedFeature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block">{selectedFeature.name}</span>
                    <span className="text-xs font-normal text-muted-foreground">{selectedFeature.type}</span>
                  </div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedFeature && (
            <FeaturePreview feature={selectedFeature} config={config} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
