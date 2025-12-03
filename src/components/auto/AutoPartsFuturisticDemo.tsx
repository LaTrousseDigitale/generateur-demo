import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ShoppingCart, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  Shield,
  Headphones,
  Heart,
  Search,
  User,
  Clock,
  ArrowLeft,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";

// Import des images
import heroAuto from "@/assets/hero-auto.jpg";
import categoryLights from "@/assets/category-lights.jpg";
import categoryOils from "@/assets/category-oils-fluids.jpg";
import categoryReplacementParts from "@/assets/category-replacement-parts.jpg";
import categorySmartDevices from "@/assets/category-smart-devices.jpg";
import categoryTools from "@/assets/category-tools.jpg";
import categoryWheelsTires from "@/assets/category-wheels-tires.jpg";
import productBrakePads from "@/assets/product-brake-pads.jpg";
import productMotorOil from "@/assets/product-motor-oil.jpg";
import productSparkPlugs from "@/assets/product-spark-plugs.jpg";
import productAirFilter from "@/assets/product-air-filter.jpg";
import productBattery from "@/assets/product-battery.jpg";
import productShocks from "@/assets/product-shocks.jpg";
import productLedHeadlights from "@/assets/product-led-headlights.jpg";
import productBrakeRotors from "@/assets/product-brake-rotors.jpg";
import productTimingBelt from "@/assets/product-timing-belt.jpg";
import productClutchKit from "@/assets/product-clutch-kit.jpg";
import productRadiator from "@/assets/product-radiator.jpg";
import productAcCompressor from "@/assets/product-ac-compressor.jpg";
import brandBosch from "@/assets/brand-bosch.jpg";
import brandDenso from "@/assets/brand-denso.jpg";
import brandNgk from "@/assets/brand-ngk.jpg";
import brandMonroe from "@/assets/brand-monroe.jpg";
import brandMotorcraft from "@/assets/brand-motorcraft.jpg";
import brandAcdelco from "@/assets/brand-acdelco.jpg";
import promoAutoParts from "@/assets/promo-auto-parts-dark.jpg";

interface AutoPartsFuturisticDemoProps {
  config: {
    companyName: string;
    primaryColor: string;
    accentColor?: string;
    industry: string;
    websiteType?: string;
    features?: string[];
    modules?: string[];
    logoUrl?: string;
  };
  onBack?: () => void;
}

