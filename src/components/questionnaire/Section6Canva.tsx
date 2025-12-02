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

const INFOGRAPHIC_SUPPORTS = [
  { id: "posters", label: "Affiches" },
  { id: "stickers", label: "Collants/Autocollants" },
  { id: "pens", label: "Stylos" },
  { id: "mugs", label: "Tasses" },
  { id: "tshirts", label: "T-shirts" },
  { id: "notebooks", label: "Carnets/Blocs-notes" },
  { id: "banners-physical", label: "Bannières physiques" },
  { id: "keychains", label: "Porte-clés" },
  { id: "magnets", label: "Aimants" },
];

export const Section6Canva = ({ data, onChange }: Section6Props) => {
  const handleServiceToggle = (serviceId: string) => {
    const currentServices = data.canvaServices || [];
    const updated = currentServices.includes(serviceId)
      ? currentServices.filter((id: string) => id !== serviceId)
      : [...currentServices, serviceId];
    onChange({ canvaServices: updated });
  };

  const handleSupportToggle = (supportId: string) => {
    const currentSupports = data.infographicSupports || [];
    const updated = currentSupports.includes(supportId)
      ? currentSupports.filter((id: string) => id !== supportId)
      : [...currentSupports, supportId];
    onChange({ infographicSupports: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Services graphiques
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

      {/* Question conditionnelle pour les supports d'infographie */}
      {(data.canvaServices || []).includes("infographics") && (
        <div className="space-y-3">
          <Label className="text-foreground">Supports pour les infographies</Label>
          <p className="text-xs text-muted-foreground mb-2">
            Sur quels supports souhaitez-vous appliquer vos infographies?
          </p>
          <div className="grid grid-cols-1 gap-3">
            {INFOGRAPHIC_SUPPORTS.map((support) => (
              <Card key={support.id} className="p-4 hover:bg-accent/5 transition-colors">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`support-${support.id}`}
                    checked={(data.infographicSupports || []).includes(support.id)}
                    onCheckedChange={() => handleSupportToggle(support.id)}
                  />
                  <label
                    htmlFor={`support-${support.id}`}
                    className="text-sm font-medium cursor-pointer flex-1"
                  >
                    {support.label}
                  </label>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

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

      {/* Questions conditionnelles pour forfait sur mesure (20+) */}
      {data.canvaQuantity === "20+" && (
        <Card className="p-6 bg-accent/5 border-accent/30 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-sm font-bold text-accent">!</span>
            </div>
            <h4 className="font-semibold text-accent">Détails du forfait sur mesure</h4>
          </div>

          {/* Nombre exact de designs */}
          <div className="space-y-2">
            <Label htmlFor="custom-quantity" className="text-foreground">
              Nombre exact de designs souhaités *
            </Label>
            <Input
              id="custom-quantity"
              type="number"
              min="21"
              value={data.canvaCustomQuantity || ""}
              onChange={(e) => onChange({ canvaCustomQuantity: e.target.value })}
              placeholder="Ex: 25, 50, 100..."
              className="border-accent/30"
            />
          </div>

          {/* Types de designs détaillés */}
          <div className="space-y-2">
            <Label htmlFor="custom-design-types" className="text-foreground">
              Types de designs et quantités par type *
            </Label>
            <Textarea
              id="custom-design-types"
              value={data.canvaCustomDesignTypes || ""}
              onChange={(e) => onChange({ canvaCustomDesignTypes: e.target.value })}
              placeholder="Ex: 15 dépliants, 20 bannières web, 10 infographies pour affiches..."
              rows={4}
              className="border-accent/30"
            />
            <p className="text-xs text-muted-foreground">
              Décrivez en détail les types de designs et les quantités souhaitées pour chacun
            </p>
          </div>

          {/* Date d'échéance spécifique */}
          <div className="space-y-2">
            <Label htmlFor="custom-deadline" className="text-foreground">
              Date d'échéance souhaitée *
            </Label>
            <Input
              id="custom-deadline"
              type="date"
              value={data.canvaCustomDeadline || ""}
              onChange={(e) => onChange({ canvaCustomDeadline: e.target.value })}
              className="border-accent/30"
            />
          </div>
        </Card>
      )}

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
