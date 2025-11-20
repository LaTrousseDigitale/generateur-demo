import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MODULES } from "@/types/questionnaire";
import { Sparkles } from "lucide-react";

interface Section5Props {
  data: any;
  onChange: (updates: any) => void;
  isModuleSelected: boolean;
}

export const Section5Modules = ({ data, onChange, isModuleSelected }: Section5Props) => {
  const toggleModule = (moduleId: string) => {
    const current = data.selectedModules || [];
    const updated = current.includes(moduleId)
      ? current.filter((m: string) => m !== moduleId)
      : [...current, moduleId];
    onChange({ selectedModules: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Modules Additionnels
        </h3>
        <p className="text-sm text-muted-foreground">
          {isModuleSelected
            ? "Sélectionnez les modules qui vous intéressent"
            : "Découvrez nos modules pour enrichir votre solution"}
        </p>
      </div>

      <div className="grid gap-3">
        {MODULES.map((module) => {
          const isSelected = (data.selectedModules || []).includes(module.id);

          return (
            <Card
              key={module.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/30"
              }`}
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={module.id}
                  checked={isSelected}
                  onCheckedChange={() => toggleModule(module.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor={module.id} className="font-semibold cursor-pointer mb-1 block">
                    {module.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Custom module */}
      <div className="space-y-2">
        <Label htmlFor="custom-module">Autre module personnalisé</Label>
        <Textarea
          id="custom-module"
          value={data.customModule || ""}
          onChange={(e) => onChange({ customModule: e.target.value })}
          placeholder="Décrivez un module spécifique dont vous avez besoin..."
          rows={3}
        />
      </div>
    </div>
  );
};
