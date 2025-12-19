import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

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
  // Allow lovableproject.com subdomains dynamically
  const isLovable = /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/.test(origin)
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) || isLovable ? origin : ALLOWED_ORIGINS[0]
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  }
}

// Schema validation for cart items
const CartItemSchema = z.object({
  id: z.string().min(1).max(100),
  name: z.string().min(1).max(255),
  price: z.number().nonnegative().max(999999),
  quantity: z.number().int().positive().max(999),
}).passthrough()

const CartSchema = z.array(CartItemSchema).max(100)

// Validate session ID format: accept both secure (64 hex) and legacy formats
const isValidSessionId = (id: string): boolean => {
  // Secure format: 64 hex characters (256 bits of entropy)
  if (/^[a-f0-9]{64}$/i.test(id)) return true
  // Legacy format from latroussedigitale.ca: session_<timestamp> or similar
  if (/^session_[0-9]{10,15}$/.test(id)) return true
  // Also accept shorter hex strings (at least 16 chars) for compatibility
  if (/^[a-f0-9]{16,}$/i.test(id)) return true
  return false
}

// Validate user ID format: must be valid UUID
const isValidUUID = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req)
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const url = new URL(req.url)
    const sessionId = url.searchParams.get('session_id')
    const userId = url.searchParams.get('user_id')

    // Validate session ID format - reject invalid session IDs
    if (sessionId && !isValidSessionId(sessionId)) {
      console.error('[cart-sync] Invalid session_id format rejected:', sessionId?.substring(0, 20))
      return new Response(
        JSON.stringify({ error: 'Invalid session format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate user ID format
    if (userId && !isValidUUID(userId)) {
      console.error('[cart-sync] Invalid user_id format rejected')
      return new Response(
        JSON.stringify({ error: 'Invalid user format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // GET - Retrieve cart
    if (req.method === 'GET') {
      let query = supabase.from('carts').select('*')
      
      if (userId) {
        query = query.eq('user_id', userId)
      } else if (sessionId) {
        query = query.eq('session_id', sessionId)
      } else {
        return new Response(
          JSON.stringify({ error: 'session_id or user_id required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { data, error } = await query.maybeSingle()

      if (error) {
        console.error('[cart-sync] GET error:', error)
        return new Response(
          JSON.stringify({ error: 'Unable to retrieve cart. Please try again.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] GET success:', data?.id || 'no cart')
      return new Response(
        JSON.stringify({ cart: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // POST/PUT - Update cart
    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await req.json()
      const rawItems = body.items || []

      // Validate cart items with Zod schema
      const validationResult = CartSchema.safeParse(rawItems)
      if (!validationResult.success) {
        console.error('[cart-sync] Cart validation failed:', validationResult.error.issues)
        return new Response(
          JSON.stringify({ error: 'Invalid cart data. Please check item format and limits.' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      const items = validationResult.data

      console.log('[cart-sync] POST/PUT validated items count:', items.length)

      if (!sessionId && !userId) {
        return new Response(
          JSON.stringify({ error: 'session_id or user_id required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Check if cart exists
      let existingCart = null
      if (userId) {
        const { data } = await supabase.from('carts').select('id').eq('user_id', userId).maybeSingle()
        existingCart = data
      } else if (sessionId) {
        const { data } = await supabase.from('carts').select('id').eq('session_id', sessionId).maybeSingle()
        existingCart = data
      }

      let result
      if (existingCart) {
        // Update existing cart
        const updateData: { items: typeof items, user_id?: string } = { items }
        
        // If we have userId and this was a session cart, link it to the user
        if (userId && sessionId) {
          updateData.user_id = userId
        }

        result = await supabase
          .from('carts')
          .update(updateData)
          .eq('id', existingCart.id)
          .select()
          .single()
      } else {
        // Create new cart
        const insertData: { items: typeof items, session_id?: string, user_id?: string } = { items }
        if (sessionId) insertData.session_id = sessionId
        if (userId) insertData.user_id = userId

        result = await supabase
          .from('carts')
          .insert(insertData)
          .select()
          .single()
      }

      if (result.error) {
        console.error('[cart-sync] POST/PUT error:', result.error)
        return new Response(
          JSON.stringify({ error: 'Unable to save cart. Please try again.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] POST/PUT success:', result.data?.id)
      return new Response(
        JSON.stringify({ cart: result.data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // DELETE - Clear cart
    if (req.method === 'DELETE') {
      let query = supabase.from('carts').delete()
      
      if (userId) {
        query = query.eq('user_id', userId)
      } else if (sessionId) {
        query = query.eq('session_id', sessionId)
      } else {
        return new Response(
          JSON.stringify({ error: 'session_id or user_id required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { error } = await query

      if (error) {
        console.error('[cart-sync] DELETE error:', error)
        return new Response(
          JSON.stringify({ error: 'Unable to clear cart. Please try again.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] DELETE success')
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Merge anonymous cart with user cart after login
    if (req.method === 'PATCH') {
      const body = await req.json()
      const { session_id: mergeSessionId, user_id: mergeUserId } = body

      if (!mergeSessionId || !mergeUserId) {
        return new Response(
          JSON.stringify({ error: 'Both session_id and user_id required for merge' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Validate formats for merge operation
      if (!isValidSessionId(mergeSessionId)) {
        return new Response(
          JSON.stringify({ error: 'Invalid session format for merge' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      if (!isValidUUID(mergeUserId)) {
        return new Response(
          JSON.stringify({ error: 'Invalid user format for merge' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] PATCH merge request for user:', mergeUserId.substring(0, 8))

      // Get both carts
      const { data: sessionCart } = await supabase
        .from('carts')
        .select('*')
        .eq('session_id', mergeSessionId)
        .maybeSingle()

      const { data: userCart } = await supabase
        .from('carts')
        .select('*')
        .eq('user_id', mergeUserId)
        .maybeSingle()

      // Validate and merge items
      const userItemsRaw = userCart?.items || []
      const sessionItemsRaw = sessionCart?.items || []
      
      // Validate both sets of items
      const userValidation = CartSchema.safeParse(userItemsRaw)
      const sessionValidation = CartSchema.safeParse(sessionItemsRaw)
      
      const userItems = userValidation.success ? userValidation.data : []
      const sessionItems = sessionValidation.success ? sessionValidation.data : []
      
      const mergedItems = [...userItems]
      for (const sessionItem of sessionItems) {
        const exists = mergedItems.find(item => item.id === sessionItem.id)
        if (!exists && mergedItems.length < 100) {
          mergedItems.push(sessionItem)
        }
      }

      let result
      if (userCart) {
        // Update user cart with merged items
        result = await supabase
          .from('carts')
          .update({ items: mergedItems })
          .eq('id', userCart.id)
          .select()
          .single()
      } else {
        // Create user cart from session cart
        result = await supabase
          .from('carts')
          .insert({ user_id: mergeUserId, items: mergedItems })
          .select()
          .single()
      }

      // Delete the session cart after merge
      if (sessionCart) {
        await supabase.from('carts').delete().eq('id', sessionCart.id)
      }

      if (result.error) {
        console.error('[cart-sync] PATCH error:', result.error)
        return new Response(
          JSON.stringify({ error: 'Unable to merge carts. Please try again.' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] PATCH merge success:', result.data?.id)
      return new Response(
        JSON.stringify({ cart: result.data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('[cart-sync] Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...getCorsHeaders(req), 'Content-Type': 'application/json' } }
    )
  }
})
