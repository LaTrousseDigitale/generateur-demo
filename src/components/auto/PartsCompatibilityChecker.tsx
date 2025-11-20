import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PartsCompatibilityCheckerProps {
  selectedVehicle: { year: string; make: string; model: string } | null;
}

export const PartsCompatibilityChecker = ({ selectedVehicle }: PartsCompatibilityCheckerProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [compatibilityResult, setCompatibilityResult] = useState<'compatible' | 'incompatible' | 'warning' | null>(null);

  const parts = [
    { id: "brake-kit", name: "Kit de freinage avant", code: "BK-2024-001" },
    { id: "air-filter", name: "Filtre à air haute performance", code: "AF-2024-055" },
    { id: "shock-absorber", name: "Amortisseurs sport", code: "SA-2024-122" },
    { id: "battery", name: "Batterie haute capacité", code: "BT-2024-088" },
  ];

  const handleCheckCompatibility = (partId: string) => {
    setSelectedPart(partId);
    setChecking(true);
    setCompatibilityResult(null);

    // Simulate checking
    setTimeout(() => {
      setChecking(false);
      // Random result for demo purposes
      const results: ('compatible' | 'incompatible' | 'warning')[] = ['compatible', 'compatible', 'compatible', 'warning'];
      const randomResult = results[Math.floor(Math.random() * results.length)];
      setCompatibilityResult(randomResult);
    }, 1000);
  };

  if (!selectedVehicle) {
    return (
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <Card className="p-8 text-center max-w-2xl mx-auto">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Vérification de compatibilité</h3>
            <p className="text-muted-foreground">
              Sélectionnez d'abord votre véhicule ci-dessus pour vérifier la compatibilité des pièces
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Vérification de compatibilité automatique</h3>
            <p className="text-muted-foreground mb-4">
              Véhicule sélectionné: <span className="font-semibold text-foreground">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parts.map((part) => (
              <Card key={part.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{part.name}</h4>
                    <p className="text-sm text-muted-foreground">Code: {part.code}</p>
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
