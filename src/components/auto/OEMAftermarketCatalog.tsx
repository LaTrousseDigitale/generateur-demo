import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Star, Package, Shield, ShoppingCart, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface OEMAftermarketCatalogProps {
  primaryColor?: string;
  accentColor?: string;
}

export const OEMAftermarketCatalog = ({ primaryColor = "#3B82F6", accentColor = "#8B5CF6" }: OEMAftermarketCatalogProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'oem' | 'aftermarket'>('all');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'popularity'>('popularity');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
    <section className="relative py-24 overflow-hidden bg-slate-950">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(ellipse at top, ${primaryColor}08 0%, transparent 50%)`
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                border: `1px solid ${primaryColor}30`
              }}
            >
              <Sparkles className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-white">Catalogue complet</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
              Catalogue{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                OEM vs Aftermarket
              </span>
            </h3>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Comparez les pièces d'origine et alternatives pour faire le meilleur choix
            </p>
          </div>

          {/* Filters Card */}
          <div 
            className="rounded-2xl p-6 mb-10 backdrop-blur-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-white mb-4">Type de pièce</label>
                <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)}>
                  <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 p-1 rounded-xl">
                    <TabsTrigger 
                      value="all" 
                      className="rounded-lg text-slate-400 data-[state=active]:text-white transition-all"
                      style={{ 
                        backgroundColor: selectedFilter === 'all' ? primaryColor : 'transparent'
                      }}
                    >
                      Tous
                    </TabsTrigger>
                    <TabsTrigger 
                      value="oem"
                      className="rounded-lg text-slate-400 data-[state=active]:text-white transition-all"
                      style={{ 
                        backgroundColor: selectedFilter === 'oem' ? primaryColor : 'transparent'
                      }}
                    >
                      OEM
                    </TabsTrigger>
                    <TabsTrigger 
                      value="aftermarket"
                      className="rounded-lg text-slate-400 data-[state=active]:text-white transition-all"
                      style={{ 
                        backgroundColor: selectedFilter === 'aftermarket' ? primaryColor : 'transparent'
                      }}
                    >
                      Aftermarket
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-white mb-4">
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
                <label className="block text-sm font-semibold text-white mb-4">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer hover:bg-white/10"
                >
                  <option value="popularity" className="bg-slate-900">Popularité</option>
                  <option value="price" className="bg-slate-900">Prix</option>
                  <option value="rating" className="bg-slate-900">Note</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <span style={{ color: primaryColor }} className="font-semibold">
              {filteredParts.length} pièce{filteredParts.length > 1 ? 's' : ''} trouvée{filteredParts.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredParts.map((part, index) => (
              <div 
                key={part.id} 
                className="group relative rounded-2xl p-6 backdrop-blur-xl transition-all duration-500"
                style={{
                  background: hoveredCard === index ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hoveredCard === index ? `0 25px 50px -12px ${primaryColor}30` : 'none'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Tags */}
                <div className="flex justify-between items-start mb-5">
                  <Badge 
                    className="text-white border-0"
                    style={{ 
                      background: part.type === 'oem' 
                        ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                        : 'linear-gradient(135deg, #10B981, #059669)'
                    }}
                  >
                    {part.type === 'oem' ? 'OEM' : 'Aftermarket'}
                  </Badge>
                  {!part.inStock && (
                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Sur commande
                    </Badge>
                  )}
                </div>

                {/* Title & Brand */}
                <h4 className="font-bold text-xl text-white mb-1">{part.name}</h4>
                <p className="text-slate-400 text-sm mb-4">{part.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="ml-1 text-sm font-semibold text-white">{part.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">({part.reviews} avis)</span>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <div className="flex items-baseline gap-3">
                    <span 
                      className="text-3xl font-black"
                      style={{ color: primaryColor }}
                    >
                      {part.price.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                    </span>
                    {part.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        {part.originalPrice.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-5">
                  {part.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-5">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>{part.warranty}</span>
                  </div>
                  {part.inStock && (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Package className="w-4 h-4" />
                      <span>En stock</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full rounded-xl font-semibold transition-all hover:scale-[1.02] ${part.inStock ? 'text-white' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                  style={{ 
                    background: part.inStock 
                      ? `linear-gradient(135deg, ${primaryColor}, ${accentColor})`
                      : 'transparent',
                    border: part.inStock ? 'none' : '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {part.inStock ? 'Ajouter au panier' : 'Commander'}
                </Button>
              </div>
            ))}
          </div>

          {filteredParts.length === 0 && (
            <div 
              className="rounded-2xl p-16 text-center backdrop-blur-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Package className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h4 className="text-xl font-bold text-white mb-2">Aucune pièce trouvée</h4>
              <p className="text-slate-400">
                Essayez d'ajuster vos filtres pour voir plus de résultats
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};