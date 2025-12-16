import { supabase } from "@/integrations/supabase/client";
import { QuestionnaireData } from "@/types/questionnaire";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";
import { safeValidateQuestionnaireData } from "@/lib/validations/quoteSchema";

type QuoteInsert = Database['public']['Tables']['quotes']['Insert'];

export const useQuoteSubmission = () => {
  const submitQuote = async (data: QuestionnaireData) => {
    try {
      // Validate and sanitize input data
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

      const quoteData: QuoteInsert = {
        client_email: validatedData.contactMethod || null,
        client_name: validatedData.companyName || null,
        company_name: validatedData.companyName || null,
        solution_types: validatedData.solutionTypes.length > 0 ? validatedData.solutionTypes : null,
        industry: validatedData.industry || null,
        website_type: validatedData.websiteType,
        portal_type: validatedData.portalType,
        modules: validatedData.selectedModules.length > 0 ? validatedData.selectedModules : null,
        custom_module: validatedData.customModule || null,
        canva_services: validatedData.canvaServices.length > 0 ? validatedData.canvaServices : null,
        domain_type: validatedData.domainType || null,
        hosting_preference: validatedData.hostingPreference || null,
        payment_mode: validatedData.paymentMode,
        maintenance_level: validatedData.maintenanceLevel || null,
        monthly_budget: validatedData.monthlyBudget || null,
        questionnaire_data: validatedData as any,
        status: 'pending'
      };

      const { error } = await supabase
        .from('quotes')
        .insert(quoteData);

      if (error) {
        console.error('Error submitting quote:', error);
        toast.error("Erreur lors de la sauvegarde du devis");
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

