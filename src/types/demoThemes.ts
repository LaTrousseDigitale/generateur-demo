// Types et configurations pour les 3 styles de démo

export type DemoTheme = "moderne" | "rustique" | "futuriste";

export interface ThemeConfig {
  id: DemoTheme;
  name: string;
  description: string;
  preview: {
    bgGradient: string;
    cardBg: string;
    textColor: string;
    accentGlow: boolean;
  };
}

export const DEMO_THEMES: ThemeConfig[] = [
  {
    id: "moderne",
    name: "Moderne & lumineux",
    description: "Design épuré, minimaliste avec beaucoup d'espace blanc et des lignes nettes",
    preview: {
      bgGradient: "from-white via-slate-50 to-white",
      cardBg: "bg-white",
      textColor: "text-slate-900",
      accentGlow: false,
    },
  },
  {
    id: "rustique",
    name: "Sombre & chaleureux",
    description: "Ambiance chaleureuse avec des tons foncés, textures naturelles et élégance",
    preview: {
      bgGradient: "from-stone-900 via-stone-800 to-stone-900",
      cardBg: "bg-stone-800/50",
      textColor: "text-stone-100",
      accentGlow: false,
    },
  },
  {
    id: "futuriste",
    name: "Futuriste & dynamique",
    description: "Effets néon, glassmorphisme, animations avancées et gradients vibrants",
    preview: {
      bgGradient: "from-slate-950 via-indigo-950 to-slate-950",
      cardBg: "bg-white/5 backdrop-blur-xl",
      textColor: "text-white",
      accentGlow: true,
    },
  },
];

// Suggestions de thème par défaut selon l'industrie
export const INDUSTRY_SUGGESTED_THEMES: Record<string, DemoTheme> = {
  // Style rustique suggéré
  restauration: "rustique",
  construction: "rustique",
  "arts-scene": "rustique",
  
  // Style futuriste suggéré
  tech: "futuriste",
  auto: "futuriste",
  transport: "futuriste",
  sante: "futuriste",
  
  // Style moderne suggéré (défaut)
  services: "moderne",
  commerce: "moderne",
  education: "moderne",
  obnl: "moderne",
  architecture: "moderne",
};

export const getDefaultThemeForIndustry = (industry: string): DemoTheme => {
  return INDUSTRY_SUGGESTED_THEMES[industry] || "moderne";
};

// Styles CSS pour chaque thème
export const getThemeStyles = (theme: DemoTheme, primaryColor: string) => {
  switch (theme) {
    case "moderne":
      return {
        // Backgrounds
        pageBg: "bg-gradient-to-br from-white via-slate-50 to-white",
        sectionBg: "bg-white",
        cardBg: "bg-white border border-slate-200 shadow-sm hover:shadow-md",
        heroBg: `bg-gradient-to-br from-slate-100 to-white`,
        
        // Text
        headingColor: "text-slate-900",
        textColor: "text-slate-600",
        mutedColor: "text-slate-400",
        
        // Effects
        glowEffect: "",
        borderStyle: "border-slate-200",
        hoverEffect: "hover:scale-[1.02] hover:shadow-lg",
        
        // Special elements
        badgeBg: "bg-slate-100 text-slate-700",
        buttonStyle: "bg-slate-900 hover:bg-slate-800 text-white",
        inputStyle: "border-slate-300 focus:border-slate-500 bg-white",
        
        // Animations
        animationIntensity: "subtle",
      };
      
    case "rustique":
      return {
        // Backgrounds
        pageBg: "bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900",
        sectionBg: "bg-stone-800/50",
        cardBg: "bg-stone-800/80 border border-amber-900/30 backdrop-blur-sm",
        heroBg: "bg-gradient-to-br from-stone-900 via-amber-950/20 to-stone-900",
        
        // Text
        headingColor: "text-amber-50",
        textColor: "text-stone-300",
        mutedColor: "text-stone-400",
        
        // Effects
        glowEffect: "",
        borderStyle: "border-amber-900/30",
        hoverEffect: "hover:bg-stone-700/50 hover:border-amber-800/40",
        
        // Special elements
        badgeBg: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
        buttonStyle: "bg-amber-700 hover:bg-amber-600 text-white",
        inputStyle: "border-amber-900/30 focus:border-amber-700 bg-stone-800/50 text-stone-100",
        
        // Animations
        animationIntensity: "moderate",
      };
      
    case "futuriste":
      return {
        // Backgrounds
        pageBg: "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950",
        sectionBg: "bg-white/5 backdrop-blur-xl",
        cardBg: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]",
        heroBg: "bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950",
        
        // Text
        headingColor: "text-white",
        textColor: "text-slate-300",
        mutedColor: "text-slate-400",
        
        // Effects
        glowEffect: `shadow-[0_0_40px_${primaryColor}40]`,
        borderStyle: "border-white/20",
        hoverEffect: "hover:bg-white/15 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)] hover:scale-[1.02]",
        
        // Special elements
        badgeBg: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/30",
        buttonStyle: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]",
        inputStyle: "border-white/20 focus:border-indigo-500 bg-white/5 text-white placeholder:text-slate-500",
        
        // Animations
        animationIntensity: "intense",
      };
  }
};
