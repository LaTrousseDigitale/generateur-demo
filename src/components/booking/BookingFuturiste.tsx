import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, Star, ArrowRight, Phone, Mail, MapPin,
  Zap, Sparkles, CheckCircle2, ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";

interface BookingFuturisteProps {
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
 * FUTURISTE: Neon, glassmorphism, animated elements
 * - Centered hero with floating cards
 * - Glowing service cards
 * - Animated time picker
 * - Particle effects
 */
export const BookingFuturiste = ({ 
  config, services, currentTitles, heroImage, timeSlots, stats, onBooking 
}: BookingFuturisteProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("15");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const dates = [
    { day: "15", name: "Lun" },
    { day: "16", name: "Mar" },
    { day: "17", name: "Mer" },
    { day: "18", name: "Jeu" },
    { day: "19", name: "Ven" },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white pt-20 relative overflow-hidden">
      {/* Animated grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Cursor glow */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/50 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* HERO: Centered with stats */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 lg:px-8 relative">
        {/* Glowing orbs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Glowing badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span className="text-indigo-200 font-medium">{currentTitles.badge}</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 leading-[0.85]">
            {currentTitles.heroTitle.split('\n').map((line, i) => (
              <span 
                key={i} 
                className={`block ${i === 1 ? 'bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400' : ''}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            {currentTitles.heroSubtitle}
          </p>

          {/* CTA */}
          <Button 
            size="lg"
            className="rounded-full px-12 py-7 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_40px_rgba(99,102,241,0.5)]"
          >
            <Calendar className="w-6 h-6 mr-2" />
            Réserver
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mt-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES: Glowing cards */}
      <section className="py-24 px-4 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-500/30 px-6 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {currentTitles.badge}
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-black mb-4">
              {currentTitles.title.split(' ')[0]}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                {currentTitles.title.split(' ').slice(1).join(' ')}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div 
                key={i}
                className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl border overflow-hidden cursor-pointer transition-all duration-500 ${
                  selectedService === service.name 
                    ? 'border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.4)]' 
                    : 'border-white/10 hover:border-white/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                }`}
                style={{
                  transform: selectedService === service.name ? 'translateY(-8px) scale(1.02)' : '',
                }}
                onClick={() => setSelectedService(service.name)}
              >
                {/* Glowing border effect */}
                <div 
                  className={`absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none ${
                    selectedService === service.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.3), transparent, rgba(168,85,247,0.3))',
                    padding: '1px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                  }}
                />

                <div className="p-8 relative z-10">
                  {service.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Top
                    </Badge>
                  )}

                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                  >
                    <service.icon className="w-8 h-8 text-indigo-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{service.name}</h3>
                  <p className="text-slate-400 mb-6">{service.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                      {service.price}
                    </span>
                  </div>

                  {selectedService === service.name && (
                    <div className="mt-4 flex items-center gap-2 text-indigo-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Sélectionné</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIME PICKER: Futuristic calendar */}
      <section className="py-24 px-4 lg:px-8 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">
              Choisissez votre{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                créneau
              </span>
            </h2>
          </div>

          {/* Date selector - Futuristic style */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-10 justify-center">
            {dates.map((date) => (
              <button
                key={date.day}
                onClick={() => setSelectedDate(date.day)}
                className={`flex flex-col items-center px-6 py-4 rounded-2xl transition-all ${
                  selectedDate === date.day
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.5)]'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <span className="text-sm opacity-70">{date.name}</span>
                <span className="text-2xl font-bold">{date.day}</span>
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
                className={`py-5 rounded-xl font-medium transition-all ${
                  !slot.available
                    ? 'bg-white/5 text-slate-700 cursor-not-allowed'
                    : selectedTime === slot.time
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]'
                    : 'bg-white/5 backdrop-blur-xl border border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>

          {/* Confirm */}
          {selectedService && selectedTime && (
            <div className="mt-12 text-center">
              <Button 
                size="lg"
                className="rounded-full px-12 py-7 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_40px_rgba(99,102,241,0.5)]"
                onClick={() => onBooking(selectedService, selectedDate, selectedTime)}
              >
                Confirmer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT: Glowing cards */}
      <section className="py-24 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: "Téléphone", value: "+1 (514) 123-4567" },
              { icon: Mail, label: "Email", value: `contact@demo.com` },
              { icon: MapPin, label: "Adresse", value: "123 Rue Principale" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="font-bold text-white mb-2">{item.label}</h4>
                <p className="text-slate-400">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
