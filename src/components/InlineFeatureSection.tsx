import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DemoConfig } from "./DemoGenerator";
import { 
  Calendar, Clock, Phone, Mail, MapPin, CreditCard,
  Star, ArrowRight, Send, ChevronDown, Users, FileText
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

export const AppointmentSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(15);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  return (
    <section className={`py-20 ${themeConfig.sectionAlt || themeConfig.sectionBg || 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-semibold">Réservation en ligne</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary}`}>
              Prenez rendez-vous facilement
            </h2>
            <p className={`mt-3 ${themeConfig.textSecondary}`}>
              Choisissez votre créneau en quelques clics
            </p>
          </div>

          <div className={`rounded-2xl p-8 ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-sm border border-white/10'}`}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendrier */}
              <div>
                <h3 className={`font-bold mb-4 ${themeConfig.textPrimary}`}>Sélectionnez une date</h3>
                <div className={`rounded-xl p-4 ${isLightTheme ? 'bg-slate-50' : 'bg-white/5'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`font-semibold ${themeConfig.textPrimary}`}>Décembre 2024</span>
                    <div className="flex gap-2">
                      <button className={`p-2 rounded-lg hover:bg-slate-200/50 ${themeConfig.textSecondary}`}>←</button>
                      <button className={`p-2 rounded-lg hover:bg-slate-200/50 ${themeConfig.textSecondary}`}>→</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                      <div key={i} className={`text-center text-xs font-medium py-2 ${themeConfig.textSecondary}`}>{day}</div>
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
                          className={`text-center py-2 text-sm rounded-lg transition-all ${
                            isSelected 
                              ? 'text-white font-bold scale-110' 
                              : isPast 
                                ? `${themeConfig.textSecondary} opacity-40 cursor-not-allowed`
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

              {/* Créneaux horaires */}
              <div>
                <h3 className={`font-bold mb-4 ${themeConfig.textPrimary}`}>Créneaux disponibles</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        selectedTime === time 
                          ? 'text-white scale-105' 
                          : isLightTheme 
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                      style={selectedTime === time ? { backgroundColor: config.primaryColor } : {}}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {selectedDate && selectedTime && (
                  <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: `${config.primaryColor}15` }}>
                    <p className={`text-sm ${themeConfig.textSecondary} mb-2`}>Votre sélection :</p>
                    <p className="font-bold" style={{ color: config.primaryColor }}>
                      {selectedDate} décembre 2024 à {selectedTime}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button 
              className="w-full mt-8 h-14 text-lg font-bold text-white rounded-xl"
              style={{ backgroundColor: config.primaryColor }}
              disabled={!selectedDate || !selectedTime}
            >
              Confirmer le rendez-vous
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const QuoteFormSection = ({ config, themeConfig, isLightTheme }: Omit<InlineFeatureSectionProps, 'featureName'>) => {
  return (
    <section className={`py-20 ${themeConfig.sectionBg || 'bg-slate-900'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-semibold">Soumission gratuite</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary}`}>
              Demandez votre soumission
            </h2>
            <p className={`mt-3 ${themeConfig.textSecondary}`}>
              Recevez une estimation personnalisée sous 24h
            </p>
          </div>

          <div className={`rounded-2xl p-8 ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-sm border border-white/10'}`}>
            <div className="grid md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Votre nom complet"
                className={`px-5 py-4 rounded-xl border-2 transition-colors focus:outline-none ${
                  isLightTheme 
                    ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                }`}
              />
              <input 
                type="email" 
                placeholder="Votre courriel"
                className={`px-5 py-4 rounded-xl border-2 transition-colors focus:outline-none ${
                  isLightTheme 
                    ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                    : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
                }`}
              />
            </div>
            <input 
              type="tel" 
              placeholder="Votre téléphone"
              className={`w-full mt-4 px-5 py-4 rounded-xl border-2 transition-colors focus:outline-none ${
                isLightTheme 
                  ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                  : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
              }`}
            />
            <select 
              className={`w-full mt-4 px-5 py-4 rounded-xl border-2 transition-colors focus:outline-none ${
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
              className={`w-full mt-4 px-5 py-4 rounded-xl border-2 transition-colors focus:outline-none resize-none ${
                isLightTheme 
                  ? 'bg-slate-50 border-slate-200 focus:border-slate-400 text-slate-900' 
                  : 'bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50'
              }`}
            />
            <Button 
              className="w-full mt-6 h-14 text-lg font-bold text-white rounded-xl"
              style={{ backgroundColor: config.primaryColor }}
            >
              <Send className="w-5 h-5 mr-2" />
              Envoyer ma demande
            </Button>
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
    <section className={`py-20 ${themeConfig.sectionAlt || 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">Horaires</span>
              </div>
              <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary} mb-4`}>
                Nos heures d'ouverture
              </h2>
              <p className={`${themeConfig.textSecondary} mb-6`}>
                Notre équipe est disponible pour vous accueillir aux horaires suivants
              </p>
              <div 
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-semibold" style={{ color: config.primaryColor }}>
                  Actuellement ouvert
                </span>
              </div>
            </div>

            <div className={`rounded-2xl overflow-hidden ${isLightTheme ? 'bg-white shadow-xl' : 'bg-white/5 backdrop-blur-sm border border-white/10'}`}>
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
                    className={`font-semibold ${item.open ? '' : 'text-red-500'}`}
                    style={item.open ? { color: config.primaryColor } : {}}
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
    <section className={`py-20 ${themeConfig.sectionBg || 'bg-slate-900'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">Témoignages</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary}`}>
            Ce que nos clients disent
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`p-6 rounded-2xl ${isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 backdrop-blur-sm border border-white/10'}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className={`${themeConfig.textSecondary} mb-6 italic`}>"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
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
  return (
    <section className={`py-20 ${themeConfig.sectionAlt || 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-semibold">Contact</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary}`}>
              Contactez-nous
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: 'Téléphone', value: '+1 (555) 123-4567', action: 'Appeler' },
              { icon: Mail, label: 'Courriel', value: 'contact@entreprise.com', action: 'Écrire' },
              { icon: MapPin, label: 'Adresse', value: '123 Rue Principale, Montréal', action: 'Itinéraire' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-6 rounded-2xl text-center group hover:scale-105 transition-transform ${
                  isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 backdrop-blur-sm border border-white/10'
                }`}
              >
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <item.icon className="w-8 h-8" />
                </div>
                <p className={`text-sm ${themeConfig.textSecondary} mb-1`}>{item.label}</p>
                <p className={`font-bold ${themeConfig.textPrimary} mb-4`}>{item.value}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full"
                  style={{ borderColor: config.primaryColor, color: config.primaryColor }}
                >
                  {item.action}
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
    <section className={`py-20 ${themeConfig.sectionBg || 'bg-slate-900'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
            >
              <span className="text-sm font-semibold">FAQ</span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary}`}>
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden ${
                  isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 backdrop-blur-sm border border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full p-6 text-left flex justify-between items-center gap-4 ${themeConfig.textPrimary}`}
                >
                  <span className="font-bold">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                    style={{ color: config.primaryColor }}
                  />
                </button>
                {openIndex === index && (
                  <div className={`px-6 pb-6 ${themeConfig.textSecondary}`}>
                    {faq.a}
                  </div>
                )}
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
    <section className={`py-20 ${themeConfig.sectionAlt || 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">Notre équipe</span>
          </div>
          <h2 className={`text-3xl md:text-4xl font-black ${themeConfig.textPrimary}`}>
            Des experts à votre service
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              className={`p-6 rounded-2xl text-center group hover:scale-105 transition-transform ${
                isLightTheme ? 'bg-white shadow-lg' : 'bg-white/5 backdrop-blur-sm border border-white/10'
              }`}
            >
              <div 
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}
              >
                {member.initials}
              </div>
              <p className={`font-bold ${themeConfig.textPrimary}`}>{member.name}</p>
              <p className={`text-sm ${themeConfig.textSecondary}`}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
