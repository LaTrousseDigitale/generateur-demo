import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Download, Share2, ShoppingCart, Menu, Heart, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { VehicleSearchWidget } from "./auto/VehicleSearchWidget";
import { PartsCompatibilityChecker } from "./auto/PartsCompatibilityChecker";
import { PartsDiagramsViewer } from "./auto/PartsDiagramsViewer";
import { OEMAftermarketCatalog } from "./auto/OEMAftermarketCatalog";
import { EcommerceModerne } from "./ecommerce/EcommerceModerne";
import { EcommerceRustique } from "./ecommerce/EcommerceRustique";
import { EcommerceFuturiste } from "./ecommerce/EcommerceFuturiste";

// Import product images
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
  const [cartCount, setCartCount] = useState(3);
  const [selectedVehicle, setSelectedVehicle] = useState<{ year: string; make: string; model: string } | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax and scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVehicleSearch = (year: string, make: string, model: string) => {
    setSelectedVehicle({ year, make, model });
    toast({
      title: "Véhicule sélectionné",
      description: `${year} ${make} ${model} - Pièces compatibles affichées`
    });
  };

  const handleExport = () => {
    toast({ title: "Export en cours", description: "Votre démo sera prête dans quelques instants" });
  };

  const handleShare = () => {
    toast({ title: "Lien de partage créé", description: "Le lien a été copié dans votre presse-papiers" });
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    toast({ title: "Ajouté au panier!", description: "Voir votre panier pour finaliser" });
  };

  // Industry hero content
  const industryHero = {
    auto: { 
      title: "Pièces auto\npremium", 
      subtitle: "Trouvez les pièces parfaites pour votre véhicule",
      badge: "Livraison express 24h"
    },
    "pieces-auto": { 
      title: "Pièces détachées\nde qualité", 
      subtitle: "OEM et aftermarket pour tous véhicules",
      badge: "Garantie 2 ans"
    },
    restauration: { 
      title: "Saveurs\nd'exception", 
      subtitle: "Commandez les meilleurs plats en quelques clics",
      badge: "Livraison gratuite dès 30$"
    },
    commerce: { 
      title: "Collections\nexclusives", 
      subtitle: "Découvrez nos nouveautés de saison",
      badge: "Nouveautés chaque semaine"
    },
    architecture: { 
      title: "Designs\nd'intérieur", 
      subtitle: "Mobilier et décoration haut de gamme",
      badge: "Livraison et installation"
    },
    construction: { 
      title: "Équipement\nprofessionnel", 
      subtitle: "Outillage et matériaux de qualité pro",
      badge: "Prix professionnel"
    },
    sante: { 
      title: "Bien-être\nau quotidien", 
      subtitle: "Produits naturels et compléments santé",
      badge: "Conseils d'experts"
    },
  };

  const heroContent = industryHero[config.industry as keyof typeof industryHero] || industryHero.commerce;

  // Hero images by industry
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

  // Products by industry
  const getProducts = () => {
    const baseProducts = {
      commerce: [
        { name: "Collection Prestige", price: "299,99 $", oldPrice: "399,99 $", rating: 4.9, image: productArchitecture1, tag: "Bestseller" },
        { name: "Édition Limitée", price: "449,99 $", oldPrice: "599,99 $", rating: 4.8, image: productArchitecture2, tag: "Nouveau" },
        { name: "Classic Premium", price: "199,99 $", oldPrice: "249,99 $", rating: 4.7, image: productConstruction1, tag: "-20%" },
        { name: "Signature Line", price: "599,99 $", oldPrice: "799,99 $", rating: 5.0, image: productConstruction2, tag: "Exclusif" },
      ],
      auto: [
        { name: "Kit freinage performance", price: "249,99 $", oldPrice: "329,99 $", rating: 4.8, image: productAuto1, tag: "Bestseller" },
        { name: "Filtre à air sport", price: "89,99 $", oldPrice: "119,99 $", rating: 4.9, image: productAuto2, tag: "Promo" },
        { name: "Amortisseurs racing", price: "449,99 $", oldPrice: "599,99 $", rating: 4.7, image: productAuto3, tag: "Premium" },
        { name: "Batterie haute capacité", price: "179,99 $", oldPrice: "229,99 $", rating: 4.8, image: productAuto4, tag: "Garantie 3 ans" },
      ],
      restauration: [
        { name: "Menu Dégustation", price: "89,00 $", oldPrice: "120,00 $", rating: 5.0, image: productRestaurant1, tag: "Chef's pick" },
        { name: "Box Gourmet", price: "65,00 $", oldPrice: "85,00 $", rating: 4.9, image: productRestaurant2, tag: "Nouveau" },
        { name: "Coffret Découverte", price: "45,00 $", oldPrice: "60,00 $", rating: 4.8, image: productRestaurant3, tag: "Populaire" },
        { name: "Pack Premium", price: "129,00 $", oldPrice: "169,00 $", rating: 4.9, image: productRestaurant1, tag: "Exclusif" },
      ],
      sante: [
        { name: "Pack Vitalité", price: "79,99 $", oldPrice: "99,99 $", rating: 4.9, image: productHealth1, tag: "Bestseller" },
        { name: "Cure Détox", price: "59,99 $", oldPrice: "79,99 $", rating: 4.8, image: productHealth2, tag: "Naturel" },
        { name: "Coffret Bien-être", price: "149,99 $", oldPrice: "199,99 $", rating: 4.7, image: productHealth1, tag: "Complet" },
        { name: "Essentiels Santé", price: "39,99 $", oldPrice: "54,99 $", rating: 4.9, image: productHealth2, tag: "Promo" },
      ],
    };
    return baseProducts[config.industry as keyof typeof baseProducts] || baseProducts.commerce;
  };

  const products = getProducts();
  const theme = config.theme || "moderne";

  // Shared config for themed components
  const sharedConfig = {
    primaryColor: config.primaryColor,
    accentColor: config.accentColor,
    companyName: config.companyName,
    logo: config.logo,
    industry: config.industry,
  };

  return (
    <div className="relative">
      {/* Fixed Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 
          ? theme === "moderne" 
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100'
            : theme === "rustique"
            ? 'bg-stone-900/90 backdrop-blur-xl border-b border-amber-900/20'
            : 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Back button + Logo */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack} 
                className={`rounded-full ${
                  scrollY > 50 
                    ? theme === "moderne" ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'
                    : theme === "moderne" ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              {config.logo ? (
                <img src={config.logo} alt="Logo" className="h-10 w-auto object-contain" />
              ) : (
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                >
                  {config.companyName.charAt(0)}
                </div>
              )}
              <span className={`font-bold text-xl hidden sm:block ${
                scrollY > 50 
                  ? theme === "moderne" ? 'text-slate-900' : 'text-white'
                  : theme === "moderne" ? 'text-slate-900' : 'text-white'
              }`}>
                {config.companyName}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`relative ${theme === "moderne" ? 'text-slate-700' : 'text-white/80'}`}
              >
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
            </div>
          </div>
        </div>
      </nav>

      {/* Theme-specific demo content */}
      {theme === "moderne" && (
        <EcommerceModerne
          config={sharedConfig}
          products={products}
          heroContent={heroContent}
          heroImage={heroImage}
          scrollY={scrollY}
          onAddToCart={addToCart}
        />
      )}

      {theme === "rustique" && (
        <EcommerceRustique
          config={sharedConfig}
          products={products}
          heroContent={heroContent}
          heroImage={heroImage}
          scrollY={scrollY}
          onAddToCart={addToCart}
        />
      )}

      {theme === "futuriste" && (
        <EcommerceFuturiste
          config={sharedConfig}
          products={products}
          heroContent={heroContent}
          heroImage={heroImage}
          scrollY={scrollY}
          onAddToCart={addToCart}
        />
      )}

      {/* Auto-specific sections - shown after main demo regardless of theme */}
      {config.industry === "auto" && (
        <div className={`${
          theme === "moderne" ? 'bg-slate-50' : theme === "rustique" ? 'bg-stone-900' : 'bg-slate-900'
        }`}>
          {config.autoCompatibility?.includes("Recherche par année/marque/modèle") && (
            <VehicleSearchWidget 
              onSearch={handleVehicleSearch} 
              primaryColor={config.primaryColor}
              accentColor={config.accentColor}
            />
          )}
          {config.autoCompatibility?.includes("Catalogue pièces OEM vs aftermarket") && (
            <OEMAftermarketCatalog 
              primaryColor={config.primaryColor}
              accentColor={config.accentColor}
            />
          )}
          {config.autoCompatibility?.includes("Compatibilité automatique des pièces") && (
            <PartsCompatibilityChecker 
              selectedVehicle={selectedVehicle}
              primaryColor={config.primaryColor}
              accentColor={config.accentColor}
            />
          )}
          {config.autoCompatibility?.includes("Diagrammes et schémas de pièces") && (
            <PartsDiagramsViewer 
              primaryColor={config.primaryColor}
              accentColor={config.accentColor}
            />
          )}
        </div>
      )}

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <Button 
          size="icon"
          onClick={handleShare}
          className="w-12 h-12 rounded-full shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
        >
          <Share2 className="w-5 h-5" />
        </Button>
        <Button 
          size="icon"
          onClick={handleExport}
          className="w-12 h-12 rounded-full shadow-lg text-white"
          style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
        >
          <Download className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
