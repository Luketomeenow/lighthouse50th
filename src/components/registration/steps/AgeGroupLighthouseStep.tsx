import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RegistrationFormData } from "../MultiStepRegistrationForm";

interface AgeGroupLighthouseStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

const ageGroups = [
  { value: "Children", label: "Children (0-12)" },
  { value: "YP", label: "Young People (13-22)" },
  { value: "SWYP", label: "Single Working Young People (23-35)" },
  { value: "Adult", label: "Adults (36-59)" },
  { value: "Senior", label: "Senior Adults (60+)" },
];

const lighthouseWorks = [
  "Pasay",
  "Makati",
  "Parañaque",
  "Las Piñas",
  "Muntinlupa",
  "Taguig",
  "Pateros",
  "Alabang",
  "Other",
];

export const AgeGroupLighthouseStep = ({ formData, updateFormData }: AgeGroupLighthouseStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Age *</Label>
        <Input
          type="number"
          min="0"
          max="120"
          value={formData.age || ""}
          onChange={(e) => updateFormData({ age: parseInt(e.target.value) || 0 })}
          placeholder="Enter your age"
          className="w-32"
        />
      </div>

      <div>
        <Label className="text-base font-medium">Age Group *</Label>
        <RadioGroup
          value={formData.age_group}
          onValueChange={(value) => updateFormData({ age_group: value })}
          className="mt-2"
        >
          {ageGroups.map((group) => (
            <div key={group.value} className="flex items-center space-x-2">
              <RadioGroupItem value={group.value} id={group.value} />
              <Label htmlFor={group.value} className="font-normal">
                {group.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-medium">Lighthouse Work Location *</Label>
        <RadioGroup
          value={formData.lighthouse_work}
          onValueChange={(value) => updateFormData({ lighthouse_work: value })}
          className="mt-2"
        >
          {lighthouseWorks.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <RadioGroupItem value={location} id={location} />
              <Label htmlFor={location} className="font-normal">
                {location}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {formData.lighthouse_work === "Other" && (
        <div>
          <Label htmlFor="other_lighthouse_work">Please specify other location</Label>
          <Input
            id="other_lighthouse_work"
            value={formData.other_lighthouse_work || ""}
            onChange={(e) => updateFormData({ other_lighthouse_work: e.target.value })}
            placeholder="Enter other lighthouse work location"
          />
        </div>
      )}
    </div>
  );
};