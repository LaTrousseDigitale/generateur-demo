import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, Send } from "lucide-react";
import { useQuiz } from "./QuizContext";
import { cn } from "@/lib/utils";

interface QuizNavigationProps {
  canContinue?: boolean;
  continueLabel?: string;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export const QuizNavigation = ({
  canContinue = true,
  continueLabel,
  onSubmit,
  isSubmitting = false,
}: QuizNavigationProps) => {
  const { state, nextStep, prevStep } = useQuiz();
  const { step, totalSteps } = state;

  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;
  const isSecondToLast = step === totalSteps - 2;

  const handleContinue = () => {
    if (isSecondToLast && onSubmit) {
      onSubmit();
    } else if (!isLastStep) {
      nextStep();
    }
  };

  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={prevStep}
        disabled={isFirstStep}
        className={cn(
          "gap-2 transition-all duration-300",
          isFirstStep && "invisible"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
        Retour
      </Button>

      {/* Continue Button */}
      {!isLastStep && (
        <div className="relative group">
          {/* Rainbow glow effect */}
          <div 
            className={cn(
              "absolute -inset-1 rounded-xl opacity-75 blur-md transition-all duration-500 group-hover:opacity-100 group-hover:blur-lg",
              "bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_100%] animate-rainbow",
              !canContinue && "opacity-0"
            )}
          />
          <Button
            onClick={handleContinue}
            disabled={!canContinue || isSubmitting}
            className={cn(
              "relative gap-2 px-6 py-5 text-base font-semibold transition-all duration-300",
              "bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_100%] animate-rainbow",
              "hover:shadow-glow border-0",
              !canContinue && "opacity-50"
            )}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Génération...
              </>
            ) : isSecondToLast ? (
              <>
                <Sparkles className="w-4 h-4" />
                {continueLabel || "Voir ma démo"}
              </>
            ) : (
              <>
                {continueLabel || "Continuer"}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Final Submit Button */}
      {isLastStep && onSubmit && (
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={cn(
            "gap-2 px-8 py-6 text-lg font-bold",
            "bg-gradient-to-r from-primary via-accent to-secondary",
            "hover:opacity-90 shadow-glow",
            "animate-pulse-glow"
          )}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Recevoir ma soumission
            </>
          )}
        </Button>
      )}
    </div>
  );
};
