import { DemoConfig } from "./DemoGenerator";
import {
  AppointmentSection,
  QuoteFormSection,
  OpeningHoursSection,
  TestimonialsSection,
  ContactSection,
  FAQSection,
  TeamSection,
} from "./InlineFeatureSection";
import {
  PDFCalculatorSection,
  TicketSystemSection,
  CRMLiteSection,
  ProjectsLiteSection,
  HRLiteSection,
  KnowledgeBaseSection,
  InternalChatSection,
  KPIDashboardSection,
  SignaturesSection,
  OnboardingSection,
} from "./InlineModuleSections";

interface InlineFeaturesProps {
  config: DemoConfig;
  themeConfig: {
    sectionBg?: string;
    sectionAlt?: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
  isLightTheme?: boolean;
  position: 'early' | 'middle' | 'late';
}

// Helper to check if a feature is selected
const hasFeature = (config: DemoConfig, keywords: string[]): boolean => {
  const allFeatures = [
    ...(config.websitePages || []),
    ...(config.websiteSections || []),
    ...(config.autoCompatibility || []),
    ...(config.ecommerceNeeds || []),
    ...(config.restaurantFeatures || []),
    ...(config.portalClientFeatures || []),
    ...(config.portalEmployeeFeatures || []),
    ...(config.selectedModules || []),
  ];

  return allFeatures.some(feature => 
    keywords.some(keyword => feature.toLowerCase().includes(keyword.toLowerCase()))
  );
};

// Check if a specific module is selected
const hasModule = (config: DemoConfig, moduleId: string): boolean => {
  return (config.selectedModules || []).includes(moduleId);
};

export const InlineFeatures = ({ config, themeConfig, isLightTheme, position }: InlineFeaturesProps) => {
  const sectionProps = { config, themeConfig, isLightTheme };

  // Early sections (after hero/intro)
  if (position === 'early') {
    return (
      <>
        {/* Module: Rendez-vous */}
        {hasModule(config, 'rendez-vous') && (
          <AppointmentSection {...sectionProps} />
        )}
        {/* Feature: Réservation */}
        {!hasModule(config, 'rendez-vous') && hasFeature(config, ['rendez-vous', 'réservation', 'booking', 'appointment']) && (
          <AppointmentSection {...sectionProps} />
        )}
        {/* Module: Calculateur PDF */}
        {hasModule(config, 'calculateur-pdf') && (
          <PDFCalculatorSection {...sectionProps} />
        )}
        {/* Module: KPI Dashboard */}
        {hasModule(config, 'kpi-dashboard') && (
          <KPIDashboardSection {...sectionProps} />
        )}
      </>
    );
  }

  // Middle sections (after services)
  if (position === 'middle') {
    return (
      <>
        {/* Feature: Soumission/Devis */}
        {hasFeature(config, ['soumission', 'devis', 'quote', 'estimation']) && !hasModule(config, 'calculateur-pdf') && (
          <QuoteFormSection {...sectionProps} />
        )}
        {/* Module: Tickets */}
        {hasModule(config, 'tickets') && (
          <TicketSystemSection {...sectionProps} />
        )}
        {/* Module: CRM Lite */}
        {hasModule(config, 'crm-lite') && (
          <CRMLiteSection {...sectionProps} />
        )}
        {/* Module: Projets Lite */}
        {hasModule(config, 'projets-lite') && (
          <ProjectsLiteSection {...sectionProps} />
        )}
        {/* Module: RH Lite */}
        {hasModule(config, 'rh-lite') && (
          <HRLiteSection {...sectionProps} />
        )}
        {/* Feature: Équipe */}
        {hasFeature(config, ['équipe', 'team', 'personnel']) && (
          <TeamSection {...sectionProps} />
        )}
        {/* Feature: Témoignages */}
        {hasFeature(config, ['témoignage', 'avis', 'review', 'testimonial']) && (
          <TestimonialsSection {...sectionProps} />
        )}
      </>
    );
  }

  // Late sections (before footer)
  if (position === 'late') {
    return (
      <>
        {/* Module: Base de connaissances */}
        {hasModule(config, 'base-connaissances') && (
          <KnowledgeBaseSection {...sectionProps} />
        )}
        {/* Module: Chat interne */}
        {hasModule(config, 'chat-interne') && (
          <InternalChatSection {...sectionProps} />
        )}
        {/* Module: Signatures */}
        {hasModule(config, 'signatures') && (
          <SignaturesSection {...sectionProps} />
        )}
        {/* Module: Onboarding */}
        {hasModule(config, 'onboarding') && (
          <OnboardingSection {...sectionProps} />
        )}
        {/* Feature: Horaires */}
        {hasFeature(config, ['horaire', 'ouverture', 'hours', 'schedule']) && (
          <OpeningHoursSection {...sectionProps} />
        )}
        {/* Feature: FAQ */}
        {hasFeature(config, ['faq', 'question']) && (
          <FAQSection {...sectionProps} />
        )}
        {/* Feature: Contact */}
        {hasFeature(config, ['contact', 'coordonnées', 'formulaire contact']) && (
          <ContactSection {...sectionProps} />
        )}
      </>
    );
  }

  return null;
};

// Export helpers
export { hasFeature, hasModule };
