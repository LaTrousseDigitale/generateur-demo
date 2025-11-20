import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface Section8Props {
  data: any;
  onChange: (updates: any) => void;
}

export const Section8Finances = ({ data, onChange }: Section8Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Options Financières
        </h3>
        <p className="text-sm text-muted-foreground">Choisissez le mode de paiement qui vous convient</p>
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
                  Abonnement mensuel (80$/mois)
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
    </div>
  );
};
