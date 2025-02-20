
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type RegistrationFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// Match the database enum type exactly
type AgeGroup = "Children" | "YP" | "SWYP" | "Adult" | "Senior";

const ageGroups: AgeGroup[] = ['Children', 'YP', 'SWYP', 'Adult', 'Senior'];

const lighthouseWorks = [
  'Bataan',
  'Cainta',
  'Marikina',
  'Olongapo',
  'Pasig',
  'Taguig',
  'Tatalon (Lighthouse District 1)',
  'Tatalon (Lighthouse District 2)',
  'Tatalon (Lighthouse District 3)',
  'Tatalon (Lighthouse District 4)',
  'Others'
] as const;

// Create a type from the lighthouse works array
type LighthouseWork = typeof lighthouseWorks[number];

type FormData = {
  lastName: string;
  firstName: string;
  email: string;
  contact: string;
  age: string;
  ageGroup: AgeGroup | '';
  lighthouseWork: LighthouseWork | '';
  otherLighthouseWork: string;
  needsAccommodation: 'yes' | 'no' | '';
};

const generatePassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const RegistrationForm = ({ open, onOpenChange }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    email: '',
    contact: '',
    age: '',
    ageGroup: '',
    lighthouseWork: '',
    otherLighthouseWork: '',
    needsAccommodation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = { ...formData };
    if (formData.lighthouseWork !== 'Others') {
      delete requiredFields.otherLighthouseWork;
    }
    
    if (!Object.values(requiredFields).every(value => value)) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!ageGroups.includes(formData.ageGroup as AgeGroup)) {
      toast.error("Please select a valid age group");
      return;
    }

    try {
      // Generate a random password
      const generatedPassword = generatePassword();

      // Create user account in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: generatedPassword,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
          }
        }
      });

      if (authError) throw authError;

      // Save registration data
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert({
          user_id: authData.user?.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          contact: formData.contact,
          age: parseInt(formData.age),
          age_group: formData.ageGroup as AgeGroup,
          lighthouse_work: formData.lighthouseWork === 'Others' ? formData.otherLighthouseWork : formData.lighthouseWork,
          other_lighthouse_work: formData.lighthouseWork === 'Others' ? formData.otherLighthouseWork : null,
          needs_accommodation: formData.needsAccommodation === 'yes'
        });

      if (registrationError) throw registrationError;

      // Send welcome email with credentials
      const { error: emailError } = await supabase.functions.invoke('send-welcome-email', {
        body: JSON.stringify({
          email: formData.email,
          password: generatedPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });

      if (emailError) throw emailError;

      toast.success("Registration submitted successfully! Please check your email for login credentials.");
      onOpenChange(false);
      setFormData({
        lastName: '',
        firstName: '',
        email: '',
        contact: '',
        age: '',
        ageGroup: '',
        lighthouseWork: '',
        otherLighthouseWork: '',
        needsAccommodation: ''
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || "Failed to submit registration");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Event Registration</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter your last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter your first name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                placeholder="Enter your contact number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Enter your age"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ageGroup">Age Group</Label>
              <Select
                value={formData.ageGroup}
                onValueChange={(value: AgeGroup) => setFormData(prev => ({ ...prev, ageGroup: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lighthouseWork">Lighthouse Work</Label>
            <Select
              value={formData.lighthouseWork}
              onValueChange={(value) => {
                // Explicitly type the spread to match FormData type
                setFormData((prev) => ({
                  ...prev,
                  lighthouseWork: value as LighthouseWork,
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your Lighthouse work" />
              </SelectTrigger>
              <SelectContent>
                {lighthouseWorks.map((work) => (
                  <SelectItem key={work} value={work}>
                    {work}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.lighthouseWork === 'Others' && (
              <div className="mt-2">
                <Input
                  id="otherLighthouseWork"
                  value={formData.otherLighthouseWork}
                  onChange={(e) => setFormData(prev => ({ ...prev, otherLighthouseWork: e.target.value }))}
                  placeholder="Please specify your Lighthouse work"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>In Need of Accommodation</Label>
            <RadioGroup
              value={formData.needsAccommodation}
              onValueChange={(value: 'yes' | 'no') => setFormData(prev => ({ ...prev, needsAccommodation: value }))}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full">
            Submit Registration
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
