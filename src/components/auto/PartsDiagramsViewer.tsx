import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ZoomIn, Maximize2, Settings, Zap, Disc, Battery } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsDiagramsViewerProps {
  primaryColor?: string;
  accentColor?: string;
}

export const PartsDiagramsViewer = ({ 
  primaryColor = "#dc2626", 
  accentColor = "#f97316" 
}: PartsDiagramsViewerProps) => {
  const [selectedDiagram, setSelectedDiagram] = useState<{
    title: string;
    type: string;
    description: string;
  } | null>(null);

  const diagrams = [
    {
      id: 1,
      title: "Système de freinage complet",
      type: "Schéma technique",
      description: "Schéma détaillé du système de freinage avec toutes les références de pièces OEM",
      pages: "12 pages",
      format: "PDF",
      icon: Disc
    },
    {
      id: 2,
      title: "Installation amortisseurs",
      type: "Guide d'installation",
      description: "Guide pas-à-pas pour l'installation des amortisseurs avec photos et couples de serrage",
      pages: "8 pages",
      format: "PDF",
      icon: Settings
    },
    {
      id: 3,
      title: "Schéma électrique",
      type: "Schéma technique",
      description: "Circuit électrique complet avec codes couleurs et références de connecteurs",
      pages: "15 pages",
      format: "PDF",
      icon: Zap
    },
    {
      id: 4,
      title: "Diagramme moteur",
      type: "Schéma éclaté",
      description: "Vue éclatée du moteur avec numérotation de chaque composant et références",
      pages: "20 pages",
      format: "PDF",
      icon: Battery
    },
  ];

  const handleDownload = (title: string) => {
    console.log(`Downloading: ${title}`);
  };

  const handleViewDiagram = (diagram: typeof diagrams[0]) => {
    setSelectedDiagram(diagram);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diagrams.map((diagram) => {
          const IconComponent = diagram.icon;
          return (
            <Card 
              key={diagram.id} 
              className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: primaryColor }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-lg text-slate-900">{diagram.title}</h4>
                    <Badge 
                      className="flex-shrink-0 text-white border-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {diagram.format}
                    </Badge>
                  </div>
                  
                  {/* Meta */}
                  <p className="text-sm font-medium mb-2" style={{ color: primaryColor }}>{diagram.type}</p>
                  <p className="text-sm text-slate-500 mb-2 line-clamp-2">{diagram.description}</p>
                  <p className="text-xs text-slate-400 mb-4">{diagram.pages}</p>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleViewDiagram(diagram)}
                      size="sm"
                      className="flex-1 rounded-lg text-white font-semibold"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <ZoomIn className="w-4 h-4 mr-2" />
                      Visualiser
                    </Button>
                    <Button 
                      onClick={() => handleDownload(diagram.title)}
                      size="sm"
                      variant="outline"
                      className="rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Diagram Preview Modal */}
      <Dialog open={!!selectedDiagram} onOpenChange={() => setSelectedDiagram(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-white border border-slate-200">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-slate-900">
              <span className="text-xl font-bold">{selectedDiagram?.title}</span>
              <Button 
                onClick={() => selectedDiagram && handleDownload(selectedDiagram.title)}
                className="rounded-lg text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Info Card */}
            <div 
              className="rounded-xl p-5"
              style={{ backgroundColor: `${primaryColor}10` }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: primaryColor }}>{selectedDiagram?.type}</p>
              <p className="text-sm text-slate-600">{selectedDiagram?.description}</p>
            </div>

            {/* Simulated diagram preview */}
            <div className="rounded-xl p-12 min-h-[400px] flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <Maximize2 className="w-10 h-10" style={{ color: primaryColor }} />
              </div>
              <p className="text-slate-900 font-semibold text-lg text-center mb-2">Aperçu du diagramme</p>
              <p className="text-sm text-slate-500 text-center max-w-md mb-8">
                Dans une vraie application, ce serait un visualiseur PDF ou une visionneuse d'image interactive
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-lg border-slate-200">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom +
                </Button>
                <Button 
                  className="rounded-lg text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  Page suivante
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
