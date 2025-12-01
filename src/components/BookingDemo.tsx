import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { 
  ArrowLeft, Download, Share2, Calendar, Clock, MapPin, Users, 
  CheckCircle2, Star, Menu, ChevronRight, Sparkles, Zap, Shield, 
  Phone, Mail, Bell, ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
      { name: "Consultation Générale", duration: "30 min", price: "75 $", icon: Users, popular: false },
      { name: "Consultation Spécialisée", duration: "45 min", price: "120 $", icon: Star, popular: true },
      { name: "Suivi Médical", duration: "20 min", price: "60 $", icon: Calendar, popular: false },
    ],
    restauration: [
      { name: "Table 2 Personnes", duration: "2h", price: "Gratuit", icon: Users, popular: false },
      { name: "Table 4 Personnes", duration: "2h", price: "Gratuit", icon: Users, popular: true },
      { name: "Salle Privée 8-12 pers", duration: "3h", price: "150 $", icon: Star, popular: false },
    ],
    "services-pro": [
      { name: "Consultation Initiale", duration: "60 min", price: "180 $", icon: Users, popular: false },
      { name: "Session de Suivi", duration: "30 min", price: "90 $", icon: Calendar, popular: true },
      { name: "Audit Complet", duration: "2h", price: "375 $", icon: Star, popular: false },
    ],
  };

  const availableServices = services[config.industry as keyof typeof services] || services["services-pro"];

  // Generate gradient based on primary color
  const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 50, l: 50 };
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const primaryHSL = hexToHSL(config.primaryColor);
  const accentHSL = hexToHSL(config.accentColor);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Floating Header with Glassmorphism */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-background/70 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={onBack} className="hover:bg-background/50">
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
                <Button variant="ghost" size="icon" onClick={handleShare} className="hover:bg-background/50">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  onClick={handleExport}
                  className="rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-1000"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Gradient Overlays */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}90 0%, transparent 50%, ${config.accentColor}60 100%)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Animated Shapes */}
        <div 
          className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ backgroundColor: config.accentColor }}
        />
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ backgroundColor: config.primaryColor, animationDelay: '1s' }}
        />

        {/* Hero Content */}
        <div className="container mx-auto px-4 pt-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8 animate-fade-in backdrop-blur-xl border border-white/20 shadow-2xl"
              style={{ 
                background: `linear-gradient(135deg, ${config.accentColor}dd, ${config.primaryColor}dd)`,
              }}
            >
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Réservation en ligne instantanée</span>
            </div>

            {/* Main Title with Gradient */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <span className="text-white drop-shadow-2xl">Réservez votre</span>
              <br />
              <span 
                className="bg-clip-text text-transparent"
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${config.accentColor}, ${config.primaryColor}, ${config.secondaryColor})`,
                }}
              >
                rendez-vous
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">en quelques clics</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Système de réservation simple et rapide. Choisissez votre créneau et confirmez instantanément.
            </p>

            {/* Feature Badges */}
            <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {[
                { icon: Zap, text: "Disponibilité temps réel" },
                { icon: CheckCircle2, text: "Confirmation instantanée" },
                { icon: Bell, text: "Rappel automatique" },
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
                >
                  <feature.icon className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg"
                className="text-lg px-10 py-7 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 group"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                  boxShadow: `0 20px 40px ${config.primaryColor}40`
                }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Réserver maintenant
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-2 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section with Glassmorphism Cards */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Background Decoration */}
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: config.primaryColor }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge 
              className="mb-4 px-4 py-2 text-sm"
              style={{ backgroundColor: config.primaryColor + "20", color: config.primaryColor }}
            >
              Nos prestations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choisissez votre{" "}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                service
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Sélectionnez le service qui vous intéresse et réservez votre créneau préféré
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {availableServices.map((service, i) => (
              <Card
                key={i}
                className={`relative p-8 transition-all duration-500 cursor-pointer group overflow-hidden animate-fade-in ${
                  service.popular ? 'border-2 scale-105 shadow-2xl' : 'hover:shadow-xl hover:-translate-y-2'
                }`}
                style={{ 
                  animationDelay: `${i * 150}ms`,
                  borderColor: service.popular ? config.primaryColor : undefined,
                }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-sm font-semibold shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    ⭐ Populaire
                  </div>
                )}

                {/* Background Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                />

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.accentColor}20)`,
                  }}
                >
                  <service.icon style={{ color: config.primaryColor }} className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl mb-3">{service.name}</h3>
                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Price */}
                <div 
                  className="text-3xl font-black mb-6"
                  style={{ color: config.primaryColor }}
                >
                  {service.price}
                </div>

                <Button 
                  className="w-full rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  style={{ 
                    background: service.popular 
                      ? `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`
                      : undefined,
                    backgroundColor: service.popular ? undefined : config.primaryColor + "10",
                    color: service.popular ? "white" : config.primaryColor,
                  }}
                >
                  Réserver ce service
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section with Glass Effect */}
      <section id="reservation" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{ 
            backgroundImage: `radial-gradient(${config.primaryColor} 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 md:p-12 backdrop-blur-sm border-border/50 shadow-2xl rounded-3xl overflow-hidden relative">
              {/* Gradient Border Effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-20"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, transparent, ${config.accentColor})`,
                }}
              />
              
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <Badge 
                    className="mb-4 px-4 py-2"
                    style={{ backgroundColor: config.primaryColor + "20", color: config.primaryColor }}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Étape 1 sur 2
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Choisissez votre{" "}
                    <span 
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                    >
                      créneau
                    </span>
                  </h2>
                  <p className="text-muted-foreground">Sélectionnez une date et un horaire qui vous conviennent</p>
                </div>

                <div className="space-y-10">
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" style={{ color: config.primaryColor }} />
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
                            className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                              isSelected
                                ? "text-white shadow-xl scale-105"
                                : "bg-muted/50 hover:bg-muted border border-border/50 hover:border-border"
                            }`}
                            style={
                              isSelected
                                ? { 
                                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                                    boxShadow: `0 10px 30px ${config.primaryColor}40`
                                  }
                                : {}
                            }
                          >
                            <div className="text-xs capitalize opacity-70">{day}</div>
                            <div className="text-2xl font-bold">{num}</div>
                            <div className="text-xs capitalize opacity-70">{month}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-sm font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: config.primaryColor }} />
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
                            className={`p-4 rounded-2xl text-center transition-all duration-300 font-semibold ${
                              !slot.available 
                                ? "bg-muted/30 text-muted-foreground/50 cursor-not-allowed line-through"
                                : isSelected
                                  ? "text-white shadow-xl scale-105"
                                  : "bg-muted/50 hover:bg-muted border border-border/50 hover:border-border"
                            }`}
                            style={
                              isSelected && slot.available
                                ? { 
                                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                                    boxShadow: `0 10px 30px ${config.primaryColor}40`
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
                  <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-border/50">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Nom complet</label>
                      <input
                        type="text"
                        className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Email</label>
                      <input
                        type="email"
                        className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="jean@exemple.fr"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="+1 514 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Nombre de personnes</label>
                      <select className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option>1 personne</option>
                        <option>2 personnes</option>
                        <option>3 personnes</option>
                        <option>4+ personnes</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold">Remarques (optionnel)</label>
                    <textarea
                      className="w-full px-5 py-4 rounded-xl border border-border bg-background/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-28 resize-none"
                      placeholder="Informations supplémentaires que vous souhaitez partager..."
                    />
                  </div>

                  <Button
                    size="lg"
                    className="w-full py-7 text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                      boxShadow: `0 20px 40px ${config.primaryColor}30`
                    }}
                  >
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Confirmer la réservation
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: config.accentColor }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: Zap, 
                title: "Disponibilité en Direct", 
                description: "Consultez les créneaux disponibles en temps réel, mis à jour instantanément",
                gradient: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`
              },
              { 
                icon: CheckCircle2, 
                title: "Confirmation Immédiate", 
                description: "Recevez votre confirmation par email et SMS dès que votre réservation est validée",
                gradient: `linear-gradient(135deg, ${config.accentColor}, ${config.secondaryColor})`
              },
              { 
                icon: Bell, 
                title: "Rappels Automatiques", 
                description: "Notifications personnalisées 24h et 1h avant votre rendez-vous",
                gradient: `linear-gradient(135deg, ${config.secondaryColor}, ${config.primaryColor})`
              },
            ].map((feature, i) => (
              <Card 
                key={i} 
                className="p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group animate-fade-in overflow-hidden relative"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: feature.gradient }}
                />
                
                <div
                  className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 relative"
                  style={{ background: feature.gradient }}
                >
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Gradient Background */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}08, ${config.accentColor}08)` 
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge 
              className="mb-4 px-4 py-2"
              style={{ backgroundColor: config.primaryColor + "20", color: config.primaryColor }}
            >
              Témoignages
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
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
                className="p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, si) => (
                    <Star 
                      key={si} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: config.accentColor }} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg italic">
                  "Système de réservation très simple et efficace. J'ai pu réserver mon rendez-vous en 2 minutes!"
                </p>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` 
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à réserver ?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Réservez votre créneau en quelques clics et recevez une confirmation instantanée
          </p>
          <Button 
            size="lg"
            className="bg-white text-lg px-10 py-7 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{ color: config.primaryColor }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Réserver maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="border-t py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="h-12 w-auto object-contain" />
                )}
                <span className="font-bold text-xl">{config.companyName}</span>
              </div>
              <p className="text-muted-foreground mb-4">Réservation en ligne simplifiée pour une expérience client exceptionnelle.</p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <div 
                    key={social}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: config.primaryColor + "15" }}
                  >
                    <span className="text-xs" style={{ color: config.primaryColor }}>
                      {social[0].toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Services</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Nos prestations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-muted-foreground">
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
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-muted-foreground mb-4">Restez informé de nos actualités</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-1 px-4 py-2 rounded-xl border border-border bg-background"
                />
                <Button 
                  className="rounded-xl"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 {config.companyName}. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-primary transition-colors">Conditions</a>
              <a href="#" className="hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
