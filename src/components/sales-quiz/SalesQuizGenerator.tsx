import { useEffect, useState } from "react";
import { QuizProvider, useQuiz } from "./QuizContext";
import { QuizProgress } from "./QuizProgress";
import { QuizSummaryPanel } from "./QuizSummaryPanel";
import { StepWelcome } from "./steps/StepWelcome";
import { StepIndustry } from "./steps/StepIndustry";
import { StepObjectives } from "./steps/StepObjectives";
import { StepSolutions } from "./steps/StepSolutions";
import { StepDetails } from "./steps/StepDetails";
import { StepFeatures } from "./steps/StepFeatures";
import { StepStyle } from "./steps/StepStyle";
import { StepBranding } from "./steps/StepBranding";
import { StepContact } from "./steps/StepContact";
import { StepSummary } from "./steps/StepSummary";
import { SyncedHeader } from "@/components/SyncedHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSaveQuiz } from "@/hooks/useSaveQuiz";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save, Copy, Check, Menu, X } from "lucide-react";
import { toast } from "sonner";
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

const STEPS = [
  StepWelcome,
  StepIndustry,
  StepObjectives,
  StepSolutions,
  StepDetails,
  StepFeatures,
  StepStyle,
  StepBranding,
  StepContact,
  StepSummary,
];

// Étapes où on affiche le panneau de résumé (pas sur welcome ni summary)
const STEPS_WITH_PANEL = [1, 2, 3, 4, 5, 6, 7, 8];

const QuizContent = () => {
  const { state, reset, updateData, goToStep } = useQuiz();
  const CurrentStep = STEPS[state.step];
  const isMobile = useIsMobile();
  const showPanel = STEPS_WITH_PANEL.includes(state.step) && !isMobile;
  const showControls = state.step > 0 && state.step < STEPS.length - 1;
  
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
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background">
      <SyncedHeader />
      
      <div className="w-full px-4 md:px-6 lg:px-8 py-6">
        {/* Progress & Controls */}
        {showControls && (
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
        <div className={`w-full ${showPanel ? 'grid lg:grid-cols-[1fr_500px] gap-6' : ''}`}>
          {/* Step Content */}
          <div className="w-full">
            <CurrentStep />
          </div>

          {/* Summary Panel - desktop only, not on welcome/summary */}
          {showPanel && (
            <div className="hidden lg:block sticky top-6 max-h-[calc(100vh-12rem)] overflow-y-auto">
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

export const SalesQuizGenerator = () => {
  return (
    <QuizProvider totalSteps={STEPS.length}>
      <QuizContent />
    </QuizProvider>
  );
};
