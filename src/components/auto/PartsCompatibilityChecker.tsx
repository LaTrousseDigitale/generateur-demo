import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Car, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsCompatibilityCheckerProps {
  selectedVehicle: { year: string; make: string; model: string } | null;
  primaryColor?: string;
  accentColor?: string;
  theme?: "moderne" | "rustique" | "futuriste";
}

export const PartsCompatibilityChecker = ({ 
  selectedVehicle, 
  primaryColor = "#dc2626", 
  accentColor = "#f97316",
  theme = "moderne"
}: PartsCompatibilityCheckerProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [compatibilityResult, setCompatibilityResult] = useState<'compatible' | 'incompatible' | 'warning' | null>(null);

  const demoVehicle = { year: "2022", make: "Honda", model: "Civic" };
  const displayVehicle = selectedVehicle || demoVehicle;
  const isDemoMode = !selectedVehicle;

  const parts = [
    { id: "brake-kit", name: "Kit de freinage avant", code: "BK-2024-001", price: "249,99 $", demoStatus: "compatible" as const },
    { id: "air-filter", name: "Filtre à air haute performance", code: "AF-2024-055", price: "45,99 $", demoStatus: "compatible" as const },
    { id: "shock-absorber", name: "Amortisseurs sport", code: "SA-2024-122", price: "399,99 $", demoStatus: "warning" as const },
    { id: "battery", name: "Batterie haute capacité", code: "BT-2024-088", price: "159,99 $", demoStatus: "compatible" as const },
  ];

  const handleCheckCompatibility = (partId: string) => {
    setSelectedPart(partId);
    setChecking(true);
    setCompatibilityResult(null);

    setTimeout(() => {
      setChecking(false);
      if (isDemoMode) {
        const part = parts.find(p => p.id === partId);
        setCompatibilityResult(part?.demoStatus || 'compatible');
      } else {
        const results: ('compatible' | 'incompatible' | 'warning')[] = ['compatible', 'compatible', 'compatible', 'warning'];
        const randomResult = results[Math.floor(Math.random() * results.length)];
        setCompatibilityResult(randomResult);
      }
    }, 1000);
  };

  const getResultColors = (result: 'compatible' | 'incompatible' | 'warning') => {
    switch (result) {
      case 'compatible':
        return { bg: theme === 'moderne' ? '#dcfce7' : 'rgba(16, 185, 129, 0.2)', border: '#86efac', text: '#16a34a' };
      case 'warning':
        return { bg: theme === 'moderne' ? '#fef3c7' : 'rgba(245, 158, 11, 0.2)', border: '#fcd34d', text: '#d97706' };
      case 'incompatible':
        return { bg: theme === 'moderne' ? '#fee2e2' : 'rgba(239, 68, 68, 0.2)', border: '#fca5a5', text: '#dc2626' };
    }
  };

  // Theme styles
  const getThemeStyles = () => {
    switch(theme) {
      case "futuriste":
        return {
          vehicleCard: "bg-white/10 backdrop-blur-xl border border-white/20",
          iconBg: "",
          title: "text-white",
          subtitle: "text-slate-400",
          price: "",
          badge: "text-amber-300 border border-amber-500/30",
          partCard: "bg-white/10 backdrop-blur-xl border border-white/20 hover:-translate-y-1",
          buttonDefault: "text-white",
          buttonOutline: "bg-white/10 border border-white/20 text-slate-300 hover:bg-white/20",
        };
      case "rustique":
        return {
          vehicleCard: "bg-stone-800/80 border border-amber-900/30",
          iconBg: "bg-amber-900/30",
          title: "text-amber-50",
          subtitle: "text-stone-400",
          price: "text-amber-400",
          badge: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
          partCard: "bg-stone-800/80 border border-amber-900/30 hover:border-amber-700/40",
          buttonDefault: "bg-amber-700 hover:bg-amber-600 text-white",
          buttonOutline: "bg-stone-700/50 border border-amber-900/30 text-amber-200 hover:bg-stone-600/50",
        };
      default:
        return {
          vehicleCard: "bg-white border border-slate-200",
          iconBg: "",
          title: "text-slate-900",
          subtitle: "text-slate-500",
          price: "",
          badge: "bg-amber-100 text-amber-700 border border-amber-200",
          partCard: "bg-white border border-slate-200 hover:shadow-lg",
          buttonDefault: "text-white",
          buttonOutline: "",
        };
    }
  };

  const styles = getThemeStyles();

  const ResultIcon = {
    compatible: CheckCircle2,
    warning: AlertCircle,
    incompatible: XCircle,
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Display */}
      <Card 
        className={`${styles.vehicleCard} rounded-xl p-6`}
        style={{ boxShadow: theme === 'futuriste' ? `0 0 30px ${primaryColor}20` : undefined }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg}`}
              style={{ backgroundColor: theme !== 'rustique' ? `${primaryColor}20` : undefined }}
            >
              <Car className="w-6 h-6" style={{ color: theme !== 'rustique' ? primaryColor : '#fbbf24' }} />
            </div>
            <div>
              <p className={`text-sm ${styles.subtitle}`}>Véhicule sélectionné</p>
              <p className={`font-bold text-xl ${styles.title}`}>
                {displayVehicle.year} {displayVehicle.make} {displayVehicle.model}
              </p>
            </div>
          </div>
          {isDemoMode && (
            <Badge 
              className={styles.badge}
              style={{ backgroundColor: theme === 'futuriste' ? `${primaryColor}20` : undefined }}
            >
              Mode démonstration
            </Badge>
          )}
        </div>
      </Card>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parts.map((part) => {
          const isSelected = selectedPart === part.id;
          const hasResult = isSelected && compatibilityResult;
          const resultColors = hasResult ? getResultColors(compatibilityResult!) : null;
          const Icon = hasResult ? ResultIcon[compatibilityResult!] : null;
          
          return (
            <Card 
              key={part.id} 
              className={`${styles.partCard} rounded-xl p-5 transition-all duration-300`}
              style={{
                borderColor: hasResult ? resultColors?.border : undefined,
                backgroundColor: hasResult && theme === 'moderne' ? resultColors?.bg : undefined,
                boxShadow: theme === 'futuriste' && !hasResult ? `0 0 20px ${primaryColor}15` : undefined,
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className={`font-bold text-lg ${styles.title}`}>{part.name}</h4>
                  <p className={`text-sm ${styles.subtitle}`}>Code: {part.code}</p>
                </div>
                
                {hasResult && Icon && (
                  <Badge 
                    className="text-white border-0"
                    style={{ backgroundColor: resultColors?.text }}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {compatibilityResult === 'compatible' && 'Compatible'}
                    {compatibilityResult === 'warning' && 'Vérifier'}
                    {compatibilityResult === 'incompatible' && 'Incompatible'}
                  </Badge>
                )}
              </div>

              <p className={`text-lg font-bold mb-4 ${styles.price}`} style={{ color: theme !== 'rustique' ? primaryColor : undefined }}>
                {part.price} CAD
              </p>

              {hasResult && (
                <div 
                  className="mb-4 p-3 rounded-lg"
                  style={{ 
                    backgroundColor: resultColors?.bg,
                    border: `1px solid ${resultColors?.border}`
                  }}
                >
                  <p className="text-sm font-medium" style={{ color: resultColors?.text }}>
                    {compatibilityResult === 'compatible' && '✓ Cette pièce est 100% compatible avec votre véhicule'}
                    {compatibilityResult === 'warning' && '⚠ Compatibilité partielle - vérification manuelle recommandée'}
                    {compatibilityResult === 'incompatible' && '✗ Cette pièce n\'est pas compatible avec votre véhicule'}
                  </p>
                </div>
              )}

              <Button 
                onClick={() => handleCheckCompatibility(part.id)}
                disabled={checking && isSelected}
                variant={hasResult ? "outline" : "default"}
                className={`w-full rounded-lg font-semibold ${hasResult ? styles.buttonOutline : styles.buttonDefault}`}
                style={{ 
                  backgroundColor: !hasResult && theme !== 'rustique' ? primaryColor : undefined,
                  borderColor: hasResult && theme !== 'rustique' ? primaryColor : undefined,
                  color: hasResult && theme !== 'rustique' ? primaryColor : undefined,
                  boxShadow: !hasResult && theme === 'futuriste' ? `0 0 15px ${primaryColor}40` : undefined,
                }}
              >
                {checking && isSelected ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Vérification...
                  </>
                ) : hasResult ? (
                  'Vérifier à nouveau'
                ) : (
                  'Vérifier la compatibilité'
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
