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
  theme?: "moderne" | "rustique" | "futuriste";
}

export const OEMAftermarketCatalog = ({ 
  primaryColor = "#dc2626", 
  accentColor = "#f97316",
  theme = "moderne"
}: OEMAftermarketCatalogProps) => {
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

  // Theme styles
  const getThemeStyles = () => {
    switch(theme) {
      case "futuriste":
        return {
          filterCard: "bg-white/10 backdrop-blur-xl border border-white/20",
          productCard: "bg-white/10 backdrop-blur-xl border border-white/20 hover:-translate-y-1",
          emptyCard: "bg-white/10 backdrop-blur-xl border border-white/20",
          label: "text-slate-300",
          title: "text-white",
          subtitle: "text-slate-400",
          price: "",
          text: "text-slate-300",
          metaText: "text-slate-500",
          tabsBg: "bg-white/5 border border-white/10",
          tabActive: "",
          input: "bg-white/10 border border-white/20 text-white",
          badgeOem: "text-white",
          badgeAftermarket: "bg-emerald-500 text-white",
          badgeStock: "text-amber-300 border border-amber-500/30",
          buttonPrimary: "text-white",
          buttonSecondary: "bg-white/10 border border-white/20 text-slate-300",
          checkIcon: "text-emerald-400",
          stockIcon: "text-emerald-400",
        };
      case "rustique":
        return {
          filterCard: "bg-stone-800/80 border border-amber-900/30",
          productCard: "bg-stone-800/80 border border-amber-900/30 hover:border-amber-700/40 hover:-translate-y-1",
          emptyCard: "bg-stone-800/80 border border-amber-900/30",
          label: "text-stone-300",
          title: "text-amber-50",
          subtitle: "text-stone-400",
          price: "text-amber-400",
          text: "text-stone-300",
          metaText: "text-stone-500",
          tabsBg: "bg-stone-700/50 border border-amber-900/30",
          tabActive: "data-[state=active]:bg-amber-700 data-[state=active]:text-white",
          input: "bg-stone-700/50 border border-amber-900/30 text-amber-50",
          badgeOem: "bg-amber-700 text-white",
          badgeAftermarket: "bg-emerald-700 text-white",
          badgeStock: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
          buttonPrimary: "bg-amber-700 hover:bg-amber-600 text-white",
          buttonSecondary: "bg-stone-700/50 border border-amber-900/30 text-stone-300",
          checkIcon: "text-emerald-500",
          stockIcon: "text-emerald-500",
        };
      default:
        return {
          filterCard: "bg-white border border-slate-200",
          productCard: "bg-white border border-slate-200 hover:shadow-xl hover:-translate-y-1",
          emptyCard: "bg-white border border-slate-200",
          label: "text-slate-700",
          title: "text-slate-900",
          subtitle: "text-slate-500",
          price: "",
          text: "text-slate-600",
          metaText: "text-slate-500",
          tabsBg: "bg-slate-100",
          tabActive: "data-[state=active]:bg-white data-[state=active]:shadow-sm",
          input: "bg-slate-50 border border-slate-200 text-slate-900",
          badgeOem: "text-white",
          badgeAftermarket: "bg-emerald-500 text-white",
          badgeStock: "bg-amber-100 text-amber-700 border border-amber-200",
          buttonPrimary: "text-white",
          buttonSecondary: "bg-slate-100 text-slate-600",
          checkIcon: "text-emerald-500",
          stockIcon: "text-emerald-600",
        };
    }
  };

  const styles = getThemeStyles();

  return (
    <div className="space-y-8">
      {/* Filters Card */}
      <Card className={`${styles.filterCard} rounded-xl p-6`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Type Filter */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${styles.label}`}>Type de pièce</label>
            <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)}>
              <TabsList className={`grid w-full grid-cols-3 p-1 rounded-lg ${styles.tabsBg}`}>
                <TabsTrigger 
                  value="all" 
                  className={`rounded-md text-sm ${styles.tabActive}`}
                  style={{ 
                    backgroundColor: selectedFilter === 'all' && theme !== 'rustique' ? primaryColor : undefined,
                    color: selectedFilter === 'all' && theme !== 'rustique' ? 'white' : undefined
                  }}
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger 
                  value="oem"
                  className={`rounded-md text-sm ${styles.tabActive}`}
                  style={{ 
                    backgroundColor: selectedFilter === 'oem' && theme !== 'rustique' ? primaryColor : undefined,
                    color: selectedFilter === 'oem' && theme !== 'rustique' ? 'white' : undefined
                  }}
                >
                  OEM
                </TabsTrigger>
                <TabsTrigger 
                  value="aftermarket"
                  className={`rounded-md text-sm ${styles.tabActive}`}
                  style={{ 
                    backgroundColor: selectedFilter === 'aftermarket' && theme !== 'rustique' ? primaryColor : undefined,
                    color: selectedFilter === 'aftermarket' && theme !== 'rustique' ? 'white' : undefined
                  }}
                >
                  Aftermarket
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Price Range */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${styles.label}`}>
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
            <label className={`block text-sm font-semibold mb-3 ${styles.label}`}>Trier par</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`w-full px-4 py-2.5 rounded-lg transition-all ${styles.input}`}
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
        <span className="font-semibold" style={{ color: primaryColor }}>
          {filteredParts.length} pièce{filteredParts.length > 1 ? 's' : ''} trouvée{filteredParts.length > 1 ? 's' : ''}
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParts.map((part) => (
          <Card 
            key={part.id} 
            className={`${styles.productCard} rounded-xl p-6 transition-all duration-300`}
            style={{ boxShadow: theme === 'futuriste' ? `0 0 25px ${primaryColor}20` : undefined }}
          >
            {/* Tags */}
            <div className="flex justify-between items-start mb-4">
              <Badge 
                className={`border-0 ${part.type === 'oem' ? styles.badgeOem : styles.badgeAftermarket}`}
                style={{ backgroundColor: part.type === 'oem' && theme !== 'rustique' ? primaryColor : undefined }}
              >
                {part.type === 'oem' ? 'OEM' : 'Aftermarket'}
              </Badge>
              {!part.inStock && (
                <Badge 
                  className={styles.badgeStock}
                  style={{ backgroundColor: theme === 'futuriste' ? `${primaryColor}20` : undefined }}
                >
                  Sur commande
                </Badge>
              )}
            </div>

            {/* Title & Brand */}
            <h4 className={`font-bold text-lg mb-1 ${styles.title}`}>{part.name}</h4>
            <p className={`text-sm mb-3 ${styles.subtitle}`}>{part.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className={`ml-1 text-sm font-semibold ${styles.title}`}>{part.rating}</span>
              </div>
              <span className={`text-sm ${styles.metaText}`}>({part.reviews} avis)</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span 
                  className={`text-2xl font-black ${styles.price}`}
                  style={{ color: theme !== 'rustique' ? primaryColor : undefined }}
                >
                  {part.price.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                </span>
                {part.originalPrice && (
                  <span className={`text-sm line-through ${styles.metaText}`}>
                    {part.originalPrice.toLocaleString('fr-CA', { minimumFractionDigits: 2 })} $
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 mb-4">
              {part.features.slice(0, 3).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${styles.checkIcon}`} />
                  <span className={`text-sm ${styles.text}`}>{feature}</span>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className={`flex items-center gap-4 text-sm mb-4 ${styles.metaText}`}>
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>{part.warranty}</span>
              </div>
              {part.inStock && (
                <div className={`flex items-center gap-1 ${styles.stockIcon}`}>
                  <Package className="w-4 h-4" />
                  <span>En stock</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button 
              className={`w-full rounded-lg font-semibold ${part.inStock ? styles.buttonPrimary : styles.buttonSecondary}`}
              style={{ 
                backgroundColor: part.inStock && theme !== 'rustique' ? primaryColor : undefined,
                boxShadow: part.inStock && theme === 'futuriste' ? `0 0 15px ${primaryColor}40` : undefined
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {part.inStock ? 'Ajouter au panier' : 'Commander'}
            </Button>
          </Card>
        ))}
      </div>

      {filteredParts.length === 0 && (
        <Card className={`${styles.emptyCard} rounded-xl p-16 text-center`}>
          <Package className={`w-16 h-16 mx-auto mb-4 ${styles.metaText}`} />
          <h4 className={`text-xl font-bold mb-2 ${styles.title}`}>Aucune pièce trouvée</h4>
          <p className={styles.subtitle}>
            Essayez d'ajuster vos filtres pour voir plus de résultats
          </p>
        </Card>
      )}
    </div>
  );
};
