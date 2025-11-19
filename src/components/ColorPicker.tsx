import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ColorPickerProps {
  color: string;
  label: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, label, onChange }: ColorPickerProps) => {
  const [localColor, setLocalColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);
    onChange(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalColor(value);
    
    // Valider si c'est un hex valide avant de propager
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold">{label}</Label>
      
      <Tabs defaultValue="solid" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="solid">Couleur Unie</TabsTrigger>
          <TabsTrigger value="gradient" disabled>Dégradé</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solid" className="space-y-4">
          {/* Color Picker Canvas */}
          <div className="relative">
            <HexColorPicker 
              color={localColor} 
              onChange={handleColorChange}
              style={{ width: "100%", height: "200px" }}
            />
          </div>
          
          {/* Input avec aperçu */}
          <div className="flex gap-3 items-center">
            <div 
              className="w-12 h-12 rounded-lg border-2 border-border flex-shrink-0"
              style={{ backgroundColor: localColor }}
            />
            <Input
              type="text"
              value={localColor}
              onChange={handleInputChange}
              className="flex-1 font-mono text-sm uppercase"
              placeholder="#FBCA58"
              maxLength={7}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="gradient">
          <p className="text-sm text-muted-foreground text-center py-8">
            Fonctionnalité à venir
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
