import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { 
  ArrowLeft, Download, Share2, Calendar, Clock, MapPin, Users, 
  CheckCircle2, Star, Menu, ChevronRight, Sparkles, Zap, Shield, 
  Phone, Mail, Bell, ArrowRight, Play, Heart, Award, TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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

export const BookingDemo = ({ config, onBack }: BookingDemoProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const services = {
    sante: [
      { name: "Consultation Générale", duration: "30 min", price: "75 $", icon: Users, popular: false, image: bookingHealthClinic },
      { name: "Consultation Spécialisée", duration: "45 min", price: "120 $", icon: Star, popular: true, image: bookingArchitectureOffice },
      { name: "Suivi Médical", duration: "20 min", price: "60 $", icon: Calendar, popular: false, image: bookingRestaurantInterior },
    ],
    restauration: [
      { name: "Table 2 Personnes", duration: "2h", price: "Gratuit", icon: Users, popular: false, image: bookingRestaurantInterior },
      { name: "Table 4 Personnes", duration: "2h", price: "Gratuit", icon: Users, popular: true, image: bookingHealthClinic },
      { name: "Salle Privée 8-12 pers", duration: "3h", price: "150 $", icon: Star, popular: false, image: bookingArchitectureOffice },
    ],
    "services-pro": [
      { name: "Consultation Initiale", duration: "60 min", price: "180 $", icon: Users, popular: false, image: bookingArchitectureOffice },
      { name: "Session de Suivi", duration: "30 min", price: "90 $", icon: Calendar, popular: true, image: bookingHealthClinic },
      { name: "Audit Complet", duration: "2h", price: "375 $", icon: Star, popular: false, image: bookingConstructionOffice },
    ],
  };

  const availableServices = services[config.industry as keyof typeof services] || services["services-pro"];

  const stats = [
    { value: "15K+", label: "Clients satisfaits", icon: Heart },
    { value: "98%", label: "Taux de satisfaction", icon: TrendingUp },
    { value: "24/7", label: "Support disponible", icon: Shield },
    { value: "5★", label: "Note moyenne", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Floating Header */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={onBack} 
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center gap-3">
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="h-10 w-auto object-contain" />
                )}
                <span className="font-bold text-lg hidden sm:block">{config.companyName}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleShare} 
                  className="text-white hover:bg-white/10"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleExport}
                  className="rounded-xl shadow-lg transition-all duration-300 hover:scale-105 text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Télécharger</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Epic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video-like Background with Parallax */}
        <div 
          className="absolute inset-0 scale-125 transition-transform duration-100"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(1.25) translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Dark Overlay for text visibility */}
        <div className="absolute inset-0 bg-slate-950/70" />
        
        {/* Gradient Overlays */}
        <div 
          className="absolute inset-0 mix-blend-overlay"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}40 0%, transparent 50%, ${config.accentColor}30 100%)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        
        {/* Animated Floating Elements */}
        <div 
          className="absolute top-32 right-20 w-80 h-80 rounded-full blur-[100px] animate-pulse"
          style={{ backgroundColor: config.primaryColor, opacity: 0.3 }}
        />
        <div 
          className="absolute bottom-32 left-20 w-96 h-96 rounded-full blur-[120px] animate-pulse"
          style={{ backgroundColor: config.accentColor, opacity: 0.2, animationDelay: '2s' }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-[80px] animate-pulse"
          style={{ backgroundColor: config.secondaryColor, opacity: 0.15, animationDelay: '4s' }}
        />

        {/* Floating Image Cards */}
        <div 
          className="absolute top-40 right-10 md:right-20 w-32 md:w-48 h-40 md:h-60 rounded-2xl overflow-hidden shadow-2xl border border-white/20 animate-fade-in hidden lg:block"
          style={{ 
            animationDelay: '0.5s',
            transform: `translateY(${scrollY * -0.1}px) rotate(6deg)`,
          }}
        >
          <img src={galleryImages[0]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>
        <div 
          className="absolute bottom-40 left-10 md:left-20 w-28 md:w-40 h-36 md:h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/20 animate-fade-in hidden lg:block"
          style={{ 
            animationDelay: '0.7s',
            transform: `translateY(${scrollY * -0.15}px) rotate(-8deg)`,
          }}
        >
          <img src={galleryImages[1]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>
        <div 
          className="absolute top-60 left-32 w-24 md:w-32 h-32 md:h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/20 animate-fade-in hidden xl:block"
          style={{ 
            animationDelay: '0.9s',
            transform: `translateY(${scrollY * -0.2}px) rotate(12deg)`,
          }}
        >
          <img src={galleryImages[2]} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 animate-fade-in border border-white/20 shadow-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
              }}
            >
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Réservation en ligne instantanée</span>
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight">
              <span 
                className="block animate-fade-in text-white"
                style={{ animationDelay: '0.1s' }}
              >
                Réservez votre
              </span>
              <span 
                className="block animate-fade-in bg-clip-text text-transparent py-2"
                style={{ 
                  animationDelay: '0.2s',
                  backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor}, ${config.secondaryColor})`,
                }}
              >
                rendez-vous
              </span>
              <span 
                className="block animate-fade-in text-white"
                style={{ animationDelay: '0.3s' }}
              >
                en quelques clics
              </span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto animate-fade-in leading-relaxed"
              style={{ animationDelay: '0.4s' }}
            >
              Système de réservation simple et rapide. 
              <span className="text-white font-semibold"> Choisissez votre créneau</span> et 
              <span className="text-white font-semibold"> confirmez instantanément.</span>
            </p>

            {/* Feature Pills */}
            <div 
              className="flex items-center justify-center gap-3 md:gap-6 flex-wrap mb-12 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              {[
                { icon: Zap, text: "Temps réel" },
                { icon: CheckCircle2, text: "Confirmation instantanée" },
                { icon: Bell, text: "Rappels auto" },
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-110 cursor-pointer group"
                >
                  <feature.icon 
                    className="w-5 h-5 transition-transform group-hover:rotate-12" 
                    style={{ color: config.accentColor }}
                  />
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div 
              className="flex items-center justify-center gap-4 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              <Button 
                size="lg"
                className="text-lg px-10 py-7 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-110 group text-white"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                  boxShadow: `0 25px 50px ${config.primaryColor}50`
                }}
              >
                <Calendar className="w-6 h-6 mr-2" />
                Réserver maintenant
                <ArrowRight className="w-6 h-6 ml-2 transition-transform group-hover:translate-x-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-7 rounded-2xl border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                Voir la vidéo
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div 
              className="w-2 h-4 rounded-full animate-pulse"
              style={{ backgroundColor: config.primaryColor }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative overflow-hidden bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div 
                key={i}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in transition-all duration-500 hover:bg-white/10 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <stat.icon 
                  className="w-8 h-8 mx-auto mb-3"
                  style={{ color: config.accentColor }}
                />
                <div 
                  className="text-4xl font-black mb-1"
                  style={{ color: config.primaryColor }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Image Cards */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20"
          style={{ backgroundColor: config.primaryColor }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge 
              className="mb-6 px-6 py-2 text-sm border-0"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}30, ${config.accentColor}30)`,
                color: config.accentColor 
              }}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Nos prestations
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
              Choisissez votre{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                service
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Sélectionnez le service qui vous intéresse et réservez votre créneau préféré
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {availableServices.map((service, i) => (
              <Card
                key={i}
                className={`relative overflow-hidden transition-all duration-700 cursor-pointer group bg-slate-900/50 border-white/10 animate-fade-in ${
                  service.popular ? 'md:-translate-y-4 shadow-2xl' : 'hover:shadow-xl'
                }`}
                style={{ 
                  animationDelay: `${i * 150}ms`,
                  borderColor: service.popular ? config.primaryColor : undefined,
                  borderWidth: service.popular ? 2 : 1,
                }}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  
                  {/* Popular Badge */}
                  {service.popular && (
                    <div 
                      className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg flex items-center gap-2"
                      style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                    >
                      <Star className="w-4 h-4 fill-white" />
                      Populaire
                    </div>
                  )}
                  
                  {/* Price Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div 
                      className="text-3xl font-black text-white"
                      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                      {service.price}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                    style={{ 
                      backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` 
                    }}
                  >
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-4 mb-6 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full rounded-xl py-6 transition-all duration-500 group-hover:shadow-lg text-white font-semibold"
                    style={{ 
                      background: service.popular 
                        ? `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`
                        : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    Réserver ce service
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Nos{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                installations
              </span>
            </h2>
          </div>
          
          {/* Marquee Gallery */}
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-[marquee_30s_linear_infinite]">
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div 
                  key={i}
                  className="flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-105"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="reservation" className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            backgroundImage: `radial-gradient(${config.primaryColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 bg-slate-900/80 backdrop-blur-xl border-white/10 shadow-2xl rounded-3xl overflow-hidden relative">
              {/* Gradient Border */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}50, transparent 50%, ${config.accentColor}50)`,
                }}
              />
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <Badge 
                    className="mb-6 px-6 py-2 border-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.primaryColor}30, ${config.accentColor}30)`,
                      color: config.accentColor 
                    }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Étape 1 sur 2
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-black mb-4 text-white">
                    Choisissez votre{" "}
                    <span 
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                    >
                      créneau
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg">Sélectionnez une date et un horaire qui vous conviennent</p>
                </div>

                <div className="space-y-10">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-bold mb-4 text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5" style={{ color: config.primaryColor }} />
                      Sélectionner une date
                    </label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                      {Array.from({ length: 7 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        const day = date.toLocaleDateString("fr-FR", { weekday: "short" });
                        const num = date.getDate();
                        const month = date.toLocaleDateString("fr-FR", { month: "short" });
                        const isSelected = selectedDate === date.toISOString();
                        
                        return (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(date.toISOString())}
                            className={`p-4 rounded-2xl text-center transition-all duration-500 ${
                              isSelected
                                ? "shadow-2xl scale-105"
                                : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                            }`}
                            style={
                              isSelected
                                ? { 
                                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                                    boxShadow: `0 15px 40px ${config.primaryColor}50`
                                  }
                                : {}
                            }
                          >
                            <div className={`text-xs capitalize ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{day}</div>
                            <div className={`text-2xl font-black ${isSelected ? 'text-white' : 'text-white'}`}>{num}</div>
                            <div className={`text-xs capitalize ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>{month}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-bold mb-4 text-white flex items-center gap-2">
                      <Clock className="w-5 h-5" style={{ color: config.primaryColor }} />
                      Sélectionner un horaire
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map((slot, i) => {
                        const isSelected = selectedTime === slot.time;
                        
                        return (
                          <button
                            key={i}
                            disabled={!slot.available}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            className={`p-4 rounded-2xl text-center transition-all duration-500 font-bold ${
                              !slot.available 
                                ? "bg-white/5 text-slate-600 cursor-not-allowed line-through"
                                : isSelected
                                  ? "shadow-2xl scale-105"
                                  : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white"
                            }`}
                            style={
                              isSelected && slot.available
                                ? { 
                                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                                    boxShadow: `0 15px 40px ${config.primaryColor}50`
                                  }
                                : {}
                            }
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-white">Nom complet</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all focus:outline-none"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-white">Email</label>
                      <input
                        type="email"
                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all"
                        placeholder="jean@exemple.fr"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-white">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:ring-2 focus:border-transparent transition-all"
                        placeholder="+1 514 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-white">Nombre de personnes</label>
                      <select className="w-full px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:ring-2 focus:border-transparent transition-all">
                        <option className="bg-slate-900">1 personne</option>
                        <option className="bg-slate-900">2 personnes</option>
                        <option className="bg-slate-900">3 personnes</option>
                        <option className="bg-slate-900">4+ personnes</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full py-8 text-xl rounded-2xl shadow-2xl transition-all duration-500 hover:scale-[1.02] group font-bold text-white"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                      boxShadow: `0 25px 50px ${config.primaryColor}40`
                    }}
                  >
                    <CheckCircle2 className="w-6 h-6 mr-3" />
                    Confirmer la réservation
                    <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: Zap, 
                title: "Disponibilité en Direct", 
                description: "Consultez les créneaux disponibles en temps réel, mis à jour instantanément",
                image: galleryImages[0]
              },
              { 
                icon: CheckCircle2, 
                title: "Confirmation Immédiate", 
                description: "Recevez votre confirmation par email et SMS dès que votre réservation est validée",
                image: galleryImages[1]
              },
              { 
                icon: Bell, 
                title: "Rappels Automatiques", 
                description: "Notifications personnalisées 24h et 1h avant votre rendez-vous",
                image: galleryImages[2]
              },
            ].map((feature, i) => (
              <Card 
                key={i} 
                className="overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl group animate-fade-in bg-slate-900/50 border-white/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                  <div
                    className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` 
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Ils nous font{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                confiance
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Marie L.", role: "Cliente régulière", rating: 5, avatar: "M" },
              { name: "Thomas B.", role: "Nouveau client", rating: 5, avatar: "T" },
              { name: "Sophie M.", role: "Cliente VIP", rating: 5, avatar: "S" },
            ].map((review, i) => (
              <Card 
                key={i} 
                className="p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl animate-fade-in bg-slate-900/80 backdrop-blur-sm border-white/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, si) => (
                    <Star 
                      key={si} 
                      className="w-6 h-6 fill-current" 
                      style={{ color: config.accentColor }} 
                    />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                  "Système de réservation très simple et efficace. J'ai pu réserver mon rendez-vous en 2 minutes!"
                </p>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-white">{review.name}</p>
                    <p className="text-sm text-slate-400">{review.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` 
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `radial-gradient(white 2px, transparent 2px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating Images */}
        <div className="absolute top-10 left-10 w-32 h-40 rounded-2xl overflow-hidden rotate-[-12deg] shadow-2xl opacity-40 hidden lg:block">
          <img src={galleryImages[0]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-10 right-10 w-40 h-48 rounded-2xl overflow-hidden rotate-[8deg] shadow-2xl opacity-40 hidden lg:block">
          <img src={galleryImages[1]} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
            Prêt à réserver ?
          </h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
            Réservez votre créneau en quelques clics et recevez une confirmation instantanée
          </p>
          <Button 
            size="lg"
            className="bg-white text-xl px-12 py-8 rounded-2xl shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-xl font-bold"
            style={{ color: config.primaryColor }}
          >
            <Calendar className="w-6 h-6 mr-3" />
            Réserver maintenant
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="h-12 w-auto object-contain" />
                )}
                <span className="font-bold text-xl text-white">{config.companyName}</span>
              </div>
              <p className="text-slate-400 mb-6">Réservation en ligne simplifiée pour une expérience client exceptionnelle.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Nos prestations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Contact</h4>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: config.primaryColor }} />
                  contact@example.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: config.primaryColor }} />
                  +1 514 123 4567
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: config.primaryColor }} />
                  123 Rue Exemple, Montréal
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-slate-400 mb-4">Restez informé de nos actualités</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500"
                />
                <Button 
                  className="rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
            <p>© 2024 {config.companyName}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
