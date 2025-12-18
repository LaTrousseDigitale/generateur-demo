import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

const CART_SESSION_KEY = 'cart_session_id';
const CART_API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/cart-sync`;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: unknown;
}

interface Cart {
  id: string;
  items: CartItem[];
  session_id?: string;
  user_id?: string;
  created_at: string;
  updated_at: string;
}

// Generate or retrieve session ID for anonymous users
const getSessionId = (): string => {
  let sessionId = localStorage.getItem(CART_SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(CART_SESSION_KEY, sessionId);
  }
  return sessionId;
};

export const useCartSync = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const sessionId = getSessionId();

  // Fetch cart from API
  const fetchCart = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (userId) {
        params.set('user_id', userId);
      } else {
        params.set('session_id', sessionId);
      }

      const response = await fetch(`${CART_API_URL}?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.cart?.items) {
        setItems(data.cart.items);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  }, [userId, sessionId]);

  // Save cart to API
  const saveCart = useCallback(async (newItems: CartItem[]) => {
    try {
      const params = new URLSearchParams();
      if (userId) {
        params.set('user_id', userId);
      }
      params.set('session_id', sessionId);

      await fetch(`${CART_API_URL}?${params}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: newItems }),
      });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [userId, sessionId]);

  // Merge carts after login
  const mergeCarts = useCallback(async (newUserId: string) => {
    try {
      await fetch(CART_API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_id: newUserId,
        }),
      });
      
      // Refresh cart after merge
      setUserId(newUserId);
    } catch (error) {
      console.error('Error merging carts:', error);
    }
  }, [sessionId]);

  // Add item to cart
  const addItem = useCallback((item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      let newItems: CartItem[];
      
      if (existing) {
        newItems = prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        newItems = [...prev, { ...item, quantity: item.quantity || 1 }];
      }
      
      saveCart(newItems);
      return newItems;
    });
  }, [saveCart]);

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== itemId);
      saveCart(newItems);
      return newItems;
    });
  }, [saveCart]);

  // Update item quantity
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prev => {
      const newItems = prev.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      );
      saveCart(newItems);
      return newItems;
    });
  }, [saveCart, removeItem]);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (userId) {
        params.set('user_id', userId);
      } else {
        params.set('session_id', sessionId);
      }

      await fetch(`${CART_API_URL}?${params}`, {
        method: 'DELETE',
      });
      
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, [userId, sessionId]);

  // Calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const newUserId = session?.user?.id || null;
        
        if (event === 'SIGNED_IN' && newUserId && !userId) {
          // User just logged in - merge carts
          await mergeCarts(newUserId);
        } else if (event === 'SIGNED_OUT') {
          setUserId(null);
          // Fetch anonymous cart
          fetchCart();
        } else {
          setUserId(newUserId);
        }
      }
    );

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch cart when userId changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('cart-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'carts',
          filter: userId 
            ? `user_id=eq.${userId}` 
            : `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log('Cart realtime update:', payload);
          if (payload.new && 'items' in payload.new) {
            setItems((payload.new as Cart).items || []);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, sessionId]);

  return {
    items,
    itemCount,
    total,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    fetchCart,
  };
};

export default useCartSync;