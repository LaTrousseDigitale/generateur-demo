# Configuration de la synchronisation panier entre projets Lovable

## Objectif
Permettre à `latroussedigitale.ca` et `demos.latroussedigitale.ca` de partager le même panier en utilisant une base de données unique.

## Architecture

```
latroussedigitale.ca (site principal)
        │
        ▼
┌─────────────────────────────────────────────┐
│  Edge Function: cart-sync                   │
│  URL: https://iuvwtzwxkgyxzcxmgrmp.supabase.co/functions/v1/cart-sync │
└─────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────┐
│  Table: carts (Supabase projet demos)       │
└─────────────────────────────────────────────┘
        ▲
        │
demos.latroussedigitale.ca (ce projet)
```

## Configuration sur latroussedigitale.ca

### Étape 1: Modifier le hook useCartSync

Dans le projet `latroussedigitale.ca`, modifiez le fichier `src/hooks/useCartSync.ts` :

```typescript
// Remplacer l'URL de l'edge function par celle du projet demos
const CART_SYNC_URL = 'https://iuvwtzwxkgyxzcxmgrmp.supabase.co/functions/v1/cart-sync';

// Dans la fonction fetchCart et saveCart, utiliser cette URL au lieu de supabase.functions.invoke
const response = await fetch(`${CART_SYNC_URL}?session_id=${sessionId}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1dnd0end4a2d5eHpjeG1ncm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTM2NDMsImV4cCI6MjA3OTE4OTY0M30.bbNf_QneYPMdO0egBPAeXnE7Mtxk_lteMwxAIRkhG4k'
  }
});
```

### Étape 2: Format du session_id

Le session_id doit être identique sur les deux sites. Formats acceptés :
- Hex 64 caractères : `a1b2c3d4...` (recommandé)
- Legacy : `session_1234567890123_abc`
- Hex 16+ caractères : `a1b2c3d4e5f6g7h8`

### Étape 3: Synchroniser les cookies

Les deux domaines doivent partager le même `session_id`. Options :

**Option A - Cookie partagé (recommandé si même domaine parent)**
```typescript
// Stocker le cookie sur le domaine parent
document.cookie = `cart_session_id=${sessionId}; domain=.latroussedigitale.ca; path=/; max-age=31536000`;
```

**Option B - Paramètre URL**
Passer le session_id via URL lors de la navigation entre sites :
```
https://demos.latroussedigitale.ca?session_id=xxx
```

## API Reference

### GET /cart-sync
Récupère le panier.

**Query params:**
- `session_id` (string, requis) - ID de session

**Response:**
```json
{
  "cart": {
    "id": "uuid",
    "items": [...],
    "session_id": "xxx"
  }
}
```

### POST /cart-sync
Sauvegarde le panier.

**Query params:**
- `session_id` (string, requis)

**Body:**
```json
{
  "items": [
    {
      "id": "product-123",
      "name": "Produit",
      "price": 99.99,
      "quantity": 1,
      "image": "/image.jpg"
    }
  ]
}
```

### DELETE /cart-sync
Vide le panier.

**Query params:**
- `session_id` (string, requis)

## Test

Pour tester la synchronisation :

1. Sur `latroussedigitale.ca`, ajoutez un article au panier
2. Notez le session_id (visible dans les cookies ou localStorage)
3. Sur `demos.latroussedigitale.ca`, vérifiez que le même session_id affiche le même panier

## Dépannage

### Le panier ne se synchronise pas
1. Vérifiez que les session_id sont identiques sur les deux sites
2. Vérifiez les logs de l'edge function dans Lovable Cloud
3. Vérifiez les erreurs réseau dans la console

### Erreur CORS
L'edge function accepte tous les origines (`Access-Control-Allow-Origin: *`). Si vous avez des erreurs CORS, vérifiez les headers de la requête.
