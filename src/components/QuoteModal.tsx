import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { CheckCircle2, Calendar, DollarSign, Clock, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: DemoConfig;
}

interface QuoteItem {
  name: string;
  description: string;
  price: number;
  included: boolean;
}

export const QuoteModal = ({ open, onOpenChange, config }: QuoteModalProps) => {
  const calculateQuote = (): { items: QuoteItem[], total: number, timeline: string, oneTimeTotal: number } => {
    const items: QuoteItem[] = [];
    let monthlyTotal = 0;
    let oneTimeTotal = 0;

    // Prix de base selon le type de service (mensuel)
    if (config.serviceType === "portal") {
      monthlyTotal = 120; // Portail Démarrage
      items.push({
        name: "Portail Démarrage",
        description: "Plateforme complète avec 3 utilisateurs inclus",
        price: 120,
        included: true
      });
      
      // Ajout selon taille de l'entreprise (utilisateurs additionnels)
      if (config.companySize === "small") {
        const additionalUsers = 7; // 10 - 3 inclus
        monthlyTotal += additionalUsers;
        items.push({
          name: "Utilisateurs Additionnels",
          description: `${additionalUsers} utilisateurs supplémentaires`,
          price: additionalUsers,
          included: true
        });
      } else if (config.companySize === "medium") {
        const additionalUsers = 47; // 50 - 3 inclus
        monthlyTotal += additionalUsers;
        items.push({
          name: "Utilisateurs Additionnels",
          description: `${additionalUsers} utilisateurs supplémentaires`,
          price: additionalUsers,
          included: true
        });
      } else if (config.companySize === "large") {
        const additionalUsers = 97; // 100 - 3 inclus (estimation)
        monthlyTotal += additionalUsers;
        items.push({
          name: "Utilisateurs Additionnels",
          description: `${additionalUsers} utilisateurs supplémentaires`,
          price: additionalUsers,
          included: true
        });
      }
      
    } else if (config.serviceType === "website") {
      monthlyTotal = 80; // Site Web Essentiel
      items.push({
        name: "Site Web Essentiel",
        description: "Site professionnel responsive avec 3 pages",
        price: 80,
        included: true
      });
    } else if (config.serviceType === "module") {
      // Module de base - prix selon objectifs
      monthlyTotal = 0; // Sera calculé selon les objectifs
    }

    // Modules selon les objectifs sélectionnés
    const objectiveModules: Record<string, { name: string; description: string; price: number }> = {
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

    config.mainObjectives.forEach(objective => {
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
    if (complexIndustries.includes(config.industry)) {
      items.push({
        name: "Conformité Sectorielle",
        description: "Sécurité renforcée et conformité réglementaire",
        price: 50,
        included: true
      });
      monthlyTotal += 50;
    }

    // Services inclus de base
    items.push(
      {
        name: "Hébergement & Sécurité",
        description: "Infrastructure sécurisée et surveillance 24/7",
        price: 0,
        included: true
      },
      {
        name: "Maintenance & Mises à Jour",
        description: "Support technique et évolutions",
        price: 0,
        included: true
      },
      {
        name: "Formation",
        description: "Sessions de formation et documentation",
        price: 0,
        included: true
      }
    );

    // Frais d'installation unique selon urgence
    if (config.timeline === "urgent") {
      oneTimeTotal = 500;
      items.push({
        name: "Installation Express",
        description: "Livraison accélérée en 7 jours",
        price: 500,
        included: true
      });
    }

    // Timeline selon l'urgence
    let timeline = "2-3 semaines";
    if (config.timeline === "urgent") {
      timeline = "7 jours ouvrables";
    } else if (config.timeline === "normal") {
      timeline = "2-3 semaines";
    } else if (config.timeline === "flexible") {
      timeline = "3-4 semaines";
    }

    return { 
      items, 
      total: monthlyTotal, 
      timeline,
      oneTimeTotal 
    };
  };

  const quote = calculateQuote();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-primary" />
            Devis Détaillé du Projet
          </DialogTitle>
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
                  <p className="text-sm text-muted-foreground">Timeline estimée</p>
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
              {quote.items.map((item, index) => (
                <Card key={index} className="p-4">
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
                      {item.price > 0 ? (
                        <p className="font-semibold text-primary">
                          {item.price.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                        </p>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Inclus</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">Abonnement Mensuel</p>
                  <p className="text-4xl font-bold text-primary">
                    {quote.total.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}/mois
                  </p>
                </div>
                <Zap className="w-12 h-12 text-primary/30" />
              </div>
              
              {quote.oneTimeTotal > 0 && (
                <div className="pt-4 border-t border-primary/20">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Frais d'installation unique</p>
                    <p className="text-2xl font-bold text-accent">
                      {quote.oneTimeTotal.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Aucun engagement • Annulez à tout moment</span>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="flex gap-3">
            <Button 
              className="flex-1" 
              size="lg"
              onClick={() => {
                onOpenChange(false);
                // Ici on pourrait déclencher une action d'envoi du devis par email
              }}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Planifier un Appel Découverte
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Ce devis est une estimation basée sur vos réponses. Un devis final détaillé vous sera fourni après notre appel découverte.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
