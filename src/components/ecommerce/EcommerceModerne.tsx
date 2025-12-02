import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Search, Heart, Star, ArrowRight, Truck, Shield,
  RotateCcw, CreditCard, Package, Play, Sparkles, Grid3X3, List
} from "lucide-react";
import { useState } from "react";

interface EcommerceModerneProps {
  config: {
    primaryColor: string;
    accentColor: string;
    companyName: string;
    logo: string | null;
    industry: string;
  };
  products: Array<{ name: string; price: string; oldPrice: string; rating: number; image: string; tag: string }>;
  heroContent: { title: string; subtitle: string; badge: string };
  heroImage: string;
  scrollY: number;
  onAddToCart: () => void;
}

/**
 * MODERNE: Clean, minimal, lots of whitespace, asymmetric grid, floating elements
 * - Horizontal scroll product showcase
 * - Minimal navigation with search focus
 * - Large typography, soft shadows
 * - Masonry-style grid for products
 */
export const EcommerceModerne = ({ 
  config, products, heroContent, heroImage, scrollY, onAddToCart 
}: EcommerceModerneProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const features = [
    { icon: Truck, label: "Livraison gratuite" },
    { icon: Shield, label: "Garantie 2 ans" },
    { icon: RotateCcw, label: "Retours 30 jours" },
    { icon: CreditCard, label: "Paiement sécurisé" },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO: Split screen with large product image */}
      <section className="min-h-screen grid lg:grid-cols-2">
        {/* Left: Content - asymmetric padding */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-20 lg:py-0">
          {/* Floating badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 mb-8 w-fit"
          >
            <Sparkles className="w-4 h-4" style={{ color: config.primaryColor }} />
            <span className="text-sm font-medium text-slate-700">{heroContent.badge}</span>
          </div>

          {/* Large title - stacked */}
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.85] mb-6 tracking-tight">
            {heroContent.title.split('\n').map((line, i) => (
              <span 
                key={i} 
                className={`block ${i === 1 ? '' : ''}`}
                style={i === 1 ? { color: config.primaryColor } : {}}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="text-xl text-slate-500 max-w-md mb-10 leading-relaxed">
            {heroContent.subtitle}
          </p>

          {/* CTAs - clean style */}
          <div className="flex gap-4 mb-16">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-6 text-white font-semibold shadow-lg shadow-slate-300"
              style={{ backgroundColor: config.primaryColor }}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Découvrir
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full px-8 py-6 font-semibold border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Play className="w-5 h-5 mr-2" />
              Vidéo
            </Button>
          </div>

          {/* Trust bar - horizontal scroll */}
          <div className="flex gap-8 overflow-x-auto pb-4">
            {features.map((feat, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <feat.icon className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{feat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Full bleed image with floating cards */}
        <div className="relative bg-slate-100 lg:h-screen overflow-hidden">
          <img 
            src={heroImage} 
            alt="Produit vedette" 
            className="w-full h-full object-cover"
            style={{ transform: `scale(1.05) translateY(${scrollY * 0.1}px)` }}
          />
          
          {/* Floating price card - bottom left */}
          <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-2xl shadow-slate-300/50 max-w-xs">
            <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100">-30%</Badge>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Produit vedette</h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-black" style={{ color: config.primaryColor }}>279,99 $</span>
              <span className="text-lg text-slate-400 line-through">399,99 $</span>
            </div>
            <Button 
              className="w-full rounded-full text-white"
              style={{ backgroundColor: config.primaryColor }}
              onClick={onAddToCart}
            >
              Ajouter au panier
            </Button>
          </div>

          {/* Rating card - top right */}
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-900">4.9</span>
            <span className="text-slate-500">(2.3k avis)</span>
          </div>
        </div>
      </section>

      {/* PRODUCTS: Asymmetric masonry grid */}
      <section className="py-24 px-8 lg:px-16 xl:px-24">
        {/* Header with view toggle */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-sm font-medium tracking-wider uppercase mb-2" style={{ color: config.primaryColor }}>
              Collection
            </p>
            <h2 className="text-5xl font-black text-slate-900">
              Nos meilleures ventes
            </h2>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="icon"
              className="rounded-full"
              onClick={() => setViewMode('grid')}
              style={viewMode === 'grid' ? { backgroundColor: config.primaryColor } : {}}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="icon"
              className="rounded-full"
              onClick={() => setViewMode('list')}
              style={viewMode === 'list' ? { backgroundColor: config.primaryColor } : {}}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          : "flex flex-col gap-4"
        }>
          {products.map((product, i) => (
            <div 
              key={i}
              className={`group relative bg-white rounded-3xl overflow-hidden border border-slate-100 transition-all duration-500 ${
                viewMode === 'grid' 
                  ? i === 0 || i === 3 ? 'md:col-span-2 md:row-span-2' : ''
                  : 'flex gap-6'
              }`}
              style={{
                boxShadow: hoveredProduct === i 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                transform: hoveredProduct === i ? 'translateY(-8px)' : 'translateY(0)'
              }}
              onMouseEnter={() => setHoveredProduct(i)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${
                viewMode === 'grid' 
                  ? i === 0 || i === 3 ? 'h-[400px]' : 'h-64'
                  : 'w-48 h-48 flex-shrink-0'
              }`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Tag */}
                {product.tag && (
                  <Badge 
                    className="absolute top-4 left-4 text-white"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {product.tag}
                  </Badge>
                )}
                {/* Quick actions */}
                <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredProduct === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <Button size="icon" className="rounded-full bg-white text-slate-700 hover:bg-slate-100 shadow-lg">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    className="rounded-full text-white shadow-lg"
                    style={{ backgroundColor: config.primaryColor }}
                    onClick={onAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex items-center justify-between' : ''}`}>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-4 h-4 ${j < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-2">{product.rating}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black" style={{ color: config.primaryColor }}>{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-lg text-slate-400 line-through">{product.oldPrice}</span>
                    )}
                  </div>
                </div>
                {viewMode === 'list' && (
                  <Button 
                    className="rounded-full text-white"
                    style={{ backgroundColor: config.primaryColor }}
                    onClick={onAddToCart}
                  >
                    Ajouter
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER: Minimal centered */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center px-8">
          <Package className="w-16 h-16 mx-auto mb-6" style={{ color: config.primaryColor }} />
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Restez informé
          </h2>
          <p className="text-xl text-slate-500 mb-8">
            Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 px-6 py-4 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <Button 
              className="rounded-full px-8 text-white"
              style={{ backgroundColor: config.primaryColor }}
            >
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
