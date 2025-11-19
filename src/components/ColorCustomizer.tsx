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
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Palette de Couleurs
        </h3>
        <p className="text-sm text-muted-foreground">
          Personnalisez les couleurs de votre démo
        </p>
      </div>

      <div className="space-y-4">
        {/* Primary Color */}
        <div className="space-y-2">
          <Label htmlFor="primary-color" className="text-sm font-semibold">
            Couleur Principale
          </Label>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                id="primary-color"
                type="color"
                value={primaryColor}
                onChange={(e) => onColorChange({ primaryColor: e.target.value })}
                className="w-16 h-16 p-1 cursor-pointer border-2"
              />
            </div>
            <Input
              type="text"
              value={primaryColor}
              onChange={(e) => onColorChange({ primaryColor: e.target.value })}
              className="flex-1 font-mono text-sm"
              placeholder="#1c61fe"
            />
          </div>
        </div>

        {/* Accent Color */}
        <div className="space-y-2">
          <Label htmlFor="accent-color" className="text-sm font-semibold">
            Couleur d'Accent
          </Label>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                id="accent-color"
                type="color"
                value={accentColor}
                onChange={(e) => onColorChange({ accentColor: e.target.value })}
                className="w-16 h-16 p-1 cursor-pointer border-2"
              />
            </div>
            <Input
              type="text"
              value={accentColor}
              onChange={(e) => onColorChange({ accentColor: e.target.value })}
              className="flex-1 font-mono text-sm"
              placeholder="#ff6b3d"
            />
          </div>
        </div>

        {/* Secondary Color */}
        <div className="space-y-2">
          <Label htmlFor="secondary-color" className="text-sm font-semibold">
            Couleur Secondaire
          </Label>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <Input
                id="secondary-color"
                type="color"
                value={secondaryColor}
                onChange={(e) => onColorChange({ secondaryColor: e.target.value })}
                className="w-16 h-16 p-1 cursor-pointer border-2"
              />
            </div>
            <Input
              type="text"
              value={secondaryColor}
              onChange={(e) => onColorChange({ secondaryColor: e.target.value })}
              className="flex-1 font-mono text-sm"
              placeholder="#fbca58"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 rounded-lg border-2 space-y-2" style={{ borderColor: primaryColor + "30" }}>
          <p className="text-xs font-semibold text-muted-foreground">Aperçu</p>
          <div className="flex gap-2">
            <div className="flex-1 h-10 rounded" style={{ backgroundColor: primaryColor }} />
            <div className="flex-1 h-10 rounded" style={{ backgroundColor: accentColor }} />
            <div className="flex-1 h-10 rounded" style={{ backgroundColor: secondaryColor }} />
          </div>
        </div>
      </div>
    </div>
  );
};
