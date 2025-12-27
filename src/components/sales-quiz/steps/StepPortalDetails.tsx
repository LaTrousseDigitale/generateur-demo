import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { 
  Lock, Check, Users, Briefcase, UserCog, Settings, 
  FileText, Calendar, Clock, MessageSquare, Bell,
  FolderOpen, Award, UserPlus, ClipboardList, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// ============ PORTAIL CLIENT ============
const CLIENT_FEATURES = [
  { id: "consultation-docs", label: "Consultation de documents", icon: FolderOpen, essential: true },
  { id: "factures-paiements", label: "Factures et paiements en ligne", icon: CreditCard },
  { id: "historique", label: "Historique des transactions", icon: ClipboardList },
  { id: "signatures", label: "Signatures électroniques", icon: FileText },
  { id: "formulaires", label: "Formulaires personnalisés", icon: FileText },
  { id: "notifications-client", label: "Notifications automatiques", icon: Bell },
  { id: "messagerie-securisee", label: "Messagerie sécurisée", icon: MessageSquare },
  { id: "suivi-projets", label: "Suivi de projets/commandes", icon: ClipboardList },
];

// ============ PORTAIL EMPLOYÉS ============
const EMPLOYEE_FEATURES = [
  { id: "feuilles-temps", label: "Feuilles de temps", icon: Clock, essential: true },
  { id: "gestion-projets", label: "Gestion de projets", icon: Briefcase },
  { id: "docs-internes", label: "Documentation interne", icon: FolderOpen },
  { id: "onboarding", label: "Onboarding automatisé", icon: UserPlus },
  { id: "chat-equipe", label: "Chat d'équipe", icon: MessageSquare },
  { id: "calendrier-partage", label: "Calendrier partagé", icon: Calendar },
  { id: "annuaire", label: "Annuaire des employés", icon: Users },
  { id: "demandes-conges", label: "Demandes de congés", icon: Calendar },
];

// ============ PORTAIL RH ============
const HR_FEATURES = [
  { id: "dossiers-employes", label: "Dossiers employés", icon: FolderOpen, essential: true },
  { id: "gestion-conges", label: "Gestion des congés", icon: Calendar, essential: true },
  { id: "formations", label: "Formations et certifications", icon: Award },
  { id: "recrutement", label: "Recrutement et candidatures", icon: UserPlus },
  { id: "evaluations", label: "Évaluations de performance", icon: ClipboardList },
  { id: "integration-paie", label: "Intégration paie", icon: CreditCard },
  { id: "gestion-absences", label: "Gestion des absences", icon: Clock },
  { id: "organigramme", label: "Organigramme dynamique", icon: Users },
];

// ============ PORTAIL ADMIN ============
const ADMIN_FEATURES = [
  { id: "dashboard-kpi", label: "Tableau de bord KPI", icon: ClipboardList, essential: true },
  { id: "gestion-users", label: "Gestion des utilisateurs", icon: UserCog, essential: true },
  { id: "roles-permissions", label: "Rôles et permissions", icon: Lock },
  { id: "logs-activite", label: "Logs d'activité", icon: FileText },
  { id: "rapports-auto", label: "Rapports automatisés", icon: FileText },
  { id: "config-systeme", label: "Configuration du système", icon: Settings },
  { id: "backups", label: "Sauvegardes automatiques", icon: FolderOpen },
  { id: "integrations", label: "Gestion des intégrations", icon: Settings },
];

const PORTAL_LABELS: Record<string, { title: string; icon: typeof Users }> = {
  client: { title: "Portail Client", icon: Users },
  employes: { title: "Portail Employés", icon: Briefcase },
  rh: { title: "Portail RH", icon: UserCog },
  admin: { title: "Portail Administrateur", icon: Settings },
  multifonctions: { title: "Portail Multifonctions", icon: Lock },
};

export const StepPortalDetails = () => {
  const { state, updateData } = useQuiz();
  const { portalType } = state.data;
  
  const portalClientFeatures = state.data.portalClientFeatures || [];
  const portalEmployeeFeatures = state.data.portalEmployeeFeatures || [];
  const portalHRFeatures = state.data.portalHRFeatures || [];
  const portalAdminFeatures = state.data.portalAdminFeatures || [];

  const toggleFeature = (field: string, features: string[], id: string) => {
    const updated = features.includes(id)
      ? features.filter(f => f !== id)
      : [...features, id];
    updateData({ [field]: updated });
  };

  const totalSelected = portalClientFeatures.length + portalEmployeeFeatures.length + 
    portalHRFeatures.length + portalAdminFeatures.length;

  const portalInfo = PORTAL_LABELS[portalType || "client"];
  const PortalIcon = portalInfo?.icon || Lock;

  const renderFeatureSection = (
    title: string, 
    features: typeof CLIENT_FEATURES, 
    selectedFeatures: string[],
    fieldName: string,
    icon: typeof Users
  ) => {
    const Icon = icon;
    return (
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {features.map((feature) => {
            const isSelected = selectedFeatures.includes(feature.id);
            const FeatureIcon = feature.icon;
            return (
              <label
                key={feature.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                  isSelected 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleFeature(fieldName, selectedFeatures, feature.id)}
                />
                <FeatureIcon className={cn("w-4 h-4", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span className="flex-1">{feature.label}</span>
                {feature.essential && (
                  <Badge variant="secondary" className="text-xs">Recommandé</Badge>
                )}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
          <PortalIcon className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Configuration de votre {portalInfo?.title}
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Sélectionnez les fonctionnalités nécessaires pour votre portail
        </p>
      </div>

      {/* Selection Counter */}
      {totalSelected > 0 && (
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {totalSelected} fonctionnalité{totalSelected > 1 ? "s" : ""} sélectionnée{totalSelected > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Nombre d'utilisateurs */}
      <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />
          Nombre d'utilisateurs estimé
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["1-10", "11-50", "51-100", "100+"].map((range) => {
            const isSelected = state.data.portalUsers === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => updateData({ portalUsers: range })}
                className={cn(
                  "p-4 rounded-xl border-2 text-center transition-all",
                  isSelected 
                    ? "border-accent bg-accent/10" 
                    : "border-border hover:border-accent/50"
                )}
              >
                <span className="font-medium">{range} utilisateurs</span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Le prix varie selon le nombre d'utilisateurs actifs
        </p>
      </div>

      {/* ===== PORTAIL CLIENT ===== */}
      {(portalType === "client" || portalType === "multifonctions") && (
        renderFeatureSection(
          "Fonctionnalités Client",
          CLIENT_FEATURES,
          portalClientFeatures,
          "portalClientFeatures",
          Users
        )
      )}

      {/* ===== PORTAIL EMPLOYÉS ===== */}
      {(portalType === "employes" || portalType === "multifonctions") && (
        renderFeatureSection(
          "Fonctionnalités Employés",
          EMPLOYEE_FEATURES,
          portalEmployeeFeatures,
          "portalEmployeeFeatures",
          Briefcase
        )
      )}

      {/* ===== PORTAIL RH ===== */}
      {(portalType === "rh" || portalType === "multifonctions") && (
        renderFeatureSection(
          "Fonctionnalités RH",
          HR_FEATURES,
          portalHRFeatures,
          "portalHRFeatures",
          UserCog
        )
      )}

      {/* ===== PORTAIL ADMIN ===== */}
      {(portalType === "admin" || portalType === "multifonctions") && (
        renderFeatureSection(
          "Fonctionnalités Administrateur",
          ADMIN_FEATURES,
          portalAdminFeatures,
          "portalAdminFeatures",
          Settings
        )
      )}

      {/* Rôles personnalisés */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Lock className="w-5 h-5 text-primary" />
          Rôles personnalisés (optionnel)
        </h3>
        <Label className="text-sm text-muted-foreground mb-2 block">
          Décrivez les différents types d'accès dont vous avez besoin
        </Label>
        <Input
          value={state.data.portalRoles || ""}
          onChange={(e) => updateData({ portalRoles: e.target.value })}
          placeholder="Ex: Admin, Manager, Employé, Client VIP..."
        />
      </div>

      <QuizNavigation canContinue={true} />
    </div>
  );
};
