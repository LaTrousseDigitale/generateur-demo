import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INDUSTRIES } from "@/types/questionnaire";
import { Building2, Lightbulb, Calendar, Wallet, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Section1Props {
  data: any;
  onChange: (updates: any) => void;
}

// Objectifs par industrie
const INDUSTRY_OBJECTIVES: Record<string, string[]> = {
  auto: ["Vendre des pièces en ligne 24/7", "Faciliter la recherche de pièces par compatibilité", "Attirer plus de clients (particuliers ou garages)", "Gérer l'inventaire efficacement", "Afficher les prix et disponibilités en temps réel"],
  restauration: ["Augmenter les réservations en ligne", "Permettre les commandes en ligne (livraison/emporter)", "Présenter le menu de façon attrayante", "Fidéliser la clientèle", "Réduire les appels téléphoniques"],
  commerce: ["Vendre en ligne 24/7", "Synchroniser les stocks magasin/en ligne", "Augmenter le panier moyen", "Fidéliser les clients avec un programme de points", "Gérer les promotions et soldes facilement"],
  sante: ["Permettre la prise de rendez-vous en ligne", "Offrir un portail patient sécurisé", "Envoyer des rappels automatiques", "Gérer les dossiers patients (conformité)", "Proposer la téléconsultation"],
  construction: ["Présenter les projets réalisés (portfolio)", "Générer des demandes de soumission", "Gérer les projets et chantiers", "Communiquer avec les clients sur l'avancement", "Gérer les sous-traitants"],
  education: ["Créer un portail étudiant", "Gérer les inscriptions en ligne", "Offrir des cours ou formations en ligne", "Suivre la progression des étudiants", "Communiquer avec parents et étudiants"],
  obnl: ["Collecter des dons en ligne", "Gérer les bénévoles", "Promouvoir les événements", "Communiquer avec les membres", "Publier des rapports et nouvelles"],
  services: ["Générer des prospects qualifiés", "Présenter les services de façon professionnelle", "Permettre les prises de rendez-vous", "Automatiser les suivis clients", "Afficher les témoignages clients"],
  architecture: ["Mettre en valeur le portfolio de projets", "Présenter l'équipe et l'expertise", "Générer des demandes de consultation", "Partager des études de cas détaillées", "Montrer le processus de travail"],
  tech: ["Générer des prospects B2B", "Présenter les solutions/produits tech", "Offrir une documentation en ligne", "Permettre les démos ou essais gratuits", "Intégrer un système de tickets support"],
  transport: ["Permettre les réservations/demandes de transport", "Afficher les tarifs et zones desservies", "Suivre les livraisons en temps réel", "Gérer la flotte de véhicules", "Optimiser les itinéraires"],
  "arts-scene": ["Vendre des billets en ligne", "Présenter les spectacles et artistes", "Gérer les abonnements de saison", "Promouvoir les événements à venir", "Partager photos et vidéos des performances"],
  demenagement: ["Permettre les demandes de soumission en ligne", "Calculer les coûts selon distance et volume", "Gérer le calendrier des déménagements", "Offrir des services additionnels (emballage, stockage)", "Suivre les projets et équipes en temps réel"],
  immobilier: ["Afficher les propriétés avec visites virtuelles", "Générer des prospects acheteurs/vendeurs", "Permettre la prise de rendez-vous de visite", "Gérer le pipeline de ventes", "Calculer les estimations de valeur"],
  finances: ["Offrir un portail client sécurisé", "Permettre le partage de documents confidentiels", "Automatiser les rappels et échéances", "Générer des rapports financiers", "Gérer la conformité réglementaire"],
};

const DEFAULT_OBJECTIVES = ["Augmenter les ventes ou conversions", "Améliorer la visibilité en ligne", "Automatiser des processus manuels", "Offrir une meilleure expérience client", "Moderniser l'image de l'entreprise", "Réduire les coûts opérationnels"];

const START_DATES = [
  { value: "3-jours", label: "3 jours ouvrables", icon: "⚡", description: "Démarrage express" },
  { value: "2-4-semaines", label: "2-4 semaines", icon: "📅", description: "Délai standard" },
  { value: "1-2-mois", label: "1-2 mois", icon: "🗓️", description: "Planification à venir" },
  { value: "plus-tard", label: "Plus tard", icon: "⏳", description: "Pas pressé" },
];

const FINANCING_OPTIONS = [
  { value: "oui", label: "Oui", icon: "✅", color: "bg-green-500/10 border-green-500/30 hover:border-green-500" },
  { value: "non", label: "Non", icon: "❌", color: "bg-red-500/10 border-red-500/30 hover:border-red-500" },
  { value: "peut-etre", label: "Peut-être", icon: "🤔", color: "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500" },
];

export const Section1General = ({ data, onChange }: Section1Props) => {
  const objectives = data.industry && INDUSTRY_OBJECTIVES[data.industry] 
    ? INDUSTRY_OBJECTIVES[data.industry] 
    : DEFAULT_OBJECTIVES;

  const toggleObjective = (objective: string) => {
    const current = data.mainObjectives || [];
    const updated = current.includes(objective) 
      ? current.filter((o: string) => o !== objective) 
      : [...current, objective];
    onChange({ mainObjectives: updated });
  };

  const handleIndustryChange = (value: string) => {
    onChange({
      industry: value,
      mainObjectives: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center pb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-1">Informations générales</h3>
        <p className="text-sm text-muted-foreground">
          Parlez-nous de votre entreprise et de vos besoins
        </p>
      </div>

      {/* Company Name - Enhanced Input */}
      <div className="space-y-2">
        <Label htmlFor="company-name" className="text-sm font-medium">
          Nom de l'entreprise <span className="text-destructive">*</span>
        </Label>
        <div className="relative group">
          <Input 
            id="company-name" 
            value={data.companyName || ""} 
            onChange={e => onChange({ companyName: e.target.value })} 
            placeholder="Ex: Solutions Innovantes Inc."
            className="h-12 pl-4 pr-10 text-base transition-all duration-300 border-2 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {data.companyName && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Industry - Enhanced Select */}
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium">
          Industrie <span className="text-destructive">*</span>
        </Label>
        <Select value={data.industry || ""} onValueChange={handleIndustryChange}>
          <SelectTrigger 
            id="industry" 
            className="h-12 text-base border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
          >
            <SelectValue placeholder="Sélectionnez votre industrie" />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {INDUSTRIES.map(ind => (
              <SelectItem 
                key={ind.value} 
                value={ind.value}
                className="py-3 cursor-pointer"
              >
                {ind.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Objectives - Interactive Cards */}
      {data.industry && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <Label className="font-semibold text-sm">Vos objectifs</Label>
            <Badge className="bg-primary/10 text-primary border-0 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Personnalisé
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Cliquez pour sélectionner vos objectifs prioritaires
          </p>
          <div className="grid gap-2">
            {objectives.map((objective, index) => {
              const isSelected = (data.mainObjectives || []).includes(objective);
              return (
                <button
                  key={objective}
                  type="button"
                  onClick={() => toggleObjective(objective)}
                  className={`group relative flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 animate-fade-in ${
                    isSelected 
                      ? "bg-primary text-white shadow-lg scale-[1.02]" 
                      : "bg-muted/50 hover:bg-muted hover:scale-[1.01] border border-transparent hover:border-primary/20"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? "bg-white/20" 
                      : "bg-primary/10 group-hover:bg-primary/20"
                  }`}>
                    {isSelected ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{objective}</span>
                </button>
              );
            })}
          </div>
          {(data.mainObjectives || []).length > 0 && (
            <p className="text-xs text-primary font-medium animate-fade-in">
              ✓ {(data.mainObjectives || []).length} objectif(s) sélectionné(s)
            </p>
          )}
        </div>
      )}

      {/* Start Date - Card Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <Label className="font-semibold text-sm">
            Date de début souhaitée <span className="text-destructive">*</span>
          </Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {START_DATES.map((option, index) => {
            const isSelected = data.startDate === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ startDate: option.value })}
                className={`relative p-3 rounded-xl text-left transition-all duration-300 animate-fade-in ${
                  isSelected 
                    ? "bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2" 
                    : "bg-muted/50 hover:bg-muted border-2 border-transparent hover:border-primary/30"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-lg mb-1">{option.icon}</div>
                <div className="font-medium text-sm">{option.label}</div>
                <div className={`text-xs ${isSelected ? "text-white/80" : "text-muted-foreground"}`}>
                  {option.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Financing - Pill Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          <Label className="font-semibold text-sm">
            Avez-vous un financement en place ? <span className="text-destructive">*</span>
          </Label>
        </div>
        <div className="flex gap-2">
          {FINANCING_OPTIONS.map((option) => {
            const isSelected = data.financing === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange({ financing: option.value })}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm transition-all duration-300 border-2 ${
                  isSelected 
                    ? "bg-primary text-white border-primary shadow-lg scale-105" 
                    : option.color
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
