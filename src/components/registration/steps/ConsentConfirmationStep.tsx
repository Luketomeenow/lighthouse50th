import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RegistrationFormData } from "../MultiStepRegistrationForm";

interface ConsentConfirmationStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export const ConsentConfirmationStep = ({ formData, updateFormData }: ConsentConfirmationStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Registration Summary</h3>
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}
              </div>
              <div>
                <strong>Email:</strong> {formData.email}
              </div>
              <div>
                <strong>Contact:</strong> {formData.contact}
              </div>
              <div>
                <strong>Age Group:</strong> {formData.age_group}
              </div>
              <div>
                <strong>Lighthouse Work:</strong> {formData.lighthouse_work}
              </div>
              <div>
                <strong>Payment Mode:</strong> {formData.payment_mode}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Consent and Agreements</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="data_processing_consent"
              checked={formData.data_processing_consent}
              onCheckedChange={(checked) => updateFormData({ data_processing_consent: !!checked })}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="data_processing_consent" className="text-sm font-normal cursor-pointer">
                <strong>Data Processing Consent *</strong>
              </Label>
              <p className="text-xs text-muted-foreground">
                I consent to the collection, processing, and storage of my personal data for the purpose of 
                event registration, communication, and church membership records. I understand that my data 
                will be handled in accordance with applicable data privacy laws and will only be used for 
                legitimate church activities.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="record_update_consent"
              checked={formData.record_update_consent}
              onCheckedChange={(checked) => updateFormData({ record_update_consent: !!checked })}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="record_update_consent" className="text-sm font-normal cursor-pointer">
                <strong>Church Membership Record Update Consent</strong>
              </Label>
              <p className="text-xs text-muted-foreground">
                I consent to the updating of my church membership records based on the information provided 
                in this registration form. This includes updating contact details, personal information, 
                and church involvement history for accurate record-keeping purposes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> By proceeding with this registration, you acknowledge that you have 
            read and understood the above consents. Data processing consent is required to complete your 
            registration for this event.
          </p>
        </div>

        {!formData.data_processing_consent && (
          <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
            <p className="text-sm text-destructive">
              Data processing consent is required to complete your registration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};