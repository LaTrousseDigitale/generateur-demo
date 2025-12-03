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
  Clock
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

interface AutoPartsRusticDemoProps {
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
}

const AutoPartsRusticDemo: React.FC<AutoPartsRusticDemoProps> = ({ config }) => {
  const { companyName, primaryColor, logoUrl } = config;
  const accentColor = config.accentColor || "#F59E0B";
  
  // Navigation dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Scroll to section function with offset for sticky header
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setOpenDropdown(null);
  };
  
  const navItems = [
    { label: "Accueil", hasDropdown: false, sectionId: "hero" },
    { label: "Fonctionnalités", hasDropdown: true, sectionId: "feature-search", items: [
      { label: "Recherche avancée", sectionId: "feature-search" },
      { label: "Comparateur", sectionId: "feature-compare" },
      { label: "Compatibilité", sectionId: "feature-compatibility" },
      { label: "Diagnostics", sectionId: "feature-diagnostics" }
    ]},
    { label: "Collections", hasDropdown: true, sectionId: "collection-freins", items: [
      { label: "Freins", sectionId: "collection-freins" },
      { label: "Suspension", sectionId: "collection-suspension" },
      { label: "Moteur", sectionId: "collection-moteur" },
      { label: "Électrique", sectionId: "collection-electrique" },
      { label: "Carrosserie", sectionId: "collection-carrosserie" }
    ]},
    { label: "Boutique", hasDropdown: true, sectionId: "products", items: [
      { label: "Nouveautés", sectionId: "products" },
      { label: "Promotions", sectionId: "deals" },
      { label: "Meilleures ventes", sectionId: "latest-products" },
      { label: "Marques", sectionId: "brands" }
    ]},
    { label: "Pages", hasDropdown: true, sectionId: "page-about", items: [
      { label: "À propos", sectionId: "page-about" },
      { label: "Contact", sectionId: "page-contact" },
      { label: "FAQ", sectionId: "page-faq" },
      { label: "Politique de retour", sectionId: "page-returns" }
    ]},
    { label: "Blog", hasDropdown: false, sectionId: "blog" },
  ];
  
  // Countdown timer state
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
    { name: "Style classique", image: categoryWheelsTires },
    { name: "Collection or", image: categorySmartDevices },
    { name: "Collection rose", image: categoryOils },
    { name: "Bracelets", image: categoryTools },
    { name: "Pièces de rechange", image: categoryReplacementParts },
    { name: "Roues et pneus", image: categoryLights },
  ];

  const [activeTab, setActiveTab] = useState("pieces");
  const productTabs = [
    { id: "pieces", label: "Pièces carrosserie" },
    { id: "electronique", label: "Électronique" },
    { id: "advent", label: "Advent" },
    { id: "performance", label: "Pièces performance" },
    { id: "reparation", label: "Pièces réparation" },
  ];

  const featuredProducts = [
    { name: "Moyeu de roue avant", price: 129.99, oldPrice: 159.99, image: productBrakePads },
    { name: "Filtre à huile premium", price: 34.99, oldPrice: 49.99, image: productAirFilter },
    { name: "Roue de secours tout-terrain", price: 199.99, oldPrice: 249.99, image: productShocks },
    { name: "Turbo compresseur", price: 599.99, oldPrice: 749.99, image: productRadiator },
  ];

  const dealProducts = [
    { 
      name: "Kit d'éclairage auto (feux arrière inclus)", 
      price: 1299.00, 
      oldPrice: 1599.00,
      discount: "Jusqu'à 45% de rabais",
      image: productLedHeadlights 
    },
    { 
      name: "Freins tout-terrain haute performance", 
      price: 1299.00, 
      oldPrice: 1599.00,
      discount: "Jusqu'à 25% de rabais",
      image: productBrakeRotors 
    },
  ];

  const latestProducts = [
    { name: "Kit de freins avant complet", price: 89.99, oldPrice: 119.99, image: productBrakePads },
    { name: "Amortisseurs premium", price: 149.99, oldPrice: 189.99, image: productShocks },
    { name: "Filtre à air sport", price: 39.99, oldPrice: 54.99, image: productAirFilter },
    { name: "Kit de suspension", price: 299.99, oldPrice: 399.99, image: productTimingBelt },
  ];

  const mostViewed = [
    { name: "Huile moteur synthétique", price: 49.99, oldPrice: 64.99, image: productMotorOil },
    { name: "Bougies d'allumage NGK", price: 24.99, oldPrice: 34.99, image: productSparkPlugs },
    { name: "Alternateur refait", price: 189.99, oldPrice: 249.99, image: productAcCompressor },
    { name: "Radiateur aluminium", price: 279.99, oldPrice: 349.99, image: productRadiator },
  ];

  const onSaleProducts = [
    { name: "Batterie haute capacité", price: 129.99, oldPrice: 179.99, image: productBattery },
    { name: "Kit d'embrayage", price: 349.99, oldPrice: 449.99, image: productClutchKit },
    { name: "Courroie de distribution", price: 79.99, oldPrice: 99.99, image: productTimingBelt },
    { name: "Phares LED", price: 199.99, oldPrice: 279.99, image: productLedHeadlights },
  ];

  const blogPosts = [
    {
      title: "Conseils pour l'entretien de votre moteur",
      excerpt: "Découvrez les meilleures pratiques pour prolonger la vie de votre moteur et optimiser ses performances.",
      image: heroAuto,
    },
    {
      title: "Comment choisir ses pneus d'hiver",
      excerpt: "Guide complet pour sélectionner les pneus adaptés à votre véhicule et aux conditions hivernales.",
      image: promoAutoParts,
    },
    {
      title: "Les innovations en pièces auto 2024",
      excerpt: "Tour d'horizon des nouvelles technologies et pièces qui révolutionnent l'industrie automobile.",
      image: categoryReplacementParts,
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
    <div className="min-h-screen bg-stone-950 text-stone-100">
      {/* Top Bar - Dark */}
      <div className="bg-stone-900 py-2 px-4 text-xs border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" style={{ color: accentColor }} />
            <span className="text-stone-300">Téléphone gratuit: <span className="text-white font-medium">1-888-345-6789</span></span>
          </div>
          <div className="flex items-center gap-6 text-stone-400">
            <Search className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
            <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
              <User className="w-4 h-4" />
              <span>Mon compte</span>
            </div>
            <span className="cursor-pointer hover:text-white transition-colors">CAD ▾</span>
            <span className="cursor-pointer hover:text-white transition-colors">Français ▾</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - White Background */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} className="h-10 object-contain" />
              ) : (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <span className="text-stone-900 font-bold text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold text-stone-900">{companyName || "AUTOPIECES"}</span>
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item, idx) => (
                <div 
                  key={item.label} 
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button 
                    onClick={() => scrollToSection(item.sectionId)}
                    className={`transition-colors text-sm font-medium bg-transparent border-none cursor-pointer flex items-center gap-1 ${
                      idx === 0 ? "font-semibold" : "text-stone-700 hover:text-stone-900"
                    }`}
                    style={idx === 0 ? { color: accentColor } : {}}
                  >
                    {item.label} {item.hasDropdown && "▾"}
                  </button>
                  {item.hasDropdown && openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border border-stone-200 min-w-[200px] z-[100]">
                      {item.items?.map((subItem, subIdx) => (
                        <button
                          key={subIdx}
                          onClick={() => scrollToSection(subItem.sectionId)}
                          className="block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100 hover:text-stone-900 bg-transparent border-none cursor-pointer"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => scrollToSection("deals")}
                className="text-stone-900 font-semibold text-sm cursor-pointer hover:opacity-80 bg-transparent border-none"
              >
                OFFRES SPÉCIALES
              </button>
            </nav>

            {/* Cart Button */}
            <div 
              className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: accentColor }}
            >
              <ShoppingCart className="w-6 h-6 text-stone-900" />
              <div className="text-stone-900">
                <div className="text-xs font-bold">VOTRE PANIER</div>
                <div className="text-sm">0 article(s)</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Right Sidebar - Fixed */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col">
        {[Heart, ShoppingCart, Search, User].map((Icon, idx) => (
          <button
            key={idx}
            className="w-12 h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ backgroundColor: accentColor }}
          >
            <Icon className="w-5 h-5 text-stone-900" />
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative h-[500px] overflow-hidden">
        <img 
          src={heroAuto} 
          alt="Service de réparation auto" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-transparent" />
        
        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/50 hover:bg-stone-700/50 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/50 hover:bg-stone-700/50 flex items-center justify-center transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <p className="text-stone-400 mb-2">Bienvenue chez {companyName || "Autopieces"}</p>
            <h1 className="text-5xl font-bold text-white mb-4">
              LE MEILLEUR <span style={{ color: accentColor }}>SERVICE DE RÉPARATION AUTO</span>
            </h1>
            <p className="text-stone-400 mb-6">
              Des pièces de qualité supérieure pour tous vos besoins automobiles. 
              Service expert et prix compétitifs garantis.
            </p>
            <Button 
              size="lg"
              className="text-stone-900 font-semibold px-8 rounded-none"
              style={{ backgroundColor: accentColor }}
            >
              Magasiner
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section id="categories" className="bg-stone-950 py-16 border-b border-stone-800 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-12 flex-wrap">
            {categories.map((cat, idx) => (
              <div key={idx} className="text-center group cursor-pointer">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto border-4 border-stone-600 group-hover:border-stone-400 transition-colors bg-white">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-stone-300 text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Promo Banners */}
      <section className="bg-stone-950">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Banner 1 - Lights */}
          <div className="relative h-72 overflow-hidden group cursor-pointer">
            <img src={categoryLights} alt="Lampes et lumières" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center">
              <p className="text-sm uppercase tracking-wider font-bold" style={{ color: accentColor }}>Lampes et lumières</p>
              <h3 className="text-3xl font-black text-white mt-1">MÉGA VENTE</h3>
              <p className="text-white/80 text-sm mt-2">Jusqu'à <span style={{ color: accentColor }}>45%</span> de rabais</p>
              <Button 
                className="mt-4 w-fit font-semibold rounded-full px-6 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#1c1917" }}
              >
                Magasiner
              </Button>
            </div>
          </div>

          {/* Banner 2 - City Auto */}
          <div className="relative h-72 overflow-hidden group cursor-pointer">
            <img src={heroAuto} alt="City Auto" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-stone-900/75 transition-opacity duration-300 group-hover:opacity-60" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-black text-white">{companyName || "CITY AUTO"}</h3>
              <p className="text-stone-400 mt-2 text-sm uppercase tracking-wider max-w-xs">
                Des pièces de qualité pour votre véhicule
              </p>
              <Button 
                className="mt-4 font-semibold rounded-full px-6 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#1c1917" }}
              >
                Magasiner
              </Button>
            </div>
          </div>

          {/* Banner 3 - Body Parts */}
          <div className="relative h-72 overflow-hidden group cursor-pointer">
            <img src={promoAutoParts} alt="Pièces carrosserie" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-l from-stone-950/90 via-stone-900/70 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-end text-right">
              <p className="text-sm uppercase tracking-wider font-bold" style={{ color: accentColor }}>Pièces carrosserie</p>
              <h3 className="text-2xl font-black text-white mt-1">POUR TOUS<br />LES VÉHICULES</h3>
              <p className="text-white/80 text-sm mt-2">Un incontournable pour vous</p>
              <Button 
                className="mt-4 font-semibold rounded-full px-6 transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: accentColor, color: "#1c1917" }}
              >
                Magasiner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Divider 1 */}
      <div 
        className="h-64 bg-fixed bg-cover bg-center relative"
        style={{ backgroundImage: `url(${promoAutoParts})` }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">QUALITÉ GARANTIE</h3>
            <p className="text-stone-300 text-lg">Des pièces certifiées pour votre véhicule</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-white sticky top-16 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab.id 
                    ? "text-white shadow-lg" 
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
                style={activeTab === tab.id ? { backgroundColor: accentColor } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, idx) => (
              <div key={idx} className="group cursor-pointer border border-stone-200 hover:shadow-lg transition-shadow">
                <div className="relative bg-white aspect-square flex items-center justify-center p-6 overflow-hidden">
                  {/* Discount Badge */}
                  <div 
                    className="absolute top-3 left-3 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white z-10 shadow-md"
                    style={{ backgroundColor: accentColor }}
                  >
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </div>
                  {/* NEW Badge for some products */}
                  {idx % 3 === 1 && (
                    <div className="absolute top-3 right-3 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded z-10">
                      NEW
                    </div>
                  )}
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center bg-white">
                  <h4 className="text-stone-800 font-medium text-sm mb-2">{product.name}</h4>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-lg" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                    <span className="text-stone-400 line-through text-sm">{product.oldPrice.toFixed(2)} $</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              className="rounded-full px-10 py-6 font-semibold text-white hover:opacity-90 transition-opacity text-base"
              style={{ backgroundColor: accentColor }}
            >
              Voir tous les produits
            </Button>
          </div>
        </div>
      </section>

      {/* Deal of the Day + Products & Brands Combined Sticky Section */}
      <div id="deals" className="sticky top-16 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
        {/* Deal of the Day */}
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            {/* Left Panel */}
            <div className="relative h-96 overflow-hidden">
              <img 
                src={heroAuto} 
                alt="Kit éclairage" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-900/60" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-stone-300 text-sm">
                  Jusqu'à <span style={{ color: accentColor }}>45%</span> de rabais
                </p>
                <h3 className="text-2xl font-bold text-white mt-2">
                  Kit éclairage auto (feux arrière inclus)
                </h3>
                <p className="text-stone-400 mt-3">
                  <span className="uppercase text-xs tracking-wider">Prix: </span>
                  <span className="text-2xl font-bold" style={{ color: accentColor }}>1 299,00 $</span>
                </p>
              </div>
            </div>

            {/* Right Panel */}
            <div className="relative h-96 overflow-hidden">
              <img 
                src={promoAutoParts} 
                alt="Frein tout terrain" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-900/60" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-end text-right">
                <p className="text-stone-300 text-sm">
                  Jusqu'à <span style={{ color: accentColor }}>35%</span> de rabais
                </p>
                <h3 className="text-2xl font-bold text-white mt-2">
                  Frein tout terrain haute performance
                </h3>
                <p className="text-stone-400 mt-3">
                  <span className="uppercase text-xs tracking-wider">Prix: </span>
                  <span className="text-2xl font-bold" style={{ color: accentColor }}>1 299,00 $</span>
                </p>
              </div>
            </div>

            {/* Center Countdown */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-full py-6 px-4 flex flex-col items-center gap-3 shadow-2xl">
                {[
                  { value: timeLeft.days, label: "Jours" },
                  { value: timeLeft.hours, label: "Heures" },
                  { value: timeLeft.minutes, label: "Mins" },
                  { value: timeLeft.seconds, label: "Secs" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold" style={{ color: accentColor }}>{item.value}</div>
                    <div className="text-xs text-stone-500 uppercase tracking-wider">{item.label}</div>
                    {idx < 3 && <div className="w-8 h-px bg-stone-300 mt-3" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Latest / Most Viewed / On Sale */}
        <section id="latest-products" className="py-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Latest Products */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                DERNIERS <span style={{ color: accentColor }}>PRODUITS</span>
              </h3>
              <div className="space-y-4">
                {latestProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-stone-800 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-stone-300 text-sm font-medium group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-stone-500 line-through text-xs">{product.oldPrice.toFixed(2)} $</span>
                        <span className="font-bold text-sm" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Viewed */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                LES PLUS <span style={{ color: accentColor }}>CONSULTÉS</span>
              </h3>
              <div className="space-y-4">
                {mostViewed.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-stone-800 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-stone-300 text-sm font-medium group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-stone-500 line-through text-xs">{product.oldPrice.toFixed(2)} $</span>
                        <span className="font-bold text-sm" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* On Sale */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">
                EN <span style={{ color: accentColor }}>SOLDE</span>
              </h3>
              <div className="space-y-4">
                {onSaleProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-20 h-20 bg-stone-800 overflow-hidden flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-stone-300 text-sm font-medium group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-stone-500 line-through text-xs">{product.oldPrice.toFixed(2)} $</span>
                        <span className="font-bold text-sm" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
        <section id="brands" className="py-16 bg-stone-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center gap-6 flex-wrap">
              {brands.map((brand, idx) => (
                <div key={idx} className="bg-white w-40 h-24 flex items-center justify-center hover:shadow-lg transition-all cursor-pointer">
                  <img src={brand.logo} alt={brand.name} className="h-10 w-28 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Parallax Divider 3 */}
      <div 
        className="h-56 bg-fixed bg-cover bg-center relative"
        style={{ backgroundImage: `url(${categoryWheelsTires})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">EXPERTISE AUTOMOBILE</h3>
              <p className="text-stone-300">Plus de 10 ans d'expérience à votre service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blog */}
      <section id="blog" className="py-16 bg-stone-900 sticky top-16 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              DERNIER <span style={{ color: accentColor }}>BLOGUE</span>
            </h2>
            <p className="text-stone-400 mt-2">Nos dernières nouvelles du monde automobile</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="bg-stone-800 border-stone-700 overflow-hidden group rounded-none">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-stone-100 font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-stone-400 text-sm mb-4">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium"
                    style={{ color: accentColor }}
                  >
                    Lire plus →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FONCTIONNALITÉS SECTIONS ========== */}
      
      {/* Recherche avancée */}
      <section id="feature-search" className="py-20 bg-stone-950 sticky top-16 z-[41] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              RECHERCHE <span style={{ color: accentColor }}>AVANCÉE</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Trouvez la pièce exacte pour votre véhicule grâce à notre système de recherche intelligent
            </p>
          </div>
          <div className="bg-stone-900 p-8 border border-stone-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <select className="bg-stone-800 border border-stone-700 text-white px-4 py-3 w-full">
                <option>Sélectionnez l'année</option>
                {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map(year => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <select className="bg-stone-800 border border-stone-700 text-white px-4 py-3 w-full">
                <option>Sélectionnez la marque</option>
                {["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes"].map(make => (
                  <option key={make}>{make}</option>
                ))}
              </select>
              <select className="bg-stone-800 border border-stone-700 text-white px-4 py-3 w-full">
                <option>Sélectionnez le modèle</option>
              </select>
              <Button className="w-full font-semibold" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                <Search className="w-4 h-4 mr-2" /> Rechercher
              </Button>
            </div>
            <p className="text-stone-500 text-sm text-center">
              Ou entrez votre numéro VIN pour une recherche précise
            </p>
          </div>
        </div>
      </section>

      {/* Comparateur */}
      <section id="feature-compare" className="py-20 bg-stone-900 sticky top-16 z-[42] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <span style={{ color: accentColor }}>COMPARATEUR</span> DE PIÈCES
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Comparez les caractéristiques et prix de plusieurs pièces côte à côte
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Plaquettes de frein Standard", price: 49.99, quality: "OEM", warranty: "1 an" },
              { name: "Plaquettes de frein Premium", price: 79.99, quality: "Performance", warranty: "2 ans" },
              { name: "Plaquettes de frein Racing", price: 129.99, quality: "Compétition", warranty: "3 ans" },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-800 border border-stone-700 p-6">
                <div className="aspect-square bg-stone-700 mb-4 flex items-center justify-center">
                  <img src={productBrakePads} alt={item.name} className="w-3/4 h-3/4 object-contain" />
                </div>
                <h4 className="text-white font-semibold mb-2">{item.name}</h4>
                <div className="space-y-2 text-sm text-stone-400 mb-4">
                  <div className="flex justify-between"><span>Qualité:</span><span className="text-white">{item.quality}</span></div>
                  <div className="flex justify-between"><span>Garantie:</span><span className="text-white">{item.warranty}</span></div>
                </div>
                <div className="text-2xl font-bold mb-4" style={{ color: accentColor }}>{item.price.toFixed(2)} $</div>
                <Button className="w-full" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                  Ajouter au panier
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibilité */}
      <section id="feature-compatibility" className="py-20 bg-stone-950 sticky top-16 z-[43] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              VÉRIFICATION DE <span style={{ color: accentColor }}>COMPATIBILITÉ</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Assurez-vous que la pièce est compatible avec votre véhicule avant l'achat
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-900 p-8 border border-stone-800">
              <h3 className="text-xl font-semibold text-white mb-6">Entrez les informations de votre véhicule</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Numéro VIN" className="w-full bg-stone-800 border border-stone-700 text-white px-4 py-3" />
                <input type="text" placeholder="Numéro de pièce (optionnel)" className="w-full bg-stone-800 border border-stone-700 text-white px-4 py-3" />
                <Button className="w-full font-semibold" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                  Vérifier la compatibilité
                </Button>
              </div>
            </div>
            <div className="bg-stone-900 p-8 border border-stone-800">
              <h3 className="text-xl font-semibold text-white mb-6">Résultat de compatibilité</h3>
              <div className="flex items-center gap-4 p-4 bg-green-900/30 border border-green-700">
                <Shield className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-green-400 font-semibold">Compatible ✓</p>
                  <p className="text-stone-400 text-sm">Cette pièce est compatible avec votre véhicule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostics */}
      <section id="feature-diagnostics" className="py-20 bg-stone-900 sticky top-16 z-[44] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <span style={{ color: accentColor }}>DIAGNOSTICS</span> VÉHICULE
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Identifiez les problèmes de votre véhicule et trouvez les pièces nécessaires
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { symptom: "Voyant moteur allumé", solution: "Vérifier capteur O2, bougies", count: 12 },
              { symptom: "Bruits de freinage", solution: "Remplacer plaquettes/disques", count: 8 },
              { symptom: "Problème de démarrage", solution: "Vérifier batterie, alternateur", count: 15 },
              { symptom: "Surchauffe moteur", solution: "Vérifier radiateur, thermostat", count: 6 },
              { symptom: "Vibrations au volant", solution: "Équilibrage/alignement roues", count: 4 },
              { symptom: "Perte de puissance", solution: "Filtre à air, injection", count: 10 },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-800 p-6 border border-stone-700 hover:border-amber-500 transition-colors cursor-pointer">
                <h4 className="text-white font-semibold mb-2">{item.symptom}</h4>
                <p className="text-stone-400 text-sm mb-4">{item.solution}</p>
                <Badge style={{ backgroundColor: accentColor, color: "#1c1917" }}>{item.count} pièces associées</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COLLECTIONS SECTIONS ========== */}

      {/* Collection Freins */}
      <section id="collection-freins" className="py-20 bg-stone-950 sticky top-16 z-[45] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              COLLECTION <span style={{ color: accentColor }}>FREINS</span>
            </h2>
            <p className="text-stone-400">Plaquettes, disques, étriers et kits complets</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Kit freins avant", price: 189.99, image: productBrakePads },
              { name: "Disques ventilés", price: 129.99, image: productBrakeRotors },
              { name: "Plaquettes céramique", price: 79.99, image: productBrakePads },
              { name: "Étrier de frein", price: 149.99, image: productBrakeRotors },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-900 border border-stone-800 group cursor-pointer hover:border-amber-500 transition-colors">
                <div className="aspect-square bg-white p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="text-white text-sm mb-2">{item.name}</h4>
                  <span className="font-bold" style={{ color: accentColor }}>{item.price.toFixed(2)} $</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Suspension */}
      <section id="collection-suspension" className="py-20 bg-stone-900 sticky top-16 z-[46] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              COLLECTION <span style={{ color: accentColor }}>SUSPENSION</span>
            </h2>
            <p className="text-stone-400">Amortisseurs, ressorts et composants de suspension</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Amortisseurs avant", price: 199.99, image: productShocks },
              { name: "Kit ressorts sport", price: 249.99, image: productTimingBelt },
              { name: "Bras de suspension", price: 89.99, image: productShocks },
              { name: "Rotule de direction", price: 59.99, image: productTimingBelt },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-800 border border-stone-700 group cursor-pointer hover:border-amber-500 transition-colors">
                <div className="aspect-square bg-white p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="text-white text-sm mb-2">{item.name}</h4>
                  <span className="font-bold" style={{ color: accentColor }}>{item.price.toFixed(2)} $</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Moteur */}
      <section id="collection-moteur" className="py-20 bg-stone-950 sticky top-16 z-[47] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              COLLECTION <span style={{ color: accentColor }}>MOTEUR</span>
            </h2>
            <p className="text-stone-400">Pièces moteur, filtration et huiles</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Huile synthétique 5W-30", price: 49.99, image: productMotorOil },
              { name: "Filtre à huile", price: 14.99, image: productAirFilter },
              { name: "Courroie distribution", price: 89.99, image: productTimingBelt },
              { name: "Bougies d'allumage (4)", price: 34.99, image: productSparkPlugs },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-900 border border-stone-800 group cursor-pointer hover:border-amber-500 transition-colors">
                <div className="aspect-square bg-white p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="text-white text-sm mb-2">{item.name}</h4>
                  <span className="font-bold" style={{ color: accentColor }}>{item.price.toFixed(2)} $</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Électrique */}
      <section id="collection-electrique" className="py-20 bg-stone-900 sticky top-16 z-[48] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              COLLECTION <span style={{ color: accentColor }}>ÉLECTRIQUE</span>
            </h2>
            <p className="text-stone-400">Batteries, alternateurs et composants électriques</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Batterie 12V 600CCA", price: 159.99, image: productBattery },
              { name: "Alternateur refait", price: 199.99, image: productAcCompressor },
              { name: "Démarreur", price: 179.99, image: productRadiator },
              { name: "Phares LED", price: 129.99, image: productLedHeadlights },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-800 border border-stone-700 group cursor-pointer hover:border-amber-500 transition-colors">
                <div className="aspect-square bg-white p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="text-white text-sm mb-2">{item.name}</h4>
                  <span className="font-bold" style={{ color: accentColor }}>{item.price.toFixed(2)} $</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Carrosserie */}
      <section id="collection-carrosserie" className="py-20 bg-stone-950 sticky top-16 z-[49] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              COLLECTION <span style={{ color: accentColor }}>CARROSSERIE</span>
            </h2>
            <p className="text-stone-400">Pare-chocs, rétroviseurs et pièces extérieures</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Pare-chocs avant", price: 299.99, image: categoryReplacementParts },
              { name: "Rétroviseur gauche", price: 89.99, image: categorySmartDevices },
              { name: "Capot", price: 449.99, image: categoryTools },
              { name: "Aile avant droite", price: 199.99, image: categoryLights },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-900 border border-stone-800 group cursor-pointer hover:border-amber-500 transition-colors">
                <div className="aspect-square bg-white p-4">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="text-white text-sm mb-2">{item.name}</h4>
                  <span className="font-bold" style={{ color: accentColor }}>{item.price.toFixed(2)} $</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PAGES SECTIONS ========== */}

      {/* À propos */}
      <section id="page-about" className="py-20 bg-stone-900 sticky top-16 z-[50] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                À PROPOS DE <span style={{ color: accentColor }}>{companyName || "AUTOPIECES"}</span>
              </h2>
              <p className="text-stone-400 mb-4">
                Depuis plus de 15 ans, nous sommes votre partenaire de confiance pour toutes vos pièces automobiles. 
                Notre équipe d'experts passionnés s'engage à vous offrir des produits de qualité supérieure.
              </p>
              <p className="text-stone-400 mb-6">
                Nous travaillons avec les plus grandes marques de l'industrie pour vous garantir des pièces 
                certifiées et performantes pour tous types de véhicules.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: accentColor }}>15+</div>
                  <div className="text-stone-500 text-sm">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: accentColor }}>50K+</div>
                  <div className="text-stone-500 text-sm">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: accentColor }}>100K+</div>
                  <div className="text-stone-500 text-sm">Pièces en stock</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src={heroAuto} alt="Notre équipe" className="w-full h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="page-contact" className="py-20 bg-stone-950 sticky top-16 z-[51] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              <span style={{ color: accentColor }}>CONTACTEZ</span>-NOUS
            </h2>
            <p className="text-stone-400">Notre équipe est là pour vous aider</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-stone-900 p-8 border border-stone-800">
              <h3 className="text-xl font-semibold text-white mb-6">Envoyez-nous un message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nom" className="bg-stone-800 border border-stone-700 text-white px-4 py-3" />
                  <input type="email" placeholder="Courriel" className="bg-stone-800 border border-stone-700 text-white px-4 py-3" />
                </div>
                <input type="text" placeholder="Sujet" className="w-full bg-stone-800 border border-stone-700 text-white px-4 py-3" />
                <textarea placeholder="Votre message" rows={4} className="w-full bg-stone-800 border border-stone-700 text-white px-4 py-3" />
                <Button className="w-full font-semibold" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                  Envoyer le message
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-stone-900 p-6 border border-stone-800">
                <h4 className="text-white font-semibold mb-2">Adresse</h4>
                <p className="text-stone-400">123 Rue des Pièces Auto, Montréal, QC H1A 2B3</p>
              </div>
              <div className="bg-stone-900 p-6 border border-stone-800">
                <h4 className="text-white font-semibold mb-2">Téléphone</h4>
                <p className="text-stone-400">1-888-345-6789</p>
              </div>
              <div className="bg-stone-900 p-6 border border-stone-800">
                <h4 className="text-white font-semibold mb-2">Courriel</h4>
                <p className="text-stone-400">info@{(companyName || "autopieces").toLowerCase().replace(/\s/g, "")}.ca</p>
              </div>
              <div className="bg-stone-900 p-6 border border-stone-800">
                <h4 className="text-white font-semibold mb-2">Heures d'ouverture</h4>
                <p className="text-stone-400">Lun-Ven: 8h-18h | Sam: 9h-17h | Dim: Fermé</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="page-faq" className="py-20 bg-stone-900 sticky top-16 z-[52] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              FOIRE AUX <span style={{ color: accentColor }}>QUESTIONS</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Comment puis-je vérifier la compatibilité d'une pièce?", a: "Utilisez notre outil de recherche par VIN ou sélectionnez votre véhicule (année, marque, modèle) pour voir uniquement les pièces compatibles." },
              { q: "Quels sont les délais de livraison?", a: "La livraison standard prend 3-5 jours ouvrables. La livraison express (1-2 jours) est disponible moyennant des frais supplémentaires." },
              { q: "Quelle est votre politique de retour?", a: "Vous avez 30 jours pour retourner une pièce non utilisée dans son emballage d'origine. Consultez notre politique de retour pour plus de détails." },
              { q: "Les pièces sont-elles garanties?", a: "Oui, toutes nos pièces sont couvertes par une garantie minimale d'un an. Certaines pièces premium offrent une garantie prolongée." },
              { q: "Offrez-vous l'installation?", a: "Nous travaillons avec un réseau de garages partenaires. Contactez-nous pour trouver un installateur près de chez vous." },
            ].map((item, idx) => (
              <div key={idx} className="bg-stone-800 border border-stone-700 p-6">
                <h4 className="text-white font-semibold mb-2">{item.q}</h4>
                <p className="text-stone-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Politique de retour */}
      <section id="page-returns" className="py-20 bg-stone-950 sticky top-16 z-[53] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              POLITIQUE DE <span style={{ color: accentColor }}>RETOUR</span>
            </h2>
          </div>
          <div className="bg-stone-900 border border-stone-800 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <Clock className="w-8 h-8 text-stone-900" />
                </div>
                <h4 className="text-white font-semibold mb-2">30 jours</h4>
                <p className="text-stone-400 text-sm">Pour retourner votre produit</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <Truck className="w-8 h-8 text-stone-900" />
                </div>
                <h4 className="text-white font-semibold mb-2">Retour gratuit</h4>
                <p className="text-stone-400 text-sm">Sur les commandes de 100$ et plus</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                  <Shield className="w-8 h-8 text-stone-900" />
                </div>
                <h4 className="text-white font-semibold mb-2">Remboursement complet</h4>
                <p className="text-stone-400 text-sm">Dans les 5-7 jours ouvrables</p>
              </div>
            </div>
            <div className="text-stone-400 text-sm space-y-3">
              <p>• Les pièces doivent être retournées dans leur emballage d'origine, non utilisées et non installées.</p>
              <p>• Les pièces électriques et électroniques ne peuvent être retournées que si elles sont défectueuses.</p>
              <p>• Les frais de retour sont à la charge du client pour les commandes inférieures à 100$.</p>
              <p>• Contactez notre service client pour obtenir un numéro d'autorisation de retour (AR).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features + Footer Combined Sticky Section */}
      <div className="sticky top-16 z-[54] shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
        {/* Service Features */}
        <section id="services" className="py-8" style={{ backgroundColor: accentColor }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4">
                <Truck className="w-12 h-12 text-stone-900" />
                <div>
                  <h4 className="font-bold text-stone-900">Livraison gratuite</h4>
                  <p className="text-stone-800 text-sm">Commandes de 75 $ et plus</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Shield className="w-12 h-12 text-stone-900" />
                <div>
                  <h4 className="font-bold text-stone-900">Garantie remboursement</h4>
                  <p className="text-stone-800 text-sm">Retours sous 30 jours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Headphones className="w-12 h-12 text-stone-900" />
                <div>
                  <h4 className="font-bold text-stone-900">Support en ligne</h4>
                  <p className="text-stone-800 text-sm">Disponible 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-950 text-stone-400 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* About */}
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-white font-bold mb-4">À propos</h4>
              <p className="text-sm mb-4">
                {companyName || "Autopieces"} - Votre partenaire de confiance pour toutes vos pièces automobiles de qualité.
              </p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-sm">1-888-345-6789</span>
              </div>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-white font-bold mb-4">Information</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Livraison</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Garantie pièces</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de retour</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Avis clients</a></li>
              </ul>
            </div>

            {/* Service client */}
            <div>
              <h4 className="text-white font-bold mb-4">Service client</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Termes et conditions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Historique des commandes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liste de souhaits</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contactez-nous</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nous contacter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plan du site</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commandes</a></li>
              </ul>
            </div>

            {/* Assistance */}
            <div>
              <h4 className="text-white font-bold mb-4">Assistance</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Service technique</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compatibilité pièces</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-stone-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">Inscrivez-vous à notre infolettre</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre courriel" 
                  className="bg-stone-900 border border-stone-700 px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
                <Button className="rounded-none" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 {companyName || "Autopieces"}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default AutoPartsRusticDemo;
