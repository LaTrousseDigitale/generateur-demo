import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

interface Option {
  value: string;
  label: string;
  description: string;
}

interface QuestionnaireStepProps {
  step: number;
  title: string;
  options: Option[];
  selectedValue?: string | null;
  selectedValues?: string[];
  multiSelect?: boolean;
  onSelect?: (value: string) => void;
  onSelectMultiple?: (values: string[]) => void;
}

export const QuestionnaireStep = ({
  step,
  title,
  options,
  selectedValue,
  selectedValues = [],
  multiSelect = false,
  onSelect,
  onSelectMultiple,
}: QuestionnaireStepProps) => {
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (!onSelectMultiple) return;
    
    const newValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
    
    onSelectMultiple(newValues);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs sm:text-base flex-shrink-0">
            {step}
          </div>
          <h2 className="text-lg sm:text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground ml-8 sm:ml-10">
          {multiSelect ? "Sélectionnez une ou plusieurs options" : "Choisissez une option"}
        </p>
      </div>

      {multiSelect ? (
        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <Card
                key={option.value}
                className={`p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleCheckboxChange(option.value, !isSelected)}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked as boolean)
                    }
                    className="mt-0.5 sm:mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm sm:text-base font-semibold cursor-pointer">
                        {option.label}
                      </Label>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <RadioGroup value={selectedValue || ""} onValueChange={onSelect}>
          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
              <label key={option.value} htmlFor={option.value}>
                <Card
                  className={`p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-0.5 sm:mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={option.value}
                          className="text-sm sm:text-base font-semibold cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </label>
              );
            })}
          </div>
        </RadioGroup>
      )}
    </div>
  );
};
