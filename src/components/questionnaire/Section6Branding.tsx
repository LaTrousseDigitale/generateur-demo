import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Type } from "lucide-react";

interface Section6Props {
  data: any;
  onChange: (updates: any) => void;
}

const TYPOGRAPHY_OPTIONS = [
  { value: "moderne", label: "Moderne & Épurée (Inter, Roboto)" },
  { value: "classique", label: "Classique & Élégante (Georgia, Times)" },
  { value: "tech", label: "Technologique (Fira Code, JetBrains Mono)" },
  { value: "creative", label: "Créative & Artistique (Playfair, Montserrat)" },
];

export const Section6Branding = ({ data, onChange }: Section6Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Type className="w-5 h-5 text-primary" />
          Typographie
        </h3>
        <p className="text-sm text-muted-foreground">
          Choisissez le style de police pour votre solution
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="typography">Style de typographie</Label>
        <Select value={data.typography || ""} onValueChange={(value) => onChange({ typography: value })}>
          <SelectTrigger id="typography">
            <SelectValue placeholder="Sélectionnez un style" />
          </SelectTrigger>
          <SelectContent>
            {TYPOGRAPHY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
