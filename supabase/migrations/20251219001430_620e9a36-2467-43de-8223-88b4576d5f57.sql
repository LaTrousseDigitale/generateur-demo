-- Create header configuration table
CREATE TABLE public.header_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_key TEXT NOT NULL UNIQUE DEFAULT 'main',
  logo_url TEXT,
  nav_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  cta_text TEXT DEFAULT 'Générer ma démo',
  cta_icon TEXT DEFAULT 'sparkles',
  cta_url TEXT DEFAULT '#',
  cta_color TEXT DEFAULT '#ff6b3d',
  show_cart BOOLEAN DEFAULT true,
  cart_url TEXT DEFAULT 'https://latroussedigitale.ca/panier',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.header_config ENABLE ROW LEVEL SECURITY;

-- Public read access for header config
CREATE POLICY "Anyone can read header config"
ON public.header_config
FOR SELECT
USING (true);

-- Only service role can modify
CREATE POLICY "Service role can manage header config"
ON public.header_config
FOR ALL
USING (false);

-- Insert default configuration
INSERT INTO public.header_config (site_key, logo_url, nav_links, cta_text, cta_icon, cta_url, cta_color, show_cart, cart_url)
VALUES (
  'main',
  'https://latroussedigitale.ca/logo-trousse-digitale.png',
  '[
    {"label": "Accueil", "href": "https://latroussedigitale.ca/"},
    {"label": "Applications", "href": "https://latroussedigitale.ca/#applications"},
    {"label": "Démos", "href": "https://latroussedigitale.ca/#demos"},
    {"label": "Avantages", "href": "https://latroussedigitale.ca/#avantages"},
    {"label": "Tarifs", "href": "https://latroussedigitale.ca/#tarifs"},
    {"label": "Contact", "href": "https://latroussedigitale.ca/#contact"}
  ]'::jsonb,
  'Générer ma démo',
  'sparkles',
  'https://demos.latroussedigitale.ca',
  '#ff6b3d',
  true,
  'https://latroussedigitale.ca/panier'
);

-- Add trigger for updated_at
CREATE TRIGGER update_header_config_updated_at
BEFORE UPDATE ON public.header_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();