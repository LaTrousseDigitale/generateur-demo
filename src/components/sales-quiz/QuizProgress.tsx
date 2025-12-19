import { cn } from "@/lib/utils";
import { useQuiz } from "./QuizContext";
import { Check, AlertCircle } from "lucide-react";

const STEP_LABELS = [
  "Bienvenue",
  "Industrie", 
  "Objectifs",
  "Solutions",
  "Détails",
  "Fonctionnalités",
  "Style",
  "Branding",
  "Contact",
  "Résumé",
];

// Define what makes each step "complete"
const getStepCompletionStatus = (stepIndex: number, data: any): boolean => {
  switch (stepIndex) {
    case 0: // Bienvenue - toujours complet
      return true;
    case 1: // Industrie - essentiel
      return !!data.industry;
    case 2: // Objectifs
      return (data.mainObjectives?.length || 0) > 0;
    case 3: // Solutions
      return (data.solutionTypes?.length || 0) > 0;
    case 4: // Détails
      return !!data.websiteType || !!data.portalType || (data.selectedModules?.length || 0) > 0;
    case 5: // Fonctionnalités
      return (data.features?.length || 0) > 0;
    case 6: // Style - essentiel
      return !!data.theme || !!data.portalStyle;
    case 7: // Branding
      return !!data.primaryColor;
    case 8: // Contact - essentiel
      return !!data.clientEmail && !!data.companyName;
    case 9: // Résumé
      return true;
    default:
      return false;
  }
};

export const QuizProgress = () => {
  const { state, goToStep } = useQuiz();
  const { step, totalSteps, data } = state;

  const progressPercent = ((step + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden mb-4">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
        {/* Glow effect on progress */}
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-50 blur-sm transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Step Indicators - Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {STEP_LABELS.slice(0, totalSteps).map((label, index) => {
          const isActive = index === step;
          const isComplete = getStepCompletionStatus(index, data);
          const isVisited = index <= step;

          return (
            <button
              key={index}
              onClick={() => goToStep(index)}
              className="flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    isActive && "bg-primary text-primary-foreground shadow-glow scale-110",
                    !isActive && isComplete && "bg-green-500 text-white",
                    !isActive && !isComplete && isVisited && "bg-amber-500 text-white",
                    !isActive && !isComplete && !isVisited && "bg-muted text-muted-foreground group-hover:bg-muted/80"
                  )}
                >
                  {isComplete && !isActive ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Incomplete indicator */}
                {!isComplete && !isActive && isVisited && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive && "text-primary",
                  !isActive && isComplete && "text-green-600",
                  !isActive && !isComplete && isVisited && "text-amber-600",
                  !isActive && !isComplete && !isVisited && "text-muted-foreground group-hover:text-foreground"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Label - Mobile */}
      <div className="md:hidden flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          Étape {step + 1} sur {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {STEP_LABELS[step]}
        </span>
      </div>
    </div>
  );
};
