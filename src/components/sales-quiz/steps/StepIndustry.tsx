import { useQuiz } from "../QuizContext";
import { useEmbed } from "../EmbedContext";
import { QuizNavigation } from "../QuizNavigation";
import { IndustryCard } from "../IndustryCard";
import { Building2, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/types/questionnaire";
import { cn } from "@/lib/utils";

const INDUSTRY_DESCRIPTIONS: Record<string, string> = {
  auto: "Pièces détachées, garages, concessionnaires",
  restauration: "Restaurants, cafés, traiteurs, bars",
  commerce: "Boutiques, détaillants, grossistes",
  sante: "Cliniques, praticiens, pharmacies",
  construction: "Entrepreneurs, rénovation, métiers spécialisés",
  education: "Écoles, formations, tutoriels",
  obnl: "Associations, fondations, organismes",
  services: "Consultants, agences, professionnels",
  architecture: "Architectes, designers, ingénieurs",
  tech: "Startups, SaaS, développement",
  transport: "Livraison, logistique, camionnage",
  "arts-scene": "Artistes, salles de spectacle, événements",
  demenagement: "Déménageurs, entreposage",
  immobilier: "Agents, courtiers, gestion immobilière",
  finances: "Comptables, conseillers, assurances",
  beaute: "Salons de coiffure, spas, esthéticiennes",
};

export const StepIndustry = () => {
  const { state, updateData, nextStep } = useQuiz();
  const { isEmbed } = useEmbed();
  const [search, setSearch] = useState("");

  const selectedIndustry = state.data.industry;

  const filteredIndustries = INDUSTRIES.filter(
    (ind) =>
      ind.label.toLowerCase().includes(search.toLowerCase()) ||
      (INDUSTRY_DESCRIPTIONS[ind.value] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleSelect = (value: string) => {
    // Toggle selection - allow deselection
    if (selectedIndustry === value) {
      updateData({ industry: "" });
    } else {
      updateData({ industry: value, mainObjectives: [] });
      // Auto-advance after selection with a small delay for visual feedback
      setTimeout(() => nextStep(), 400);
    }
  };

  // En mode embed, on utilise une grille compacte optimisée pour tenir sur une page
  if (isEmbed) {
    return (
      <div className="h-full flex flex-col overflow-hidden px-3 py-2">
        {/* Header ultra compact */}
        <div className="text-center pb-1.5 shrink-0">
          <h2 className="text-base font-bold flex items-center justify-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Dans quelle industrie évoluez-vous?
          </h2>
        </div>

        {/* Search compact */}
        <div className="relative max-w-xs mx-auto w-full pb-2 shrink-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-7 text-sm"
          />
        </div>

        {/* Grid magazine style - limité à 12 éléments sur 3 lignes */}
        <div 
          className="flex-1 grid grid-cols-4 gap-1 min-h-0"
          style={{ 
            gridTemplateRows: 'repeat(3, 1fr)',
            gridAutoFlow: 'dense' 
          }}
        >
          {filteredIndustries.slice(0, 12).map((industry, index) => {
            // Pattern asymétrique : positions 0 et 6 sont featured (2 colonnes)
            const featuredPattern = [0, 6];
            const isFeatured = featuredPattern.includes(index);
            
            return (
              <div 
                key={industry.value}
                className={cn(
                  "min-h-0 overflow-hidden",
                  isFeatured ? "col-span-2" : ""
                )}
              >
                <IndustryCard
                  value={industry.value}
                  label={industry.label}
                  description={INDUSTRY_DESCRIPTIONS[industry.value] || ""}
                  isSelected={selectedIndustry === industry.value}
                  onSelect={() => handleSelect(industry.value)}
                  index={index}
                  isFeatured={isFeatured}
                  compact
                />
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredIndustries.length === 0 && (
          <div className="text-center py-2 text-muted-foreground shrink-0">
            <p className="text-xs">Aucune industrie trouvée.</p>
          </div>
        )}

        {/* Footer compact */}
        <div className="pt-1.5 shrink-0 text-center">
          <span className="text-xs text-muted-foreground">
            Cliquez sur une industrie pour continuer
          </span>
        </div>
      </div>
    );
  }

  // Mode normal (non-embed)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-glow">
          <Building2 className="w-7 h-7" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Dans quelle industrie évoluez-vous?
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Nous personnaliserons votre démo selon les besoins spécifiques de votre secteur.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher une industrie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Industry Grid - Style Magazine avec tailles variées */}
      <div 
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
        style={{ gridAutoRows: '180px', gridAutoFlow: 'dense' }}
      >
        {filteredIndustries.map((industry, index) => {
          // Pattern qui remplit sans espaces vides
          const featuredPattern = [0, 5, 10];
          const isFeatured = featuredPattern.includes(index);
          
          return (
            <div 
              key={industry.value}
              className={isFeatured ? "col-span-2 row-span-2" : ""}
            >
              <IndustryCard
                value={industry.value}
                label={industry.label}
                description={INDUSTRY_DESCRIPTIONS[industry.value] || ""}
                isSelected={selectedIndustry === industry.value}
                onSelect={() => handleSelect(industry.value)}
                index={index}
                isFeatured={isFeatured}
              />
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredIndustries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucune industrie trouvée. Essayez un autre terme de recherche.</p>
        </div>
      )}

      <QuizNavigation canContinue={!!selectedIndustry} />
    </div>
  );
};
