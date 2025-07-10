import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RegistrationFormData } from "../MultiStepRegistrationForm";

interface ChurchHistoryStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export const ChurchHistoryStep = ({ formData, updateFormData }: ChurchHistoryStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Church Membership History</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date_saved">Date Saved/Born Again</Label>
          <Input
            id="date_saved"
            type="date"
            value={formData.date_saved || ""}
            onChange={(e) => updateFormData({ date_saved: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="date_baptized">Date Baptized</Label>
          <Input
            id="date_baptized"
            type="date"
            value={formData.date_baptized || ""}
            onChange={(e) => updateFormData({ date_baptized: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="former_church_details">Former Church Details</Label>
        <Textarea
          id="former_church_details"
          value={formData.former_church_details || ""}
          onChange={(e) => updateFormData({ former_church_details: e.target.value })}
          placeholder="Please provide details about your previous church membership, if any"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="date_transferred">Date Transferred to Lighthouse BBC</Label>
        <Input
          id="date_transferred"
          type="date"
          value={formData.date_transferred || ""}
          onChange={(e) => updateFormData({ date_transferred: e.target.value })}
        />
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This information helps us better understand your spiritual journey 
          and assists in updating our church membership records accordingly.
        </p>
      </div>
    </div>
  );
};