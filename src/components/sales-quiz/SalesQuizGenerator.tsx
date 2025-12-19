import { QuizProvider, useQuiz } from "./QuizContext";
import { QuizProgress } from "./QuizProgress";
import { QuizSummaryPanel } from "./QuizSummaryPanel";
import { StepWelcome } from "./steps/StepWelcome";
import { StepIndustry } from "./steps/StepIndustry";
import { StepObjectives } from "./steps/StepObjectives";
import { StepSolutions } from "./steps/StepSolutions";
import { StepDetails } from "./steps/StepDetails";
import { StepFeatures } from "./steps/StepFeatures";
import { StepStyle } from "./steps/StepStyle";
import { StepBranding } from "./steps/StepBranding";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { SyncedHeader } from "@/components/SyncedHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const STEPS = [
  StepWelcome,
  StepIndustry,
  StepObjectives,
  StepSolutions,
  StepDetails,
  StepFeatures,
  StepStyle, // Nouvelle étape style
  StepBranding,
  StepContact,
  StepSummary,
];

// Étapes où on affiche le panneau de résumé (pas sur welcome ni summary)
const STEPS_WITH_PANEL = [1, 2, 3, 4, 5, 6, 7, 8];

const QuizContent = () => {
  const { state, reset } = useQuiz();
  const CurrentStep = STEPS[state.step];
  const isMobile = useIsMobile();
  const showPanel = STEPS_WITH_PANEL.includes(state.step) && !isMobile;
  const showResetButton = state.step > 0 && state.step < STEPS.length - 1;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
      <SyncedHeader />
      
      <div className="w-full px-4 md:px-6 lg:px-8 py-6">
        {/* Progress - hide on welcome step */}
        {state.step > 0 && state.step < STEPS.length - 1 && (
          <div className="mb-6 w-full flex items-center gap-4">
            <div className="flex-1">
              <QuizProgress />
            </div>
            
            {/* Reset Button */}
            {showResetButton && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    Recommencer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Réinitialiser le questionnaire ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action effacera toutes vos réponses et vous ramènera au début. Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={reset} className="bg-destructive hover:bg-destructive/90">
                      Réinitialiser
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}

        {/* Main Content with optional sidebar */}
        <div className={`w-full ${showPanel ? 'grid lg:grid-cols-[1fr_400px] gap-6' : ''}`}>
          {/* Step Content */}
          <div className="w-full">
            <CurrentStep />
          </div>

          {/* Summary Panel - desktop only, not on welcome/summary */}
          {showPanel && (
            <div className="hidden lg:block sticky top-6 h-fit">
              <QuizSummaryPanel />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SalesQuizGenerator = () => {
  return (
    <QuizProvider totalSteps={STEPS.length}>
      <QuizContent />
    </QuizProvider>
  );
};
