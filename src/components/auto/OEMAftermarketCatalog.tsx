import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Star, Package, Shield, ShoppingCart } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface OEMAftermarketCatalogProps {
  primaryColor?: string;
  accentColor?: string;
}

export const OEMAftermarketCatalog = ({ primaryColor = "#dc2626", accentColor = "#f97316" }: OEMAftermarketCatalogProps) => {
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
      return b.reviews - a.reviews;
    });

  return (
    <div className="space-y-8">
      {/* Filters Card */}
      <Card className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Type de pièce</label>
            <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)}>
              <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-lg">
                <TabsTrigger 
                  value="all" 
                  className="rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger 
                  value="oem"
                  className="rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  OEM
                </TabsTrigger>
                <TabsTrigger 
                  value="aftermarket"
                  className="rounded-md text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Aftermarket
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Prix: <span style={{ color: primaryColor }}>{priceRange[0]} $ - {priceRange[1]} $ CAD</span>
            </label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={1000}
              step={10}
              className="mt-4"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Trier par</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              <option value="popularity">Popularité</option>
              <option value="price">Prix</option>
              <option value="rating">Note</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div>
        <span style={{ color: primaryColor }} className="font-semibold">
          {filteredParts.length} pièce{filteredParts.length > 1 ? 's' : ''} trouvée{filteredParts.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <Card 
            key={part.id} 
            className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Tags */}
            <div className="flex justify-between items-start mb-4">
              <Badge 
                className="text-white border-0"
                style={{ 
                  backgroundColor: part.type === 'oem' ? primaryColor : '#10B981'
                }}
              >
                {part.type === 'oem' ? 'OEM' : 'Aftermarket'}
              </Badge>
              {!part.inStock && (
                <Badge className="bg-amber-100 text-amber-700 border border-amber-200">
                  Sur commande
                </Badge>
              )}
            </div>

            {/* Title & Brand */}
            <h4 className="font-bold text-lg text-slate-900 mb-1">{part.name}</h4>
            <p className="text-slate-500 text-sm mb-3">{part.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="ml-1 text-sm font-semibold text-slate-900">{part.rating}</span>
              </div>
              <span className="text-sm text-slate-400">({part.reviews} avis)</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black" style={{ color: primaryColor }}>
                  {part.price.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                </span>
                {part.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {part.originalPrice.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {part.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-600">{feature}</span>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>{part.warranty}</span>
              </div>
              {part.inStock && (
                <div className="flex items-center gap-1 text-emerald-600">
                  <Package className="w-4 h-4" />
                  <span>En stock</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button 
              className="w-full rounded-lg font-semibold text-white"
              style={{ backgroundColor: part.inStock ? primaryColor : '#64748b' }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {part.inStock ? 'Ajouter au panier' : 'Commander'}
            </Button>
          </Card>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <Card className="bg-white border border-slate-200 rounded-xl p-16 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h4 className="text-xl font-bold text-slate-900 mb-2">Aucune pièce trouvée</h4>
          <p className="text-slate-500">
            Essayez d'ajuster vos filtres pour voir plus de résultats
          </p>
        </Card>
      )}
    </div>
  );
};
