import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderConfig {
  id: string;
  site_key: string;
  logo_url: string | null;
  nav_links: NavLink[];
  cta_text: string;
  cta_icon: string;
  cta_url: string;
  cta_color: string;
  show_cart: boolean;
  cart_url: string;
  created_at: string;
  updated_at: string;
}

const DEFAULT_CONFIG: HeaderConfig = {
  id: '',
  site_key: 'main',
  logo_url: null,
  nav_links: [
    { label: "Accueil", href: "https://latroussedigitale.ca/" },
    { label: "Applications", href: "https://latroussedigitale.ca/#applications" },
    { label: "Démos", href: "https://latroussedigitale.ca/#demos" },
    { label: "Avantages", href: "https://latroussedigitale.ca/#avantages" },
    { label: "Tarifs", href: "https://latroussedigitale.ca/#tarifs" },
    { label: "Contact", href: "https://latroussedigitale.ca/#contact" }
  ],
  cta_text: 'Générer ma démo',
  cta_icon: 'sparkles',
  cta_url: 'https://demos.latroussedigitale.ca',
  cta_color: '#ff6b3d',
  show_cart: true,
  cart_url: 'https://latroussedigitale.ca/panier',
  created_at: '',
  updated_at: ''
};

export const useHeaderConfig = (siteKey: string = 'main') => {
  const [config, setConfig] = useState<HeaderConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        console.log('[useHeaderConfig] Fetching config for:', siteKey);
        
        const { data, error: fetchError } = await supabase
          .from('header_config')
          .select('*')
          .eq('site_key', siteKey)
          .single();

        if (fetchError) {
          console.error('[useHeaderConfig] Error:', fetchError);
          setError(fetchError.message);
          return;
        }

        if (data) {
          console.log('[useHeaderConfig] Config loaded:', data);
          setConfig({
            ...data,
            nav_links: Array.isArray(data.nav_links) ? data.nav_links : JSON.parse(data.nav_links as string)
          } as HeaderConfig);
        }
      } catch (err) {
        console.error('[useHeaderConfig] Unexpected error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [siteKey]);

  return { config, loading, error };
};