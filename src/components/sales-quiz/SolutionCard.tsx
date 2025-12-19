import { Check, Globe, Lock, Grid, ShoppingCart, Users, Cog } from "lucide-react";
import { cn } from "@/lib/utils";

interface SolutionCardProps {
  id: string;
  label: string;
  description: string;
  features: string[];
  isSelected: boolean;
  onToggle: () => void;
  index: number;
}

const SOLUTION_ICONS: Record<string, typeof Globe> = {
  website: Globe,
  portal: Lock,
  module: Grid,
  ecommerce: ShoppingCart,
  crm: Users,
  automation: Cog,
};

const SOLUTION_COLORS: Record<string, string> = {
  website: "from-primary to-primary-glow",
  portal: "from-accent to-secondary",
  module: "from-secondary to-primary",
};

export const SolutionCard = ({
  id,
  label,
  description,
  features,
  isSelected,
  onToggle,
  index,
}: SolutionCardProps) => {
  const Icon = SOLUTION_ICONS[id] || Grid;
  const gradient = SOLUTION_COLORS[id] || "from-primary to-accent";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500",
        "border-2 bg-card",
        "animate-slide-up",
        isSelected
          ? "border-primary shadow-glow bg-primary/5"
          : "border-border hover:border-primary/50 hover:shadow-elegant"
      )}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
    >
      {/* Glow Background */}
      {isSelected && (
        <div
          className={cn(
            "absolute -inset-2 bg-gradient-to-r opacity-20 blur-2xl -z-10",
            gradient
          )}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
            isSelected
              ? `bg-gradient-to-br ${gradient} text-white shadow-lg`
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          <Icon className="w-7 h-7" />
        </div>

        {/* Checkbox */}
        <div
          className={cn(
            "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-300",
            isSelected
              ? "bg-primary border-primary"
              : "border-muted-foreground/30 group-hover:border-primary"
          )}
        >
          {isSelected && <Check className="w-4 h-4 text-white animate-scale-in" />}
        </div>
      </div>

      {/* Content */}
      <h3
        className={cn(
          "text-xl font-bold mb-2 transition-colors duration-300",
          isSelected ? "text-primary" : "text-foreground"
        )}
      >
        {label}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>

      {/* Features */}
      <ul className="space-y-2">
        {features.slice(0, 3).map((feature, i) => (
          <li
            key={i}
            className={cn(
              "flex items-center gap-2 text-sm transition-colors duration-300",
              isSelected ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                isSelected ? "bg-primary" : "bg-muted-foreground/50"
              )}
            />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  );
};
