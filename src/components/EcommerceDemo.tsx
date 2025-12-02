import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { 
  ArrowLeft, Download, Share2, ShoppingCart, Search, Heart, Star, 
  TrendingUp, Filter, ChevronRight, Menu, ArrowRight, Truck, Shield,
  RotateCcw, CreditCard, ChevronDown, X, Eye, Zap, Package, Clock,
  CheckCircle2, Sparkles, Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { DemoFeaturesDisplay } from "./DemoFeaturesDisplay";
import { VehicleSearchWidget } from "./auto/VehicleSearchWidget";
import { PartsCompatibilityChecker } from "./auto/PartsCompatibilityChecker";
import { PartsDiagramsViewer } from "./auto/PartsDiagramsViewer";
import { OEMAftermarketCatalog } from "./auto/OEMAftermarketCatalog";
import { getThemeStyles, type DemoTheme } from "@/types/demoThemes";

// Import product images
import productAuto1 from "@/assets/product-auto-1.jpg";
import productAuto2 from "@/assets/product-auto-2.jpg";
import productAuto3 from "@/assets/product-auto-3.jpg";
import productAuto4 from "@/assets/product-auto-4.jpg";
import productRestaurant1 from "@/assets/product-restaurant-1.jpg";
import productRestaurant2 from "@/assets/product-restaurant-2.jpg";
import productRestaurant3 from "@/assets/product-restaurant-3.jpg";
import productArchitecture1 from "@/assets/product-architecture-1.jpg";
import productArchitecture2 from "@/assets/product-architecture-2.jpg";
import productConstruction1 from "@/assets/product-construction-1.jpg";
import productConstruction2 from "@/assets/product-construction-2.jpg";
import productHealth1 from "@/assets/product-health-1.jpg";
import productHealth2 from "@/assets/product-health-2.jpg";

interface EcommerceDemoProps {
  config: DemoConfig;
  onBack: () => void;
}

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, trigger: boolean = false) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!trigger) return;
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  
  return count;
};

