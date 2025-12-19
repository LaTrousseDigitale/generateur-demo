-- Drop the existing permissive INSERT policy on quotes
DROP POLICY IF EXISTS "Anyone can create quotes" ON public.quotes;

-- Create a restrictive INSERT policy that blocks all direct inserts
-- All quote submissions must go through the submit-quote edge function (which uses service role)
CREATE POLICY "No direct quote inserts allowed" 
ON public.quotes 
FOR INSERT 
WITH CHECK (false);

-- The submit-quote edge function uses service_role key which bypasses RLS,
-- so legitimate quotes can still be created through the secure endpoint