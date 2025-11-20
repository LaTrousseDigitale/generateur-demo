import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { Eye, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DemoPreviewProps {
  config: DemoConfig;
}

export const DemoPreview = ({ config }: DemoPreviewProps) => {
  const { toast } = useToast();

  const handleFullscreen = () => {
    toast({
      title: "Vue plein écran",
      description: "Passez à la vue complète pour explorer toutes les fonctionnalités",
    });
  };

  const handleContact = () => {
    toast({
      title: "Appel découverte",
      description: "Nous vous contacterons dans les 24h pour planifier votre appel découverte",
    });
  };

  const getServiceTitle = () => {
    switch (config.serviceType) {
      case "portal":
        return "Portail d'Entreprise";
      case "website":
        return "Solution Web";
      case "module":
        return "Module Complémentaire";
      default:
        return "Votre Démo";
    }
  };

  const getFeatureLabels = () => {
    const labels: Record<string, string> = {
      crm: "CRM",
      projects: "Projets",
      hr: "RH",
      support: "Support",
      vitrine: "Site Vitrine",
      ecommerce: "E-commerce",
      careers: "Carrières",
      booking: "Réservations",
      calculator: "Calculatrice",
      "project-manager": "Gestionnaire de Projets",
      "hr-dashboard": "Tableau RH",
      "it-support": "Support TI",
    };
    return config.features.map((f) => labels[f] || f);
  };

  return (
    <Card className="p-6 shadow-elegant animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Aperçu en Temps Réel</h3>
      </div>

      {/* Preview Area */}
      <div
        className="border-2 rounded-lg overflow-hidden mb-4 min-h-[400px]"
        style={{
          borderColor: config.primaryColor,
          background: `linear-gradient(135deg, ${config.primaryColor}10, ${config.accentColor}10)`,
        }}
      >
        {/* Mock Browser Header */}
        <div className="bg-muted/50 px-4 py-2 flex items-center gap-2 border-b">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <div className="flex-1 bg-background/50 rounded px-3 py-1 text-xs text-muted-foreground">
            demo.latroussedigitale.ca
          </div>
        </div>

        {/* Demo Content */}
        <div className="p-6 space-y-4">
          {/* Header with Logo */}
          <div className="flex items-center gap-4 pb-4 border-b" style={{ borderColor: config.primaryColor + "20" }}>
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
            ) : (
              <div
                className="w-12 h-12 rounded flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: config.primaryColor }}
              >
                {config.companyName.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-bold text-lg">{config.companyName}</h4>
              <p className="text-sm text-muted-foreground">{getServiceTitle()}</p>
            </div>
          </div>

          {/* Features */}
          {config.features.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-semibold" style={{ color: config.primaryColor }}>
                Fonctionnalités Incluses
              </h5>
              <div className="flex flex-wrap gap-2">
                {getFeatureLabels().map((feature, index) => (
                  <Badge
                    key={index}
                    style={{
                      backgroundColor: config.primaryColor + "15",
                      color: config.primaryColor,
                      borderColor: config.primaryColor + "30",
                    }}
                    className="border"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Color Palette */}
          <div className="space-y-3">
            <h5 className="font-semibold" style={{ color: config.primaryColor }}>
              Palette de Couleurs
            </h5>
            <div className="flex gap-3">
              <div className="flex-1 space-y-2">
                <div
                  className="h-16 rounded border-2 border-white shadow-sm"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <p className="text-xs text-center text-muted-foreground">Principal</p>
              </div>
              <div className="flex-1 space-y-2">
                <div
                  className="h-16 rounded border-2 border-white shadow-sm"
                  style={{ backgroundColor: config.accentColor }}
                />
                <p className="text-xs text-center text-muted-foreground">Accent</p>
              </div>
              <div className="flex-1 space-y-2">
                <div
                  className="h-16 rounded border-2 border-white shadow-sm"
                  style={{ backgroundColor: config.secondaryColor }}
                />
                <p className="text-xs text-center text-muted-foreground">Secondaire</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          {config.serviceType && config.features.length > 0 && (
            <div className="pt-4">
              <Button
                className="w-full font-semibold"
                style={{
                  backgroundColor: config.primaryColor,
                  color: "white",
                }}
              >
                Découvrir la Solution Complète
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" size="sm" onClick={handleFullscreen}>
          <Eye className="w-4 h-4 mr-2" />
          Vue Plein Écran
        </Button>
        <Button variant="outline" className="flex-1" size="sm" onClick={handleContact}>
          <Calendar className="w-4 h-4 mr-2" />
          Appel Découverte
        </Button>
      </div>
    </Card>
  );
};