export const EcommerceDemo = ({ config, onBack }: EcommerceDemoProps) => {
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(3);
  const [selectedVehicle, setSelectedVehicle] = useState<{ year: string; make: string; model: string } | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setStatsVisible(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  const counter1 = useCountUp(50000, 2000, statsVisible);
  const counter2 = useCountUp(99, 1500, statsVisible);
  const counter3 = useCountUp(24, 1000, statsVisible);
  const counter4 = useCountUp(30, 1200, statsVisible);

  const handleVehicleSearch = (year: string, make: string, model: string) => {
    setSelectedVehicle({ year, make, model });
    toast({
      title: "Véhicule sélectionné",
      description: `${year} ${make} ${model} - Pièces compatibles affichées`
    });
  };

  const handleExport = () => {
    toast({ title: "Export en cours", description: "Votre démo sera prête dans quelques instants" });
  };

  const handleShare = () => {
    toast({ title: "Lien de partage créé", description: "Le lien a été copié dans votre presse-papiers" });
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    toast({ title: "Ajouté au panier!", description: "Voir votre panier pour finaliser" });
  };

  // Industry hero content
  const industryHero = {
    auto: { 
      title: "Pièces auto\npremium", 
      subtitle: "Trouvez les pièces parfaites pour votre véhicule",
      badge: "Livraison express 24h"
    },
    "pieces-auto": { 
      title: "Pièces détachées\nde qualité", 
      subtitle: "OEM et aftermarket pour tous véhicules",
      badge: "Garantie 2 ans"
    },
    restauration: { 
      title: "Saveurs\nd'exception", 
      subtitle: "Commandez les meilleurs plats en quelques clics",
      badge: "Livraison gratuite dès 30$"
    },
    commerce: { 
      title: "Collections\nexclusives", 
      subtitle: "Découvrez nos nouveautés de saison",
      badge: "Nouveautés chaque semaine"
    },
    architecture: { 
      title: "Designs\nd'intérieur", 
      subtitle: "Mobilier et décoration haut de gamme",
      badge: "Livraison et installation"
    },
    construction: { 
      title: "Équipement\nprofessionnel", 
      subtitle: "Outillage et matériaux de qualité pro",
      badge: "Prix professionnel"
    },
    sante: { 
      title: "Bien-être\nau quotidien", 
      subtitle: "Produits naturels et compléments santé",
      badge: "Conseils d'experts"
    },
  };

  const heroContent = industryHero[config.industry as keyof typeof industryHero] || industryHero.commerce;

  // Hero images by industry
  const industryHeroImages = {
    auto: productAuto1,
    "pieces-auto": productAuto1,
    restauration: productRestaurant1,
    architecture: productArchitecture1,
    construction: productConstruction1,
    sante: productHealth1,
    commerce: productArchitecture1
  };
  const heroImage = industryHeroImages[config.industry as keyof typeof industryHeroImages] || productArchitecture1;

  // Products by industry
  const getProducts = () => {
    const baseProducts = {
      commerce: [
        { name: "Collection Prestige", price: "299,99 $", oldPrice: "399,99 $", rating: 4.9, image: productArchitecture1, tag: "Bestseller" },
        { name: "Édition Limitée", price: "449,99 $", oldPrice: "599,99 $", rating: 4.8, image: productArchitecture2, tag: "Nouveau" },
        { name: "Classic Premium", price: "199,99 $", oldPrice: "249,99 $", rating: 4.7, image: productConstruction1, tag: "-20%" },
        { name: "Signature Line", price: "599,99 $", oldPrice: "799,99 $", rating: 5.0, image: productConstruction2, tag: "Exclusif" },
      ],
      auto: [
        { name: "Kit freinage performance", price: "249,99 $", oldPrice: "329,99 $", rating: 4.8, image: productAuto1, tag: "Bestseller" },
        { name: "Filtre à air sport", price: "89,99 $", oldPrice: "119,99 $", rating: 4.9, image: productAuto2, tag: "Promo" },
        { name: "Amortisseurs racing", price: "449,99 $", oldPrice: "599,99 $", rating: 4.7, image: productAuto3, tag: "Premium" },
        { name: "Batterie haute capacité", price: "179,99 $", oldPrice: "229,99 $", rating: 4.8, image: productAuto4, tag: "Garantie 3 ans" },
      ],
      restauration: [
        { name: "Menu Dégustation", price: "89,00 $", oldPrice: "120,00 $", rating: 5.0, image: productRestaurant1, tag: "Chef's pick" },
        { name: "Box Gourmet", price: "65,00 $", oldPrice: "85,00 $", rating: 4.9, image: productRestaurant2, tag: "Nouveau" },
        { name: "Coffret Découverte", price: "45,00 $", oldPrice: "60,00 $", rating: 4.8, image: productRestaurant3, tag: "Populaire" },
        { name: "Pack Premium", price: "129,00 $", oldPrice: "169,00 $", rating: 4.9, image: productRestaurant1, tag: "Exclusif" },
      ],
      sante: [
        { name: "Pack Vitalité", price: "79,99 $", oldPrice: "99,99 $", rating: 4.9, image: productHealth1, tag: "Bestseller" },
        { name: "Cure Détox", price: "59,99 $", oldPrice: "79,99 $", rating: 4.8, image: productHealth2, tag: "Naturel" },
        { name: "Coffret Bien-être", price: "149,99 $", oldPrice: "199,99 $", rating: 4.7, image: productHealth1, tag: "Complet" },
        { name: "Essentiels Santé", price: "39,99 $", oldPrice: "54,99 $", rating: 4.9, image: productHealth2, tag: "Promo" },
      ],
    };
    return baseProducts[config.industry as keyof typeof baseProducts] || baseProducts.commerce;
  };

  const products = getProducts();
  const categories = ["Tous", "Nouveautés", "Promotions", "Meilleures ventes", "Premium"];

  const features = [
    { icon: Truck, title: "Livraison gratuite", desc: "Dès 75$ d'achat" },
    { icon: Shield, title: "Garantie 2 ans", desc: "Sur tous les produits" },
    { icon: RotateCcw, title: "Retours gratuits", desc: "30 jours pour changer d'avis" },
    { icon: CreditCard, title: "Paiement sécurisé", desc: "Carte, PayPal, Apple Pay" },
  ];

  // Theme configuration
  const theme = config.theme || "moderne";
  
  const getThemeConfig = () => {
    switch(theme) {
      case "moderne":
        return {
          pageBg: "bg-white",
          heroOverlay: "bg-gradient-to-r from-white via-white/95 to-transparent",
          headerBg: "bg-white/90 backdrop-blur-xl border-b border-slate-100",
          cardBg: "bg-white border border-slate-100 shadow-xl shadow-slate-200/50",
          cardHover: "hover:shadow-2xl hover:-translate-y-2",
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          textMuted: "text-slate-400",
          sectionBg: "bg-slate-50",
          inputBg: "bg-slate-100",
          badgeStyle: "bg-slate-100 text-slate-700",
          buttonStyle: "shadow-lg hover:shadow-xl",
        };
      case "rustique":
        return {
          pageBg: "bg-stone-950",
          heroOverlay: "bg-gradient-to-r from-stone-950 via-stone-950/95 to-transparent",
          headerBg: "bg-stone-900/90 backdrop-blur-xl border-b border-amber-900/20",
          cardBg: "bg-gradient-to-br from-stone-900 to-stone-800 border border-amber-800/20",
          cardHover: "hover:border-amber-700/40 hover:-translate-y-2",
          textPrimary: "text-amber-50",
          textSecondary: "text-stone-300",
          textMuted: "text-stone-500",
          sectionBg: "bg-stone-900",
          inputBg: "bg-stone-800",
          badgeStyle: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
          buttonStyle: "shadow-lg shadow-amber-900/30",
        };
      case "futuriste":
        return {
          pageBg: "bg-slate-950",
          heroOverlay: "bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent",
          headerBg: "bg-slate-950/80 backdrop-blur-xl border-b border-white/10",
          cardBg: "bg-white/5 backdrop-blur-2xl border border-white/10",
          cardHover: "hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)]",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-500",
          sectionBg: "bg-slate-900/50",
          inputBg: "bg-white/5",
          badgeStyle: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/30",
          buttonStyle: "shadow-[0_0_30px_rgba(99,102,241,0.4)]",
        };
      default:
        return {
          pageBg: "bg-slate-950",
          heroOverlay: "bg-slate-950/80",
          headerBg: "bg-slate-900/90 backdrop-blur-xl",
          cardBg: "bg-slate-900 border border-white/10",
          cardHover: "hover:bg-slate-800",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-500",
          sectionBg: "bg-slate-900",
          inputBg: "bg-slate-800",
          badgeStyle: "bg-slate-800 text-slate-200",
          buttonStyle: "",
        };
    }
  };

  const themeConfig = getThemeConfig();

  return (
    <div className={`min-h-screen ${themeConfig.pageBg} overflow-hidden`}>
      
      {/* ═══════════════════════════════════════════════════════════════
          PREMIUM NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? themeConfig.headerBg : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                >
                  {config.companyName.charAt(0)}
                </div>
              )}
              <span className={`font-bold text-xl hidden sm:block ${scrollY > 50 ? themeConfig.textPrimary : (theme === "moderne" ? 'text-slate-900' : 'text-white')}`}>
                {config.companyName}
              </span>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${themeConfig.textMuted}`} />
                <input 
                  type="text" 
                  placeholder="Rechercher un produit..." 
                  className={`w-full pl-12 pr-4 py-3 rounded-full ${themeConfig.inputBg} ${themeConfig.textPrimary} border-0 focus:outline-none focus:ring-2 transition-all`}
                  style={{ boxShadow: scrollY > 50 ? undefined : '0 4px 20px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className={scrollY > 50 ? themeConfig.textSecondary : (theme === "moderne" ? 'text-slate-700' : 'text-white/80')}>
                <Heart className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={`relative ${scrollY > 50 ? themeConfig.textSecondary : (theme === "moderne" ? 'text-slate-700' : 'text-white/80')}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button 
                className={`rounded-full px-6 text-white hidden sm:flex ${themeConfig.buttonStyle}`}
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                Mon compte
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className={`lg:hidden ${scrollY > 50 ? themeConfig.textPrimary : (theme === "moderne" ? 'text-slate-900' : 'text-white')}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Categories bar */}
          <div className={`hidden lg:flex items-center gap-6 pb-4 transition-opacity duration-300 ${scrollY > 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {categories.map((cat, i) => (
              <button 
                key={i}
                className={`text-sm font-medium transition-colors relative group ${
                  i === 0 
                    ? '' 
                    : theme === "moderne" ? 'text-slate-600 hover:text-slate-900' : 'text-white/70 hover:text-white'
                }`}
                style={i === 0 ? { color: config.primaryColor } : {}}
              >
                {cat}
                {i === 0 && (
                  <span 
                    className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden ${themeConfig.headerBg} border-t border-white/10`}>
            <div className="container mx-auto px-4 py-4">
              <div className="relative mb-4">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${themeConfig.textMuted}`} />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className={`w-full pl-12 pr-4 py-3 rounded-full ${themeConfig.inputBg} ${themeConfig.textPrimary} border-0`}
                />
              </div>
              <div className="space-y-2">
                {categories.map((cat, i) => (
                  <a 
                    key={i}
                    href="#"
                    className={`block py-2 text-lg font-medium ${themeConfig.textSecondary}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="fixed top-6 left-6 z-50 bg-black/30 backdrop-blur-md text-white hover:bg-black/50 rounded-full shadow-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Split layout with product showcase
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background gradient */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: theme === "moderne" 
              ? `linear-gradient(135deg, ${config.primaryColor}08 0%, ${config.accentColor}05 50%, white 100%)`
              : theme === "rustique"
              ? `linear-gradient(135deg, ${config.primaryColor}15 0%, transparent 50%)`
              : `linear-gradient(135deg, ${config.primaryColor}20 0%, transparent 30%, ${config.accentColor}10 100%)`
          }}
        />

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
            style={{ 
              backgroundColor: config.primaryColor,
              transform: `translateY(${scrollY * 0.2}px)`,
              animation: 'pulse 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
            style={{ 
              backgroundColor: config.accentColor,
              transform: `translateY(${scrollY * -0.15}px)`,
              animation: 'pulse 6s ease-in-out infinite 2s'
            }}
          />
          {theme === "futuriste" && (
            <>
              <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-indigo-400 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
            </>
          )}
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)`,
                  border: `1px solid ${config.primaryColor}30`
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: config.primaryColor }} />
                <span className={`font-medium text-sm ${themeConfig.textPrimary}`}>{heroContent.badge}</span>
              </div>

              {/* Title */}
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tight ${themeConfig.textPrimary}`}>
                {heroContent.title.split('\n').map((line, i) => (
                  <span 
                    key={i}
                    className={`block animate-fade-in ${i === 1 ? 'bg-clip-text text-transparent' : ''}`}
                    style={{ 
                      animationDelay: `${i * 0.15}s`,
                      ...(i === 1 && { backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` })
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {/* Subtitle */}
              <p className={`text-xl mb-8 animate-fade-in ${themeConfig.textSecondary}`} style={{ animationDelay: '0.3s' }}>
                {heroContent.subtitle}
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button 
                  size="lg"
                  className={`rounded-full px-8 py-6 text-lg font-semibold text-white group ${themeConfig.buttonStyle}`}
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Voir la boutique
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className={`rounded-full px-8 py-6 text-lg font-semibold ${
                    theme === "moderne" 
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-100' 
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Voir la vidéo
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                      style={{ 
                        borderColor: theme === "moderne" ? 'white' : 'rgba(255,255,255,0.2)',
                        background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`
                      }}
                    >
                      {['JD', 'ML', 'PB', 'SL'][i-1]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" style={{ color: config.accentColor }} />
                    ))}
                  </div>
                  <p className={`text-sm ${themeConfig.textMuted}`}>+50 000 clients satisfaits</p>
                </div>
              </div>
            </div>

            {/* Right - Product showcase */}
            <div className="order-1 lg:order-2 relative">
              {/* Main product card */}
              <div 
                className={`relative rounded-3xl overflow-hidden ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-700`}
                style={{ 
                  transform: `translateY(${scrollY * -0.1}px) rotate(2deg)`,
                }}
              >
                <div className="relative h-[400px] lg:h-[500px]">
                  <img 
                    src={heroImage} 
                    alt="Produit vedette"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-4 left-4">
                    <Badge 
                      className="text-white px-3 py-1"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                    >
                      -30%
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Product info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-white text-2xl font-bold mb-2">Produit vedette</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 line-through">399,99 $</span>
                          <span className="text-white text-3xl font-black">279,99 $</span>
                        </div>
                      </div>
                      <Button 
                        size="lg"
                        className="rounded-full text-white"
                        style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                        onClick={addToCart}
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mini cards */}
              <div 
                className={`absolute -bottom-10 -left-10 w-48 rounded-2xl overflow-hidden shadow-2xl hidden lg:block ${themeConfig.cardBg}`}
                style={{ transform: `translateY(${scrollY * -0.15}px) rotate(-6deg)` }}
              >
                <img src={products[1]?.image} alt="" className="w-full h-32 object-cover" />
                <div className="p-3">
                  <p className={`font-bold text-sm ${themeConfig.textPrimary}`}>{products[1]?.name}</p>
                  <p style={{ color: config.primaryColor }} className="font-bold">{products[1]?.price}</p>
                </div>
              </div>
              <div 
                className={`absolute -top-5 -right-5 w-40 rounded-2xl overflow-hidden shadow-2xl hidden xl:block ${themeConfig.cardBg}`}
                style={{ transform: `translateY(${scrollY * -0.2}px) rotate(8deg)` }}
              >
                <img src={products[2]?.image} alt="" className="w-full h-28 object-cover" />
                <div className="p-3">
                  <p className={`font-bold text-sm ${themeConfig.textPrimary}`}>{products[2]?.name}</p>
                  <p style={{ color: config.primaryColor }} className="font-bold">{products[2]?.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              className={theme === "moderne" ? "fill-slate-50" : theme === "rustique" ? "fill-stone-900" : "fill-slate-900/50"}
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURES BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className={`py-12 ${themeConfig.sectionBg}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className={`flex items-center gap-4 p-4 rounded-2xl ${themeConfig.cardBg} transition-all duration-500`}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <h4 className={`font-bold ${themeConfig.textPrimary}`}>{feature.title}</h4>
                  <p className={`text-sm ${themeConfig.textMuted}`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-specific sections */}
      {config.industry === "auto" && config.autoCompatibility?.includes("Recherche par année/marque/modèle") && (
        <VehicleSearchWidget onSearch={handleVehicleSearch} />
      )}
      {config.industry === "auto" && config.autoCompatibility?.includes("Catalogue pièces OEM vs aftermarket") && (
        <OEMAftermarketCatalog />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          PRODUCTS GRID - Premium cards
      ═══════════════════════════════════════════════════════════════ */}
      <section className={`py-24 ${themeConfig.pageBg}`}>
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
                Nos produits
              </Badge>
              <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary}`}>
                Produits{' '}
                <span style={{ color: config.primaryColor }}>populaires</span>
              </h2>
            </div>
            <Button 
              variant="outline"
              className={`rounded-full px-6 ${
                theme === "moderne" 
                  ? 'border-slate-300 text-slate-700' 
                  : 'border-white/30 text-white'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>

          {/* Products grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <div 
                key={i}
                className={`group relative rounded-3xl overflow-hidden ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Tag */}
                  <Badge 
                    className="absolute top-4 left-4 text-white"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    {product.tag}
                  </Badge>

                  {/* Quick actions */}
                  <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${hoveredProduct === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white text-slate-700 rounded-full">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="bg-white/90 hover:bg-white text-slate-700 rounded-full">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Add to cart overlay */}
                  <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hoveredProduct === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <Button 
                      className="w-full rounded-xl text-white"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                      onClick={addToCart}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Ajouter au panier
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, si) => (
                      <Star 
                        key={si} 
                        className="w-4 h-4 fill-current" 
                        style={{ color: si < Math.floor(product.rating) ? config.accentColor : '#e5e7eb' }} 
                      />
                    ))}
                    <span className={`text-sm ml-1 ${themeConfig.textMuted}`}>({product.rating})</span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-bold text-lg mb-3 ${themeConfig.textPrimary}`}>{product.name}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className={`text-sm line-through ${themeConfig.textMuted}`}>{product.oldPrice}</span>
                    <span className="text-2xl font-black" style={{ color: config.primaryColor }}>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View all */}
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className={`rounded-full px-10 text-white ${themeConfig.buttonStyle}`}
              style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
            >
              Voir tous les produits
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Auto compatibility sections */}
      {config.industry === "auto" && config.autoCompatibility?.includes("Compatibilité automatique des pièces") && (
        <PartsCompatibilityChecker selectedVehicle={selectedVehicle} />
      )}
      {config.industry === "auto" && config.autoCompatibility?.includes("Diagrammes et schémas de pièces") && (
        <PartsDiagramsViewer />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CTA BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${products[0]?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${config.primaryColor}E0 0%, ${config.accentColor}D0 100%)` }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            -30% sur tout le site
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Profitez de notre vente flash exclusive. Offre limitée jusqu'à dimanche minuit!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold bg-white hover:bg-white/90 shadow-xl"
              style={{ color: config.primaryColor }}
            >
              <Zap className="w-5 h-5 mr-2" />
              J'en profite
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className={`py-16 ${theme === "moderne" ? 'bg-slate-900' : themeConfig.pageBg}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                {config.logo ? (
                  <img src={config.logo} alt="Logo" className="h-10 w-auto object-contain" />
                ) : (
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    {config.companyName.charAt(0)}
                  </div>
                )}
                <span className="font-bold text-xl text-white">{config.companyName}</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Votre destination shopping pour des produits de qualité premium. Livraison rapide et service client exceptionnel.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Boutique</h4>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{cat}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Service client</h4>
              <ul className="space-y-3">
                {['Contact', 'FAQ', 'Livraison', 'Retours', 'Garantie'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2024 {config.companyName}. Tous droits réservés.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">CGV</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <Button 
          size="icon"
          onClick={handleShare}
          className="w-12 h-12 rounded-full shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="w-5 h-5" />
        </Button>
        <Button 
          size="icon"
          onClick={handleExport}
          className={`w-12 h-12 rounded-full shadow-lg text-white ${themeConfig.buttonStyle}`}
          style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
        >
          <Download className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
