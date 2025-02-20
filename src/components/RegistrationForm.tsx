
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

type RegistrationFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ageGroups = ['Children', 'YP', 'SWYP', 'Adult', 'Senior'];

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
];

const RegistrationForm = ({ open, onOpenChange }: RegistrationFormProps) => {
  const [formData, setFormData] = useState({
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

    try {
      // Here we'll add the logic to save the registration data
      console.log('Form submitted:', formData);
      toast.success("Registration submitted successfully!");
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
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Failed to submit registration");
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
                onValueChange={(value) => setFormData(prev => ({ ...prev, ageGroup: value }))}
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
              onValueChange={(value) => setFormData(prev => ({ ...prev, lighthouseWork: value }))}
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
              onValueChange={(value) => setFormData(prev => ({ ...prev, needsAccommodation: value }))}
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
