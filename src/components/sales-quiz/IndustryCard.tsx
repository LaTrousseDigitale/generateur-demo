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

// Composant fenêtre d'application réutilisable avec couleurs branding
const AppWindow = ({ children, url }: { children: React.ReactNode; url?: string }) => (
  <div className="w-full h-full bg-card rounded-xl shadow-lg overflow-hidden border border-border">
    {/* Barre de titre - couleurs branding */}
    <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-accent" />
        <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
      </div>
      {url && (
        <div className="flex-1 text-center">
          <span className="text-[8px] text-muted-foreground bg-muted px-2 py-0.5 rounded">{url}</span>
        </div>
      )}
    </div>
    {/* Contenu */}
    <div className="p-2 h-[calc(100%-28px)]">
      {children}
    </div>
  </div>
);

// Avatar réutilisable avec couleurs branding
const Avatar = ({ initials, variant = "primary" }: { initials: string; variant?: "primary" | "secondary" | "accent" }) => {
  const colors = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground"
  };
  return (
    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-semibold", colors[variant])}>
      {initials}
    </div>
  );
};

// Badge de statut avec couleurs branding
const StatusBadge = ({ text, variant }: { text: string; variant: "success" | "warning" | "info" | "new" }) => {
  const colors = {
    success: "bg-primary/10 text-primary",
    warning: "bg-accent/10 text-accent",
    info: "bg-primary/10 text-primary",
    new: "bg-secondary/20 text-secondary-foreground"
  };
  return (
    <span className={cn("text-[7px] px-1.5 py-0.5 rounded-full font-medium", colors[variant])}>{text}</span>
  );
};

