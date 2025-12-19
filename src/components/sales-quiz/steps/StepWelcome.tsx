import { Sparkles, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "../QuizContext";
import { cn } from "@/lib/utils";

// Import sample demo images
import heroAuto from "@/assets/hero-auto.jpg";
import heroHealth from "@/assets/hero-health.jpg";
import heroRestaurant from "@/assets/hero-restaurant.jpg";
import heroConstruction from "@/assets/hero-construction.jpg";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import bookingAutoService from "@/assets/booking-auto-service.jpg";

const BENEFITS = [
  { icon: "⚡", text: "Prêt en 2 minutes" },
  { icon: "🎨", text: "100% personnalisé" },
  { icon: "💰", text: "Gratuit et sans engagement" },
];

// Floating industry images configuration - LARGER sizes
const FLOATING_IMAGES = [
  { 
    image: heroAuto, 
    label: "Vente auto", 
    position: "top-[5%] left-[2%]",
    size: "w-32 h-24 md:w-44 md:h-32 lg:w-52 lg:h-36",
    rotation: "-rotate-6",
    delay: "0s",
    duration: "6s"
  },
  { 
    image: bookingAutoService, 
    label: "Garage", 
    position: "top-[12%] right-[3%]",
    size: "w-28 h-20 md:w-40 md:h-28 lg:w-48 lg:h-32",
    rotation: "rotate-6",
    delay: "1s",
    duration: "7s"
  },
  { 
    image: heroRestaurant, 
    label: "Spectacles", 
    position: "top-[45%] left-[1%]",
    size: "w-28 h-20 md:w-36 md:h-26 lg:w-44 lg:h-30",
    rotation: "-rotate-3",
    delay: "0.5s",
    duration: "8s"
  },
  { 
    image: heroConstruction, 
    label: "Déménagement", 
    position: "top-[40%] right-[2%]",
    size: "w-24 h-16 md:w-32 md:h-22 lg:w-36 lg:h-24",
    rotation: "rotate-3",
    delay: "1.5s",
    duration: "6.5s"
  },
  { 
    image: heroArchitecture, 
    label: "Immobilier", 
    position: "bottom-[15%] left-[3%]",
    size: "w-32 h-24 md:w-44 md:h-32 lg:w-52 lg:h-36",
    rotation: "rotate-6",
    delay: "2s",
    duration: "7.5s"
  },
  { 
    image: heroHealth, 
    label: "Finances", 
    position: "bottom-[10%] right-[3%]",
    size: "w-28 h-20 md:w-40 md:h-28 lg:w-48 lg:h-32",
    rotation: "-rotate-6",
    delay: "0.8s",
    duration: "6.8s"
  },
];

export const StepWelcome = () => {
  const { nextStep } = useQuiz();

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      {/* Floating Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating Industry Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {FLOATING_IMAGES.map((item, index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-xl overflow-hidden shadow-2xl border-2 border-white/20",
              "opacity-80 hover:opacity-100 transition-opacity duration-300",
              item.position,
              item.size,
              item.rotation
            )}
            style={{
              animation: `float ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <span className="absolute bottom-1 left-1.5 text-[10px] text-white font-medium">
              {item.label}
            </span>
            {/* Glow effect behind image */}
            <div 
              className="absolute -inset-2 -z-10 rounded-xl blur-lg opacity-50"
              style={{
                background: `linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--accent) / 0.3), hsl(var(--secondary) / 0.4))`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Badge */}
        <div 
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg animate-fade-in group",
            "bg-transparent border-2",
            "border-transparent bg-clip-padding",
            "relative overflow-hidden",
            "before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10",
            "before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent",
            "before:content-['']",
            "after:absolute after:inset-[2px] after:rounded-[6px] after:bg-background after:-z-10",
            "after:content-['']"
          )}
        >
          {/* SVG Gradient for Badge Icon */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="badgeIconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(218, 99%, 55%)" />
                <stop offset="50%" stopColor="hsl(44, 96%, 66%)" />
                <stop offset="100%" stopColor="hsl(16, 100%, 61%)" />
              </linearGradient>
            </defs>
          </svg>
          <Sparkles 
            className="w-4 h-4" 
            style={{ stroke: "url(#badgeIconGradient)" }}
          />
          <span className="font-body bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-sm font-medium">
            Générateur de démo intelligent
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold animate-slide-up">
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Visualisez votre
          </span>
          <br />
          <span className="text-foreground">solution idéale</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Répondez à quelques questions et découvrez une démo personnalisée de votre futur site web, portail ou application.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm md:text-base"
            >
              <span className="text-xl">{benefit.icon}</span>
              <span className="text-muted-foreground">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button
            onClick={nextStep}
            size="lg"
            variant="outline"
            className={cn(
              "gap-3 px-10 py-7 text-lg font-bold rounded-lg",
              "bg-transparent border-2",
              "border-transparent bg-clip-padding",
              "relative overflow-hidden transition-all duration-300",
              "group",
              "before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:-z-10",
              "before:bg-gradient-to-r before:from-primary before:via-secondary before:to-accent",
              "before:content-['']",
              "after:absolute after:inset-[2px] after:rounded-[6px] after:bg-background after:-z-10",
              "after:content-[''] after:transition-opacity after:duration-300",
              "hover:after:opacity-0",
              "hover:shadow-glow"
            )}
          >
            {/* SVG Gradient Definition */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(218, 99%, 55%)" />
                  <stop offset="50%" stopColor="hsl(44, 96%, 66%)" />
                  <stop offset="100%" stopColor="hsl(16, 100%, 61%)" />
                </linearGradient>
              </defs>
            </svg>
            <Play 
              className="w-5 h-5 group-hover:scale-110 transition-transform group-hover:stroke-white" 
              style={{ stroke: "url(#iconGradient)" }}
            />
            <span 
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:text-white group-hover:bg-none transition-all duration-300"
            >
              Commencer maintenant
            </span>
            <ChevronRight 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform group-hover:stroke-white"
              style={{ stroke: "url(#iconGradient)" }}
            />
          </Button>
        </div>
        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-6 pt-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
            ))}
            <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span className="text-sm text-muted-foreground">+500 démos générées</span>
        </div>
      </div>

      {/* Float Animation Keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--tw-rotate, 0deg));
          }
          50% {
            transform: translateY(-15px) rotate(var(--tw-rotate, 0deg));
          }
        }
      `}</style>
    </div>
  );
};
