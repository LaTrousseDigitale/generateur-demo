import { useState, useEffect } from "react";
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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DemoHub = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = [
    {
      id: "websites",
      title: "Sites Web",
      description: "Découvrez nos templates de sites web professionnels, du landing page au e-commerce complet.",
      icon: Globe,
      color: "from-primary to-primary-glow",
      glowColor: "shadow-[0_0_80px_hsl(218_99%_55%/0.4)]",
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
      color: "from-accent to-secondary",
      glowColor: "shadow-[0_0_80px_hsl(16_100%_61%/0.4)]",
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
      color: "from-secondary to-accent",
      glowColor: "shadow-[0_0_80px_hsl(44_96%_66%/0.4)]",
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

  return (
    <div className="min-h-screen bg-hub-dark font-montserrat overflow-hidden relative">
      {/* Animated background glow effects */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(218 99% 55% / 0.08), transparent 40%),
            radial-gradient(600px circle at 20% 80%, hsl(16 100% 61% / 0.06), transparent 40%),
            radial-gradient(600px circle at 80% 20%, hsl(44 96% 66% / 0.06), transparent 40%)
          `
        }}
      />

      {/* Floating orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-xl bg-hub-dark/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">La Trousse Digitale</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Questionnaire</Link>
            <Link to="/demos/websites" className="text-white/70 hover:text-white transition-colors">Sites Web</Link>
            <Link to="/demos/portals" className="text-white/70 hover:text-white transition-colors">Portails</Link>
            <Link to="/demos/modules" className="text-white/70 hover:text-white transition-colors">Modules</Link>
          </div>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white border-0">
            <Play className="w-4 h-4 mr-2" />
            Commencer
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 text-secondary" />
              Nouveau : Testez avant d'acheter
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Explorez nos{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                démos interactives
              </span>
            </h1>
            
            <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
              Découvrez, testez et configurez nos solutions web, portails et modules.
              Chaque démo est remplie de données réalistes pour une expérience authentique.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Tester maintenant
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl">
                <Settings className="w-5 h-5 mr-2" />
                Configurer mon projet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card 
                key={category.id}
                className={`
                  group relative overflow-hidden 
                  bg-hub-card/50 backdrop-blur-xl border-white/10 
                  hover:border-white/20 transition-all duration-500
                  hover:scale-[1.02] hover:${category.glowColor}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="p-8 relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3">{category.title}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">{category.description}</p>

                  {/* Items list */}
                  <div className="space-y-3 mb-8">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer group/item">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-white/10 transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{item.name}</span>
                          <p className="text-xs text-white/40">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link to={category.link}>
                    <Button className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 text-white group/btn`}>
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
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pourquoi choisir nos démos?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Une expérience complète pour comprendre, explorer et se projeter dans votre futur projet digital.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Play, title: "100% Testable", desc: "Chaque fonctionnalité est interactive et fonctionnelle" },
              { icon: Users, title: "Données réalistes", desc: "Entreprises fictives crédibles pour une vraie immersion" },
              { icon: Settings, title: "Configurable", desc: "Personnalisez couleurs, contenus et modules en temps réel" },
              { icon: ShoppingCart, title: "Prêt à acheter", desc: "Passez de la démo à votre projet en un clic" },
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-white/50 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 backdrop-blur-xl border border-white/10 p-12 md:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-[60px]" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Prêt à transformer votre vision en réalité?
              </h2>
              <p className="text-xl text-white/70 mb-10">
                Commencez par explorer nos démos ou configurez directement votre projet personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-lg px-8 py-6 rounded-xl">
                    Configurer mon projet
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl">
                  Parler à un expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-6 text-center text-white/40 text-sm">
          <p>© 2024 La Trousse Digitale. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default DemoHub;
