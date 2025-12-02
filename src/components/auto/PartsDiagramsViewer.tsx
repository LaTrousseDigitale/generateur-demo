import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ZoomIn, Maximize2, BookOpen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsDiagramsViewerProps {
  primaryColor?: string;
  accentColor?: string;
}

export const PartsDiagramsViewer = ({ 
  primaryColor = "#3B82F6", 
  accentColor = "#8B5CF6" 
}: PartsDiagramsViewerProps) => {
  const [selectedDiagram, setSelectedDiagram] = useState<{
    title: string;
    type: string;
    description: string;
  } | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const diagrams = [
    {
      id: 1,
      title: "Système de freinage complet",
      type: "Schéma technique",
      description: "Schéma détaillé du système de freinage avec toutes les références de pièces OEM",
      pages: "12 pages",
      format: "PDF",
      icon: "brake"
    },
    {
      id: 2,
      title: "Installation amortisseurs",
      type: "Guide d'installation",
      description: "Guide pas-à-pas pour l'installation des amortisseurs avec photos et couples de serrage",
      pages: "8 pages",
      format: "PDF",
      icon: "suspension"
    },
    {
      id: 3,
      title: "Schéma électrique",
      type: "Schéma technique",
      description: "Circuit électrique complet avec codes couleurs et références de connecteurs",
      pages: "15 pages",
      format: "PDF",
      icon: "electrical"
    },
    {
      id: 4,
      title: "Diagramme moteur",
      type: "Schéma éclaté",
      description: "Vue éclatée du moteur avec numérotation de chaque composant et références",
      pages: "20 pages",
      format: "PDF",
      icon: "engine"
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
      <section className="relative py-24 overflow-hidden bg-slate-950">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(180deg, transparent 0%, ${primaryColor}05 50%, transparent 100%)`
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: primaryColor }}
          />
          <div 
            className="absolute bottom-1/4 -left-20 w-60 h-60 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: accentColor }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                  border: `1px solid ${primaryColor}30`
                }}
              >
                <BookOpen className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-sm font-medium text-white">Documentation technique</span>
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                Diagrammes et{' '}
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  schémas techniques
                </span>
              </h3>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Accédez aux schémas détaillés et guides d'installation pour chaque pièce
              </p>
            </div>

            {/* Diagrams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diagrams.map((diagram, index) => (
                <div 
                  key={diagram.id} 
                  className="group relative rounded-2xl p-6 backdrop-blur-xl transition-all duration-500"
                  style={{
                    background: hoveredCard === index ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transform: hoveredCard === index ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index ? `0 20px 40px -15px ${primaryColor}30` : 'none'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{ 
                        background: hoveredCard === index 
                          ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                          : `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`
                      }}
                    >
                      <FileText 
                        className="w-7 h-7 transition-colors duration-300" 
                        style={{ color: hoveredCard === index ? 'white' : primaryColor }} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="font-bold text-xl text-white">{diagram.title}</h4>
                        <Badge 
                          className="flex-shrink-0 text-white border-0"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                        >
                          {diagram.format}
                        </Badge>
                      </div>
                      
                      {/* Meta */}
                      <p className="text-sm font-medium mb-2" style={{ color: primaryColor }}>{diagram.type}</p>
                      <p className="text-sm text-slate-400 mb-2 line-clamp-2">{diagram.description}</p>
                      <p className="text-xs text-slate-500 mb-5">{diagram.pages}</p>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleViewDiagram(diagram)}
                          className="flex-1 rounded-xl text-white font-semibold transition-all hover:scale-[1.02]"
                          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                        >
                          <ZoomIn className="w-4 h-4 mr-2" />
                          Visualiser
                        </Button>
                        <Button 
                          onClick={() => handleDownload(diagram.title)}
                          variant="outline"
                          className="rounded-xl border-white/20 text-white hover:bg-white/10"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diagram Preview Modal */}
      <Dialog open={!!selectedDiagram} onOpenChange={() => setSelectedDiagram(null)}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] border-0"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            boxShadow: `0 25px 100px -20px ${primaryColor}40`
          }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-white">
              <span className="text-xl font-bold">{selectedDiagram?.title}</span>
              <Button 
                onClick={() => selectedDiagram && handleDownload(selectedDiagram.title)}
                className="rounded-xl text-white"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
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
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}10, ${accentColor}10)`,
                border: `1px solid ${primaryColor}20`
              }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: primaryColor }}>{selectedDiagram?.type}</p>
              <p className="text-sm text-slate-300">{selectedDiagram?.description}</p>
            </div>

            {/* Simulated diagram preview */}
            <div 
              className="rounded-2xl p-12 min-h-[400px] flex flex-col items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '2px dashed rgba(255,255,255,0.1)'
              }}
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)` }}
              >
                <Maximize2 className="w-10 h-10" style={{ color: primaryColor }} />
              </div>
              <p className="text-white font-semibold text-lg text-center mb-2">Aperçu du diagramme</p>
              <p className="text-sm text-slate-500 text-center max-w-md mb-8">
                Dans une vraie application, ce serait un visualiseur PDF ou une visionneuse d'image interactive
              </p>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="rounded-xl border-white/20 text-white hover:bg-white/10"
                >
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom +
                </Button>
                <Button 
                  className="rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
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