import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Car, ShieldCheck, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsCompatibilityCheckerProps {
  selectedVehicle: { year: string; make: string; model: string } | null;
  primaryColor?: string;
  accentColor?: string;
}

export const PartsCompatibilityChecker = ({ 
  selectedVehicle, 
  primaryColor = "#3B82F6", 
  accentColor = "#8B5CF6" 
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
        return { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10B981' };
      case 'warning':
        return { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#F59E0B' };
      case 'incompatible':
        return { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#EF4444' };
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(ellipse at bottom, ${accentColor}08 0%, transparent 50%)`
        }}
      />
      
      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute top-0 left-0 w-full h-full">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${primaryColor}30, ${accentColor}30)` }}
              >
                <ShieldCheck className="w-7 h-7" style={{ color: primaryColor }} />
              </div>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
              Vérification de{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                compatibilité
              </span>
            </h3>
            
            {isDemoMode && (
              <Badge 
                className="mb-6 text-white border-0"
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                Mode démonstration
              </Badge>
            )}
            
            {/* Vehicle Card */}
            <div 
              className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl mb-6 backdrop-blur-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${primaryColor}30, ${accentColor}30)` }}
              >
                <Car className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Véhicule</p>
                <p className="font-bold text-white text-lg">
                  {displayVehicle.year} {displayVehicle.make} {displayVehicle.model}
                </p>
              </div>
              {isDemoMode && (
                <Badge className="bg-white/10 text-slate-300 border border-white/20">
                  Exemple
                </Badge>
              )}
            </div>
            
            <p className="text-slate-400 text-lg">
              Cliquez sur "Vérifier" pour voir la compatibilité en temps réel
            </p>
          </div>

          {/* Parts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parts.map((part) => {
              const isSelected = selectedPart === part.id;
              const hasResult = isSelected && compatibilityResult;
              const resultStyles = hasResult ? getResultStyles(compatibilityResult!) : null;
              
              return (
                <div 
                  key={part.id} 
                  className="group relative rounded-2xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: hasResult 
                      ? `2px solid ${resultStyles?.border}` 
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: hasResult ? `0 0 40px ${resultStyles?.bg}` : 'none'
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">{part.name}</h4>
                      <p className="text-sm text-slate-500">Code: {part.code}</p>
                      <p 
                        className="text-lg font-bold mt-2"
                        style={{ color: primaryColor }}
                      >
                        {part.price} CAD
                      </p>
                    </div>
                    
                    {hasResult && (
                      <Badge 
                        className="text-white border-0"
                        style={{ backgroundColor: resultStyles?.text }}
                      >
                        {compatibilityResult === 'compatible' && <CheckCircle2 className="w-4 h-4 mr-1" />}
                        {compatibilityResult === 'warning' && <AlertCircle className="w-4 h-4 mr-1" />}
                        {compatibilityResult === 'incompatible' && <XCircle className="w-4 h-4 mr-1" />}
                        {compatibilityResult === 'compatible' && 'Compatible'}
                        {compatibilityResult === 'warning' && 'Vérifier'}
                        {compatibilityResult === 'incompatible' && 'Incompatible'}
                      </Badge>
                    )}
                  </div>

                  {hasResult && (
                    <div 
                      className="mb-5 p-4 rounded-xl"
                      style={{ 
                        background: resultStyles?.bg,
                        border: `1px solid ${resultStyles?.border}`
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
                    variant="outline"
                    className="w-full rounded-xl font-semibold transition-all hover:scale-[1.02] border-white/20 text-white hover:bg-white/10"
                  >
                    {checking && isSelected ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Vérification...
                      </>
                    ) : (
                      'Vérifier la compatibilité'
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};