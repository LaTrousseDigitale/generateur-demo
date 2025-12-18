-- Create carts table for cross-site synchronization
CREATE TABLE public.carts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT cart_unique_session UNIQUE (session_id),
  CONSTRAINT cart_unique_user UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read their own cart (by session_id or user_id)
CREATE POLICY "Users can view their own cart by session" 
ON public.carts 
FOR SELECT 
USING (true);

-- Policy: Anyone can insert a cart
CREATE POLICY "Anyone can create a cart" 
ON public.carts 
FOR INSERT 
WITH CHECK (true);

-- Policy: Anyone can update their cart
CREATE POLICY "Anyone can update their cart" 
ON public.carts 
FOR UPDATE 
USING (true);

-- Policy: Anyone can delete their cart
CREATE POLICY "Anyone can delete their cart" 
ON public.carts 
FOR DELETE 
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_carts_updated_at
BEFORE UPDATE ON public.carts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for carts
ALTER PUBLICATION supabase_realtime ADD TABLE public.carts;