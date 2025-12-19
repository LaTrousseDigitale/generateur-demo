import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Import des images réalistes
import industryAuto from "@/assets/industry-auto.jpg";
import industryRestaurant from "@/assets/industry-restaurant.jpg";
import industryHealth from "@/assets/industry-health.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryCommerce from "@/assets/industry-commerce.jpg";
import industryTech from "@/assets/industry-tech.jpg";
import industryEducation from "@/assets/industry-education.jpg";
import industryServices from "@/assets/industry-services.jpg";
import industryArchitecture from "@/assets/industry-architecture.jpg";
import industryTransport from "@/assets/industry-transport.jpg";
import industryArts from "@/assets/industry-arts.jpg";
import industryMoving from "@/assets/industry-moving.jpg";
import industryRealEstate from "@/assets/industry-realestate.jpg";
import industryFinance from "@/assets/industry-finance.jpg";
import industryObnl from "@/assets/industry-obnl.jpg";
import industryBeauty from "@/assets/industry-beauty.jpg";

interface IndustryCardProps {
  value: string;
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

// Mapping des images par industrie
const getImageByIndustry = (value: string): string => {
  const images: Record<string, string> = {
    auto: industryAuto,
    restauration: industryRestaurant,
    sante: industryHealth,
    construction: industryConstruction,
    commerce: industryCommerce,
    tech: industryTech,
    education: industryEducation,
    services: industryServices,
    architecture: industryArchitecture,
    transport: industryTransport,
    "arts-scene": industryArts,
    demenagement: industryMoving,
    immobilier: industryRealEstate,
    finances: industryFinance,
    obnl: industryObnl,
    beaute: industryBeauty,
  };
  
  return images[value] || industryServices;
};

// Composant d'image animée
const AnimatedIndustryImage = ({ value, isSelected }: { value: string; isSelected: boolean }) => {
  const imageSrc = getImageByIndustry(value);
  
  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Image avec effet de zoom au hover et animation d'entrée */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-700 ease-out",
          "animate-fade-in"
        )}
      >
        <img
          src={imageSrc}
          alt=""
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 ease-out",
            "group-hover:scale-110",
            isSelected && "scale-105"
          )}
        />
      </div>
      
      {/* Overlay gradient pour lisibilité */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          "bg-gradient-to-t from-background/60 via-transparent to-transparent",
          "group-hover:from-primary/30",
          isSelected && "from-primary/20"
        )}
      />
      
      {/* Effet de brillance au hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-white/10 to-transparent",
          "group-hover:opacity-100",
          "translate-x-[-100%] group-hover:translate-x-[100%]",
          "transition-transform duration-1000"
        )}
      />
    </div>
  );
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

      {/* Image réaliste animée */}
      <div className="h-32 mb-3 rounded-xl overflow-hidden">
        <AnimatedIndustryImage value={value} isSelected={isSelected} />
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
