import { Card } from "@/components/ui/card";
import { CheckCircle2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MaintenancePlanComparisonProps {
  currentPlan?: string;
}

export const MaintenancePlanComparison = ({ currentPlan }: MaintenancePlanComparisonProps) => {
  const plans = [
    {
      id: "basic",
      name: "Service de base",
      price: 50,
      features: [
        { name: "Mises à jour de sécurité", included: true },
        { name: "Surveillance de base", included: true },
        { name: "Support par courriel", included: true },
        { name: "Temps de réponse", value: "48h ouvrables" },
        { name: "Sauvegardes", value: "Hebdomadaires" },
        { name: "Surveillance 24/7", included: false },
        { name: "Support téléphonique", included: false },
        { name: "Gestionnaire de compte", included: false },
      ]
    },
    {
      id: "standard",
      name: "Service standard",
      price: 150,
      popular: true,
      features: [
        { name: "Mises à jour de sécurité", included: true },
        { name: "Surveillance de base", included: true },
        { name: "Support par courriel", included: true },
        { name: "Temps de réponse", value: "24h ouvrables" },
        { name: "Sauvegardes", value: "Quotidiennes" },
        { name: "Optimisation de performance", included: true },
        { name: "Support prioritaire", included: true },
        { name: "Surveillance 24/7", included: false },
        { name: "Support téléphonique", included: false },
      ]
    },
    {
      id: "premium",
      name: "Service premium",
      price: 300,
      features: [
        { name: "Mises à jour de sécurité", included: true },
        { name: "Surveillance 24/7", included: true },
        { name: "Support par courriel", included: true },
        { name: "Temps de réponse", value: "4h" },
        { name: "Sauvegardes", value: "Quotidiennes + temps réel" },
        { name: "Tests de sécurité", included: true },
        { name: "Corrections de bugs illimitées", included: true },
        { name: "Support téléphonique", included: true },
        { name: "Gestionnaire de compte", included: false },
      ]
    },
    {
      id: "enterprise",
      name: "Service entreprise",
      price: 450,
      features: [
        { name: "Mises à jour de sécurité", included: true },
        { name: "Surveillance 24/7", included: true },
        { name: "Support multicanal", included: true },
        { name: "Temps de réponse", value: "1h (SLA garanti)" },
        { name: "Sauvegardes", value: "Temps réel" },
        { name: "Tests de sécurité avancés", included: true },
        { name: "Développements sur mesure inclus", included: true },
        { name: "Support téléphonique prioritaire", included: true },
        { name: "Gestionnaire de compte dédié", included: true },
        { name: "Infrastructure dédiée", included: true },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold mb-2">Comparateur de Plans de Maintenance</h3>
        <p className="text-muted-foreground">Choisissez le niveau de service qui correspond à vos besoins</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`p-6 ${plan.id === currentPlan ? 'ring-2 ring-primary' : ''} ${plan.popular ? 'border-primary border-2' : ''} relative`}>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {plan.popular && (
                  <Badge className="bg-primary">Plus populaire</Badge>
                )}
                {plan.id === currentPlan && (
                  <Badge variant="secondary">Plan sélectionné</Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-bold text-xl">{plan.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}$
                  </span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  ou {plan.price * 11}$/an (1 mois gratuit)
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : feature.included === false ? (
                      <X className="w-5 h-5 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${feature.included === false ? 'text-muted-foreground/60 line-through' : 'text-foreground'}`}>
                        {feature.name}
                      </p>
                      {feature.value && (
                        <p className="text-xs text-primary font-medium mt-0.5">{feature.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};