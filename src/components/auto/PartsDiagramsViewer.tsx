import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ZoomIn, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PartsDiagramsViewer = () => {
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
      format: "PDF"
    },
    {
      id: 2,
      title: "Installation amortisseurs",
      type: "Guide d'installation",
      description: "Guide pas-à-pas pour l'installation des amortisseurs avec photos et couples de serrage",
      pages: "8 pages",
      format: "PDF"
    },
    {
      id: 3,
      title: "Schéma électrique",
      type: "Schéma technique",
      description: "Circuit électrique complet avec codes couleurs et références de connecteurs",
      pages: "15 pages",
      format: "PDF"
    },
    {
      id: 4,
      title: "Diagramme moteur",
      type: "Schéma éclaté",
      description: "Vue éclatée du moteur avec numérotation de chaque composant et références",
      pages: "20 pages",
      format: "PDF"
    },
  ];

  const handleDownload = (title: string) => {
    // Simulate download
    console.log(`Downloading: ${title}`);
  };

  const handleViewDiagram = (diagram: typeof diagrams[0]) => {
    setSelectedDiagram(diagram);
  };

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-2">Diagrammes et schémas techniques</h3>
              <p className="text-muted-foreground">
                Accédez aux schémas détaillés et guides d'installation pour chaque pièce
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diagrams.map((diagram) => (
                <Card key={diagram.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{diagram.title}</h4>
                        <Badge variant="secondary" className="ml-2">
                          {diagram.format}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">{diagram.type}</p>
                      <p className="text-sm mb-3">{diagram.description}</p>
                      <p className="text-xs text-muted-foreground mb-4">{diagram.pages}</p>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleViewDiagram(diagram)}
                          variant="default"
                          size="sm"
                          className="flex-1"
                        >
                          <ZoomIn className="w-4 h-4 mr-1" />
                          Visualiser
                        </Button>
                        <Button 
                          onClick={() => handleDownload(diagram.title)}
                          variant="outline"
                          size="sm"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diagram Preview Modal */}
      <Dialog open={!!selectedDiagram} onOpenChange={() => setSelectedDiagram(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedDiagram?.title}</span>
              <Button 
                onClick={() => selectedDiagram && handleDownload(selectedDiagram.title)}
                variant="outline"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">{selectedDiagram?.type}</p>
              <p className="text-sm">{selectedDiagram?.description}</p>
            </div>

            {/* Simulated diagram preview */}
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-lg p-12 min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-border">
              <Maximize2 className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-center mb-2">Aperçu du diagramme</p>
              <p className="text-sm text-muted-foreground/70 text-center max-w-md">
                Dans une vraie application, ce serait un visualiseur PDF ou une visionneuse d'image interactive
              </p>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" size="sm">
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom +
                </Button>
                <Button variant="outline" size="sm">
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
