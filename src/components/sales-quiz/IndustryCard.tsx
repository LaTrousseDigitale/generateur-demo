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

// Animated illustration components for each industry
const AutoIllustration = () => (
  <div className="relative w-full h-full">
    {/* Car body */}
    <div 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-20 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-t-xl rounded-b-lg shadow-lg"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Windows */}
      <div className="absolute top-1 left-3 w-5 h-3 bg-blue-200/60 rounded-sm" />
      <div className="absolute top-1 right-3 w-5 h-3 bg-blue-200/60 rounded-sm" />
      {/* Wheels */}
      <div className="absolute -bottom-2 left-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-400 animate-spin" style={{ animationDuration: "2s" }} />
      <div className="absolute -bottom-2 right-2 w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-400 animate-spin" style={{ animationDuration: "2s" }} />
    </div>
    {/* Floating parts */}
    <div className="absolute top-4 right-4 w-6 h-6 bg-gray-300 rounded-full shadow animate-bounce" style={{ animationDuration: "2s", animationDelay: "0.2s" }} />
    <div className="absolute top-8 left-4 w-4 h-8 bg-accent/80 rounded shadow animate-bounce" style={{ animationDuration: "2.5s" }} />
    <div className="absolute top-3 left-1/2 w-3 h-3 bg-secondary rounded-full animate-ping" style={{ animationDuration: "3s" }} />
  </div>
);

