import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, Heart, Star, ArrowRight, Zap, Shield, Cpu,
  Sparkles, Eye, Box, ChevronRight, Play
} from "lucide-react";
import { useState, useEffect } from "react";

interface EcommerceFuturisteProps {
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
 * FUTURISTE: Neon effects, asymmetric layout, floating elements, dynamic animations
 * - Glowing borders and shadows
 * - Glassmorphism cards
 * - Grid lines background
 * - Animated particles
 * - 3D-like transforms
 */
export const EcommerceFuturiste = ({ 
  config, products, heroContent, heroImage, scrollY, onAddToCart 
}: EcommerceFuturisteProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    { value: "50K+", label: "Clients" },
    { value: "99%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
    { value: "4.9★", label: "Rating" },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white relative overflow-hidden">
      {/* Animated grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Cursor glow effect */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/50 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* HERO: Centered with floating cards */}
      <section className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative">
        {/* Glowing orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ 
            background: 'radial-gradient(circle, #6366f1, transparent)',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.1}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ 
            background: 'radial-gradient(circle, #a855f7, transparent)',
            transform: `translate(${scrollY * -0.08}px, ${scrollY * 0.08}px)`,
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Glowing badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 animate-pulse">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">{heroContent.badge}</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          </div>

          {/* Massive title with gradient */}
          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black mb-8 leading-[0.85] tracking-tighter">
            {heroContent.title.split('\n').map((line, i) => (
              <span 
                key={i} 
                className={`block ${i === 1 ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400' : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            {heroContent.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg"
              className="rounded-full px-10 py-7 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(99,102,241,0.7)]"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              Découvrir
              <ChevronRight className="w-6 h-6 ml-2" />
            </Button>
            <Button 
              size="lg"
              className="rounded-full px-10 py-7 text-lg font-bold bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-2" />
              Voir en action
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating product card - left */}
        <div 
          className="hidden lg:block absolute left-8 top-1/3 w-64 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(99,102,241,0.2)]"
          style={{ transform: `translateY(${scrollY * -0.15}px) rotate(-6deg)` }}
        >
          <img src={products[0]?.image} alt="" className="w-full h-40 object-cover" />
          <div className="p-4">
            <p className="font-bold text-white">{products[0]?.name}</p>
            <p className="text-indigo-400 font-bold">{products[0]?.price}</p>
          </div>
        </div>

        {/* Floating product card - right */}
        <div 
          className="hidden lg:block absolute right-8 bottom-1/3 w-72 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.2)]"
          style={{ transform: `translateY(${scrollY * -0.2}px) rotate(4deg)` }}
        >
          <img src={products[1]?.image} alt="" className="w-full h-44 object-cover" />
          <div className="p-4">
            <p className="font-bold text-white">{products[1]?.name}</p>
            <p className="text-purple-400 font-bold">{products[1]?.price}</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS: 3D card grid */}
      <section className="py-24 px-4 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/30 px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Collection 2024
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-black mb-4">
              Produits{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                innovants
              </span>
            </h2>
          </div>

          {/* Products grid with 3D effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div 
                key={i}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  perspective: '1000px',
                }}
              >
                <div 
                  className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500"
                  style={{
                    transform: hoveredProduct === i 
                      ? 'translateY(-16px) rotateX(5deg) scale(1.02)' 
                      : 'translateY(0) rotateX(0deg) scale(1)',
                    boxShadow: hoveredProduct === i 
                      ? '0 50px 100px -20px rgba(99, 102, 241, 0.4), 0 0 50px rgba(99, 102, 241, 0.2)' 
                      : '0 10px 40px -10px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Glowing border on hover */}
                  <div 
                    className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      opacity: hoveredProduct === i ? 1 : 0,
                      background: 'linear-gradient(135deg, rgba(99,102,241,0.5), transparent, rgba(168,85,247,0.5))',
                      padding: '1px',
                      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'xor',
                    }}
                  />

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-all duration-700"
                      style={{ 
                        transform: hoveredProduct === i ? 'scale(1.15)' : 'scale(1)',
                        filter: hoveredProduct === i ? 'brightness(1.1)' : 'brightness(0.9)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    
                    {/* Tag */}
                    {product.tag && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                        {product.tag}
                      </Badge>
                    )}

                    {/* Quick view button */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                      hoveredProduct === i ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Button 
                        className="rounded-full bg-white/20 backdrop-blur-xl text-white border border-white/30 hover:bg-white/30"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        Aperçu rapide
                      </Button>
                    </div>

                    {/* Wishlist */}
                    <Button 
                      size="icon"
                      className={`absolute top-4 right-4 rounded-full bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-300 ${
                        hoveredProduct === i ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                      }`}
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          className={`w-4 h-4 ${j < Math.floor(product.rating) ? 'fill-indigo-400 text-indigo-400' : 'text-slate-700'}`} 
                        />
                      ))}
                      <span className="text-slate-500 text-sm ml-2">{product.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                          {product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-slate-600 line-through ml-2">{product.oldPrice}</span>
                        )}
                      </div>
                      <Button 
                        size="icon"
                        className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
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

      {/* FEATURES: Horizontal scroll with glow */}
      <section className="py-20 px-4 lg:px-8 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, label: "Livraison éclair", desc: "24h chrono" },
              { icon: Shield, label: "Garantie totale", desc: "2 ans inclus" },
              { icon: Cpu, label: "Tech avancée", desc: "Dernière génération" },
              { icon: Box, label: "Emballage premium", desc: "Éco-responsable" },
            ].map((item, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center group hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <h4 className="font-bold text-white mb-1">{item.label}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Glowing box */}
      <section className="py-24 px-4 lg:px-8">
        <div 
          className="max-w-4xl mx-auto text-center p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-white/10 relative overflow-hidden"
          style={{ boxShadow: '0 0 100px rgba(99, 102, 241, 0.3)' }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
          
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              Rejoignez le{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                futur
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-xl mx-auto">
              Accédez en avant-première à nos innovations et offres exclusives.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
              />
              <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                Go
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
