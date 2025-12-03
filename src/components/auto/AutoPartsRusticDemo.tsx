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
                    className="w-10 h-10 rounded-full flex items-center justify-center"
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
              {["Accueil", "Fonctionnalités", "Collections", "Boutique", "Pages", "Blog"].map((item, idx) => (
                <a 
                  key={item} 
                  href="#" 
                  className={`transition-colors text-sm font-medium ${
                    idx === 0 ? "font-semibold" : "text-stone-700 hover:text-stone-900"
                  }`}
                  style={idx === 0 ? { color: accentColor } : {}}
                >
                  {item} {idx > 0 && idx < 5 && "▾"}
                </a>
              ))}
              <span className="text-stone-900 font-semibold text-sm cursor-pointer hover:opacity-80">
                OFFRES SPÉCIALES
              </span>
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
      <section className="relative h-[500px] overflow-hidden">
        <img 
          src={heroAuto} 
          alt="Service de réparation auto" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-transparent" />
        
        {/* Navigation Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/50 hover:bg-stone-700/50 rounded-full flex items-center justify-center transition-colors">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-stone-800/50 hover:bg-stone-700/50 rounded-full flex items-center justify-center transition-colors">
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
              className="text-stone-900 font-semibold px-8"
              style={{ backgroundColor: accentColor }}
            >
              Magasiner
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="bg-stone-900 py-12 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-8 flex-wrap">
            {categories.map((cat, idx) => (
              <div key={idx} className="text-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 mx-auto border-2 border-stone-700 group-hover:border-amber-500 transition-colors">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-stone-300 text-sm font-medium group-hover:text-white transition-colors">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Promo Banners */}
      <section className="py-8 px-4 bg-stone-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Banner 1 - Lights */}
          <div className="relative h-64 overflow-hidden rounded-lg group">
            <img src={categoryLights} alt="Lampes et lumières" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center">
              <p className="text-teal-200 text-sm font-medium">Lampes et lumières</p>
              <h3 className="text-3xl font-bold text-white">MÉGA VENTE</h3>
              <Button 
                variant="outline" 
                className="mt-4 w-fit border-white text-white hover:bg-white hover:text-teal-900"
              >
                Magasiner
              </Button>
            </div>
          </div>

          {/* Banner 2 - City Auto */}
          <div className="relative h-64 overflow-hidden rounded-lg group">
            <div className="absolute inset-0" style={{ backgroundColor: accentColor }} />
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-bold text-stone-900">CITY AUTO</h3>
              <p className="text-stone-800 mt-2 text-sm max-w-xs">
                Des pièces de qualité pour votre véhicule. Service rapide et fiable.
              </p>
              <Button 
                className="mt-4 bg-stone-900 text-white hover:bg-stone-800"
              >
                Magasiner
              </Button>
            </div>
          </div>

          {/* Banner 3 - Body Parts */}
          <div className="relative h-64 overflow-hidden rounded-lg group">
            <img src={promoAutoParts} alt="Pièces carrosserie" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-stone-950/90 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center items-end text-right">
              <p className="text-stone-400 text-sm">Pièces carrosserie</p>
              <h3 className="text-2xl font-bold text-white">POUR TOUS<br />LES VÉHICULES</h3>
              <p className="text-stone-400 text-sm mt-2">Un ensemble pour vous</p>
              <Button 
                variant="outline" 
                className="mt-4 border-white text-white hover:bg-white hover:text-stone-900"
              >
                Magasiner
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">PRODUITS <span style={{ color: accentColor }}>VEDETTES</span></h2>
            <p className="text-stone-400 mt-2">Trouvez les meilleures pièces du marché</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {productTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? "text-stone-900" 
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
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
              <Card key={idx} className="bg-stone-800 border-stone-700 overflow-hidden group">
                <div className="aspect-square bg-stone-700/50 p-4 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-stone-200 font-medium text-sm mb-2">{product.name}</h4>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-stone-500 line-through text-sm">{product.oldPrice.toFixed(2)} $</span>
                    <span className="font-bold" style={{ color: accentColor }}>{product.price.toFixed(2)} $</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              className="border-stone-600 text-stone-300 hover:bg-stone-800 hover:text-white"
            >
              Voir tous les produits
            </Button>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="relative py-20 overflow-hidden">
        <img 
          src={promoAutoParts} 
          alt="Deal du jour" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              OFFRE <span style={{ color: accentColor }}>DU JOUR</span>
            </h2>
            <p className="text-stone-400 mt-2">Obtenez 25% de rabais sur tout achat de 200 $ et plus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Product 1 */}
            <div className="bg-stone-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
              <img src={dealProducts[0].image} alt={dealProducts[0].name} className="h-48 mx-auto object-contain mb-4" />
              <Badge className="mb-2" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                {dealProducts[0].discount}
              </Badge>
              <h4 className="text-white font-medium mb-2">{dealProducts[0].name}</h4>
              <div className="flex items-center justify-center gap-2">
                <span className="text-stone-500 line-through">{dealProducts[0].oldPrice.toFixed(2)} $</span>
                <span className="text-2xl font-bold" style={{ color: accentColor }}>{dealProducts[0].price.toFixed(2)} $</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="text-center">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: timeLeft.days, label: "Jours" },
                  { value: timeLeft.hours, label: "Heures" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Secondes" },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: accentColor }}
                  >
                    <div className="text-3xl font-bold text-stone-900">{item.value}</div>
                    <div className="text-xs text-stone-800">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-stone-800/50 backdrop-blur-sm rounded-lg p-6 text-center">
              <img src={dealProducts[1].image} alt={dealProducts[1].name} className="h-48 mx-auto object-contain mb-4" />
              <Badge className="mb-2" style={{ backgroundColor: accentColor, color: "#1c1917" }}>
                {dealProducts[1].discount}
              </Badge>
              <h4 className="text-white font-medium mb-2">{dealProducts[1].name}</h4>
              <div className="flex items-center justify-center gap-2">
                <span className="text-stone-500 line-through">{dealProducts[1].oldPrice.toFixed(2)} $</span>
                <span className="text-2xl font-bold" style={{ color: accentColor }}>{dealProducts[1].price.toFixed(2)} $</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest / Most Viewed / On Sale */}
      <section className="py-16 bg-stone-900">
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
                    <div className="w-20 h-20 bg-stone-800 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div className="w-20 h-20 bg-stone-800 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div className="w-20 h-20 bg-stone-800 rounded-lg overflow-hidden flex-shrink-0">
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
      <section className="py-12 bg-stone-950 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {brands.map((brand, idx) => (
              <div key={idx} className="grayscale hover:grayscale-0 transition-all cursor-pointer opacity-50 hover:opacity-100">
                <img src={brand.logo} alt={brand.name} className="h-12 object-contain brightness-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="py-16 bg-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              DERNIER <span style={{ color: accentColor }}>BLOGUE</span>
            </h2>
            <p className="text-stone-400 mt-2">Nos dernières nouvelles du monde automobile</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="bg-stone-800 border-stone-700 overflow-hidden group">
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

      {/* Service Features */}
      <section className="py-8" style={{ backgroundColor: accentColor }}>
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
                  className="bg-stone-900 border border-stone-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
                />
                <Button style={{ backgroundColor: accentColor, color: "#1c1917" }}>
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
  );
};

export default AutoPartsRusticDemo;
