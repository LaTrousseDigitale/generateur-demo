import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Globe, Lock, Grid } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Section2Props {
  data: any;
  onChange: (updates: any) => void;
}

const SOLUTION_OPTIONS = [
  {
    id: "website",
    label: "Site Web",
    description: "Site vitrine, e-commerce ou organisationnel",
    icon: Globe,
  },
  {
    id: "portal",
    label: "Portail",
    description: "Portail client, employés ou RH sécurisé",
    icon: Lock,
  },
  {
    id: "module",
    label: "Modules",
    description: "Fonctionnalités additionnelles et intégrations",
    icon: Grid,
  },
];

export const Section2SolutionType = ({ data, onChange }: Section2Props) => {
  const toggleSolution = (solutionId: string) => {
    const current = data.solutionTypes || [];
    const updated = current.includes(solutionId)
      ? current.filter((s: string) => s !== solutionId)
      : [...current, solutionId];
    onChange({ solutionTypes: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Type de Solution</h3>
        <p className="text-sm text-muted-foreground">
          Sélectionnez toutes les solutions qui vous intéressent
        </p>
      </div>

      <div className="grid gap-4">
        {SOLUTION_OPTIONS.map((solution) => {
          const Icon = solution.icon;
          const isSelected = (data.solutionTypes || []).includes(solution.id);

          return (
            <Card
              key={solution.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected ? "border-primary border-2 bg-primary/5" : "border-border hover:border-primary/50"
              }`}
              onClick={() => toggleSolution(solution.id)}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id={solution.id}
                  checked={isSelected}
                  onCheckedChange={() => toggleSolution(solution.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    <Label htmlFor={solution.id} className="font-semibold cursor-pointer">
                      {solution.label}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
