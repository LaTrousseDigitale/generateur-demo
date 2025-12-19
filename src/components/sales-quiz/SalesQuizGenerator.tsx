import { QuizProvider, useQuiz } from "./QuizContext";
import { QuizProgress } from "./QuizProgress";
import { StepWelcome } from "./steps/StepWelcome";
import { StepIndustry } from "./steps/StepIndustry";
import { StepObjectives } from "./steps/StepObjectives";
import { StepSolutions } from "./steps/StepSolutions";
import { StepDetails } from "./steps/StepDetails";
import { StepBranding } from "./steps/StepBranding";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { SyncedHeader } from "@/components/SyncedHeader";

const STEPS = [
  StepWelcome,
  StepIndustry,
  StepObjectives,
  StepSolutions,
  StepDetails,
  StepBranding,
  StepContact,
  StepSummary,
];

const QuizContent = () => {
  const { state } = useQuiz();
  const CurrentStep = STEPS[state.step];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
      <SyncedHeader />
      
      <div className="w-full px-4 md:px-8 py-8">
        {/* Progress - hide on welcome step */}
        {state.step > 0 && (
          <div className="mb-8 w-full max-w-6xl mx-auto">
            <QuizProgress />
          </div>
        )}

        {/* Step Content */}
        <div className="w-full">
          <CurrentStep />
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
