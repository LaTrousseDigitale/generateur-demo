import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Download, Share2, ShoppingCart, Search, Heart, Star, TrendingUp, Filter, ChevronRight, Menu, CheckCircle2, Wrench, FileText, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DemoFeaturesDisplay } from "./DemoFeaturesDisplay";

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
export const EcommerceDemo = ({
  config,
  onBack
}: EcommerceDemoProps) => {
  const {
    toast
  } = useToast();
  const [cartCount] = useState(3);
  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Votre démo sera prête dans quelques instants"
    });
  };
  const handleShare = () => {
    toast({
      title: "Lien de partage créé",
      description: "Le lien a été copié dans votre presse-papiers"
    });
  };

  // Map industry to hero images
  const industryHeroImages = {
    auto: productAuto1,
    "pieces-auto": productAuto1,
    restauration: productRestaurant1,
    architecture: productArchitecture1,
    construction: productConstruction1,
    sante: productHealth1,
    commerce: productArchitecture1
  };
  const heroImage = industryHeroImages[config.industry as keyof typeof industryHeroImages] || productArchitecture1;
  // Determine products based on industry and auto product type
  const getAutoProducts = () => {
    const vehicles = [{
      name: "Berline Premium",
      price: "34,999€",
      rating: 4.9,
      image: productAuto1
    }, {
      name: "SUV Familial",
      price: "42,999€",
      rating: 4.8,
      image: productAuto2
    }, {
      name: "Sportive GT",
      price: "59,999€",
      rating: 4.9,
      image: productAuto3
    }, {
      name: "Citadine Électrique",
      price: "28,999€",
      rating: 4.7,
      image: productAuto4
    }];

    const parts = [{
      name: "Kit de freinage",
      price: "249.99€",
      rating: 4.8,
      image: productAuto1,
      compatibility: "Compatible avec 250+ modèles"
    }, {
      name: "Filtre à air performance",
      price: "45.99€",
      rating: 4.9,
      image: productAuto2,
      compatibility: "OEM et aftermarket"
    }, {
      name: "Amortisseurs sport",
      price: "399.99€",
      rating: 4.7,
      image: productAuto3,
      compatibility: "Avec schéma d'installation"
    }, {
      name: "Batterie haute capacité",
      price: "159.99€",
      rating: 4.8,
      image: productAuto4,
      compatibility: "Garantie 3 ans"
    }];

    // Adapt based on autoProductType
    if (config.autoProductType?.toLowerCase().includes('pièce')) {
      return parts;
    } else if (config.autoProductType?.toLowerCase().includes('véhicule') || 
               config.autoProductType?.toLowerCase().includes('automobile')) {
      return vehicles;
    }
    // Default: mix of both
    return [...vehicles.slice(0, 2), ...parts.slice(0, 2)];
  };

  const industryProducts = {
    commerce: [{
      name: "T-shirt Premium",
      price: "29.99€",
      rating: 4.8,
      image: productArchitecture1
    }, {
      name: "Jean Slim Fit",
      price: "79.99€",
      rating: 4.6,
      image: productArchitecture2
    }, {
      name: "Sneakers Sport",
      price: "89.99€",
      rating: 4.9,
      image: productConstruction1
    }, {
      name: "Veste Cuir",
      price: "199.99€",
      rating: 4.7,
      image: productConstruction2
    }],
    auto: getAutoProducts(),
    "pieces-auto": getAutoProducts(),
    restauration: [{
      name: "Plat du Chef - Saumon",
      price: "28.99€",
      rating: 4.9,
      image: productRestaurant1
    }, {
      name: "Pasta alla Carbonara",
      price: "18.99€",
      rating: 4.8,
      image: productRestaurant2
    }, {
      name: "Dessert Gourmet",
      price: "9.99€",
      rating: 4.9,
      image: productRestaurant3
    }, {
      name: "Menu Dégustation",
      price: "65.00€",
      rating: 5.0,
      image: productRestaurant1
    }],
    architecture: [{
      name: "Plan Maison Moderne",
      price: "2,499€",
      rating: 4.8,
      image: productArchitecture1
    }, {
      name: "Pack Plans & Rendus 3D",
      price: "3,999€",
      rating: 4.9,
      image: productArchitecture2
    }, {
      name: "Consultation Design",
      price: "499€",
      rating: 4.7,
      image: productArchitecture1
    }, {
      name: "Rénovation Complète",
      price: "8,999€",
      rating: 4.8,
      image: productArchitecture2
    }],
    construction: [{
      name: "Casque de Sécurité Pro",
      price: "49.99€",
      rating: 4.8,
      image: productConstruction1
    }, {
      name: "Kit Outils Électriques",
      price: "899.99€",
      rating: 4.9,
      image: productConstruction2
    }, {
      name: "Équipement Complet",
      price: "1,499€",
      rating: 4.7,
      image: productConstruction1
    }, {
      name: "Pack Démarrage Pro",
      price: "2,999€",
      rating: 4.8,
      image: productConstruction2
    }],
    sante: [{
      name: "Stéthoscope Professionnel",
      price: "149.99€",
      rating: 4.9,
      image: productHealth1
    }, {
      name: "Complément Bien-être",
      price: "39.99€",
      rating: 4.8,
      image: productHealth2
    }, {
      name: "Kit Diagnostic",
      price: "89.99€",
      rating: 4.7,
      image: productHealth1
    }, {
      name: "Programme Santé+",
      price: "199.99€",
      rating: 4.9,
      image: productHealth2
    }]
  };
  const products = industryProducts[config.industry as keyof typeof industryProducts] || industryProducts.commerce;
  const categories = ["Tous", "Nouveautés", "Promotions", "Meilleures Ventes", "Premium"];
  return <div className="min-h-screen bg-background">
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
              {config.logo && <img src={config.logo} alt="Logo" className="h-20 w-auto object-contain" />}
              
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input type="text" placeholder="Rechercher un produit..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{
                backgroundColor: config.accentColor
              }}>
                    {cartCount}
                  </span>}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
            {categories.map((cat, i) => <button key={i} className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${i === 0 ? "text-white" : "text-foreground hover:bg-muted"}`} style={i === 0 ? {
            backgroundColor: config.primaryColor
          } : {}}>
                {cat}
              </button>)}
          </div>
        </div>
      </nav>

      {/* Automobile Search Section - Year/Make/Model */}
      {config.industry === "auto" && config.autoCompatibility?.includes("Recherche par année/marque/modèle") && (
        <section className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Recherchez par véhicule</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div>
                <label className="block text-sm font-medium mb-2">Année</label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2">
                  <option>Sélectionner l'année</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Marque</label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2">
                  <option>Sélectionner la marque</option>
                  <option>Toyota</option>
                  <option>Honda</option>
                  <option>Ford</option>
                  <option>BMW</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Modèle</label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2">
                  <option>Sélectionner le modèle</option>
                  <option>Corolla</option>
                  <option>Civic</option>
                  <option>F-150</option>
                  <option>X5</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="w-full" style={{ backgroundColor: config.primaryColor }}>
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Automatic Parts Compatibility */}
      {config.industry === "auto" && config.autoCompatibility?.includes("Compatibilité automatique des pièces") && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge className="mb-4" style={{ backgroundColor: config.primaryColor }}>
                  Compatibilité Intelligente
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Vérification automatique de <span style={{ color: config.primaryColor }}>compatibilité</span>
                </h2>
                <p className="text-muted-foreground">
                  Notre système vérifie instantanément si la pièce est compatible avec votre véhicule
                </p>
              </div>
              
              <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5" style={{ color: config.primaryColor }} />
                      Pièce sélectionnée
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Référence:</span>
                        <span className="font-medium">BRK-4589-XL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">Kit de freinage</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Marque:</span>
                        <span className="font-medium">Premium Parts</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Votre véhicule
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Marque:</span>
                        <span className="font-medium">Toyota</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Modèle:</span>
                        <span className="font-medium">Corolla</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Année:</span>
                        <span className="font-medium">2023</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-semibold text-green-800 dark:text-green-300">100% Compatible</p>
                      <p className="text-sm text-green-700 dark:text-green-400">Cette pièce est garantie compatible avec votre véhicule</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Parts Diagrams & Schemas */}
      {config.industry === "auto" && config.autoCompatibility?.includes("Diagrammes et schémas de pièces") && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <Badge className="mb-4" style={{ backgroundColor: config.primaryColor }}>
                  Documentation Technique
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Diagrammes et <span style={{ color: config.primaryColor }}>schémas détaillés</span>
                </h2>
                <p className="text-muted-foreground">
                  Visualisez l'emplacement exact et les instructions d'installation
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                    <FileText className="w-16 h-16 text-muted-foreground" />
                    <span className="absolute bottom-2 right-2 text-xs bg-background px-2 py-1 rounded">Schéma 3D</span>
                  </div>
                  <h3 className="font-semibold mb-2">Diagramme d'éclaté</h3>
                  <p className="text-sm text-muted-foreground">Vue détaillée de toutes les composantes du système de freinage</p>
                </Card>
                
                <Card className="p-6">
                  <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
                    <Wrench className="w-16 h-16 text-muted-foreground" />
                    <span className="absolute bottom-2 right-2 text-xs bg-background px-2 py-1 rounded">Guide PDF</span>
                  </div>
                  <h3 className="font-semibold mb-2">Instructions d'installation</h3>
                  <p className="text-sm text-muted-foreground">Guide pas-à-pas avec spécifications de couple</p>
                </Card>
              </div>
              
              <div className="mt-6 flex gap-4 justify-center">
                <Button variant="outline" style={{ borderColor: config.primaryColor }}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le schéma
                </Button>
                <Button style={{ backgroundColor: config.primaryColor, color: 'white' }}>
                  <FileText className="w-4 h-4 mr-2" />
                  Voir le guide complet
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OEM vs Aftermarket Catalog */}
      {config.industry === "auto" && config.autoCompatibility?.includes("Catalogue pièces OEM vs aftermarket") && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <Badge className="mb-4" style={{ backgroundColor: config.primaryColor }}>
                  Choix de Qualité
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Pièces <span style={{ color: config.primaryColor }}>OEM ou Aftermarket</span>
                </h2>
                <p className="text-muted-foreground">
                  Comparez et choisissez entre pièces d'origine et alternatives de qualité
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 transition-all hover:shadow-lg" style={{ borderColor: config.primaryColor + "40" }}>
                  <Badge className="mb-4" style={{ backgroundColor: config.primaryColor }}>
                    OEM - Pièce d'origine
                  </Badge>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Kit de freinage avant</h3>
                      <p className="text-sm text-muted-foreground">Référence constructeur: 04465-02320</p>
                    </div>
                    <div className="text-3xl font-bold" style={{ color: config.primaryColor }}>
                      349.99€
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Garantie constructeur 2 ans</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Qualité d'origine garantie</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Homologation constructeur</span>
                      </div>
                    </div>
                    <Button className="w-full" style={{ backgroundColor: config.primaryColor, color: 'white' }}>
                      Ajouter au panier
                    </Button>
                  </div>
                </Card>
                
                <Card className="p-6 border-2 transition-all hover:shadow-lg">
                  <Badge className="mb-4" variant="outline">
                    Aftermarket - Alternative
                  </Badge>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Kit de freinage avant</h3>
                      <p className="text-sm text-muted-foreground">Premium Parts - Référence: PP-BRK-4589</p>
                    </div>
                    <div className="text-3xl font-bold" style={{ color: config.accentColor }}>
                      249.99€
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Garantie fabricant 3 ans</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Certification ISO 9001</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Économie de 100€</span>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" style={{ borderColor: config.accentColor }}>
                      Ajouter au panier
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{
      backgroundColor: `${config.primaryColor}08`
    }}>
        <div className="container mx-auto px-4 py-20 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in space-y-6">
              <Badge className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm" style={{
              backgroundColor: config.accentColor,
              color: "white"
            }}>
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse"></span>
                Offre Limitée
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Jusqu'à <span style={{
                color: config.primaryColor
              }} className="text-5xl md:text-7xl">-50%</span> sur toute la collection
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                Découvrez nos produits premium avec livraison gratuite et garantie satisfait ou remboursé
              </p>
              <div className="flex gap-4 pt-2">
                <Button size="lg" className="px-8 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all" style={{
                backgroundColor: config.primaryColor,
                color: "white"
              }}>
                  Voir les promotions
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-base font-semibold rounded-xl border-2 hover:bg-muted">
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-96">
              <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.02] duration-300" style={{
              border: `1px solid ${config.primaryColor}20`
            }}>
                <img src={heroImage} alt="Produit vedette" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{
                background: `linear-gradient(135deg, ${config.primaryColor}10 0%, ${config.accentColor}15 100%)`
              }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Display - Shows all selected features from questionnaire */}
      <DemoFeaturesDisplay config={config} />

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
            {products.map((product, i) => <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="h-64 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <Badge className="absolute top-3 right-3" style={{
                backgroundColor: config.accentColor,
                color: "white"
              }}>
                    -20%
                  </Badge>
                  <Button variant="ghost" size="icon" className="absolute top-3 left-3 bg-white hover:bg-white/90">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 fill-current" style={{
                  color: si < Math.floor(product.rating) ? config.accentColor : "#e5e7eb"
                }} />)}
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  <h3 className="font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground line-through">
                        {(parseFloat(product.price) * 1.25).toFixed(2)}€
                      </p>
                      <p className="text-xl font-bold" style={{
                    color: config.primaryColor
                  }}>
                        {product.price}
                      </p>
                    </div>
                    <Button size="sm" style={{
                  backgroundColor: config.primaryColor,
                  color: "white"
                }}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
              backgroundColor: config.primaryColor + "15"
            }}>
                <TrendingUp style={{
                color: config.primaryColor
              }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison Gratuite</h3>
              <p className="text-muted-foreground">Dès 50€ d'achat partout en France</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
              backgroundColor: config.primaryColor + "15"
            }}>
                <ShoppingCart style={{
                color: config.primaryColor
              }} className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Paiement Sécurisé</h3>
              <p className="text-muted-foreground">Transactions 100% sécurisées</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{
              backgroundColor: config.primaryColor + "15"
            }}>
                <Star style={{
                color: config.primaryColor
              }} className="w-8 h-8" />
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
          <Card className="p-8 md:p-12 text-center" style={{
          borderColor: config.primaryColor,
          borderWidth: 2
        }}>
            <h2 className="text-3xl font-bold mb-4">
              Recevez nos <span style={{
              color: config.primaryColor
            }}>offres exclusives</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter et bénéficiez de -10% sur votre première commande
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Votre email" className="flex-1 px-4 py-3 rounded-lg border border-border bg-background" />
              <Button size="lg" style={{
              backgroundColor: config.primaryColor,
              color: "white"
            }}>
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
                {config.logo && <img src={config.logo} alt="Logo" className="h-16 w-auto object-contain" />}
                
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
    </div>;
};