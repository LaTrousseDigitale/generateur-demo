import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "../DemoGenerator";
import { DynamicFeaturesSection } from "../DynamicFeaturesSection";
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Star, Mail, 
  Phone, MapPin, Menu, Wrench, Shield, Clock,
  Car, Cog, Award, Users, X, ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import heroAuto from "@/assets/hero-auto.jpg";
import projectAuto1 from "@/assets/project-auto-1.jpg";
import productAuto1 from "@/assets/product-auto-1.jpg";
import productAuto2 from "@/assets/product-auto-2.jpg";
import productAuto3 from "@/assets/product-auto-3.jpg";
import productAuto4 from "@/assets/product-auto-4.jpg";

interface AutoShowcaseDemoProps {
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

export const AutoShowcaseDemo = ({ config, onBack }: AutoShowcaseDemoProps) => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Scroll and parallax effects
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
  const counter1 = useCountUp(25, 2000, statsVisible);
  const counter2 = useCountUp(50000, 1500, statsVisible);
  const counter3 = useCountUp(98, 1000, statsVisible);
  const counter4 = useCountUp(24, 1200, statsVisible);

  const services = [
    { 
      icon: Car, 
      title: "Diagnostic complet", 
      desc: "Analyse électronique et mécanique de votre véhicule",
      image: productAuto1
    },
    { 
      icon: Wrench, 
      title: "Réparation mécanique", 
      desc: "Entretien et réparation par des experts certifiés",
      image: productAuto2
    },
    { 
      icon: Cog, 
      title: "Pièces d'origine", 
      desc: "Catalogue complet de pièces OEM et aftermarket",
      image: productAuto3
    },
    { 
      icon: Shield, 
      title: "Garantie étendue", 
      desc: "Protection complète sur toutes nos interventions",
      image: productAuto4
    },
  ];

  const stats = [
    { value: counter1, suffix: " ans", label: "D'expérience" },
    { value: counter2, suffix: "+", label: "Pièces en stock" },
    { value: counter3, suffix: "%", label: "Clients satisfaits" },
    { value: counter4, suffix: "h", label: "Service rapide" },
  ];

  const testimonials = [
    { name: "Marc Tremblay", role: "Propriétaire Honda Civic", text: "Service impeccable! Ils ont trouvé la pièce exacte pour mon véhicule en moins d'une heure.", rating: 5 },
    { name: "Julie Gagnon", role: "Propriétaire Toyota RAV4", text: "Des experts qui connaissent vraiment leur métier. Prix compétitifs et travail de qualité.", rating: 5 },
    { name: "Pierre Lavoie", role: "Propriétaire Ford F-150", text: "Je recommande à tous! Professionnels, honnêtes et rapides.", rating: 5 },
  ];

  // Theme configuration based on config.theme
  const theme = config.theme || "moderne";
  
  const getThemeConfig = () => {
    switch(theme) {
      case "rustique":
        return {
          pageBg: "bg-stone-950",
          navBg: "bg-stone-900/95",
          textPrimary: "text-amber-50",
          textSecondary: "text-stone-300",
          cardBg: "bg-stone-900",
          sectionBg: "bg-stone-900",
          sectionAlt: "bg-stone-950",
        };
      case "futuriste":
        return {
          pageBg: "bg-slate-950",
          navBg: "bg-slate-900/95",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          cardBg: "bg-white/5 backdrop-blur-xl border border-white/10",
          sectionBg: "bg-slate-900/50",
          sectionAlt: "bg-slate-950",
        };
      default: // moderne - light theme
        return {
          pageBg: "bg-white",
          navBg: "bg-white/95",
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          cardBg: "bg-white border border-slate-200",
          sectionBg: "bg-slate-50",
          sectionAlt: "bg-white",
        };
    }
  };

  const themeConfig = getThemeConfig();
  const isLightTheme = theme === "moderne";

