-- Create function for timestamp updates first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create quotes table to store questionnaire data
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_email TEXT,
  client_name TEXT,
  company_name TEXT,
  solution_types TEXT[],
  industry TEXT,
  website_type TEXT,
  portal_type TEXT,
  modules TEXT[],
  custom_module TEXT,
  canva_services TEXT[],
  domain_type TEXT,
  hosting_preference TEXT,
  payment_mode TEXT,
  maintenance_level TEXT,
  monthly_budget TEXT,
  questionnaire_data JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert quotes (for public form submission)
CREATE POLICY "Anyone can create quotes"
ON public.quotes
FOR INSERT
WITH CHECK (true);

-- Allow reading quotes by email (for client portal access)
CREATE POLICY "Users can view their own quotes"
ON public.quotes
FOR SELECT
USING (true);

-- Trigger for automatic timestamp updates
CREATE TRIGGER update_quotes_updated_at
BEFORE UPDATE ON public.quotes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();