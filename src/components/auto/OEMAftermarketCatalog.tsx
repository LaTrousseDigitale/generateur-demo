import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Star, Package, Shield, Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export const OEMAftermarketCatalog = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'oem' | 'aftermarket'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popularity'>('popularity');

  const parts = [
    {
      id: 1,
      name: "Kit de freinage avant",
      type: "oem",
      brand: "Honda OEM",
      price: 389.99,
      originalPrice: 450.00,
      rating: 4.9,
      reviews: 127,
      inStock: true,
      warranty: "2 ans",
      features: ["Qualité constructeur", "Garantie complète", "Installation plug-and-play"]
    },
    {
      id: 2,
      name: "Kit de freinage avant",
      type: "aftermarket",
      brand: "Brembo Premium",
      price: 279.99,
      originalPrice: 320.00,
      rating: 4.7,
      reviews: 341,
      inStock: true,
      warranty: "1 an",
      features: ["Performance améliorée", "Excellent rapport qualité/prix", "Compatible OEM"]
    },
    {
      id: 3,
      name: "Filtre à air",
      type: "oem",
      brand: "Toyota OEM",
      price: 45.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 89,
      inStock: true,
      warranty: "1 an",
      features: ["Filtration optimale", "Durée de vie prolongée"]
    },
    {
      id: 4,
      name: "Filtre à air performance",
      type: "aftermarket",
      brand: "K&N Filters",
      price: 69.99,
      originalPrice: 79.99,
      rating: 4.9,
      reviews: 567,
      inStock: true,
      warranty: "10 ans / vie du véhicule",
      features: ["Réutilisable", "Gain de performance", "Économies à long terme"]
    },
    {
      id: 5,
      name: "Amortisseurs arrière (paire)",
      type: "oem",
      brand: "Nissan OEM",
      price: 549.99,
      originalPrice: null,
      rating: 4.8,
      reviews: 73,
      inStock: true,
      warranty: "3 ans",
      features: ["Confort original", "Installation garantie"]
    },
    {
      id: 6,
      name: "Amortisseurs sport (paire)",
      type: "aftermarket",
      brand: "Bilstein B6",
      price: 489.99,
      originalPrice: 599.99,
      rating: 4.9,
      reviews: 234,
      inStock: false,
      warranty: "Lifetime",
      features: ["Tenue de route améliorée", "Garantie à vie", "Performance supérieure"]
    }
  ];

  const filteredParts = parts
    .filter(part => selectedFilter === 'all' || part.type === selectedFilter)
    .filter(part => part.price >= priceRange[0] && part.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews; // popularity
    });

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2">Catalogue OEM vs Aftermarket</h3>
            <p className="text-muted-foreground">
              Comparez les pièces d'origine et alternatives pour faire le meilleur choix
            </p>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-3">Type de pièce</label>
                <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="oem">OEM</TabsTrigger>
                    <TabsTrigger value="aftermarket">Aftermarket</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Prix: {priceRange[0]} $ - {priceRange[1]} $ CAD
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={1000}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-3">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="popularity">Popularité</option>
                  <option value="price">Prix</option>
                  <option value="rating">Note</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredParts.length} pièce{filteredParts.length > 1 ? 's' : ''} trouvée{filteredParts.length > 1 ? 's' : ''}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part) => (
              <Card key={part.id} className="p-6 hover:shadow-lg transition-all flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={part.type === 'oem' ? 'default' : 'secondary'}>
                    {part.type === 'oem' ? 'OEM' : 'Aftermarket'}
                  </Badge>
                  {!part.inStock && (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      Sur commande
                    </Badge>
                  )}
                </div>

                <h4 className="font-semibold text-lg mb-1">{part.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{part.brand}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{part.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({part.reviews} avis)</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{part.price.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $</span>
                    {part.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {part.originalPrice.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4 flex-1">
                  {part.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>{part.warranty}</span>
                  </div>
                  {part.inStock && (
                    <div className="flex items-center gap-1 text-green-600">
                      <Package className="w-4 h-4" />
                      <span>En stock</span>
                    </div>
                  )}
                </div>

                <Button className="w-full" variant={part.inStock ? "default" : "outline"}>
                  {part.inStock ? 'Ajouter au panier' : 'Commander'}
                </Button>
              </Card>
            ))}
          </div>

          {filteredParts.length === 0 && (
            <Card className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg font-semibold mb-2">Aucune pièce trouvée</h4>
              <p className="text-muted-foreground">
                Essayez d'ajuster vos filtres pour voir plus de résultats
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
