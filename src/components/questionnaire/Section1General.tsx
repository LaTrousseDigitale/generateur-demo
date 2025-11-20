import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { INDUSTRIES } from "@/types/questionnaire";
import { Building2 } from "lucide-react";

interface Section1Props {
  data: any;
  onChange: (updates: any) => void;
}

const OBJECTIVES = [
  "Augmenter les ventes",
  "Améliorer l'expérience client",
  "Automatiser les processus",
  "Réduire les coûts opérationnels",
  "Gagner en visibilité",
  "Moderniser l'infrastructure",
];

export const Section1General = ({ data, onChange }: Section1Props) => {
  const toggleObjective = (objective: string) => {
    const current = data.mainObjectives || [];
    const updated = current.includes(objective)
      ? current.filter((o: string) => o !== objective)
      : [...current, objective];
    onChange({ mainObjectives: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Informations Générales
        </h3>
        <p className="text-sm text-muted-foreground">
          Parlez-nous de votre entreprise et de vos besoins
        </p>
      </div>

      {/* Nom de l'entreprise */}
      <div className="space-y-2">
        <Label htmlFor="company-name">Nom de l'entreprise *</Label>
        <Input
          id="company-name"
          value={data.companyName || ""}
          onChange={(e) => onChange({ companyName: e.target.value })}
          placeholder="Ex: Solutions Innovantes Inc."
        />
      </div>

      {/* Industrie */}
      <div className="space-y-2">
        <Label htmlFor="industry">Industrie *</Label>
        <Select value={data.industry || ""} onValueChange={(value) => onChange({ industry: value })}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Sélectionnez votre industrie" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((ind) => (
              <SelectItem key={ind.value} value={ind.value}>
                {ind.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Objectifs principaux */}
      <div className="space-y-3">
        <Label>Objectifs principaux (sélectionnez tous ceux qui s'appliquent)</Label>
        <div className="space-y-2">
          {OBJECTIVES.map((objective) => (
            <div key={objective} className="flex items-center space-x-2">
              <Checkbox
                id={objective}
                checked={(data.mainObjectives || []).includes(objective)}
                onCheckedChange={() => toggleObjective(objective)}
              />
              <label htmlFor={objective} className="text-sm cursor-pointer">
                {objective}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Date de début */}
      <div className="space-y-2">
        <Label>Date de début souhaitée *</Label>
        <RadioGroup value={data.startDate || ""} onValueChange={(value) => onChange({ startDate: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3-jours" id="3-jours" />
            <label htmlFor="3-jours" className="text-sm cursor-pointer">
              3 jours ouvrables
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2-4-semaines" id="2-4-semaines" />
            <label htmlFor="2-4-semaines" className="text-sm cursor-pointer">
              2-4 semaines
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-2-mois" id="1-2-mois" />
            <label htmlFor="1-2-mois" className="text-sm cursor-pointer">
              1-2 mois
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="plus-tard" id="plus-tard" />
            <label htmlFor="plus-tard" className="text-sm cursor-pointer">
              Plus tard (pas pressé)
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Financement */}
      <div className="space-y-2">
        <Label>Avez-vous un financement en place ? *</Label>
        <RadioGroup value={data.financing || ""} onValueChange={(value) => onChange({ financing: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="fin-oui" />
            <label htmlFor="fin-oui" className="text-sm cursor-pointer">
              Oui
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="fin-non" />
            <label htmlFor="fin-non" className="text-sm cursor-pointer">
              Non
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="peut-etre" id="fin-peut-etre" />
            <label htmlFor="fin-peut-etre" className="text-sm cursor-pointer">
              Peut-être
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
