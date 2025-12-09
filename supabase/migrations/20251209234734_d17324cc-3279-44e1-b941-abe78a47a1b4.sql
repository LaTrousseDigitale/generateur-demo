-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view their own quotes" ON public.quotes;

-- Create a restrictive SELECT policy - only service role (edge functions) can read
-- Anonymous users should not be able to read any quotes
-- Reading quotes is done via the get-quotes edge function with API key authentication
CREATE POLICY "Only service role can read quotes"
ON public.quotes
FOR SELECT
USING (false);

-- Note: The INSERT policy with 'true' is intentional for anonymous questionnaire submissions
-- Reading is handled by the get-quotes edge function using SUPABASE_SERVICE_ROLE_KEY