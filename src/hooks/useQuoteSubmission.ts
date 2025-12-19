import { QuestionnaireData } from "@/types/questionnaire";
import { toast } from "sonner";
import { safeValidateQuestionnaireData } from "@/lib/validations/quoteSchema";

const SUBMIT_QUOTE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-quote`;

export const useQuoteSubmission = () => {
  const submitQuote = async (data: QuestionnaireData) => {
    try {
      // Validate and sanitize input data client-side first
      const validationResult = safeValidateQuestionnaireData(data);
      
      if (!validationResult.success) {
        console.error('Validation errors:', validationResult.errors?.issues);
        const firstError = validationResult.errors?.issues[0];
        const errorMessage = firstError 
          ? `Erreur de validation: ${firstError.message}`
          : "Données de formulaire invalides";
        toast.error(errorMessage);
        return false;
      }

      const validatedData = validationResult.data;

      // Submit via secure edge function with server-side validation
      const response = await fetch(SUBMIT_QUOTE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error('Error submitting quote:', result.error);
        toast.error(result.error || "Erreur lors de la sauvegarde du devis");
        return false;
      }

      toast.success("Devis sauvegardé avec succès!");
      return true;
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error("Erreur lors de la sauvegarde du devis");
      return false;
    }
  };

  return { submitQuote };
};

