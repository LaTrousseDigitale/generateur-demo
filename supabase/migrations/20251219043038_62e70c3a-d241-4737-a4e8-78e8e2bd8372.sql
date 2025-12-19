-- Drop existing permissive RLS policies on carts that allow anonymous access
DROP POLICY IF EXISTS "Anyone can create a cart" ON public.carts;
DROP POLICY IF EXISTS "Users can view their own cart" ON public.carts;
DROP POLICY IF EXISTS "Users can update their own cart" ON public.carts;
DROP POLICY IF EXISTS "Users can delete their own cart" ON public.carts;

-- Create new restrictive policies: only authenticated users can access their own carts directly
-- All anonymous cart operations MUST go through the cart-sync edge function (which uses service role)

CREATE POLICY "Authenticated users can view their own cart" 
ON public.carts 
FOR SELECT 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can create their own cart" 
ON public.carts 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can update their own cart" 
ON public.carts 
FOR UPDATE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Authenticated users can delete their own cart" 
ON public.carts 
FOR DELETE 
USING (auth.uid() IS NOT NULL AND user_id = auth.uid());

-- Anonymous users (session_id only) must use the cart-sync edge function
-- which validates session IDs (64 hex chars) and uses service role key