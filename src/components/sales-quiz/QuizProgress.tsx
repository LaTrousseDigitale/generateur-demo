import { cn } from "@/lib/utils";
import { useQuiz } from "./QuizContext";
import { Check } from "lucide-react";

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

export const QuizProgress = () => {
  const { state, goToStep } = useQuiz();
  const { step, totalSteps } = state;

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
          const isCompleted = index < step;
          const isClickable = index <= step;

          return (
            <button
              key={index}
              onClick={() => isClickable && goToStep(index)}
              disabled={!isClickable}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300",
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  isActive && "bg-primary text-primary-foreground shadow-glow scale-110",
                  isCompleted && "bg-green-500 text-white",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  isActive && "text-primary",
                  isCompleted && "text-green-600",
                  !isActive && !isCompleted && "text-muted-foreground"
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
