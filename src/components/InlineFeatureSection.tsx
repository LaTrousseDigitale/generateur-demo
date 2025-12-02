import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { 
  Calendar, Clock, Phone, Mail, MapPin,
  Star, ArrowRight, Send, ChevronDown, Users, FileText,
  Sparkles, CheckCircle2, MessageCircle, Award
} from "lucide-react";

interface InlineFeatureSectionProps {
  featureName: string;
  config: DemoConfig;
  themeConfig: {
    sectionBg?: string;
    sectionAlt?: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
  };
  isLightTheme?: boolean;
}

// Dynamic gradient background that adapts to theme
const GradientBackground = ({ color, isLight, variant = 'default' }: { color: string; isLight?: boolean; variant?: 'default' | 'alt' | 'accent' }) => {
  if (isLight) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft gradient wash */}
        <div 
          className="absolute -top-1/2 -right-1/4 w-full h-full rounded-full blur-[120px] opacity-30"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 rounded-full blur-[100px] opacity-20"
          style={{ backgroundColor: color }}
        />
        {variant === 'accent' && (
          <div 
            className="absolute top-1/4 right-0 w-1/3 h-1/2 rounded-full blur-[80px] opacity-15"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    );
  }

  // Dark theme gradients
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: color }}
      />
      <div 
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{ backgroundColor: color }}
      />
      {variant === 'accent' && (
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
        />
      )}
    </div>
  );
};

