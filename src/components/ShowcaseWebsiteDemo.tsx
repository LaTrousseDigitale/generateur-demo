import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Download, Share2, ArrowRight, CheckCircle2, Star, Mail, Phone, MapPin, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShowcaseWebsiteDemoProps {
  config: DemoConfig;
  onBack: () => void;
}

export const ShowcaseWebsiteDemo = ({ config, onBack }: ShowcaseWebsiteDemoProps) => {
  const { toast } = useToast();

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

  const industryServices = {
    architecture: ["Conception architecturale", "Plans 3D", "Suivi de projets", "Conformité réglementaire"],
    "arts-scene": ["Organisation d'événements", "Gestion d'artistes", "Billetterie", "Promotion culturelle"],
    construction: ["Gestion de chantiers", "Coordination", "Budgétisation", "Qualité et sécurité"],
    consulting: ["Stratégie d'entreprise", "Transformation digitale", "Optimisation", "Formation"],
    "services-pro": ["Expertise métier", "Accompagnement", "Solutions sur mesure", "Support continu"],
    sante: ["Consultations", "Suivi patients", "Télémédecine", "Prévention"],
  };

  const services = industryServices[config.industry as keyof typeof industryServices] || 
    ["Service 1", "Service 2", "Service 3", "Service 4"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec actions */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au configurateur
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Télécharger PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation du site vitrine */}
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="w-10 h-10 object-contain" />
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {config.companyName.charAt(0)}
                </div>
              )}
              <span className="font-bold text-xl">{config.companyName}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#accueil" className="text-foreground hover:text-primary transition-colors">Accueil</a>
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
              <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">Portfolio</a>
              <a href="#temoignages" className="text-foreground hover:text-primary transition-colors">Témoignages</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <Button size="sm" style={{ backgroundColor: config.primaryColor, color: "white" }}>
              Devis Gratuit
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.accentColor} 100%)`
          }}
        />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6" style={{ backgroundColor: config.accentColor + "20", color: config.accentColor }}>
              🚀 Nouveau : Services digitaux innovants
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transformez votre vision en{" "}
              <span style={{ color: config.primaryColor }}>réalité digitale</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Des solutions web sur mesure qui propulsent votre entreprise vers le succès. 
              Design moderne, performance optimale, résultats garantis.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" style={{ backgroundColor: config.primaryColor, color: "white" }} className="gap-2">
                Démarrer un projet
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Voir nos réalisations
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 flex-wrap text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span>Plus de 500 projets réussis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span>Satisfaction client 98%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span>Support 7j/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4" variant="outline">Nos Services</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Ce que nous pouvons faire{" "}
              <span style={{ color: config.primaryColor }}>pour vous</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une gamme complète de services pour répondre à tous vos besoins digitaux
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: config.primaryColor + "15" }}
                >
                  <CheckCircle2 style={{ color: config.primaryColor }} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Solutions professionnelles adaptées à vos besoins spécifiques
                </p>
                <Button variant="link" className="p-0" style={{ color: config.primaryColor }}>
                  En savoir plus →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4" variant="outline">Portfolio</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Nos dernières{" "}
              <span style={{ color: config.primaryColor }}>réalisations</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div 
                  className="h-48 relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.primaryColor}40 0%, ${config.accentColor}40 100%)` 
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      P{item}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <Badge className="mb-2" style={{ backgroundColor: config.accentColor + "20", color: config.accentColor }}>
                    Projet {item}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2">Site Web Moderne</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Transformation digitale complète avec interface moderne et performante
                  </p>
                  <Button variant="link" className="p-0" style={{ color: config.primaryColor }}>
                    Voir le projet →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages Section */}
      <section id="temoignages" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4" variant="outline">Témoignages</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Ce que disent{" "}
              <span style={{ color: config.primaryColor }}>nos clients</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Sophie Martin", role: "CEO, TechCorp", rating: 5 },
              { name: "Pierre Dubois", role: "Directeur, InnovCo", rating: 5 },
              { name: "Marie Laurent", role: "Manager, StartUp", rating: 5 }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: config.accentColor }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Une équipe exceptionnelle qui a su comprendre nos besoins et livrer un produit au-delà de nos attentes."
                </p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Badge className="mb-4" variant="outline">Contact</Badge>
              <h2 className="text-4xl font-bold mb-4">
                Prêt à démarrer{" "}
                <span style={{ color: config.primaryColor }}>votre projet ?</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Contactez-nous dès aujourd'hui pour un devis gratuit et sans engagement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="font-bold text-xl mb-6">Envoyez-nous un message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom complet</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <textarea 
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background h-32"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>
                  <Button className="w-full" style={{ backgroundColor: config.primaryColor, color: "white" }}>
                    Envoyer le message
                  </Button>
                </form>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.primaryColor + "15" }}
                    >
                      <Mail style={{ color: config.primaryColor }} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Email</h4>
                      <p className="text-muted-foreground">contact@{config.companyName.toLowerCase().replace(/\s+/g, '')}.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.primaryColor + "15" }}
                    >
                      <Phone style={{ color: config.primaryColor }} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Téléphone</h4>
                      <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.primaryColor + "15" }}
                    >
                      <MapPin style={{ color: config.primaryColor }} className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Adresse</h4>
                      <p className="text-muted-foreground">123 Avenue des Champs-Élysées<br />75008 Paris, France</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {config.logo ? (
                  <img src={config.logo} alt="Logo" className="w-8 h-8 object-contain" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {config.companyName.charAt(0)}
                  </div>
                )}
                <span className="font-bold">{config.companyName}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Des solutions digitales qui font la différence
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {services.slice(0, 4).map((service, i) => (
                  <li key={i}><a href="#" className="hover:text-primary transition-colors">{service}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Équipe</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Mentions légales</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">CGU</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 {config.companyName}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
