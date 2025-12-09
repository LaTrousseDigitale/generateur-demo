import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { DemoConfig } from "../DemoGenerator";
import { InlineFeatures } from "../InlineFeatures";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Star, Mail, 
  Phone, MapPin, Menu, Search, Shield, Clock,
  Car, Heart, Users, X, ChevronDown,
  Calendar, Fuel, Settings, Facebook, Twitter,
  Instagram, Linkedin, Youtube, Send, FileCheck,
  Gauge, CarFront, CreditCard, ThumbsUp, Sparkles,
  DollarSign, Banknote, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import heroAuto from "@/assets/hero-auto.jpg";
import productAuto1 from "@/assets/product-auto-1.jpg";
import productAuto2 from "@/assets/product-auto-2.jpg";
import productAuto3 from "@/assets/product-auto-3.jpg";
import productAuto4 from "@/assets/product-auto-4.jpg";
import brandBosch from "@/assets/brand-bosch.jpg";
import brandDenso from "@/assets/brand-denso.jpg";
import brandMonroe from "@/assets/brand-monroe.jpg";
import brandNgk from "@/assets/brand-ngk.jpg";
import brandMotorcraft from "@/assets/brand-motorcraft.jpg";

interface AutoShowcaseFuturisticDemoProps {
  config: DemoConfig;
  onBack: () => void;
}

