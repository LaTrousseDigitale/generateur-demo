import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, MapPin, Star, ArrowRight, Phone, Mail,
  Leaf, Award, Quote, CheckCircle2
} from "lucide-react";
import { useState } from "react";

interface BookingRustiqueProps {
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
 * RUSTIQUE: Warm, textured, overlapping elements
 * - Bento-style hero layout
 * - Cards with image backgrounds
 * - Warm amber tones
 * - Testimonial integration
 */
export const BookingRustique = ({ 
  config, services, currentTitles, heroImage, timeSlots, stats, onBooking 
}: BookingRustiqueProps) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("Lun 15");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = ["Lun 15", "Mar 16", "Mer 17", "Jeu 18", "Ven 19"];

  return (
    <div className="bg-stone-950 min-h-screen text-stone-100 pt-20">
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* HERO: Bento grid */}
      <section className="p-4 lg:p-8 min-h-[90vh]">
        <div className="grid grid-cols-12 grid-rows-4 gap-4 h-full">
          {/* Main content */}
          <div className="col-span-12 lg:col-span-5 row-span-2 bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-8 lg:p-12 flex flex-col justify-between border border-amber-900/20">
            <div>
              <Badge className="mb-6 bg-amber-900/30 text-amber-200 border border-amber-800/30 px-4 py-2">
                <Leaf className="w-4 h-4 mr-2" />
                {currentTitles.badge}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-black text-amber-50 leading-[0.9] mb-6">
                {currentTitles.heroTitle.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
              <p className="text-lg text-stone-400 max-w-md">
                {currentTitles.heroSubtitle}
              </p>
            </div>
            <Button 
              size="lg"
              className="mt-8 rounded-full bg-amber-700 hover:bg-amber-600 text-white font-semibold px-8 w-fit"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Réserver
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Main image */}
          <div className="col-span-12 lg:col-span-7 row-span-3 rounded-3xl overflow-hidden relative">
            <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
            
            {/* Floating testimonial */}
            <div className="absolute bottom-6 left-6 right-6 bg-stone-900/90 backdrop-blur-xl rounded-2xl p-6 border border-amber-900/30">
              <div className="flex items-start gap-4">
                <Quote className="w-8 h-8 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-stone-300 italic mb-3">
                    "Une expérience exceptionnelle, je recommande vivement!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white text-sm font-bold">
                      SC
                    </div>
                    <span className="text-amber-200 font-medium">Sophie C.</span>
                    <div className="flex gap-0.5 ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          {stats.slice(0, 2).map((stat, i) => (
            <div 
              key={i}
              className="col-span-6 lg:col-span-2 lg:col-start-1 row-span-1 bg-stone-900/50 rounded-2xl p-5 border border-amber-900/20 flex flex-col justify-center"
            >
              <div className="text-3xl font-black text-amber-400">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-stone-500 mt-1">{stat.label}</div>
            </div>
          ))}

          {/* Award card */}
          <div className="col-span-12 lg:col-span-3 row-span-1 bg-gradient-to-br from-amber-900/30 to-stone-900 rounded-2xl p-5 border border-amber-800/30 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-amber-900/50 flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-amber-50">Excellence 2024</div>
              <div className="text-sm text-stone-500">Meilleur service client</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES: Horizontal scroll cards with images */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-amber-900/30 text-amber-200 border border-amber-800/30 px-6 py-2">
              {currentTitles.badge}
            </Badge>
            <h2 className="text-4xl font-black text-amber-50 mb-4">{currentTitles.title}</h2>
            <p className="text-xl text-stone-400">{currentTitles.subtitle}</p>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4">
            {services.map((service, i) => (
              <div 
                key={i}
                className={`flex-shrink-0 w-80 snap-center rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                  selectedService === service.name 
                    ? 'border-amber-500 shadow-[0_0_30px_rgba(180,83,9,0.3)]' 
                    : 'border-amber-900/20 hover:border-amber-800/40'
                }`}
                onClick={() => setSelectedService(service.name)}
              >
                <div className="relative h-48">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
                  {service.popular && (
                    <Badge className="absolute top-4 left-4 bg-amber-700 text-white border-0">
                      Populaire
                    </Badge>
                  )}
                </div>
                <div className="bg-gradient-to-br from-stone-900 to-stone-800 p-6">
                  <h3 className="text-xl font-bold text-amber-50 mb-2">{service.name}</h3>
                  <p className="text-stone-400 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-amber-900/20">
                    <div className="flex items-center gap-2 text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="text-xl font-bold text-amber-400">{service.price}</span>
                  </div>
                  {selectedService === service.name && (
                    <div className="mt-4 flex items-center gap-2 text-amber-400">
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

      {/* TIME PICKER: Warm cards */}
      <section className="py-20 px-4 lg:px-8 bg-stone-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-amber-50 mb-4">Choisissez votre moment</h2>
            <p className="text-stone-400">Sélectionnez une date et un horaire qui vous convient</p>
          </div>

          {/* Date selector */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-8 justify-center">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-6 py-4 rounded-xl font-medium transition-all whitespace-nowrap ${
                  selectedDate === date
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/50'
                    : 'bg-stone-800 text-stone-300 border border-amber-900/20 hover:border-amber-800/40'
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Time grid */}
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((slot, i) => (
              <button
                key={i}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`py-4 rounded-xl font-medium transition-all ${
                  !slot.available
                    ? 'bg-stone-800/50 text-stone-600 cursor-not-allowed'
                    : selectedTime === slot.time
                    ? 'bg-amber-700 text-white shadow-lg shadow-amber-900/50'
                    : 'bg-stone-800 text-stone-300 border border-amber-900/20 hover:border-amber-800/40'
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
                className="rounded-full px-12 py-6 text-lg font-semibold bg-amber-700 hover:bg-amber-600 text-white shadow-lg shadow-amber-900/50"
                onClick={() => onBooking(selectedService, selectedDate, selectedTime)}
              >
                Confirmer ma réservation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CONTACT: Warm footer */}
      <section className="py-20 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Phone, label: "Téléphone", value: "+1 (514) 123-4567" },
              { icon: Mail, label: "Email", value: `contact@${config.companyName.toLowerCase().replace(/\s/g, '')}.com` },
              { icon: MapPin, label: "Adresse", value: "123 Rue Principale, Montréal" },
            ].map((item, i) => (
              <div key={i} className="bg-stone-900/50 rounded-2xl p-6 text-center border border-amber-900/20">
                <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center bg-amber-900/30">
                  <item.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="font-bold text-amber-50 mb-2">{item.label}</h4>
                <p className="text-stone-400">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