const AutoPartsFuturisticDemo: React.FC<AutoPartsFuturisticDemoProps> = ({ config, onBack }) => {
  const { companyName, primaryColor, logoUrl } = config;
  const accentColor = config.accentColor || "#F97316";
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setOpenDropdown(null);
  };
  
  const navItems = [
    { label: "Accueil", hasDropdown: false, sectionId: "hero" },
    { label: "Catégories", hasDropdown: true, sectionId: "categories", items: [
      { label: "Freins", sectionId: "categories" },
      { label: "Moteur", sectionId: "categories" },
      { label: "Électrique", sectionId: "categories" },
      { label: "Suspension", sectionId: "categories" }
    ]},
    { label: "Boutique", hasDropdown: true, sectionId: "products", items: [
      { label: "Nouveautés", sectionId: "products" },
      { label: "Promotions", sectionId: "deals" },
      { label: "Meilleures ventes", sectionId: "latest-products" },
      { label: "Marques", sectionId: "brands" }
    ]},
    { label: "Blog", hasDropdown: false, sectionId: "blog" },
    { label: "Contact", hasDropdown: false, sectionId: "contact" },
  ];
  
  const [timeLeft, setTimeLeft] = useState({
    days: 132,
    hours: 4,
    minutes: 56,
    seconds: 23
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) { days = 0; hours = 0; minutes = 0; seconds = 0; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Roues & pneus", image: categoryWheelsTires, count: 245 },
    { name: "Appareils connectés", image: categorySmartDevices, count: 89 },
    { name: "Huiles & fluides", image: categoryOils, count: 156 },
    { name: "Outils", image: categoryTools, count: 312 },
    { name: "Pièces de rechange", image: categoryReplacementParts, count: 523 },
    { name: "Éclairage", image: categoryLights, count: 178 },
  ];

  const featuredProducts = [
    { name: "Plaquettes de frein céramique", price: 129.99, oldPrice: 159.99, image: productBrakePads, rating: 4.8 },
    { name: "Filtre à air performance", price: 34.99, oldPrice: 49.99, image: productAirFilter, rating: 4.6 },
    { name: "Amortisseurs sport", price: 199.99, oldPrice: 249.99, image: productShocks, rating: 4.9 },
    { name: "Turbo compresseur", price: 599.99, oldPrice: 749.99, image: productRadiator, rating: 4.7 },
  ];

  const dealProducts = [
    { 
      name: "Kit d'éclairage LED complet", 
      price: 1299.00, 
      oldPrice: 1599.00,
      discount: 45,
      image: productLedHeadlights 
    },
    { 
      name: "Freins haute performance", 
      price: 899.00, 
      oldPrice: 1199.00,
      discount: 25,
      image: productBrakeRotors 
    },
  ];

  const latestProducts = [
    { name: "Kit de freins avant complet", price: 89.99, oldPrice: 119.99, image: productBrakePads, rating: 4.5 },
    { name: "Amortisseurs premium", price: 149.99, oldPrice: 189.99, image: productShocks, rating: 4.7 },
    { name: "Filtre à air sport", price: 39.99, oldPrice: 54.99, image: productAirFilter, rating: 4.4 },
    { name: "Kit de suspension", price: 299.99, oldPrice: 399.99, image: productTimingBelt, rating: 4.8 },
  ];

  const blogPosts = [
    {
      title: "L'avenir des pièces auto connectées",
      excerpt: "Découvrez comment l'IoT transforme l'industrie automobile et les pièces intelligentes.",
      image: heroAuto,
      date: "15 Nov 2024"
    },
    {
      title: "Guide des pneus haute performance",
      excerpt: "Tout ce que vous devez savoir pour choisir vos pneus sportifs.",
      image: promoAutoParts,
      date: "12 Nov 2024"
    },
    {
      title: "Technologies de freinage 2025",
      excerpt: "Les innovations qui révolutionnent la sécurité automobile.",
      image: categoryReplacementParts,
      date: "8 Nov 2024"
    },
  ];

  const brands = [
    { name: "Bosch", logo: brandBosch },
    { name: "Denso", logo: brandDenso },
    { name: "NGK", logo: brandNgk },
    { name: "Monroe", logo: brandMonroe },
    { name: "Motorcraft", logo: brandMotorcraft },
    { name: "ACDelco", logo: brandAcdelco },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950/50 to-slate-950 text-white">
      {/* Main Header */}
      <header className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between mb-4">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              )}
              <div className="flex items-center gap-3">
                {logoUrl ? (
                  <img src={logoUrl} alt={companyName} className="h-10 object-contain" />
                ) : (
                  <>
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: accentColor }}
                    >
                      A
                    </div>
                    <span className="text-lg font-semibold text-white">
                      {companyName || "AutoParts Pro"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full bg-slate-800/80 rounded-full py-3 pl-12 pr-4 text-sm text-white placeholder:text-slate-400 border-none focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-slate-300 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="relative text-white hover:text-slate-300 transition-colors">
                <ShoppingCart className="w-6 h-6" />
                <span 
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white"
                  style={{ background: accentColor }}
                >
                  3
                </span>
              </button>
              <Button 
                className="rounded-full px-5 py-2 text-sm font-medium"
                style={{ background: accentColor }}
              >
                Mon compte
              </Button>
            </div>
          </div>

          {/* Secondary Navigation */}
          <nav className="flex items-center gap-8">
            {["Tous", "Nouveautés", "Promotions", "Meilleures ventes", "Premium"].map((item, idx) => (
              <button
                key={item}
                className={`text-sm font-medium transition-colors bg-transparent border-none cursor-pointer ${
                  idx === 0 ? "" : "text-slate-400 hover:text-white"
                }`}
                style={idx === 0 ? { color: accentColor } : {}}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[600px] overflow-hidden -mt-4">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-red-950/30 to-red-900/20" />
        
        {/* Subtle glow */}
        <div 
          className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15"
          style={{ background: accentColor }}
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex items-center min-h-[550px]">
          {/* Left Content */}
          <div className="max-w-lg flex-shrink-0">
            <Badge 
              className="mb-6 px-4 py-2 text-sm border-0 rounded-full inline-flex items-center gap-2"
              style={{ background: accentColor, color: "white" }}
            >
              <Zap className="w-4 h-4" />
              Livraison express 24h
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
              Pièces auto
              <span 
                className="block"
                style={{ color: accentColor }}
              >
                premium
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              Trouvez les pièces parfaites pour votre véhicule
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                size="lg"
                className="px-6 py-5 text-sm rounded-full flex items-center gap-2"
                style={{ background: accentColor }}
              >
                <ShoppingCart className="w-4 h-4" />
                Voir la boutique
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="px-6 py-5 text-sm rounded-full border-white/30 bg-transparent hover:bg-white/10 text-white"
              >
                <span className="mr-2">▶</span>
                Voir la vidéo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {["JD", "ML", "PB", "SL"].map((initials, idx) => (
                  <div 
                    key={idx}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-slate-950"
                    style={{ background: accentColor }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="text-slate-400 text-sm">+50 000 clients satisfaits</span>
            </div>
          </div>

          {/* Right Content - Floating Cards Composition */}
          <div className="flex-1 relative hidden lg:block ml-8">
            {/* Central Car Image Container */}
            <div className="relative w-full h-[450px]">
              {/* Main car display area - white background card */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[320px] bg-gradient-to-br from-white to-slate-100 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src={heroAuto} 
                  alt="Véhicule" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating product card - Top Right */}
              <div 
                className="absolute -top-4 right-4 w-44 bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl transform rotate-6"
              >
                <div className="relative">
                  <Badge 
                    className="absolute -top-2 -left-2 text-xs border-0 px-2"
                    style={{ background: accentColor }}
                  >
                    -30%
                  </Badge>
                  <img src={productShocks} alt="Amortisseurs" className="w-full h-20 object-cover rounded-lg mb-2" />
                </div>
                <p className="text-white text-xs font-medium">Amortisseurs racing</p>
                <p style={{ color: accentColor }} className="font-bold text-sm">449,99 $</p>
              </div>
              
              {/* Floating product card - Bottom Left */}
              <div 
                className="absolute bottom-16 -left-4 w-40 bg-white/10 backdrop-blur-xl rounded-2xl p-3 border border-white/20 shadow-xl transform -rotate-6"
              >
                <img src={productAirFilter} alt="Filtre" className="w-full h-16 object-cover rounded-lg mb-2" />
                <p className="text-white text-xs font-medium">Filtre à air sport</p>
                <p style={{ color: accentColor }} className="font-bold text-sm">89,99 $</p>
              </div>
              
              {/* Floating product card - Bottom Center */}
              <div 
                className="absolute bottom-4 left-1/2 -translate-x-1/3 w-36 bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-xl"
              >
                <img src={productBrakePads} alt="Jante" className="w-full h-14 object-cover rounded-lg mb-1" />
                <p className="text-white text-xs font-medium truncate">Jante sportive</p>
                <p style={{ color: accentColor }} className="font-bold text-sm">299,99 $</p>
              </div>

              {/* Floating action button */}
              <button 
                className="absolute bottom-24 right-8 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                style={{ background: accentColor }}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </button>
              
              {/* Decorative dots */}
              <div className="absolute top-20 right-1/3 w-3 h-3 rounded-full bg-white/50" />
              <div className="absolute top-32 right-1/4 w-2 h-2 rounded-full" style={{ background: accentColor }} />
            </div>
          </div>
        </div>
        
        {/* CSS for float animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(var(--rotation, 0deg)); }
            50% { transform: translateY(-15px) rotate(var(--rotation, 0deg)); }
          }
        `}</style>
      </section>

      {/* Categories Grid */}
      <section id="categories" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Nos <span style={{ color: accentColor }}>catégories</span>
            </h2>
            <p className="text-slate-400 text-lg">Trouvez exactement ce dont vous avez besoin</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-white text-center mb-1">{cat.name}</h3>
                  <p className="text-xs text-slate-400 text-center">{cat.count} produits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Produits <span style={{ color: accentColor }}>vedettes</span>
              </h2>
              <p className="text-slate-400">Les meilleurs choix de nos clients</p>
            </div>
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg">
              Voir tout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <Card 
                key={idx} 
                className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge 
                    className="absolute top-3 left-3 border-0"
                    style={{ background: `${accentColor}`, color: "white" }}
                  >
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </Badge>
                  <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4" 
                        fill={i < Math.floor(product.rating) ? accentColor : "transparent"}
                        color={accentColor}
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">({product.rating})</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-opacity-90">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                    <span className="text-sm text-slate-500 line-through">{product.oldPrice.toFixed(2)} $</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section with Countdown */}
      <section id="deals" className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%)` 
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4 px-4 py-2 border-0 backdrop-blur-xl"
              style={{ background: `${accentColor}30`, color: accentColor }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Offre limitée
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Offres <span style={{ color: accentColor }}>spéciales</span>
            </h2>
            
            {/* Countdown */}
            <div className="flex justify-center gap-4 mt-6">
              {[
                { value: timeLeft.days, label: "Jours" },
                { value: timeLeft.hours, label: "Heures" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Sec" },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 min-w-[80px]"
                >
                  <div className="text-3xl font-bold" style={{ color: accentColor }}>
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-slate-400 uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dealProducts.map((product, idx) => (
              <Card 
                key={idx}
                className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden flex flex-col md:flex-row hover:bg-white/10 transition-all duration-300"
              >
                <div className="md:w-1/2 aspect-square md:aspect-auto relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className="absolute top-4 left-4 px-4 py-2 border-0 text-lg font-bold"
                    style={{ background: accentColor }}
                  >
                    -{product.discount}%
                  </Badge>
                </div>
                <div className="md:w-1/2 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{product.name}</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold" style={{ color: accentColor }}>
                      {product.price.toFixed(2)} $
                    </span>
                    <span className="text-lg text-slate-500 line-through">
                      {product.oldPrice.toFixed(2)} $
                    </span>
                  </div>
                  <Button 
                    className="w-full py-6 rounded-lg shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})` }}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section id="latest-products" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">
              Dernières <span style={{ color: accentColor }}>nouveautés</span>
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-white/20 bg-white/5 hover:bg-white/10 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product, idx) => (
              <Card 
                key={idx} 
                className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <Button 
                      size="sm"
                      className="rounded-lg"
                      style={{ background: accentColor }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                    <span className="text-sm text-slate-500 line-through">{product.oldPrice.toFixed(2)} $</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nos <span style={{ color: accentColor }}>marques</span>
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {brands.map((brand, idx) => (
              <div 
                key={idx}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-12 object-contain opacity-70 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Notre <span style={{ color: accentColor }}>blog</span>
            </h2>
            <p className="text-slate-400 text-lg">Conseils, guides et actualités automobiles</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Card 
                key={idx}
                className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-opacity-90">{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm"
                    style={{ color: accentColor }}
                  >
                    Lire la suite
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="py-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Livraison rapide", desc: "Partout au Canada" },
              { icon: Shield, title: "Paiement sécurisé", desc: "100% protégé" },
              { icon: Headphones, title: "Support 24/7", desc: "Assistance continue" },
              { icon: Clock, title: "Retours faciles", desc: "30 jours garantis" },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${accentColor}20` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: accentColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${accentColor}, ${primaryColor})` }}
                >
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{companyName || "FUTURAUTO"}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Votre destination pour les pièces automobiles de qualité supérieure et les technologies de pointe.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Liens rapides</h4>
              <ul className="space-y-2">
                {["À propos", "Contact", "FAQ", "Retours"].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-white mb-4">Catégories</h4>
              <ul className="space-y-2">
                {["Freins", "Moteur", "Électrique", "Suspension"].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: accentColor }} />
                  1-888-FUTUR-AUTO
                </li>
                <li>info@futurauto.ca</li>
                <li>Montréal, QC, Canada</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-slate-500 text-sm">
            © 2024 {companyName || "FuturAuto"}. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoPartsFuturisticDemo;
