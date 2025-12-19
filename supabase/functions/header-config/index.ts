import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://latroussedigitale.ca',
  'https://demos.latroussedigitale.ca',
  'https://www.latroussedigitale.ca',
  'http://localhost:5173',
  'http://localhost:8080',
]

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || ''
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  }
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Get site_key from query params, default to 'main'
    const url = new URL(req.url)
    const siteKey = url.searchParams.get('site_key') || 'main'

    console.log(`[header-config] Fetching config for site_key: ${siteKey}`)

    const { data, error } = await supabase
      .from('header_config')
      .select('*')
      .eq('site_key', siteKey)
      .single()

    if (error) {
      console.error('[header-config] Error fetching config:', error)
      return new Response(
        JSON.stringify({ error: 'Configuration not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('[header-config] Config found for site_key:', siteKey)

    return new Response(
      JSON.stringify(data),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60' // Cache for 1 minute
        } 
      }
    )
  } catch (error) {
    console.error('[header-config] Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } 
      }
    )
  }
})
