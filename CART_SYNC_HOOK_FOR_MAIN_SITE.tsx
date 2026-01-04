/**
 * ============================================================
 * FICHIER À COPIER SUR latroussedigitale.ca
 * ============================================================
 * 
 * Remplacez le contenu de src/hooks/useCartSync.ts par ce code.
 * Ce hook synchronise le panier avec la base de données du projet demos.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================
// CONFIGURATION - API du projet demos.latroussedigitale.ca
// ============================================================
const CART_API_URL = 'https://iuvwtzwxkgyxzcxmgrmp.supabase.co/functions/v1/cart-sync';
const CART_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dnd0end4a2d5eHpjeG1ncm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTM2NDMsImV4cCI6MjA3OTE4OTY0M30.bbNf_QneYPMdO0egBPAeXnE7Mtxk_lteMwxAIRkhG4k';

// Domaine parent pour partager le cookie entre sous-domaines
const COOKIE_DOMAIN = '.latroussedigitale.ca';
const SESSION_COOKIE_NAME = 'cart_session_id';
const SESSION_STORAGE_KEY = 'cart_session_id';

// ============================================================
// TYPES
// ============================================================
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
  sku?: string;
}

interface UseCartSyncReturn {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  sessionId: string | null;
}

// ============================================================
// SESSION ID MANAGEMENT (partagé entre sous-domaines)
// ============================================================
const generateSessionId = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days: number = 365): void => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // Cookie sur le domaine parent pour partage entre sous-domaines
  document.cookie = `${name}=${value}; expires=${expires}; path=/; domain=${COOKIE_DOMAIN}; SameSite=Lax`;
};

const getOrCreateSessionId = (): string => {
  // 1. Vérifier le cookie (prioritaire car partagé entre sous-domaines)
  let sessionId = getCookie(SESSION_COOKIE_NAME);
  
  // 2. Vérifier localStorage comme fallback
  if (!sessionId) {
    sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  }
  
  // 3. Vérifier les paramètres URL (pour liens de partage)
  if (!sessionId) {
    const urlParams = new URLSearchParams(window.location.search);
    sessionId = urlParams.get('session_id');
  }
  
  // 4. Générer un nouveau session_id si aucun trouvé
  if (!sessionId) {
    sessionId = generateSessionId();
  }
  
  // 5. Sauvegarder partout pour cohérence
  setCookie(SESSION_COOKIE_NAME, sessionId);
  localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  
  return sessionId;
};

// ============================================================
// API CALLS
// ============================================================
const apiRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  sessionId: string,
  body?: { items: CartItem[] }
): Promise<{ cart?: { items: CartItem[] }; error?: string }> => {
  try {
    const url = `${CART_API_URL}?session_id=${encodeURIComponent(sessionId)}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': CART_API_KEY,
        'Authorization': `Bearer ${CART_API_KEY}`,
      },
    };
    
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`[useCartSync] API ${method} error:`, error);
    throw error;
  }
};

// ============================================================
// HOOK PRINCIPAL
// ============================================================
export const useCartSync = (): UseCartSyncReturn => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  // Initialisation
  useEffect(() => {
    isMountedRef.current = true;
    const id = getOrCreateSessionId();
    setSessionId(id);
    
    console.log('[useCartSync] Session ID:', id);
    
    return () => {
      isMountedRef.current = false;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Charger le panier
  const fetchCart = useCallback(async () => {
    if (!sessionId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiRequest('GET', sessionId);
      
      if (isMountedRef.current) {
        const cartItems = result.cart?.items || [];
        setItems(Array.isArray(cartItems) ? cartItems : []);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : 'Erreur de chargement');
        setItems([]);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [sessionId]);

  // Charger au démarrage
  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId, fetchCart]);

  // Sauvegarder le panier (debounced)
  const saveCart = useCallback(async (newItems: CartItem[]) => {
    if (!sessionId) return;
    
    // Annuler la sauvegarde précédente
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Debounce de 500ms
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await apiRequest('POST', sessionId, { items: newItems });
        console.log('[useCartSync] Cart saved:', newItems.length, 'items');
      } catch (err) {
        console.error('[useCartSync] Save error:', err);
        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'Erreur de sauvegarde');
        }
      }
    }, 500);
  }, [sessionId]);

  // Ajouter un article
  const addItem = useCallback(async (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const newItem: CartItem = { ...item, quantity: item.quantity || 1 };
    
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === newItem.id && i.variant === newItem.variant);
      
      let newItems: CartItem[];
      if (existingIndex >= 0) {
        newItems = prev.map((i, idx) => 
          idx === existingIndex 
            ? { ...i, quantity: i.quantity + newItem.quantity } 
            : i
        );
      } else {
        newItems = [...prev, newItem];
      }
      
      saveCart(newItems);
      return newItems;
    });
  }, [saveCart]);

  // Supprimer un article
  const removeItem = useCallback(async (itemId: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== itemId);
      saveCart(newItems);
      return newItems;
    });
  }, [saveCart]);

  // Modifier la quantité
  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(itemId);
    }
    
    setItems(prev => {
      const newItems = prev.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      );
      saveCart(newItems);
      return newItems;
    });
  }, [removeItem, saveCart]);

  // Vider le panier
  const clearCart = useCallback(async () => {
    if (!sessionId) return;
    
    try {
      await apiRequest('DELETE', sessionId);
      setItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  }, [sessionId]);

  // Calculer les totaux
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return {
    items,
    isLoading,
    error,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    refreshCart: fetchCart,
    sessionId,
  };
};

export default useCartSync;
