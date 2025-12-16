import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { 
  Rocket, Calendar, ChevronLeft, ChevronRight, Play, Pause,
  LayoutDashboard, Users, FileText, ShoppingCart, CalendarDays,
  BarChart3, Settings, Bell, Search, Plus, Check, Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DemoPreviewProps {
  config: DemoConfig;
}

interface Slide {
  id: string;
  title: string;
  type: "portal" | "website" | "module";
  icon: React.ReactNode;
}

export const DemoPreview = ({ config }: DemoPreviewProps) => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides: Slide[] = [
    { id: "dashboard", title: "Tableau de bord", type: "portal", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "crm", title: "Gestion clients", type: "portal", icon: <Users className="w-4 h-4" /> },
    { id: "projects", title: "Projets", type: "module", icon: <FileText className="w-4 h-4" /> },
    { id: "ecommerce", title: "Boutique", type: "website", icon: <ShoppingCart className="w-4 h-4" /> },
    { id: "booking", title: "Réservations", type: "module", icon: <CalendarDays className="w-4 h-4" /> },
    { id: "analytics", title: "Statistiques", type: "portal", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  const handleStartProject = () => {
    toast({
      title: "Démarrage du projet",
      description: "Nous vous contacterons dans les 24h pour démarrer votre projet",
    });
  };

  const handleContact = () => {
    toast({
      title: "Appel découverte",
      description: "Nous vous contacterons dans les 24h pour planifier votre appel découverte",
    });
  };

  // Render different mockup content based on slide type
  const renderSlideContent = () => {
    const slide = slides[currentSlide];
    
    switch (slide.id) {
      case "dashboard":
        return <DashboardMockup config={config} />;
      case "crm":
        return <CRMMockup config={config} />;
      case "projects":
        return <ProjectsMockup config={config} />;
      case "ecommerce":
        return <EcommerceMockup config={config} />;
      case "booking":
        return <BookingMockup config={config} />;
      case "analytics":
        return <AnalyticsMockup config={config} />;
      default:
        return <DashboardMockup config={config} />;
    }
  };

  return (
    <Card className="p-6 shadow-xl border-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">Aperçu en temps réel</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Slideshow Preview */}
      <div
        className="relative rounded-xl overflow-hidden mb-4"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColor}08, ${config.accentColor}08)`,
        }}
      >
        {/* Browser Chrome */}
        <div 
          className="px-4 py-2.5 flex items-center gap-3 border-b"
          style={{ 
            background: `linear-gradient(to right, ${config.primaryColor}10, ${config.accentColor}05)`,
            borderColor: config.primaryColor + "20"
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white/80 rounded-full px-4 py-1.5 text-xs text-muted-foreground flex items-center gap-2">
            <Search className="w-3 h-3" />
            <span>{config.companyName.toLowerCase().replace(/\s/g, '')}.latroussedigitale.ca</span>
          </div>
        </div>

        {/* Slide Navigation Tabs */}
        <div className="flex items-center gap-1 px-3 py-2 bg-muted/30 overflow-x-auto scrollbar-hide">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                index === currentSlide 
                  ? "text-white shadow-lg scale-105" 
                  : "bg-white/50 text-muted-foreground hover:bg-white/80"
              }`}
              style={index === currentSlide ? { 
                backgroundColor: config.primaryColor,
                boxShadow: `0 4px 14px ${config.primaryColor}40`
              } : {}}
            >
              {slide.icon}
              <span className="hidden sm:inline">{slide.title}</span>
            </button>
          ))}
        </div>

        {/* Slide Content */}
        <div className="relative min-h-[320px] p-4">
          <div 
            className={`transition-all duration-300 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {renderSlideContent()}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 pb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-6" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              style={index === currentSlide ? { backgroundColor: config.primaryColor } : {}}
            />
          ))}
        </div>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 mb-4">
        {config.logo ? (
          <img src={config.logo} alt="Logo" className="w-10 h-10 object-contain rounded" />
        ) : (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg"
            style={{ backgroundColor: config.primaryColor }}
          >
            {config.companyName.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold">{config.companyName || "Votre entreprise"}</h4>
          <p className="text-xs text-muted-foreground">Solution personnalisée</p>
        </div>
        <div className="flex gap-1">
          {[config.primaryColor, config.accentColor, config.secondaryColor].map((color, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          className="flex-1 group" 
          size="sm" 
          onClick={handleStartProject}
          style={{ backgroundColor: config.primaryColor }}
        >
          <Rocket className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          Démarrer
        </Button>
        <Button variant="outline" className="flex-1" size="sm" onClick={handleContact}>
          <Calendar className="w-4 h-4 mr-2" />
          Appel découverte
        </Button>
      </div>
    </Card>
  );
};

// Mockup Components
const DashboardMockup = ({ config }: { config: DemoConfig }) => (
  <div className="space-y-3">
    {/* Stats Row */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Clients", value: "1,234", icon: <Users className="w-4 h-4" /> },
        { label: "Projets", value: "56", icon: <FileText className="w-4 h-4" /> },
        { label: "Revenus", value: "45K$", icon: <BarChart3 className="w-4 h-4" /> },
      ].map((stat, i) => (
        <div 
          key={i}
          className="p-3 rounded-lg bg-white shadow-sm border animate-fade-in"
          style={{ 
            animationDelay: `${i * 0.1}s`,
            borderColor: config.primaryColor + "20"
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div 
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: config.primaryColor + "20", color: config.primaryColor }}
            >
              {stat.icon}
            </div>
          </div>
          <div className="text-lg font-bold" style={{ color: config.primaryColor }}>{stat.value}</div>
          <div className="text-xs text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
    
    {/* Chart Area */}
    <div className="p-4 rounded-lg bg-white shadow-sm border" style={{ borderColor: config.primaryColor + "20" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">Activité récente</span>
        <Badge variant="outline" style={{ color: config.primaryColor, borderColor: config.primaryColor }}>
          Cette semaine
        </Badge>
      </div>
      <div className="flex items-end gap-1 h-16">
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-t transition-all duration-500 animate-scale-in"
            style={{
              height: `${height}%`,
              backgroundColor: i === 5 ? config.primaryColor : config.primaryColor + "40",
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>

    {/* Activity List */}
    <div className="space-y-2">
      {[
        { text: "Nouveau client ajouté", time: "Il y a 2min" },
        { text: "Facture #1234 payée", time: "Il y a 15min" },
      ].map((item, i) => (
        <div 
          key={i}
          className="flex items-center gap-3 p-2 rounded-lg bg-white shadow-sm animate-fade-in"
          style={{ animationDelay: `${0.5 + i * 0.1}s` }}
        >
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: config.accentColor + "20" }}
          >
            <Check className="w-4 h-4" style={{ color: config.accentColor }} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{item.text}</div>
            <div className="text-xs text-muted-foreground">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CRMMockup = ({ config }: { config: DemoConfig }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold">Clients récents</h4>
      <Button size="sm" style={{ backgroundColor: config.primaryColor }} className="text-white h-7 text-xs">
        <Plus className="w-3 h-3 mr-1" /> Ajouter
      </Button>
    </div>
    <div className="space-y-2">
      {[
        { name: "Marie Dubois", email: "marie@example.com", status: "Actif" },
        { name: "Jean Martin", email: "jean@example.com", status: "Nouveau" },
        { name: "Sophie Bernard", email: "sophie@example.com", status: "VIP" },
      ].map((client, i) => (
        <div 
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border animate-fade-in"
          style={{ animationDelay: `${i * 0.15}s`, borderColor: config.primaryColor + "15" }}
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: config.primaryColor }}
          >
            {client.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{client.name}</div>
            <div className="text-xs text-muted-foreground">{client.email}</div>
          </div>
          <Badge 
            style={{ 
              backgroundColor: client.status === "VIP" ? config.accentColor + "20" : config.primaryColor + "20",
              color: client.status === "VIP" ? config.accentColor : config.primaryColor
            }}
          >
            {client.status}
          </Badge>
        </div>
      ))}
    </div>
  </div>
);

const ProjectsMockup = ({ config }: { config: DemoConfig }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold">Projets en cours</h4>
      <Badge style={{ backgroundColor: config.primaryColor + "20", color: config.primaryColor }}>
        3 actifs
      </Badge>
    </div>
    {[
      { name: "Refonte site web", progress: 75, dueDate: "15 jan" },
      { name: "Application mobile", progress: 45, dueDate: "28 jan" },
      { name: "Campagne marketing", progress: 90, dueDate: "10 jan" },
    ].map((project, i) => (
      <div 
        key={i}
        className="p-3 rounded-lg bg-white shadow-sm border animate-fade-in"
        style={{ animationDelay: `${i * 0.15}s`, borderColor: config.primaryColor + "15" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">{project.name}</span>
          <span className="text-xs text-muted-foreground">{project.dueDate}</span>
        </div>
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
            style={{ 
              width: `${project.progress}%`,
              backgroundColor: project.progress > 80 ? config.accentColor : config.primaryColor
            }}
          />
        </div>
        <div className="text-xs text-right mt-1" style={{ color: config.primaryColor }}>
          {project.progress}%
        </div>
      </div>
    ))}
  </div>
);

const EcommerceMockup = ({ config }: { config: DemoConfig }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 p-2 rounded-lg bg-white shadow-sm">
      <Search className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Rechercher un produit...</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {[
        { name: "Produit A", price: "29,99 $", rating: 5 },
        { name: "Produit B", price: "49,99 $", rating: 4 },
        { name: "Produit C", price: "19,99 $", rating: 5 },
        { name: "Produit D", price: "39,99 $", rating: 4 },
      ].map((product, i) => (
        <div 
          key={i}
          className="p-3 rounded-lg bg-white shadow-sm border animate-fade-in group cursor-pointer hover:shadow-md transition-all"
          style={{ animationDelay: `${i * 0.1}s`, borderColor: config.primaryColor + "15" }}
        >
          <div 
            className="h-16 rounded-md mb-2 flex items-center justify-center"
            style={{ backgroundColor: config.primaryColor + "10" }}
          >
            <ShoppingCart className="w-6 h-6" style={{ color: config.primaryColor + "60" }} />
          </div>
          <div className="text-sm font-medium">{product.name}</div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-bold text-sm" style={{ color: config.primaryColor }}>{product.price}</span>
            <div className="flex">
              {[...Array(product.rating)].map((_, j) => (
                <Star key={j} className="w-3 h-3 fill-current" style={{ color: config.secondaryColor }} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BookingMockup = ({ config }: { config: DemoConfig }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h4 className="font-semibold">Réservations aujourd'hui</h4>
      <Badge style={{ backgroundColor: config.accentColor, color: "white" }}>5 RDV</Badge>
    </div>
    <div className="grid grid-cols-7 gap-1">
      {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
        <div key={i} className="text-center text-xs text-muted-foreground font-medium py-1">
          {day}
        </div>
      ))}
      {[...Array(28)].map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-md flex items-center justify-center text-xs ${
            [5, 12, 15, 19, 22].includes(i) ? "text-white font-bold" : "hover:bg-muted/50"
          }`}
          style={[5, 12, 15, 19, 22].includes(i) ? { backgroundColor: config.primaryColor } : {}}
        >
          {i + 1}
        </div>
      ))}
    </div>
    <div className="space-y-2 mt-2">
      {[
        { time: "09:00", client: "Marie D.", service: "Consultation" },
        { time: "11:30", client: "Jean M.", service: "Suivi" },
      ].map((rdv, i) => (
        <div 
          key={i}
          className="flex items-center gap-3 p-2 rounded-lg bg-white shadow-sm animate-fade-in"
          style={{ animationDelay: `${0.3 + i * 0.1}s` }}
        >
          <div 
            className="px-2 py-1 rounded text-xs font-bold text-white"
            style={{ backgroundColor: config.primaryColor }}
          >
            {rdv.time}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{rdv.client}</div>
            <div className="text-xs text-muted-foreground">{rdv.service}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsMockup = ({ config }: { config: DemoConfig }) => (
  <div className="space-y-3">
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Visiteurs", value: "12.5K", change: "+12%" },
        { label: "Conversions", value: "3.2%", change: "+5%" },
      ].map((stat, i) => (
        <div 
          key={i}
          className="p-3 rounded-lg bg-white shadow-sm animate-fade-in"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="text-xs text-muted-foreground">{stat.label}</div>
          <div className="text-xl font-bold" style={{ color: config.primaryColor }}>{stat.value}</div>
          <div className="text-xs font-medium" style={{ color: config.accentColor }}>{stat.change}</div>
        </div>
      ))}
    </div>
    
    {/* Line Chart Mockup */}
    <div className="p-4 rounded-lg bg-white shadow-sm">
      <div className="text-sm font-medium mb-3">Tendance mensuelle</div>
      <svg viewBox="0 0 200 60" className="w-full h-16">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.primaryColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={config.primaryColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 50 Q 25 45, 50 35 T 100 25 T 150 15 T 200 20"
          fill="none"
          stroke={config.primaryColor}
          strokeWidth="2"
          className="animate-fade-in"
        />
        <path
          d="M 0 50 Q 25 45, 50 35 T 100 25 T 150 15 T 200 20 V 60 H 0 Z"
          fill="url(#gradient)"
          className="animate-fade-in"
        />
      </svg>
    </div>

    {/* Top Pages */}
    <div className="space-y-2">
      {[
        { page: "/accueil", views: "4.2K" },
        { page: "/produits", views: "2.8K" },
        { page: "/contact", views: "1.5K" },
      ].map((item, i) => (
        <div 
          key={i}
          className="flex items-center justify-between p-2 rounded bg-muted/30 animate-fade-in"
          style={{ animationDelay: `${0.3 + i * 0.1}s` }}
        >
          <span className="text-sm">{item.page}</span>
          <span className="text-sm font-medium" style={{ color: config.primaryColor }}>{item.views}</span>
        </div>
      ))}
    </div>
  </div>
);
