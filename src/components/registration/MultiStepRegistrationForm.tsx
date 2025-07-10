import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { EducationWorkStep } from "./steps/EducationWorkStep";
import { ChurchHistoryStep } from "./steps/ChurchHistoryStep";
import { PaymentAccommodationStep } from "./steps/PaymentAccommodationStep";
import { ConsentConfirmationStep } from "./steps/ConsentConfirmationStep";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface RegistrationFormData {
  // Personal Information
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  contact: string;
  home_address?: string;
  birthday?: string;
  gender?: string;
  civil_status?: string;
  
  // Education & Work
  education_level?: string;
  school_name?: string;
  course_vocation?: string;
  work_nature_role?: string;
  company_name?: string;
  
  // Church History
  date_saved?: string;
  date_baptized?: string;
  former_church_details?: string;
  date_transferred?: string;
  
  // Age Group & Lighthouse
  age: number;
  age_group: string;
  lighthouse_work: string;
  other_lighthouse_work?: string;
  
  // Payment & Accommodation
  payment_mode?: string;
  payment_proof_url?: string;
  payment_amount?: number;
  accommodation_type?: string;
  special_requirements?: string;
  needs_accommodation: boolean;
  
  // Consent
  data_processing_consent: boolean;
  record_update_consent: boolean;
}

const STEPS = [
  { id: 1, title: "Personal Information", component: PersonalInfoStep },
  { id: 2, title: "Education & Work", component: EducationWorkStep },
  { id: 3, title: "Church History", component: ChurchHistoryStep },
  { id: 4, title: "Payment & Accommodation", component: PaymentAccommodationStep },
  { id: 5, title: "Consent & Confirmation", component: ConsentConfirmationStep },
];

export const MultiStepRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    age: 0,
    age_group: "",
    lighthouse_work: "",
    needs_accommodation: false,
    data_processing_consent: false,
    record_update_consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const { toast } = useToast();

  const updateFormData = (stepData: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitRegistration = async () => {
    setIsSubmitting(true);
    try {
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8), // Temporary password
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
          },
        },
      });

      if (authError) throw authError;

      // Insert registration data
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert({
          user_id: authData.user?.id,
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          email: formData.email,
          contact: formData.contact,
          home_address: formData.home_address,
          birthday: formData.birthday ? new Date(formData.birthday).toISOString().split('T')[0] : null,
          gender: formData.gender as any,
          civil_status: formData.civil_status as any,
          education_level: formData.education_level as any,
          school_name: formData.school_name,
          course_vocation: formData.course_vocation,
          work_nature_role: formData.work_nature_role,
          company_name: formData.company_name,
          date_saved: formData.date_saved ? new Date(formData.date_saved).toISOString().split('T')[0] : null,
          date_baptized: formData.date_baptized ? new Date(formData.date_baptized).toISOString().split('T')[0] : null,
          former_church_details: formData.former_church_details,
          date_transferred: formData.date_transferred ? new Date(formData.date_transferred).toISOString().split('T')[0] : null,
          age: formData.age,
          age_group: formData.age_group as any,
          lighthouse_work: formData.lighthouse_work,
          other_lighthouse_work: formData.other_lighthouse_work,
          payment_mode: formData.payment_mode as any,
          payment_proof_url: formData.payment_proof_url,
          payment_amount: formData.payment_amount,
          accommodation_type: formData.accommodation_type as any,
          special_requirements: formData.special_requirements,
          needs_accommodation: formData.needs_accommodation,
          data_processing_consent: formData.data_processing_consent,
          record_update_consent: formData.record_update_consent,
        });

      if (registrationError) throw registrationError;

      // Send welcome email
      await supabase.functions.invoke('send-welcome-email', {
        body: { email: formData.email, name: formData.first_name },
      });

      setIsRegistrationComplete(true);
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering. You will receive a confirmation email shortly.",
      });

    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;
  const CurrentStepComponent = STEPS[currentStep - 1].component;

  if (isRegistrationComplete) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-success">Registration Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Thank you for registering for "Seeing the Grace of God - In Lighthouse BBC @ 50"
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to {formData.email}
          </p>
          <Button 
            onClick={() => {
              setIsRegistrationComplete(false);
              setCurrentStep(1);
              setFormData({
                first_name: "",
                last_name: "",
                email: "",
                contact: "",
                age: 0,
                age_group: "",
                lighthouse_work: "",
                needs_accommodation: false,
                data_processing_consent: false,
                record_update_consent: false,
              });
            }}
            className="mt-4"
          >
            Register Another Person
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {STEPS.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-center font-medium">{STEPS[currentStep - 1].title}</p>
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrentStepComponent 
            formData={formData} 
            updateFormData={updateFormData}
          />
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep === STEPS.length ? (
          <Button 
            onClick={submitRegistration}
            disabled={isSubmitting || !formData.data_processing_consent}
          >
            {isSubmitting ? "Submitting..." : "Complete Registration"}
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};