import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INDUSTRIES } from "@/types/questionnaire";
import { Building2, Lightbulb, Calendar, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Section1Props {
  data: any;
  onChange: (updates: any) => void;
}

// Objectifs par industrie - alignés avec tous les produits offerts
const INDUSTRY_OBJECTIVES: Record<string, string[]> = {
  auto: [
    "Vendre des pièces en ligne 24/7 (e-commerce)",
    "Faciliter la recherche de pièces par compatibilité véhicule",
    "Gérer l'inventaire et les stocks en temps réel",
    "Créer un portail pour les garages partenaires (B2B)",
    "Automatiser les devis et la facturation",
    "Offrir un système de suivi de commandes aux clients",
    "Gérer mon équipe et le pointage des heures",
  ],
  restauration: [
    "Permettre les réservations en ligne (site web)",
    "Accepter les commandes en ligne (livraison/emporter)",
    "Créer un programme de fidélité client",
    "Gérer les horaires et plannings des employés (portail RH)",
    "Automatiser les rappels et confirmations",
    "Présenter le menu de façon attrayante",
    "Gérer les stocks et fournisseurs",
  ],
  commerce: [
    "Créer une boutique en ligne (e-commerce)",
    "Synchroniser les stocks magasin/en ligne",
    "Mettre en place un programme de fidélité",
    "Gérer les promotions et soldes facilement",
    "Créer un CRM pour suivre les clients",
    "Automatiser les relances et le marketing",
    "Offrir un portail employés pour les plannings",
  ],
  sante: [
    "Permettre la prise de rendez-vous en ligne",
    "Créer un portail patient sécurisé",
    "Gérer les dossiers et la conformité (LPRPDE)",
    "Automatiser les rappels de rendez-vous",
    "Gérer les horaires des praticiens (calendrier partagé)",
    "Partager des documents de façon sécurisée",
    "Créer une base de connaissances pour les patients",
  ],
  construction: [
    "Présenter les projets réalisés (site vitrine/portfolio)",
    "Générer des demandes de soumission en ligne",
    "Créer un portail client pour suivre les chantiers",
    "Gérer les projets, tâches et échéanciers",
    "Coordonner les équipes et sous-traitants (portail employés)",
    "Suivre le pointage de temps par projet",
    "Automatiser les devis et factures",
  ],
  education: [
    "Créer un portail étudiant complet",
    "Gérer les inscriptions et paiements en ligne",
    "Offrir des cours ou formations en ligne",
    "Suivre la progression et les notes des étudiants",
    "Créer une base de connaissances/ressources",
    "Communiquer avec parents et étudiants (notifications)",
    "Gérer le personnel et les plannings (portail RH)",
  ],
  obnl: [
    "Créer un site web professionnel (vitrine)",
    "Collecter des dons en ligne (paiements sécurisés)",
    "Gérer les bénévoles et membres (portail)",
    "Promouvoir et vendre des billets d'événements",
    "Communiquer via infolettres et notifications",
    "Publier des rapports et nouvelles (blog)",
    "Gérer les documents et rapports internes",
  ],
  services: [
    "Créer un site web professionnel (vitrine)",
    "Permettre la prise de rendez-vous en ligne",
    "Mettre en place un CRM pour gérer les prospects",
    "Automatiser les devis et la facturation",
    "Créer un portail client pour le suivi des dossiers",
    "Gérer les projets et tâches de l'équipe",
    "Automatiser les suivis et relances",
  ],
  architecture: [
    "Créer un site portfolio impressionnant (vitrine)",
    "Générer des demandes de consultation en ligne",
    "Créer un portail client pour partager les plans",
    "Gérer les projets et échéanciers",
    "Partager des documents de façon sécurisée",
    "Suivre le temps passé par projet",
    "Automatiser les devis et contrats",
  ],
  tech: [
    "Créer un site web avec documentation (organisationnel)",
    "Permettre les démos ou essais gratuits en ligne",
    "Intégrer un système de tickets support",
    "Créer un portail client avec suivi des demandes",
    "Offrir une base de connaissances technique",
    "Gérer les projets et développements (gestion de projets)",
    "Automatiser l'onboarding des nouveaux clients",
  ],
  transport: [
    "Permettre les demandes de transport en ligne",
    "Créer un calculateur de tarifs automatisé",
    "Offrir un suivi de livraison en temps réel (portail client)",
    "Gérer la flotte et les chauffeurs (portail employés)",
    "Suivre le pointage et les heures de conduite",
    "Automatiser la facturation et les devis",
    "Optimiser les itinéraires et plannings",
  ],
  "arts-scene": [
    "Vendre des billets en ligne (billetterie)",
    "Créer un site web attrayant pour les spectacles",
    "Gérer les abonnements de saison",
    "Créer un portail artistes/collaborateurs",
    "Promouvoir les événements (infolettres)",
    "Gérer les bénévoles et équipes techniques",
    "Partager photos et vidéos des performances",
  ],
  demenagement: [
    "Créer un site web avec formulaire de soumission",
    "Offrir un calculateur de coûts en ligne",
    "Gérer le calendrier des déménagements",
    "Créer un portail client pour le suivi",
    "Coordonner les équipes et camions (portail employés)",
    "Suivre le pointage de temps par projet",
    "Automatiser les devis et factures",
  ],
  immobilier: [
    "Créer un site web avec listings de propriétés",
    "Permettre les visites virtuelles en ligne",
    "Mettre en place un CRM pour gérer les prospects",
    "Créer un portail client acheteur/vendeur",
    "Offrir un calculateur d'estimation de valeur",
    "Automatiser les rappels et suivis",
    "Gérer les documents et contrats (signatures)",
  ],
  finances: [
    "Créer un portail client ultra-sécurisé",
    "Permettre le partage de documents confidentiels",
    "Automatiser les rappels d'échéances",
    "Générer des rapports financiers automatisés",
    "Mettre en place un CRM pour le suivi client",
    "Gérer la conformité réglementaire (journal d'activité)",
    "Offrir la prise de rendez-vous en ligne",
  ],
};

const DEFAULT_OBJECTIVES = [
  "Créer un site web professionnel (vitrine ou e-commerce)",
  "Mettre en place un portail client ou employés",
  "Automatiser des processus manuels (devis, factures, rappels)",
  "Gérer les projets et tâches de l'équipe",
  "Améliorer le suivi client avec un CRM",
  "Moderniser l'image de l'entreprise",
  "Réduire les coûts opérationnels",
];

const START_DATES = [
  { value: "3-jours", label: "3 jours ouvrables", icon: "⚡", description: "Démarrage express" },
  { value: "2-4-semaines", label: "2-4 semaines", icon: "📅", description: "Délai standard" },
  { value: "1-2-mois", label: "1-2 mois", icon: "🗓️", description: "Planification à venir" },
  { value: "plus-tard", label: "Plus tard", icon: "⏳", description: "Pas pressé" },
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

    </div>
  );
};
