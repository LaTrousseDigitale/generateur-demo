import { useQuiz } from "../QuizContext";
import { Sparkles, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/types/questionnaire";

export const StepSummary = () => {
  const { state, reset } = useQuiz();
  const { data } = state;

  const industryLabel = INDUSTRIES.find((i) => i.value === data.industry)?.label || data.industry;

  return (
    <div className="space-y-8 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-secondary text-white shadow-glow animate-pulse-glow">
        <Sparkles className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl font-bold">Votre démo est prête!</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Nous avons créé une démonstration personnalisée basée sur vos réponses.
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-6 max-w-lg mx-auto text-left space-y-4">
        <h3 className="font-semibold text-lg">Récapitulatif</h3>
        <div className="space-y-2 text-sm">
          {data.companyName && (
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Entreprise: <strong>{data.companyName}</strong></span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Industrie: <strong>{industryLabel}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>Solutions: <strong>{(data.solutionTypes || []).join(", ")}</strong></span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" className="gap-2 px-8 bg-gradient-to-r from-primary to-accent">
          <ExternalLink className="w-5 h-5" />
          Voir la démo complète
        </Button>
        <Button variant="outline" onClick={reset}>
          Recommencer
        </Button>
      </div>
    </div>
  );
};
