-- Table pour sauvegarder les questionnaires avec un lien unique
CREATE TABLE public.saved_quizzes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  share_code TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(8), 'hex'),
  quiz_data JSONB NOT NULL DEFAULT '{}',
  current_step INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '30 days')
);

-- Index pour la recherche par share_code
CREATE INDEX idx_saved_quizzes_share_code ON public.saved_quizzes(share_code);

-- Enable RLS
ALTER TABLE public.saved_quizzes ENABLE ROW LEVEL SECURITY;

-- Politique publique pour permettre à tout le monde de créer et lire les questionnaires
CREATE POLICY "Anyone can create saved quizzes" 
ON public.saved_quizzes 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can read saved quizzes by share_code" 
ON public.saved_quizzes 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update their own quiz by share_code" 
ON public.saved_quizzes 
FOR UPDATE 
USING (true);

-- Trigger pour updated_at
CREATE TRIGGER update_saved_quizzes_updated_at
BEFORE UPDATE ON public.saved_quizzes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();