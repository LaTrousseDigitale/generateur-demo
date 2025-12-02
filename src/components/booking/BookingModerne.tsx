import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, MapPin, Users, Star, CheckCircle2, ArrowRight,
  Phone, Mail, Sparkles
} from "lucide-react";
import { useState } from "react";

interface BookingModerneProps {
  config: {
    primaryColor: string;
    accentColor: string;
    companyName: string;
    logo: string | null;
    industry: string;
  };
  services: Array<{ name: string; duration: string; price: string; icon: any; popular: boolean; image: string; description: string }>;
  currentTitles: { badge: string; title: string; subtitle: string; duration: string; heroTitle: string; heroSubtitle: string };
  heroImage: string;
  timeSlots: Array<{ time: string; available: boolean }>;
  stats: Array<{ value: number; suffix: string; label: string; icon: any }>;
  onBooking: (service: string, date: string, time: string) => void;
}

/**
 * MODERNE: Clean, minimal, card-based layout
 * - Two-column hero with large image
 * - Simple card grid for services
 * - Calendar-style time picker
 * - Lots of whitespace
 */
export const BookingModerne = ({ 
  config, services, currentTitles, heroImage, timeSlots, stats, onBooking 
}: BookingModerneProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Lundi 15");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = ["Lundi 15", "Mardi 16", "Mercredi 17", "Jeudi 18", "Vendredi 19"];

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* HERO: Clean split layout */}
      <section className="min-h-[80vh] grid lg:grid-cols-2 gap-0">
        {/* Left: Content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-24 py-16">
          <Badge className="mb-6 bg-slate-100 text-slate-700 w-fit px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" style={{ color: config.primaryColor }} />
            {currentTitles.badge}
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.9] mb-6">
            {currentTitles.heroTitle.split('\n').map((line, i) => (
              <span 
                key={i} 
                className="block"
                style={i === 1 ? { color: config.primaryColor } : {}}
              >
                {line}
              </span>
            ))}
          </h1>
          
          <p className="text-xl text-slate-500 max-w-md mb-10">
            {currentTitles.heroSubtitle}
          </p>
          
          <Button 
            size="lg" 
            className="rounded-full px-10 py-6 text-lg font-semibold text-white shadow-lg w-fit"
            style={{ backgroundColor: config.primaryColor }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Réserver maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {stats.slice(0, 3).map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-slate-900">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative h-full min-h-[400px] lg:min-h-0">
          <img 
            src={heroImage} 
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </section>

      {/* SERVICES: Clean card grid */}
      <section className="py-24 px-8 lg:px-16 xl:px-24 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-slate-200 text-slate-700">{currentTitles.badge}</Badge>
            <h2 className="text-4xl font-black text-slate-900 mb-4">{currentTitles.title}</h2>
            <p className="text-xl text-slate-500">{currentTitles.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i}
                className={`bg-white rounded-3xl p-8 border-2 transition-all duration-300 cursor-pointer ${
                  selectedService === service.name 
                    ? 'border-slate-900 shadow-xl' 
                    : 'border-transparent shadow-md hover:shadow-lg hover:-translate-y-1'
                }`}
                onClick={() => setSelectedService(service.name)}
              >
                {service.popular && (
                  <Badge 
                    className="mb-4 text-white"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    Populaire
                  </Badge>
                )}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${config.primaryColor}15` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: config.primaryColor }} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-slate-500 mb-4">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <span className="text-xl font-bold" style={{ color: config.primaryColor }}>
                    {service.price}
                  </span>
                </div>
                {selectedService === service.name && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <CheckCircle2 className="w-6 h-6" style={{ color: config.primaryColor }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIME PICKER: Calendar style */}
      <section className="py-24 px-8 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Choisissez votre créneau
            </h2>
            <p className="text-slate-500">Sélectionnez une date et un horaire disponible</p>
          </div>

          {/* Date selector */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 justify-center">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-6 py-4 rounded-2xl font-medium transition-all whitespace-nowrap ${
                  selectedDate === date
                    ? 'text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={selectedDate === date ? { backgroundColor: config.primaryColor } : {}}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-4 gap-4">
            {timeSlots.map((slot, i) => (
              <button
                key={i}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`py-4 rounded-xl font-medium transition-all ${
                  !slot.available
                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                    : selectedTime === slot.time
                    ? 'text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                style={selectedTime === slot.time && slot.available ? { backgroundColor: config.primaryColor } : {}}
              >
                {slot.time}
              </button>
            ))}
          </div>

          {/* Confirm button */}
          {selectedService && selectedTime && (
            <div className="mt-12 text-center">
              <Button 
                size="lg"
                className="rounded-full px-12 py-6 text-lg font-semibold text-white shadow-lg"
                style={{ backgroundColor: config.primaryColor }}
                onClick={() => onBooking(selectedService, selectedDate, selectedTime)}
              >
                Confirmer la réservation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT: Simple cards */}
      <section className="py-24 px-8 lg:px-16 xl:px-24 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <Phone className="w-6 h-6" style={{ color: config.primaryColor }} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Téléphone</h4>
              <p className="text-slate-500">+1 (514) 123-4567</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <Mail className="w-6 h-6" style={{ color: config.primaryColor }} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Email</h4>
              <p className="text-slate-500">contact@{config.companyName.toLowerCase().replace(/\s/g, '')}.com</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center">
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: `${config.primaryColor}15` }}
              >
                <MapPin className="w-6 h-6" style={{ color: config.primaryColor }} />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Adresse</h4>
              <p className="text-slate-500">123 Rue Principale, Montréal</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
