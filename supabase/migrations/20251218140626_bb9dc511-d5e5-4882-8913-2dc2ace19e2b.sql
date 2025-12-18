-- Drop existing permissive policies on carts table
DROP POLICY IF EXISTS "Anyone can create a cart" ON public.carts;
DROP POLICY IF EXISTS "Anyone can delete their cart" ON public.carts;
DROP POLICY IF EXISTS "Anyone can update their cart" ON public.carts;
DROP POLICY IF EXISTS "Users can view their own cart by session" ON public.carts;

-- Create secure RLS policies for carts table
-- Note: Anonymous cart operations go through the cart-sync edge function which uses service role key
-- These policies protect direct database access

-- Allow anyone to create a cart (needed for initial cart creation)
CREATE POLICY "Anyone can create a cart"
ON public.carts
FOR INSERT
WITH CHECK (true);

-- Authenticated users can view their own carts
CREATE POLICY "Users can view their own cart"
ON public.carts
FOR SELECT
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Authenticated users can update their own carts
CREATE POLICY "Users can update their own cart"
ON public.carts
FOR UPDATE
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  (auth.uid() IS NULL AND user_id IS NULL)
);

-- Authenticated users can delete their own carts
CREATE POLICY "Users can delete their own cart"
ON public.carts
FOR DELETE
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  (auth.uid() IS NULL AND user_id IS NULL)
);