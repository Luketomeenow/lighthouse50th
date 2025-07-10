import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RegistrationFormData } from "../MultiStepRegistrationForm";

interface EducationWorkStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export const EducationWorkStep = ({ formData, updateFormData }: EducationWorkStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Educational Background</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="education_level">Highest Education Level</Label>
          <Select onValueChange={(value) => updateFormData({ education_level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="elementary">Elementary</SelectItem>
              <SelectItem value="high_school">High School</SelectItem>
              <SelectItem value="vocational">Vocational/Technical</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="graduate">Graduate Degree</SelectItem>
              <SelectItem value="post_graduate">Post Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="school_name">School/University Name</Label>
          <Input
            id="school_name"
            value={formData.school_name || ""}
            onChange={(e) => updateFormData({ school_name: e.target.value })}
            placeholder="Name of school or university"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="course_vocation">Course/Field of Study</Label>
        <Input
          id="course_vocation"
          value={formData.course_vocation || ""}
          onChange={(e) => updateFormData({ course_vocation: e.target.value })}
          placeholder="Course, degree, or field of study"
        />
      </div>

      <h3 className="text-lg font-medium mt-6">Work Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="work_nature_role">Work Nature/Role</Label>
          <Input
            id="work_nature_role"
            value={formData.work_nature_role || ""}
            onChange={(e) => updateFormData({ work_nature_role: e.target.value })}
            placeholder="Your job title or profession"
          />
        </div>
        <div>
          <Label htmlFor="company_name">Company/Organization</Label>
          <Input
            id="company_name"
            value={formData.company_name || ""}
            onChange={(e) => updateFormData({ company_name: e.target.value })}
            placeholder="Name of your company or organization"
          />
        </div>
      </div>
    </div>
  );
};