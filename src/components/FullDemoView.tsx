import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoConfig } from "./DemoGenerator";
import { ArrowLeft, Calendar, Share2, Users, BarChart3, Settings, FileText, DollarSign, Clock, CheckCircle2, TrendingUp, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ShowcaseWebsiteDemo } from "./ShowcaseWebsiteDemo";
import { EcommerceDemo } from "./EcommerceDemo";
import { BookingDemo } from "./BookingDemo";
import { AutoShowcaseDemo } from "./auto/AutoShowcaseDemo";
import { AutoPartsModernDemo } from "./auto/AutoPartsModernDemo";
import AutoPartsRusticDemo from "./auto/AutoPartsRusticDemo";

interface FullDemoViewProps {
  config: DemoConfig;
  onBack: () => void;
  hideBackButton?: boolean;
}

export const FullDemoView = ({ config, onBack, hideBackButton = false }: FullDemoViewProps) => {
  const { toast } = useToast();

  // Router vers la bonne démo selon le type de site web et l'industrie
  if (config.serviceType === "website") {
    const isAutoIndustry = config.industry === "auto" || config.industry === "pieces-auto";
    
    // Priorité au type de site web sélectionné
    if (config.websiteType === "ecommerce") {
      // Démo e-commerce spéciale pour l'automobile selon le thème
      if (isAutoIndustry) {
        if (config.theme === "rustique") {
          return <AutoPartsRusticDemo config={config} />;
        }
        if (config.theme === "moderne") {
          return <AutoPartsModernDemo config={config} />;
        }
      }
      return <EcommerceDemo config={config} onBack={onBack} />;
    }
    
    if (config.websiteType === "vitrine") {
      // Démo vitrine spéciale pour l'automobile
      if (isAutoIndustry) {
        return <AutoShowcaseDemo config={config} onBack={onBack} />;
      }
      return <ShowcaseWebsiteDemo config={config} onBack={onBack} />;
    }
    
    // Sinon, utiliser l'industrie comme fallback pour les sites organisationnels ou non spécifiés
    const bookingIndustries = ["sante", "consulting", "architecture", "evenementiel", "arts-scene"];
    
    if (bookingIndustries.includes(config.industry)) {
      return <BookingDemo config={config} onBack={onBack} />;
    }
    
    // Par défaut, afficher la démo vitrine
    return <ShowcaseWebsiteDemo config={config} onBack={onBack} />;
  }

  const generateIndustryContent = () => {
    const industryData: Record<string, { tagline: string; benefits: string[]; stats: { label: string; value: string }[] }> = {
      architecture: {
        tagline: "Concevez l'avenir avec précision et créativité",
        benefits: [
          "Gestion de projets architecturaux",
          "Plans et modélisations 3D",
          "Suivi des permis et conformité",
          "Collaboration avec entrepreneurs"
        ],
        stats: [
          { label: "Projets en Cours", value: "18" },
          { label: "Clients Satisfaits", value: "245" },
          { label: "Taux de Réussite", value: "96%" }
        ]
      },
      "arts-scene": {
        tagline: "Donnez vie à vos créations artistiques",
        benefits: [
          "Gestion des spectacles et événements",
          "Réservation et billetterie",
          "Coordination des artistes",
          "Promotion et marketing culturel"
        ],
        stats: [
          { label: "Spectacles", value: "87" },
          { label: "Artistes", value: "156" },
          { label: "Audience", value: "12.5k" }
        ]
      },
      construction: {
        tagline: "Gérez vos chantiers avec efficacité et transparence",
        benefits: [
          "Suivi des projets en temps réel",
          "Gestion des sous-traitants",
          "Contrôle des coûts et budgets",
          "Documentation de chantier centralisée"
        ],
        stats: [
          { label: "Projets Actifs", value: "24" },
          { label: "Équipes", value: "12" },
          { label: "Taux de Complétion", value: "94%" }
        ]
      },
      consulting: {
        tagline: "Expertise stratégique pour transformer votre entreprise",
        benefits: [
          "Gestion des missions clients",
          "Suivi du temps et facturation",
          "Livrables et rapports",
          "Base de connaissances"
        ],
        stats: [
          { label: "Clients", value: "67" },
          { label: "Missions", value: "134" },
          { label: "Satisfaction", value: "97%" }
        ]
      },
      "services-pro": {
        tagline: "Optimisez votre pratique professionnelle",
        benefits: [
          "Gestion des dossiers clients",
          "Facturation automatisée",
          "Calendrier de rendez-vous",
          "Suivi du temps facturable"
        ],
        stats: [
          { label: "Clients Actifs", value: "156" },
          { label: "Heures Facturées", value: "1,240" },
          { label: "Revenus ce Mois", value: "$45k" }
        ]
      },
      sante: {
        tagline: "Soins de santé modernes et centrés sur le patient",
        benefits: [
          "Dossiers patients sécurisés",
          "Prises de rendez-vous en ligne",
          "Rappels automatiques",
          "Téléconsultation intégrée"
        ],
        stats: [
          { label: "Patients", value: "892" },
          { label: "RDV ce Mois", value: "234" },
          { label: "Satisfaction", value: "98%" }
        ]
      },
      commerce: {
        tagline: "Vendez plus, gérez mieux votre boutique en ligne",
        benefits: [
          "Catalogue produits dynamique",
          "Gestion des stocks en temps réel",
          "Paiements en ligne sécurisés",
          "Analytics de ventes détaillés"
        ],
        stats: [
          { label: "Produits", value: "1,250" },
          { label: "Commandes", value: "456" },
          { label: "Ventes ce Mois", value: "$78k" }
        ]
      },
      technologie: {
        tagline: "Innovation numérique pour entreprises modernes",
        benefits: [
          "Gestion de projets agile",
          "Collaboration d'équipe",
          "Suivi des tickets et bugs",
          "Déploiement continu"
        ],
        stats: [
          { label: "Projets", value: "18" },
          { label: "Développeurs", value: "32" },
          { label: "Déploiements", value: "124" }
        ]
      },
      education: {
        tagline: "Transformez l'apprentissage avec le numérique",
        benefits: [
          "Gestion des cours et étudiants",
          "Contenu pédagogique en ligne",
          "Évaluations automatisées",
          "Suivi des progrès"
        ],
        stats: [
          { label: "Étudiants", value: "2,340" },
          { label: "Cours Actifs", value: "45" },
          { label: "Taux de Réussite", value: "91%" }
        ]
      },
      evenementiel: {
        tagline: "Créez des événements mémorables sans stress",
        benefits: [
          "Planification et coordination",
          "Gestion des invitations et RSVP",
          "Suivi des fournisseurs",
          "Budget et facturation événementielle"
        ],
        stats: [
          { label: "Événements", value: "145" },
          { label: "Participants", value: "8,900" },
          { label: "Satisfaction", value: "95%" }
        ]
      },
      finances: {
        tagline: "Maîtrisez vos finances avec intelligence",
        benefits: [
          "Gestion de portefeuilles clients",
          "Analyse financière avancée",
          "Rapports réglementaires",
          "Conseil personnalisé"
        ],
        stats: [
          { label: "Clients", value: "423" },
          { label: "Actifs Gérés", value: "$12.5M" },
          { label: "ROI Moyen", value: "8.7%" }
        ]
      },
      restauration: {
        tagline: "Gestion moderne pour restaurateurs",
        benefits: [
          "Réservations en ligne",
          "Gestion des menus",
          "Commandes et livraisons",
          "Programmes de fidélité"
        ],
        stats: [
          { label: "Réservations", value: "156" },
          { label: "Clients Fidèles", value: "890" },
          { label: "Note Moyenne", value: "4.8/5" }
        ]
      },
      immobilier: {
        tagline: "Simplifiez la gestion immobilière",
        benefits: [
          "Portefeuille de propriétés",
          "Gestion des visites",
          "Suivi des transactions",
          "Documents et signatures"
        ],
        stats: [
          { label: "Propriétés", value: "234" },
          { label: "Visites ce Mois", value: "89" },
          { label: "Transactions", value: "12" }
        ]
      },
      transports: {
        tagline: "Optimisez votre logistique et vos livraisons",
        benefits: [
          "Gestion de flotte en temps réel",
          "Planification des itinéraires",
          "Suivi des livraisons",
          "Maintenance préventive"
        ],
        stats: [
          { label: "Véhicules", value: "56" },
          { label: "Livraisons/Mois", value: "3,240" },
          { label: "Efficacité", value: "92%" }
        ]
      },
      "pieces-auto": {
        tagline: "Gérez votre inventaire automobile avec précision",
        benefits: [
          "Catalogue de pièces complet",
          "Gestion des stocks multi-dépôts",
          "Commandes fournisseurs automatisées",
          "Compatibilité véhicules"
        ],
        stats: [
          { label: "Références", value: "8,450" },
          { label: "Commandes/Mois", value: "567" },
          { label: "Taux de Stock", value: "97%" }
        ]
      }
    };

    return industryData[config.industry] || industryData["services-pro"];
  };

  const generateChallengeContent = () => {
    const objectiveData: Record<string, { recommendation: string; priority: string; impact: string }> = {
      "reduce-costs": {
        recommendation: "Automatisation et optimisation des ressources",
        priority: "Haute",
        impact: "Réduction de 20-30% des coûts opérationnels"
      },
      "save-time": {
        recommendation: "Workflows automatisés et intégrations API",
        priority: "Haute",
        impact: "Économie de 15-20 heures/semaine par employé"
      },
      "increase-revenue": {
        recommendation: "CRM avancé et analytics de conversion",
        priority: "Critique",
        impact: "Augmentation de 30-40% des conversions"
      },
      "improve-quality": {
        recommendation: "Système de feedback et suivi qualité",
        priority: "Haute",
        impact: "Amélioration de 35% de la satisfaction client"
      },
      "scale-business": {
        recommendation: "Infrastructure évolutive et processus scalables",
        priority: "Critique",
        impact: "Capacité de croissance de 200-300%"
      },
      "centralize-data": {
        recommendation: "Base de données unifiée et dashboards",
        priority: "Haute",
        impact: "Accès instantané à 100% des données"
      },
      "improve-communication": {
        recommendation: "Outils collaboratifs et notifications en temps réel",
        priority: "Importante",
        impact: "Gain de 40% d'efficacité dans les échanges"
      },
      "modernize": {
        recommendation: "Design moderne et expérience utilisateur optimale",
        priority: "Importante",
        impact: "Augmentation de 50% de l'engagement"
      }
    };
    // Utiliser le premier objectif comme principal
    return objectiveData[config.mainObjectives[0]] || objectiveData["save-time"];
  };

  const generateSizeContent = () => {
    const sizeData: Record<string, { userSeats: string; storage: string; support: string }> = {
      solo: { userSeats: "1 utilisateur", storage: "10 GB", support: "Email" },
      petite: { userSeats: "Jusqu'à 10 utilisateurs", storage: "50 GB", support: "Email + Chat" },
      moyenne: { userSeats: "Jusqu'à 50 utilisateurs", storage: "200 GB", support: "Prioritaire + Téléphone" },
      grande: { userSeats: "Illimité", storage: "1 TB+", support: "Dédié + Formation" }
    };
    return sizeData[config.companySize] || sizeData.petite;
  };

  const generateTimelineContent = () => {
    const timelineData: Record<string, { phase1: string; phase2: string; phase3: string }> = {
      urgent: {
        phase1: "Configuration (2-3 jours)",
        phase2: "Formation express (1 jour)",
        phase3: "Go-live (1 semaine)"
      },
      court: {
        phase1: "Analyse & Setup (1 semaine)",
        phase2: "Configuration & Formation (2 semaines)",
        phase3: "Déploiement (1 semaine)"
      },
      moyen: {
        phase1: "Analyse approfondie (3 semaines)",
        phase2: "Personnalisation (5 semaines)",
        phase3: "Déploiement & Support (2 semaines)"
      },
      long: {
        phase1: "Stratégie & Design (1 mois)",
        phase2: "Développement sur mesure (2 mois)",
        phase3: "Tests & Déploiement (1 mois)"
      }
    };
    return timelineData[config.timeline] || timelineData.moyen;
  };

  const industryContent = generateIndustryContent();
  const challengeContent = generateChallengeContent();
  const sizeContent = generateSizeContent();
  const timelineContent = generateTimelineContent();

  const getServiceTitle = () => {
    switch (config.serviceType) {
      case "portal":
        return "Portail d'Entreprise Complet";
      case "website":
        // Vérifier le sous-type de site web dans les features
        if (config.features.includes("vitrine")) {
          return "Site Vitrine Professionnel";
        } else if (config.features.includes("ecommerce")) {
          return "Boutique E-commerce";
        } else if (config.features.includes("careers")) {
          return "Portail Carrières et Recrutement";
        } else if (config.features.includes("booking")) {
          return "Système de Réservation en Ligne";
        }
        return "Solution Web Professionnelle";
      case "module":
        // Vérifier le sous-type de module dans les features
        if (config.features.includes("calculator")) {
          return "Calculatrice de Soumissions";
        } else if (config.features.includes("project-manager")) {
          return "Gestionnaire de Projets";
        } else if (config.features.includes("hr-dashboard")) {
          return "Tableau de Bord RH";
        } else if (config.features.includes("it-support")) {
          return "Centre de Support TI";
        }
        return "Module Digital Avancé";
      default:
        return "Solution Digitale";
    }
  };

  const handleExport = () => {
    toast({
      title: "Appel découverte",
      description: "Nous vous contacterons dans les 24h pour planifier votre appel découverte",
    });
  };

  const handleShare = () => {
    toast({
      title: "Lien de partage créé",
      description: "Le lien a été copié dans votre presse-papiers",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header avec actions */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {!hideBackButton && (
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au configurateur
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>
              <Button onClick={handleExport}>
                <Calendar className="w-4 h-4 mr-2" />
                Appel Découverte
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="w-16 h-16 object-contain" />
            ) : (
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center font-bold text-2xl text-white shadow-elegant"
                style={{ backgroundColor: config.primaryColor }}
              >
                {config.companyName.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <h1 className="text-4xl font-bold">{config.companyName}</h1>
              <p className="text-muted-foreground text-lg">{getServiceTitle()}</p>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {industryContent.tagline}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {sizeContent.userSeats}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              Défi: {challengeContent.recommendation}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1" style={{ borderColor: config.accentColor, color: config.accentColor }}>
              Timeline: {config.timeline}
            </Badge>
          </div>
        </div>

        {/* Key Recommendation Card */}
        <Card className="mb-8 p-6 shadow-elegant" style={{ borderColor: config.primaryColor, borderWidth: 2 }}>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Recommandation Principale</p>
              <p className="font-bold text-lg">{challengeContent.recommendation}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Priorité</p>
              <Badge style={{ backgroundColor: config.accentColor, color: "white" }}>
                {challengeContent.priority}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Impact Estimé</p>
              <p className="font-bold" style={{ color: config.primaryColor }}>{challengeContent.impact}</p>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {industryContent.stats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-elegant animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold" style={{ color: config.primaryColor }}>
                    {stat.value}
                  </p>
                </div>
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: config.primaryColor + "15" }}
                >
                  <TrendingUp style={{ color: config.primaryColor }} className="w-6 h-6" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Demo Interface */}
        <Card className="shadow-elegant mb-12">
          {/* Navigation Bar */}
          <div className="border-b px-6 py-4" style={{ borderColor: config.primaryColor + "20" }}>
            <div className="flex items-center gap-6 overflow-x-auto">
              <Button
                variant="ghost"
                size="sm"
                style={{ color: config.primaryColor }}
                className="flex items-center gap-2 font-semibold"
              >
                <BarChart3 className="w-4 h-4" />
                Tableau de bord
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Clients
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Projets
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Calendrier
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Paramètres
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Activités Récentes</h2>
                  <div className="space-y-3">
                    {[
                      { icon: CheckCircle2, text: "Nouveau projet créé: Rénovation bureau", time: "Il y a 2h", color: config.primaryColor },
                      { icon: Users, text: "3 nouveaux clients ajoutés", time: "Il y a 5h", color: config.accentColor },
                      { icon: DollarSign, text: "Facture #1234 payée", time: "Hier", color: config.secondaryColor },
                      { icon: Clock, text: "Réunion planifiée pour demain", time: "Hier", color: config.primaryColor },
                    ].map((activity, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: activity.color + "15" }}
                          >
                            <activity.icon style={{ color: activity.color }} className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{activity.text}</p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">Fonctionnalités Principales</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {industryContent.benefits.map((benefit, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 style={{ color: config.primaryColor }} className="w-5 h-5 mt-0.5 flex-shrink-0" />
                          <p className="font-medium">{benefit}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card className="p-4" style={{ borderColor: config.primaryColor + "30", borderWidth: 2 }}>
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Calendar style={{ color: config.primaryColor }} className="w-5 h-5" />
                    Prochains Rendez-vous
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "Réunion client", time: "14:00" },
                      { title: "Appel de suivi", time: "16:30" },
                      { title: "Présentation projet", time: "Demain 10:00" },
                    ].map((event, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="font-medium">{event.title}</span>
                        <Badge variant="outline" style={{ borderColor: config.primaryColor }}>
                          {event.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-4" style={{ backgroundColor: config.primaryColor + "08" }}>
                  <h3 className="font-bold mb-3">Configuration Recommandée</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Utilisateurs</span>
                      <Badge variant="outline">{sizeContent.userSeats}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Stockage</span>
                      <Badge variant="outline">{sizeContent.storage}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Support</span>
                      <Badge variant="outline">{sizeContent.support}</Badge>
                    </div>
                  </div>
                </Card>

                <Card className="p-4" style={{ borderColor: config.secondaryColor + "50", borderWidth: 2 }}>
                  <h3 className="font-bold mb-3">Plan d'Implémentation</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Phase 1</span>
                        <Badge variant="outline" style={{ borderColor: config.primaryColor }}>En cours</Badge>
                      </div>
                      <p className="text-muted-foreground text-xs">{timelineContent.phase1}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Phase 2</span>
                      </div>
                      <p className="text-muted-foreground text-xs">{timelineContent.phase2}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Phase 3</span>
                      </div>
                      <p className="text-muted-foreground text-xs">{timelineContent.phase3}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="p-8 text-center shadow-elegant" style={{ background: `linear-gradient(135deg, ${config.primaryColor}15, ${config.accentColor}15)` }}>
          <h2 className="text-3xl font-bold mb-4">Prêt à démarrer votre transformation digitale ?</h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Cette démo personnalisée montre comment notre solution s'adapte parfaitement à vos besoins. 
            Contactez-nous pour une démonstration complète et un devis sur mesure.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="font-semibold"
              style={{ backgroundColor: config.primaryColor, color: "white" }}
            >
              Demander une Soumission
            </Button>
            <Button size="lg" variant="outline">
              Planifier une Démo Live
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
