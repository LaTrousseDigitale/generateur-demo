import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Download, Share2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useRef } from "react";
import { BookingModerne } from "./booking/BookingModerne";
import { BookingRustique } from "./booking/BookingRustique";
import { BookingFuturiste } from "./booking/BookingFuturiste";
import { Users, Star, Calendar, Shield, Award, Heart, TrendingUp } from "lucide-react";

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
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, trigger]);
  return count;
};

export const BookingDemo = ({ config, onBack }: BookingDemoProps) => {
  const { toast } = useToast();
  const [scrollY, setScrollY] = useState(0);
  const [statsVisible, setStatsVisible] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const counter1 = useCountUp(15000, 2000, statsVisible);
  const counter2 = useCountUp(98, 1500, statsVisible);
  const counter3 = useCountUp(24, 1000, statsVisible);
  const counter4 = useCountUp(5, 800, statsVisible);

  const industryHeroImages = {
    auto: bookingAutoService,
    restauration: bookingRestaurantInterior,
    architecture: bookingArchitectureOffice,
    construction: bookingConstructionOffice,
    sante: bookingHealthClinic,
  };
  const heroImage = industryHeroImages[config.industry as keyof typeof industryHeroImages] || bookingHealthClinic;

  const handleBooking = (service: string, date: string, time: string) => {
    toast({
      title: "Réservation confirmée!",
      description: `${service} - ${date} à ${time}`,
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

  const services = [
    { name: "Consultation", duration: "30 min", price: "75 $", icon: Users, popular: false, image: bookingHealthClinic, description: "Évaluation complète" },
    { name: "Service premium", duration: "45 min", price: "120 $", icon: Star, popular: true, image: bookingArchitectureOffice, description: "Expertise pointue" },
    { name: "Suivi", duration: "20 min", price: "60 $", icon: Calendar, popular: false, image: bookingRestaurantInterior, description: "Accompagnement régulier" },
  ];

  const currentTitles = {
    badge: "Réservations",
    title: "Nos services",
    subtitle: "Choisissez le service qui vous convient",
    duration: "Durée",
    heroTitle: "Réservez votre\nrendez-vous",
    heroSubtitle: "Prenez rendez-vous en quelques clics"
  };

  const stats = [
    { value: counter1, suffix: "+", label: "Clients satisfaits", icon: Heart },
    { value: counter2, suffix: "%", label: "Satisfaction", icon: TrendingUp },
    { value: counter3, suffix: "/7", label: "Support", icon: Shield },
    { value: counter4, suffix: "★", label: "Note", icon: Award },
  ];

  const theme = config.theme || "moderne";
  const sharedConfig = {
    primaryColor: config.primaryColor,
    accentColor: config.accentColor,
    companyName: config.companyName,
    logo: config.logo,
    industry: config.industry,
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 
          ? theme === "moderne" 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100'
            : theme === "rustique"
            ? 'bg-stone-900/90 backdrop-blur-xl border-b border-amber-900/20'
            : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack} 
                className={`rounded-full ${theme === "moderne" ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
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
              <span className={`font-bold text-xl hidden sm:block ${theme === "moderne" ? 'text-slate-900' : 'text-white'}`}>
                {config.companyName}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Theme-specific content */}
      {theme === "moderne" && (
        <BookingModerne
          config={sharedConfig}
          services={services}
          currentTitles={currentTitles}
          heroImage={heroImage}
          timeSlots={timeSlots}
          stats={stats}
          onBooking={handleBooking}
        />
      )}
      {theme === "rustique" && (
        <BookingRustique
          config={sharedConfig}
          services={services}
          currentTitles={currentTitles}
          heroImage={heroImage}
          timeSlots={timeSlots}
          stats={stats}
          onBooking={handleBooking}
        />
      )}
      {theme === "futuriste" && (
        <BookingFuturiste
          config={sharedConfig}
          services={services}
          currentTitles={currentTitles}
          heroImage={heroImage}
          timeSlots={timeSlots}
          stats={stats}
          onBooking={handleBooking}
        />
      )}

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <Button 
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="w-5 h-5" />
        </Button>
        <Button 
          size="icon"
          className="w-12 h-12 rounded-full shadow-lg text-white"
          style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
        >
          <Download className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
