import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DollarSign, Wallet } from "lucide-react";

interface Section8Props {
  data: any;
  onChange: (updates: any) => void;
}

const FINANCING_OPTIONS = [
  { value: "oui", label: "Oui", icon: "✅", color: "bg-green-500/10 border-green-500/30 hover:border-green-500" },
  { value: "non", label: "Non", icon: "❌", color: "bg-red-500/10 border-red-500/30 hover:border-red-500" },
  { value: "peut-etre", label: "Peut-être", icon: "🤔", color: "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500" },
];

export const Section8Finances = ({ data, onChange }: Section8Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Options financières
        </h3>
        <p className="text-sm text-muted-foreground">Choisissez le mode de paiement qui vous convient</p>
      </div>

      {/* Financing Already in Place - Pill Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          <Label className="font-semibold text-sm">
            Avez-vous un financement en place ? <span className="text-destructive">*</span>
          </Label>
        </div>
        <div className="flex gap-2">
          {FINANCING_OPTIONS.map((option) => {
            const isSelected = data.financing === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ financing: option.value })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm transition-all duration-300 border-2 ${
                  isSelected 
                    ? "bg-primary text-white border-primary shadow-lg scale-105" 
                    : option.color
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode de paiement */}
      <div className="space-y-3">
        <Label>Mode de paiement préféré *</Label>
        <RadioGroup value={data.paymentMode || ""} onValueChange={(value) => onChange({ paymentMode: value })}>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="abonnement" id="abonnement" />
              <div className="flex-1">
                <label htmlFor="abonnement" className="text-sm cursor-pointer font-semibold block">
                  Abonnement mensuel (80 $ CAD/mois)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Flexibilité maximale, mises à jour incluses, support prioritaire, sans engagement long terme
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="proprietaire" id="proprietaire" />
              <div className="flex-1">
                <label htmlFor="proprietaire" className="text-sm cursor-pointer font-semibold block">
                  Achat propriétaire (prix selon projet)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Vous possédez le code source, aucun frais récurrent, idéal pour projets complexes
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="financement" id="financement" />
              <div className="flex-1">
                <label htmlFor="financement" className="text-sm cursor-pointer font-semibold block">
                  Financement sur mesure
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Échelonnez vos paiements sur 12, 24 ou 36 mois
                </p>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Options de financement */}
      {data.paymentMode === "financement" && (
        <div className="space-y-2">
          <Label>Durée de financement</Label>
          <RadioGroup
            value={data.financingTerm || ""}
            onValueChange={(value) => onChange({ financingTerm: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12-mois" id="12-mois" />
              <label htmlFor="12-mois" className="text-sm cursor-pointer">
                12 mois
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24-mois" id="24-mois" />
              <label htmlFor="24-mois" className="text-sm cursor-pointer">
                24 mois
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="36-mois" id="36-mois" />
              <label htmlFor="36-mois" className="text-sm cursor-pointer">
                36 mois
              </label>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Budget mensuel */}
      <div className="space-y-2">
        <Label htmlFor="monthly-budget">Budget mensuel idéal (optionnel)</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            id="monthly-budget"
            type="number"
            value={data.monthlyBudget || ""}
            onChange={(e) => onChange({ monthlyBudget: e.target.value })}
            placeholder="Ex: 150"
            className="pl-7"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Cela nous aide à vous proposer les meilleures options pour votre budget
        </p>
      </div>

      {/* Service d'entretien et maintenance */}
      <div className="space-y-3">
        <Label>Service d'entretien et maintenance *</Label>
        <p className="text-sm text-muted-foreground">Un service essentiel pour assurer la performance et la sécurité de votre solution</p>
        
        <RadioGroup value={data.maintenanceLevel || ""} onValueChange={(value) => onChange({ maintenanceLevel: value })}>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="maintenance-basic" />
              <div className="flex-1">
                <label htmlFor="maintenance-basic" className="text-sm cursor-pointer font-semibold block">
                  Service de base (50 $ CAD/mois)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Mises à jour de sécurité, surveillance de base, support par courriel
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="maintenance-standard" />
              <div className="flex-1">
                <label htmlFor="maintenance-standard" className="text-sm cursor-pointer font-semibold block">
                  Service standard (150 $ CAD/mois)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Tout le service de base + sauvegardes quotidiennes, optimisation de performance, support prioritaire
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="premium" id="maintenance-premium" />
              <div className="flex-1">
                <label htmlFor="maintenance-premium" className="text-sm cursor-pointer font-semibold block">
                  Service premium (300 $ CAD/mois)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Tout le service standard + surveillance 24/7, tests de sécurité, corrections de bugs illimitées, support téléphonique
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enterprise" id="maintenance-enterprise" />
              <div className="flex-1">
                <label htmlFor="maintenance-enterprise" className="text-sm cursor-pointer font-semibold block">
                  Service entreprise (450 $ CAD/mois)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Service complet maximum + SLA garanti, gestionnaire de compte dédié, développements sur mesure inclus, infrastructure dédiée
                </p>
              </div>
            </div>
          </Card>
        </RadioGroup>

        {/* Fréquence de paiement */}
        {data.maintenanceLevel && (
          <div className="space-y-2 pt-4">
            <Label>Fréquence de paiement</Label>
            <RadioGroup
              value={data.maintenancePaymentFrequency || "monthly"}
              onValueChange={(value) => onChange({ maintenancePaymentFrequency: value })}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="maintenance-monthly" />
                <label htmlFor="maintenance-monthly" className="text-sm cursor-pointer">
                  Mensuel
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="annual" id="maintenance-annual" />
                <label htmlFor="maintenance-annual" className="text-sm cursor-pointer">
                  Annuel (1 mois gratuit)
                </label>
              </div>
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
};
