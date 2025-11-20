import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, ChevronLeft, ChevronRight, Minimize2, Maximize2 } from "lucide-react";
import { QuestionnaireData } from "@/types/questionnaire";
import { Section1General } from "./Section1General";
import { Section2SolutionType } from "./Section2SolutionType";
import { Section3Website } from "./Section3Website";
import { Section4Portal } from "./Section4Portal";
import { Section5Modules } from "./Section5Modules";
import { Section6Branding } from "./Section6Branding";
import { Section7Domain } from "./Section7Domain";
import { Section8Finances } from "./Section8Finances";
import { Section9Summary } from "./Section9Summary";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import { LogoUploader } from "@/components/LogoUploader";

interface QuestionnaireModalProps {
  data: QuestionnaireData;
  onChange: (updates: Partial<QuestionnaireData>) => void;
  onComplete: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
}

const TOTAL_SECTIONS = 10;

export const QuestionnaireModal = ({
  data,
  onChange,
  onComplete,
  onMinimize,
  isMinimized,
}: QuestionnaireModalProps) => {
  const [currentSection, setCurrentSection] = useState(1);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem("questionnaire-data", JSON.stringify(data));
  }, [data]);

  const progress = (currentSection / TOTAL_SECTIONS) * 100;

  const canProceed = () => {
    switch (currentSection) {
      case 1:
        return data.companyName && data.industry && data.startDate && data.financing;
      case 2:
        return data.solutionTypes && data.solutionTypes.length > 0;
      case 3:
        // Section 3 only shows if website is selected
        if (!(data.solutionTypes || []).includes("website")) return true;
        return data.websiteType;
      case 4:
        // Section 4 only shows if portal is selected
        if (!(data.solutionTypes || []).includes("portal")) return true;
        return data.portalType && data.portalUsers && data.portalRoles;
      case 6:
        return data.companyName;
      case 7:
        return data.domainType && data.hostingPreference;
      case 8:
        return data.paymentMode;
      case 9:
        return data.contactMethod;
      default:
        return true;
    }
  };

  // Skip sections based on selected solutions
  const getNextSection = (current: number) => {
    const hasWebsite = (data.solutionTypes || []).includes("website");
    const hasPortal = (data.solutionTypes || []).includes("portal");

    if (current === 2 && !hasWebsite) return 4; // Skip website section
    if (current === 3 && !hasPortal) return 5; // Skip portal section
    return current + 1;
  };

  const getPreviousSection = (current: number) => {
    const hasWebsite = (data.solutionTypes || []).includes("website");
    const hasPortal = (data.solutionTypes || []).includes("portal");

    if (current === 5 && !hasPortal) return 3; // Skip portal section when going back
    if (current === 4 && !hasWebsite) return 2; // Skip website section when going back
    return current - 1;
  };

  const handleNext = () => {
    if (currentSection < TOTAL_SECTIONS) {
      const nextSection = getNextSection(currentSection);
      setCurrentSection(nextSection);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentSection > 1) {
      const prevSection = getPreviousSection(currentSection);
      setCurrentSection(prevSection);
    }
  };

  const getSectionTitle = () => {
    const titles = [
      "Informations Générales",
      "Type de Solution",
      "Sites Web",
      "Portails",
      "Modules",
      "Identité de Marque",
      "Domaine & Hébergement",
      "Finances",
      "Résumé",
      "Votre Démo",
    ];
    return titles[currentSection - 1];
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onMinimize}
          size="lg"
          className="shadow-elegant hover:shadow-glow transition-all"
        >
          <Maximize2 className="w-4 h-4 mr-2" />
          Continuer le questionnaire
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-elegant animate-slide-up flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-primary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary-foreground">
              {getSectionTitle()}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onMinimize}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-primary-foreground/90">
              <span>Section {currentSection} sur {TOTAL_SECTIONS}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-primary-foreground/20" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentSection === 1 && <Section1General data={data} onChange={onChange} />}
          {currentSection === 2 && <Section2SolutionType data={data} onChange={onChange} />}
          {currentSection === 3 && <Section3Website data={data} onChange={onChange} />}
          {currentSection === 4 && <Section4Portal data={data} onChange={onChange} />}
          {currentSection === 5 && (
            <Section5Modules
              data={data}
              onChange={onChange}
              isModuleSelected={(data.solutionTypes || []).includes("module")}
            />
          )}
          {currentSection === 6 && (
            <div className="space-y-6">
              <LogoUploader
                logo={data.logo}
                companyName={data.companyName}
                onLogoChange={(logo) => onChange({ logo })}
                onCompanyNameChange={(name) => onChange({ companyName: name })}
              />
              <ColorCustomizer
                primaryColor={data.primaryColor}
                accentColor={data.accentColor}
                secondaryColor={data.secondaryColor}
                onColorChange={onChange}
              />
            </div>
          )}
          {currentSection === 7 && <Section7Domain data={data} onChange={onChange} />}
          {currentSection === 8 && <Section8Finances data={data} onChange={onChange} />}
          {currentSection === 9 && <Section9Summary data={data} onChange={onChange} />}
          {currentSection === 10 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">Prêt à voir votre démo !</h3>
              <p className="text-muted-foreground">
                Cliquez sur "Voir ma démo" pour découvrir votre solution personnalisée
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/30 flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentSection === 1}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <Button onClick={handleNext} disabled={!canProceed()}>
            {currentSection === TOTAL_SECTIONS ? "Voir ma démo" : "Suivant"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
