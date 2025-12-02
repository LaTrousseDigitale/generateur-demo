import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Car, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VehicleSearchWidgetProps {
  onSearch: (year: string, make: string, model: string) => void;
  primaryColor?: string;
  accentColor?: string;
}

export const VehicleSearchWidget = ({ onSearch, primaryColor = "#dc2626", accentColor = "#f97316" }: VehicleSearchWidgetProps) => {
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
      // Simulated VIN decode
      onSearch("2022", "Honda", "Civic");
    } else if (year && make && model) {
      onSearch(year, make, model);
    }
  };

  const isSearchEnabled = searchMode === 'vin' 
    ? vinNumber.length === 17 
    : (year && make && model);

  return (
    <Card className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header with tabs */}
      <div className="border-b border-slate-200">
        <div className="flex">
          <button
            onClick={() => setSearchMode('vin')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              searchMode === 'vin' 
                ? 'text-white border-b-2' 
                : 'text-slate-600 hover:text-slate-900 bg-slate-50'
            }`}
            style={{ 
              backgroundColor: searchMode === 'vin' ? primaryColor : undefined,
              borderColor: searchMode === 'vin' ? primaryColor : undefined
            }}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Recherche par VIN
          </button>
          <button
            onClick={() => setSearchMode('vehicle')}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              searchMode === 'vehicle' 
                ? 'text-white border-b-2' 
                : 'text-slate-600 hover:text-slate-900 bg-slate-50'
            }`}
            style={{ 
              backgroundColor: searchMode === 'vehicle' ? primaryColor : undefined,
              borderColor: searchMode === 'vehicle' ? primaryColor : undefined
            }}
          >
            <Car className="w-4 h-4 inline mr-2" />
            Année / Marque / Modèle
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {searchMode === 'vin' ? (
          /* VIN Search */
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Badge 
                className="mb-3"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                Recherche instantanée
              </Badge>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Entrez votre numéro VIN
              </h3>
              <p className="text-slate-500 text-sm">
                Le VIN (Vehicle Identification Number) se trouve sur le tableau de bord ou la portière
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={vinNumber}
                onChange={(e) => setVinNumber(e.target.value.toUpperCase().slice(0, 17))}
                placeholder="Ex: 1HGBH41JXMN109186"
                className="w-full px-5 py-4 text-lg font-mono tracking-widest border-2 border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-red-500 transition-all text-center"
                maxLength={17}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                {vinNumber.length}/17
              </div>
            </div>

            {vinNumber.length > 0 && vinNumber.length < 17 && (
              <p className="text-amber-600 text-sm text-center">
                Le VIN doit contenir exactement 17 caractères
              </p>
            )}

            {vinNumber.length === 17 && (
              <div 
                className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: `${primaryColor}10` }}
              >
                <Sparkles className="w-5 h-5" style={{ color: primaryColor }} />
                <div>
                  <p className="font-semibold text-slate-900">VIN détecté!</p>
                  <p className="text-sm text-slate-600">Cliquez sur rechercher pour voir les pièces compatibles</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Vehicle Selection */
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Badge 
                className="mb-3"
                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              >
                Sélection manuelle
              </Badge>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Sélectionnez votre véhicule
              </h3>
              <p className="text-slate-500 text-sm">
                Choisissez l'année, la marque et le modèle de votre véhicule
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Année</label>
                <select 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                >
                  <option value="">Sélectionner</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Marque</label>
                <select 
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("");
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                >
                  <option value="">Sélectionner</option>
                  {makes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Modèle</label>
                <select 
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  disabled={!make}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Sélectionner</option>
                  {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          disabled={!isSearchEnabled}
          className="w-full mt-6 h-14 text-base font-bold rounded-xl text-white shadow-lg disabled:opacity-40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: primaryColor }}
        >
          <Search className="w-5 h-5 mr-2" />
          Rechercher les pièces compatibles
        </Button>
      </div>
    </Card>
  );
};
