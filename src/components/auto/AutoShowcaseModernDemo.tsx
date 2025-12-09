import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DemoConfig } from "../DemoGenerator";
import { InlineFeatures } from "../InlineFeatures";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Star, Mail, 
  Phone, MapPin, Menu, Search, Shield, Clock,
  Car, Heart, DollarSign, Users, X, ChevronDown,
  Play, Calendar, Fuel, Settings, Facebook, Twitter,
  Instagram, Linkedin, Youtube, Quote, Send,
  Gauge, CarFront, ShieldCheck, Headphones
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

interface AutoShowcaseModernDemoProps {
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

export const AutoShowcaseModernDemo = ({ config, onBack }: AutoShowcaseModernDemoProps) => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated counters
  const counter1 = useCountUp(40, 2000, statsVisible);
  const counter2 = useCountUp(1200, 1500, statsVisible);
  const counter3 = useCountUp(1000, 1000, statsVisible);
  const counter4 = useCountUp(600, 1200, statsVisible);

  const navLinks = [
    { label: "Accueil", href: "#hero" },
    { label: "À propos", href: "#about" },
    { label: "Véhicules", href: "#vehicles" },
    { label: "Services", href: "#services" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Actualités", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const features = [
    { icon: DollarSign, title: "Meilleur prix", desc: "Prix compétitifs garantis sur tous nos véhicules avec financement flexible" },
    { icon: CarFront, title: "Achat et vente rapide", desc: "Processus simplifié pour acheter ou vendre votre véhicule en toute confiance" },
    { icon: Headphones, title: "Support gratuit", desc: "Assistance clientèle disponible pour répondre à toutes vos questions" },
    { icon: ShieldCheck, title: "Concessionnaires certifiés", desc: "Réseau de partenaires vérifiés pour une transaction sécurisée" },
  ];

  const stats = [
    { value: counter1, suffix: "+", label: "Marques disponibles", icon: Car },
    { value: counter2, suffix: "+", label: "Véhicules en stock", icon: Gauge },
    { value: counter3, suffix: "+", label: "Voitures vendues", icon: CarFront },
    { value: counter4, suffix: "+", label: "Clients satisfaits", icon: Users },
  ];

  const featuredCars = [
    { 
      image: productAuto1, 
      badge: "Nouveau",
      title: "Mazda CX-5 GS-L AWD",
      oldPrice: "52 899 $",
      newPrice: "48 999 $",
      specs: { km: "15 000", fuel: "Essence", year: "2024" }
    },
    { 
      image: productAuto2, 
      badge: "Populaire",
      title: "Ford Bronco Wildtrak",
      oldPrice: "64 500 $",
      newPrice: "59 899 $",
      specs: { km: "8 500", fuel: "Essence", year: "2024" }
    },
    { 
      image: productAuto3, 
      badge: "Économique",
      title: "BMW X3 xDrive",
      oldPrice: "72 000 $",
      newPrice: "67 500 $",
      specs: { km: "22 000", fuel: "Hybride", year: "2023" }
    },
  ];

  const testimonials = [
    { 
      name: "Samuel Brochu", 
      image: productAuto1,
      text: "Service exceptionnel! J'ai trouvé la voiture parfaite pour ma famille. L'équipe était très professionnelle et m'a accompagné tout au long du processus." 
    },
    { 
      name: "Marie Gagnon", 
      image: productAuto2,
      text: "Très satisfaite de mon achat. Les conseillers sont à l'écoute et offrent un excellent suivi après-vente. Je recommande vivement!" 
    },
    { 
      name: "Donald Beauchamp", 
      image: productAuto3,
      text: "Une expérience d'achat sans stress. Prix transparents, aucune pression. Ma nouvelle voiture répond parfaitement à mes attentes." 
    },
  ];

  const blogPosts = [
    { 
      image: productAuto1, 
      title: "Il existe plusieurs modèles de passage pour l'industrie automobile",
      excerpt: "Découvrez les dernières tendances et innovations qui transforment le marché automobile...",
    },
    { 
      image: productAuto2, 
      title: "Ce n'est pas une question de sentiment. Il s'agit de résultats",
      excerpt: "Comment choisir le véhicule qui correspond vraiment à vos besoins et votre budget...",
    },
    { 
      image: productAuto3, 
      title: "Il faut gérer nos attentes avec les tendances du marché actuel",
      excerpt: "Analyse du marché automobile canadien et perspectives pour les prochains mois...",
    },
  ];

  const brands = [brandBosch, brandDenso, brandMonroe, brandNgk, brandMotorcraft];

  const primaryColor = config.primaryColor || "#dc2626";
  const accentColor = config.accentColor || "#1e293b";

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          TOP BAR
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-slate-900 text-white py-2 text-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1 (514) 555-0123
            </span>
            <span className="hidden md:flex items-center gap-2">
              <Mail className="w-4 h-4" />
              info@{config.companyName.toLowerCase().replace(/\s+/g, '')}.ca
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Instagram className="w-4 h-4 cursor-pointer hover:opacity-80" />
            <Linkedin className="w-4 h-4 cursor-pointer hover:opacity-80" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrollY > 100 ? 'bg-white shadow-lg' : 'bg-white'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-12 w-auto" />
              ) : (
                <div className="flex items-center gap-2">
                  <Car className="w-8 h-8" style={{ color: primaryColor }} />
                  <span className="font-bold text-2xl text-slate-900">
                    {config.companyName}
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              className="hidden lg:flex text-white font-semibold px-6"
              style={{ backgroundColor: primaryColor }}
            >
              Demande de soumission
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="block py-2 font-medium text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button 
                className="w-full text-white font-semibold"
                style={{ backgroundColor: primaryColor }}
              >
                Demande de soumission
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="fixed top-36 left-4 z-40 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${heroAuto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="max-w-2xl text-center mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight uppercase">
              Votre auto parfaite
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Bienvenue! Nous offrons une large sélection de véhicules pour tous les budgets
            </p>
            <Button 
              size="lg"
              className="text-white font-bold px-8 h-14 text-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Découvrir
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VEHICLE SEARCH BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 container mx-auto px-6">
        <div 
          className="p-6 md:p-8"
          style={{ backgroundColor: primaryColor }}
        >
          <h3 className="text-white font-bold text-xl mb-6 text-center">
            Trouvez votre véhicule idéal (recherche rapide)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <select className="h-12 px-4 bg-white border-0 text-slate-700 focus:ring-2 focus:ring-white/50">
              <option>Catégorie</option>
              <option>Berline</option>
              <option>VUS</option>
              <option>Camion</option>
              <option>Coupé</option>
            </select>
            <select className="h-12 px-4 bg-white border-0 text-slate-700 focus:ring-2 focus:ring-white/50">
              <option>Marque</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Ford</option>
              <option>BMW</option>
            </select>
            <select className="h-12 px-4 bg-white border-0 text-slate-700 focus:ring-2 focus:ring-white/50">
              <option>Modèle</option>
              <option>Tous les modèles</option>
            </select>
            <select className="h-12 px-4 bg-white border-0 text-slate-700 focus:ring-2 focus:ring-white/50">
              <option>Budget max</option>
              <option>25 000 $</option>
              <option>35 000 $</option>
              <option>50 000 $</option>
              <option>75 000 $+</option>
            </select>
            <div className="col-span-2 md:col-span-4 lg:col-span-1 flex gap-2">
              <Button 
                className="flex-1 h-12 text-white font-semibold"
                style={{ backgroundColor: accentColor }}
              >
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Recherche avancée
            </Button>
            <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Véhicules récents
            </Button>
            <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Offres spéciales
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WELCOME SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Bienvenue chez {config.companyName}
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto">
              Nous nous engageons à vous offrir une expérience d'achat automobile exceptionnelle. 
              Découvrez notre sélection de véhicules de qualité et notre service personnalisé.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: `${primaryColor}15` }}
                  >
                    <IconComponent className="w-8 h-8" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ABOUT SECTION WITH STATS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="about" ref={statsRef} className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img 
                src={productAuto1} 
                alt="About us" 
                className="w-full h-[400px] object-cover"
              />
              <div 
                className="absolute -bottom-6 -right-6 w-32 h-32 flex items-center justify-center text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="text-center">
                  <span className="text-3xl font-black">{counter1}+</span>
                  <span className="block text-sm">Années</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                À propos de {config.companyName}
              </h2>
              <p className="text-slate-600 mb-8">
                Depuis plus de {counter1} ans, nous aidons les Canadiens à trouver le véhicule parfait. 
                Notre engagement envers la qualité et le service client nous a permis de bâtir une réputation 
                solide dans l'industrie automobile.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 flex items-center justify-center"
                        style={{ backgroundColor: accentColor }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="text-2xl font-black text-slate-900">
                          {stat.value}{stat.suffix}
                        </span>
                        <span className="block text-sm text-slate-600">{stat.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
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
          FEATURED CARS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="vehicles" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Offres spéciales sur nos véhicules vedettes
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez notre sélection de véhicules en promotion avec des prix imbattables et des conditions de financement avantageuses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg group">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.title} 
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge 
                    className="absolute top-4 left-4 text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {car.badge}
                  </Badge>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">{car.title}</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-slate-400 line-through text-sm">{car.oldPrice}</span>
                    <span className="text-xl font-bold" style={{ color: primaryColor }}>{car.newPrice}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 border-t pt-4">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-4 h-4" />
                      {car.specs.km} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Fuel className="w-4 h-4" />
                      {car.specs.fuel}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {car.specs.year}
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
              Voir tous les véhicules
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={productAuto2} 
                alt="Nos services" 
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nos services
              </h2>
              <p className="text-white/70 mb-8">
                Nous offrons une gamme complète de services pour répondre à tous vos besoins automobiles.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Vente de véhicules neufs</h3>
                    <p className="text-white/70 text-sm">
                      Large sélection de véhicules neufs de toutes les marques avec financement flexible.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Settings className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Vente de véhicules usagés</h3>
                    <p className="text-white/70 text-sm">
                      Véhicules d'occasion inspectés et certifiés avec garantie incluse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nos témoignages
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez ce que nos clients satisfaits disent de leur expérience avec nous.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg relative">
                <Quote 
                  className="w-12 h-12 absolute top-4 left-4" 
                  style={{ color: `${primaryColor}30` }}
                />
                <div className="pt-8">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm italic">"{testimonial.text}"</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 text-white text-center bg-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Une question?
          </h2>
          <p className="text-3xl md:text-4xl font-bold mb-6" style={{ color: primaryColor }}>
            +1 (514) 555-0123
          </p>
          <Button 
            size="lg"
            className="text-white font-semibold px-8 rounded-full"
            style={{ backgroundColor: primaryColor }}
            onClick={() => toast({ title: "Appel en cours...", description: "Nous vous contacterons sous peu." })}
          >
            Nous appeler maintenant
          </Button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BLOG SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Dernières actualités de l'industrie automobile
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Restez informé des dernières nouvelles et tendances du marché automobile.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg group">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 font-semibold"
                    style={{ color: primaryColor }}
                  >
                    Lire la suite
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
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
          BRANDS / PARTNERS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-500 mb-8 font-medium">Nos partenaires de confiance</p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {brands.map((brand, index) => (
              <img 
                key={index}
                src={brand} 
                alt={`Partner ${index + 1}`}
                className="h-12 object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-8 h-8" style={{ color: primaryColor }} />
                <span className="font-bold text-xl">{config.companyName}</span>
              </div>
              <p className="text-white/70 text-sm mb-4">
                Votre partenaire de confiance pour l'achat de véhicules neufs et usagés au Canada.
              </p>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Véhicules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                  <span>123 Rue Principale, Montréal, QC H2X 1X1</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                  <span>+1 (514) 555-0123</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                  <span>info@{config.companyName.toLowerCase().replace(/\s+/g, '')}.ca</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-lg mb-4">Infolettre</h4>
              <p className="text-white/70 text-sm mb-4">
                Abonnez-vous pour recevoir nos meilleures offres et actualités.
              </p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Votre courriel" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button style={{ backgroundColor: primaryColor }}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} {config.companyName}. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-white/50 text-sm">
              <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AutoShowcaseModernDemo;
