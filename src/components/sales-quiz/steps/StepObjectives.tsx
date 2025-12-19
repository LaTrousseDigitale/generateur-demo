import { useQuiz } from "../QuizContext";
import { QuizNavigation } from "../QuizNavigation";
import { Lightbulb, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Objectifs par industrie
const INDUSTRY_OBJECTIVES: Record<string, { id: string; label: string; icon: string }[]> = {
  auto: [
    { id: "ecommerce", label: "Vendre des pièces en ligne 24/7", icon: "🛒" },
    { id: "search", label: "Recherche par compatibilité véhicule", icon: "🔍" },
    { id: "inventory", label: "Gérer l'inventaire en temps réel", icon: "📦" },
    { id: "b2b", label: "Portail pour garages partenaires", icon: "🤝" },
    { id: "quotes", label: "Automatiser devis et facturation", icon: "📄" },
    { id: "tracking", label: "Suivi de commandes clients", icon: "📍" },
  ],
  restauration: [
    { id: "reservations", label: "Réservations en ligne", icon: "📅" },
    { id: "orders", label: "Commandes en ligne (livraison/emporter)", icon: "🛵" },
    { id: "loyalty", label: "Programme de fidélité", icon: "⭐" },
    { id: "schedule", label: "Gestion des horaires employés", icon: "🕐" },
    { id: "menu", label: "Menu digital attrayant", icon: "📋" },
    { id: "reminders", label: "Rappels automatiques", icon: "🔔" },
  ],
  commerce: [
    { id: "store", label: "Boutique en ligne", icon: "🛍️" },
    { id: "sync", label: "Synchronisation stocks magasin/web", icon: "🔄" },
    { id: "loyalty", label: "Programme de fidélité", icon: "💎" },
    { id: "promos", label: "Gestion des promotions", icon: "🏷️" },
    { id: "crm", label: "CRM pour suivi clients", icon: "👥" },
    { id: "marketing", label: "Automatisation marketing", icon: "📧" },
  ],
  sante: [
    { id: "appointments", label: "Prise de rendez-vous en ligne", icon: "📅" },
    { id: "portal", label: "Portail patient sécurisé", icon: "🔐" },
    { id: "records", label: "Gestion dossiers et conformité", icon: "📁" },
    { id: "reminders", label: "Rappels de rendez-vous", icon: "⏰" },
    { id: "calendar", label: "Calendrier praticiens partagé", icon: "📆" },
    { id: "docs", label: "Partage documents sécurisé", icon: "📎" },
  ],
  construction: [
    { id: "portfolio", label: "Site portfolio projets", icon: "🖼️" },
    { id: "quotes", label: "Demandes de soumission en ligne", icon: "📝" },
    { id: "client-portal", label: "Portail suivi chantiers", icon: "🏗️" },
    { id: "projects", label: "Gestion projets et échéanciers", icon: "📊" },
    { id: "team", label: "Coordination équipes", icon: "👷" },
    { id: "billing", label: "Devis et factures automatisés", icon: "💵" },
  ],
  default: [
    { id: "website", label: "Site web professionnel", icon: "🌐" },
    { id: "portal", label: "Portail client ou employés", icon: "🔐" },
    { id: "automation", label: "Automatiser les processus", icon: "⚙️" },
    { id: "projects", label: "Gestion de projets", icon: "📋" },
    { id: "crm", label: "Suivi client (CRM)", icon: "👥" },
    { id: "image", label: "Moderniser l'image", icon: "✨" },
  ],
};

export const StepObjectives = () => {
  const { state, updateData } = useQuiz();
  const industry = state.data.industry || "default";
  const selectedObjectives = state.data.mainObjectives || [];

  const objectives = INDUSTRY_OBJECTIVES[industry] || INDUSTRY_OBJECTIVES.default;

  const toggleObjective = (id: string) => {
    const updated = selectedObjectives.includes(id)
      ? selectedObjectives.filter((o) => o !== id)
      : [...selectedObjectives, id];
    updateData({ mainObjectives: updated });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-secondary text-white shadow-glow">
          <Lightbulb className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Quels sont vos objectifs principaux?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Sélectionnez tout ce qui s'applique à votre situation
        </p>
      </div>

      {/* Selection Counter */}
      {selectedObjectives.length > 0 && (
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {selectedObjectives.length} objectif{selectedObjectives.length > 1 ? "s" : ""} sélectionné{selectedObjectives.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Objectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {objectives.map((objective, index) => {
          const isSelected = selectedObjectives.includes(objective.id);

          return (
            <button
              key={objective.id}
              type="button"
              onClick={() => toggleObjective(objective.id)}
              className={cn(
                "group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300",
                "border-2 animate-fade-in",
                isSelected
                  ? "bg-primary text-white border-primary shadow-elegant"
                  : "bg-card border-border hover:border-primary/50 hover:bg-muted/50"
              )}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300",
                  isSelected
                    ? "bg-white/20"
                    : "bg-muted group-hover:bg-primary/10"
                )}
              >
                {objective.icon}
              </div>

              {/* Label */}
              <span className="flex-1 font-medium">{objective.label}</span>

              {/* Checkbox */}
              <div
                className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300",
                  isSelected
                    ? "bg-white/30"
                    : "border-2 border-muted-foreground/30 group-hover:border-primary"
                )}
              >
                {isSelected && <Check className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>

      <QuizNavigation canContinue={selectedObjectives.length > 0} />
    </div>
  );
};
