import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Server } from "lucide-react";
interface Section7Props {
  data: any;
  onChange: (updates: any) => void;
}
export const Section7Domain = ({
  data,
  onChange
}: Section7Props) => {
  return <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Server className="w-5 h-5 text-primary" />
          Domaine & Hébergement
        </h3>
        <p className="text-sm text-muted-foreground">Configuration de votre nom de domaine et hébergement</p>
      </div>

      {/* Type de domaine */}
      <div className="space-y-3">
        <Label>Type de domaine *</Label>
        <RadioGroup value={data.domainType || ""} onValueChange={value => onChange({
        domainType: value
      })}>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sous-domaine" id="sous-domaine" />
              <div className="flex-1">
                <label htmlFor="sous-domaine" className="text-sm cursor-pointer font-semibold block">
                  Sous-domaine (votre-entreprise.latroussedigitale.ca)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Gratuit, configuration instantanée, idéal pour débuter rapidement
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="domaine-propre" id="domaine-propre" />
              <div className="flex-1">
                <label htmlFor="domaine-propre" className="text-sm cursor-pointer font-semibold block">
                  Domaine personnalisé (www.votre-entreprise.com)
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Image professionnelle, personnalisation complète, meilleur pour le SEO
                </p>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      {/* Préférence d'hébergement */}
      <div className="space-y-3">
        <Label>Préférence d'hébergement *</Label>
        <RadioGroup value={data.hostingPreference || ""} onValueChange={value => onChange({
        hostingPreference: value
      })}>
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="lovable" id="hosting-lovable" />
              <div className="flex-1">
                <label htmlFor="hosting-lovable" className="text-sm cursor-pointer font-semibold block">
                  Hébergement par Vision Express Digital
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Support inclus, mises à jour automatiques, sécurité maximale
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="client" id="hosting-client" />
              <div className="flex-1">
                <label htmlFor="hosting-client" className="text-sm cursor-pointer font-semibold block">
                  Hébergement chez votre fournisseur
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Vous gérez l'hébergement, nous fournissons le code source
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="indecis" id="hosting-indecis" />
              <div className="flex-1">
                <label htmlFor="hosting-indecis" className="text-sm cursor-pointer font-semibold block">
                  Indécis - Besoin de conseils
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Nous vous aiderons à choisir la meilleure option pour vos besoins
                </p>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>
    </div>;
};