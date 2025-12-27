import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { Building2, Users, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY_TYPES, COMPANY_SIZES } from "@/types/questionnaire";

export const StepCompanyInfo = () => {
  const { state, updateData } = useQuiz();
  const { companyType, companySize } = state.data;

  const canContinue = !!companyType && !!companySize;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
          <Briefcase className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Parlez-nous de votre entreprise
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Ces informations nous aident à personnaliser votre démo
        </p>
      </div>

      {/* Company Type Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Type de clientèle
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMPANY_TYPES.map((type, index) => {
            const isSelected = companyType === type.value;

            return (
              <button
                key={type.value}
                type="button"
                onClick={() => updateData({ companyType: type.value })}
                className={cn(
                  "group relative p-4 rounded-xl text-left transition-all duration-300",
                  "border-2 animate-slide-up",
                  isSelected
                    ? "bg-primary/10 border-primary shadow-elegant"
                    : "bg-card border-border hover:border-primary/50"
                )}
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
              >
                <h4 className={cn("font-semibold text-lg mb-1", isSelected && "text-primary")}>
                  {type.label}
                </h4>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Company Size Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-accent" />
          Taille de l'entreprise
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {COMPANY_SIZES.map((size, index) => {
            const isSelected = companySize === size.value;

            return (
              <button
                key={size.value}
                type="button"
                onClick={() => updateData({ companySize: size.value as any })}
                className={cn(
                  "group relative p-4 rounded-xl text-left transition-all duration-300",
                  "border-2 animate-slide-up",
                  isSelected
                    ? "bg-accent/10 border-accent shadow-elegant"
                    : "bg-card border-border hover:border-accent/50"
                )}
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
              >
                <h4 className={cn("font-semibold mb-1", isSelected && "text-accent")}>
                  {size.label}
                </h4>
                <p className="text-sm text-muted-foreground">{size.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      <QuizNavigation canContinue={canContinue} />
    </div>
  );
};
