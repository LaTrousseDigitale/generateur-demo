import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Globe, 
  Layout, 
  Puzzle, 
  ArrowRight, 
  Play, 
  Settings, 
  ShoppingCart,
  Sparkles,
  Monitor,
  Building2,
  FileText,
  Store,
  Users,
  UserCog,
  Briefcase,
  Shield,
  Check,
  Zap,
  Clock,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DemoHub = () => {
  const categories = [
    {
      id: "websites",
      title: "Sites Web",
      description: "Découvrez nos templates de sites web professionnels, du landing page au e-commerce complet.",
      icon: Globe,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      items: [
        { name: "Landing Page", icon: Monitor, desc: "Pages de conversion optimisées" },
        { name: "Site Vitrine", icon: Building2, desc: "Présentation d'entreprise élégante" },
        { name: "Site Organisationnel", icon: FileText, desc: "Documentation & intranet" },
        { name: "Blog / Actualités", icon: FileText, desc: "Contenu éditorial dynamique" },
        { name: "E-commerce", icon: Store, desc: "Boutique en ligne complète" },
      ],
      link: "/demos/websites",
      cta: "Explorer les sites"
    },
    {
      id: "portals",
      title: "Portails",
      description: "Testez nos portails interactifs avec connexion simulée, rôles et tableaux de bord complets.",
      icon: Layout,
      iconBg: "bg-accent/10",
      iconColor: "text-accent",
      items: [
        { name: "Portail Clients", icon: Users, desc: "Espace client personnalisé" },
        { name: "Portail Employés", icon: UserCog, desc: "Gestion des équipes" },
        { name: "Portail RH", icon: Briefcase, desc: "Ressources humaines" },
        { name: "Portail Partenaires", icon: Building2, desc: "Collaboration B2B" },
        { name: "Portail Admin", icon: Shield, desc: "Gestion centralisée" },
      ],
      link: "/demos/portals",
      cta: "Explorer les portails"
    },
    {
      id: "modules",
      title: "Modules",
      description: "Activez et testez individuellement chaque module : CRM, facturation, RH, support et plus.",
      icon: Puzzle,
      iconBg: "bg-secondary/20",
      iconColor: "text-secondary-foreground",
      items: [
        { name: "CRM & Ventes", icon: ShoppingCart, desc: "Gestion de la relation client" },
        { name: "Planification", icon: FileText, desc: "Projets & calendriers" },
        { name: "Support", icon: Users, desc: "Tickets & messagerie" },
        { name: "RH", icon: Briefcase, desc: "Gestion des employés" },
        { name: "Automatisation", icon: Sparkles, desc: "IA & intégrations" },
      ],
      link: "/demos/modules",
      cta: "Explorer les modules"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Explorez",
      description: "Parcourez nos démos de sites, portails et modules selon vos besoins.",
      icon: Globe
    },
    {
      number: "02", 
      title: "Testez",
      description: "Interagissez avec des données réalistes, testez chaque fonctionnalité.",
      icon: Play
    },
    {
      number: "03",
      title: "Configurez",
      description: "Personnalisez les couleurs, contenus et modules selon votre vision.",
      icon: Settings
    },
    {
      number: "04",
      title: "Lancez",
      description: "Validez votre projet et obtenez votre solution clé en main.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-background font-montserrat">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">La Trousse Digitale</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Questionnaire</Link>
            <Link to="/demos/websites" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Sites Web</Link>
            <Link to="/demos/portals" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Portails</Link>
            <Link to="/demos/modules" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Modules</Link>
          </div>
          <Link to="/">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6">
              Créer ma démo
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-6 bg-primary/10 text-primary border-0 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Nouveau : Testez avant d'acheter
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Voyez votre solution{" "}
              <span className="text-primary">avant</span> de la payer
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Explorez nos démos interactives remplies de données réalistes. 
              Testez, configurez et projetez-vous dans votre futur projet digital.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6 rounded-full shadow-lg shadow-accent/25">
                <Play className="w-5 h-5 mr-2" />
                Tester maintenant
              </Button>
              <Link to="/">
                <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted text-base px-8 py-6 rounded-full">
                  <Settings className="w-5 h-5 mr-2" />
                  Configurer mon projet
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </section>

      {/* Blue divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent max-w-md mx-auto" />

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comment ça <span className="text-primary">fonctionne</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Un processus simple pour découvrir et valider votre projet digital.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary mb-2 block">{step.number}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ce que nous vous <span className="text-accent">livrons</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des solutions complètes et testables pour chaque besoin digital.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className="group bg-card border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${category.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{category.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{category.description}</p>

                  {/* Items list */}
                  <div className="space-y-3 mb-8">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors cursor-pointer group/item">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover/item:bg-primary/10 transition-colors">
                          <item.icon className="w-4 h-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to={category.link}>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full group/btn">
                      {category.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir nos <span className="text-primary">démos</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Play, title: "100% Testable", desc: "Chaque fonctionnalité est interactive", color: "text-primary", bg: "bg-primary/10" },
              { icon: Users, title: "Données réalistes", desc: "Entreprises fictives crédibles", color: "text-accent", bg: "bg-accent/10" },
              { icon: Settings, title: "Configurable", desc: "Personnalisez en temps réel", color: "text-primary", bg: "bg-primary/10" },
              { icon: Heart, title: "100% Québécois", desc: "Hébergé localement", color: "text-accent", bg: "bg-accent/10" },
            ].map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-accent p-12 md:p-16">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-[40px]" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à transformer votre vision en réalité?
              </h2>
              <p className="text-lg text-white/80 mb-10">
                Commencez par explorer nos démos ou configurez directement votre projet personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6 rounded-full shadow-lg">
                    Créer ma démo gratuite
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-full">
                  Voir les tarifs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2024 La Trousse Digitale. Tous droits réservés. 100% québécois, hébergé localement.</p>
        </div>
      </footer>
    </div>
  );
};

export default DemoHub;
