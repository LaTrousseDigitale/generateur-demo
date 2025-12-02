import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "../DemoGenerator";
import { 
  ArrowLeft, ShoppingCart, Search, Heart, Star, 
  ChevronRight, Menu, ChevronDown, X, Truck, Shield,
  RotateCcw, CreditCard, User, Phone, Mail, MapPin,
  Facebook, Twitter, Instagram, Youtube, Car, Wrench,
  Battery, Disc, Settings, Gauge, Zap, Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

// Import product images
import productAuto1 from "@/assets/product-auto-1.jpg";
import productAuto2 from "@/assets/product-auto-2.jpg";
import productAuto3 from "@/assets/product-auto-3.jpg";
import productAuto4 from "@/assets/product-auto-4.jpg";
import heroAutoBanner from "@/assets/hero-auto-banner.png";

interface AutoPartsModernDemoProps {
  config: DemoConfig;
  onBack: () => void;
}

export const AutoPartsModernDemo = ({ config, onBack }: AutoPartsModernDemoProps) => {
  const { toast } = useToast();
  const [cartCount, setCartCount] = useState(3);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    toast({ title: "Ajouté au panier!", description: "Produit ajouté avec succès" });
  };

  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const makes = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes", "Audi"];
  const models = ["Corolla", "Camry", "Civic", "Accord", "F-150", "Silverado"];

  const bestSellers = [
    { name: "Huile moteur synthétique 5W-30", price: "64,95 $", oldPrice: "79,99 $", image: productAuto1, tag: "Promo", rating: 4.9 },
    { name: "Kit plaquettes de frein céramique", price: "149,95 $", oldPrice: "189,99 $", image: productAuto2, tag: "Bestseller", rating: 4.8 },
    { name: "Filtre à air haute performance", price: "89,99 $", oldPrice: "109,99 $", image: productAuto3, tag: null, rating: 4.7 },
    { name: "Batterie AGM 12V 70Ah", price: "199,95 $", oldPrice: "249,99 $", image: productAuto4, tag: "Populaire", rating: 4.9 },
    { name: "Amortisseurs avant (paire)", price: "279,99 $", oldPrice: "349,99 $", image: productAuto1, tag: null, rating: 4.6 },
    { name: "Courroie de distribution", price: "124,95 $", oldPrice: "159,99 $", image: productAuto2, tag: "-22%", rating: 4.8 },
    { name: "Bougies d'allumage iridium x4", price: "54,99 $", oldPrice: "69,99 $", image: productAuto3, tag: null, rating: 4.7 },
    { name: "Rotors de frein ventilés", price: "189,99 $", oldPrice: "229,99 $", image: productAuto4, tag: "Premium", rating: 4.9 },
  ];

  const newArrivals = [
    { name: "Compresseur A/C remanufacturé", price: "349,99 $", image: productAuto3, isNew: true },
    { name: "Phares LED H11", price: "89,95 $", image: productAuto4, isNew: true },
    { name: "Capteur O2 universel", price: "65,95 $", image: productAuto1, isNew: true },
    { name: "Thermostat avec boîtier", price: "79,99 $", image: productAuto2, isNew: true },
  ];

  const categories = [
    { name: "Moteur & filtres", icon: Settings, count: "2,450+" },
    { name: "Freins & suspension", icon: Disc, count: "1,890+" },
    { name: "Électrique & batteries", icon: Battery, count: "1,240+" },
    { name: "Carrosserie & éclairage", icon: Car, count: "3,100+" },
    { name: "Performance", icon: Gauge, count: "890+" },
    { name: "Outils & équipement", icon: Wrench, count: "1,560+" },
  ];

  const brands = [
    "Bosch", "Denso", "ACDelco", "Motorcraft", "NGK", "Monroe"
  ];

  const navLinks = ["Accueil", "Catalogue", "Pièces OEM", "Promotions", "Blog", "Contact"];

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          TOP BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-900 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              1-800-PIÈCES
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@{config.companyName.toLowerCase().replace(/\s/g, '')}.ca
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block">Livraison gratuite dès 75$</span>
            <div className="flex items-center gap-2">
              <Facebook className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors" />
              <Twitter className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-4 h-4 cursor-pointer hover:text-pink-400 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrollY > 50 ? 'shadow-lg' : 'border-b border-slate-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-600 hover:text-slate-900">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-10 w-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-bold text-xl text-slate-900">{config.companyName}</span>
                    <span className="text-xs block text-slate-500">Pièces automobiles</span>
                  </div>
                </div>
              )}
            </div>

            {/* Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full flex">
                <select className="px-4 py-3 bg-slate-100 border-r border-slate-200 rounded-l-lg text-sm text-slate-600 focus:outline-none">
                  <option>Toutes catégories</option>
                  <option>Moteur</option>
                  <option>Freins</option>
                  <option>Électrique</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Rechercher par nom, numéro de pièce ou VIN..." 
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-900 focus:outline-none"
                />
                <Button 
                  className="rounded-l-none rounded-r-lg px-6"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-slate-600">
                <User className="w-5 h-5" />
                <span className="text-sm">Mon compte</span>
              </Button>
              <Button variant="ghost" className="relative text-slate-600">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-slate-200 text-xs flex items-center justify-center">0</span>
              </Button>
              <Button variant="ghost" className="relative text-slate-600" onClick={addToCart}>
                <ShoppingCart className="w-5 h-5" />
                <span 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {cartCount}
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 pb-3">
            <Button 
              className="rounded-lg text-white flex items-center gap-2"
              style={{ backgroundColor: config.primaryColor }}
            >
              <Menu className="w-4 h-4" />
              Toutes les catégories
              <ChevronDown className="w-4 h-4" />
            </Button>
            {navLinks.map((link, i) => (
              <Button key={i} variant="ghost" className="text-slate-700 hover:text-slate-900 font-medium">
                {link}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 py-4">
            <div className="container mx-auto px-4 space-y-2">
              {navLinks.map((link, i) => (
                <button key={i} className="block w-full text-left py-2 text-slate-700 hover:text-slate-900">
                  {link}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Bannière image complète avec texte français
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden">
        {/* Image de fond */}
        <img 
          src={heroAutoBanner} 
          alt="Large sélection de pièces auto aux plus bas prix" 
          className="w-full h-auto object-cover min-h-[300px] md:min-h-[400px]"
        />
        
        {/* Overlay texte français - positionné sur la gauche */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full md:w-1/2 lg:w-2/5 h-full flex items-center pl-6 md:pl-12 lg:pl-20">
            <div className="space-y-3 md:space-y-4">
              <p className="text-sm md:text-lg lg:text-xl text-slate-600 italic">
                <span className="font-bold text-slate-800">Large sélection</span> de pièces auto
              </p>
              <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 leading-none drop-shadow-sm">
                AUX PLUS BAS
              </h1>
              <div className="flex items-center gap-4 md:gap-6">
                <h1 
                  className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-none drop-shadow-sm"
                  style={{ color: config.primaryColor }}
                >
                  PRIX!
                </h1>
                {/* Badge prix */}
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-xl flex flex-col items-center justify-center border-2"
                  style={{ backgroundColor: config.primaryColor, borderColor: 'white' }}
                >
                  <span className="text-white/80 text-[8px] md:text-[10px]">À partir de</span>
                  <span className="text-white text-sm md:text-lg lg:text-xl font-black">
                    69,00 $
                  </span>
                </div>
              </div>
              <div className="pt-2 md:pt-4">
                <Button 
                  size="lg"
                  className="text-white px-5 md:px-8 py-2.5 md:py-3 text-xs md:text-base font-bold uppercase tracking-wide shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Explorer maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VEHICLE SELECTOR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-8 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <Card className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Car className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sélectionnez votre véhicule</h3>
                  <p className="text-slate-400 text-sm">Trouvez les pièces compatibles</p>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-white focus:outline-none"
                >
                  <option value="">Année</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select 
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-white focus:outline-none"
                >
                  <option value="">Marque</option>
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select 
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-white focus:outline-none"
                >
                  <option value="">Modèle</option>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              
              <Button 
                size="lg"
                className="text-white px-8 whitespace-nowrap"
                style={{ backgroundColor: config.primaryColor }}
              >
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BEST SELLERS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              Nos meilleures ventes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              • MEILLEURES VENTES •
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((product, i) => (
              <Card 
                key={i}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-square bg-slate-50 p-4">
                  {product.tag && (
                    <Badge 
                      className="absolute top-3 left-3 z-10 text-white text-xs"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      {product.tag}
                    </Badge>
                  )}
                  <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-slate-400 hover:text-red-500" />
                  </button>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-3 h-3 ${j < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} 
                      />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">({product.rating})</span>
                  </div>
                  <h3 className="font-medium text-slate-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg" style={{ color: config.primaryColor }}>
                      {product.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      {product.oldPrice}
                    </span>
                  </div>
                  <Button 
                    className="w-full mt-3 text-white text-sm"
                    style={{ backgroundColor: config.primaryColor }}
                    onClick={addToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NEW ARRIVALS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              Nouveautés
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              • NOUVEAUX ARRIVAGES •
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product, i) => (
              <Card 
                key={i}
                className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square bg-slate-50 p-4">
                  <Badge 
                    className="absolute top-3 left-3 z-10 text-white text-xs"
                    style={{ backgroundColor: config.accentColor || '#22c55e' }}
                  >
                    Nouveau
                  </Badge>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-slate-900 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="font-bold text-lg" style={{ color: config.primaryColor }}>
                    {product.price}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROMO BANNER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className="relative overflow-hidden rounded-2xl p-8 text-white min-h-[200px]"
              style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor || '#f97316'})` }}
            >
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white mb-3">Nouvelles arrivages</Badge>
                <h3 className="text-2xl font-bold mb-2">Pièces Premium</h3>
                <p className="text-white/80 mb-4">Qualité OEM garantie</p>
                <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
                  Magasiner
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32 opacity-20">
                <Car className="w-full h-full" />
              </div>
            </Card>
            
            <Card 
              className="relative overflow-hidden rounded-2xl p-8 text-white min-h-[200px] bg-slate-900"
            >
              <div className="relative z-10">
                <Badge className="bg-yellow-500 text-slate-900 mb-3">Solde 70%</Badge>
                <h3 className="text-2xl font-bold mb-2">Marques populaires</h3>
                <p className="text-white/80 mb-4">Économisez sur les grandes marques</p>
                <Button className="text-white" style={{ backgroundColor: config.primaryColor }}>
                  Voir les offres
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SHOP BY CATEGORIES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-white mb-4">Parcourir</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              • MAGASINER PAR CATÉGORIE •
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <Card 
                key={i}
                className="group bg-slate-800 border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-700 transition-all"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${config.primaryColor}20` }}
                >
                  <cat.icon className="w-8 h-8" style={{ color: config.primaryColor }} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{cat.name}</h3>
                <p className="text-slate-400 text-xs">{cat.count} produits</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SHOP BY BRANDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge 
              className="mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              Marques de confiance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              • MAGASINER PAR MARQUE •
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand, i) => (
              <div 
                key={i}
                className="px-8 py-4 bg-slate-100 rounded-xl text-slate-700 font-bold text-lg hover:bg-slate-200 cursor-pointer transition-colors"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURES BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Livraison gratuite", desc: "Dès 75$ d'achat" },
              { icon: RotateCcw, title: "Retours gratuits", desc: "30 jours garantis" },
              { icon: Shield, title: "Garantie 2 ans", desc: "Sur tous les produits" },
              { icon: CreditCard, title: "Paiement sécurisé", desc: "SSL 256-bit" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.primaryColor}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">{config.companyName}</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Votre source de confiance pour les pièces automobiles de qualité depuis plus de 20 ans.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Catalogue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Promotions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold mb-4">Catégories</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Moteur & filtres</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Freins & suspension</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Électrique</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrosserie</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Performance</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: config.primaryColor }} />
                  123 Rue Principale, Montréal, QC
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: config.primaryColor }} />
                  1-800-PIÈCES
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: config.primaryColor }} />
                  info@autoparts.ca
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-slate-800 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold mb-1">Inscrivez-vous à notre infolettre</h4>
                <p className="text-slate-400 text-sm">Recevez nos offres exclusives et nouveautés</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Votre courriel" 
                  className="flex-1 md:w-64 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-white"
                />
                <Button 
                  className="text-white px-6"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
            <p>© 2024 {config.companyName}. Tous droits réservés.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