const RestaurantIllustration = () => (
  <div className="relative w-full h-full">
    {/* Plate */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-100"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Food */}
      <div className="absolute top-3 left-3 w-4 h-4 bg-accent rounded-full" />
      <div className="absolute top-4 right-3 w-3 h-3 bg-green-500 rounded-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-5 h-3 bg-amber-600 rounded" />
    </div>
    {/* Steam */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
      <div className="w-1 h-4 bg-gray-300/60 rounded-full animate-pulse" />
      <div className="w-1 h-6 bg-gray-300/60 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
      <div className="w-1 h-5 bg-gray-300/60 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
    </div>
    {/* Utensils */}
    <div className="absolute bottom-6 left-3 w-1.5 h-10 bg-gray-400 rounded-full rotate-[-20deg] animate-bounce" style={{ animationDuration: "3s" }} />
    <div className="absolute bottom-6 right-3 w-1.5 h-10 bg-gray-400 rounded-full rotate-[20deg] animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
  </div>
);

const HealthIllustration = () => (
  <div className="relative w-full h-full">
    {/* Heart with pulse */}
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ animation: "heartbeat 1.5s ease-in-out infinite" }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-600 rounded-tl-full rounded-tr-full rotate-45 shadow-lg">
        <div className="absolute -top-[24px] -left-[12px] w-12 h-12 bg-gradient-to-br from-red-400 to-rose-600 rounded-full" />
        <div className="absolute -top-[12px] -right-[24px] w-12 h-12 bg-gradient-to-br from-red-400 to-rose-600 rounded-full" />
      </div>
    </div>
    {/* Pulse line */}
    <svg className="absolute bottom-4 left-2 w-20 h-8" viewBox="0 0 80 30">
      <path 
        d="M0,15 L15,15 L20,5 L25,25 L30,10 L35,20 L40,15 L80,15" 
        fill="none" 
        stroke="hsl(var(--primary))" 
        strokeWidth="2"
        className="animate-pulse"
        strokeDasharray="80"
        strokeDashoffset="0"
      />
    </svg>
    {/* Floating cross */}
    <div className="absolute top-3 right-3 w-6 h-6 animate-bounce" style={{ animationDuration: "2s" }}>
      <div className="absolute top-0 left-2 w-2 h-6 bg-emerald-500 rounded" />
      <div className="absolute top-2 left-0 w-6 h-2 bg-emerald-500 rounded" />
    </div>
  </div>
);

const ConstructionIllustration = () => (
  <div className="relative w-full h-full">
    {/* Building blocks */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
      <div className="w-8 h-4 bg-secondary rounded shadow animate-fade-in" style={{ animationDelay: "0.6s" }} />
      <div className="w-12 h-4 bg-amber-500 rounded shadow animate-fade-in" style={{ animationDelay: "0.4s" }} />
      <div className="w-16 h-4 bg-amber-600 rounded shadow animate-fade-in" style={{ animationDelay: "0.2s" }} />
      <div className="w-20 h-4 bg-amber-700 rounded shadow" />
    </div>
    {/* Crane */}
    <div className="absolute top-2 right-2">
      <div className="w-1 h-16 bg-gray-600" />
      <div className="absolute top-0 left-0 w-10 h-1 bg-gray-600" />
      <div 
        className="absolute top-0 right-0 w-0.5 h-6 bg-gray-400 origin-top"
        style={{ animation: "swing 2s ease-in-out infinite" }}
      >
        <div className="absolute bottom-0 w-3 h-3 bg-secondary rounded shadow-lg -translate-x-1" />
      </div>
    </div>
    {/* Hard hat */}
    <div className="absolute top-4 left-3 w-8 h-4 bg-secondary rounded-t-full shadow animate-bounce" style={{ animationDuration: "3s" }} />
  </div>
);

const CommerceIllustration = () => (
  <div className="relative w-full h-full">
    {/* Shopping bag */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-16 bg-gradient-to-b from-purple-400 to-purple-600 rounded-b-lg shadow-lg"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Handle */}
      <div className="absolute -top-3 left-2 w-10 h-4 border-4 border-purple-700 rounded-t-full bg-transparent" />
      {/* Shine */}
      <div className="absolute top-2 left-2 w-2 h-8 bg-white/30 rounded" />
    </div>
    {/* Floating items */}
    <div className="absolute top-2 right-2 w-4 h-4 bg-accent rounded shadow animate-bounce" style={{ animationDelay: "0.2s" }} />
    <div className="absolute top-6 left-3 w-3 h-3 bg-secondary rounded-full shadow animate-bounce" style={{ animationDelay: "0.4s" }} />
    <div className="absolute top-3 left-1/2 w-2 h-2 bg-primary rounded shadow animate-ping" style={{ animationDuration: "2s" }} />
  </div>
);

const TechIllustration = () => (
  <div className="relative w-full h-full">
    {/* Laptop */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Screen */}
      <div className="w-16 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-t-lg shadow-lg border-2 border-gray-700">
        {/* Code lines */}
        <div className="p-1 space-y-1">
          <div className="w-8 h-1 bg-green-400 rounded" />
          <div className="w-6 h-1 bg-blue-400 rounded ml-2" />
          <div className="w-10 h-1 bg-pink-400 rounded" />
          <div className="w-4 h-1 bg-yellow-400 rounded ml-1" />
        </div>
      </div>
      {/* Base */}
      <div className="w-18 h-1.5 bg-gray-600 rounded-b mx-auto" style={{ width: "72px" }} />
    </div>
    {/* Floating elements */}
    <div className="absolute top-2 right-2 text-lg animate-bounce">⚡</div>
    <div className="absolute top-4 left-3 w-4 h-4 border-2 border-primary rounded animate-spin" style={{ animationDuration: "3s" }} />
    <div className="absolute top-2 left-1/2 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDuration: "2s" }} />
  </div>
);

const EducationIllustration = () => (
  <div className="relative w-full h-full">
    {/* Books stack */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-0.5"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      <div className="w-14 h-3 bg-primary rounded shadow" />
      <div className="w-12 h-3 bg-accent rounded shadow ml-1" />
      <div className="w-14 h-3 bg-secondary rounded shadow" />
      <div className="w-13 h-3 bg-emerald-500 rounded shadow ml-0.5" />
    </div>
    {/* Graduation cap */}
    <div className="absolute top-4 right-3 animate-bounce" style={{ animationDuration: "2s" }}>
      <div className="w-8 h-2 bg-gray-800 rotate-[-10deg]" />
      <div className="w-6 h-4 bg-gray-800 rounded-b mx-auto -mt-1" />
      <div className="absolute -top-1 left-1/2 w-0.5 h-4 bg-gray-600">
        <div className="absolute top-0 w-2 h-2 bg-secondary rounded-full -translate-x-1" />
      </div>
    </div>
    {/* Floating elements */}
    <div className="absolute top-6 left-3 text-sm animate-pulse">💡</div>
  </div>
);

const ServicesIllustration = () => (
  <div className="relative w-full h-full">
    {/* Briefcase */}
    <div 
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-lg shadow-lg"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Handle */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-3 border-3 border-cyan-700 rounded-t-lg bg-transparent" />
      {/* Lock */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-2 bg-yellow-400 rounded" />
    </div>
    {/* Floating icons */}
    <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded shadow animate-bounce" style={{ animationDelay: "0.3s" }}>
      <div className="w-3 h-0.5 bg-white rounded mx-auto mt-1.5" />
      <div className="w-3 h-0.5 bg-white rounded mx-auto mt-0.5" />
    </div>
    <div className="absolute top-5 left-4 w-4 h-4 bg-secondary rounded-full shadow animate-bounce" style={{ animationDelay: "0.6s" }} />
    <div className="absolute top-2 left-1/2 w-2 h-2 bg-accent rounded animate-ping" style={{ animationDuration: "2s" }} />
  </div>
);

const ArchitectureIllustration = () => (
  <div className="relative w-full h-full">
    {/* Blueprint */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-18 h-14 bg-blue-100 rounded shadow-lg border border-blue-300"
      style={{ animation: "float-gentle 3s ease-in-out infinite", width: "72px" }}
    >
      {/* Grid lines */}
      <div className="absolute inset-2 border border-blue-400 opacity-50" />
      {/* Building outline */}
      <svg className="absolute inset-2 w-14 h-10" viewBox="0 0 50 35">
        <path d="M5,30 L5,15 L25,5 L45,15 L45,30 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <rect x="20" y="20" width="10" height="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
      </svg>
    </div>
    {/* Floating tools */}
    <div className="absolute top-3 right-2 w-8 h-1 bg-gray-500 rotate-45 animate-bounce" style={{ animationDuration: "2s" }}>
      <div className="absolute right-0 w-2 h-3 bg-gray-600 -translate-y-1" />
    </div>
    <div className="absolute top-6 left-3 w-4 h-4 border-2 border-primary rounded-full animate-spin" style={{ animationDuration: "4s" }} />
  </div>
);

const TransportIllustration = () => (
  <div className="relative w-full h-full">
    {/* Truck */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Cab */}
      <div className="w-6 h-8 bg-amber-500 rounded-t-lg rounded-bl-lg shadow-lg">
        <div className="absolute top-1 left-1 w-4 h-3 bg-blue-200/60 rounded-sm" />
      </div>
      {/* Trailer */}
      <div className="w-14 h-10 bg-amber-600 rounded-tr-lg -ml-1 -mt-2 shadow-lg" />
      {/* Wheels */}
      <div className="absolute -bottom-2 left-1 w-3 h-3 bg-gray-800 rounded-full border border-gray-400 animate-spin" style={{ animationDuration: "1s" }} />
      <div className="absolute -bottom-2 right-2 w-3 h-3 bg-gray-800 rounded-full border border-gray-400 animate-spin" style={{ animationDuration: "1s" }} />
      <div className="absolute -bottom-2 right-6 w-3 h-3 bg-gray-800 rounded-full border border-gray-400 animate-spin" style={{ animationDuration: "1s" }} />
    </div>
    {/* Road lines */}
    <div className="absolute bottom-2 left-2 right-2 flex gap-2">
      <div className="w-4 h-1 bg-gray-400 rounded animate-pulse" />
      <div className="w-4 h-1 bg-gray-400 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
      <div className="w-4 h-1 bg-gray-400 rounded animate-pulse" style={{ animationDelay: "0.6s" }} />
    </div>
  </div>
);

const ArtsIllustration = () => (
  <div className="relative w-full h-full">
    {/* Stage curtains */}
    <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-rose-500 to-rose-700 rounded-br-xl" style={{ animation: "curtain-left 4s ease-in-out infinite" }} />
    <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-rose-500 to-rose-700 rounded-bl-xl" style={{ animation: "curtain-right 4s ease-in-out infinite" }} />
    {/* Spotlight */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-300 rounded-full shadow-lg animate-pulse" />
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-b from-yellow-300/40 to-transparent" style={{ clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0 100%)" }} />
    {/* Masks */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
      <div className="w-6 h-6 bg-yellow-400 rounded-full shadow animate-bounce" style={{ animationDuration: "2s" }}>
        <div className="w-1 h-1 bg-gray-800 rounded-full absolute top-1.5 left-1" />
        <div className="w-1 h-1 bg-gray-800 rounded-full absolute top-1.5 right-1" />
        <div className="w-2 h-1 bg-gray-800 rounded-t-full absolute bottom-1.5 left-2" />
      </div>
      <div className="w-6 h-6 bg-blue-400 rounded-full shadow animate-bounce" style={{ animationDuration: "2s", animationDelay: "0.3s" }}>
        <div className="w-1 h-1 bg-gray-800 rounded-full absolute top-1.5 left-1" />
        <div className="w-1 h-1 bg-gray-800 rounded-full absolute top-1.5 right-1" />
        <div className="w-2 h-1 bg-gray-800 rounded-b-full absolute bottom-1.5 left-2" />
      </div>
    </div>
  </div>
);

const MovingIllustration = () => (
  <div className="relative w-full h-full">
    {/* Boxes stack */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      <div className="w-6 h-6 bg-amber-400 rounded shadow animate-bounce" style={{ animationDelay: "0.4s", animationDuration: "2s" }} />
      <div className="w-10 h-8 bg-amber-500 rounded shadow" />
      <div className="w-12 h-8 bg-amber-600 rounded shadow" />
    </div>
    {/* Floating items */}
    <div className="absolute top-4 right-3 w-4 h-6 bg-primary rounded shadow animate-bounce" style={{ animationDuration: "2.5s" }} />
    <div className="absolute top-6 left-4 w-5 h-5 bg-secondary rounded-full shadow animate-bounce" style={{ animationDuration: "3s", animationDelay: "0.3s" }} />
    {/* Arrow */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-accent animate-pulse">→</div>
  </div>
);

const RealEstateIllustration = () => (
  <div className="relative w-full h-full">
    {/* House */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Roof */}
      <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[16px] border-transparent border-b-teal-600 mx-auto" />
      {/* Body */}
      <div className="w-12 h-10 bg-teal-500 rounded-b shadow-lg mx-auto -mt-1">
        {/* Door */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-teal-800 rounded-t" />
        {/* Windows */}
        <div className="absolute top-2 left-1 w-3 h-3 bg-blue-200 rounded-sm" />
        <div className="absolute top-2 right-1 w-3 h-3 bg-blue-200 rounded-sm" />
      </div>
    </div>
    {/* Key */}
    <div className="absolute top-4 right-3 animate-bounce" style={{ animationDuration: "2s" }}>
      <div className="w-4 h-4 border-2 border-secondary rounded-full" />
      <div className="w-1 h-4 bg-secondary ml-1.5 -mt-1" />
    </div>
    {/* Sparkles */}
    <div className="absolute top-3 left-4 text-secondary animate-pulse">✨</div>
  </div>
);

const FinanceIllustration = () => (
  <div className="relative w-full h-full">
    {/* Chart */}
    <div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-12 bg-white rounded shadow-lg border border-gray-200 p-1"
      style={{ animation: "float-gentle 3s ease-in-out infinite" }}
    >
      {/* Bars */}
      <div className="flex items-end gap-1 h-full">
        <div className="w-2 bg-green-400 rounded-t animate-pulse" style={{ height: "40%", animationDelay: "0s" }} />
        <div className="w-2 bg-green-500 rounded-t animate-pulse" style={{ height: "60%", animationDelay: "0.2s" }} />
        <div className="w-2 bg-green-400 rounded-t animate-pulse" style={{ height: "45%", animationDelay: "0.4s" }} />
        <div className="w-2 bg-green-600 rounded-t animate-pulse" style={{ height: "80%", animationDelay: "0.6s" }} />
        <div className="w-2 bg-green-500 rounded-t animate-pulse" style={{ height: "70%", animationDelay: "0.8s" }} />
      </div>
    </div>
    {/* Coins */}
    <div className="absolute top-3 right-2 w-5 h-5 bg-yellow-400 rounded-full shadow border-2 border-yellow-500 animate-bounce" style={{ animationDuration: "2s" }}>
      <span className="text-yellow-700 text-xs font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">$</span>
    </div>
    <div className="absolute top-6 left-3 w-4 h-4 bg-yellow-400 rounded-full shadow border-2 border-yellow-500 animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }} />
    {/* Arrow up */}
    <div className="absolute top-2 left-1/2 text-green-500 animate-pulse font-bold">↑</div>
  </div>
);

const OBNLIllustration = () => (
  <div className="relative w-full h-full">
    {/* Heart hands */}
    <div 
      className="absolute bottom-6 left-1/2 -translate-x-1/2"
      style={{ animation: "heartbeat 2s ease-in-out infinite" }}
    >
      <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-tl-full rounded-tr-full rotate-45 shadow-lg">
        <div className="absolute -top-[20px] -left-[10px] w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full" />
        <div className="absolute -top-[10px] -right-[20px] w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full" />
      </div>
    </div>
    {/* Floating hands */}
    <div className="absolute top-4 left-3 text-2xl animate-bounce" style={{ animationDuration: "2s" }}>🤝</div>
    <div className="absolute top-3 right-3 w-4 h-4 bg-primary rounded-full shadow animate-ping" style={{ animationDuration: "3s" }} />
    {/* Sparkles */}
    <div className="absolute top-6 right-6 text-secondary animate-pulse">✨</div>
  </div>
);

// Map industry values to illustrations
const INDUSTRY_ILLUSTRATIONS: Record<string, React.FC> = {
  auto: AutoIllustration,
  restauration: RestaurantIllustration,
  sante: HealthIllustration,
  construction: ConstructionIllustration,
  architecture: ArchitectureIllustration,
  commerce: CommerceIllustration,
  education: EducationIllustration,
  obnl: OBNLIllustration,
  services: ServicesIllustration,
  tech: TechIllustration,
  transport: TransportIllustration,
  "arts-scene": ArtsIllustration,
  demenagement: MovingIllustration,
  immobilier: RealEstateIllustration,
  finances: FinanceIllustration,
};

// Gradient colors for each industry
const INDUSTRY_COLORS: Record<string, { bg: string; border: string }> = {
  auto: { bg: "from-blue-50 to-blue-100", border: "border-blue-200 hover:border-blue-400" },
  restauration: { bg: "from-orange-50 to-amber-100", border: "border-orange-200 hover:border-orange-400" },
  sante: { bg: "from-emerald-50 to-teal-100", border: "border-emerald-200 hover:border-emerald-400" },
  construction: { bg: "from-amber-50 to-yellow-100", border: "border-amber-200 hover:border-amber-400" },
  architecture: { bg: "from-slate-50 to-gray-100", border: "border-slate-200 hover:border-slate-400" },
  commerce: { bg: "from-purple-50 to-violet-100", border: "border-purple-200 hover:border-purple-400" },
  education: { bg: "from-blue-50 to-indigo-100", border: "border-blue-200 hover:border-blue-400" },
  obnl: { bg: "from-pink-50 to-rose-100", border: "border-pink-200 hover:border-pink-400" },
  services: { bg: "from-cyan-50 to-sky-100", border: "border-cyan-200 hover:border-cyan-400" },
  tech: { bg: "from-violet-50 to-purple-100", border: "border-violet-200 hover:border-violet-400" },
  transport: { bg: "from-amber-50 to-orange-100", border: "border-amber-200 hover:border-amber-400" },
  "arts-scene": { bg: "from-fuchsia-50 to-pink-100", border: "border-fuchsia-200 hover:border-fuchsia-400" },
  demenagement: { bg: "from-yellow-50 to-amber-100", border: "border-yellow-200 hover:border-yellow-400" },
  immobilier: { bg: "from-teal-50 to-emerald-100", border: "border-teal-200 hover:border-teal-400" },
  finances: { bg: "from-green-50 to-emerald-100", border: "border-green-200 hover:border-green-400" },
};

export const IndustryCard = ({
  value,
  label,
  description,
  isSelected,
  onSelect,
  index,
}: IndustryCardProps) => {
  const Illustration = INDUSTRY_ILLUSTRATIONS[value] || ServicesIllustration;
  const colors = INDUSTRY_COLORS[value] || INDUSTRY_COLORS.services;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-500",
        "w-full aspect-[4/3] text-left border-2",
        "animate-fade-in",
        `bg-gradient-to-br ${colors.bg}`,
        isSelected 
          ? "border-primary ring-4 ring-primary/20 shadow-2xl scale-[1.02]" 
          : `${colors.border} hover:shadow-xl hover:scale-[1.02]`
      )}
      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
    >
      {/* Animated Illustration Area */}
      <div className="absolute inset-0 p-2">
        <div className="relative w-full h-[60%]">
          <Illustration />
        </div>
      </div>

      {/* Selected Glow */}
      {isSelected && (
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-sm -z-10" />
      )}

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white/90 via-white/70 to-transparent">
        <h3 
          className={cn(
            "text-sm md:text-base font-bold transition-colors duration-300",
            isSelected ? "text-primary" : "text-foreground"
          )}
        >
          {label}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {description}
        </p>
      </div>

      {/* Selected Checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-primary flex items-center justify-center animate-scale-in shadow-lg">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      )}

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
        />
      </div>
    </button>
  );
};
