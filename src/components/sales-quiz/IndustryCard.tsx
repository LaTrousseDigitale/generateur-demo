import { Check, Car, UtensilsCrossed, ShoppingBag, Heart, HardHat, GraduationCap, HandHeart, Briefcase, Ruler, Cpu, Truck, Theater, Package, Home, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface IndustryCardProps {
  value: string;
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

// Icon mapping for each industry
const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  auto: Car,
  restauration: UtensilsCrossed,
  sante: Heart,
  construction: HardHat,
  architecture: Ruler,
  commerce: ShoppingBag,
  education: GraduationCap,
  obnl: HandHeart,
  services: Briefcase,
  tech: Cpu,
  transport: Truck,
  "arts-scene": Theater,
  demenagement: Package,
  immobilier: Home,
  finances: TrendingUp,
};

// Gradient colors for each industry (matching branding: warm yellow, blue, coral orange)
const INDUSTRY_COLORS: Record<string, { from: string; via: string; to: string; accent: string }> = {
  auto: { from: "from-blue-500", via: "via-blue-600", to: "to-primary", accent: "bg-blue-500" },
  restauration: { from: "from-orange-400", via: "via-accent", to: "to-red-500", accent: "bg-accent" },
  sante: { from: "from-emerald-400", via: "via-teal-500", to: "to-cyan-600", accent: "bg-emerald-500" },
  construction: { from: "from-amber-400", via: "via-secondary", to: "to-orange-500", accent: "bg-secondary" },
  architecture: { from: "from-slate-400", via: "via-slate-500", to: "to-slate-600", accent: "bg-slate-500" },
  commerce: { from: "from-purple-400", via: "via-purple-500", to: "to-indigo-600", accent: "bg-purple-500" },
  education: { from: "from-primary", via: "via-blue-500", to: "to-indigo-600", accent: "bg-primary" },
  obnl: { from: "from-pink-400", via: "via-rose-500", to: "to-red-500", accent: "bg-pink-500" },
  services: { from: "from-cyan-400", via: "via-cyan-500", to: "to-blue-600", accent: "bg-cyan-500" },
  tech: { from: "from-violet-400", via: "via-purple-500", to: "to-fuchsia-600", accent: "bg-violet-500" },
  transport: { from: "from-amber-500", via: "via-orange-500", to: "to-red-500", accent: "bg-amber-500" },
  "arts-scene": { from: "from-fuchsia-400", via: "via-pink-500", to: "to-rose-500", accent: "bg-fuchsia-500" },
  demenagement: { from: "from-amber-400", via: "via-yellow-500", to: "to-secondary", accent: "bg-amber-400" },
  immobilier: { from: "from-teal-400", via: "via-emerald-500", to: "to-green-600", accent: "bg-teal-500" },
  finances: { from: "from-green-400", via: "via-emerald-500", to: "to-teal-600", accent: "bg-green-500" },
};

export const IndustryCard = ({
  value,
  label,
  description,
  isSelected,
  onSelect,
  index,
}: IndustryCardProps) => {
  const IconComponent = INDUSTRY_ICONS[value] || Briefcase;
  const colors = INDUSTRY_COLORS[value] || INDUSTRY_COLORS.services;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-500",
        "w-full aspect-[4/3] text-left",
        "animate-fade-in bg-card border-2",
        isSelected 
          ? "border-primary ring-4 ring-primary/20 shadow-2xl" 
          : "border-border/50 hover:border-primary/50 hover:shadow-xl"
      )}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs animation */}
        <div 
          className={cn(
            "absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl",
            "transition-all duration-700 group-hover:scale-150 group-hover:opacity-30",
            `bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to}`
          )}
          style={{
            animation: `float ${3 + index * 0.2}s ease-in-out infinite`,
          }}
        />
        <div 
          className={cn(
            "absolute -bottom-12 -left-12 w-40 h-40 rounded-full opacity-10 blur-3xl",
            "transition-all duration-700 group-hover:scale-125 group-hover:opacity-20",
            `bg-gradient-to-tr ${colors.from} ${colors.to}`
          )}
          style={{
            animation: `float ${4 + index * 0.3}s ease-in-out infinite reverse`,
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className={cn(
            "absolute inset-0 opacity-[0.03] transition-opacity duration-500",
            "group-hover:opacity-[0.06]"
          )}
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Selected State Glow */}
      {isSelected && (
        <div 
          className={cn(
            "absolute -inset-0.5 rounded-2xl opacity-50 blur-sm -z-10",
            `bg-gradient-to-r ${colors.from} ${colors.via} ${colors.to}`
          )} 
        />
      )}

      {/* Content */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Icon with Animation */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className={cn(
              "relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center",
              "transition-all duration-500 group-hover:scale-110",
              isSelected 
                ? `bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} shadow-lg` 
                : "bg-muted/50 group-hover:bg-muted"
            )}
          >
            {/* Pulse ring on hover */}
            <div 
              className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
                "transition-all duration-500"
              )}
            >
              <div 
                className={cn(
                  "absolute inset-0 rounded-2xl animate-ping opacity-20",
                  colors.accent
                )} 
                style={{ animationDuration: "2s" }}
              />
            </div>
            
            <IconComponent 
              className={cn(
                "w-8 h-8 md:w-10 md:h-10 transition-all duration-500",
                "group-hover:scale-110",
                isSelected 
                  ? "text-white drop-shadow-lg" 
                  : "text-muted-foreground group-hover:text-foreground"
              )} 
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-1 text-center">
          <h3 
            className={cn(
              "text-sm md:text-base font-semibold transition-colors duration-300",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {label}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Selected Checkmark */}
        {isSelected && (
          <div 
            className={cn(
              "absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center",
              "animate-scale-in",
              `bg-gradient-to-br ${colors.from} ${colors.to}`
            )}
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* Hover shimmer effect */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100",
          "transition-opacity duration-500 pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
          }}
        />
      </div>
    </button>
  );
};
