import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ZoomIn, Maximize2, Settings, Zap, Disc, Battery } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsDiagramsViewerProps {
  primaryColor?: string;
  accentColor?: string;
  theme?: "moderne" | "rustique" | "futuriste";
}

export const PartsDiagramsViewer = ({ 
  primaryColor = "#dc2626", 
  accentColor = "#f97316",
  theme = "moderne"
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

  // Theme styles
  const getThemeStyles = () => {
    switch(theme) {
      case "futuriste":
        return {
          card: "bg-white/10 backdrop-blur-xl border border-white/20 hover:-translate-y-1",
          iconBg: "",
          title: "text-white",
          subtitle: "text-slate-300",
          text: "text-slate-400",
          meta: "text-slate-500",
          badge: "text-white",
          buttonPrimary: "text-white",
          buttonSecondary: "bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20",
          dialogBg: "bg-slate-900 border border-white/20",
          dialogTitle: "text-white",
          infoBg: "",
          previewBg: "bg-white/5 border-2 border-dashed border-white/20",
        };
      case "rustique":
        return {
          card: "bg-stone-800/80 border border-amber-900/30 backdrop-blur-sm hover:border-amber-700/40 hover:-translate-y-1",
          iconBg: "bg-amber-900/30",
          title: "text-amber-50",
          subtitle: "text-amber-400",
          text: "text-stone-400",
          meta: "text-stone-500",
          badge: "bg-amber-700 text-white",
          buttonPrimary: "bg-amber-700 hover:bg-amber-600 text-white",
          buttonSecondary: "bg-stone-700/50 border border-amber-900/30 text-stone-300 hover:bg-stone-600/50",
          dialogBg: "bg-stone-900 border border-amber-900/30",
          dialogTitle: "text-amber-50",
          infoBg: "bg-amber-900/20 border border-amber-800/30",
          previewBg: "bg-stone-800/50 border-2 border-dashed border-amber-900/30",
        };
      default: // moderne
        return {
          card: "bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1",
          iconBg: "",
          title: "text-slate-900",
          subtitle: "",
          text: "text-slate-500",
          meta: "text-slate-400",
          badge: "text-white",
          buttonPrimary: "text-white",
          buttonSecondary: "border-slate-200 text-slate-600 hover:bg-slate-50",
          dialogBg: "bg-white border border-slate-200",
          dialogTitle: "text-slate-900",
          infoBg: "",
          previewBg: "bg-slate-50 border-2 border-dashed border-slate-200",
        };
    }
  };

  const styles = getThemeStyles();

  // Dynamic styles based on primaryColor for futuriste/moderne
  const getCardShadow = () => {
    if (theme === 'futuriste') return { boxShadow: `0 0 30px ${primaryColor}25` };
    return {};
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {diagrams.map((diagram) => {
          const IconComponent = diagram.icon;
          return (
            <Card 
              key={diagram.id} 
              className={`${styles.card} rounded-xl p-6 transition-all duration-300`}
              style={getCardShadow()}
            >
              <div className="flex items-start gap-5">
                <div 
                  className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${styles.iconBg}`}
                  style={{ backgroundColor: theme !== 'rustique' ? `${primaryColor}15` : undefined }}
                >
                  <IconComponent className="w-7 h-7" style={{ color: theme !== 'rustique' ? primaryColor : '#fbbf24' }} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className={`font-bold text-lg ${styles.title}`}>{diagram.title}</h4>
                    <Badge 
                      className={`flex-shrink-0 border-0 ${styles.badge}`}
                      style={{ backgroundColor: theme !== 'rustique' ? primaryColor : undefined }}
                    >
                      {diagram.format}
                    </Badge>
                  </div>
                  
                  <p className={`text-sm font-medium mb-2 ${styles.subtitle}`} style={{ color: theme !== 'rustique' ? primaryColor : undefined }}>{diagram.type}</p>
                  <p className={`text-sm mb-2 line-clamp-2 ${styles.text}`}>{diagram.description}</p>
                  <p className={`text-xs mb-4 ${styles.meta}`}>{diagram.pages}</p>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleViewDiagram(diagram)}
                      size="sm"
                      className={`flex-1 rounded-lg font-semibold ${styles.buttonPrimary}`}
                      style={{ 
                        backgroundColor: theme !== 'rustique' ? primaryColor : undefined,
                        boxShadow: theme === 'futuriste' ? `0 0 15px ${primaryColor}40` : undefined
                      }}
                    >
                      <ZoomIn className="w-4 h-4 mr-2" />
                      Visualiser
                    </Button>
                    <Button 
                      onClick={() => handleDownload(diagram.title)}
                      size="sm"
                      variant="outline"
                      className={`rounded-lg ${styles.buttonSecondary}`}
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

      <Dialog open={!!selectedDiagram} onOpenChange={() => setSelectedDiagram(null)}>
        <DialogContent className={`max-w-4xl max-h-[90vh] ${styles.dialogBg}`}>
          <DialogHeader>
            <DialogTitle className={`flex items-center justify-between ${styles.dialogTitle}`}>
              <span className="text-xl font-bold">{selectedDiagram?.title}</span>
              <Button 
                onClick={() => selectedDiagram && handleDownload(selectedDiagram.title)}
                className={`rounded-lg ${styles.buttonPrimary}`}
                style={{ 
                  backgroundColor: theme !== 'rustique' ? primaryColor : undefined,
                  boxShadow: theme === 'futuriste' ? `0 0 15px ${primaryColor}40` : undefined
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div 
              className={`rounded-xl p-5 ${styles.infoBg}`} 
              style={{ 
                backgroundColor: theme !== 'rustique' ? `${primaryColor}10` : undefined,
                borderColor: theme === 'futuriste' ? `${primaryColor}30` : undefined
              }}
            >
              <p className={`text-sm font-medium mb-1 ${styles.subtitle}`} style={{ color: theme !== 'rustique' ? primaryColor : undefined }}>{selectedDiagram?.type}</p>
              <p className={`text-sm ${styles.text}`}>{selectedDiagram?.description}</p>
            </div>

            <div className={`rounded-xl p-12 min-h-[400px] flex flex-col items-center justify-center ${styles.previewBg}`}>
              <div 
                className={`w-20 h-20 rounded-xl flex items-center justify-center mb-6 ${styles.iconBg}`}
                style={{ backgroundColor: theme !== 'rustique' ? `${primaryColor}15` : undefined }}
              >
                <Maximize2 className="w-10 h-10" style={{ color: theme !== 'rustique' ? primaryColor : '#fbbf24' }} />
              </div>
              <p className={`font-semibold text-lg text-center mb-2 ${styles.title}`}>Aperçu du diagramme</p>
              <p className={`text-sm text-center max-w-md mb-8 ${styles.text}`}>
                Dans une vraie application, ce serait un visualiseur PDF ou une visionneuse d'image interactive
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className={`rounded-lg ${styles.buttonSecondary}`}>
                  <ZoomIn className="w-4 h-4 mr-2" />
                  Zoom +
                </Button>
                <Button 
                  className={`rounded-lg ${styles.buttonPrimary}`}
                  style={{ 
                    backgroundColor: theme !== 'rustique' ? primaryColor : undefined,
                    boxShadow: theme === 'futuriste' ? `0 0 15px ${primaryColor}40` : undefined
                  }}
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
