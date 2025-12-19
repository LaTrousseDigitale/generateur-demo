import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const CONTACT_METHODS = [
  { id: "email", label: "Courriel", icon: Mail },
  { id: "phone", label: "Téléphone", icon: Phone },
  { id: "sms", label: "SMS", icon: MessageCircle },
];

export const StepContact = () => {
  const { state, updateData } = useQuiz();
  const { clientEmail, contactMethod } = state.data;

  const isValidEmail = clientEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail);
  const canContinue = isValidEmail && contactMethod;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-glow">
          <Mail className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">Dernière étape!</h2>
        <p className="text-muted-foreground">Comment pouvons-nous vous contacter?</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Votre courriel *</Label>
          <Input
            id="email"
            type="email"
            value={clientEmail || ""}
            onChange={(e) => updateData({ clientEmail: e.target.value })}
            placeholder="votre@courriel.com"
            className="h-12"
          />
        </div>

        <div className="space-y-3">
          <Label>Méthode de contact préférée *</Label>
          <div className="grid grid-cols-3 gap-3">
            {CONTACT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = contactMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => updateData({ contactMethod: method.id })}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-center",
                    isSelected ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  )}
                >
                  <Icon className={cn("w-6 h-6 mx-auto mb-2", isSelected ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", isSelected && "text-primary")}>{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <QuizNavigation canContinue={!!canContinue} continueLabel="Voir ma démo" />
    </div>
  );
};
