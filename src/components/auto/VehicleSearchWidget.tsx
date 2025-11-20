import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface VehicleSearchWidgetProps {
  onSearch: (year: string, make: string, model: string) => void;
}

export const VehicleSearchWidget = ({ onSearch }: VehicleSearchWidgetProps) => {
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
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-2 text-center">Trouvez les pièces pour votre véhicule</h3>
          <p className="text-muted-foreground text-center mb-6">Recherchez par année, marque et modèle</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Année</label>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="">Sélectionner</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Marque</label>
              <select 
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel(""); // Reset model when make changes
                }}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="">Sélectionner</option>
                {makes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Modèle</label>
              <select 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Sélectionner</option>
                {availableModels.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                disabled={!isSearchEnabled}
                className="w-full h-[50px] text-base font-medium"
              >
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
