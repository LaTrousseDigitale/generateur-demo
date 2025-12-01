import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Download, Share2, Calendar, Clock, MapPin, Users, CheckCircle2, Star, Menu, ChevronRight } from "lucide-react";
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
    "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const services = {
    sante: [
      { name: "Consultation Générale", duration: "30 min", price: "75 $" },
      { name: "Consultation Spécialisée", duration: "45 min", price: "120 $" },
      { name: "Suivi Médical", duration: "20 min", price: "60 $" },
    ],
    restauration: [
      { name: "Table 2 Personnes", duration: "2h", price: "Gratuit" },
      { name: "Table 4 Personnes", duration: "2h", price: "Gratuit" },
      { name: "Salle Privée 8-12 pers", duration: "3h", price: "150 $" },
    ],
    "services-pro": [
      { name: "Consultation Initiale", duration: "60 min", price: "180 $" },
      { name: "Session de Suivi", duration: "30 min", price: "90 $" },
      { name: "Audit Complet", duration: "2h", price: "375 $" },
    ],
  };

  const availableServices = services[config.industry as keyof typeof services] || services["services-pro"];

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

      {/* Navigation */}
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {config.logo && (
                <img src={config.logo} alt="Logo" className="h-20 w-auto object-contain" />
              )}
              <span className="font-bold text-xl">{config.companyName}</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
              <a href="#reservation" className="text-foreground hover:text-primary transition-colors">Réserver</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">À propos</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            </div>
            <Button size="sm" style={{ backgroundColor: config.primaryColor, color: "white" }}>
              Mon compte
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section avec image de fond */}
      <section className="relative overflow-hidden h-96">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6" style={{ backgroundColor: config.accentColor, color: "white" }}>
              ⚡ Réservation en ligne instantanée
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Réservez votre <span style={{ color: config.primaryColor }}>rendez-vous</span> en quelques clics
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Système de réservation simple et rapide. Choisissez votre créneau et confirmez instantanément.
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span>Disponibilité en temps réel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span>Confirmation instantanée</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span>Rappel automatique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Nos <span style={{ color: config.primaryColor }}>Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sélectionnez le service qui vous intéresse et réservez votre créneau
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {availableServices.map((service, i) => (
              <Card
                key={i}
                className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: config.primaryColor + "15" }}
                >
                  <Calendar style={{ color: config.primaryColor }} className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold" style={{ color: config.primaryColor }}>
                      {service.price}
                    </span>
                  </div>
                </div>
                <Button className="w-full" style={{ backgroundColor: config.primaryColor, color: "white" }}>
                  Réserver
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="reservation" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Choisissez votre <span style={{ color: config.primaryColor }}>créneau</span>
              </h2>

              <div className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">Date</label>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const day = date.toLocaleDateString("fr-FR", { weekday: "short" });
                      const num = date.getDate();
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date.toISOString())}
                          className={`p-3 rounded-lg border text-center transition-all ${
                            selectedDate === date.toISOString()
                              ? "text-white shadow-lg"
                              : "border-border hover:border-primary"
                          }`}
                          style={
                            selectedDate === date.toISOString()
                              ? { backgroundColor: config.primaryColor }
                              : {}
                          }
                        >
                          <div className="text-xs capitalize">{day}</div>
                          <div className="text-lg font-bold">{num}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium mb-3">Heure</label>
                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map((time, i) => (
                      <button
                        key={i}
                        className="p-3 rounded-lg border border-border hover:border-primary transition-all text-center font-medium"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      placeholder="jean@exemple.fr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Téléphone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de personnes</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-border bg-background">
                      <option>1 personne</option>
                      <option>2 personnes</option>
                      <option>3 personnes</option>
                      <option>4+ personnes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Remarques (optionnel)</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background h-24"
                    placeholder="Informations supplémentaires..."
                  />
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  style={{ backgroundColor: config.primaryColor, color: "white" }}
                >
                  Confirmer la réservation
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + "15" }}
              >
                <Calendar style={{ color: config.primaryColor }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Disponibilité en Direct</h3>
              <p className="text-muted-foreground">Consultez les créneaux disponibles en temps réel</p>
            </Card>
            <Card className="p-6 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + "15" }}
              >
                <CheckCircle2 style={{ color: config.primaryColor }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Confirmation Immédiate</h3>
              <p className="text-muted-foreground">Recevez votre confirmation par email et SMS</p>
            </Card>
            <Card className="p-6 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + "15" }}
              >
                <Clock style={{ color: config.primaryColor }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Rappels Automatiques</h3>
              <p className="text-muted-foreground">Notifications 24h et 1h avant votre rendez-vous</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Ils nous font <span style={{ color: config.primaryColor }}>confiance</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Marie L.", rating: 5 },
              { name: "Thomas B.", rating: 5 },
              { name: "Sophie M.", rating: 5 },
            ].map((review, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, si) => (
                    <Star key={si} className="w-5 h-5 fill-current" style={{ color: config.accentColor }} />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Système de réservation très simple et efficace. J'ai pu réserver mon rendez-vous en 2 minutes!"
                </p>
                <p className="font-bold">{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="h-16 w-auto object-contain" />
                )}
                <span className="font-bold">{config.companyName}</span>
              </div>
              <p className="text-sm text-muted-foreground">Réservation en ligne simplifiée</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Nos prestations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Disponibilités</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Informations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">À propos</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
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
