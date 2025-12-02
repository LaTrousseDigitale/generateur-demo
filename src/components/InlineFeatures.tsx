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
  position: 'early' | 'middle' | 'late'; // Where in the demo to render
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

export const InlineFeatures = ({ config, themeConfig, isLightTheme, position }: InlineFeaturesProps) => {
  const sectionProps = { config, themeConfig, isLightTheme };

  // Early sections (after hero/intro)
  if (position === 'early') {
    return (
      <>
        {hasFeature(config, ['rendez-vous', 'réservation', 'booking', 'appointment']) && (
          <AppointmentSection {...sectionProps} />
        )}
      </>
    );
  }

  // Middle sections (after services)
  if (position === 'middle') {
    return (
      <>
        {hasFeature(config, ['soumission', 'devis', 'quote', 'estimation']) && (
          <QuoteFormSection {...sectionProps} />
        )}
        {hasFeature(config, ['équipe', 'team', 'personnel']) && (
          <TeamSection {...sectionProps} />
        )}
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
        {hasFeature(config, ['horaire', 'ouverture', 'hours', 'schedule']) && (
          <OpeningHoursSection {...sectionProps} />
        )}
        {hasFeature(config, ['faq', 'question']) && (
          <FAQSection {...sectionProps} />
        )}
        {hasFeature(config, ['contact', 'coordonnées', 'formulaire contact']) && (
          <ContactSection {...sectionProps} />
        )}
      </>
    );
  }

  return null;
};

// Export helper for checking features outside of the component
export { hasFeature };
