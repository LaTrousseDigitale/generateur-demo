import { useState } from "react";
import { useCartSync } from "@/hooks/useCartSync";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus, ShoppingCart, RefreshCw, X } from "lucide-react";

const TEST_PRODUCTS = [
  { id: "test-1", name: "Produit Test A", price: 29.99 },
  { id: "test-2", name: "Produit Test B", price: 49.99 },
  { id: "test-3", name: "Produit Test C", price: 19.99 },
];

export const CartSyncTest = () => {
  const { items, itemCount, total, loading, sessionId, addItem, removeItem, updateQuantity, clearCart, fetchCart } = useCartSync();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 gap-2"
        variant="default"
      >
        <ShoppingCart className="w-4 h-4" />
        Test Panier
        {itemCount > 0 && (
          <Badge variant="secondary" className="ml-1">
            {itemCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-auto shadow-2xl">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Test Sync Panier
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Session Info */}
        <div className="p-2 bg-muted rounded-lg text-xs space-y-1">
          <p><strong>Session ID:</strong></p>
          <code className="block text-[10px] break-all text-muted-foreground">
            {sessionId}
          </code>
          <p className="text-muted-foreground mt-1">
            {loading ? "Chargement..." : `${itemCount} article(s) - ${total.toFixed(2)} $`}
          </p>
        </div>

        {/* Add Test Products */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Ajouter des produits test:</p>
          <div className="flex flex-wrap gap-2">
            {TEST_PRODUCTS.map((product) => (
              <Button
                key={product.id}
                variant="outline"
                size="sm"
                onClick={() => addItem({ ...product, quantity: 1 })}
              >
                <Plus className="w-3 h-3 mr-1" />
                {product.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Cart Items */}
        {items.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Panier:</p>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.price.toFixed(2)} $ × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchCart()}
            className="flex-1"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Rafraîchir
          </Button>
          {items.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => clearCart()}
              className="flex-1"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Vider
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded-lg">
          <p className="font-medium mb-1">Pour tester la sync:</p>
          <ol className="list-decimal list-inside space-y-0.5">
            <li>Ajoute des produits ici</li>
            <li>Ouvre latroussedigitale.ca dans un autre onglet</li>
            <li>Le même session_id devrait afficher le même panier</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
};
