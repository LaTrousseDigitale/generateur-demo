import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { QuestionnaireData } from "@/types/questionnaire";

interface QuizState {
  step: number;
  totalSteps: number;
  data: Partial<QuestionnaireData>;
  isComplete: boolean;
}

interface QuizContextType {
  state: QuizState;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateData: (updates: Partial<QuestionnaireData>) => void;
  reset: () => void;
  complete: () => void;
}

const initialData: Partial<QuestionnaireData> = {
  companyName: "",
  industry: "",
  mainObjectives: [],
  solutionTypes: [],
  websiteType: null,
  portalType: null,
  selectedModules: [],
  primaryColor: "#1c61fe",
  accentColor: "#ff6b3d",
  secondaryColor: "#fbca58",
  logo: null,
  clientEmail: "",
  contactMethod: "",
  theme: "",
  portalStyle: "",
  mobileOptions: [],
  features: [],
};

const QuizContext = createContext<QuizContextType | null>(null);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
  totalSteps?: number;
}

export const QuizProvider = ({ children, totalSteps = 8 }: QuizProviderProps) => {
  const [state, setState] = useState<QuizState>(() => {
    const saved = localStorage.getItem("sales-quiz-data");
    const savedStep = localStorage.getItem("sales-quiz-step");
    return {
      step: savedStep ? parseInt(savedStep, 10) : 0,
      totalSteps,
      data: saved ? JSON.parse(saved) : initialData,
      isComplete: false,
    };
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem("sales-quiz-data", JSON.stringify(state.data));
    localStorage.setItem("sales-quiz-step", state.step.toString());
  }, [state.data, state.step]);

  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.min(prev.step + 1, prev.totalSteps - 1),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      step: Math.max(prev.step - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      step: Math.max(0, Math.min(step, prev.totalSteps - 1)),
    }));
  }, []);

  const updateData = useCallback((updates: Partial<QuestionnaireData>) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, ...updates },
    }));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem("sales-quiz-data");
    localStorage.removeItem("sales-quiz-step");
    setState({
      step: 0,
      totalSteps,
      data: initialData,
      isComplete: false,
    });
  }, [totalSteps]);

  const complete = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isComplete: true,
    }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        state,
        nextStep,
        prevStep,
        goToStep,
        updateData,
        reset,
        complete,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
