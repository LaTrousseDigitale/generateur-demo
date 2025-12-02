import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface Section4Props {
  data: any;
  onChange: (updates: any) => void;
}

export const Section4Portal = ({ data, onChange }: Section4Props) => {
  const toggleFeature = (field: string, feature: string) => {
    const current = data[field] || [];
    const updated = current.includes(feature)
      ? current.filter((f: string) => f !== feature)
      : [...current, feature];
    onChange({ [field]: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Configuration du portail
        </h3>
        <p className="text-sm text-muted-foreground">Définissez le type et les fonctionnalités de votre portail</p>
      </div>

      {/* Type de portail */}
      <div className="space-y-2">
        <Label>Type de portail *</Label>
        <RadioGroup value={data.portalType || ""} onValueChange={(value) => onChange({ portalType: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="client" id="portal-client" />
            <label htmlFor="portal-client" className="text-sm cursor-pointer">
              Portail client - Espace client sécurisé
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employes" id="portal-employes" />
            <label htmlFor="portal-employes" className="text-sm cursor-pointer">
              Portail employés - Gestion d'équipe et projets
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rh" id="portal-rh" />
            <label htmlFor="portal-rh" className="text-sm cursor-pointer">
              Portail RH - Ressources humaines
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mixte" id="portal-mixte" />
            <label htmlFor="portal-mixte" className="text-sm cursor-pointer">
              Portail mixte - Combinaison de plusieurs types
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Nombre d'utilisateurs */}
      <div className="space-y-2">
        <Label>Nombre d'utilisateurs prévus</Label>
        <RadioGroup value={data.portalUsers || ""} onValueChange={(value) => onChange({ portalUsers: value })}>
          {["1-5 utilisateurs", "6-10 utilisateurs", "11-20 utilisateurs", "21-50 utilisateurs", "50+ utilisateurs"].map(
            (range) => (
              <div key={range} className="flex items-center space-x-2">
                <RadioGroupItem value={range} id={`users-${range}`} />
                <label htmlFor={`users-${range}`} className="text-sm cursor-pointer">
                  {range}
                </label>
              </div>
            )
          )}
        </RadioGroup>
      </div>

      {/* Rôles utilisateurs */}
      <div className="space-y-2">
        <Label>Nombre de rôles utilisateurs différents</Label>
        <RadioGroup value={data.portalRoles || ""} onValueChange={(value) => onChange({ portalRoles: value })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-role" id="1-role" />
            <label htmlFor="1-role" className="text-sm cursor-pointer">
              1 rôle (tous les utilisateurs ont les mêmes droits)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2-roles" id="2-roles" />
            <label htmlFor="2-roles" className="text-sm cursor-pointer">
              2 rôles (ex: admin et utilisateur)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3-plus-roles" id="3-plus-roles" />
            <label htmlFor="3-plus-roles" className="text-sm cursor-pointer">
              3+ rôles (hiérarchie complexe)
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Fonctionnalités selon le type */}
      {(data.portalType === "client" || data.portalType === "mixte") && (
        <Card className="p-4 space-y-3 bg-primary/5 border-primary/20">
          <Label className="font-semibold">Fonctionnalités - Portail client</Label>
          {["Consultation de documents", "Signatures électroniques", "Factures et paiements", "Historique des transactions", "Formulaires personnalisés"].map(
            (feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`client-${feature}`}
                  checked={(data.portalClientFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleFeature("portalClientFeatures", feature)}
                />
                <label htmlFor={`client-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            )
          )}
        </Card>
      )}

      {(data.portalType === "employes" || data.portalType === "mixte") && (
        <Card className="p-4 space-y-3 bg-secondary/5 border-secondary/20">
          <Label className="font-semibold">Fonctionnalités - Portail employés</Label>
          {["Feuilles de temps", "Gestion de projets", "Documentation interne", "Onboarding automatisé", "Chat d'équipe"].map(
            (feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`employee-${feature}`}
                  checked={(data.portalEmployeeFeatures || []).includes(feature)}
                  onCheckedChange={() => toggleFeature("portalEmployeeFeatures", feature)}
                />
                <label htmlFor={`employee-${feature}`} className="text-sm cursor-pointer">
                  {feature}
                </label>
              </div>
            )
          )}
        </Card>
      )}

      {(data.portalType === "rh" || data.portalType === "mixte") && (
        <Card className="p-4 space-y-3 bg-accent/5 border-accent/20">
          <Label className="font-semibold">Fonctionnalités - Portail RH</Label>
          {[
            "Dossiers employés",
            "Gestion des congés",
            "Formations et certifications",
            "Calendriers d'équipe",
            "Recrutement et candidatures",
            "Évaluations de performance",
          ].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`hr-${feature}`}
                checked={(data.portalHRFeatures || []).includes(feature)}
                onCheckedChange={() => toggleFeature("portalHRFeatures", feature)}
              />
              <label htmlFor={`hr-${feature}`} className="text-sm cursor-pointer">
                {feature}
              </label>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};
