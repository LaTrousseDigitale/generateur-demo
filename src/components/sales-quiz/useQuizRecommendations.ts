import { useMemo } from "react";

// Mapping des priorités business vers les solutions recommandées
const PRIORITY_TO_SOLUTIONS: Record<string, { solutions: string[]; explanation: string }> = {
  revenue: {
    solutions: ["website", "portal"],
    explanation: "Un site web optimisé et un portail client augmentent vos conversions et ventes.",
  },
  visibility: {
    solutions: ["website"],
    explanation: "Un site web professionnel améliore votre visibilité en ligne et votre référencement.",
  },
  efficiency: {
    solutions: ["portal", "module"],
    explanation: "Les portails et modules automatisent vos processus et réduisent les tâches manuelles.",
  },
  image: {
    solutions: ["website"],
    explanation: "Un site moderne projette une image professionnelle et crédible.",
  },
  loyalty: {
    solutions: ["portal", "module"],
    explanation: "Un portail client et des outils CRM renforcent la fidélisation.",
  },
  expansion: {
    solutions: ["website", "portal"],
    explanation: "Le web vous permet d'atteindre de nouveaux marchés sans frontières géographiques.",
  },
};

// Descriptions pédagogiques des solutions
export const SOLUTION_EXPLANATIONS = {
  website: {
    title: "Site Web",
    whatItIs: "Votre vitrine en ligne accessible 24/7, où vos clients potentiels vous découvrent.",
    benefits: [
      "Crédibilité professionnelle instantanée",
      "Visibilité sur Google (SEO)",
      "Génération de prospects automatisée",
      "Présentation de vos services/produits",
    ],
    bestFor: ["Attirer de nouveaux clients", "Présenter votre expertise", "Vendre en ligne"],
    icon: "🌐",
  },
  portal: {
    title: "Portail Sécurisé",
    whatItIs: "Un espace privé pour vos clients ou employés avec authentification.",
    benefits: [
      "Documents accessibles en tout temps",
      "Communication centralisée",
      "Suivi des projets en temps réel",
      "Signatures électroniques",
    ],
    bestFor: ["Fidéliser vos clients", "Collaborer avec votre équipe", "Automatiser les suivis"],
    icon: "🔐",
  },
  module: {
    title: "Modules & Automatisations",
    whatItIs: "Des outils intelligents pour automatiser vos opérations quotidiennes.",
    benefits: [
      "Gain de temps significatif",
      "Réduction des erreurs humaines",
      "Données centralisées",
      "Rapports automatiques",
    ],
    bestFor: ["Optimiser vos processus", "Gérer vos clients (CRM)", "Facturation automatisée"],
    icon: "⚙️",
  },
};

// Modules recommandés par priorité
const PRIORITY_TO_MODULES: Record<string, string[]> = {
  revenue: ["crm-lite", "calculateur-pdf", "kpi-dashboard"],
  visibility: ["base-connaissances", "kpi-dashboard"],
  efficiency: ["projets-lite", "signatures", "onboarding"],
  image: ["base-connaissances"],
  loyalty: ["crm-lite", "tickets", "chat-interne"],
  expansion: ["crm-lite", "kpi-dashboard"],
};

interface QuizData {
  mainObjectives?: string[];
  solutionTypes?: string[];
  industry?: string;
}

export interface Recommendation {
  solutionId: string;
  score: number;
  reasons: string[];
  priority: "high" | "medium" | "low";
}

export const useQuizRecommendations = (data: QuizData) => {
  const recommendations = useMemo(() => {
    const { mainObjectives = [], solutionTypes = [] } = data;
    
    if (mainObjectives.length === 0) {
      return {
        solutions: [] as Recommendation[],
        modules: [] as string[],
        summary: "Sélectionnez vos priorités pour voir nos recommandations.",
      };
    }

    // Calculer le score de chaque solution
    const solutionScores: Record<string, { score: number; reasons: string[] }> = {
      website: { score: 0, reasons: [] },
      portal: { score: 0, reasons: [] },
      module: { score: 0, reasons: [] },
    };

    mainObjectives.forEach((priority) => {
      const mapping = PRIORITY_TO_SOLUTIONS[priority];
      if (mapping) {
        mapping.solutions.forEach((solution) => {
          solutionScores[solution].score += 1;
          solutionScores[solution].reasons.push(mapping.explanation);
        });
      }
    });

    // Trier et formater les recommandations
    const sortedRecommendations: Recommendation[] = Object.entries(solutionScores)
      .map(([id, { score, reasons }]): Recommendation => ({
        solutionId: id,
        score,
        reasons: [...new Set(reasons)], // Dédupliquer
        priority: (score >= 2 ? "high" : score >= 1 ? "medium" : "low") as "high" | "medium" | "low",
      }))
      .sort((a, b) => b.score - a.score);

    // Calculer les modules recommandés
    const moduleScores: Record<string, number> = {};
    mainObjectives.forEach((priority) => {
      const modules = PRIORITY_TO_MODULES[priority] || [];
      modules.forEach((m) => {
        moduleScores[m] = (moduleScores[m] || 0) + 1;
      });
    });

    const recommendedModules = Object.entries(moduleScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id]) => id);

    // Générer un résumé pédagogique
    const topSolution = sortedRecommendations[0];
    let summary = "";
    if (topSolution && topSolution.score > 0) {
      const explanation = SOLUTION_EXPLANATIONS[topSolution.solutionId as keyof typeof SOLUTION_EXPLANATIONS];
      summary = `Basé sur vos ${mainObjectives.length} priorité(s), nous recommandons de commencer par ${explanation?.title || topSolution.solutionId}.`;
    }

    return {
      solutions: sortedRecommendations,
      modules: recommendedModules,
      summary,
    };
  }, [data.mainObjectives]);

  // Vérifier si une solution est recommandée
  const isRecommended = (solutionId: string) => {
    const rec = recommendations.solutions.find((r) => r.solutionId === solutionId);
    return rec && rec.score > 0;
  };

  const getRecommendationLevel = (solutionId: string): "high" | "medium" | "low" | null => {
    const rec = recommendations.solutions.find((r) => r.solutionId === solutionId);
    return rec?.priority || null;
  };

  return {
    ...recommendations,
    isRecommended,
    getRecommendationLevel,
  };
};
