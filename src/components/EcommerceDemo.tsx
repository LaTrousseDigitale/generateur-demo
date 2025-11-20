import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Download, Share2, ShoppingCart, Search, Heart, Star, TrendingUp, Filter, ChevronRight, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Import product images - Fresh automotive images 2024
import productAuto1 from "@/assets/product-auto-1.jpg";
import productAuto2 from "@/assets/product-auto-2.jpg";
import productAuto3 from "@/assets/product-auto-3.jpg";
import productAuto4 from "@/assets/product-auto-4.jpg";
import productRestaurant1 from "@/assets/product-restaurant-1.jpg";
import productRestaurant2 from "@/assets/product-restaurant-2.jpg";
import productRestaurant3 from "@/assets/product-restaurant-3.jpg";
import productArchitecture1 from "@/assets/product-architecture-1.jpg";
import productArchitecture2 from "@/assets/product-architecture-2.jpg";
import productConstruction1 from "@/assets/product-construction-1.jpg";
import productConstruction2 from "@/assets/product-construction-2.jpg";
import productHealth1 from "@/assets/product-health-1.jpg";
import productHealth2 from "@/assets/product-health-2.jpg";

interface EcommerceDemoProps {
  config: DemoConfig;
  onBack: () => void;
}

export const EcommerceDemo = ({ config, onBack }: EcommerceDemoProps) => {
  const { toast } = useToast();
  const [cartCount] = useState(3);

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

  // Map industry to hero images
  const industryHeroImages = {
    "pieces-auto": productAuto1,
    restauration: productRestaurant1,
    architecture: productArchitecture1,
    construction: productConstruction1,
    sante: productHealth1,
    commerce: productArchitecture1,
  };

  const heroImage = industryHeroImages[config.industry as keyof typeof industryHeroImages] || productArchitecture1;

  const industryProducts = {
    commerce: [
      { name: "T-shirt Premium", price: "29.99€", rating: 4.8, image: productArchitecture1 },
      { name: "Jean Slim Fit", price: "79.99€", rating: 4.6, image: productArchitecture2 },
      { name: "Sneakers Sport", price: "89.99€", rating: 4.9, image: productConstruction1 },
      { name: "Veste Cuir", price: "199.99€", rating: 4.7, image: productConstruction2 },
    ],
    "pieces-auto": [
      { name: "Berline Premium", price: "34,999€", rating: 4.9, image: productAuto1 },
      { name: "SUV Familial", price: "42,999€", rating: 4.8, image: productAuto2 },
      { name: "Sportive GT", price: "59,999€", rating: 4.9, image: productAuto3 },
      { name: "Citadine Électrique", price: "28,999€", rating: 4.7, image: productAuto4 },
    ],
    restauration: [
      { name: "Plat du Chef - Saumon", price: "28.99€", rating: 4.9, image: productRestaurant1 },
      { name: "Pasta alla Carbonara", price: "18.99€", rating: 4.8, image: productRestaurant2 },
      { name: "Dessert Gourmet", price: "9.99€", rating: 4.9, image: productRestaurant3 },
      { name: "Menu Dégustation", price: "65.00€", rating: 5.0, image: productRestaurant1 },
    ],
    architecture: [
      { name: "Plan Maison Moderne", price: "2,499€", rating: 4.8, image: productArchitecture1 },
      { name: "Pack Plans & Rendus 3D", price: "3,999€", rating: 4.9, image: productArchitecture2 },
      { name: "Consultation Design", price: "499€", rating: 4.7, image: productArchitecture1 },
      { name: "Rénovation Complète", price: "8,999€", rating: 4.8, image: productArchitecture2 },
    ],
    construction: [
      { name: "Casque de Sécurité Pro", price: "49.99€", rating: 4.8, image: productConstruction1 },
      { name: "Kit Outils Électriques", price: "899.99€", rating: 4.9, image: productConstruction2 },
      { name: "Équipement Complet", price: "1,499€", rating: 4.7, image: productConstruction1 },
      { name: "Pack Démarrage Pro", price: "2,999€", rating: 4.8, image: productConstruction2 },
    ],
    sante: [
      { name: "Stéthoscope Professionnel", price: "149.99€", rating: 4.9, image: productHealth1 },
      { name: "Complément Bien-être", price: "39.99€", rating: 4.8, image: productHealth2 },
      { name: "Kit Diagnostic", price: "89.99€", rating: 4.7, image: productHealth1 },
      { name: "Programme Santé+", price: "199.99€", rating: 4.9, image: productHealth2 },
    ],
  };

  const products = industryProducts[config.industry as keyof typeof industryProducts] || industryProducts.commerce;

  const categories = ["Tous", "Nouveautés", "Promotions", "Meilleures Ventes", "Premium"];

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

      {/* Navigation E-commerce */}
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {config.logo && (
                <img src={config.logo} alt="Logo" className="h-20 w-auto object-contain" />
              )}
              <span className="font-bold text-xl">{config.companyName}</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  i === 0 ? "text-white" : "text-foreground hover:bg-muted"
                }`}
                style={i === 0 ? { backgroundColor: config.primaryColor } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ backgroundColor: `${config.primaryColor}08` }}>
        <div className="container mx-auto px-4 py-20 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-6">
              <Badge 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm"
                style={{ 
                  backgroundColor: config.accentColor,
                  color: "white"
                }}
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                Offre Limitée
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Jusqu'à <span style={{ color: config.primaryColor }} className="text-5xl md:text-7xl">-50%</span> sur toute la collection
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Découvrez nos produits premium avec livraison gratuite et garantie satisfait ou remboursé
              </p>
              <div className="flex gap-4 pt-2">
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: config.primaryColor, color: "white" }}
                >
                  Voir les promotions
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-base font-semibold rounded-xl border-2 hover:bg-muted"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-96">
              <div
                className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.02] duration-300"
                style={{
                  border: `1px solid ${config.primaryColor}20`
                }}
              >
                <img 
                  src={heroImage} 
                  alt="Produit vedette"
                  className="w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${config.primaryColor}10 0%, ${config.accentColor}15 100%)`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Produits Populaires</h2>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtres
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Badge
                    className="absolute top-3 right-3"
                    style={{ backgroundColor: config.accentColor, color: "white" }}
                  >
                    -20%
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 left-3 bg-white hover:bg-white/90"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, si) => (
                      <Star
                        key={si}
                        className="w-4 h-4 fill-current"
                        style={{ color: si < Math.floor(product.rating) ? config.accentColor : "#e5e7eb" }}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground line-through">
                        {(parseFloat(product.price) * 1.25).toFixed(2)}€
                      </p>
                      <p className="text-xl font-bold" style={{ color: config.primaryColor }}>
                        {product.price}
                      </p>
                    </div>
                    <Button size="sm" style={{ backgroundColor: config.primaryColor, color: "white" }}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + "15" }}
              >
                <TrendingUp style={{ color: config.primaryColor }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison Gratuite</h3>
              <p className="text-muted-foreground">Dès 50€ d'achat partout en France</p>
            </Card>
            <Card className="p-6 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + "15" }}
              >
                <ShoppingCart style={{ color: config.primaryColor }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
              <p className="text-muted-foreground">Transactions 100% sécurisées</p>
            </Card>
            <Card className="p-6 text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: config.primaryColor + "15" }}
              >
                <Star style={{ color: config.primaryColor }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Garantie Satisfait</h3>
              <p className="text-muted-foreground">30 jours pour changer d'avis</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 md:p-12 text-center" style={{ borderColor: config.primaryColor, borderWidth: 2 }}>
            <h2 className="text-3xl font-bold mb-4">
              Recevez nos <span style={{ color: config.primaryColor }}>offres exclusives</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et bénéficiez de -10% sur votre première commande
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
              />
              <Button size="lg" style={{ backgroundColor: config.primaryColor, color: "white" }}>
                S'inscrire
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {config.logo && (
                  <img src={config.logo} alt="Logo" className="h-16 w-auto object-contain" />
                )}
                <span className="font-bold">{config.companyName}</span>
              </div>
              <p className="text-sm text-muted-foreground">Votre boutique en ligne de confiance</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Boutique</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Nouveautés</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Promotions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Meilleures Ventes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Service Client</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Livraison</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Retours</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Informations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Qui sommes-nous</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">CGV</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Confidentialité</a></li>
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
