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
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
            {step}
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <p className="text-muted-foreground ml-10">
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
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => handleCheckboxChange(option.value, !isSelected)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.value, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-base font-semibold cursor-pointer">
                        {option.label}
                      </Label>
                      {isSelected && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <RadioGroup value={selectedValue || undefined} onValueChange={onSelect}>
          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selectedValue === option.value;
              return (
                <Card
                  key={option.value}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => onSelect?.(option.value)}
                >
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={option.value}
                          className="text-base font-semibold cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </RadioGroup>
      )}
    </div>
  );
};
