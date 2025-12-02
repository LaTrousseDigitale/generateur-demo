import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { 
  ArrowLeft, Download, Share2, Calendar, Clock, MapPin, Users, 
  CheckCircle2, Star, Menu, ChevronRight, Sparkles, Zap, Shield, 
  Phone, Mail, Bell, ArrowRight, Play, Heart, Award, TrendingUp,
  ChevronDown, Quote, ArrowUpRight, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { getThemeStyles, type DemoTheme } from "@/types/demoThemes";

// Import booking images
import bookingAutoService from "@/assets/booking-auto-service.jpg";
import bookingRestaurantInterior from "@/assets/booking-restaurant-interior.jpg";
import bookingArchitectureOffice from "@/assets/booking-architecture-office.jpg";
import bookingConstructionOffice from "@/assets/booking-construction-office.jpg";
import bookingHealthClinic from "@/assets/booking-health-clinic.jpg";

interface BookingDemoProps {
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

export const BookingDemo = ({ config, onBack }: BookingDemoProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check if stats section is visible
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
  const counter1 = useCountUp(15000, 2000, statsVisible);
  const counter2 = useCountUp(98, 1500, statsVisible);
  const counter3 = useCountUp(24, 1000, statsVisible);
  const counter4 = useCountUp(5, 800, statsVisible);

  // Map industry to hero images
  const industryHeroImages = {
    auto: bookingAutoService,
    "pieces-auto": bookingAutoService,
    restauration: bookingRestaurantInterior,
    architecture: bookingArchitectureOffice,
    construction: bookingConstructionOffice,
    sante: bookingHealthClinic,
  };

  const heroImage = industryHeroImages[config.industry as keyof typeof industryHeroImages] || bookingHealthClinic;

  // All industry images for gallery
  const galleryImages = [
    bookingHealthClinic,
    bookingRestaurantInterior,
    bookingArchitectureOffice,
    bookingConstructionOffice,
    bookingAutoService,
  ];

  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Votre démo sera prête dans quelques instants",
    });
  };

  const handleShare = () => {
    toast({
      title: "Lien de partage créé",
      description: "Le lien a été copié dans votre presse-papiers",
    });
  };

  const timeSlots = [
    { time: "09:00", available: true },
    { time: "10:00", available: true },
    { time: "11:00", available: false },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
    { time: "17:00", available: true },
  ];

  const services: Record<string, Array<{ name: string; duration: string; price: string; icon: typeof Users; popular: boolean; image: string; description: string }>> = {
    sante: [
      { name: "Consultation générale", duration: "30 min", price: "75 $", icon: Users, popular: false, image: bookingHealthClinic, description: "Évaluation complète de votre état de santé" },
      { name: "Consultation spécialisée", duration: "45 min", price: "120 $", icon: Star, popular: true, image: bookingArchitectureOffice, description: "Expertise pointue pour des besoins spécifiques" },
      { name: "Suivi médical", duration: "20 min", price: "60 $", icon: Calendar, popular: false, image: bookingRestaurantInterior, description: "Accompagnement régulier de votre santé" },
    ],
    restauration: [
      { name: "Table 2 personnes", duration: "2h", price: "Gratuit", icon: Users, popular: false, image: bookingRestaurantInterior, description: "Dîner intime avec vue panoramique" },
      { name: "Table 4 personnes", duration: "2h", price: "Gratuit", icon: Users, popular: true, image: bookingHealthClinic, description: "Parfait pour un repas en famille ou entre amis" },
      { name: "Salle privée 8-12 pers", duration: "3h", price: "150 $", icon: Star, popular: false, image: bookingArchitectureOffice, description: "Espace exclusif pour vos événements" },
    ],
    "arts-scene": [
      { name: "Billet standard", duration: "Parterre", price: "45 $", icon: Users, popular: false, image: bookingRestaurantInterior, description: "Vivez le spectacle au cœur de l'action" },
      { name: "Billet premium", duration: "Balcon VIP", price: "85 $", icon: Star, popular: true, image: bookingArchitectureOffice, description: "Vue imprenable et service privilégié" },
      { name: "Loge privée", duration: "4 personnes", price: "320 $", icon: Award, popular: false, image: bookingHealthClinic, description: "Intimité et confort pour un moment unique" },
    ],
    auto: [
      { name: "Diagnostic complet", duration: "45 min", price: "89 $", icon: Shield, popular: false, image: bookingAutoService, description: "Analyse approfondie de votre véhicule" },
      { name: "Entretien standard", duration: "2h", price: "149 $", icon: Star, popular: true, image: bookingConstructionOffice, description: "Maintenance préventive complète" },
      { name: "Révision complète", duration: "4h", price: "299 $", icon: Award, popular: false, image: bookingArchitectureOffice, description: "Service premium tout inclus" },
    ],
    construction: [
      { name: "Consultation projet", duration: "1h", price: "Gratuit", icon: Users, popular: false, image: bookingConstructionOffice, description: "Discutons de votre vision" },
      { name: "Estimation détaillée", duration: "Sur site", price: "150 $", icon: Star, popular: true, image: bookingArchitectureOffice, description: "Devis précis et transparent" },
      { name: "Suivi de chantier", duration: "Mensuel", price: "500 $", icon: Award, popular: false, image: bookingAutoService, description: "Accompagnement expert de A à Z" },
    ],
    architecture: [
      { name: "Première rencontre", duration: "1h", price: "Gratuit", icon: Users, popular: false, image: bookingArchitectureOffice, description: "Échangeons sur vos aspirations" },
      { name: "Étude de faisabilité", duration: "1 semaine", price: "750 $", icon: Star, popular: true, image: bookingConstructionOffice, description: "Analyse complète de votre projet" },
      { name: "Plans complets", duration: "3-4 semaines", price: "2 500 $", icon: Award, popular: false, image: bookingHealthClinic, description: "Conception architecturale détaillée" },
    ],
    education: [
      { name: "Cours découverte", duration: "1h", price: "25 $", icon: Users, popular: false, image: bookingArchitectureOffice, description: "Premier pas vers l'apprentissage" },
      { name: "Formation intensive", duration: "1 journée", price: "195 $", icon: Star, popular: true, image: bookingHealthClinic, description: "Immersion totale et progression rapide" },
      { name: "Programme complet", duration: "10 semaines", price: "1 200 $", icon: Award, popular: false, image: bookingRestaurantInterior, description: "Parcours complet vers l'expertise" },
    ],
    services: [
      { name: "Consultation initiale", duration: "60 min", price: "180 $", icon: Users, popular: false, image: bookingArchitectureOffice, description: "Analyse de vos besoins" },
      { name: "Session de suivi", duration: "30 min", price: "90 $", icon: Calendar, popular: true, image: bookingHealthClinic, description: "Accompagnement continu" },
      { name: "Audit complet", duration: "2h", price: "375 $", icon: Star, popular: false, image: bookingConstructionOffice, description: "Évaluation approfondie" },
    ],
    "services-pro": [
      { name: "Consultation initiale", duration: "60 min", price: "180 $", icon: Users, popular: false, image: bookingArchitectureOffice, description: "Analyse de vos besoins" },
      { name: "Session de suivi", duration: "30 min", price: "90 $", icon: Calendar, popular: true, image: bookingHealthClinic, description: "Accompagnement continu" },
      { name: "Audit complet", duration: "2h", price: "375 $", icon: Star, popular: false, image: bookingConstructionOffice, description: "Évaluation approfondie" },
    ],
  };

  // Titres de section adaptés par industrie
  const sectionTitles: Record<string, { badge: string; title: string; subtitle: string; duration: string; heroTitle: string; heroSubtitle: string }> = {
    "arts-scene": { 
      badge: "Billetterie", 
      title: "Choisissez vos billets", 
      subtitle: "Sélectionnez votre type de place et réservez votre soirée",
      duration: "Emplacement",
      heroTitle: "Vivez des moments\ninoubliables",
      heroSubtitle: "Réservez vos places pour les plus beaux spectacles"
    },
    restauration: { 
      badge: "Réservations", 
      title: "Réservez votre table", 
      subtitle: "Choisissez le type de table et l'heure qui vous conviennent",
      duration: "Capacité",
      heroTitle: "Une expérience\ngastronomique unique",
      heroSubtitle: "Réservez votre table dans notre établissement d'exception"
    },
    auto: { 
      badge: "Services auto", 
      title: "Nos services", 
      subtitle: "Sélectionnez le service dont votre véhicule a besoin",
      duration: "Durée",
      heroTitle: "L'excellence\nautomobile",
      heroSubtitle: "Prenez rendez-vous avec nos experts"
    },
    sante: { 
      badge: "Consultations", 
      title: "Nos consultations", 
      subtitle: "Choisissez le type de consultation adapté à vos besoins",
      duration: "Durée",
      heroTitle: "Votre santé,\nnotre priorité",
      heroSubtitle: "Prenez rendez-vous avec nos spécialistes"
    },
    education: { 
      badge: "Formations", 
      title: "Nos formations", 
      subtitle: "Choisissez le programme qui correspond à vos objectifs",
      duration: "Durée",
      heroTitle: "Développez\nvos compétences",
      heroSubtitle: "Inscrivez-vous à nos formations d'excellence"
    },
    architecture: { 
      badge: "Rendez-vous", 
      title: "Nos services", 
      subtitle: "De la conception à la réalisation de vos projets",
      duration: "Durée",
      heroTitle: "Concevons\nl'extraordinaire",
      heroSubtitle: "Prenez rendez-vous pour donner vie à vos projets"
    },
    construction: { 
      badge: "Consultations", 
      title: "Nos services", 
      subtitle: "Accompagnement expert pour tous vos projets",
      duration: "Durée",
      heroTitle: "Bâtissons\nl'avenir",
      heroSubtitle: "Prenez rendez-vous avec nos experts en construction"
    },
    default: { 
      badge: "Nos prestations", 
      title: "Choisissez votre service", 
      subtitle: "Sélectionnez le service qui vous intéresse et réservez votre créneau",
      duration: "Durée",
      heroTitle: "Réservez votre\nrendez-vous",
      heroSubtitle: "Prenez rendez-vous en quelques clics"
    },
  };

  const currentTitles = sectionTitles[config.industry] || sectionTitles.default;
  const availableServices = services[config.industry as keyof typeof services] || services["services-pro"];

  const stats = [
    { value: counter1, suffix: "+", label: "Clients satisfaits", icon: Heart },
    { value: counter2, suffix: "%", label: "Taux de satisfaction", icon: TrendingUp },
    { value: counter3, suffix: "/7", label: "Support disponible", icon: Shield },
    { value: counter4, suffix: "★", label: "Note moyenne", icon: Award },
  ];

  const testimonials = [
    { name: "Sophie Martin", role: "Cliente fidèle", text: "Une expérience exceptionnelle du début à la fin. Je recommande vivement!", rating: 5 },
    { name: "Pierre Dubois", role: "Entrepreneur", text: "Professionnalisme et qualité de service irréprochables. Mon partenaire de confiance.", rating: 5 },
    { name: "Marie Laurent", role: "Directrice", text: "Le meilleur choix que j'ai fait. Service rapide, équipe à l'écoute.", rating: 5 },
  ];

  // Get theme-based styles
  const theme = config.theme || "moderne";
  
  // Theme-specific classes - COMPLETELY DIFFERENT per theme
  const getThemeConfig = () => {
    switch(theme) {
      case "moderne":
        return {
          pageBg: "bg-white",
          heroOverlay: "bg-gradient-to-br from-white/95 via-slate-50/90 to-white/80",
          headerBg: "bg-white/80 backdrop-blur-xl border-b border-slate-200/50",
          cardBg: "bg-white border border-slate-100 shadow-xl shadow-slate-200/50",
          cardHover: "hover:shadow-2xl hover:-translate-y-2",
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          textMuted: "text-slate-400",
          sectionBg: "bg-slate-50",
          accentBg: "bg-slate-100",
          buttonStyle: "shadow-lg hover:shadow-xl",
          badgeStyle: "bg-slate-100 text-slate-700 border border-slate-200",
          inputStyle: "border-slate-200 bg-white focus:border-slate-400",
          dividerColor: "fill-white",
          glowEffect: "",
          shapeColor: "bg-slate-200/30",
        };
      case "rustique":
        return {
          pageBg: "bg-stone-950",
          heroOverlay: "bg-gradient-to-br from-stone-950/90 via-stone-900/85 to-amber-950/80",
          headerBg: "bg-stone-900/90 backdrop-blur-xl border-b border-amber-900/30",
          cardBg: "bg-gradient-to-br from-stone-900 to-stone-800 border border-amber-800/20",
          cardHover: "hover:border-amber-700/40 hover:-translate-y-2",
          textPrimary: "text-amber-50",
          textSecondary: "text-stone-300",
          textMuted: "text-stone-500",
          sectionBg: "bg-stone-900",
          accentBg: "bg-amber-900/20",
          buttonStyle: "shadow-lg shadow-amber-900/30",
          badgeStyle: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
          inputStyle: "border-amber-900/30 bg-stone-900 text-stone-100 focus:border-amber-700",
          dividerColor: "fill-stone-950",
          glowEffect: "",
          shapeColor: "bg-amber-900/10",
        };
      case "futuriste":
        return {
          pageBg: "bg-slate-950",
          heroOverlay: "bg-gradient-to-br from-slate-950/80 via-indigo-950/70 to-purple-950/60",
          headerBg: "bg-slate-950/80 backdrop-blur-xl border-b border-white/10",
          cardBg: "bg-white/5 backdrop-blur-2xl border border-white/10",
          cardHover: "hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)]",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-500",
          sectionBg: "bg-slate-900/50",
          accentBg: "bg-indigo-500/10",
          buttonStyle: "shadow-[0_0_30px_rgba(99,102,241,0.4)]",
          badgeStyle: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/30",
          inputStyle: "border-white/20 bg-white/5 text-white focus:border-indigo-500",
          dividerColor: "fill-slate-950",
          glowEffect: "shadow-[0_0_100px_rgba(99,102,241,0.2)]",
          shapeColor: "bg-indigo-500/5",
        };
      default:
        return {
          pageBg: "bg-slate-950",
          heroOverlay: "bg-slate-950/70",
          headerBg: "bg-slate-900/80 backdrop-blur-xl",
          cardBg: "bg-slate-900/80 border border-white/10",
          cardHover: "hover:bg-slate-800/80",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-500",
          sectionBg: "bg-slate-900",
          accentBg: "bg-slate-800",
          buttonStyle: "",
          badgeStyle: "bg-slate-800 text-slate-200",
          inputStyle: "border-white/20 bg-slate-900",
          dividerColor: "fill-slate-950",
          glowEffect: "",
          shapeColor: "bg-slate-800/50",
        };
    }
  };

  const themeConfig = getThemeConfig();

  return (
    <div className={`min-h-screen ${themeConfig.pageBg} overflow-hidden`}>
      
      {/* ═══════════════════════════════════════════════════════════════
          FLOATING NAVIGATION - Premium glassmorphism header
      ═══════════════════════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 100 ? themeConfig.headerBg : 'bg-transparent'
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
              <span className={`font-bold text-xl hidden sm:block ${scrollY > 100 ? themeConfig.textPrimary : 'text-white'}`}>
                {config.companyName}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {['Accueil', 'Services', 'À propos', 'Témoignages', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrollY > 100 ? themeConfig.textSecondary : 'text-white/80'
                  } hover:${scrollY > 100 ? themeConfig.textPrimary : 'text-white'}`}
                >
                  {item}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`hidden sm:flex ${scrollY > 100 ? themeConfig.textSecondary : 'text-white/80'}`}
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button 
                className={`rounded-full px-6 text-white ${themeConfig.buttonStyle}`}
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Réserver</span>
              </Button>
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon"
                className={`lg:hidden ${scrollY > 100 ? themeConfig.textPrimary : 'text-white'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`lg:hidden ${themeConfig.headerBg} border-t border-white/10`}>
            <div className="container mx-auto px-4 py-4 space-y-3">
              {['Accueil', 'Services', 'À propos', 'Témoignages', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`block py-2 text-lg font-medium ${themeConfig.textSecondary}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Back button - Fixed */}
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="fixed top-24 left-4 z-40 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Full-screen parallax with animated elements
      ═══════════════════════════════════════════════════════════════ */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 scale-110"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(1.1) translateY(${scrollY * 0.4}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Theme-specific overlay */}
        <div className={`absolute inset-0 ${themeConfig.heroOverlay}`} />
        
        {/* Gradient mesh overlay */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `
              radial-gradient(ellipse at 20% 20%, ${config.primaryColor}30 0%, transparent 50%),
              radial-gradient(ellipse at 80% 80%, ${config.accentColor}25 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${config.secondaryColor}15 0%, transparent 70%)
            `
          }}
        />

        {/* Animated floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large blob top-right */}
          <div 
            className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 ${themeConfig.shapeColor}`}
            style={{ 
              backgroundColor: config.primaryColor,
              transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.02}deg)`,
              animation: 'pulse 8s ease-in-out infinite'
            }}
          />
          {/* Medium blob bottom-left */}
          <div 
            className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-20`}
            style={{ 
              backgroundColor: config.accentColor,
              transform: `translateY(${scrollY * -0.15}px)`,
              animation: 'pulse 6s ease-in-out infinite 2s'
            }}
          />
          {/* Small accent shapes */}
          {theme === "futuriste" && (
            <>
              <div 
                className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-indigo-400 animate-ping"
                style={{ animationDuration: '3s' }}
              />
              <div 
                className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-purple-400 animate-ping"
                style={{ animationDuration: '2.5s', animationDelay: '1s' }}
              />
              <div 
                className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"
                style={{ animationDuration: '4s', animationDelay: '0.5s' }}
              />
            </>
          )}
        </div>

        {/* Floating gallery cards - Desktop only */}
        <div className="absolute inset-0 hidden xl:block pointer-events-none">
          <div 
            className="absolute top-32 right-16 w-48 h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            style={{ 
              transform: `translateY(${scrollY * -0.2}px) rotate(6deg)`,
              opacity: Math.max(0, 1 - scrollY / 500)
            }}
          >
            <img src={galleryImages[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div 
            className="absolute bottom-48 left-16 w-40 h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px) rotate(-8deg)`,
              opacity: Math.max(0, 1 - scrollY / 600)
            }}
          >
            <img src={galleryImages[1]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 animate-fade-in backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}90, ${config.accentColor}90)`,
                boxShadow: theme === "futuriste" ? `0 0 40px ${config.primaryColor}50` : undefined
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">Réservation en ligne instantanée</span>
            </div>

            {/* Main headline with line breaks */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
              {currentTitles.heroTitle.split('\n').map((line, i) => (
                <span 
                  key={i}
                  className={`block animate-fade-in ${
                    i === 1 
                      ? 'bg-clip-text text-transparent' 
                      : theme === "moderne" ? 'text-slate-900' : 'text-white'
                  }`}
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
            <p 
              className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto animate-fade-in ${
                theme === "moderne" ? 'text-slate-600' : 'text-white/80'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              {currentTitles.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                className={`rounded-full px-8 py-6 text-lg font-semibold text-white group ${themeConfig.buttonStyle}`}
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Prendre rendez-vous
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

            {/* Scroll indicator */}
            <div 
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce ${
                theme === "moderne" ? 'text-slate-400' : 'text-white/50'
              }`}
            >
              <ChevronDown className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              className={themeConfig.dividerColor}
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,101.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS SECTION - Animated counters with icons
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className={`py-20 ${themeConfig.pageBg}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-3xl ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)` }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: config.primaryColor }} />
                </div>
                <div className={`text-4xl lg:text-5xl font-black mb-2 ${themeConfig.textPrimary}`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={themeConfig.textSecondary}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES SECTION - Premium cards with hover effects
      ═══════════════════════════════════════════════════════════════ */}
      <section id="services" className={`py-24 ${themeConfig.sectionBg}`}>
        {/* Section header */}
        <div className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
              {currentTitles.badge}
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
              {currentTitles.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span style={{ color: config.primaryColor }}>{currentTitles.title.split(' ').slice(-1)}</span>
            </h2>
            <p className={`text-xl ${themeConfig.textSecondary}`}>
              {currentTitles.subtitle}
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableServices.map((service, index) => (
              <div 
                key={index}
                className={`group relative rounded-3xl overflow-hidden ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
              >
                {/* Service image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Popular badge */}
                  {service.popular && (
                    <div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                    >
                      Populaire
                    </div>
                  )}

                  {/* Price overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <span className="text-white text-2xl font-black">{service.price}</span>
                    <span className="text-white/70 text-sm">{service.duration}</span>
                  </div>
                </div>

                {/* Service content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${themeConfig.textPrimary}`}>
                    {service.name}
                  </h3>
                  <p className={`mb-6 ${themeConfig.textSecondary}`}>
                    {service.description}
                  </p>
                  <Button 
                    className="w-full rounded-xl text-white group-hover:scale-105 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    Réserver
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BOOKING SECTION - Split layout with form
      ═══════════════════════════════════════════════════════════════ */}
      <section className={`py-24 ${themeConfig.pageBg}`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side - Image with overlay */}
            <div className="relative rounded-3xl overflow-hidden h-[500px] lg:h-[600px]">
              <img 
                src={galleryImages[2]} 
                alt="Réservation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent" />
              
              {/* Floating info card */}
              <div className={`absolute bottom-6 left-6 right-6 p-6 rounded-2xl ${
                theme === "moderne" ? 'bg-white' : 'bg-white/10 backdrop-blur-xl border border-white/20'
              }`}>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className={`font-bold ${theme === "moderne" ? 'text-slate-900' : 'text-white'}`}>
                      Réservation instantanée
                    </div>
                    <div className={theme === "moderne" ? 'text-slate-600' : 'text-white/70'}>
                      Confirmez votre rendez-vous en quelques clics
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Booking form */}
            <div>
              <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
                Réservation
              </Badge>
              <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
                Choisissez votre{' '}
                <span style={{ color: config.primaryColor }}>créneau</span>
              </h2>
              <p className={`text-lg mb-8 ${themeConfig.textSecondary}`}>
                Sélectionnez la date et l'heure qui vous conviennent le mieux. Notre équipe vous confirmera votre rendez-vous sous 24h.
              </p>

              {/* Date picker placeholder */}
              <div className={`p-6 rounded-2xl mb-6 ${themeConfig.cardBg}`}>
                <label className={`block text-sm font-medium mb-3 ${themeConfig.textPrimary}`}>
                  Sélectionnez une date
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                    <div key={i} className={`text-center text-xs font-medium py-2 ${themeConfig.textMuted}`}>
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(String(day))}
                      className={`p-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDate === String(day)
                          ? 'text-white'
                          : day === 15 || day === 22
                          ? `${themeConfig.textMuted} cursor-not-allowed opacity-50`
                          : `${themeConfig.textSecondary} hover:bg-white/10`
                      }`}
                      style={selectedDate === String(day) ? { background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` } : {}}
                      disabled={day === 15 || day === 22}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className={`p-6 rounded-2xl mb-6 ${themeConfig.cardBg}`}>
                <label className={`block text-sm font-medium mb-3 ${themeConfig.textPrimary}`}>
                  Horaire disponible
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        selectedTime === slot.time
                          ? 'text-white'
                          : !slot.available
                          ? `${themeConfig.textMuted} cursor-not-allowed opacity-50 line-through`
                          : `${themeConfig.textSecondary} hover:bg-white/10 ${theme === "moderne" ? 'bg-slate-100' : 'bg-white/5'}`
                      }`}
                      style={selectedTime === slot.time ? { background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` } : {}}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Button 
                size="lg"
                className={`w-full rounded-xl text-white py-6 text-lg font-semibold ${themeConfig.buttonStyle}`}
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                Confirmer la réservation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION - Modern carousel style
      ═══════════════════════════════════════════════════════════════ */}
      <section id="témoignages" className={`py-24 ${themeConfig.sectionBg}`}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
              Témoignages
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
              Ce que disent{' '}
              <span style={{ color: config.primaryColor }}>nos clients</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
              >
                {/* Quote icon */}
                <div 
                  className="absolute -top-4 left-8 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                >
                  <Quote className="w-5 h-5 text-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6 mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: config.accentColor }} />
                  ))}
                </div>

                {/* Quote text */}
                <p className={`text-lg mb-6 ${themeConfig.textSecondary}`}>
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={`font-bold ${themeConfig.textPrimary}`}>{testimonial.name}</div>
                    <div className={themeConfig.textMuted}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION - Bold final call to action
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Background with parallax */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${galleryImages[3]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}E0 0%, ${config.accentColor}D0 100%)`
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Prêt à nous rejoindre ?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Réservez dès maintenant et profitez d'une expérience exceptionnelle avec notre équipe de professionnels.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold bg-white hover:bg-white/90 shadow-xl"
              style={{ color: config.primaryColor }}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Réserver maintenant
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
            >
              <Phone className="w-5 h-5 mr-2" />
              Nous contacter
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
            {/* Brand */}
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
                Votre partenaire de confiance pour une expérience exceptionnelle. Réservez en ligne en quelques clics.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-white/60 rounded" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Navigation</h4>
              <ul className="space-y-3">
                {['Accueil', 'Services', 'À propos', 'Témoignages', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-4 h-4" />
                  <span>contact@{config.companyName.toLowerCase().replace(/\s+/g, '')}.com</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>123 Rue Principale, Montréal</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 {config.companyName}. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Mentions légales</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Export/Share floating buttons */}
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