  return (
    <div className={`min-h-screen ${themeConfig.pageBg}`}>
      {/* ═══════════════════════════════════════════════════════════════
          FIXED NAVIGATION
      ═══════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? `${themeConfig.navBg} backdrop-blur-xl shadow-lg` 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-10 w-auto" />
              ) : (
                <div 
                  className="w-12 h-12 flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {config.companyName.charAt(0)}
                </div>
              )}
              <span className={`font-bold text-xl ${scrollY > 50 ? themeConfig.textPrimary : 'text-white'}`}>
                {config.companyName}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {['Services', 'Expertise', 'Témoignages', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors ${
                    scrollY > 50 ? themeConfig.textSecondary : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
              <Button 
                className="text-white font-semibold px-6"
                style={{ backgroundColor: config.primaryColor }}
              >
                Demander un devis
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className={`lg:hidden ${scrollY > 50 ? themeConfig.textPrimary : 'text-white'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden ${themeConfig.navBg} backdrop-blur-xl border-t`}>
            <div className="container mx-auto px-6 py-4 space-y-4">
              {['Services', 'Expertise', 'Témoignages', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 font-medium ${themeConfig.textSecondary}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
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
        className="fixed top-24 left-4 z-40 bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Full viewport with parallax
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Parallax background */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${heroAuto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        {/* Color accent overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}40 0%, transparent 60%)`
          }}
        />

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <Badge 
              className="mb-6 text-white border-white/30 bg-white/10 backdrop-blur-sm"
            >
              <Award className="w-4 h-4 mr-2" />
              Expert automobile depuis {counter1} ans
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Votre partenaire
              <span 
                className="block"
                style={{ color: config.primaryColor }}
              >
                automobile
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Diagnostic, réparation et pièces de qualité. Une expertise reconnue au service de votre véhicule.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="text-white font-bold px-8 h-14 text-lg"
                style={{ backgroundColor: config.primaryColor }}
              >
                Prendre rendez-vous
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className={`h-14 px-8 ${
                  isLightTheme 
                    ? 'border-slate-800 text-slate-900 hover:bg-slate-100' 
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                <Phone className="w-5 h-5 mr-2" />
                Nous appeler
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS SECTION - Square grid
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className={themeConfig.sectionBg}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`aspect-square flex flex-col items-center justify-center p-6 border-r border-b last:border-r-0 md:[&:nth-child(4)]:border-r-0 ${
                  isLightTheme ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <span 
                  className="text-4xl md:text-5xl font-black"
                  style={{ color: config.primaryColor }}
                >
                  {stat.value}{stat.suffix}
                </span>
                <span className={`text-sm md:text-base mt-2 text-center ${themeConfig.textSecondary}`}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES SECTION - Square cards with parallax images
      ═══════════════════════════════════════════════════════════════ */}
      <section id="services" className={`py-24 ${themeConfig.sectionAlt}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge 
              className="mb-4"
              style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
            >
              Nos services
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary}`}>
              Expertise complète
            </h2>
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${themeConfig.textSecondary}`}>
              Une gamme complète de services pour l'entretien et la réparation de votre véhicule
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index}
                  className={`group relative aspect-square overflow-hidden ${
                    isLightTheme ? 'border border-slate-200' : 'border border-white/10'
                  }`}
                >
                  {/* Parallax background image */}
                  <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  {/* Overlay */}
                  <div 
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ 
                      background: `linear-gradient(${isEven ? '135deg' : '225deg'}, ${config.primaryColor}ee 0%, ${config.primaryColor}99 100%)`
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <div 
                      className="w-16 h-16 flex items-center justify-center mb-4 bg-white/20 backdrop-blur-sm"
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/80">{service.desc}</p>
                    
                    <Button 
                      variant="link" 
                      className="text-white p-0 mt-4 w-fit group-hover:translate-x-2 transition-transform"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          EXPERTISE SECTION - Full width parallax
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        id="expertise" 
        className="relative py-32 overflow-hidden"
        style={{ 
          backgroundImage: `url(${projectAuto1})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Pourquoi nous choisir?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Plus de {counter1} ans d'expertise au service de votre satisfaction
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Garantie", desc: "2 ans sur toutes nos interventions" },
                { icon: Clock, title: "Rapidité", desc: "Service express en 24h" },
                { icon: Award, title: "Qualité", desc: "Pièces certifiées OEM" },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DYNAMIC FEATURES SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <DynamicFeaturesSection 
        config={config} 
        themeConfig={themeConfig}
        isLightTheme={isLightTheme}
      />

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="témoignages" className={`py-24 ${themeConfig.sectionBg}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge 
              className="mb-4"
              style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
            >
              Témoignages
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary}`}>
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`p-8 ${
                  isLightTheme 
                    ? 'bg-white border border-slate-200' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className={`text-lg mb-6 ${themeConfig.textSecondary}`}>
                  "{testimonial.text}"
                </p>
                <div>
                  <p className={`font-bold ${themeConfig.textPrimary}`}>{testimonial.name}</p>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section 
        className="py-24"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Prêt à prendre soin de votre véhicule?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour un diagnostic gratuit
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white font-bold px-8 h-14 text-lg hover:bg-white/90"
              style={{ color: config.primaryColor }}
            >
              Prendre rendez-vous
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 h-14 px-8"
            >
              <Phone className="w-5 h-5 mr-2" />
              514-555-0123
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <footer id="contact" className={`py-16 ${isLightTheme ? 'bg-slate-900 text-white' : themeConfig.sectionBg}`}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {config.logo ? (
                  <img src={config.logo} alt="Logo" className="h-10 w-auto" />
                ) : (
                  <div 
                    className="w-12 h-12 flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {config.companyName.charAt(0)}
                  </div>
                )}
                <span className="font-bold text-xl">{config.companyName}</span>
              </div>
              <p className="text-white/60 max-w-md">
                Votre partenaire de confiance pour tous vos besoins automobiles. 
                Qualité, expertise et service personnalisé depuis plus de {counter1} ans.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-3 text-white/60">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>514-555-0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@{config.companyName.toLowerCase().replace(/\s/g, '')}.ca</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Montréal, QC</span>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-bold mb-4">Heures d'ouverture</h4>
              <div className="space-y-2 text-white/60">
                <p>Lun - Ven: 8h - 18h</p>
                <p>Samedi: 9h - 16h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40">
            <p>© 2024 {config.companyName}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
