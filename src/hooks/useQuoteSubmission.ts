import { supabase } from "@/integrations/supabase/client";
import { QuestionnaireData } from "@/types/questionnaire";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type QuoteInsert = Database['public']['Tables']['quotes']['Insert'];

export const useQuoteSubmission = () => {
  const submitQuote = async (data: QuestionnaireData) => {
    try {
      const quoteData: QuoteInsert = {
        client_email: data.contactMethod,
        client_name: data.companyName,
        company_name: data.companyName,
        solution_types: data.solutionTypes,
        industry: data.industry,
        website_type: data.websiteType,
        portal_type: data.portalType,
        modules: data.selectedModules,
        custom_module: data.customModule,
        canva_services: data.canvaServices,
        domain_type: data.domainType,
        hosting_preference: data.hostingPreference,
        payment_mode: data.paymentMode,
        maintenance_level: data.maintenanceLevel,
        monthly_budget: data.monthlyBudget,
        questionnaire_data: data as any,
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

