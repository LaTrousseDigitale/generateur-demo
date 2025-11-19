import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogoUploaderProps {
  logo: string | null;
  companyName: string;
  onLogoChange: (logo: string | null) => void;
  onCompanyNameChange: (name: string) => void;
}

export const LogoUploader = ({
  logo,
  companyName,
  onLogoChange,
  onCompanyNameChange,
}: LogoUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: "Le logo doit faire moins de 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onLogoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Format invalide",
        description: "Veuillez utiliser une image (PNG, JPG, SVG)",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            4
          </div>
          <h2 className="text-2xl font-bold">Personnalisez votre marque</h2>
        </div>
        <p className="text-muted-foreground ml-10">
          Ajoutez votre logo et le nom de votre entreprise
        </p>
      </div>

      <div className="space-y-6 ml-10">
        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company-name" className="text-base font-semibold flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Nom de l'Entreprise
          </Label>
          <Input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            placeholder="Nom de votre entreprise"
            className="text-base"
          />
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Upload className="w-4 h-4 text-primary" />
            Logo de l'Entreprise
          </Label>
          <p className="text-sm text-muted-foreground">
            Format PNG, JPG ou SVG recommandé (max 5MB)
          </p>

          {logo ? (
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-24 h-24 object-contain rounded border-2"
                />
                <div className="flex-1">
                  <p className="font-semibold mb-2">Logo téléchargé avec succès</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onLogoChange(null)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Retirer le logo
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card
              className={`p-8 border-2 border-dashed cursor-pointer transition-all ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("logo-upload")?.click()}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold mb-1">
                    Glissez votre logo ici ou cliquez pour parcourir
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG ou SVG jusqu'à 5MB
                  </p>
                </div>
              </div>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
