-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can read saved quizzes by share_code" ON public.saved_quizzes;
DROP POLICY IF EXISTS "Anyone can update their own quiz by share_code" ON public.saved_quizzes;
DROP POLICY IF EXISTS "Anyone can create saved quizzes" ON public.saved_quizzes;

-- Create secure function to get quiz by share_code (prevents public table scanning)
CREATE OR REPLACE FUNCTION public.get_quiz_by_share_code(p_share_code text)
RETURNS TABLE (
  id uuid,
  share_code text,
  quiz_data jsonb,
  current_step integer,
  created_at timestamptz,
  updated_at timestamptz,
  expires_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id, share_code, quiz_data, current_step, created_at, updated_at, expires_at
  FROM public.saved_quizzes
  WHERE saved_quizzes.share_code = p_share_code
    AND saved_quizzes.expires_at > now();
$$;

-- Create secure function to update quiz by share_code
CREATE OR REPLACE FUNCTION public.update_quiz_by_share_code(
  p_share_code text,
  p_quiz_data jsonb,
  p_current_step integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.saved_quizzes
  SET quiz_data = p_quiz_data,
      current_step = p_current_step,
      updated_at = now()
  WHERE share_code = p_share_code
    AND expires_at > now();
  
  RETURN FOUND;
END;
$$;

-- Recreate INSERT policy (anyone can create a quiz - no sensitive data at creation)
CREATE POLICY "Anyone can create saved quizzes"
ON public.saved_quizzes
FOR INSERT
WITH CHECK (true);

-- No direct SELECT/UPDATE policies - must go through RPC functions
-- This prevents enumeration attacks on the table