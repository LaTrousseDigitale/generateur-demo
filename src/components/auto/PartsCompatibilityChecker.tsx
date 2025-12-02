import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Car, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsCompatibilityCheckerProps {
  selectedVehicle: { year: string; make: string; model: string } | null;
  primaryColor?: string;
  accentColor?: string;
}

export const PartsCompatibilityChecker = ({ 
  selectedVehicle, 
  primaryColor = "#dc2626", 
  accentColor = "#f97316" 
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

  const getResultStyles = (result: 'compatible' | 'incompatible' | 'warning') => {
    switch (result) {
      case 'compatible':
        return { bg: '#dcfce7', border: '#86efac', text: '#16a34a', icon: CheckCircle2 };
      case 'warning':
        return { bg: '#fef3c7', border: '#fcd34d', text: '#d97706', icon: AlertCircle };
      case 'incompatible':
        return { bg: '#fee2e2', border: '#fca5a5', text: '#dc2626', icon: XCircle };
    }
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Display */}
      <Card className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor}15` }}
            >
              <Car className="w-6 h-6" style={{ color: primaryColor }} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Véhicule sélectionné</p>
              <p className="font-bold text-xl text-slate-900">
                {displayVehicle.year} {displayVehicle.make} {displayVehicle.model}
              </p>
            </div>
          </div>
          {isDemoMode && (
            <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
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
          const resultStyles = hasResult ? getResultStyles(compatibilityResult!) : null;
          const ResultIcon = resultStyles?.icon;
          
          return (
            <Card 
              key={part.id} 
              className="bg-white border rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              style={{
                borderColor: hasResult ? resultStyles?.border : '#e2e8f0',
                backgroundColor: hasResult ? resultStyles?.bg : 'white'
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg text-slate-900">{part.name}</h4>
                  <p className="text-sm text-slate-500">Code: {part.code}</p>
                </div>
                
                {hasResult && ResultIcon && (
                  <Badge 
                    className="text-white border-0"
                    style={{ backgroundColor: resultStyles?.text }}
                  >
                    <ResultIcon className="w-4 h-4 mr-1" />
                    {compatibilityResult === 'compatible' && 'Compatible'}
                    {compatibilityResult === 'warning' && 'Vérifier'}
                    {compatibilityResult === 'incompatible' && 'Incompatible'}
                  </Badge>
                )}
              </div>

              <p className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
                {part.price} CAD
              </p>

              {hasResult && (
                <div 
                  className="mb-4 p-3 rounded-lg border"
                  style={{ 
                    backgroundColor: 'white',
                    borderColor: resultStyles?.border
                  }}
                >
                  <p className="text-sm font-medium" style={{ color: resultStyles?.text }}>
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
                className="w-full rounded-lg font-semibold"
                style={{ 
                  backgroundColor: hasResult ? 'white' : primaryColor,
                  color: hasResult ? primaryColor : 'white',
                  borderColor: hasResult ? primaryColor : undefined
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
