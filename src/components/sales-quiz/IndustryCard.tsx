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
  isFeatured?: boolean;
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
  isFeatured = false,
}: IndustryCardProps) => {
  const imageSrc = getImageByIndustry(value);
  
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative w-full h-full text-left rounded-2xl border-2 transition-all duration-500 overflow-hidden",
        "hover:scale-[1.02] hover:-translate-y-1",
        isSelected
          ? "border-primary ring-2 ring-primary/30 shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)]"
          : "border-transparent hover:border-primary/50 shadow-lg hover:shadow-xl"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={label}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            "group-hover:scale-110",
            isSelected && "scale-105"
          )}
        />
      </div>
      
      {/* Gradient Overlay - plus prononcé */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500",
          "bg-gradient-to-t from-black/80 via-black/30 to-black/10",
          "group-hover:from-primary/80 group-hover:via-primary/20 group-hover:to-transparent",
          isSelected && "from-primary/70 via-primary/20 to-transparent"
        )}
      />
      
      {/* Shimmer effect on hover */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          "translate-x-[-100%] group-hover:translate-x-[100%]",
          "transition-all duration-1000 ease-out"
        )}
      />

      {/* Checkmark */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg z-10 animate-scale-in">
          <Check className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      {/* Content at bottom */}
      <div className={cn(
        "absolute inset-x-0 bottom-0 p-4 z-10",
        isFeatured && "p-6"
      )}>
        <h3 className={cn(
          "font-bold mb-1 transition-all duration-300 drop-shadow-lg",
          "text-white",
          "group-hover:translate-x-1",
          isFeatured ? "text-2xl" : "text-lg"
        )}>
          {label}
        </h3>
        <p className={cn(
          "text-white/80 leading-relaxed transition-all duration-300",
          "group-hover:text-white group-hover:translate-x-1",
          "drop-shadow-md",
          isFeatured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"
        )}>
          {description}
        </p>
      </div>
      
      {/* Border glow effect when selected */}
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-pulse opacity-50" />
      )}
    </button>
  );
};
