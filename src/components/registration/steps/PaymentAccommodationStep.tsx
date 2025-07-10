import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { RegistrationFormData } from "../MultiStepRegistrationForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PaymentAccommodationStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export const PaymentAccommodationStep = ({ formData, updateFormData }: PaymentAccommodationStepProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF) or PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-proofs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('payment-proofs')
        .getPublicUrl(filePath);

      updateFormData({ payment_proof_url: publicUrl });
      toast({
        title: "File uploaded successfully",
        description: "Your payment proof has been uploaded.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    updateFormData({ payment_proof_url: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Payment Mode</Label>
        <RadioGroup
          value={formData.payment_mode}
          onValueChange={(value) => updateFormData({ payment_mode: value })}
          className="mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash" className="font-normal">Cash</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gcash" id="gcash" />
            <Label htmlFor="gcash" className="font-normal">GCash</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="bank_transfer" id="bank_transfer" />
            <Label htmlFor="bank_transfer" className="font-normal">Bank Transfer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other_payment" />
            <Label htmlFor="other_payment" className="font-normal">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="payment_amount">Payment Amount (PHP)</Label>
        <Input
          id="payment_amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.payment_amount || ""}
          onChange={(e) => updateFormData({ payment_amount: parseFloat(e.target.value) || 0 })}
          placeholder="Enter payment amount"
        />
      </div>

      <div>
        <Label className="text-base font-medium">Payment Proof</Label>
        <div className="mt-2 space-y-2">
          {formData.payment_proof_url ? (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm text-muted-foreground">File uploaded successfully</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeFile}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload your payment proof (receipt, screenshot, etc.)
              </p>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="payment-proof-upload"
              />
              <Label htmlFor="payment-proof-upload" asChild>
                <Button type="button" variant="outline" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>
              </Label>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="needs_accommodation"
            checked={formData.needs_accommodation}
            onCheckedChange={(checked) => updateFormData({ needs_accommodation: !!checked })}
          />
          <Label htmlFor="needs_accommodation" className="font-normal">
            I need accommodation for this event
          </Label>
        </div>

        {formData.needs_accommodation && (
          <div className="space-y-4 ml-6">
            <div>
              <Label className="text-base font-medium">Accommodation Type</Label>
              <RadioGroup
                value={formData.accommodation_type}
                onValueChange={(value) => updateFormData({ accommodation_type: value })}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hotel" id="hotel" />
                  <Label htmlFor="hotel" className="font-normal">Hotel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="homestay" id="homestay" />
                  <Label htmlFor="homestay" className="font-normal">Homestay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="church_accommodation" id="church_accommodation" />
                  <Label htmlFor="church_accommodation" className="font-normal">Church Accommodation</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="special_requirements">Special Requirements</Label>
              <Textarea
                id="special_requirements"
                value={formData.special_requirements || ""}
                onChange={(e) => updateFormData({ special_requirements: e.target.value })}
                placeholder="Any special requirements for your accommodation (dietary restrictions, accessibility needs, etc.)"
                rows={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};