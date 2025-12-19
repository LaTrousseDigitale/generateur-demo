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

const DEMO_PREVIEWS = [
  { image: heroAuto, label: "Pièces Auto" },
  { image: heroHealth, label: "Clinique Santé" },
  { image: heroRestaurant, label: "Restaurant" },
];

const BENEFITS = [
  { icon: "⚡", text: "Prêt en 2 minutes" },
  { icon: "🎨", text: "100% personnalisé" },
  { icon: "💰", text: "Gratuit et sans engagement" },
];

// Floating industry images configuration
const FLOATING_IMAGES = [
  { 
    image: heroAuto, 
    label: "Vente auto", 
    position: "top-[8%] left-[3%]",
    size: "w-20 h-14 md:w-28 md:h-20",
    rotation: "-rotate-6",
    delay: "0s",
    duration: "6s"
  },
  { 
    image: bookingAutoService, 
    label: "Garage", 
    position: "top-[18%] right-[5%]",
    size: "w-18 h-12 md:w-24 md:h-16",
    rotation: "rotate-6",
    delay: "1s",
    duration: "7s"
  },
  { 
    image: heroRestaurant, 
    label: "Spectacles", 
    position: "top-[40%] left-[2%]",
    size: "w-16 h-12 md:w-22 md:h-16",
    rotation: "-rotate-3",
    delay: "0.5s",
    duration: "8s"
  },
  { 
    image: heroConstruction, 
    label: "Déménagement", 
    position: "top-[35%] right-[3%]",
    size: "w-18 h-14 md:w-26 md:h-18",
    rotation: "rotate-3",
    delay: "1.5s",
    duration: "6.5s"
  },
  { 
    image: heroArchitecture, 
    label: "Immobilier", 
    position: "bottom-[25%] left-[4%]",
    size: "w-20 h-14 md:w-28 md:h-20",
    rotation: "rotate-6",
    delay: "2s",
    duration: "7.5s"
  },
  { 
    image: heroHealth, 
    label: "Finances", 
    position: "bottom-[20%] right-[4%]",
    size: "w-16 h-12 md:w-24 md:h-16",
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
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
          <Sparkles className="w-4 h-4" />
          Générateur de démo intelligent
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
            className={cn(
              "gap-3 px-10 py-7 text-lg font-bold rounded-full",
              "bg-gradient-to-r from-primary to-accent hover:opacity-90",
              "shadow-glow hover:shadow-elegant transition-all duration-300",
              "group"
            )}
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Commencer maintenant
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Demo Previews */}
        <div className="pt-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm text-muted-foreground mb-6">
            Exemples de démos générées
          </p>
          <div className="flex items-center justify-center gap-6">
            {DEMO_PREVIEWS.map((demo, index) => (
              <div
                key={index}
                className={cn(
                  "relative w-40 h-28 md:w-56 md:h-36 lg:w-72 lg:h-44 rounded-2xl overflow-hidden",
                  "border-2 border-border/50 shadow-xl",
                  "hover:scale-105 hover:border-primary/50 transition-all duration-300",
                  "glow-card"
                )}
              >
                <img
                  src={demo.image}
                  alt={demo.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <span className="absolute bottom-2 left-3 text-sm text-white font-semibold">
                  {demo.label}
                </span>
              </div>
            ))}
          </div>
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
