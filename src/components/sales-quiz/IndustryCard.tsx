import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Import modern SaaS industry images
import industryAuto from "@/assets/industry-auto.jpg";
import industryRestaurant from "@/assets/industry-restaurant.jpg";
import industryHealth from "@/assets/industry-health.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";
import industryArchitecture from "@/assets/industry-architecture.jpg";
import industryCommerce from "@/assets/industry-commerce.jpg";
import industryEducation from "@/assets/industry-education.jpg";
import industryObnl from "@/assets/industry-obnl.jpg";
import industryServices from "@/assets/industry-services.jpg";
import industryTech from "@/assets/industry-tech.jpg";
import industryTransport from "@/assets/industry-transport.jpg";
import industryArts from "@/assets/industry-arts.jpg";
import industryMoving from "@/assets/industry-moving.jpg";
import industryRealestate from "@/assets/industry-realestate.jpg";
import industryFinance from "@/assets/industry-finance.jpg";

interface IndustryCardProps {
  value: string;
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const INDUSTRY_IMAGES: Record<string, string> = {
  auto: industryAuto,
  restauration: industryRestaurant,
  sante: industryHealth,
  construction: industryConstruction,
  architecture: industryArchitecture,
  commerce: industryCommerce,
  education: industryEducation,
  obnl: industryObnl,
  services: industryServices,
  tech: industryTech,
  transport: industryTransport,
  "arts-scene": industryArts,
  demenagement: industryMoving,
  immobilier: industryRealestate,
  finances: industryFinance,
};

const INDUSTRY_ICONS: Record<string, string> = {
  auto: "🚗",
  restauration: "🍽️",
  sante: "🏥",
  construction: "🏗️",
  architecture: "📐",
  commerce: "🛍️",
  education: "🎓",
  obnl: "💙",
  services: "💼",
  tech: "💻",
  transport: "🚛",
  "arts-scene": "🎭",
  demenagement: "📦",
  immobilier: "🏠",
  finances: "💰",
};

export const IndustryCard = ({
  value,
  label,
  description,
  isSelected,
  onSelect,
  index,
}: IndustryCardProps) => {
  const image = INDUSTRY_IMAGES[value] || industryServices;
  const icon = INDUSTRY_ICONS[value] || "🏢";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-500",
        "w-full aspect-[4/3] text-left",
        "animate-fade-in",
        isSelected && "ring-4 ring-primary ring-offset-2 ring-offset-background"
      )}
      style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={label}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            "group-hover:scale-110"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            isSelected
              ? "bg-gradient-to-t from-primary/90 via-primary/50 to-primary/30"
              : "bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent group-hover:from-primary/70 group-hover:via-primary/30"
          )}
        />
      </div>

      {/* Glow Effect */}
      {isSelected && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-50 blur-xl -z-10 animate-pulse" />
      )}

      {/* Content */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        {/* Icon Badge */}
        <div
          className={cn(
            "absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-xl",
            "transition-all duration-300",
            isSelected
              ? "bg-white/30 backdrop-blur-sm"
              : "bg-white/20 backdrop-blur-sm group-hover:bg-white/30"
          )}
        >
          {icon}
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center animate-scale-in">
            <Check className="w-5 h-5 text-primary" />
          </div>
        )}

        {/* Text */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white drop-shadow-lg">
            {label}
          </h3>
          <p className="text-sm text-white/80 line-clamp-2">{description}</p>
        </div>
      </div>
    </button>
  );
};
