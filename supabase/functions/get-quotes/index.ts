import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

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
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  }
}

// Rate limiting for API key abuse prevention
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30

function isRateLimited(identifier: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  
  record.count++
  return false
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     'unknown'

    // Check API key authentication
    const apiKey = req.headers.get('x-api-key')
    const validApiKey = Deno.env.get('QUOTES_API_KEY')
    
    if (!apiKey || apiKey !== validApiKey) {
      console.warn(`[get-quotes] Unauthorized access attempt from IP: ${clientIP}`)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    // Rate limit by IP + API key combination
    const rateLimitKey = `${clientIP}:${apiKey.substring(0, 8)}`
    if (isRateLimited(rateLimitKey)) {
      console.warn(`[get-quotes] Rate limited: ${clientIP}`)
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const url = new URL(req.url)
    const quoteId = url.searchParams.get('id')
    const email = url.searchParams.get('email')

    // Audit logging
    console.log({
      timestamp: new Date().toISOString(),
      ip: clientIP,
      endpoint: 'get-quotes',
      params: { id: quoteId ? 'present' : 'none', email: email ? 'present' : 'none' },
      keyPrefix: apiKey.substring(0, 8) + '...'
    })

    // Get all quotes or filter by id or email
    let query = supabaseClient
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })

    if (quoteId) {
      query = query.eq('id', quoteId)
    } else if (email) {
      query = query.eq('client_email', email)
    }

    const { data, error } = await query

    if (error) {
      console.error('[get-quotes] Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Unable to retrieve quotes. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(JSON.stringify({ quotes: data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('[get-quotes] Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { status: 500, headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    )
  }
})
