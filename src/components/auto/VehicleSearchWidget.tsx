import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Car, Sparkles } from "lucide-react";

interface VehicleSearchWidgetProps {
  onSearch: (year: string, make: string, model: string) => void;
  primaryColor?: string;
  accentColor?: string;
}

export const VehicleSearchWidget = ({ onSearch, primaryColor = "#3B82F6", accentColor = "#8B5CF6" }: VehicleSearchWidgetProps) => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017"];
  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Volkswagen", "Audi", "Nissan"];
  
  const modelsByMake: Record<string, string[]> = {
    Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Prius"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Fit"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Edge"],
    BMW: ["Serie 3", "Serie 5", "X3", "X5", "X7"],
    Mercedes: ["Classe C", "Classe E", "GLA", "GLE", "GLS"],
    Volkswagen: ["Golf", "Passat", "Tiguan", "Atlas", "Jetta"],
    Audi: ["A3", "A4", "Q3", "Q5", "Q7"],
    Nissan: ["Altima", "Sentra", "Rogue", "Pathfinder", "Maxima"]
  };

  const availableModels = make ? modelsByMake[make] || [] : [];

  const handleSearch = () => {
    if (year && make && model) {
      onSearch(year, make, model);
    }
  };

  const isSearchEnabled = year && make && model;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}15 0%, transparent 50%, ${accentColor}10 100%)`
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: primaryColor }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                border: `1px solid ${primaryColor}30`
              }}
            >
              <Car className="w-4 h-4" style={{ color: primaryColor }} />
              <span className="text-sm font-medium text-white">Recherche intelligente</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Trouvez les pièces{' '}
              <span 
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
              >
                compatibles
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Entrez les informations de votre véhicule pour afficher uniquement les pièces compatibles
            </p>
          </div>
          
          {/* Search Card */}
          <div 
            className="relative rounded-3xl p-8 md:p-10 backdrop-blur-xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            {/* Glow effect */}
            <div 
              className="absolute -inset-1 rounded-3xl opacity-20 blur-xl -z-10"
              style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Year Select */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">Année</label>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer hover:bg-white/15"
                >
                  <option value="" className="bg-slate-900 text-white">Sélectionner</option>
                  {years.map(y => <option key={y} value={y} className="bg-slate-900 text-white">{y}</option>)}
                </select>
              </div>

              {/* Make Select */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">Marque</label>
                <select 
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer hover:bg-white/15"
                >
                  <option value="" className="bg-slate-900 text-white">Sélectionner</option>
                  {makes.map(m => <option key={m} value={m} className="bg-slate-900 text-white">{m}</option>)}
                </select>
              </div>

              {/* Model Select */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-white">Modèle</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed appearance-none cursor-pointer hover:bg-white/15"
                >
                  <option value="" className="bg-slate-900 text-white">Sélectionner</option>
                  {availableModels.map(m => <option key={m} value={m} className="bg-slate-900 text-white">{m}</option>)}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={!isSearchEnabled}
                  className="w-full h-[58px] text-base font-semibold rounded-xl text-white shadow-lg disabled:opacity-40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`,
                    boxShadow: `0 10px 30px -10px ${primaryColor}80`
                  }}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>

            {/* Selected Vehicle Display */}
            {year && make && model && (
              <div 
                className="mt-8 p-5 rounded-2xl flex items-center justify-center gap-3"
                style={{ 
                  background: `linear-gradient(135deg, ${primaryColor}20, ${accentColor}20)`,
                  border: `1px solid ${primaryColor}30`
                }}
              >
                <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                <p className="text-lg font-medium text-white">
                  Affichage des pièces pour:{' '}
                  <span 
                    className="font-bold bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                  >
                    {year} {make} {model}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};