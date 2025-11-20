import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuestionnaireData } from "@/types/questionnaire";
import { CheckCircle2, Calendar, DollarSign, Clock, Zap, Minimize2, Maximize2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: QuestionnaireData;
}
interface QuoteItem {
  name: string;
  description: string;
  price: number;
  included: boolean;
}
export const QuoteModal = ({
  open,
  onOpenChange,
  data
}: QuoteModalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  const calculateQuote = (): {
    items: QuoteItem[];
    canvaItems: QuoteItem[];
    total: number;
    canvaTotal: number;
    canvaOneTime: number;
    timeline: string;
    oneTimeTotal: number;
  } => {
    const items: QuoteItem[] = [];
    const canvaItems: QuoteItem[] = [];
    let monthlyTotal = 0;
    let oneTimeTotal = 0;
    let canvaMonthlyTotal = 0;
    let canvaOneTimeTotal = 0;

    // === SECTION 1: Solutions Website ===
    if ((data.solutionTypes || []).includes("website")) {
      if (data.websiteType === "vitrine") {
        monthlyTotal += 80;
        items.push({
          name: "Site Web Vitrine",
          description: "Site professionnel responsive",
          price: 80,
          included: true
        });
      } else if (data.websiteType === "ecommerce") {
        monthlyTotal += 150;
        items.push({
          name: "Site E-commerce",
          description: "Boutique en ligne complète",
          price: 150,
          included: true
        });

        // Ajout selon nombre de produits
        const productCount = data.ecommerceProductCount;
        if (productCount === "50-200" || productCount === "200+") {
          monthlyTotal += 30;
          items.push({
            name: "Gestion catalogue étendu",
            description: "Support pour catalogue de produits volumineux",
            price: 30,
            included: true
          });
        }
      } else if (data.websiteType === "organisationnel") {
        monthlyTotal += 100;
        items.push({
          name: "Site Organisationnel",
          description: "Plateforme web sur mesure",
          price: 100,
          included: true
        });
      }

      // Fonctionnalités additionnelles - E-commerce
      (data.ecommerceNeeds || []).forEach(need => {
        const needPrices: Record<string, number> = {
          "payment": 20,
          "inventory": 25,
          "shipping": 15,
          "reviews": 10,
          "wishlist": 8,
          "loyalty": 15
        };
        if (needPrices[need]) {
          monthlyTotal += needPrices[need];
          items.push({
            name: `Module ${need}`,
            description: "Fonctionnalité e-commerce additionnelle",
            price: needPrices[need],
            included: true
          });
        }
      });

      // Fonctionnalités spécifiques par industrie
      if (data.industry === "auto" && (data.autoCompatibility || []).length > 0) {
        monthlyTotal += 20;
        items.push({
          name: "Compatibilité véhicules",
          description: "Base de données de compatibilité auto",
          price: 20,
          included: true
        });
      }
      if (data.industry === "restauration") {
        (data.restaurantFeatures || []).forEach(feature => {
          const prices: Record<string, number> = {
            "menu": 15,
            "reservations": 25,
            "delivery": 30
          };
          if (prices[feature]) {
            monthlyTotal += prices[feature];
            items.push({
              name: `Restaurant - ${feature}`,
              description: "Module restauration",
              price: prices[feature],
              included: true
            });
          }
        });
      }
      if (data.industry === "sante") {
        (data.healthCompliance || []).forEach(feature => {
          monthlyTotal += 30;
          items.push({
            name: "Conformité santé",
            description: feature,
            price: 30,
            included: true
          });
        });
      }
    }

    // === SECTION 2: Solutions Portal ===
    if ((data.solutionTypes || []).includes("portal")) {
      monthlyTotal += 120;
      items.push({
        name: "Portail d'entreprise",
        description: "Plateforme complète avec 3 utilisateurs inclus",
        price: 120,
        included: true
      });

      // Utilisateurs additionnels basés sur portalUsers
      const userCounts: Record<string, number> = {
        "5-10": 7,
        "11-25": 22,
        "26-50": 47,
        "50+": 97
      };
      const additionalUsers = userCounts[data.portalUsers || ""] || 0;
      if (additionalUsers > 0) {
        monthlyTotal += additionalUsers;
        items.push({
          name: "Utilisateurs additionnels",
          description: `${additionalUsers} utilisateurs supplémentaires à 1$/mois`,
          price: additionalUsers,
          included: true
        });
      }

      // Fonctionnalités portail client
      (data.portalClientFeatures || []).forEach(feature => {
        monthlyTotal += 15;
        items.push({
          name: `Portail client - ${feature}`,
          description: "Fonctionnalité portail",
          price: 15,
          included: true
        });
      });

      // Fonctionnalités portail employés
      (data.portalEmployeeFeatures || []).forEach(feature => {
        monthlyTotal += 15;
        items.push({
          name: `Portail employés - ${feature}`,
          description: "Fonctionnalité portail",
          price: 15,
          included: true
        });
      });

      // Fonctionnalités portail RH
      (data.portalHRFeatures || []).forEach(feature => {
        monthlyTotal += 20;
        items.push({
          name: `Module RH - ${feature}`,
          description: "Fonctionnalité ressources humaines",
          price: 20,
          included: true
        });
      });
    }

    // === SECTION 3: Modules Complémentaires ===
    const modulePrices: Record<string, {
      name: string;
      price: number;
    }> = {
      "calculateur-pdf": {
        name: "Calculateur PDF",
        price: 25
      },
      "rendez-vous": {
        name: "Système de rendez-vous",
        price: 30
      },
      "tickets": {
        name: "Gestion de tickets",
        price: 20
      },
      "crm-lite": {
        name: "CRM Lite",
        price: 35
      },
      "projets-lite": {
        name: "Gestion de projets Lite",
        price: 30
      },
      "rh-lite": {
        name: "RH Lite",
        price: 35
      },
      "base-connaissances": {
        name: "Base de connaissances",
        price: 25
      },
      "chat-interne": {
        name: "Chat interne",
        price: 20
      },
      "onboarding": {
        name: "Onboarding automatisé",
        price: 25
      },
      "signatures": {
        name: "Signatures électroniques",
        price: 30
      },
      "kpi-dashboard": {
        name: "KPI & Tableaux de bord",
        price: 40
      }
    };
    (data.selectedModules || []).forEach(moduleId => {
      const module = modulePrices[moduleId];
      if (module) {
        monthlyTotal += module.price;
        items.push({
          name: module.name,
          description: "Module complémentaire",
          price: module.price,
          included: true
        });
      }
    });

    // === SECTION 4: Services Canva ===
    if ((data.canvaServices || []).length > 0) {
      const quantityPrices: Record<string, {
        price: number;
        hours: number;
      }> = {
        "1-5": {
          price: 240,
          hours: 4
        },
        "6-10": {
          price: 480,
          hours: 8
        },
        "11-20": {
          price: 900,
          hours: 15
        }
      };
      const quantity = data.canvaQuantity || "";

      // Labels des services
      const serviceLabels: Record<string, string> = {
        "flyers": "Dépliants et affiches",
        "presentations": "Présentations PowerPoint/PDF",
        "business-cards": "Cartes d'affaires",
        "brochures": "Brochures et catalogues",
        "banners": "Bannières web et publicités",
        "infographics": "Infographies",
        "menus": "Menus (restaurants)",
        "newsletters": "Infolettres"
      };
      const servicesDesc = (data.canvaServices || []).map(s => serviceLabels[s] || s).join(', ');

      // Forfait sur mesure pour 20+
      if (quantity === "20+") {
        const customQuantity = data.canvaCustomQuantity || "non spécifié";
        const customDeadline = data.canvaCustomDeadline ? new Date(data.canvaCustomDeadline).toLocaleDateString('fr-CA') : "à définir";
        canvaItems.push({
          name: "Forfait sur mesure",
          description: `${servicesDesc} • ${customQuantity} designs • Échéance: ${customDeadline}`,
          price: 0,
          included: true
        });
      } else {
        const priceInfo = quantityPrices[quantity];
        if (priceInfo) {
          const basePrice = priceInfo.price;
          const frequencyLabels: Record<string, string> = {
            "one-time": "ponctuel",
            "monthly": "mensuel",
            "quarterly": "trimestriel",
            "as-needed": "au besoin"
          };
          if (data.canvaFrequency === "one-time") {
            canvaOneTimeTotal += basePrice;
            canvaItems.push({
              name: `Services Canva (${frequencyLabels[data.canvaFrequency]})`,
              description: `${servicesDesc} • ${quantity} designs`,
              price: basePrice,
              included: true
            });
          } else {
            const frequency = data.canvaFrequency;
            let monthlyPrice = basePrice;
            if (frequency === "quarterly") {
              monthlyPrice = Math.round(basePrice / 3);
            } else if (frequency === "as-needed") {
              monthlyPrice = Math.round(basePrice * 0.5);
            }
            canvaMonthlyTotal += monthlyPrice;
            canvaItems.push({
              name: `Services Canva (${frequencyLabels[frequency]})`,
              description: `${servicesDesc} • ${quantity} designs`,
              price: monthlyPrice,
              included: true
            });
          }
        }
      }

      // Supports infographies additionnels
      if ((data.infographicSupports || []).length > 0) {
        const supportsCount = data.infographicSupports.length;
        const supportsPrice = supportsCount * 50;
        const supportLabels: Record<string, string> = {
          "posters": "Affiches",
          "stickers": "Collants",
          "pens": "Stylos",
          "mugs": "Tasses",
          "tshirts": "T-shirts",
          "notebooks": "Carnets",
          "banners-physical": "Bannières",
          "keychains": "Porte-clés",
          "magnets": "Aimants"
        };
        const supportsDesc = (data.infographicSupports || []).map(s => supportLabels[s] || s).join(', ');
        if (data.canvaFrequency === "one-time") {
          canvaOneTimeTotal += supportsPrice;
        } else {
          canvaMonthlyTotal += supportsPrice;
        }
        canvaItems.push({
          name: "Supports d'infographies",
          description: supportsDesc,
          price: supportsPrice,
          included: true
        });
      }
    }

    // Modules selon les objectifs sélectionnés (legacy support)
    const objectiveModules: Record<string, {
      name: string;
      description: string;
      price: number;
    }> = {
      "reduce-costs": {
        name: "Optimisation & Analytics",
        description: "Outils d'analyse et d'optimisation des coûts",
        price: 20
      },
      "save-time": {
        name: "Automatisation",
        description: "Workflows automatisés et intégrations",
        price: 25
      },
      "increase-revenue": {
        name: "CRM Lite",
        description: "Gestion des opportunités et suivi des ventes",
        price: 22
      },
      "improve-quality": {
        name: "Tickets d'Assistance",
        description: "Système de support client professionnel",
        price: 15
      },
      "scale-business": {
        name: "Gestionnaire de Projets Lite",
        description: "Suivi de projets et collaboration d'équipe",
        price: 25
      },
      "centralize-data": {
        name: "Base de Données Unifiée",
        description: "Centralisation et organisation des données",
        price: 20
      },
      "improve-communication": {
        name: "Outils de Communication",
        description: "Notifications et messagerie intégrées",
        price: 15
      },
      "modernize": {
        name: "Design Premium",
        description: "Interface moderne et identité visuelle",
        price: 30
      }
    };
    data.mainObjectives.forEach(objective => {
      const module = objectiveModules[objective];
      if (module) {
        items.push({
          name: module.name,
          description: module.description,
          price: module.price,
          included: true
        });
        monthlyTotal += module.price;
      }
    });

    // Modules selon l'industrie (conformité)
    const complexIndustries = ["finances", "sante", "legal"];
    if (complexIndustries.includes(data.industry)) {
      items.push({
        name: "Conformité Sectorielle",
        description: "Sécurité renforcée et conformité réglementaire",
        price: 50,
        included: true
      });
      monthlyTotal += 50;
    }

    // Services inclus de base
    items.push({
      name: "Hébergement & Sécurité",
      description: "Infrastructure sécurisée et surveillance 24/7",
      price: 0,
      included: true
    }, {
      name: "Maintenance & Mises à Jour",
      description: "Support technique et évolutions",
      price: 0,
      included: true
    }, {
      name: "Formation",
      description: "Sessions de formation et documentation",
      price: 0,
      included: true
    });

    // Frais d'installation unique selon urgence
    const isUrgent = data.startDate && new Date(data.startDate) < new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    if (isUrgent) {
      oneTimeTotal += 500;
      items.push({
        name: "Installation Express",
        description: "Livraison accélérée en 7 jours",
        price: 500,
        included: true
      });
    }

    // Timeline selon l'urgence et la date de démarrage
    let timeline = "2-3 semaines";
    if (isUrgent) {
      timeline = "7 jours ouvrables";
    } else if (data.startDate) {
      const startDate = new Date(data.startDate);
      const now = new Date();
      const daysUntil = Math.floor((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntil < 30) {
        timeline = "2-3 semaines";
      } else if (daysUntil < 60) {
        timeline = "3-4 semaines";
      } else {
        timeline = "4-6 semaines";
      }
    }
    return {
      items,
      canvaItems,
      total: monthlyTotal,
      canvaTotal: canvaMonthlyTotal,
      canvaOneTime: canvaOneTimeTotal,
      timeline,
      oneTimeTotal
    };
  };
  const quote = calculateQuote();
  
  // Version minimisée
  if (isMinimized && open) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Card className="p-4 shadow-lg bg-background border-primary/20 cursor-pointer hover:border-primary/40 transition-colors" onClick={() => setIsMinimized(false)}>
          <div className="flex items-center gap-3">
            <DollarSign className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold">Devis du Projet</p>
              <p className="text-sm text-muted-foreground">Cliquez pour agrandir</p>
            </div>
            <Maximize2 className="w-4 h-4 text-muted-foreground ml-2" />
          </div>
        </Card>
      </div>
    );
  }
  
  return <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto fixed top-4 right-4 left-auto translate-x-0 translate-y-0 data-[state=open]:slide-in-from-right" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" />
              Devis Détaillé du Projet
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)}>
              <Minimize2 className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>
            Estimation basée sur vos réponses et besoins spécifiques
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Informations du projet */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Délai de livraison estimé</p>
                  <p className="font-semibold">{quote.timeline}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Début possible</p>
                  <p className="font-semibold">Sous 2 semaines</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Détails des éléments */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Éléments du Projet</h3>
            <div className="space-y-3">
              {quote.items.map((item, index) => <Card key={index} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <h4 className="font-semibold">{item.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground ml-6">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      {item.price > 0 ? <p className="font-semibold text-primary">
                          {item.price.toLocaleString('fr-CA', {
                      style: 'currency',
                      currency: 'CAD'
                    })}
                        </p> : <Badge variant="secondary" className="text-xs">Inclus</Badge>}
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>

          {/* Services Canva - Section séparée */}
          {quote.canvaItems.length > 0 && <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Services Design Canva</h3>
                    <p className="text-sm text-muted-foreground">Services de création graphique</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {quote.canvaItems.map((item, index) => <Card key={index} className="p-4 border-accent/30">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                            <h4 className="font-semibold">{item.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground ml-6">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {item.price > 0 ? <p className="font-semibold text-accent">
                              {item.price.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD'
                      })}
                            </p> : <Badge variant="outline" className="text-accent border-accent">À déterminer</Badge>}
                        </div>
                      </div>
                    </Card>)}
                </div>
              </div>
            </>}

          <Separator />

          {/* Total */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Abonnement Mensuel</p>
                  <p className="text-4xl font-bold text-primary">
                    {quote.total.toLocaleString('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                  })}/mois
                  </p>
                </div>
                <Zap className="w-12 h-12 text-primary/30" />
              </div>

              {/* Services Canva mensuels */}
              {quote.canvaTotal > 0 && <div className="pt-4 border-t border-primary/20">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Services Canva (récurrent)</p>
                    <p className="text-2xl font-bold text-accent">
                      {quote.canvaTotal.toLocaleString('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                  })}/mois
                    </p>
                  </div>
                </div>}
              
              {quote.oneTimeTotal > 0 && <div className="pt-4 border-t border-primary/20">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Frais d'installation unique</p>
                    <p className="text-2xl font-bold text-accent">
                      {quote.oneTimeTotal.toLocaleString('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                  })}
                    </p>
                  </div>
                </div>}

              {/* Services Canva ponctuels */}
              {quote.canvaOneTime > 0 && <div className="pt-4 border-t border-primary/20">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Services Canva (ponctuel)</p>
                    <p className="text-2xl font-bold text-accent">
                      {quote.canvaOneTime.toLocaleString('fr-CA', {
                    style: 'currency',
                    currency: 'CAD'
                  })}
                    </p>
                  </div>
                </div>}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Aucun engagement • Annulez à tout moment</span>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg" onClick={() => {
            onOpenChange(false);
            // Ici on pourrait déclencher une action d'envoi du devis par email
          }}>
              <Calendar className="w-4 h-4 mr-2" />
              Planifier un Appel Découverte
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Ce devis est une estimation basée sur vos réponses. Un devis final détaillé vous sera fourni après notre appel découverte.
          </p>
        </div>
      </DialogContent>
    </Dialog>;
};