// Mockup CRM pour Auto
const AutoMockup = () => (
  <AppWindow url="auto-expert.app/crm">
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-semibold text-foreground">🚗 Véhicules en service</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full animate-pulse">+8 cette semaine</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="ML" variant="primary" />
            <div>
              <p className="text-[8px] font-medium text-foreground">Marc Leblanc</p>
              <p className="text-[6px] text-muted-foreground">Honda Civic 2022</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-primary">450$</p>
            <StatusBadge text="En cours" variant="info" />
          </div>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="ST" variant="accent" />
            <div>
              <p className="text-[8px] font-medium text-foreground">Sophie Tremblay</p>
              <p className="text-[6px] text-muted-foreground">Toyota RAV4 2021</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-primary">680$</p>
            <StatusBadge text="Terminé" variant="success" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">24</p>
          <p className="text-[6px] text-muted-foreground">RDV</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary">12k$</p>
          <p className="text-[6px] text-muted-foreground">CA/mois</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">96%</p>
          <p className="text-[6px] text-muted-foreground">Satisf.</p>
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
        <span className="text-[8px] font-semibold text-foreground">🍽️ Réservations du soir</span>
        <span className="text-[7px] bg-accent/20 text-accent px-1.5 rounded-full">14 tables</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-secondary/20 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-secondary/30 flex items-center justify-center text-[10px]">🕖</div>
            <div>
              <p className="text-[8px] font-medium text-foreground">19h00 - Famille Roy</p>
              <p className="text-[6px] text-muted-foreground">Table 5 • 4 pers.</p>
            </div>
          </div>
          <StatusBadge text="Confirmé" variant="success" />
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px]">🕗</div>
            <div>
              <p className="text-[8px] font-medium text-foreground">20h00 - M. Bergeron</p>
              <p className="text-[6px] text-muted-foreground">Table 12 • 2 pers.</p>
            </div>
          </div>
          <StatusBadge text="Nouveau" variant="new" />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-border">
        {[<span key="1" className="text-primary">●</span>, <span key="2" className="text-primary">●</span>, <span key="3" className="text-secondary">●</span>, <span key="4" className="text-accent">●</span>].map((dot, i) => (
          <div key={i} className="h-4 bg-muted/50 rounded flex items-center justify-center text-[8px]">{dot}</div>
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
        <span className="text-[8px] font-semibold text-foreground">❤️ Patients du jour</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full">12 RDV</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-primary/10 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="JD" variant="primary" />
            <div>
              <p className="text-[8px] font-medium text-foreground">Jean Dupont</p>
              <p className="text-[6px] text-muted-foreground">Suivi annuel</p>
            </div>
          </div>
          <div className="text-[7px] text-primary font-medium">09h30</div>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-secondary/20 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="MC" variant="secondary" />
            <div>
              <p className="text-[8px] font-medium text-foreground">Marie Côté</p>
              <p className="text-[6px] text-muted-foreground">Consultation</p>
            </div>
          </div>
          <div className="text-[7px] text-secondary-foreground font-medium">10h15</div>
        </div>
      </div>
      
      {/* Mini ECG animation */}
      <svg className="w-full h-4" viewBox="0 0 100 15">
        <path 
          d="M0,8 L20,8 L25,2 L30,14 L35,6 L40,10 L45,8 L100,8" 
          fill="none" 
          stroke="hsl(var(--accent))" 
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
        <span className="text-[8px] font-semibold text-foreground">🏗️ Chantiers actifs</span>
        <span className="text-[7px] bg-secondary/20 text-secondary-foreground px-1.5 rounded-full">3 projets</span>
      </div>
      
      <div className="space-y-1.5">
        <div className="p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex justify-between items-center mb-1">
            <p className="text-[8px] font-medium text-foreground">Résidence Bellevue</p>
            <p className="text-[7px] text-secondary-foreground font-bold">78%</p>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-secondary to-accent rounded-full animate-pulse" style={{ width: "78%" }} />
          </div>
        </div>
        
        <div className="p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex justify-between items-center mb-1">
            <p className="text-[8px] font-medium text-foreground">Tour Horizon</p>
            <p className="text-[7px] text-primary font-bold">45%</p>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: "45%" }} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary">2.4M$</p>
          <p className="text-[6px] text-muted-foreground">Budget</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">18</p>
          <p className="text-[6px] text-muted-foreground">Équipe</p>
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
        <span className="text-[8px] font-semibold text-foreground">🛍️ Commandes récentes</span>
        <span className="text-[7px] bg-accent/20 text-accent px-1.5 rounded-full animate-pulse">+5 nouvelles</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-accent/10 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-[10px]">📦</div>
            <div>
              <p className="text-[8px] font-medium text-foreground">#2847 - 3 articles</p>
              <p className="text-[6px] text-muted-foreground">Il y a 5 min</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-accent">89$</p>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-[10px]">✓</div>
            <div>
              <p className="text-[8px] font-medium text-foreground">#2846 - Expédié</p>
              <p className="text-[6px] text-muted-foreground">Il y a 1h</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-primary">156$</p>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">847</p>
          <p className="text-[6px] text-muted-foreground">Ventes</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary">32k$</p>
          <p className="text-[6px] text-muted-foreground">CA</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">4.8⭐</p>
          <p className="text-[6px] text-muted-foreground">Avis</p>
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
        <span className="text-[8px] font-semibold text-foreground">⚡ Analytics</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full">Live</span>
      </div>
      
      {/* Mini graph avec couleurs branding */}
      <div className="h-10 flex items-end gap-0.5 bg-muted/50 rounded-lg p-1">
        {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
          <div 
            key={i}
            className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t animate-fade-in"
            style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-primary/10 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-primary">2.4k</p>
          <p className="text-[6px] text-muted-foreground">Users</p>
        </div>
        <div className="bg-secondary/20 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-secondary-foreground">+23%</p>
          <p className="text-[6px] text-muted-foreground">Growth</p>
        </div>
        <div className="bg-accent/10 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-accent">99.9%</p>
          <p className="text-[6px] text-muted-foreground">Uptime</p>
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
        <span className="text-[8px] font-semibold text-foreground">📚 Mes cours</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full">Semaine 12</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 p-1.5 bg-primary/10 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-[10px]">🎓</div>
          <div className="flex-1">
            <p className="text-[8px] font-medium text-foreground">Marketing Digital</p>
            <div className="h-1 bg-muted rounded-full mt-0.5">
              <div className="h-full bg-primary rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
          <span className="text-[7px] text-primary font-medium">85%</span>
        </div>
        
        <div className="flex items-center gap-1.5 p-1.5 bg-secondary/20 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="w-6 h-6 rounded bg-secondary/30 flex items-center justify-center text-[10px]">💡</div>
          <div className="flex-1">
            <p className="text-[8px] font-medium text-foreground">Entrepreneuriat</p>
            <div className="h-1 bg-muted rounded-full mt-0.5">
              <div className="h-full bg-secondary rounded-full" style={{ width: "62%" }} />
            </div>
          </div>
          <span className="text-[7px] text-secondary-foreground font-medium">62%</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 pt-1">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">12</p>
          <p className="text-[6px] text-muted-foreground">Cours</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">A+</p>
          <p className="text-[6px] text-muted-foreground">Moyenne</p>
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
        <span className="text-[8px] font-semibold text-foreground">💼 Clients actifs</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full">+3 ce mois</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="AB" variant="secondary" />
            <div>
              <p className="text-[8px] font-medium text-foreground">Agence Bloom</p>
              <p className="text-[6px] text-muted-foreground">Contrat annuel</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-secondary-foreground">1,200$/m</p>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <Avatar initials="TL" variant="primary" />
            <div>
              <p className="text-[8px] font-medium text-foreground">Tech Labs</p>
              <p className="text-[6px] text-muted-foreground">Projet en cours</p>
            </div>
          </div>
          <p className="text-[8px] font-bold text-primary">850$/m</p>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">18</p>
          <p className="text-[6px] text-muted-foreground">Clients</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary">24k$</p>
          <p className="text-[6px] text-muted-foreground">MRR</p>
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
        <span className="text-[8px] font-semibold text-foreground">📐 Projets design</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full">4 actifs</span>
      </div>
      
      {/* Mini blueprint */}
      <div className="h-12 bg-primary/5 rounded-lg p-1 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-4 h-full gap-px">
            {Array(32).fill(0).map((_, i) => (
              <div key={i} className="border border-primary/30" />
            ))}
          </div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 80 35">
          <rect x="10" y="10" width="25" height="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" className="animate-fade-in" />
          <rect x="45" y="5" width="30" height="25" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" className="animate-fade-in" style={{ animationDelay: "0.2s" }} />
          <line x1="35" y1="20" x2="45" y2="17" stroke="hsl(var(--secondary))" strokeWidth="1" strokeDasharray="2" />
        </svg>
      </div>
      
      <div className="flex justify-between">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">12</p>
          <p className="text-[6px] text-muted-foreground">Plans</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">3</p>
          <p className="text-[6px] text-muted-foreground">En révision</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary">8</p>
          <p className="text-[6px] text-muted-foreground">Approuvés</p>
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
        <span className="text-[8px] font-semibold text-foreground">🚚 Livraisons</span>
        <span className="text-[7px] bg-accent/20 text-accent px-1.5 rounded-full animate-pulse">En route</span>
      </div>
      
      {/* Mini map */}
      <div className="h-10 bg-gradient-to-b from-secondary/20 to-secondary/10 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 flex items-center px-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="flex-1 h-0.5 bg-muted mx-1 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 text-[10px] animate-bounce">🚛</div>
          </div>
          <div className="w-2 h-2 rounded-full bg-accent" />
        </div>
        <div className="absolute bottom-1 left-2 text-[6px] text-muted-foreground">A: Entrepôt</div>
        <div className="absolute bottom-1 right-2 text-[6px] text-muted-foreground">B: Client</div>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-secondary/20 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-secondary-foreground">24</p>
          <p className="text-[6px] text-muted-foreground">Livré</p>
        </div>
        <div className="bg-primary/10 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-primary">8</p>
          <p className="text-[6px] text-muted-foreground">En cours</p>
        </div>
        <div className="bg-accent/10 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-accent">98%</p>
          <p className="text-[6px] text-muted-foreground">À temps</p>
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
        <span className="text-[8px] font-semibold text-foreground">🎭 Événements</span>
        <span className="text-[7px] bg-accent/20 text-accent px-1.5 rounded-full">Ce soir</span>
      </div>
      
      <div className="p-1.5 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[8px] font-bold text-accent">Concert Jazz</p>
            <p className="text-[6px] text-muted-foreground">20h00 - Salle A</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-bold text-primary">248/300</p>
            <p className="text-[6px] text-muted-foreground">places</p>
          </div>
        </div>
        <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-primary rounded-full animate-pulse" style={{ width: "83%" }} />
        </div>
      </div>
      
      <div className="flex justify-between pt-1">
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">12</p>
          <p className="text-[6px] text-muted-foreground">Events</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">2.4k</p>
          <p className="text-[6px] text-muted-foreground">Billets</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary">48k$</p>
          <p className="text-[6px] text-muted-foreground">Ventes</p>
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
        <span className="text-[8px] font-semibold text-foreground">📦 Planning déménagements</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center justify-between p-1.5 bg-accent/10 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-[10px]">🏠</div>
            <div>
              <p className="text-[8px] font-medium text-foreground">Fam. Gagnon</p>
              <p className="text-[6px] text-muted-foreground">3½ → 5½</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-bold text-accent">Demain</p>
            <p className="text-[6px] text-muted-foreground">8h00</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-1.5 bg-muted/50 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-[10px]">🏢</div>
            <div>
              <p className="text-[8px] font-medium text-foreground">Bureau Tech Inc.</p>
              <p className="text-[6px] text-muted-foreground">Commercial</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[7px] font-bold text-primary">Samedi</p>
            <p className="text-[6px] text-muted-foreground">7h00</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">8</p>
          <p className="text-[6px] text-muted-foreground">Cette sem.</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">100%</p>
          <p className="text-[6px] text-muted-foreground">Confirmés</p>
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
        <span className="text-[8px] font-semibold text-foreground">🏡 Propriétés</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full">12 actives</span>
      </div>
      
      <div className="grid grid-cols-2 gap-1">
        <div className="p-1.5 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-[10px] font-bold text-primary">450k$</p>
          <p className="text-[6px] text-muted-foreground">Condo Centre-ville</p>
          <StatusBadge text="Nouveau" variant="new" />
        </div>
        <div className="p-1.5 bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-lg animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <p className="text-[10px] font-bold text-secondary-foreground">680k$</p>
          <p className="text-[6px] text-muted-foreground">Maison Outremont</p>
          <StatusBadge text="Offre" variant="warning" />
        </div>
      </div>
      
      <div className="flex justify-between pt-1 border-t border-border">
        <div className="text-center">
          <p className="text-[10px] font-bold text-primary">4.2M$</p>
          <p className="text-[6px] text-muted-foreground">Listings</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-accent">3</p>
          <p className="text-[6px] text-muted-foreground">Vendus/mois</p>
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
        <span className="text-[8px] font-semibold text-foreground">📊 Portefeuille</span>
        <span className="text-[7px] bg-primary/10 text-primary px-1.5 rounded-full animate-pulse">+2.4%</span>
      </div>
      
      {/* Mini chart */}
      <div className="h-10 flex items-end gap-0.5 bg-muted/50 rounded-lg p-1">
        {[30, 45, 35, 60, 50, 75, 65, 80, 70, 85].map((h, i) => (
          <div 
            key={i}
            className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t animate-fade-in"
            style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        <div className="bg-primary/10 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-primary">125k$</p>
          <p className="text-[6px] text-muted-foreground">Total</p>
        </div>
        <div className="bg-secondary/20 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-secondary-foreground">+8.5%</p>
          <p className="text-[6px] text-muted-foreground">YTD</p>
        </div>
        <div className="bg-accent/10 rounded p-1 text-center">
          <p className="text-[10px] font-bold text-accent">12</p>
          <p className="text-[6px] text-muted-foreground">Actifs</p>
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
