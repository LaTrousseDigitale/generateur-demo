import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndustryCardProps {
  value: string;
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

// Illustration Auto - Voiture avec outils
const AutoIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Route */}
      <rect x="0" y="55" width="120" height="25" fill="hsl(var(--muted))" />
      <line x1="0" y1="67" x2="120" y2="67" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="8 6" className="animate-pulse" />
      
      {/* Voiture */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {/* Corps */}
        <path d="M25 45 L35 30 L75 30 L85 45 L90 45 L90 55 L20 55 L20 45 Z" fill="hsl(var(--primary))" />
        {/* Vitres */}
        <path d="M38 32 L42 38 L68 38 L72 32 Z" fill="hsl(var(--primary-foreground))" opacity="0.9" />
        {/* Roues */}
        <circle cx="35" cy="55" r="8" fill="hsl(var(--foreground))" />
        <circle cx="35" cy="55" r="4" fill="hsl(var(--muted))" />
        <circle cx="75" cy="55" r="8" fill="hsl(var(--foreground))" />
        <circle cx="75" cy="55" r="4" fill="hsl(var(--muted))" />
        {/* Phares */}
        <rect x="86" y="46" width="4" height="4" rx="1" fill="hsl(var(--accent))" className="animate-pulse" />
      </g>
      
      {/* Clé à molette */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <rect x="100" y="15" width="4" height="20" rx="1" fill="hsl(var(--secondary))" transform="rotate(45 102 25)" />
        <circle cx="105" cy="12" r="5" fill="none" stroke="hsl(var(--secondary))" strokeWidth="3" />
      </g>
    </svg>
  </div>
);

// Illustration Restaurant - Assiette et couverts
const RestaurantIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-accent/5 to-accent/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Table */}
      <rect x="10" y="60" width="100" height="8" rx="2" fill="hsl(var(--secondary))" />
      
      {/* Assiette */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <ellipse cx="60" cy="45" rx="28" ry="8" fill="hsl(var(--muted))" />
        <ellipse cx="60" cy="42" rx="28" ry="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <ellipse cx="60" cy="42" rx="20" ry="5" fill="hsl(var(--muted))" opacity="0.3" />
      </g>
      
      {/* Nourriture sur l'assiette */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <ellipse cx="55" cy="40" rx="8" ry="4" fill="hsl(var(--accent))" />
        <ellipse cx="65" cy="41" rx="6" ry="3" fill="hsl(var(--primary))" />
        <circle cx="60" cy="38" r="3" fill="hsl(var(--secondary))" />
      </g>
      
      {/* Fourchette */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <rect x="22" y="25" width="2" height="25" fill="hsl(var(--muted-foreground))" />
        <rect x="18" y="25" width="1.5" height="8" fill="hsl(var(--muted-foreground))" />
        <rect x="21" y="25" width="1.5" height="8" fill="hsl(var(--muted-foreground))" />
        <rect x="24" y="25" width="1.5" height="8" fill="hsl(var(--muted-foreground))" />
      </g>
      
      {/* Couteau */}
      <g className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <rect x="96" y="25" width="3" height="25" fill="hsl(var(--muted-foreground))" />
        <path d="M96 25 L99 25 L99 35 L96 32 Z" fill="hsl(var(--muted-foreground))" />
      </g>
      
      {/* Vapeur */}
      <g className="animate-pulse" style={{ animationDelay: "0.2s" }}>
        <path d="M55 30 Q53 25 55 20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
        <path d="M60 28 Q58 22 60 16" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
        <path d="M65 30 Q67 25 65 20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" opacity="0.4" />
      </g>
    </svg>
  </div>
);

// Illustration Santé - Coeur et stéthoscope
const HealthIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Croix médicale en arrière-plan */}
      <g opacity="0.1">
        <rect x="52" y="5" width="16" height="45" fill="hsl(var(--primary))" />
        <rect x="37" y="18" width="46" height="16" fill="hsl(var(--primary))" />
      </g>
      
      {/* Coeur */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <path 
          d="M60 65 C45 50 30 40 30 28 C30 18 38 12 48 12 C54 12 58 16 60 20 C62 16 66 12 72 12 C82 12 90 18 90 28 C90 40 75 50 60 65 Z" 
          fill="hsl(var(--accent))" 
          className="animate-pulse"
        />
      </g>
      
      {/* Stéthoscope */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <path d="M20 15 Q20 35 35 45" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        <path d="M28 15 Q28 30 40 42" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        <circle cx="24" cy="12" r="4" fill="hsl(var(--secondary))" />
        <circle cx="37" cy="48" r="6" fill="hsl(var(--primary))" />
        <circle cx="37" cy="48" r="3" fill="hsl(var(--muted))" />
      </g>
      
      {/* ECG */}
      <path 
        d="M5 70 L25 70 L30 60 L35 78 L40 65 L45 72 L50 70 L115 70" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        className="animate-pulse"
        opacity="0.6"
      />
    </svg>
  </div>
);

// Illustration Construction - Grue et bâtiment
const ConstructionIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-secondary/5 to-secondary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Sol */}
      <rect x="0" y="70" width="120" height="10" fill="hsl(var(--muted))" />
      
      {/* Bâtiment en construction */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="60" y="35" width="35" height="35" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <rect x="65" y="40" width="8" height="10" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x="78" y="40" width="8" height="10" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x="65" y="55" width="8" height="10" fill="hsl(var(--primary))" opacity="0.3" />
        <rect x="78" y="55" width="8" height="10" fill="hsl(var(--primary))" opacity="0.3" />
      </g>
      
      {/* Grue */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {/* Mât */}
        <rect x="18" y="15" width="6" height="55" fill="hsl(var(--accent))" />
        {/* Flèche */}
        <rect x="18" y="12" width="50" height="5" fill="hsl(var(--accent))" />
        {/* Contrepoids */}
        <rect x="8" y="12" width="12" height="8" fill="hsl(var(--secondary))" />
        {/* Câble */}
        <line x1="55" y1="17" x2="55" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1" />
        {/* Crochet */}
        <path d="M52 40 L58 40 L58 48 Q55 52 52 48 Z" fill="hsl(var(--foreground))" className="animate-pulse" />
      </g>
      
      {/* Casque */}
      <g className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <ellipse cx="105" cy="62" rx="10" ry="5" fill="hsl(var(--accent))" />
        <path d="M95 62 Q95 52 105 52 Q115 52 115 62" fill="hsl(var(--accent))" />
      </g>
    </svg>
  </div>
);

// Illustration Commerce - Panier et sacs
const CommerceIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-accent/5 to-accent/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Sac de shopping 1 */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="15" y="30" width="30" height="35" rx="2" fill="hsl(var(--primary))" />
        <path d="M22 30 Q22 20 30 20 Q38 20 38 30" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        <rect x="20" y="38" width="20" height="2" fill="hsl(var(--primary-foreground))" opacity="0.3" />
      </g>
      
      {/* Sac de shopping 2 */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <rect x="50" y="25" width="35" height="40" rx="2" fill="hsl(var(--accent))" />
        <path d="M58 25 Q58 12 67 12 Q76 12 76 25" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" />
        <circle cx="67" cy="40" r="8" fill="hsl(var(--accent-foreground))" opacity="0.2" />
      </g>
      
      {/* Étiquette prix */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <rect x="85" y="35" width="25" height="15" rx="2" fill="hsl(var(--secondary))" />
        <text x="97" y="46" textAnchor="middle" fill="hsl(var(--secondary-foreground))" fontSize="8" fontWeight="bold">$</text>
      </g>
      
      {/* Étoiles satisfaction */}
      <g className="animate-pulse" style={{ animationDelay: "0.4s" }}>
        <text x="30" y="75" fontSize="10">⭐</text>
        <text x="45" y="75" fontSize="10">⭐</text>
        <text x="60" y="75" fontSize="10">⭐</text>
        <text x="75" y="75" fontSize="10">⭐</text>
        <text x="90" y="75" fontSize="10">⭐</text>
      </g>
    </svg>
  </div>
);

// Illustration Tech - Code et écrans
const TechIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Écran principal */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="25" y="10" width="70" height="45" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <rect x="28" y="13" width="64" height="36" fill="hsl(var(--foreground))" />
        {/* Code lignes */}
        <rect x="32" y="18" width="25" height="3" rx="1" fill="hsl(var(--primary))" className="animate-pulse" />
        <rect x="32" y="24" width="40" height="3" rx="1" fill="hsl(var(--accent))" />
        <rect x="38" y="30" width="30" height="3" rx="1" fill="hsl(var(--secondary))" />
        <rect x="38" y="36" width="35" height="3" rx="1" fill="hsl(var(--primary))" />
        <rect x="32" y="42" width="20" height="3" rx="1" fill="hsl(var(--accent))" />
        {/* Pied écran */}
        <rect x="55" y="55" width="10" height="8" fill="hsl(var(--muted-foreground))" />
        <rect x="45" y="62" width="30" height="4" rx="1" fill="hsl(var(--muted-foreground))" />
      </g>
      
      {/* Symboles flottants */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <text x="10" y="25" fill="hsl(var(--primary))" fontSize="12" className="animate-pulse">{"<>"}</text>
        <text x="100" y="35" fill="hsl(var(--accent))" fontSize="10">{"/>"}</text>
        <text x="8" y="50" fill="hsl(var(--secondary))" fontSize="8">{"{ }"}</text>
      </g>
      
      {/* Curseur clignotant */}
      <rect x="72" y="18" width="2" height="8" fill="hsl(var(--primary-foreground))" className="animate-pulse" />
    </svg>
  </div>
);

// Illustration Éducation - Livres et diplôme
const EducationIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Pile de livres */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="15" y="50" width="40" height="8" rx="1" fill="hsl(var(--primary))" />
        <rect x="18" y="42" width="35" height="8" rx="1" fill="hsl(var(--accent))" />
        <rect x="20" y="34" width="30" height="8" rx="1" fill="hsl(var(--secondary))" />
      </g>
      
      {/* Chapeau de diplômé */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <polygon points="80,15 60,25 80,35 100,25" fill="hsl(var(--foreground))" />
        <rect x="77" y="25" width="6" height="15" fill="hsl(var(--foreground))" />
        <line x1="100" y1="25" x2="105" y2="40" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="105" cy="42" r="4" fill="hsl(var(--accent))" className="animate-pulse" />
      </g>
      
      {/* Crayon */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <rect x="70" y="55" width="35" height="6" fill="hsl(var(--accent))" transform="rotate(-15 87 58)" />
        <polygon points="105,52 112,55 105,58" fill="hsl(var(--muted-foreground))" transform="rotate(-15 108 55)" />
      </g>
      
      {/* Ampoule idée */}
      <g className="animate-pulse" style={{ animationDelay: "0.4s" }}>
        <ellipse cx="35" cy="18" rx="10" ry="12" fill="hsl(var(--accent))" opacity="0.8" />
        <rect x="32" y="28" width="6" height="4" fill="hsl(var(--muted-foreground))" />
        <line x1="35" y1="5" x2="35" y2="2" stroke="hsl(var(--accent))" strokeWidth="2" />
        <line x1="25" y1="10" x2="22" y2="8" stroke="hsl(var(--accent))" strokeWidth="2" />
        <line x1="45" y1="10" x2="48" y2="8" stroke="hsl(var(--accent))" strokeWidth="2" />
      </g>
    </svg>
  </div>
);

// Illustration Services - Poignée de main et mallette
const ServicesIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Mallette */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="35" y="40" width="50" height="30" rx="3" fill="hsl(var(--primary))" />
        <rect x="50" y="35" width="20" height="8" rx="2" fill="hsl(var(--primary))" />
        <rect x="55" y="50" width="10" height="8" rx="1" fill="hsl(var(--accent))" />
        <line x1="60" y1="52" x2="60" y2="56" stroke="hsl(var(--accent-foreground))" strokeWidth="2" />
      </g>
      
      {/* Poignée de main stylisée */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <path d="M30 25 Q40 20 50 25 L55 30 Q45 35 35 30 Z" fill="hsl(var(--secondary))" />
        <path d="M90 25 Q80 20 70 25 L65 30 Q75 35 85 30 Z" fill="hsl(var(--accent))" />
        <ellipse cx="60" cy="27" rx="8" ry="5" fill="hsl(var(--muted))" className="animate-pulse" />
      </g>
      
      {/* Graphique croissance */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <line x1="95" y1="70" x2="95" y2="45" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="95" y1="70" x2="115" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <polyline points="97,65 102,58 107,62 112,50" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <circle cx="112" cy="50" r="2" fill="hsl(var(--accent))" className="animate-pulse" />
      </g>
      
      {/* Check mark */}
      <g className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <circle cx="15" cy="55" r="10" fill="hsl(var(--primary))" opacity="0.2" />
        <path d="M10 55 L14 59 L21 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </g>
    </svg>
  </div>
);

// Illustration Architecture - Plan et bâtiment
const ArchitectureIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Grille blueprint */}
      <g opacity="0.1">
        {[...Array(12)].map((_, i) => (
          <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="80" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
        {[...Array(8)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 10} x2="120" y2={i * 10} stroke="hsl(var(--primary))" strokeWidth="0.5" />
        ))}
      </g>
      
      {/* Bâtiment moderne */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="60" y="20" width="40" height="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <rect x="65" y="25" width="10" height="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <rect x="80" y="25" width="10" height="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <rect x="65" y="42" width="10" height="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <rect x="80" y="42" width="10" height="12" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" />
        <rect x="73" y="58" width="14" height="12" fill="hsl(var(--secondary))" />
      </g>
      
      {/* Équerre */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <path d="M15 65 L15 35 L45 65 Z" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <line x1="15" y1="45" x2="22" y2="45" stroke="hsl(var(--accent))" strokeWidth="1" />
        <line x1="22" y1="45" x2="22" y2="52" stroke="hsl(var(--accent))" strokeWidth="1" />
      </g>
      
      {/* Compas */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <circle cx="35" cy="20" r="12" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 2" className="animate-pulse" />
        <line x1="35" y1="20" x2="35" y2="8" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        <line x1="35" y1="20" x2="45" y2="28" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        <circle cx="35" cy="20" r="2" fill="hsl(var(--foreground))" />
      </g>
    </svg>
  </div>
);

// Illustration Transport - Camion et route
const TransportIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-accent/5 to-accent/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Ciel avec nuages */}
      <g opacity="0.3">
        <ellipse cx="20" cy="15" rx="12" ry="6" fill="hsl(var(--muted-foreground))" />
        <ellipse cx="90" cy="12" rx="15" ry="7" fill="hsl(var(--muted-foreground))" />
      </g>
      
      {/* Route */}
      <rect x="0" y="55" width="120" height="25" fill="hsl(var(--muted))" />
      <line x1="0" y1="67" x2="120" y2="67" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="10 8" />
      
      {/* Camion */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {/* Remorque */}
        <rect x="15" y="35" width="45" height="25" rx="2" fill="hsl(var(--primary))" />
        <rect x="20" y="38" width="35" height="8" fill="hsl(var(--primary-foreground))" opacity="0.2" />
        {/* Cabine */}
        <rect x="60" y="40" width="25" height="20" rx="2" fill="hsl(var(--accent))" />
        <rect x="70" y="43" width="12" height="8" rx="1" fill="hsl(var(--muted))" opacity="0.7" />
        {/* Roues */}
        <circle cx="30" cy="60" r="7" fill="hsl(var(--foreground))" />
        <circle cx="30" cy="60" r="3" fill="hsl(var(--muted))" />
        <circle cx="50" cy="60" r="7" fill="hsl(var(--foreground))" />
        <circle cx="50" cy="60" r="3" fill="hsl(var(--muted))" />
        <circle cx="75" cy="60" r="7" fill="hsl(var(--foreground))" />
        <circle cx="75" cy="60" r="3" fill="hsl(var(--muted))" />
      </g>
      
      {/* Marqueur localisation */}
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <path d="M100 25 C100 18 105 12 110 12 C115 12 120 18 120 25 C120 32 110 42 110 42 C110 42 100 32 100 25 Z" fill="hsl(var(--accent))" />
        <circle cx="110" cy="24" r="4" fill="hsl(var(--accent-foreground))" />
      </g>
    </svg>
  </div>
);

// Illustration Arts - Scène et projecteurs
const ArtsIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-accent/5 to-accent/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Rideaux */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <path d="M0 5 Q10 10 10 70 L0 70 Z" fill="hsl(var(--accent))" />
        <path d="M120 5 Q110 10 110 70 L120 70 Z" fill="hsl(var(--accent))" />
        <rect x="0" y="0" width="120" height="8" fill="hsl(var(--accent))" />
      </g>
      
      {/* Scène */}
      <rect x="10" y="60" width="100" height="15" fill="hsl(var(--secondary))" className="animate-fade-in" style={{ animationDelay: "0.15s" }} />
      
      {/* Projecteurs */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <rect x="20" y="10" width="8" height="6" rx="1" fill="hsl(var(--muted-foreground))" />
        <polygon points="24,16 18,45 30,45" fill="hsl(var(--accent))" opacity="0.3" className="animate-pulse" />
        
        <rect x="92" y="10" width="8" height="6" rx="1" fill="hsl(var(--muted-foreground))" />
        <polygon points="96,16 90,45 102,45" fill="hsl(var(--primary))" opacity="0.3" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
      </g>
      
      {/* Artiste sur scène */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <circle cx="60" cy="40" r="8" fill="hsl(var(--primary))" />
        <rect x="56" y="48" width="8" height="12" rx="2" fill="hsl(var(--primary))" />
        <line x1="56" y1="52" x2="50" y2="58" stroke="hsl(var(--primary))" strokeWidth="3" />
        <line x1="64" y1="52" x2="70" y2="48" stroke="hsl(var(--primary))" strokeWidth="3" />
      </g>
      
      {/* Notes de musique */}
      <g className="animate-pulse">
        <text x="35" y="35" fill="hsl(var(--accent))" fontSize="12">♪</text>
        <text x="78" y="30" fill="hsl(var(--primary))" fontSize="10">♫</text>
        <text x="45" y="25" fill="hsl(var(--secondary))" fontSize="8">♪</text>
      </g>
    </svg>
  </div>
);

// Illustration Déménagement - Boîtes et camion
const MovingIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-accent/5 to-accent/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Sol */}
      <rect x="0" y="65" width="120" height="15" fill="hsl(var(--muted))" />
      
      {/* Pile de boîtes */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="15" y="45" width="25" height="20" fill="hsl(var(--secondary))" stroke="hsl(var(--secondary-foreground))" strokeWidth="1" />
        <line x1="27" y1="48" x2="27" y2="62" stroke="hsl(var(--secondary-foreground))" strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="55" x2="35" y2="55" stroke="hsl(var(--secondary-foreground))" strokeWidth="1" opacity="0.5" />
        
        <rect x="20" y="28" width="20" height="17" fill="hsl(var(--accent))" stroke="hsl(var(--accent-foreground))" strokeWidth="1" />
        <text x="26" y="40" fill="hsl(var(--accent-foreground))" fontSize="8" opacity="0.7">FRAGILE</text>
        
        <rect x="42" y="50" width="18" height="15" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1" />
      </g>
      
      {/* Maison */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <rect x="75" y="40" width="35" height="25" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <polygon points="75,40 92,22 110,40" fill="hsl(var(--primary))" />
        <rect x="85" y="50" width="12" height="15" fill="hsl(var(--secondary))" />
        <circle cx="94" cy="57" r="1.5" fill="hsl(var(--accent))" />
        <rect x="100" y="45" width="6" height="8" fill="hsl(var(--muted))" />
      </g>
      
      {/* Flèche de déménagement */}
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <path d="M50 15 L65 15 L65 10 L75 18 L65 26 L65 21 L50 21 Z" fill="hsl(var(--accent))" />
      </g>
    </svg>
  </div>
);

// Illustration Immobilier - Maison et clé
const RealEstateIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Maison principale */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="30" y="35" width="50" height="35" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        <polygon points="30,35 55,12 80,35" fill="hsl(var(--primary))" />
        {/* Fenêtres */}
        <rect x="38" y="42" width="12" height="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="44" y1="42" x2="44" y2="52" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="38" y1="47" x2="50" y2="47" stroke="hsl(var(--border))" strokeWidth="1" />
        <rect x="60" y="42" width="12" height="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Porte */}
        <rect x="48" y="55" width="14" height="15" fill="hsl(var(--secondary))" />
        <circle cx="58" cy="63" r="2" fill="hsl(var(--accent))" />
        {/* Cheminée */}
        <rect x="65" y="18" width="8" height="12" fill="hsl(var(--muted-foreground))" />
      </g>
      
      {/* Clé */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <circle cx="100" cy="30" r="10" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" />
        <circle cx="100" cy="30" r="4" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <rect x="98" y="38" width="4" height="20" fill="hsl(var(--accent))" />
        <rect x="95" y="50" width="5" height="3" fill="hsl(var(--accent))" />
        <rect x="95" y="55" width="7" height="3" fill="hsl(var(--accent))" />
      </g>
      
      {/* Badge "À vendre" */}
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <rect x="5" y="50" width="22" height="20" rx="2" fill="hsl(var(--primary))" />
        <text x="16" y="62" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="5" fontWeight="bold">À</text>
        <text x="16" y="68" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="5" fontWeight="bold">VENDRE</text>
      </g>
    </svg>
  </div>
);

// Illustration Finance - Graphiques et calculatrice
const FinanceIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Graphique à barres */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <rect x="15" y="50" width="10" height="20" fill="hsl(var(--primary))" />
        <rect x="28" y="40" width="10" height="30" fill="hsl(var(--accent))" />
        <rect x="41" y="35" width="10" height="35" fill="hsl(var(--secondary))" />
        <rect x="54" y="25" width="10" height="45" fill="hsl(var(--primary))" className="animate-pulse" />
        <line x1="10" y1="70" x2="70" y2="70" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="10" y1="70" x2="10" y2="20" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      </g>
      
      {/* Calculatrice */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <rect x="75" y="25" width="35" height="45" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <rect x="80" y="30" width="25" height="10" fill="hsl(var(--muted))" />
        <text x="100" y="38" textAnchor="end" fill="hsl(var(--foreground))" fontSize="7">12,450$</text>
        {/* Boutons */}
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={80 + col * 9}
              y={44 + row * 8}
              width="7"
              height="6"
              rx="1"
              fill={col === 2 && row === 2 ? "hsl(var(--primary))" : "hsl(var(--muted))"}
            />
          ))
        )}
      </g>
      
      {/* Symbole dollar */}
      <g className="animate-pulse" style={{ animationDelay: "0.3s" }}>
        <circle cx="92" cy="12" r="10" fill="hsl(var(--accent))" />
        <text x="92" y="16" textAnchor="middle" fill="hsl(var(--accent-foreground))" fontSize="12" fontWeight="bold">$</text>
      </g>
      
      {/* Flèche croissance */}
      <g className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <path d="M20 15 L35 8 L32 12 L45 12 L45 18 L32 18 L35 22 Z" fill="hsl(var(--primary))" opacity="0.7" />
      </g>
    </svg>
  </div>
);

// Illustration OBNL - Coeur et mains
const OBNLIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-primary/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Mains qui tiennent */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <path d="M25 55 Q15 50 15 40 Q15 35 20 35 L30 35 Q35 35 35 40 L35 55 Q30 60 25 55" fill="hsl(var(--secondary))" />
        <path d="M95 55 Q105 50 105 40 Q105 35 100 35 L90 35 Q85 35 85 40 L85 55 Q90 60 95 55" fill="hsl(var(--secondary))" />
      </g>
      
      {/* Coeur central */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <path 
          d="M60 60 C45 45 30 38 30 26 C30 16 40 10 50 10 C56 10 58 14 60 18 C62 14 64 10 70 10 C80 10 90 16 90 26 C90 38 75 45 60 60 Z" 
          fill="hsl(var(--accent))" 
          className="animate-pulse"
        />
      </g>
      
      {/* Personnes stylisées */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <circle cx="45" cy="68" r="5" fill="hsl(var(--primary))" />
        <circle cx="60" cy="66" r="5" fill="hsl(var(--primary))" />
        <circle cx="75" cy="68" r="5" fill="hsl(var(--primary))" />
      </g>
      
      {/* Étoiles de solidarité */}
      <g className="animate-pulse" style={{ animationDelay: "0.4s" }}>
        <text x="20" y="20" fill="hsl(var(--accent))" fontSize="10">✦</text>
        <text x="100" y="18" fill="hsl(var(--primary))" fontSize="8">✦</text>
        <text x="55" y="8" fill="hsl(var(--secondary))" fontSize="6">✦</text>
      </g>
    </svg>
  </div>
);

// Illustration Beauté - Miroir et produits
const BeautyIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-accent/5 to-accent/10 rounded-xl overflow-hidden relative p-3">
    <svg viewBox="0 0 120 80" className="w-full h-full">
      {/* Miroir ovale */}
      <g className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <ellipse cx="60" cy="35" rx="25" ry="28" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="3" />
        <ellipse cx="60" cy="35" rx="20" ry="23" fill="hsl(var(--muted))" opacity="0.3" />
        <ellipse cx="52" cy="30" rx="5" ry="8" fill="hsl(var(--card))" opacity="0.5" />
        <rect x="55" y="60" width="10" height="12" fill="hsl(var(--accent))" />
        <ellipse cx="60" cy="72" rx="15" ry="4" fill="hsl(var(--muted))" />
      </g>
      
      {/* Rouge à lèvres */}
      <g className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <rect x="15" y="45" width="8" height="25" rx="2" fill="hsl(var(--foreground))" />
        <rect x="15" y="40" width="8" height="8" rx="1" fill="hsl(var(--accent))" />
        <path d="M15 40 L19 35 L23 40 Z" fill="hsl(var(--accent))" />
      </g>
      
      {/* Brosse */}
      <g className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <ellipse cx="100" cy="50" rx="10" ry="15" fill="hsl(var(--primary))" />
        <rect x="95" y="62" width="10" height="12" rx="2" fill="hsl(var(--secondary))" />
        {/* Poils de la brosse */}
        {[...Array(5)].map((_, i) => (
          <line key={i} x1={93 + i * 3} y1="38" x2={93 + i * 3} y2="48" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
        ))}
      </g>
      
      {/* Parfum */}
      <g className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
        <rect x="30" y="55" width="12" height="18" rx="2" fill="hsl(var(--secondary))" />
        <rect x="33" y="50" width="6" height="6" fill="hsl(var(--muted-foreground))" />
        <circle cx="36" cy="48" r="3" fill="hsl(var(--accent))" />
      </g>
      
      {/* Étoiles brillantes */}
      <g className="animate-pulse">
        <text x="42" y="25" fill="hsl(var(--accent))" fontSize="8">✨</text>
        <text x="72" y="20" fill="hsl(var(--primary))" fontSize="6">✨</text>
        <text x="85" y="35" fill="hsl(var(--secondary))" fontSize="7">✨</text>
      </g>
    </svg>
  </div>
);

// Mapping des illustrations par industrie
const getIllustrationByIndustry = (value: string) => {
  const illustrations: Record<string, React.ReactNode> = {
    auto: <AutoIllustration />,
    restauration: <RestaurantIllustration />,
    sante: <HealthIllustration />,
    construction: <ConstructionIllustration />,
    commerce: <CommerceIllustration />,
    tech: <TechIllustration />,
    education: <EducationIllustration />,
    services: <ServicesIllustration />,
    architecture: <ArchitectureIllustration />,
    transport: <TransportIllustration />,
    "arts-scene": <ArtsIllustration />,
    demenagement: <MovingIllustration />,
    immobilier: <RealEstateIllustration />,
    finances: <FinanceIllustration />,
    obnl: <OBNLIllustration />,
    beaute: <BeautyIllustration />,
  };
  
  return illustrations[value] || <ServicesIllustration />;
};

export const IndustryCard = ({
  value,
  label,
  description,
  isSelected,
  onSelect,
  index,
}: IndustryCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg",
        "bg-card hover:bg-accent/5",
        isSelected
          ? "border-primary shadow-lg ring-2 ring-primary/20"
          : "border-border hover:border-primary/40"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Checkmark */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md z-10">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}

      {/* Illustration animée */}
      <div className="h-32 mb-3 rounded-xl overflow-hidden">
        {getIllustrationByIndustry(value)}
      </div>

      {/* Texte */}
      <h3 className={cn(
        "font-semibold text-base mb-1 transition-colors",
        isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
      )}>
        {label}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {description}
      </p>
    </button>
  );
};
