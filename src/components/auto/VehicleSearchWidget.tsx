import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Car, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VehicleSearchWidgetProps {
  onSearch: (year: string, make: string, model: string) => void;
  primaryColor?: string;
  accentColor?: string;
  theme?: "moderne" | "rustique" | "futuriste";
}

export const VehicleSearchWidget = ({ 
  onSearch, 
  primaryColor = "#dc2626", 
  accentColor = "#f97316",
  theme = "moderne"
}: VehicleSearchWidgetProps) => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [searchMode, setSearchMode] = useState<'vehicle' | 'vin'>('vin');

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
    if (searchMode === 'vin' && vinNumber.length === 17) {
      onSearch("2022", "Honda", "Civic");
    } else if (year && make && model) {
      onSearch(year, make, model);
    }
  };

  const isSearchEnabled = searchMode === 'vin' 
    ? vinNumber.length === 17 
    : (year && make && model);

  // Theme styles
  const getThemeStyles = () => {
    switch(theme) {
      case "futuriste":
        return {
          card: "bg-white/10 backdrop-blur-xl border border-white/20",
          tabActive: "text-white",
          tabInactive: "text-slate-400 hover:text-white bg-white/5",
          title: "text-white",
          subtitle: "text-slate-300",
          badge: "text-white/90 border border-white/30",
          input: "bg-white/10 border border-white/20 text-white placeholder:text-slate-500",
          inputText: "text-white",
          label: "text-slate-300",
          highlight: "border border-white/30",
          highlightText: "text-white",
          button: "",
        };
      case "rustique":
        return {
          card: "bg-stone-800/80 border border-amber-900/30 backdrop-blur-sm",
          tabActive: "text-amber-50",
          tabInactive: "text-stone-400 hover:text-amber-200 bg-stone-700/50",
          title: "text-amber-50",
          subtitle: "text-stone-400",
          badge: "bg-amber-900/30 text-amber-200 border border-amber-800/30",
          input: "bg-stone-700/50 border border-amber-900/30 text-amber-50 focus:border-amber-600",
          inputText: "text-amber-50",
          label: "text-stone-300",
          highlight: "bg-amber-900/20 border border-amber-800/30",
          highlightText: "text-amber-200",
          button: "bg-amber-700 hover:bg-amber-600",
        };
      default: // moderne
        return {
          card: "bg-white border border-slate-200 shadow-lg",
          tabActive: "text-white",
          tabInactive: "text-slate-600 hover:text-slate-900 bg-slate-50",
          title: "text-slate-900",
          subtitle: "text-slate-500",
          badge: "",
          input: "bg-slate-50 border border-slate-200 text-slate-900 focus:ring-2",
          inputText: "text-slate-900",
          label: "text-slate-700",
          highlight: "",
          highlightText: "text-slate-900",
          button: "",
        };
    }
  };

  const styles = getThemeStyles();

  // Dynamic card shadow for futuriste
  const cardShadowStyle = theme === "futuriste" ? { boxShadow: `0 0 40px ${primaryColor}30` } : {};

  return (
    <Card className={`${styles.card} rounded-2xl overflow-hidden`} style={cardShadowStyle}>
      {/* Header with tabs */}
      <div className={`border-b ${theme === 'moderne' ? 'border-slate-200' : theme === 'rustique' ? 'border-amber-900/30' : 'border-white/10'}`}>
        <div className="flex">
          <button
            onClick={() => setSearchMode('vin')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              searchMode === 'vin' 
                ? styles.tabActive
                : styles.tabInactive
            }`}
            style={{ 
              backgroundColor: searchMode === 'vin' ? primaryColor : undefined,
            }}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Recherche par VIN
          </button>
          <button
            onClick={() => setSearchMode('vehicle')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              searchMode === 'vehicle' 
                ? styles.tabActive
                : styles.tabInactive
            }`}
            style={{ 
              backgroundColor: searchMode === 'vehicle' ? primaryColor : undefined,
            }}
          >
            <Car className="w-4 h-4 inline mr-2" />
            Année / Marque / Modèle
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {searchMode === 'vin' ? (
          <div className="space-y-6">
          <div className="text-center mb-6">
              <Badge 
                className={styles.badge}
                style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50` }}
              >
                Recherche instantanée
              </Badge>
              <h3 className={`text-xl font-bold mt-3 mb-2 ${styles.title}`}>
                Entrez votre numéro VIN
              </h3>
              <p className={`text-sm ${styles.subtitle}`}>
                Le VIN (Vehicle Identification Number) se trouve sur le tableau de bord ou la portière
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value.toUpperCase().slice(0, 17))}
                placeholder="Ex: 1HGBH41JXMN109186"
                className={`w-full px-5 py-4 text-lg font-mono tracking-widest rounded-xl text-center transition-all ${styles.input}`}
                maxLength={17}
              />
              <div className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm ${styles.subtitle}`}>
                {vinNumber.length}/17
              </div>
            </div>

            {vinNumber.length > 0 && vinNumber.length < 17 && (
              <p className="text-amber-500 text-sm text-center">
                Le VIN doit contenir exactement 17 caractères
              </p>
            )}

            {vinNumber.length === 17 && (
              <div 
                className={`p-4 rounded-xl flex items-center gap-3 ${styles.highlight}`}
                style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}
              >
                <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                <div>
                  <p className={`font-semibold ${styles.highlightText}`}>VIN détecté!</p>
                  <p className={`text-sm ${styles.subtitle}`}>Cliquez sur rechercher pour voir les pièces compatibles</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Badge 
                className={styles.badge}
                style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}50` }}
              >
                Sélection manuelle
              </Badge>
              <h3 className={`text-xl font-bold mt-3 mb-2 ${styles.title}`}>
                Sélectionnez votre véhicule
              </h3>
              <p className={`text-sm ${styles.subtitle}`}>
                Choisissez l'année, la marque et le modèle de votre véhicule
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${styles.label}`}>Année</label>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl transition-all ${styles.input}`}
                >
                  <option value="">Sélectionner</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${styles.label}`}>Marque</label>
                <select 
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className={`w-full px-4 py-3 rounded-xl transition-all ${styles.input}`}
                >
                  <option value="">Sélectionner</option>
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${styles.label}`}>Modèle</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className={`w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${styles.input}`}
                >
                  <option value="">Sélectionner</option>
                  {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={handleSearch}
          disabled={!isSearchEnabled}
          className={`w-full mt-6 h-14 text-base font-bold rounded-xl text-white disabled:opacity-40 transition-all hover:scale-[1.02] active:scale-[0.98] ${styles.button}`}
          style={{ 
            backgroundColor: theme !== 'rustique' ? primaryColor : undefined,
            boxShadow: theme === 'futuriste' ? `0 0 20px ${primaryColor}40` : undefined
          }}
        >
          <Search className="w-5 h-5 mr-2" />
          Rechercher les pièces compatibles
        </Button>
      </div>
    </Card>
  );
};
