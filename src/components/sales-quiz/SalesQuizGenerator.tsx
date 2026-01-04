import { useEffect, useState, useMemo } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { EmbedProvider } from "./EmbedContext";
import { QuizProgress } from "./QuizProgress";
import { QuizSummaryPanel } from "./QuizSummaryPanel";
import { StepWelcome } from "./steps/StepWelcome";
import { StepIndustry } from "./steps/StepIndustry";
import { StepCompanyInfo } from "./steps/StepCompanyInfo";
import { StepSolutions } from "./steps/StepSolutions";
import { StepDetails } from "./steps/StepDetails";
import { StepWebsiteDetails } from "./steps/StepWebsiteDetails";
import { StepPortalDetails } from "./steps/StepPortalDetails";
import { StepModulesSelection } from "./steps/StepModulesSelection";
import { StepStyle } from "./steps/StepStyle";
import { StepBranding } from "./steps/StepBranding";
import { StepPaymentOptions } from "./steps/StepPaymentOptions";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { SyncedHeader } from "@/components/SyncedHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSaveQuiz } from "@/hooks/useSaveQuiz";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save, Copy, Check, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { QuestionnaireData } from "@/types/questionnaire";

// Fonction pour générer les étapes dynamiquement selon les sélections
const getSteps = (data: Partial<QuestionnaireData>) => {
  const steps: Array<React.ComponentType> = [
    StepWelcome,        // 0 - Accueil
    StepIndustry,       // 1 - Industrie  
    StepCompanyInfo,    // 2 - Type & taille entreprise
    StepSolutions,      // 3 - Site Web / Portail / Modules
    StepDetails,        // 4 - Types détaillés (vitrine, e-commerce, etc.)
  ];

  const solutionTypes = data.solutionTypes || [];
  
  // Ajouter les étapes conditionnelles selon les solutions sélectionnées
  if (solutionTypes.includes("website") && data.websiteType) {
    steps.push(StepWebsiteDetails); // Questions spécifiques au type de site
  }
  
  if (solutionTypes.includes("portal") && data.portalType) {
    steps.push(StepPortalDetails); // Questions spécifiques au type de portail
  }
  
  if (solutionTypes.includes("module")) {
    steps.push(StepModulesSelection); // Sélection des modules
  }

  // Étapes communes pour la démo
  steps.push(StepStyle);      // Style visuel
  steps.push(StepBranding);   // Branding (logo, couleurs)
  
  // === PHASE 2 ===
  steps.push(StepPaymentOptions); // Mode paiement, maintenance, hébergement
  steps.push(StepContact);        // Coordonnées
  steps.push(StepSummary);        // Résumé et démo

  return steps;
};

interface QuizContentProps {
  embedMode?: boolean;
}

const QuizContent = ({ embedMode = false }: QuizContentProps) => {
  const { state, reset, updateData, goToStep } = useQuiz();
  
  // Générer les étapes dynamiquement selon les sélections
  const steps = useMemo(() => getSteps(state.data), [
    state.data.solutionTypes,
    state.data.websiteType,
    state.data.portalType
  ]);
  
  const CurrentStep = steps[state.step] || steps[0];
  const isMobile = useIsMobile();
  
  // Afficher le panneau après l'accueil et avant le résumé
  const showPanel = state.step > 0 && state.step < steps.length - 1 && !isMobile;
  const showControls = state.step > 0 && state.step < steps.length - 1;
  
  const { saving, saveQuiz, loadQuiz, generateShareUrl } = useSaveQuiz();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // Check for resume code in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeCode = urlParams.get('resume');
    
    if (resumeCode) {
      loadQuiz(resumeCode).then((savedQuiz) => {
        if (savedQuiz) {
          updateData(savedQuiz.quiz_data as any);
          goToStep(savedQuiz.current_step);
          toast.success('Questionnaire restauré !');
          
          // Clean URL
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete('resume');
          window.history.replaceState({}, '', newUrl.toString());
        }
      });
    }
  }, [loadQuiz, updateData, goToStep]);

  const handleSave = async () => {
    const shareCode = await saveQuiz(state.data, state.step);
    if (shareCode) {
      const url = generateShareUrl(shareCode);
      setShareUrl(url);
      setShareDialogOpen(true);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Lien copié !');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    reset();
    setResetDialogOpen(false);
  };

  return (
    <div className={cn(
      "w-full bg-gradient-to-br from-background via-muted/20 to-background",
      embedMode ? "h-screen overflow-hidden" : "min-h-screen"
    )}>
      {!embedMode && <SyncedHeader />}
      
      <div className={cn(
        "w-full",
        embedMode ? "h-full flex flex-col p-0" : "px-4 md:px-6 lg:px-8 py-6"
      )}>
        {/* Progress & Controls - hidden in embed mode */}
        {showControls && !embedMode && (
          <div className="mb-6 w-full flex items-center gap-2 md:gap-4">
            <div className="flex-1 min-w-0">
              <QuizProgress />
            </div>
            
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-1.5" />
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    Recommencer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Réinitialiser le questionnaire ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action effacera toutes vos réponses et vous ramènera au début. Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={reset} className="bg-destructive hover:bg-destructive/90">
                      Réinitialiser
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleSave} disabled={saving}>
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setResetDialogOpen(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Recommencer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}

        {/* Main Content with optional sidebar */}
        <div className={cn(
          "w-full",
          showPanel && !embedMode ? 'grid lg:grid-cols-[1fr_500px] gap-6' : '',
          embedMode ? 'flex-1 min-h-0' : ''
        )}>
          {/* Step Content */}
          <div className={cn(
            "w-full",
            embedMode ? "h-full" : ""
          )}>
            <CurrentStep />
          </div>

          {/* Summary Panel - desktop only, not on welcome/summary */}
          {showPanel && !embedMode && (
            <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-14rem)] overflow-y-auto">
              <QuizSummaryPanel />
            </div>
          )}
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Questionnaire sauvegardé !</DialogTitle>
            <DialogDescription>
              Copiez ce lien pour reprendre votre questionnaire plus tard. Il est valide pendant 30 jours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 mt-4">
            <Input 
              value={shareUrl} 
              readOnly 
              className="flex-1"
            />
            <Button onClick={handleCopy} variant="outline" size="icon">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Reset Dialog */}
      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Réinitialiser le questionnaire ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action effacera toutes vos réponses et vous ramènera au début. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset} className="bg-destructive hover:bg-destructive/90">
              Réinitialiser
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface SalesQuizGeneratorProps {
  embedMode?: boolean;
}

export const SalesQuizGenerator = ({ embedMode = false }: SalesQuizGeneratorProps) => {
  // Calculer le nombre max d'étapes possibles pour le provider
  const maxSteps = 13; // Nombre maximum si toutes les options sont sélectionnées
  
  return (
    <EmbedProvider isEmbed={embedMode}>
      <QuizProvider totalSteps={maxSteps}>
        <QuizContent embedMode={embedMode} />
      </QuizProvider>
    </EmbedProvider>
  );
};
