import { QuizProvider, useQuiz } from "./QuizContext";
import { QuizProgress } from "./QuizProgress";
import { QuizSummaryPanel } from "./QuizSummaryPanel";
import { StepWelcome } from "./steps/StepWelcome";
import { StepIndustry } from "./steps/StepIndustry";
import { StepObjectives } from "./steps/StepObjectives";
import { StepSolutions } from "./steps/StepSolutions";
import { StepDetails } from "./steps/StepDetails";
import { StepFeatures } from "./steps/StepFeatures";
import { StepBranding } from "./steps/StepBranding";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { SyncedHeader } from "@/components/SyncedHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const STEPS = [
  StepWelcome,
  StepIndustry,
  StepObjectives,
  StepSolutions,
  StepDetails,
  StepFeatures, // Nouvelle étape fonctionnalités
  StepBranding,
  StepContact,
  StepSummary,
];

// Étapes où on affiche le panneau de résumé (pas sur welcome ni summary)
const STEPS_WITH_PANEL = [1, 2, 3, 4, 5, 6, 7];

const QuizContent = () => {
  const { state } = useQuiz();
  const CurrentStep = STEPS[state.step];
  const isMobile = useIsMobile();
  const showPanel = STEPS_WITH_PANEL.includes(state.step) && !isMobile;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
      <SyncedHeader />
      
      <div className="w-full px-4 md:px-6 lg:px-8 py-6">
        {/* Progress - hide on welcome step */}
        {state.step > 0 && state.step < STEPS.length - 1 && (
          <div className="mb-6 w-full">
            <QuizProgress />
          </div>
        )}

        {/* Main Content with optional sidebar */}
        <div className={`w-full ${showPanel ? 'grid lg:grid-cols-[1fr_320px] gap-6' : ''}`}>
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
