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
          iconBg: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20",
          title: "text-white",
          subtitle: "text-slate-400",
          price: "text-indigo-400",
          badge: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
          partCard: "bg-white/10 backdrop-blur-xl border border-white/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
          buttonDefault: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white",
          buttonOutline: "bg-white/10 border border-white/20 text-indigo-300 hover:bg-white/20",
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
          iconBg: `bg-[${primaryColor}15]`,
          title: "text-slate-900",
          subtitle: "text-slate-500",
          price: `text-[${primaryColor}]`,
          badge: "bg-amber-100 text-amber-700 border border-amber-200",
          partCard: "bg-white border border-slate-200 hover:shadow-lg",
          buttonDefault: `bg-[${primaryColor}] text-white`,
          buttonOutline: `border-[${primaryColor}] text-[${primaryColor}] bg-white`,
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
      <Card className={`${styles.vehicleCard} rounded-xl p-6`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg}`}
              style={{ backgroundColor: theme === 'moderne' ? `${primaryColor}15` : undefined }}
            >
              <Car className="w-6 h-6" style={{ color: theme === 'moderne' ? primaryColor : theme === 'futuriste' ? '#818cf8' : '#fbbf24' }} />
            </div>
            <div>
              <p className={`text-sm ${styles.subtitle}`}>Véhicule sélectionné</p>
              <p className={`font-bold text-xl ${styles.title}`}>
                {displayVehicle.year} {displayVehicle.make} {displayVehicle.model}
              </p>
            </div>
          </div>
          {isDemoMode && (
            <Badge className={styles.badge}>
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

              <p className={`text-lg font-bold mb-4 ${styles.price}`} style={{ color: theme === 'moderne' ? primaryColor : undefined }}>
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
                  backgroundColor: !hasResult && theme === 'moderne' ? primaryColor : undefined,
                  borderColor: hasResult && theme === 'moderne' ? primaryColor : undefined,
                  color: hasResult && theme === 'moderne' ? primaryColor : undefined,
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
