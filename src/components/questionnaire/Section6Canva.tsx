import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface Section6Props {
  data: any;
  onChange: (updates: any) => void;
}

const CANVA_SERVICES = [
  { id: "flyers", label: "Dépliants et affiches" },
  { id: "presentations", label: "Présentations PowerPoint/PDF" },
  { id: "business-cards", label: "Cartes d'affaires" },
  { id: "brochures", label: "Brochures et catalogues" },
  { id: "banners", label: "Bannières web et publicités" },
  { id: "infographics", label: "Infographies" },
  { id: "menus", label: "Menus (restaurants)" },
  { id: "newsletters", label: "Infolettres" },
];

export const Section6Canva = ({ data, onChange }: Section6Props) => {
  const handleServiceToggle = (serviceId: string) => {
    const currentServices = data.canvaServices || [];
    const updated = currentServices.includes(serviceId)
      ? currentServices.filter((id: string) => id !== serviceId)
      : [...currentServices, serviceId];
    onChange({ canvaServices: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Services Canva
        </h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez les types de designs que vous souhaitez
        </p>
      </div>

      {/* Types de services Canva */}
      <div className="space-y-3">
        <Label>Types de designs souhaités *</Label>
        <div className="grid grid-cols-1 gap-3">
          {CANVA_SERVICES.map((service) => (
            <Card key={service.id} className="p-4 hover:bg-accent/5 transition-colors">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={service.id}
                  checked={(data.canvaServices || []).includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <label
                  htmlFor={service.id}
                  className="text-sm font-medium cursor-pointer flex-1"
                >
                  {service.label}
                </label>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quantité approximative */}
      <div className="space-y-3">
        <Label>Quantité approximative de designs *</Label>
        <RadioGroup
          value={data.canvaQuantity || ""}
          onValueChange={(value) => onChange({ canvaQuantity: value })}
        >
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-5" id="canva-1-5" />
              <label htmlFor="canva-1-5" className="text-sm cursor-pointer flex-1">
                1 à 5 designs (3-5 heures ~ 180$-300$)
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6-10" id="canva-6-10" />
              <label htmlFor="canva-6-10" className="text-sm cursor-pointer flex-1">
                6 à 10 designs (6-10 heures ~ 360$-600$)
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="11-20" id="canva-11-20" />
              <label htmlFor="canva-11-20" className="text-sm cursor-pointer flex-1">
                11 à 20 designs (11-20 heures ~ 660$-1200$)
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="20+" id="canva-20plus" />
              <label htmlFor="canva-20plus" className="text-sm cursor-pointer flex-1">
                Plus de 20 designs (forfait sur mesure)
              </label>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Fréquence */}
      <div className="space-y-3">
        <Label>Fréquence des services *</Label>
        <RadioGroup
          value={data.canvaFrequency || ""}
          onValueChange={(value) => onChange({ canvaFrequency: value })}
        >
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-time" id="freq-one-time" />
              <label htmlFor="freq-one-time" className="text-sm cursor-pointer flex-1">
                Projet ponctuel
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="freq-monthly" />
              <label htmlFor="freq-monthly" className="text-sm cursor-pointer flex-1">
                Service mensuel récurrent
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="quarterly" id="freq-quarterly" />
              <label htmlFor="freq-quarterly" className="text-sm cursor-pointer flex-1">
                Service trimestriel
              </label>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="as-needed" id="freq-as-needed" />
              <label htmlFor="freq-as-needed" className="text-sm cursor-pointer flex-1">
                Au besoin
              </label>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Délai souhaité */}
      <div className="space-y-3">
        <Label htmlFor="canva-deadline">Délai souhaité</Label>
        <Input
          id="canva-deadline"
          value={data.canvaDeadline || ""}
          onChange={(e) => onChange({ canvaDeadline: e.target.value })}
          placeholder="Ex: 2 semaines, 1 mois"
        />
      </div>

      {/* Spécifications particulières */}
      <div className="space-y-3">
        <Label htmlFor="canva-specs">Spécifications ou détails particuliers</Label>
        <Textarea
          id="canva-specs"
          value={data.canvaSpecifications || ""}
          onChange={(e) => onChange({ canvaSpecifications: e.target.value })}
          placeholder="Décrivez vos besoins spécifiques, style souhaité, dimensions particulières, etc."
          rows={4}
        />
      </div>
    </div>
  );
};
