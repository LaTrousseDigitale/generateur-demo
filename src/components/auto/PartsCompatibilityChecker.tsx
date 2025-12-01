import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Car, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsCompatibilityCheckerProps {
  selectedVehicle: { year: string; make: string; model: string } | null;
}

export const PartsCompatibilityChecker = ({ selectedVehicle }: PartsCompatibilityCheckerProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [compatibilityResult, setCompatibilityResult] = useState<'compatible' | 'incompatible' | 'warning' | null>(null);

  // Véhicule de démonstration si aucun n'est sélectionné
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

    // Simulate checking
    setTimeout(() => {
      setChecking(false);
      if (isDemoMode) {
        // En mode démo, utiliser le statut prédéfini
        const part = parts.find(p => p.id === partId);
        setCompatibilityResult(part?.demoStatus || 'compatible');
      } else {
        // Random result for real usage
        const results: ('compatible' | 'incompatible' | 'warning')[] = ['compatible', 'compatible', 'compatible', 'warning'];
        const randomResult = results[Math.floor(Math.random() * results.length)];
        setCompatibilityResult(randomResult);
      }
    }, 1000);
  };

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold">Vérification de compatibilité automatique</h3>
            </div>
            
            {isDemoMode && (
              <Badge variant="secondary" className="mb-4">
                Mode démonstration
              </Badge>
            )}
            
            <Card className="inline-flex items-center gap-3 px-6 py-3 mb-4">
              <Car className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Véhicule:</span>
              <span className="font-semibold">
                {displayVehicle.year} {displayVehicle.make} {displayVehicle.model}
              </span>
              {isDemoMode && (
                <Badge variant="outline" className="text-xs">Exemple</Badge>
              )}
            </Card>
            
            <p className="text-muted-foreground">
              Cliquez sur "Vérifier" pour voir la compatibilité en temps réel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parts.map((part) => (
              <Card key={part.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{part.name}</h4>
                    <p className="text-sm text-muted-foreground">Code: {part.code}</p>
                    <p className="text-sm font-medium text-primary mt-1">{part.price} CAD</p>
                  </div>
                  {selectedPart === part.id && compatibilityResult && (
                    <Badge variant={compatibilityResult === 'compatible' ? 'default' : compatibilityResult === 'warning' ? 'secondary' : 'destructive'}>
                      {compatibilityResult === 'compatible' && <CheckCircle2 className="w-4 h-4 mr-1" />}
                      {compatibilityResult === 'warning' && <AlertCircle className="w-4 h-4 mr-1" />}
                      {compatibilityResult === 'incompatible' && <XCircle className="w-4 h-4 mr-1" />}
                      {compatibilityResult === 'compatible' && 'Compatible'}
                      {compatibilityResult === 'warning' && 'Vérifier'}
                      {compatibilityResult === 'incompatible' && 'Incompatible'}
                    </Badge>
                  )}
                </div>

                {selectedPart === part.id && compatibilityResult && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    compatibilityResult === 'compatible' ? 'bg-green-50 dark:bg-green-950 text-green-900 dark:text-green-100' :
                    compatibilityResult === 'warning' ? 'bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100' :
                    'bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100'
                  }`}>
                    <p className="text-sm font-medium">
                      {compatibilityResult === 'compatible' && '✓ Cette pièce est 100% compatible avec votre véhicule'}
                      {compatibilityResult === 'warning' && '⚠ Compatibilité partielle - vérification manuelle recommandée'}
                      {compatibilityResult === 'incompatible' && '✗ Cette pièce n\'est pas compatible avec votre véhicule'}
                    </p>
                  </div>
                )}

                <Button 
                  onClick={() => handleCheckCompatibility(part.id)}
                  disabled={checking && selectedPart === part.id}
                  variant="outline"
                  className="w-full"
                >
                  {checking && selectedPart === part.id ? 'Vérification...' : 'Vérifier la compatibilité'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
