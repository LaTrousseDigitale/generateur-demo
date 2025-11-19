import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Palette } from "lucide-react";

interface ColorCustomizerProps {
  primaryColor: string;
  accentColor: string;
  secondaryColor: string;
  onColorChange: (colors: {
    primaryColor?: string;
    accentColor?: string;
    secondaryColor?: string;
  }) => void;
}

export const ColorCustomizer = ({
  primaryColor,
  accentColor,
  secondaryColor,
  onColorChange,
}: ColorCustomizerProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            3
          </div>
          <h2 className="text-2xl font-bold">Personnalisez vos couleurs</h2>
        </div>
        <p className="text-muted-foreground ml-10">
          Choisissez les couleurs qui représentent votre marque
        </p>
      </div>

      <div className="space-y-6 ml-10">
        {/* Primary Color */}
        <div className="space-y-2">
          <Label htmlFor="primary-color" className="text-base font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-primary" />
            Couleur Principale
          </Label>
          <p className="text-sm text-muted-foreground">
            Utilisée pour les éléments importants et les boutons d'action
          </p>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => onColorChange({ primaryColor: e.target.value })}
                className="w-20 h-20 p-1 cursor-pointer border-2"
              />
            </div>
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => onColorChange({ primaryColor: e.target.value })}
              className="flex-1 font-mono"
              placeholder="#1c61fe"
            />
          </div>
        </div>

        {/* Accent Color */}
        <div className="space-y-2">
          <Label htmlFor="accent-color" className="text-base font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-accent" />
            Couleur d'Accent
          </Label>
          <p className="text-sm text-muted-foreground">
            Pour les éléments secondaires et les highlights
          </p>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                id="accent-color"
                type="color"
                value={accentColor}
                onChange={(e) => onColorChange({ accentColor: e.target.value })}
                className="w-20 h-20 p-1 cursor-pointer border-2"
              />
            </div>
            <Input
              type="text"
              value={accentColor}
              onChange={(e) => onColorChange({ accentColor: e.target.value })}
              className="flex-1 font-mono"
              placeholder="#ff6b3d"
            />
          </div>
        </div>

        {/* Secondary Color */}
        <div className="space-y-2">
          <Label htmlFor="secondary-color" className="text-base font-semibold flex items-center gap-2">
            <Palette className="w-4 h-4 text-secondary" />
            Couleur Secondaire
          </Label>
          <p className="text-sm text-muted-foreground">
            Pour les badges, étiquettes et éléments décoratifs
          </p>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                id="secondary-color"
                type="color"
                value={secondaryColor}
                onChange={(e) => onColorChange({ secondaryColor: e.target.value })}
                className="w-20 h-20 p-1 cursor-pointer border-2"
              />
            </div>
            <Input
              type="text"
              value={secondaryColor}
              onChange={(e) => onColorChange({ secondaryColor: e.target.value })}
              className="flex-1 font-mono"
              placeholder="#fbca58"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 rounded-lg border-2 space-y-3" style={{ borderColor: primaryColor + "30" }}>
          <p className="text-sm font-semibold text-muted-foreground">Aperçu des couleurs</p>
          <div className="flex gap-2">
            <div className="flex-1 h-12 rounded" style={{ backgroundColor: primaryColor }} />
            <div className="flex-1 h-12 rounded" style={{ backgroundColor: accentColor }} />
            <div className="flex-1 h-12 rounded" style={{ backgroundColor: secondaryColor }} />
          </div>
        </div>
      </div>
    </div>
  );
};
