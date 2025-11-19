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
  const rainbowColors = [
    "#FF0000", "#FF4500", "#FF8C00", "#FFD700", "#FFFF00", "#ADFF2F",
    "#00FF00", "#00FA9A", "#00CED1", "#1E90FF", "#0000FF", "#4169E1",
    "#8A2BE2", "#9370DB", "#FF1493", "#FF69B4", "#DC143C", "#B22222"
  ];

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
        <div className="space-y-3">
          <Label htmlFor="primary-color" className="text-sm font-semibold">
            Couleur Principale
          </Label>
          
          {/* Rainbow Palette */}
          <div className="grid grid-cols-9 gap-2">
            {rainbowColors.map((color) => (
              <button
                key={`primary-${color}`}
                type="button"
                onClick={() => onColorChange({ primaryColor: color })}
                className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                  primaryColor.toUpperCase() === color ? "border-foreground ring-2 ring-offset-2 ring-foreground" : "border-border"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          
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
        <div className="space-y-3">
          <Label htmlFor="accent-color" className="text-sm font-semibold">
            Couleur d'Accent
          </Label>
          
          {/* Rainbow Palette */}
          <div className="grid grid-cols-9 gap-2">
            {rainbowColors.map((color) => (
              <button
                key={`accent-${color}`}
                type="button"
                onClick={() => onColorChange({ accentColor: color })}
                className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                  accentColor.toUpperCase() === color ? "border-foreground ring-2 ring-offset-2 ring-foreground" : "border-border"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          
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
        <div className="space-y-3">
          <Label htmlFor="secondary-color" className="text-sm font-semibold">
            Couleur Secondaire
          </Label>
          
          {/* Rainbow Palette */}
          <div className="grid grid-cols-9 gap-2">
            {rainbowColors.map((color) => (
              <button
                key={`secondary-${color}`}
                type="button"
                onClick={() => onColorChange({ secondaryColor: color })}
                className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                  secondaryColor.toUpperCase() === color ? "border-foreground ring-2 ring-offset-2 ring-foreground" : "border-border"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
          
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
