import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check API key authentication
    const apiKey = req.headers.get('x-api-key');
    const validApiKey = Deno.env.get('QUOTES_API_KEY');
    
    if (!apiKey || apiKey !== validApiKey) {
      console.error('Invalid or missing API key');
      return new Response(JSON.stringify({ error: 'Unauthorized - Invalid API key' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const url = new URL(req.url);
    const quoteId = url.searchParams.get('id');
    const email = url.searchParams.get('email');

    // Get all quotes or filter by id or email
    let query = supabaseClient
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (quoteId) {
      query = query.eq('id', quoteId);
    } else if (email) {
      query = query.eq('client_email', email);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return new Response(JSON.stringify({ quotes: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
})
