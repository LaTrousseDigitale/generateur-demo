import { Sparkles, ChevronRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "../QuizContext";
import { cn } from "@/lib/utils";
import logoTrousseDigitale from "@/assets/logo-trousse-digitale.png";

// Import sample demo images
import heroAuto from "@/assets/hero-auto.jpg";
import heroHealth from "@/assets/hero-health.jpg";
import heroRestaurant from "@/assets/hero-restaurant.jpg";

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

export const StepWelcome = () => {
  const { nextStep } = useQuiz();

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Floating Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
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
    </div>
  );
};