export const AutoShowcaseFuturisticDemo = ({ config, onBack }: AutoShowcaseFuturisticDemoProps) => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([50000]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "#hero", hasDropdown: true },
    { label: "Inventaire", href: "#vehicles", hasDropdown: true },
    { label: "Pages", href: "#", hasDropdown: true },
    { label: "Éléments", href: "#", hasDropdown: true },
    { label: "Actualités", href: "#blog", hasDropdown: true },
    { label: "Télécharger l'app", href: "#" },
    { label: "Nous joindre", href: "#contact" },
  ];

  const howItWorks = [
    { icon: Search, title: "Parcourez notre inventaire", desc: "Explorez notre vaste sélection de véhicules neufs et d'occasion" },
    { icon: Heart, title: "Choisissez votre auto", desc: "Sélectionnez le véhicule qui correspond à vos besoins et budget" },
    { icon: CreditCard, title: "Demandez un financement", desc: "Remplissez notre formulaire simple pour obtenir une pré-approbation" },
    { icon: Car, title: "Repartez au volant", desc: "Complétez la transaction et repartez avec votre nouvelle auto" },
  ];

  const whyChooseUs = [
    "Processus rapide et simple",
    "Inspection transparente",
    "Offres immédiates",
    "Aucune paperasse complexe",
    "Transactions sécurisées",
  ];

  const vehicles = [
    { image: productAuto1, badge: "Nouveau", badgeColor: "bg-emerald-500", title: "BMW X5", oldPrice: "64 349 $", newPrice: "59 000 $", seats: 5, km: "25 000", transmission: "Auto" },
    { image: productAuto2, badge: "Sport", badgeColor: "bg-red-500", title: "Mazda CX-5 SX V6, ABS, Sunroof", oldPrice: "95 321 $", newPrice: "91 000 $", seats: 5, km: "1 500", transmission: "Auto" },
    { image: productAuto3, badge: "VUS", badgeColor: "bg-blue-500", title: "Mazda CX-5 SX, V6", oldPrice: null, newPrice: "43 500 $", seats: 5, km: "15 000", transmission: "Auto" },
    { image: productAuto4, badge: "Luxe", badgeColor: "bg-amber-500", title: "Maserati QUATTROPORTE", oldPrice: null, newPrice: "98 000 $", seats: 4, km: "18 000", transmission: "Auto" },
    { image: productAuto1, badge: "Sport", badgeColor: "bg-red-500", title: "Ford Shelby GT352 v3", oldPrice: "43 500 $", newPrice: "41 900 $", seats: 2, km: "58 000", transmission: "Auto" },
    { image: productAuto2, badge: "Hybride", badgeColor: "bg-green-500", title: "Ford Shelby GT351 v2", oldPrice: null, newPrice: "43 000 $", seats: 2, km: "12 000", transmission: "Auto" },
    { image: productAuto3, badge: "Usagé", badgeVariant: "outline" as const, title: "Ford Shelby GT350", oldPrice: "48 000 $", newPrice: "44 000 $", seats: 2, km: "65 000", transmission: "Auto" },
    { image: productAuto4, badge: "Usagé", badgeVariant: "outline" as const, title: "BMW 535i", oldPrice: null, newPrice: "30 500 $", seats: 5, km: "26 000", transmission: "Manuelle" },
    { image: productAuto1, badge: "Nouveau", badgeColor: "bg-emerald-500", title: "BMW 535 v6", oldPrice: "80 000 $", newPrice: "45 900 $", seats: 5, km: "24 000", transmission: "Auto" },
  ];

  const brands = [brandBosch, brandDenso, brandMonroe, brandNgk, brandMotorcraft];

  const primaryColor = config.primaryColor || "#dc2626";

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          TOP BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-900 text-white py-2.5 text-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-slate-300">
              <Mail className="w-4 h-4" style={{ color: primaryColor }} />
              info@{config.companyName.toLowerCase().replace(/\s+/g, '')}.ca
            </span>
            <span className="hidden md:flex items-center gap-2 text-slate-300">
              <Phone className="w-4 h-4" style={{ color: primaryColor }} />
              +1 (514) 555-0123
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80 text-slate-400" />
              <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80 text-slate-400" />
              <Instagram className="w-4 h-4 cursor-pointer hover:opacity-80 text-slate-400" />
              <Youtube className="w-4 h-4 cursor-pointer hover:opacity-80 text-slate-400" />
              <Linkedin className="w-4 h-4 cursor-pointer hover:opacity-80 text-slate-400" />
            </div>
            <Button 
              size="sm"
              className="text-white text-xs font-semibold px-4 h-8"
              style={{ backgroundColor: primaryColor }}
            >
              Connexion / Inscription
            </Button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav className="bg-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-8 w-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  <Car className="w-6 h-6" style={{ color: primaryColor }} />
                  <span className="font-bold text-lg text-white">
                    {config.companyName}
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-800 border-t border-slate-700">
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-sm font-medium text-white/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="fixed top-28 left-4 z-40 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        {/* Decorative large circle - coral/red */}
        <div 
          className="absolute -left-48 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: primaryColor, opacity: 0.9 }}
        />
        {/* Decorative small circle */}
        <div 
          className="absolute left-4 top-[60%] w-16 h-16 rounded-full"
          style={{ backgroundColor: primaryColor, opacity: 0.7 }}
        />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[450px]">
            {/* Search Form */}
            <div className="bg-white p-8 shadow-2xl max-w-md relative z-20">
              <h3 className="flex items-start gap-2 font-bold text-lg text-slate-900 mb-6">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0" style={{ color: primaryColor }} />
                <span>Trouvez votre auto de rêve (recherche rapide)</span>
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <select className="h-11 px-4 border border-slate-200 text-slate-500 text-sm bg-white rounded-none">
                    <option>Marque</option>
                    <option>BMW</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                    <option>Toyota</option>
                    <option>Honda</option>
                  </select>
                  <select className="h-11 px-4 border border-slate-200 text-slate-500 text-sm bg-white rounded-none">
                    <option>Modèle</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="h-11 px-4 border border-slate-200 text-slate-500 text-sm bg-white rounded-none">
                    <option>Année / Modèle</option>
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                  <select className="h-11 px-4 border border-slate-200 text-slate-500 text-sm bg-white rounded-none">
                    <option>Type de carburant</option>
                    <option>Essence</option>
                    <option>Diesel</option>
                    <option>Électrique</option>
                    <option>Hybride</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select className="h-11 px-4 border border-slate-200 text-slate-500 text-sm bg-white rounded-none">
                    <option>Type d'auto</option>
                    <option>Berline</option>
                    <option>VUS</option>
                    <option>Camion</option>
                    <option>Coupé</option>
                  </select>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Budget max: {priceRange[0].toLocaleString()} $</label>
                    <Slider 
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={150000}
                      min={10000}
                      step={5000}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full h-11 text-white font-semibold rounded-none"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher un véhicule
                </Button>
                <Button 
                  variant="outline"
                  className="w-full h-11 font-semibold border-2 rounded-none bg-white"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Recherche avancée
                </Button>
              </div>
            </div>

            {/* Hero Image - Showroom/Car Display */}
            <div className="relative hidden lg:flex justify-end items-center">
              <div className="relative w-full max-w-xl">
                <img 
                  src={heroAuto} 
                  alt="Salle d'exposition automobile" 
                  className="w-full h-[350px] object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comment ça fonctionne
            </h2>
            <p className="text-slate-500">
              Nous vous aidons à trouver l'auto parfaite. Voici comment en quelques étapes simples.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div 
                    className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <IconComponent className="w-10 h-10" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img 
                src={productAuto1} 
                alt="Pourquoi nous choisir" 
                className="w-full max-w-md mx-auto"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Pourquoi choisir {config.companyName}?
              </h2>
              <p className="text-slate-500 mb-2 text-sm">
                Nous vous simplifions la vie avec notre approche client exceptionnelle.
              </p>
              <p className="text-slate-500 mb-8 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>

              <ul className="space-y-3 mb-8">
                {whyChooseUs.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" style={{ color: primaryColor }} />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="text-white font-semibold px-6"
                style={{ backgroundColor: primaryColor }}
              >
                Réserver une inspection gratuite
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INLINE FEATURES - EARLY
      ═══════════════════════════════════════════════════════════════ */}
      <InlineFeatures 
        config={config} 
        themeConfig={{
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          cardBg: "bg-white border border-slate-200",
          sectionBg: "bg-slate-50",
          sectionAlt: "bg-white",
        }}
        isLightTheme={true}
        position="early"
      />

      {/* ═══════════════════════════════════════════════════════════════
          VEHICLES LISTING
      ═══════════════════════════════════════════════════════════════ */}
      <section id="vehicles" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Notre inventaire de véhicules
            </h2>
            <p className="text-slate-500">
              Aidez-nous à trouver l'auto parfaite. Mais je dois vous l'expliquer en détail.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="overflow-hidden border border-slate-200 group">
                <div className="relative">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge 
                    className={`absolute top-3 left-3 text-white text-xs ${vehicle.badgeColor || ''}`}
                    variant={vehicle.badgeVariant || "default"}
                  >
                    {vehicle.badge}
                  </Badge>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{vehicle.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {vehicle.oldPrice && (
                      <span className="text-slate-400 line-through text-sm">{vehicle.oldPrice}</span>
                    )}
                    <span className="text-lg font-bold" style={{ color: primaryColor }}>{vehicle.newPrice}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {vehicle.seats} places
                    </span>
                    <span className="flex items-center gap-1">
                      <Gauge className="w-3.5 h-3.5" />
                      {vehicle.km}
                    </span>
                    <span className="flex items-center gap-1">
                      <Settings className="w-3.5 h-3.5" />
                      {vehicle.transmission}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              size="lg"
              className="text-white font-semibold px-8"
              style={{ backgroundColor: primaryColor }}
            >
              Voir tout l'inventaire
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INLINE FEATURES - MIDDLE
      ═══════════════════════════════════════════════════════════════ */}
      <InlineFeatures 
        config={config} 
        themeConfig={{
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          cardBg: "bg-white border border-slate-200",
          sectionBg: "bg-slate-50",
          sectionAlt: "bg-white",
        }}
        isLightTheme={true}
        position="middle"
      />

      {/* ═══════════════════════════════════════════════════════════════
          DUAL CTA BANNERS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Buy New Car */}
            <div 
              className="relative p-8 text-white overflow-hidden"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="relative z-10">
                <p className="text-sm mb-1 opacity-90">Vous cherchez à acheter</p>
                <h3 className="text-2xl font-bold mb-4">Une auto neuve?</h3>
                <p className="text-sm opacity-80 mb-4">
                  Parcourez notre inventaire de plus de 3000 véhicules neufs
                </p>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Explorer
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-30">
                <Car className="w-32 h-32" />
              </div>
            </div>

            {/* Sell Your Car */}
            <div className="relative p-8 bg-white border-2 overflow-hidden" style={{ borderColor: primaryColor }}>
              <div className="relative z-10">
                <p className="text-sm mb-1 text-slate-500">Vous cherchez à acheter</p>
                <h3 className="text-2xl font-bold mb-4" style={{ color: primaryColor }}>Une auto usagée?</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Ajoutez votre véhicule à notre inventaire et atteignez des milliers d'acheteurs potentiels
                </p>
                <Button 
                  style={{ backgroundColor: primaryColor }}
                  className="text-white"
                >
                  Explorer
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10">
                <Car className="w-32 h-32" style={{ color: primaryColor }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BRANDS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8">
            <div className="shrink-0">
              <p className="text-white font-bold">Marques</p>
              <p className="text-white font-bold">populaires</p>
            </div>
            <div className="h-12 w-px bg-slate-700" />
            <div className="flex flex-wrap justify-center items-center gap-12 flex-1">
              {brands.map((brand, index) => (
                <img 
                  key={index}
                  src={brand} 
                  alt={`Brand ${index + 1}`}
                  className="h-10 object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INLINE FEATURES - LATE
      ═══════════════════════════════════════════════════════════════ */}
      <InlineFeatures 
        config={config} 
        themeConfig={{
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          cardBg: "bg-white border border-slate-200",
          sectionBg: "bg-slate-50",
          sectionAlt: "bg-white",
        }}
        isLightTheme={true}
        position="late"
      />

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Categories */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Catégories</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Location d'auto</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Prêt auto</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Salles d'exposition</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Mécaniciens</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Vendre votre auto</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">À propos</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Autos hybrides</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Galeries</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Témoignages</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Conditions</a></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Liens utiles</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Nos partenaires</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Sitemap</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Investisseurs</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Recherche & Devis</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">Abonnez-vous à l'infolettre</h4>
              <div className="flex gap-2 mb-4">
                <Input 
                  placeholder="Votre adresse courriel" 
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex items-start gap-2 mb-4">
                <input type="checkbox" className="mt-1" />
                <span className="text-slate-400 text-xs">
                  J'ai lu et j'accepte les conditions générales d'utilisation et la politique de confidentialité.
                </span>
              </div>
              <Button 
                className="text-white font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                S'abonner
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} {config.companyName}. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-slate-400 text-sm">Téléchargez notre app:</span>
              <div className="flex gap-3 text-slate-400">
                <span className="text-xs">App Store</span>
                <span className="text-xs">Google Play</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Facebook className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
              <Twitter className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
              <Instagram className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
              <Youtube className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
              <Linkedin className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoShowcaseFuturisticDemo;
