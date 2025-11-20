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
  const calculateQuote = (): { items: QuoteItem[], total: number, timeline: string } => {
    const items: QuoteItem[] = [];
    let basePrice = 0;

    // Prix de base selon le type de service
    if (config.serviceType === "portal") {
      basePrice = 15000;
      items.push({
        name: "Portail d'Entreprise",
        description: "Plateforme web complète et personnalisée",
        price: 15000,
        included: true
      });
    } else if (config.serviceType === "website") {
      basePrice = 8000;
      items.push({
        name: "Solution Web",
        description: "Site web professionnel et optimisé",
        price: 8000,
        included: true
      });
    } else if (config.serviceType === "module") {
      basePrice = 5000;
      items.push({
        name: "Module Complémentaire",
        description: "Fonctionnalité intégrée sur mesure",
        price: 5000,
        included: true
      });
    }

    // Ajustement selon l'industrie (complexité)
    const complexIndustries = ["finances", "sante", "legal", "consulting"];
    if (complexIndustries.includes(config.industry)) {
      items.push({
        name: "Conformité Sectorielle",
        description: "Sécurité et conformité renforcées",
        price: 3000,
        included: true
      });
      basePrice += 3000;
    }

    // Ajustement selon la taille de l'entreprise
    if (config.companySize === "large") {
      items.push({
        name: "Scalabilité Entreprise",
        description: "Infrastructure haute performance",
        price: 4000,
        included: true
      });
      basePrice += 4000;
    } else if (config.companySize === "medium") {
      items.push({
        name: "Évolutivité",
        description: "Architecture modulaire et extensible",
        price: 2000,
        included: true
      });
      basePrice += 2000;
    }

    // Ajustement selon les objectifs
    if (config.mainObjective === "automation") {
      items.push({
        name: "Automatisation Avancée",
        description: "Workflows intelligents et intégrations",
        price: 3500,
        included: true
      });
      basePrice += 3500;
    } else if (config.mainObjective === "efficiency") {
      items.push({
        name: "Optimisation des Processus",
        description: "Interface intuitive et rapide",
        price: 2000,
        included: true
      });
      basePrice += 2000;
    }

    // Services inclus de base
    items.push(
      {
        name: "Conception UI/UX",
        description: "Design professionnel et responsive",
        price: 0,
        included: true
      },
      {
        name: "Formation Utilisateurs",
        description: "Sessions de formation et documentation",
        price: 0,
        included: true
      },
      {
        name: "Support 3 Mois",
        description: "Assistance technique et maintenance",
        price: 0,
        included: true
      }
    );

    // Timeline selon l'urgence
    let timeline = "8-12 semaines";
    if (config.timeline === "urgent") {
      timeline = "4-6 semaines";
      items.push({
        name: "Livraison Accélérée",
        description: "Équipe dédiée et priorité maximale",
        price: 5000,
        included: true
      });
      basePrice += 5000;
    } else if (config.timeline === "normal") {
      timeline = "8-12 semaines";
    } else if (config.timeline === "flexible") {
      timeline = "12-16 semaines";
    }

    return { items, total: basePrice, timeline };
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-muted-foreground mb-1">Investissement Total</p>
                <p className="text-4xl font-bold text-primary">
                  {quote.total.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                </p>
              </div>
              <Zap className="w-12 h-12 text-primary/30" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Paiement échelonné possible (3 versements)</span>
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
