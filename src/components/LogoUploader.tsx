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
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Identité de Marque
        </h3>
        <p className="text-sm text-muted-foreground">
          Nom d'entreprise et logo
        </p>
      </div>

      <div className="space-y-4">
        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company-name" className="text-sm font-semibold">
            Nom de l'Entreprise
          </Label>
          <Input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            placeholder="Nom de votre entreprise"
          />
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Logo (optionnel)
          </Label>

          {logo ? (
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-20 h-20 object-contain rounded border-2"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-2">Logo téléchargé</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onLogoChange(null)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Retirer
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card
              className={`p-6 border-2 border-dashed cursor-pointer transition-all ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("logo-upload")?.click()}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">
                    Glissez votre logo ou cliquez
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG ou SVG (max 5MB)
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
