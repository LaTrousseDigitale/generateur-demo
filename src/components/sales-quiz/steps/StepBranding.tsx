import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const StepBranding = () => {
  const { state, updateData } = useQuiz();
  const { companyName, primaryColor, logo } = state.data;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-accent text-white shadow-glow">
          <Palette className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Personnalisez votre démo</h2>
        <p className="text-muted-foreground">Ces informations rendront votre démo plus réaliste</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company">Nom de votre entreprise</Label>
          <Input
            id="company"
            value={companyName || ""}
            onChange={(e) => updateData({ companyName: e.target.value })}
            placeholder="Ex: Solutions Innovantes Inc."
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label>Couleur principale</Label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor || "#1c61fe"}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer"
            />
            <Input
              value={primaryColor || "#1c61fe"}
              onChange={(e) => updateData({ primaryColor: e.target.value })}
              className="flex-1 h-12 font-mono"
            />
          </div>
        </div>
      </div>

      <QuizNavigation canContinue={true} />
    </div>
  );
};
