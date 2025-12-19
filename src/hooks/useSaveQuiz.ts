import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuestionnaireData } from '@/types/questionnaire';
import { toast } from 'sonner';

interface SavedQuiz {
  id: string;
  share_code: string;
  quiz_data: Partial<QuestionnaireData>;
  current_step: number;
  created_at: string;
  updated_at: string;
}

export const useSaveQuiz = () => {
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveQuiz = useCallback(async (
    data: Partial<QuestionnaireData>, 
    currentStep: number
  ): Promise<string | null> => {
    setSaving(true);
    try {
      const { data: result, error } = await supabase
        .from('saved_quizzes')
        .insert({
          quiz_data: data,
          current_step: currentStep,
        })
        .select('share_code')
        .single();

      if (error) throw error;
      
      return result.share_code;
    } catch (error) {
      console.error('Error saving quiz:', error);
      toast.error('Erreur lors de la sauvegarde');
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  const loadQuiz = useCallback(async (shareCode: string): Promise<SavedQuiz | null> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_quizzes')
        .select('*')
        .eq('share_code', shareCode)
        .single();

      if (error) throw error;
      
      return data as SavedQuiz;
    } catch (error) {
      console.error('Error loading quiz:', error);
      toast.error('Questionnaire non trouvé');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuiz = useCallback(async (
    shareCode: string,
    data: Partial<QuestionnaireData>,
    currentStep: number
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('saved_quizzes')
        .update({
          quiz_data: data,
          current_step: currentStep,
        })
        .eq('share_code', shareCode);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating quiz:', error);
      return false;
    }
  }, []);

  const generateShareUrl = useCallback((shareCode: string): string => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/?resume=${shareCode}`;
  }, []);

  return {
    saving,
    loading,
    saveQuiz,
    loadQuiz,
    updateQuiz,
    generateShareUrl,
  };
};
