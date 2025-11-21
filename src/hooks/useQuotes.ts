import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Quote {
  id: string;
  client_email: string | null;
  client_name: string | null;
  company_name: string | null;
  solution_types: string[] | null;
  industry: string | null;
  website_type: string | null;
  portal_type: string | null;
  modules: string[] | null;
  custom_module: string | null;
  canva_services: string[] | null;
  domain_type: string | null;
  hosting_preference: string | null;
  payment_mode: string | null;
  maintenance_level: string | null;
  monthly_budget: string | null;
  status: string | null;
  questionnaire_data: any;
  created_at: string;
  updated_at: string;
}

interface UseQuotesParams {
  id?: string;
  email?: string;
  autoFetch?: boolean;
}

export const useQuotes = ({ id, email, autoFetch = true }: UseQuotesParams = {}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = async () => {
    setLoading(true);
    setError(null);

    try {
      const params: Record<string, string> = {};
      if (id) params.id = id;
      if (email) params.email = email;

      const { data, error: functionError } = await supabase.functions.invoke('get-quotes', {
        method: 'GET',
        body: params
      });

      if (functionError) {
        throw functionError;
      }

      setQuotes(data.quotes || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération des devis';
      setError(errorMessage);
      console.error('Error fetching quotes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchQuotes();
    }
  }, [id, email, autoFetch]);

  return { quotes, loading, error, refetch: fetchQuotes };
};
