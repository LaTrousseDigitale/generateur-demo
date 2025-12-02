import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { 
  ArrowLeft, Download, Share2, ArrowRight, CheckCircle2, Star, Mail, 
  Phone, MapPin, Menu, Play, Sparkles, Award, Users, TrendingUp, 
  Quote, ChevronDown, X, Zap, Target, Lightbulb, Heart, Clock,
  Building, Briefcase, Globe
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { getThemeStyles, type DemoTheme } from "@/types/demoThemes";
import heroDefault from "@/assets/hero-default.jpg";
import heroAuto from "@/assets/hero-auto.jpg";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import heroHealth from "@/assets/hero-health.jpg";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import projectArchitecture1 from "@/assets/project-architecture-1.jpg";
import projectAuto1 from "@/assets/project-auto-1.jpg";
import projectHealth1 from "@/assets/project-health-1.jpg";
import projectConstruction1 from "@/assets/project-construction-1.jpg";
import projectRestaurant1 from "@/assets/project-restaurant-1.jpg";

interface ShowcaseWebsiteDemoProps {
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

export const ShowcaseWebsiteDemo = ({ config, onBack }: ShowcaseWebsiteDemoProps) => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated counters
  const counter1 = useCountUp(500, 2000, statsVisible);
  const counter2 = useCountUp(98, 1500, statsVisible);
  const counter3 = useCountUp(15, 1000, statsVisible);
  const counter4 = useCountUp(24, 1200, statsVisible);

  // Industry images mapping
  const industryImages = {
    architecture: { hero: heroArchitecture, projects: [projectArchitecture1, project2, project3] },
    auto: { hero: heroAuto, projects: [projectAuto1, project2, project3] },
    "pieces-auto": { hero: heroAuto, projects: [projectAuto1, project2, project3] },
    sante: { hero: heroHealth, projects: [projectHealth1, project2, project3] },
    construction: { hero: heroConstruction, projects: [projectConstruction1, project2, project3] },
    restauration: { hero: heroRestaurant, projects: [projectRestaurant1, project2, project3] },
  };

  const selectedImages = industryImages[config.industry as keyof typeof industryImages] || {
    hero: heroDefault,
    projects: [project1, project2, project3]
  };

  const handleExport = () => {
    toast({ title: "Export en cours", description: "Votre démo sera prête dans quelques instants" });
  };

  const handleShare = () => {
    toast({ title: "Lien de partage créé", description: "Le lien a été copié dans votre presse-papiers" });
  };

  // Industry-specific content
  const industryContent = {
    architecture: {
      heroTitle: "Concevons\nl'extraordinaire",
      heroSubtitle: "Cabinet d'architecture primé, nous transformons vos visions en espaces d'exception",
      services: [
        { icon: Building, title: "Conception architecturale", desc: "Des plans innovants qui allient esthétique et fonctionnalité" },
        { icon: Lightbulb, title: "Design d'intérieur", desc: "Espaces intérieurs pensés pour votre bien-être" },
        { icon: Target, title: "Gestion de projet", desc: "Suivi complet de la conception à la livraison" },
        { icon: Globe, title: "Architecture durable", desc: "Solutions éco-responsables pour un avenir meilleur" },
      ],
    },
    construction: {
      heroTitle: "Bâtissons\nl'avenir",
      heroSubtitle: "Leader en construction, nous réalisons vos projets les plus ambitieux",
      services: [
        { icon: Building, title: "Construction neuve", desc: "Bâtiments résidentiels et commerciaux de qualité" },
        { icon: Target, title: "Rénovation", desc: "Transformation et modernisation de vos espaces" },
        { icon: Zap, title: "Gestion de chantier", desc: "Coordination experte de tous vos travaux" },
        { icon: Globe, title: "Développement durable", desc: "Constructions certifiées et éco-responsables" },
      ],
    },
    sante: {
      heroTitle: "Votre santé,\nnotre mission",
      heroSubtitle: "Clinique multidisciplinaire offrant des soins de santé personnalisés",
      services: [
        { icon: Heart, title: "Médecine générale", desc: "Consultations et suivis médicaux complets" },
        { icon: Users, title: "Spécialités médicales", desc: "Accès à nos experts dans toutes les disciplines" },
        { icon: Clock, title: "Urgences mineures", desc: "Prise en charge rapide sans rendez-vous" },
        { icon: Globe, title: "Télémédecine", desc: "Consultations à distance pour votre confort" },
      ],
    },
    services: {
      heroTitle: "Excellence\nprofessionnelle",
      heroSubtitle: "Des solutions sur mesure pour propulser votre entreprise vers le succès",
      services: [
        { icon: Briefcase, title: "Consultation stratégique", desc: "Analyse et recommandations d'experts" },
        { icon: TrendingUp, title: "Optimisation", desc: "Amélioration continue de vos processus" },
        { icon: Users, title: "Accompagnement", desc: "Support personnalisé à chaque étape" },
        { icon: Lightbulb, title: "Innovation", desc: "Solutions créatives pour vos défis" },
      ],
    },
    default: {
      heroTitle: "Transformez\nvotre vision",
      heroSubtitle: "Des solutions professionnelles qui propulsent votre entreprise vers le succès",
      services: [
        { icon: Zap, title: "Service premium", desc: "Qualité exceptionnelle garantie" },
        { icon: Users, title: "Équipe experte", desc: "Des professionnels à votre service" },
        { icon: Target, title: "Sur mesure", desc: "Solutions adaptées à vos besoins" },
        { icon: Award, title: "Excellence", desc: "Engagement qualité sans compromis" },
      ],
    },
  };

  const content = industryContent[config.industry as keyof typeof industryContent] || industryContent.default;

  const stats = [
    { value: counter1, suffix: "+", label: "Projets réalisés" },
    { value: counter2, suffix: "%", label: "Clients satisfaits" },
    { value: counter3, suffix: " ans", label: "D'expérience" },
    { value: counter4, suffix: "/7", label: "Disponibilité" },
  ];

  const testimonials = [
    { name: "Sophie Martin", role: "CEO, TechCorp", text: "Une équipe exceptionnelle qui a su comprendre nos besoins et livrer un résultat au-delà de nos attentes. Je recommande vivement!", rating: 5, image: project1 },
    { name: "Pierre Dubois", role: "Directeur, InnovCo", text: "Professionnalisme, créativité et rigueur. Le trio gagnant pour notre projet de transformation digitale.", rating: 5, image: project2 },
    { name: "Marie Laurent", role: "Manager, StartUp", text: "Du début à la fin, un accompagnement personnalisé et des résultats qui parlent d'eux-mêmes.", rating: 5, image: project3 },
  ];

  const projects = [
    { title: "Projet Excellence", category: "Stratégie", image: selectedImages.projects[0] },
    { title: "Innovation 360", category: "Digital", image: selectedImages.projects[1] },
    { title: "Vision Future", category: "Conseil", image: selectedImages.projects[2] },
  ];

  // Theme configuration
  const theme = config.theme || "moderne";
  
  const getThemeConfig = () => {
    switch(theme) {
      case "moderne":
        return {
          pageBg: "bg-white",
          heroOverlay: "bg-gradient-to-br from-white/90 via-slate-50/80 to-white/70",
          headerBg: "bg-white/90 backdrop-blur-xl border-b border-slate-100",
          cardBg: "bg-white border border-slate-100 shadow-xl shadow-slate-200/50",
          cardHover: "hover:shadow-2xl hover:-translate-y-2",
          textPrimary: "text-slate-900",
          textSecondary: "text-slate-600",
          textMuted: "text-slate-400",
          sectionBg: "bg-slate-50",
          sectionAlt: "bg-white",
          badgeStyle: "bg-slate-100 text-slate-700",
          buttonStyle: "shadow-lg hover:shadow-xl",
          dividerColor: "fill-slate-50",
        };
      case "rustique":
        return {
          pageBg: "bg-stone-950",
          heroOverlay: "bg-gradient-to-br from-stone-950/90 via-stone-900/80 to-amber-950/70",
          headerBg: "bg-stone-900/90 backdrop-blur-xl border-b border-amber-900/20",
          cardBg: "bg-gradient-to-br from-stone-900 to-stone-800 border border-amber-800/20",
          cardHover: "hover:border-amber-700/40 hover:-translate-y-2",
          textPrimary: "text-amber-50",
          textSecondary: "text-stone-300",
          textMuted: "text-stone-500",
          sectionBg: "bg-stone-900",
          sectionAlt: "bg-stone-950",
          badgeStyle: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
          buttonStyle: "shadow-lg shadow-amber-900/30",
          dividerColor: "fill-stone-900",
        };
      case "futuriste":
        return {
          pageBg: "bg-slate-950",
          heroOverlay: "bg-gradient-to-br from-slate-950/80 via-indigo-950/60 to-purple-950/50",
          headerBg: "bg-slate-950/80 backdrop-blur-xl border-b border-white/10",
          cardBg: "bg-white/5 backdrop-blur-2xl border border-white/10",
          cardHover: "hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(99,102,241,0.3)]",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-500",
          sectionBg: "bg-slate-900/50",
          sectionAlt: "bg-slate-950",
          badgeStyle: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/30",
          buttonStyle: "shadow-[0_0_30px_rgba(99,102,241,0.4)]",
          dividerColor: "fill-slate-900/50",
        };
      default:
        return {
          pageBg: "bg-slate-950",
          heroOverlay: "bg-slate-950/70",
          headerBg: "bg-slate-900/90 backdrop-blur-xl",
          cardBg: "bg-slate-900 border border-white/10",
          cardHover: "hover:bg-slate-800",
          textPrimary: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-500",
          sectionBg: "bg-slate-900",
          sectionAlt: "bg-slate-950",
          badgeStyle: "bg-slate-800 text-slate-200",
          buttonStyle: "",
          dividerColor: "fill-slate-900",
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
              {['Accueil', 'Services', 'Réalisations', 'Témoignages', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors relative group ${
                    scrollY > 100 ? themeConfig.textSecondary : 'text-white/80'
                  }`}
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
                className={`rounded-full px-6 text-white hidden sm:flex ${themeConfig.buttonStyle}`}
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                Devis gratuit
              </Button>
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden ${themeConfig.headerBg} border-t border-white/10`}>
            <div className="container mx-auto px-4 py-4 space-y-3">
              {['Accueil', 'Services', 'Réalisations', 'Témoignages', 'Contact'].map((item) => (
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

      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={onBack} 
        className="fixed top-24 left-4 z-40 bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 rounded-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour
      </Button>

      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION - Full-screen with parallax
      ═══════════════════════════════════════════════════════════════ */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 scale-110"
          style={{ 
            backgroundImage: `url(${selectedImages.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(1.1) translateY(${scrollY * 0.4}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        
        {/* Theme overlay */}
        <div className={`absolute inset-0 ${themeConfig.heroOverlay}`} />
        
        {/* Gradient mesh */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `
              radial-gradient(ellipse at 30% 20%, ${config.primaryColor}40 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${config.accentColor}30 0%, transparent 50%)
            `
          }}
        />

        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-25"
            style={{ 
              backgroundColor: config.primaryColor,
              transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.02}deg)`,
              animation: 'pulse 8s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
            style={{ 
              backgroundColor: config.accentColor,
              transform: `translateY(${scrollY * -0.15}px)`,
              animation: 'pulse 6s ease-in-out infinite 2s'
            }}
          />
          {theme === "futuriste" && (
            <>
              <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-indigo-400 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-purple-400 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
            </>
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 animate-fade-in backdrop-blur-sm"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}90, ${config.accentColor}90)`,
                boxShadow: theme === "futuriste" ? `0 0 40px ${config.primaryColor}50` : undefined
              }}
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">Excellence & Innovation</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
              {content.heroTitle.split('\n').map((line, i) => (
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
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fade-in ${
                theme === "moderne" ? 'text-slate-600' : 'text-white/80'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              {content.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                className={`rounded-full px-8 py-6 text-lg font-semibold text-white group ${themeConfig.buttonStyle}`}
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                Démarrer un projet
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
                Voir notre vidéo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 flex-wrap animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {[
                { icon: CheckCircle2, text: "500+ projets réussis" },
                { icon: Award, text: "98% satisfaction" },
                { icon: Clock, text: "Support 24/7" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 ${theme === "moderne" ? 'text-slate-600' : 'text-white/80'}`}>
                  <item.icon className="w-5 h-5" style={{ color: config.primaryColor }} />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce ${theme === "moderne" ? 'text-slate-400' : 'text-white/50'}`}>
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
          STATS SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className={`py-20 ${themeConfig.sectionBg}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-3xl ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
              >
                <div className={`text-5xl lg:text-6xl font-black mb-2 ${themeConfig.textPrimary}`}>
                  {stat.value}{stat.suffix}
                </div>
                <div className={themeConfig.textSecondary}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="services" className={`py-24 ${themeConfig.sectionAlt}`}>
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
              Nos services
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
              Ce que nous{' '}
              <span style={{ color: config.primaryColor }}>proposons</span>
            </h2>
            <p className={`text-xl ${themeConfig.textSecondary}`}>
              Une gamme complète de services professionnels pour répondre à tous vos besoins
            </p>
          </div>

          {/* Services grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.map((service, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-3xl ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)` }}
                >
                  <service.icon className="w-8 h-8" style={{ color: config.primaryColor }} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${themeConfig.textPrimary}`}>{service.title}</h3>
                <p className={themeConfig.textSecondary}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          PROJECTS / PORTFOLIO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="réalisations" className={`py-24 ${themeConfig.sectionBg}`}>
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
              Portfolio
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
              Nos dernières{' '}
              <span style={{ color: config.primaryColor }}>réalisations</span>
            </h2>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`group relative rounded-3xl overflow-hidden ${themeConfig.cardBg} ${themeConfig.cardHover} transition-all duration-500`}
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Overlay content */}
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div>
                      <Badge 
                        className="mb-2 text-white"
                        style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                      >
                        {project.category}
                      </Badge>
                      <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Default content */}
                <div className="p-6 group-hover:opacity-0 transition-opacity">
                  <Badge className={`mb-2 ${themeConfig.badgeStyle}`}>{project.category}</Badge>
                  <h3 className={`text-xl font-bold ${themeConfig.textPrimary}`}>{project.title}</h3>
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
              Voir tous les projets
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="témoignages" className={`py-24 ${themeConfig.sectionAlt}`}>
        <div className="container mx-auto px-4">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
              Témoignages
            </Badge>
            <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
              Ce que disent{' '}
              <span style={{ color: config.primaryColor }}>nos clients</span>
            </h2>
          </div>

          {/* Testimonials carousel */}
          <div className="max-w-4xl mx-auto">
            <div className={`relative p-8 md:p-12 rounded-3xl ${themeConfig.cardBg}`}>
              {/* Quote icon */}
              <div 
                className="absolute -top-6 left-12 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current" style={{ color: config.accentColor }} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${themeConfig.textSecondary}`}>
                    "{testimonials[activeTestimonial].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                    >
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className={`font-bold text-lg ${themeConfig.textPrimary}`}>
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className={themeConfig.textMuted}>
                        {testimonials[activeTestimonial].role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="hidden md:block">
                  <div className="relative rounded-2xl overflow-hidden h-64">
                    <img 
                      src={testimonials[activeTestimonial].image} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)` }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === activeTestimonial 
                        ? 'w-8' 
                        : theme === "moderne" ? 'bg-slate-300' : 'bg-white/20'
                    }`}
                    style={i === activeTestimonial ? { background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` } : {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url(${selectedImages.hero})`,
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
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="rounded-full px-10 py-6 text-lg font-semibold bg-white hover:bg-white/90 shadow-xl"
              style={{ color: config.primaryColor }}
            >
              Demander un devis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-10 py-6 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
            >
              <Phone className="w-5 h-5 mr-2" />
              Nous appeler
            </Button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section id="contact" className={`py-24 ${themeConfig.sectionBg}`}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact info */}
            <div>
              <Badge className={`mb-4 ${themeConfig.badgeStyle}`}>
                Contact
              </Badge>
              <h2 className={`text-4xl md:text-5xl font-black mb-6 ${themeConfig.textPrimary}`}>
                Parlons de votre{' '}
                <span style={{ color: config.primaryColor }}>projet</span>
              </h2>
              <p className={`text-lg mb-8 ${themeConfig.textSecondary}`}>
                Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre projet.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, label: "Téléphone", value: "+1 (555) 123-4567" },
                  { icon: Mail, label: "Email", value: `contact@${config.companyName.toLowerCase().replace(/\s+/g, '')}.com` },
                  { icon: MapPin, label: "Adresse", value: "123 Rue Principale, Montréal, QC" },
                ].map((item, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-4 p-4 rounded-2xl ${themeConfig.cardBg}`}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: config.primaryColor }} />
                    </div>
                    <div>
                      <div className={`text-sm ${themeConfig.textMuted}`}>{item.label}</div>
                      <div className={`font-medium ${themeConfig.textPrimary}`}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact form */}
            <div className={`p-8 rounded-3xl ${themeConfig.cardBg}`}>
              <h3 className={`text-2xl font-bold mb-6 ${themeConfig.textPrimary}`}>
                Envoyez-nous un message
              </h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${themeConfig.textPrimary}`}>Prénom</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === "moderne" 
                          ? 'border-slate-200 bg-white' 
                          : 'border-white/10 bg-white/5'
                      } ${themeConfig.textPrimary} focus:outline-none focus:ring-2`}
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${themeConfig.textPrimary}`}>Nom</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-xl border ${
                        theme === "moderne" 
                          ? 'border-slate-200 bg-white' 
                          : 'border-white/10 bg-white/5'
                      } ${themeConfig.textPrimary} focus:outline-none focus:ring-2`}
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeConfig.textPrimary}`}>Email</label>
                  <input 
                    type="email" 
                    className={`w-full px-4 py-3 rounded-xl border ${
                      theme === "moderne" 
                        ? 'border-slate-200 bg-white' 
                        : 'border-white/10 bg-white/5'
                    } ${themeConfig.textPrimary} focus:outline-none focus:ring-2`}
                    placeholder="jean@exemple.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${themeConfig.textPrimary}`}>Message</label>
                  <textarea 
                    className={`w-full px-4 py-3 rounded-xl border ${
                      theme === "moderne" 
                        ? 'border-slate-200 bg-white' 
                        : 'border-white/10 bg-white/5'
                    } ${themeConfig.textPrimary} focus:outline-none focus:ring-2 h-32 resize-none`}
                    placeholder="Décrivez votre projet..."
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className={`w-full rounded-xl text-white ${themeConfig.buttonStyle}`}
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                >
                  Envoyer le message
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
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
                Votre partenaire de confiance pour des projets exceptionnels. Contactez-nous pour transformer vos idées en réalité.
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
            <div>
              <h4 className="font-bold text-white mb-4">Navigation</h4>
              <ul className="space-y-3">
                {['Accueil', 'Services', 'Réalisations', 'Témoignages', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
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
                  <span>Montréal, QC</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2024 {config.companyName}. Tous droits réservés.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Mentions légales</a>
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