export const AppointmentSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' 
          : themeConfig.sectionAlt || themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} variant="accent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ 
                backgroundColor: `${config.primaryColor}15`,
                color: config.primaryColor,
                border: `1px solid ${config.primaryColor}25`
              }}
            >
              <Calendar className="w-4 h-4" />
              <span>Réservation en ligne</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
              Prenez rendez-vous
            </h2>
            <h3 
              className="text-3xl md:text-4xl font-black mb-6"
              style={{ color: config.primaryColor }}
            >
              en quelques clics
            </h3>
            <p className={`text-lg ${themeConfig.textSecondary} max-w-xl mx-auto`}>
              Sélectionnez votre date et heure préférées. Notre équipe vous attend.
            </p>
          </div>

          {/* Card */}
          <div 
            className={`rounded-3xl p-6 md:p-10 ${
              isLightTheme 
                ? 'bg-white shadow-xl' 
                : 'bg-white/5 backdrop-blur-xl border border-white/10'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Calendar */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className={`font-bold text-lg ${themeConfig.textPrimary}`}>Sélectionnez une date</h4>
                </div>
                
                <div className={`rounded-2xl p-5 ${isLightTheme ? 'bg-slate-50' : 'bg-white/5'}`}>
                  <div className="flex justify-between items-center mb-5">
                    <span className={`font-bold ${themeConfig.textPrimary}`}>Décembre 2024</span>
                    <div className="flex gap-1">
                      <button className={`w-8 h-8 rounded-lg flex items-center justify-center ${themeConfig.textSecondary} hover:bg-slate-200/50`}>←</button>
                      <button className={`w-8 h-8 rounded-lg flex items-center justify-center ${themeConfig.textSecondary} hover:bg-slate-200/50`}>→</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                      <div key={i} className={`text-center text-xs font-bold py-2 ${themeConfig.textSecondary}`}>{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isSelected = selectedDate === day;
                      const isPast = day < 10;
                      const isWeekend = (i + 1) % 7 === 6 || (i + 1) % 7 === 0;
                      return (
                        <button
                          key={i}
                          onClick={() => !isPast && setSelectedDate(day)}
                          disabled={isPast}
                          className={`text-center py-2.5 text-sm rounded-xl transition-all font-medium ${
                            isSelected 
                              ? 'text-white font-bold scale-110' 
                              : isPast 
                                ? `${themeConfig.textSecondary} opacity-30 cursor-not-allowed`
                                : isWeekend
                                  ? 'text-red-400'
                                  : `${themeConfig.textPrimary} hover:bg-slate-200/50`
                          }`}
                          style={isSelected ? { backgroundColor: config.primaryColor } : {}}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: config.accentColor || config.primaryColor }}
                  >
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className={`font-bold text-lg ${themeConfig.textPrimary}`}>Créneaux disponibles</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${
                        selectedTime === time 
                          ? 'text-white scale-105' 
                          : isLightTheme 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' 
                            : 'bg-white/5 hover:bg-white/10 text-white/80'
                      }`}
                      style={selectedTime === time ? { 
                        backgroundColor: config.primaryColor,
                        boxShadow: `0 4px 15px ${config.primaryColor}40`
                      } : {}}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedDate && selectedTime && (
                  <div 
                    className="mt-6 p-5 rounded-2xl flex items-center gap-3"
                    style={{ backgroundColor: `${config.primaryColor}10` }}
                  >
                    <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                    <div>
                      <p className={`text-sm ${themeConfig.textSecondary}`}>Votre sélection :</p>
                      <p className="font-bold" style={{ color: config.primaryColor }}>
                        {selectedDate} décembre 2024 à {selectedTime}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button 
              className="w-full mt-8 h-14 text-lg font-bold text-white rounded-xl transition-all hover:scale-[1.02] group"
              style={{ 
                backgroundColor: config.primaryColor,
                boxShadow: `0 4px 20px ${config.primaryColor}30`
              }}
              disabled={!selectedDate || !selectedTime}
            >
              Confirmer le rendez-vous
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const QuoteFormSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? `linear-gradient(135deg, ${config.primaryColor}08 0%, white 50%, ${config.accentColor || config.primaryColor}05 100%)`
          : themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ 
                backgroundColor: `${config.primaryColor}15`,
                color: config.primaryColor,
                border: `1px solid ${config.primaryColor}25`
              }}
            >
              <FileText className="w-4 h-4" />
              <span>Soumission gratuite</span>
              <Award className="w-4 h-4" />
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
              Demandez votre
            </h2>
            <h3 
              className="text-3xl md:text-4xl font-black mb-6"
              style={{ color: config.primaryColor }}
            >
              estimation personnalisée
            </h3>
            <p className={`text-lg ${themeConfig.textSecondary}`}>
              Recevez une soumission détaillée sous 24h. Sans engagement.
            </p>
          </div>

          {/* Form Card */}
          <div 
            className={`rounded-3xl p-6 md:p-10 ${
              isLightTheme 
                ? 'bg-white shadow-xl' 
                : 'bg-white/5 backdrop-blur-xl border border-white/10'
            }`}
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Votre nom complet"
                  className={`w-full px-5 py-4 rounded-xl border-2 transition-all focus:outline-none ${
                    isLightTheme 
                      ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                      : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                  }`}
                />
                <input 
                  type="email" 
                  placeholder="Votre courriel"
                  className={`w-full px-5 py-4 rounded-xl border-2 transition-all focus:outline-none ${
                    isLightTheme 
                      ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                      : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                  }`}
                />
              </div>
              <input 
                type="tel" 
                placeholder="Votre téléphone"
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all focus:outline-none ${
                  isLightTheme 
                    ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                }`}
              />
              <select 
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all focus:outline-none ${
                  isLightTheme 
                    ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white'
                }`}
              >
                <option value="">Type de service requis</option>
                <option value="consultation">Consultation</option>
                <option value="reparation">Réparation</option>
                <option value="installation">Installation</option>
                <option value="autre">Autre</option>
              </select>
              <textarea 
                placeholder="Décrivez votre projet en détail..."
                rows={4}
                className={`w-full px-5 py-4 rounded-xl border-2 transition-all focus:outline-none resize-none ${
                  isLightTheme 
                    ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                }`}
              />
              <Button 
                className="w-full h-14 text-lg font-bold text-white rounded-xl transition-all hover:scale-[1.02] group"
                style={{ 
                  backgroundColor: config.primaryColor,
                  boxShadow: `0 4px 20px ${config.primaryColor}30`
                }}
              >
                <Send className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Envoyer ma demande
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const OpeningHoursSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const hours = [
    { day: 'Lundi', hours: '8h00 - 18h00', open: true },
    { day: 'Mardi', hours: '8h00 - 18h00', open: true },
    { day: 'Mercredi', hours: '8h00 - 18h00', open: true },
    { day: 'Jeudi', hours: '8h00 - 18h00', open: true },
    { day: 'Vendredi', hours: '8h00 - 17h00', open: true },
    { day: 'Samedi', hours: '9h00 - 12h00', open: true },
    { day: 'Dimanche', hours: 'Fermé', open: false },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' 
          : themeConfig.sectionAlt || themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
                style={{ 
                  backgroundColor: `${config.primaryColor}15`,
                  color: config.primaryColor,
                  border: `1px solid ${config.primaryColor}25`
                }}
              >
                <Clock className="w-4 h-4" />
                <span>Horaires</span>
              </div>
              <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
                Nos heures
              </h2>
              <h3 
                className="text-3xl md:text-4xl font-black mb-6"
                style={{ color: config.primaryColor }}
              >
                d'ouverture
              </h3>
              <p className={`text-lg ${themeConfig.textSecondary} mb-8`}>
                Notre équipe est disponible pour vous accueillir aux horaires suivants
              </p>
              <div 
                className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl"
                style={{ backgroundColor: `${config.primaryColor}10` }}
              >
                <div className="relative">
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="font-bold" style={{ color: config.primaryColor }}>
                  Actuellement ouvert
                </span>
              </div>
            </div>

            <div 
              className={`rounded-2xl overflow-hidden ${
                isLightTheme 
                  ? 'bg-white shadow-xl' 
                  : 'bg-white/5 backdrop-blur-xl border border-white/10'
              }`}
            >
              {hours.map((item, index) => (
                <div 
                  key={item.day}
                  className={`flex justify-between items-center px-6 py-4 ${
                    index !== hours.length - 1 
                      ? isLightTheme ? 'border-b border-slate-100' : 'border-b border-white/10' 
                      : ''
                  }`}
                >
                  <span className={`font-medium ${themeConfig.textPrimary}`}>{item.day}</span>
                  <span 
                    className={`font-bold px-4 py-1.5 rounded-full text-sm ${
                      !item.open ? 'text-red-500 bg-red-50' : ''
                    }`}
                    style={item.open ? { 
                      backgroundColor: `${config.primaryColor}15`,
                      color: config.primaryColor 
                    } : {}}
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const testimonials = [
    { name: 'Marie Lavoie', role: 'Cliente fidèle', text: 'Service exceptionnel! L\'équipe est professionnelle et à l\'écoute. Je recommande à 100%.', rating: 5 },
    { name: 'Pierre Dubois', role: 'Entrepreneur', text: 'Travail de qualité et respect des délais. Je suis très satisfait du résultat final.', rating: 5 },
    { name: 'Sophie Martin', role: 'Directrice', text: 'Une expérience client remarquable du début à la fin. Merci pour votre professionnalisme!', rating: 5 },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? `linear-gradient(180deg, white 0%, ${config.primaryColor}05 50%, white 100%)`
          : themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} variant="alt" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
            style={{ 
              backgroundColor: `${config.primaryColor}15`,
              color: config.primaryColor,
              border: `1px solid ${config.primaryColor}25`
            }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Témoignages</span>
            <MessageCircle className="w-4 h-4" />
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
            Ce que nos clients
          </h2>
          <h3 
            className="text-3xl md:text-4xl font-black"
            style={{ color: config.primaryColor }}
          >
            disent de nous
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`group p-7 rounded-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 ${
                isLightTheme 
                  ? 'bg-white shadow-lg hover:shadow-xl' 
                  : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className={`${themeConfig.textSecondary} mb-6 leading-relaxed`}>
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className={`font-bold ${themeConfig.textPrimary}`}>{testimonial.name}</p>
                  <p className={`text-sm ${themeConfig.textSecondary}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ContactSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const contactItems = [
    { icon: Phone, label: 'Téléphone', value: '+1 (555) 123-4567', action: 'Appeler' },
    { icon: Mail, label: 'Courriel', value: 'contact@entreprise.com', action: 'Écrire' },
    { icon: MapPin, label: 'Adresse', value: '123 Rue Principale, Montréal', action: 'Itinéraire' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)' 
          : themeConfig.sectionAlt || themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ 
                backgroundColor: `${config.primaryColor}15`,
                color: config.primaryColor,
                border: `1px solid ${config.primaryColor}25`
              }}
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Contactez-nous
            </h2>
            <h3 
              className="text-3xl md:text-4xl font-black"
              style={{ color: config.primaryColor }}
            >
              facilement
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactItems.map((item, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 ${
                  isLightTheme 
                    ? 'bg-white shadow-lg hover:shadow-xl' 
                    : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
                }`}
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-5 transition-transform group-hover:scale-110"
                  style={{ 
                    backgroundColor: config.primaryColor,
                    boxShadow: `0 4px 20px ${config.primaryColor}30`
                  }}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <p className={`text-sm font-semibold uppercase tracking-wide ${themeConfig.textSecondary} mb-1`}>{item.label}</p>
                <p className={`font-bold ${themeConfig.textPrimary} mb-5`}>{item.value}</p>
                <Button 
                  variant="outline"
                  className="rounded-full px-6 font-bold transition-all hover:scale-105"
                  style={{ 
                    borderColor: config.primaryColor,
                    color: config.primaryColor
                  }}
                >
                  {item.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { q: 'Quels sont vos délais de réalisation?', a: 'Nos délais varient selon la complexité du projet. En général, comptez entre 2 et 4 semaines pour un projet standard. Nous vous fournirons un calendrier détaillé lors de notre première consultation.' },
    { q: 'Offrez-vous une garantie sur vos services?', a: 'Oui, tous nos services sont garantis. Nous offrons une garantie de satisfaction et un suivi après-vente pour nous assurer que vous êtes pleinement satisfait du résultat.' },
    { q: 'Comment puis-je obtenir une soumission?', a: 'Vous pouvez demander une soumission gratuite directement sur notre site web, par téléphone ou par courriel. Nous vous répondrons dans les 24 heures ouvrables.' },
    { q: 'Quels modes de paiement acceptez-vous?', a: 'Nous acceptons les cartes de crédit, les virements bancaires et les paiements échelonnés pour les projets importants. Discutons de vos besoins!' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? `linear-gradient(135deg, white 0%, ${config.primaryColor}05 100%)`
          : themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
              style={{ 
                backgroundColor: `${config.primaryColor}15`,
                color: config.primaryColor,
                border: `1px solid ${config.primaryColor}25`
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
              Questions
            </h2>
            <h3 
              className="text-3xl md:text-4xl font-black"
              style={{ color: config.primaryColor }}
            >
              fréquentes
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden transition-all ${
                  isLightTheme 
                    ? 'bg-white shadow-md hover:shadow-lg' 
                    : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full p-6 text-left flex justify-between items-center gap-4 ${themeConfig.textPrimary}`}
                >
                  <span className="font-bold">{faq.q}</span>
                  <div 
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ 
                      backgroundColor: openIndex === index ? config.primaryColor : `${config.primaryColor}15`,
                      color: openIndex === index ? 'white' : config.primaryColor
                    }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className={`px-6 pb-6 ${themeConfig.textSecondary} leading-relaxed`}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const TeamSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const team = [
    { name: 'Jean Dupont', role: 'Directeur général', initials: 'JD' },
    { name: 'Marie Lavoie', role: 'Responsable clientèle', initials: 'ML' },
    { name: 'Pierre Bernard', role: 'Expert technique', initials: 'PB' },
    { name: 'Sophie Martin', role: 'Coordinatrice', initials: 'SM' },
  ];

  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ 
        background: isLightTheme 
          ? 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)' 
          : themeConfig.sectionAlt || themeConfig.sectionBg 
      }}
    >
      <GradientBackground color={config.primaryColor} isLight={isLightTheme} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 font-bold text-sm tracking-wide uppercase"
            style={{ 
              backgroundColor: `${config.primaryColor}15`,
              color: config.primaryColor,
              border: `1px solid ${config.primaryColor}25`
            }}
          >
            <Users className="w-4 h-4" />
            <span>Notre équipe</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-2`}>
            Des experts
          </h2>
          <h3 
            className="text-3xl md:text-4xl font-black"
            style={{ color: config.primaryColor }}
          >
            à votre service
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`group p-7 rounded-2xl text-center transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 ${
                isLightTheme 
                  ? 'bg-white shadow-lg hover:shadow-xl' 
                  : 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
              }`}
            >
              <div 
                className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-5 transition-transform group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor || config.primaryColor})`,
                  boxShadow: `0 4px 20px ${config.primaryColor}30`
                }}
              >
                {member.initials}
              </div>
              <p className={`font-bold text-lg ${themeConfig.textPrimary} mb-1`}>{member.name}</p>
              <p 
                className="text-sm font-semibold px-4 py-1.5 rounded-full inline-block"
                style={{ 
                  backgroundColor: `${config.primaryColor}10`,
                  color: config.primaryColor 
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
