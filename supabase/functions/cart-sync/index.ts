import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  [key: string]: unknown
}

// Validate session ID format: must be 64 hex chars (256 bits of entropy)
const isValidSecureSessionId = (id: string): boolean => {
  return /^[a-f0-9]{64}$/i.test(id)
}

// Validate user ID format: must be valid UUID
const isValidUUID = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

Deno.serve(async (req) => {
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

    // Validate session ID format - reject predictable/weak session IDs
    if (sessionId && !isValidSecureSessionId(sessionId)) {
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
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] GET success:', data)
      return new Response(
        JSON.stringify({ cart: data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // POST/PUT - Update cart
    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await req.json()
      const items: CartItem[] = body.items || []

      console.log('[cart-sync] POST/PUT items:', items)

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
        const updateData: { items: CartItem[], user_id?: string } = { items }
        
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
        const insertData: { items: CartItem[], session_id?: string, user_id?: string } = { items }
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
          JSON.stringify({ error: result.error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] POST/PUT success:', result.data)
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
          JSON.stringify({ error: error.message }),
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
      if (!isValidSecureSessionId(mergeSessionId)) {
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

      console.log('[cart-sync] PATCH merge:', { mergeSessionId, mergeUserId })

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

      // Merge items (user cart takes priority, session cart items are added if not duplicate)
      const userItems: CartItem[] = userCart?.items || []
      const sessionItems: CartItem[] = sessionCart?.items || []
      
      const mergedItems = [...userItems]
      for (const sessionItem of sessionItems) {
        const exists = mergedItems.find(item => item.id === sessionItem.id)
        if (!exists) {
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
          JSON.stringify({ error: result.error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('[cart-sync] PATCH merge success:', result.data)
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
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})