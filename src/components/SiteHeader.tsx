import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Rocket, Calendar } from "lucide-react";
import logoTrousse from "@/assets/logo-trousse.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SiteHeaderProps {
  onStartDemo?: () => void;
}

export const SiteHeader = ({ onStartDemo }: SiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", href: "https://latroussedigitale.ca/" },
    { label: "Solutions", href: "https://latroussedigitale.ca/#solutions" },
    { label: "Modules", href: "https://latroussedigitale.ca/#modules" },
    { label: "Tarifs", href: "https://latroussedigitale.ca/#pricing" },
    { label: "Contact", href: "https://latroussedigitale.ca/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="https://latroussedigitale.ca/" className="flex items-center gap-2">
            <img
              src={logoTrousse}
              alt="La Trousse Digitale"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 hover:border-primary hover:bg-primary/5"
              asChild
            >
              <a href="https://latroussedigitale.ca/#contact">
                <Calendar className="w-4 h-4 mr-2" />
                Appel découverte
              </a>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg"
              onClick={onStartDemo}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Créer ma démo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-center"
                asChild
              >
                <a href="https://latroussedigitale.ca/#contact">
                  <Calendar className="w-4 h-4 mr-2" />
                  Appel découverte
                </a>
              </Button>
              <Button
                size="sm"
                className="w-full justify-center bg-gradient-to-r from-primary to-accent"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onStartDemo?.();
                }}
              >
                <Rocket className="w-4 h-4 mr-2" />
                Créer ma démo
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
