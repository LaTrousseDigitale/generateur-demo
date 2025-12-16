import { useState, useRef } from "react";
import { SiteHeader } from "./SiteHeader";
import { DemoGeneratorForm } from "./DemoGeneratorForm";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Globe, 
  ShoppingCart, 
  Users,
  ArrowRight,
  Play
} from "lucide-react";

export const GeneratorLanding = () => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const features = [
    {
      icon: Globe,
      title: "Sites web vitrines",
      description: "Pages élégantes pour présenter votre entreprise et attirer des clients",
    },
    {
      icon: ShoppingCart,
      title: "Boutiques en ligne",
      description: "E-commerce complet avec paiements sécurisés et gestion des stocks",
    },
    {
      icon: Users,
      title: "Portails clients",
      description: "Espaces sécurisés pour vos clients avec documents et suivi",
    },
  ];

  const benefits = [
    "Visualisez votre projet avant de commencer",
    "Personnalisez les couleurs et le logo",
    "Obtenez une estimation budgétaire",
    "Choisissez vos fonctionnalités",
    "Recevez votre devis en quelques minutes",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onStartDemo={scrollToForm} />

      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Générateur de démo gratuit</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
              Créez votre{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                solution web
              </span>{" "}
              sur mesure
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Répondez à quelques questions et visualisez instantanément votre futur site web, 
              boutique en ligne ou portail client personnalisé.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl shadow-primary/25 text-lg px-8 py-6"
                onClick={scrollToForm}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Commencer ma démo gratuite
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 text-lg px-8 py-6"
                asChild
              >
                <a href="https://latroussedigitale.ca/#solutions">
                  <Play className="w-5 h-5 mr-2" />
                  Voir les solutions
                </a>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>5 minutes seulement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span>Résultat instantané</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quel type de solution recherchez-vous ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Notre générateur s'adapte à vos besoins spécifiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                onClick={scrollToForm}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pourquoi utiliser notre générateur ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                En quelques clics, obtenez une vision claire de votre projet web 
                et un devis personnalisé sans engagement.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="mt-8 bg-gradient-to-r from-primary to-accent"
                onClick={scrollToForm}
              >
                Démarrer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Visual Preview */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 border border-border">
                <div className="bg-card rounded-xl shadow-2xl overflow-hidden">
                  <div className="h-8 bg-muted flex items-center gap-2 px-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-4 text-xs text-muted-foreground">votre-entreprise.ca</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-primary/20 rounded w-1/3" />
                    <div className="h-24 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 bg-muted rounded" />
                      <div className="h-16 bg-muted rounded" />
                      <div className="h-16 bg-muted rounded" />
                    </div>
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce">
                Aperçu en direct
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          {!showForm ? (
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Prêt à créer votre démo ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Cliquez ci-dessous pour commencer le questionnaire personnalisé
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-lg px-12 py-6"
                onClick={() => setShowForm(true)}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Commencer le questionnaire
              </Button>
            </div>
          ) : (
            <DemoGeneratorForm />
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Des questions ? Parlons de votre projet !
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Notre équipe est disponible pour vous accompagner dans votre transformation digitale.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <a href="https://latroussedigitale.ca/#contact">
              Planifier un appel gratuit
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};
