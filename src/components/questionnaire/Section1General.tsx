import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { INDUSTRIES } from "@/types/questionnaire";
import { Building2, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
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

// Objectifs par défaut
const DEFAULT_OBJECTIVES = ["Augmenter les ventes ou conversions", "Améliorer la visibilité en ligne", "Automatiser des processus manuels", "Offrir une meilleure expérience client", "Moderniser l'image de l'entreprise", "Réduire les coûts opérationnels"];
export const Section1General = ({
  data,
  onChange
}: Section1Props) => {
  const objectives = data.industry && INDUSTRY_OBJECTIVES[data.industry] ? INDUSTRY_OBJECTIVES[data.industry] : DEFAULT_OBJECTIVES;
  const toggleObjective = (objective: string) => {
    const current = data.mainObjectives || [];
    const updated = current.includes(objective) ? current.filter((o: string) => o !== objective) : [...current, objective];
    onChange({
      mainObjectives: updated
    });
  };

  // Reset objectives when industry changes
  const handleIndustryChange = (value: string) => {
    onChange({
      industry: value,
      mainObjectives: [] // Reset objectives when industry changes
    });
  };
  return <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Informations générales
        </h3>
        <p className="text-sm text-muted-foreground">
          Parlez-nous de votre entreprise et de vos besoins
        </p>
      </div>

      {/* Nom de l'entreprise */}
      <div className="space-y-2">
        <Label htmlFor="company-name">Nom de l'entreprise *</Label>
        <Input id="company-name" value={data.companyName || ""} onChange={e => onChange({
        companyName: e.target.value
      })} placeholder="Ex: Solutions Innovantes Inc." />
      </div>

      {/* Industrie */}
      <div className="space-y-2">
        <Label htmlFor="industry">Industrie *</Label>
        <Select value={data.industry || ""} onValueChange={handleIndustryChange}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Sélectionnez votre industrie" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map(ind => <SelectItem key={ind.value} value={ind.value}>
                {ind.label}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Objectifs principaux - Adaptés à l'industrie */}
      {data.industry && <Card className="p-4 space-y-3 bg-primary/5 border-primary/20">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <Label className="font-semibold">
              Objectifs pour votre {INDUSTRIES.find(i => i.value === data.industry)?.label.toLowerCase() || 'entreprise'}
            </Label>
            <Badge variant="secondary" className="text-xs">Personnalisé</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Sélectionnez tous les objectifs qui correspondent à vos besoins
          </p>
          <div className="space-y-2">
            {objectives.map(objective => <div key={objective} className="flex items-center space-x-2">
                <Checkbox id={objective} checked={(data.mainObjectives || []).includes(objective)} onCheckedChange={() => toggleObjective(objective)} />
                <label htmlFor={objective} className="text-sm cursor-pointer">
                  {objective}
                </label>
              </div>)}
          </div>
        </Card>}

      {/* Date de début */}
      <div className="space-y-2">
        <Label>Date de début souhaitée *</Label>
        <RadioGroup value={data.startDate || ""} onValueChange={value => onChange({
        startDate: value
      })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3-jours" id="3-jours" />
            <label htmlFor="3-jours" className="text-sm cursor-pointer">
              3 jours ouvrables
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2-4-semaines" id="2-4-semaines" />
            <label htmlFor="2-4-semaines" className="text-sm cursor-pointer">
              2-4 semaines
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-2-mois" id="1-2-mois" />
            <label htmlFor="1-2-mois" className="text-sm cursor-pointer">
              1-2 mois
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="plus-tard" id="plus-tard" />
            <label htmlFor="plus-tard" className="text-sm cursor-pointer">
              Plus tard (pas pressé)
            </label>
          </div>
        </RadioGroup>
      </div>

      {/* Financement */}
      <div className="space-y-2">
        <Label>Avez-vous un financement en place ? *</Label>
        <RadioGroup value={data.financing || ""} onValueChange={value => onChange({
        financing: value
      })}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oui" id="fin-oui" />
            <label htmlFor="fin-oui" className="text-sm cursor-pointer">
              Oui
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non" id="fin-non" />
            <label htmlFor="fin-non" className="text-sm cursor-pointer">
              Non
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="peut-etre" id="fin-peut-etre" />
            <label htmlFor="fin-peut-etre" className="text-sm cursor-pointer">
              Peut-être
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>;
};