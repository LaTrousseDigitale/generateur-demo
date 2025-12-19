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

// Composant fenêtre d'application réutilisable
const AppWindow = ({ children, url }: { children: React.ReactNode; url?: string }) => (
  <div className="w-full h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    {/* Barre de titre */}
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      {url && (
        <div className="flex-1 text-center">
          <span className="text-[8px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{url}</span>
        </div>
      )}
    </div>
    {/* Contenu */}
    <div className="p-2 h-[calc(100%-28px)]">
      {children}
    </div>
  </div>
);

// Avatar réutilisable
const Avatar = ({ initials, color }: { initials: string; color: string }) => (
  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white text-[8px] font-semibold", color)}>
    {initials}
  </div>
);

// Badge de statut
const StatusBadge = ({ text, variant }: { text: string; variant: "success" | "warning" | "info" | "new" }) => {
  const colors = {
    success: "bg-green-100 text-green-600",
    warning: "bg-orange-100 text-orange-600",
    info: "bg-blue-100 text-blue-600",
    new: "bg-primary/10 text-primary"
  };
  return (
    <span className={cn("text-[7px] px-1.5 py-0.5 rounded-full", colors[variant])}>{text}</span>
  );
};

// Mockup CRM pour Auto
const AutoMockup = () => (
  <AppWindow url="auto-expert.app/crm">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🚗 Véhicules en service</span>
        <span className="text-[7px] bg-green-100 text-green-600 px-1.5 rounded-full animate-pulse">+8 cette semaine</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="ML" color="bg-blue-500" />
            <div>
              <p className="text-[8px] font-medium">Marc Leblanc</p>
              <p className="text-[6px] text-gray-400">Honda Civic 2022</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-primary">450$</p>
            <StatusBadge text="En cours" variant="info" />
          </div>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="ST" color="bg-accent" />
            <div>
              <p className="text-[8px] font-medium">Sophie Tremblay</p>
              <p className="text-[6px] text-gray-400">Toyota RAV4 2021</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-primary">680$</p>
            <StatusBadge text="Terminé" variant="success" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">24</p>
          <p className="text-[6px] text-gray-400">RDV</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">12k$</p>
          <p className="text-[6px] text-gray-400">CA/mois</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">96%</p>
          <p className="text-[6px] text-gray-400">Satisf.</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup réservations pour Restaurant
const RestaurantMockup = () => (
  <AppWindow url="mon-resto.app/reservations">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🍽️ Réservations du soir</span>
        <span className="text-[7px] bg-accent/20 text-accent px-1.5 rounded-full">14 tables</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px]">🕖</div>
            <div>
              <p className="text-[8px] font-medium">19h00 - Famille Roy</p>
              <p className="text-[6px] text-gray-400">Table 5 • 4 pers.</p>
            </div>
          </div>
          <StatusBadge text="Confirmé" variant="success" />
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-[10px]">🕗</div>
            <div>
              <p className="text-[8px] font-medium">20h00 - M. Bergeron</p>
              <p className="text-[6px] text-gray-400">Table 12 • 2 pers.</p>
            </div>
          </div>
          <StatusBadge text="Nouveau" variant="new" />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-gray-100">
        {["🟢", "🟢", "🟡", "🔴"].map((dot, i) => (
          <div key={i} className="h-4 bg-gray-100 rounded flex items-center justify-center text-[8px]">{dot}</div>
        ))}
      </div>
    </div>
  </AppWindow>
);

// Mockup dossiers patients pour Santé
const HealthMockup = () => (
  <AppWindow url="clinique.app/patients">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">❤️ Patients du jour</span>
        <span className="text-[7px] bg-emerald-100 text-emerald-600 px-1.5 rounded-full">12 RDV</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-emerald-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="JD" color="bg-emerald-500" />
            <div>
              <p className="text-[8px] font-medium">Jean Dupont</p>
              <p className="text-[6px] text-gray-400">Suivi annuel</p>
            </div>
          </div>
          <div className="text-[7px] text-emerald-600">09h30</div>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-blue-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="MC" color="bg-blue-500" />
            <div>
              <p className="text-[8px] font-medium">Marie Côté</p>
              <p className="text-[6px] text-gray-400">Consultation</p>
            </div>
          </div>
          <div className="text-[7px] text-blue-600">10h15</div>
        </div>
      </div>
      
      {/* Mini ECG animation */}
      <svg className="w-full h-4" viewBox="0 0 100 15">
        <path 
          d="M0,8 L20,8 L25,2 L30,14 L35,6 L40,10 L45,8 L100,8" 
          fill="none" 
          stroke="hsl(var(--primary))" 
          strokeWidth="1.5"
          className="animate-pulse"
        />
      </svg>
    </div>
  </AppWindow>
);

