import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Palette } from "lucide-react";
import { ColorPicker } from "./ColorPicker";

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

      <div className="space-y-6">
        {/* Primary Color */}
        <ColorPicker
          color={primaryColor}
          label="Couleur Principale"
          onChange={(color) => onColorChange({ primaryColor: color })}
        />

        {/* Accent Color */}
        <ColorPicker
          color={accentColor}
          label="Couleur d'Accent"
          onChange={(color) => onColorChange({ accentColor: color })}
        />

        {/* Secondary Color */}
        <ColorPicker
          color={secondaryColor}
          label="Couleur Secondaire"
          onChange={(color) => onColorChange({ secondaryColor: color })}
        />

        {/* Preview */}
        <div className="p-4 rounded-lg border-2 space-y-2" style={{ borderColor: primaryColor + "30" }}>
          <p className="text-xs font-semibold text-muted-foreground">Aperçu de la Palette</p>
          <div className="flex gap-2">
            <div className="flex-1 h-12 rounded-lg border-2 border-white shadow-sm" style={{ backgroundColor: primaryColor }} />
            <div className="flex-1 h-12 rounded-lg border-2 border-white shadow-sm" style={{ backgroundColor: accentColor }} />
            <div className="flex-1 h-12 rounded-lg border-2 border-white shadow-sm" style={{ backgroundColor: secondaryColor }} />
          </div>
        </div>
      </div>
    </div>
  );
};
