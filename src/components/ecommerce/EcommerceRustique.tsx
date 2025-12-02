import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Heart, Star, ArrowRight, Truck, Shield, Award,
  Package, Leaf, Clock, MapPin, Quote
} from "lucide-react";
import { useState } from "react";

interface EcommerceRustiqueProps {
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
 * RUSTIQUE: Warm, textured, bento-style layout, organic shapes
 * - Bento grid hero with multiple images
 * - Earthy colors, wood textures, grain overlay
 * - Curved corners, warm shadows
 * - Story-driven product presentation
 */
export const EcommerceRustique = ({ 
  config, products, heroContent, heroImage, scrollY, onAddToCart 
}: EcommerceRustiqueProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const values = [
    { icon: Leaf, title: "Artisanal", desc: "Fait avec passion" },
    { icon: Award, title: "Qualité", desc: "Matériaux nobles" },
    { icon: Clock, title: "Tradition", desc: "Savoir-faire ancestral" },
    { icon: MapPin, title: "Local", desc: "Production locale" },
  ];

  return (
    <div className="bg-stone-950 min-h-screen text-stone-100 relative overflow-hidden">
      {/* Grain texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* HERO: Bento grid layout */}
      <section className="min-h-screen p-4 lg:p-8">
        <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[calc(100vh-4rem)] max-h-[900px]">
          
          {/* Main title block */}
          <div className="col-span-12 lg:col-span-5 row-span-3 bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-between border border-amber-900/20">
            <div>
              <Badge className="mb-6 bg-amber-900/30 text-amber-200 border border-amber-800/30 px-4 py-2">
                <Leaf className="w-4 h-4 mr-2" />
                {heroContent.badge}
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-black text-amber-50 leading-[0.9] mb-6">
                {heroContent.title.split('\n').map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="text-lg text-stone-400 max-w-md">
                {heroContent.subtitle}
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Button 
                size="lg"
                className="rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold px-8"
              >
                Découvrir
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Main image */}
          <div className="col-span-12 lg:col-span-7 row-span-4 rounded-3xl overflow-hidden relative group">
            <img 
              src={heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ transform: `scale(1.02) translateY(${scrollY * 0.05}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            
            {/* Floating product card */}
            <div className="absolute bottom-6 left-6 right-6 bg-stone-900/90 backdrop-blur-xl rounded-2xl p-6 border border-amber-900/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-400 text-sm font-medium mb-1">Produit vedette</p>
                  <h3 className="text-2xl font-bold text-amber-50">Collection signature</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-stone-400 text-sm">4.9 (234 avis)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-amber-400">279,99 $</span>
                  <Button 
                    className="mt-3 rounded-full bg-amber-700 hover:bg-amber-600 text-white w-full"
                    onClick={onAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Value cards */}
          {values.slice(0, 2).map((value, i) => (
            <div 
              key={i}
              className="col-span-6 lg:col-span-2 lg:col-start-1 row-span-1 bg-stone-900/50 rounded-2xl p-5 border border-amber-900/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <value.icon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-amber-50">{value.title}</h4>
                <p className="text-sm text-stone-500">{value.desc}</p>
              </div>
            </div>
          ))}

          {/* Small feature card */}
          <div className="col-span-12 lg:col-span-3 row-span-2 bg-gradient-to-br from-amber-900/30 to-stone-900 rounded-3xl p-6 border border-amber-800/30 flex flex-col justify-between">
            <Quote className="w-10 h-10 text-amber-600" />
            <div>
              <p className="text-lg text-stone-300 italic mb-4">
                "Une qualité exceptionnelle, des produits authentiques qui racontent une histoire."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold">
                  MC
                </div>
                <div>
                  <p className="font-semibold text-amber-50">Marie C.</p>
                  <p className="text-sm text-stone-500">Cliente fidèle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS: Card stack with hover reveal */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-amber-900/30 text-amber-200 border border-amber-800/30 px-6 py-2">
              Notre sélection
            </Badge>
            <h2 className="text-5xl font-black text-amber-50 mb-4">
              Produits d'exception
            </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Chaque produit est soigneusement sélectionné pour sa qualité et son authenticité
            </p>
          </div>

          {/* Horizontal scroll products */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4">
            {products.map((product, i) => (
              <div 
                key={i}
                className="flex-shrink-0 w-80 snap-center"
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div 
                  className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl overflow-hidden border border-amber-900/20 transition-all duration-500"
                  style={{
                    transform: hoveredProduct === i ? 'translateY(-12px) scale(1.02)' : 'translateY(0)',
                    boxShadow: hoveredProduct === i 
                      ? '0 25px 50px -12px rgba(180, 83, 9, 0.3)' 
                      : '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{ transform: hoveredProduct === i ? 'scale(1.1)' : 'scale(1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                    
                    {/* Tag */}
                    {product.tag && (
                      <Badge className="absolute top-4 left-4 bg-amber-700 text-white border-0">
                        {product.tag}
                      </Badge>
                    )}

                    {/* Quick actions */}
                    <div className={`absolute top-4 right-4 transition-all duration-300 ${
                      hoveredProduct === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                    }`}>
                      <Button size="icon" className="rounded-full bg-stone-900/80 backdrop-blur-sm text-amber-400 hover:bg-stone-800">
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          className={`w-4 h-4 ${j < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-700'}`} 
                        />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-amber-50 mb-3">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black text-amber-400">{product.price}</span>
                        {product.oldPrice && (
                          <span className="text-sm text-stone-500 line-through ml-2">{product.oldPrice}</span>
                        )}
                      </div>
                      <Button 
                        size="icon"
                        className="rounded-full bg-amber-700 hover:bg-amber-600 text-white"
                        onClick={onAddToCart}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES: Icon grid */}
      <section className="py-20 px-4 lg:px-8 bg-stone-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Livraison soignée", desc: "Emballage premium" },
              { icon: Shield, label: "Garantie qualité", desc: "Satisfait ou remboursé" },
              { icon: Leaf, label: "Éco-responsable", desc: "Matériaux durables" },
              { icon: Award, label: "Fait main", desc: "Artisanat authentique" },
            ].map((item, i) => (
              <div 
                key={i}
                className="text-center p-6 rounded-2xl bg-stone-800/50 border border-amber-900/20"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-900/30 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h4 className="font-bold text-amber-50 mb-1">{item.label}</h4>
                <p className="text-sm text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Full-width with texture */}
      <section className="py-24 px-4 lg:px-8 relative">
        <div 
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-amber-900/40 to-stone-900 rounded-3xl p-12 lg:p-16 border border-amber-800/30"
        >
          <Package className="w-16 h-16 mx-auto mb-6 text-amber-400" />
          <h2 className="text-4xl lg:text-5xl font-black text-amber-50 mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-stone-400 mb-8 max-w-xl mx-auto">
            Recevez nos nouveautés et offres exclusives en avant-première.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 px-6 py-4 rounded-full bg-stone-800 border border-amber-900/30 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-700"
            />
            <Button className="rounded-full bg-amber-700 hover:bg-amber-600 text-white px-8">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
