import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { 
  Calendar, Clock, Phone, Mail, MapPin, CreditCard,
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

// Floating decoration component for visual interest
const FloatingShapes = ({ color, variant = 'default' }: { color: string; variant?: 'default' | 'minimal' | 'dots' }) => {
  if (variant === 'dots') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color, opacity: 0.3 }} />
        <div className="absolute top-20 right-20 w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: color, opacity: 0.2, animationDelay: '0.5s' }} />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color, opacity: 0.25, animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/3 w-4 h-4 rounded-full animate-pulse" style={{ backgroundColor: color, opacity: 0.15, animationDelay: '1.5s' }} />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: color }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: color }}
        />
      </div>
    );
  }

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
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-5"
        style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
      />
    </div>
  );
};

export const AppointmentSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionAlt || themeConfig.sectionBg || 'bg-slate-50'}`}>
      <FloatingShapes color={config.primaryColor} variant="minimal" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
                borderColor: `${config.primaryColor}30`,
                color: config.primaryColor 
              }}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">Réservation en ligne</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
              Prenez rendez-vous
              <span className="block mt-2" style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                en quelques clics
              </span>
            </h2>
            <p className={`text-lg ${themeConfig.textSecondary} max-w-xl mx-auto`}>
              Sélectionnez votre date et heure préférées. Notre équipe vous attend.
            </p>
          </div>

          {/* Premium Card */}
          <div 
            className={`rounded-3xl p-8 md:p-10 relative overflow-hidden ${
              isLightTheme 
                ? 'bg-white shadow-2xl shadow-slate-200/50' 
                : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10'
            }`}
          >
            {/* Inner glow */}
            <div 
              className="absolute inset-0 opacity-5 rounded-3xl"
              style={{ background: `radial-gradient(circle at 30% 0%, ${config.primaryColor}, transparent 50%)` }}
            />
            
            <div className="grid md:grid-cols-2 gap-10 relative z-10">
              {/* Calendar */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
                  >
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-bold text-lg ${themeConfig.textPrimary}`}>Sélectionnez une date</h3>
                </div>
                <div className={`rounded-2xl p-5 ${isLightTheme ? 'bg-slate-50/80' : 'bg-white/5 border border-white/10'}`}>
                  <div className="flex justify-between items-center mb-5">
                    <span className={`font-bold ${themeConfig.textPrimary}`}>Décembre 2024</span>
                    <div className="flex gap-1">
                      <button className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isLightTheme ? 'hover:bg-slate-200' : 'hover:bg-white/10'
                      } ${themeConfig.textSecondary}`}>←</button>
                      <button className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isLightTheme ? 'hover:bg-slate-200' : 'hover:bg-white/10'
                      } ${themeConfig.textSecondary}`}>→</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                      <div key={i} className={`text-center text-xs font-bold py-2 ${themeConfig.textSecondary} uppercase`}>{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isSelected = selectedDate === day;
                      const isPast = day < 10;
                      return (
                        <button
                          key={i}
                          onClick={() => !isPast && setSelectedDate(day)}
                          disabled={isPast}
                          className={`relative text-center py-2.5 text-sm rounded-xl transition-all font-medium ${
                            isSelected 
                              ? 'text-white font-bold transform scale-110 shadow-lg' 
                              : isPast 
                                ? `${themeConfig.textSecondary} opacity-30 cursor-not-allowed`
                                : `${themeConfig.textPrimary} hover:scale-105`
                          }`}
                          style={isSelected ? { 
                            background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                            boxShadow: `0 4px 20px ${config.primaryColor}40`
                          } : {}}
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
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${config.accentColor}, ${config.primaryColor})` }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`font-bold text-lg ${themeConfig.textPrimary}`}>Créneaux disponibles</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`relative px-4 py-3.5 rounded-xl text-sm font-bold transition-all overflow-hidden group ${
                        selectedTime === time 
                          ? 'text-white shadow-lg transform scale-105' 
                          : isLightTheme 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:scale-105' 
                            : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white hover:scale-105'
                      }`}
                      style={selectedTime === time ? { 
                        background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                        boxShadow: `0 4px 20px ${config.primaryColor}40`
                      } : {}}
                    >
                      <span className="relative z-10">{time}</span>
                      {selectedTime === time && (
                        <CheckCircle2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80" />
                      )}
                    </button>
                  ))}
                </div>

                {selectedDate && selectedTime && (
                  <div 
                    className="mt-6 p-5 rounded-2xl border backdrop-blur-sm"
                    style={{ 
                      background: `linear-gradient(135deg, ${config.primaryColor}15, ${config.primaryColor}05)`,
                      borderColor: `${config.primaryColor}30`
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                      <div>
                        <p className={`text-sm ${themeConfig.textSecondary}`}>Votre sélection :</p>
                        <p className="font-bold text-lg" style={{ color: config.primaryColor }}>
                          {selectedDate} décembre 2024 à {selectedTime}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button 
              className="w-full mt-10 h-16 text-lg font-bold text-white rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl group"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                boxShadow: `0 8px 30px ${config.primaryColor}30`
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
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionBg || 'bg-slate-900'}`}>
      <FloatingShapes color={config.primaryColor} />
      <FloatingShapes color={config.primaryColor} variant="dots" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
                borderColor: `${config.primaryColor}30`,
                color: config.primaryColor 
              }}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">Soumission gratuite</span>
              <Award className="w-4 h-4" />
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
              Demandez votre
              <span className="block mt-2" style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                estimation personnalisée
              </span>
            </h2>
            <p className={`text-lg ${themeConfig.textSecondary} max-w-xl mx-auto`}>
              Recevez une soumission détaillée sous 24h. Sans engagement.
            </p>
          </div>

          {/* Premium Form Card */}
          <div 
            className={`rounded-3xl p-8 md:p-10 relative overflow-hidden ${
              isLightTheme 
                ? 'bg-white shadow-2xl shadow-slate-200/50' 
                : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10'
            }`}
          >
            <div 
              className="absolute inset-0 opacity-5 rounded-3xl"
              style={{ background: `radial-gradient(circle at 70% 0%, ${config.primaryColor}, transparent 50%)` }}
            />
            
            <div className="relative z-10 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Votre nom complet"
                    className={`w-full px-6 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:scale-[1.02] ${
                      isLightTheme 
                        ? 'bg-slate-50/80 border-slate-200 focus:border-slate-400 text-slate-900' 
                        : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                    }`}
                    style={{ '--tw-ring-color': config.primaryColor } as React.CSSProperties}
                  />
                </div>
                <input 
                  type="email" 
                  placeholder="Votre courriel"
                  className={`px-6 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:scale-[1.02] ${
                    isLightTheme 
                      ? 'bg-slate-50/80 border-slate-200 focus:border-slate-400 text-slate-900' 
                      : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                  }`}
                />
              </div>
              <input 
                type="tel" 
                placeholder="Votre téléphone"
                className={`w-full px-6 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:scale-[1.02] ${
                  isLightTheme 
                    ? 'bg-slate-50/80 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                }`}
              />
              <select 
                className={`w-full px-6 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:scale-[1.02] ${
                  isLightTheme 
                    ? 'bg-slate-50/80 border-slate-200 focus:border-slate-400 text-slate-900' 
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
                className={`w-full px-6 py-4 rounded-2xl border-2 transition-all focus:outline-none focus:scale-[1.02] resize-none ${
                  isLightTheme 
                    ? 'bg-slate-50/80 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                }`}
              />
              <Button 
                className="w-full h-16 text-lg font-bold text-white rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl group"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                  boxShadow: `0 8px 30px ${config.primaryColor}30`
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
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionAlt || 'bg-slate-50'}`}>
      <FloatingShapes color={config.primaryColor} variant="minimal" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
                  borderColor: `${config.primaryColor}30`,
                  color: config.primaryColor 
                }}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide uppercase">Horaires</span>
              </div>
              <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-5`}>
                Nos heures
                <span className="block mt-2" style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  d'ouverture
                </span>
              </h2>
              <p className={`text-lg ${themeConfig.textSecondary} mb-8`}>
                Notre équipe est disponible pour vous accueillir aux horaires suivants
              </p>
              <div 
                className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-sm"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}15, ${config.primaryColor}05)`,
                  borderColor: `${config.primaryColor}30`
                }}
              >
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-500 animate-ping opacity-75" />
                </div>
                <span className="font-bold text-lg" style={{ color: config.primaryColor }}>
                  Actuellement ouvert
                </span>
              </div>
            </div>

            <div 
              className={`rounded-3xl overflow-hidden ${
                isLightTheme 
                  ? 'bg-white shadow-2xl shadow-slate-200/50' 
                  : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10'
              }`}
            >
              {hours.map((item, index) => (
                <div 
                  key={item.day}
                  className={`flex justify-between items-center px-7 py-5 transition-all hover:bg-white/5 ${
                    index !== hours.length - 1 
                      ? isLightTheme ? 'border-b border-slate-100' : 'border-b border-white/10' 
                      : ''
                  }`}
                >
                  <span className={`font-semibold ${themeConfig.textPrimary}`}>{item.day}</span>
                  <span 
                    className={`font-bold px-4 py-1.5 rounded-full text-sm ${
                      item.open 
                        ? '' 
                        : isLightTheme ? 'bg-red-50 text-red-500' : 'bg-red-500/20 text-red-400'
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
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionBg || 'bg-slate-900'}`}>
      <FloatingShapes color={config.primaryColor} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
            style={{ 
              background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
              borderColor: `${config.primaryColor}30`,
              color: config.primaryColor 
            }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold tracking-wide uppercase">Témoignages</span>
            <MessageCircle className="w-4 h-4" />
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
            Ce que nos clients
            <span className="block mt-2" style={{ 
              background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              disent de nous
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                isLightTheme 
                  ? 'bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl' 
                  : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote mark */}
              <div 
                className="text-6xl font-serif leading-none opacity-20 mb-4"
                style={{ color: config.primaryColor }}
              >
                "
              </div>
              
              <div className="flex gap-1 mb-5">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className={`${themeConfig.textSecondary} mb-8 text-lg leading-relaxed`}>
                {testimonial.text}
              </p>
              
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-transform group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                    boxShadow: `0 4px 20px ${config.primaryColor}30`
                  }}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className={`font-bold text-lg ${themeConfig.textPrimary}`}>{testimonial.name}</p>
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
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionAlt || 'bg-slate-50'}`}>
      <FloatingShapes color={config.primaryColor} variant="minimal" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
                borderColor: `${config.primaryColor}30`,
                color: config.primaryColor 
              }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">Contact</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
              Contactez-nous
              <span className="block mt-2" style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                facilement
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactItems.map((item, index) => (
              <div 
                key={index}
                className={`group p-8 rounded-3xl text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                  isLightTheme 
                    ? 'bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl' 
                    : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
                }`}
              >
                <div 
                  className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white mb-6 transition-all group-hover:scale-110 group-hover:rotate-3"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                    boxShadow: `0 8px 30px ${config.primaryColor}30`
                  }}
                >
                  <item.icon className="w-9 h-9" />
                </div>
                <p className={`text-sm font-semibold uppercase tracking-wide ${themeConfig.textSecondary} mb-2`}>{item.label}</p>
                <p className={`font-bold text-lg ${themeConfig.textPrimary} mb-6`}>{item.value}</p>
                <Button 
                  className="rounded-full px-8 font-bold transition-all hover:scale-105"
                  style={{ 
                    background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${config.primaryColor}30`
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
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionBg || 'bg-slate-900'}`}>
      <FloatingShapes color={config.primaryColor} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
              style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
                borderColor: `${config.primaryColor}30`,
                color: config.primaryColor 
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide uppercase">FAQ</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
              Questions
              <span className="block mt-2" style={{ 
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                fréquentes
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden transition-all ${
                  openIndex === index ? 'scale-[1.02]' : ''
                } ${
                  isLightTheme 
                    ? 'bg-white shadow-lg hover:shadow-xl' 
                    : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full p-6 text-left flex justify-between items-center gap-4 ${themeConfig.textPrimary} transition-all`}
                >
                  <span className="font-bold text-lg">{faq.q}</span>
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    style={{ 
                      background: openIndex === index 
                        ? `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`
                        : `${config.primaryColor}15`,
                      color: openIndex === index ? 'white' : config.primaryColor
                    }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className={`px-6 pb-6 ${themeConfig.textSecondary} text-lg leading-relaxed`}>
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
    <section className={`relative py-24 overflow-hidden ${themeConfig.sectionAlt || 'bg-slate-50'}`}>
      <FloatingShapes color={config.primaryColor} variant="minimal" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border"
            style={{ 
              background: `linear-gradient(135deg, ${config.primaryColor}20, ${config.primaryColor}05)`,
              borderColor: `${config.primaryColor}30`,
              color: config.primaryColor 
            }}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide uppercase">Notre équipe</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-black ${themeConfig.textPrimary} mb-4`}>
            Des experts
            <span className="block mt-2" style={{ 
              background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              à votre service
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-3xl text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                isLightTheme 
                  ? 'bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl' 
                  : 'bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20'
              }`}
            >
              <div 
                className="w-28 h-28 mx-auto rounded-3xl flex items-center justify-center text-white text-3xl font-bold mb-6 transition-all group-hover:scale-110 group-hover:rotate-3"
                style={{ 
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})`,
                  boxShadow: `0 8px 30px ${config.primaryColor}30`
                }}
              >
                {member.initials}
              </div>
              <p className={`font-bold text-lg ${themeConfig.textPrimary} mb-1`}>{member.name}</p>
              <p 
                className="text-sm font-semibold px-4 py-1.5 rounded-full inline-block"
                style={{ 
                  backgroundColor: `${config.primaryColor}15`,
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