// Mockup projets pour Construction
const ConstructionMockup = () => (
  <AppWindow url="chantier-pro.app/projets">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🏗️ Chantiers actifs</span>
        <span className="text-[7px] bg-amber-100 text-amber-600 px-1.5 rounded-full">3 projets</span>
      </div>
      
      <div className="space-y-1.5">
        <div className="p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex justify-between items-center mb-1">
            <p className="text-[8px] font-medium">Résidence Bellevue</p>
            <p className="text-[7px] text-amber-600 font-bold">78%</p>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full animate-pulse" style={{ width: "78%" }} />
          </div>
        </div>
        
        <div className="p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex justify-between items-center mb-1">
            <p className="text-[8px] font-medium">Tour Horizon</p>
            <p className="text-[7px] text-green-600 font-bold">45%</p>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" style={{ width: "45%" }} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-amber-500">2.4M$</p>
          <p className="text-[6px] text-gray-400">Budget</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">18</p>
          <p className="text-[6px] text-gray-400">Équipe</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup boutique pour Commerce
const CommerceMockup = () => (
  <AppWindow url="ma-boutique.app/commandes">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🛍️ Commandes récentes</span>
        <span className="text-[7px] bg-purple-100 text-purple-600 px-1.5 rounded-full animate-pulse">+5 nouvelles</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-purple-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-purple-200 flex items-center justify-center text-[10px]">📦</div>
            <div>
              <p className="text-[8px] font-medium">#2847 - 3 articles</p>
              <p className="text-[6px] text-gray-400">Il y a 5 min</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-purple-600">89$</p>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-green-200 flex items-center justify-center text-[10px]">✓</div>
            <div>
              <p className="text-[8px] font-medium">#2846 - Expédié</p>
              <p className="text-[6px] text-gray-400">Il y a 1h</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-green-600">156$</p>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-purple-500">847</p>
          <p className="text-[6px] text-gray-400">Ventes</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">32k$</p>
          <p className="text-[6px] text-gray-400">CA</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">4.8⭐</p>
          <p className="text-[6px] text-gray-400">Avis</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup dashboard pour Tech
const TechMockup = () => (
  <AppWindow url="startup.app/dashboard">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">⚡ Analytics</span>
        <span className="text-[7px] bg-violet-100 text-violet-600 px-1.5 rounded-full">Live</span>
      </div>
      
      {/* Mini graph */}
      <div className="h-10 flex items-end gap-0.5 bg-gray-50 rounded-lg p-1">
        {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
          <div 
            key={i}
            className="flex-1 bg-gradient-to-t from-violet-500 to-violet-300 rounded-t animate-fade-in"
            style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-violet-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-violet-600">2.4k</p>
          <p className="text-[6px] text-gray-400">Users</p>
        </div>
        <div className="bg-green-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-green-600">+23%</p>
          <p className="text-[6px] text-gray-400">Growth</p>
        </div>
        <div className="bg-blue-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-blue-600">99.9%</p>
          <p className="text-[6px] text-gray-400">Uptime</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup cours pour Éducation
const EducationMockup = () => (
  <AppWindow url="ecole.app/cours">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">📚 Mes cours</span>
        <span className="text-[7px] bg-indigo-100 text-indigo-600 px-1.5 rounded-full">Semaine 12</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 p-1.5 bg-indigo-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="w-6 h-6 rounded bg-indigo-200 flex items-center justify-center text-[10px]">🎓</div>
          <div className="flex-1">
            <p className="text-[8px] font-medium">Marketing Digital</p>
            <div className="h-1 bg-gray-200 rounded-full mt-0.5">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
          <span className="text-[7px] text-indigo-600">85%</span>
        </div>
        
        <div className="flex items-center gap-1.5 p-1.5 bg-emerald-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="w-6 h-6 rounded bg-emerald-200 flex items-center justify-center text-[10px]">💡</div>
          <div className="flex-1">
            <p className="text-[8px] font-medium">Entrepreneuriat</p>
            <div className="h-1 bg-gray-200 rounded-full mt-0.5">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "62%" }} />
            </div>
          </div>
          <span className="text-[7px] text-emerald-600">62%</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 pt-1">
        <div className="text-center">
          <p className="text-[10px] font-bold text-indigo-500">12</p>
          <p className="text-[6px] text-gray-400">Cours</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">A+</p>
          <p className="text-[6px] text-gray-400">Moyenne</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup clients pour Services
const ServicesMockup = () => (
  <AppWindow url="mon-service.app/clients">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">💼 Clients actifs</span>
        <span className="text-[7px] bg-cyan-100 text-cyan-600 px-1.5 rounded-full">+3 ce mois</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="AB" color="bg-cyan-500" />
            <div>
              <p className="text-[8px] font-medium">Agence Bloom</p>
              <p className="text-[6px] text-gray-400">Contrat annuel</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-cyan-600">1,200$/m</p>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="TL" color="bg-primary" />
            <div>
              <p className="text-[8px] font-medium">Tech Labs</p>
              <p className="text-[6px] text-gray-400">Projet en cours</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-primary">850$/m</p>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-cyan-500">18</p>
          <p className="text-[6px] text-gray-400">Clients</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">24k$</p>
          <p className="text-[6px] text-gray-400">MRR</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup projets pour Architecture
const ArchitectureMockup = () => (
  <AppWindow url="archi-studio.app/projets">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">📐 Projets design</span>
        <span className="text-[7px] bg-sky-100 text-sky-600 px-1.5 rounded-full">4 actifs</span>
      </div>
      
      {/* Mini blueprint */}
      <div className="h-12 bg-sky-50 rounded-lg p-1 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-4 h-full gap-px">
            {Array(32).fill(0).map((_, i) => (
              <div key={i} className="border border-sky-300" />
            ))}
          </div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 80 35">
          <rect x="10" y="10" width="25" height="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-fade-in" />
          <rect x="45" y="5" width="30" height="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-fade-in" style={{ animationDelay: "0.2s" }} />
          <line x1="35" y1="20" x2="45" y2="17" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2" />
        </svg>
      </div>
      
      <div className="flex justify-between">
        <div className="text-center">
          <p className="text-[10px] font-bold text-sky-500">12</p>
          <p className="text-[6px] text-gray-400">Plans</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">3</p>
          <p className="text-[6px] text-gray-400">En révision</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">8</p>
          <p className="text-[6px] text-gray-400">Approuvés</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup livraisons pour Transport
const TransportMockup = () => (
  <AppWindow url="livraison.app/trajets">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🚚 Livraisons</span>
        <span className="text-[7px] bg-amber-100 text-amber-600 px-1.5 rounded-full animate-pulse">En route</span>
      </div>
      
      {/* Mini map */}
      <div className="h-10 bg-gradient-to-b from-green-100 to-green-50 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center px-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="flex-1 h-0.5 bg-gray-300 mx-1 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 text-[10px] animate-bounce">🚛</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>
        <div className="absolute bottom-1 left-2 text-[6px] text-gray-500">A: Entrepôt</div>
        <div className="absolute bottom-1 right-2 text-[6px] text-gray-500">B: Client</div>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-amber-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-amber-600">24</p>
          <p className="text-[6px] text-gray-400">Livré</p>
        </div>
        <div className="bg-blue-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-blue-600">8</p>
          <p className="text-[6px] text-gray-400">En cours</p>
        </div>
        <div className="bg-green-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-green-600">98%</p>
          <p className="text-[6px] text-gray-400">À temps</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup événements pour Arts
const ArtsMockup = () => (
  <AppWindow url="spectacle.app/evenements">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🎭 Événements</span>
        <span className="text-[7px] bg-rose-100 text-rose-600 px-1.5 rounded-full">Ce soir</span>
      </div>
      
      <div className="p-1.5 bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[8px] font-bold text-rose-600">Concert Jazz</p>
            <p className="text-[6px] text-gray-400">20h00 - Salle A</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-purple-600">248/300</p>
            <p className="text-[6px] text-gray-400">places</p>
          </div>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-rose-400 to-purple-400 rounded-full animate-pulse" style={{ width: "83%" }} />
        </div>
      </div>
      
      <div className="flex justify-between pt-1">
        <div className="text-center">
          <p className="text-[10px] font-bold text-rose-500">12</p>
          <p className="text-[6px] text-gray-400">Events</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-purple-500">2.4k</p>
          <p className="text-[6px] text-gray-400">Billets</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">48k$</p>
          <p className="text-[6px] text-gray-400">Ventes</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup planning pour Déménagement
const MovingMockup = () => (
  <AppWindow url="demenagement.app/planning">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">📦 Planning déménagements</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-orange-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-orange-200 flex items-center justify-center text-[10px]">🏠</div>
            <div>
              <p className="text-[8px] font-medium">Fam. Gagnon</p>
              <p className="text-[6px] text-gray-400">3½ → 5½</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-bold text-orange-600">Demain</p>
            <p className="text-[6px] text-gray-400">8h00</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-blue-200 flex items-center justify-center text-[10px]">🏢</div>
            <div>
              <p className="text-[8px] font-medium">Bureau Tech Inc.</p>
              <p className="text-[6px] text-gray-400">Commercial</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-bold text-blue-600">Samedi</p>
            <p className="text-[6px] text-gray-400">7h00</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-orange-500">8</p>
          <p className="text-[6px] text-gray-400">Cette sem.</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">100%</p>
          <p className="text-[6px] text-gray-400">Confirmés</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup propriétés pour Immobilier
const RealEstateMockup = () => (
  <AppWindow url="immo-pro.app/proprietes">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">🏡 Propriétés</span>
        <span className="text-[7px] bg-teal-100 text-teal-600 px-1.5 rounded-full">12 actives</span>
      </div>
      
      <div className="grid grid-cols-2 gap-1">
        <div className="p-1.5 bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-[10px] font-bold text-teal-600">450k$</p>
          <p className="text-[6px] text-gray-500">Condo Centre-ville</p>
          <StatusBadge text="Nouveau" variant="new" />
        </div>
        <div className="p-1.5 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-[10px] font-bold text-amber-600">680k$</p>
          <p className="text-[6px] text-gray-500">Maison Outremont</p>
          <StatusBadge text="Offre" variant="warning" />
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-teal-500">4.2M$</p>
          <p className="text-[6px] text-gray-400">Listings</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-green-500">3</p>
          <p className="text-[6px] text-gray-400">Vendus/mois</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup finances
const FinanceMockup = () => (
  <AppWindow url="finance.app/portefeuille">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">📊 Portefeuille</span>
        <span className="text-[7px] bg-green-100 text-green-600 px-1.5 rounded-full animate-pulse">+2.4%</span>
      </div>
      
      {/* Mini chart */}
      <div className="h-10 flex items-end gap-0.5 bg-gray-50 rounded-lg p-1">
        {[30, 45, 35, 60, 50, 75, 65, 80, 70, 85].map((h, i) => (
          <div 
            key={i}
            className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t animate-fade-in"
            style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-green-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-green-600">125k$</p>
          <p className="text-[6px] text-gray-400">Total</p>
        </div>
        <div className="bg-blue-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-blue-600">+8.5%</p>
          <p className="text-[6px] text-gray-400">YTD</p>
        </div>
        <div className="bg-purple-50 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-purple-600">12</p>
          <p className="text-[6px] text-gray-400">Actifs</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mockup OBNL
const OBNLMockup = () => (
  <AppWindow url="asbl.app/dons">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-gray-700">💚 Campagne dons</span>
        <span className="text-[7px] bg-emerald-100 text-emerald-600 px-1.5 rounded-full">Active</span>
      </div>
      
      <div className="p-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
        <div className="flex justify-between items-center mb-1">
          <p className="text-[8px] font-medium">Objectif: 50,000$</p>
          <p className="text-[7px] text-emerald-600 font-bold">72%</p>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" style={{ width: "72%" }} />
        </div>
        <p className="text-[6px] text-gray-400 mt-0.5">36,000$ collectés • 245 donateurs</p>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-gray-100">
        <div className="text-center">
          <p className="text-[10px] font-bold text-emerald-500">1.2k</p>
          <p className="text-[6px] text-gray-400">Membres</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-teal-500">8</p>
          <p className="text-[6px] text-gray-400">Projets</p>
        </div>
      </div>
    </div>
  </AppWindow>
);

// Mapping des mockups par industrie
const getMockupByIndustry = (value: string) => {
  const mockups: Record<string, React.ReactNode> = {
    auto: <AutoMockup />,
    restaurant: <RestaurantMockup />,
    sante: <HealthMockup />,
    construction: <ConstructionMockup />,
    commerce: <CommerceMockup />,
    tech: <TechMockup />,
    education: <EducationMockup />,
    services: <ServicesMockup />,
    architecture: <ArchitectureMockup />,
    transport: <TransportMockup />,
    arts: <ArtsMockup />,
    demenagement: <MovingMockup />,
    immobilier: <RealEstateMockup />,
    finance: <FinanceMockup />,
    obnl: <OBNLMockup />,
  };
  
  return mockups[value] || <TechMockup />;
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

      {/* Mockup UI animé */}
      <div className="h-32 mb-3 rounded-xl overflow-hidden">
        {getMockupByIndustry(value)}
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
