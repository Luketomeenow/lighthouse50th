
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ageGroups = ["Children", "YP", "SWYP", "Adult", "Senior"] as const;
const lighthouseWorks = [
  "Bataan",
  "Cainta",
  "Marikina",
  "Olongapo",
  "Pasig",
  "Taguig",
  "Tatalon (Lighthouse District 1)",
  "Tatalon (Lighthouse District 2)",
  "Tatalon (Lighthouse District 3)",
  "Tatalon (Lighthouse District 4)",
  "Others",
] as const;

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  contact: z.string().min(1, "Contact number is required"),
  age: z.coerce.number().int().min(1, "Age must be at least 1"),
  ageGroup: z.enum(ageGroups, {
    required_error: "Please select your age group",
  }),
  lighthouseWork: z.enum(lighthouseWorks, {
    required_error: "Please select your Lighthouse work",
  }),
  needsAccommodation: z.enum(["yes", "no"], {
    required_error: "Please indicate if you need accommodation",
  }),
  otherLighthouseWork: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const RegistrationFormSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contact: "",
      age: undefined,
      ageGroup: undefined,
      lighthouseWork: undefined,
      needsAccommodation: undefined,
      otherLighthouseWork: "",
    },
  });

  const lighthouseWorkValue = form.watch("lighthouseWork");

  const handleRegistration = async (values: z.infer<typeof formSchema>) => {
    console.log("Starting registration process...");
    setIsLoading(true);

    try {
      // Step 1: Create the user account
      console.log("Creating user account...");
      const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (signUpError) {
        console.error("Error during signup:", signUpError);
        throw signUpError;
      }

      if (!signUpData.user?.id) {
        throw new Error("User account created but no user ID was returned");
      }

      // Step 2: Create the registration record
      console.log("Creating registration record...");
      const { error: registrationError } = await supabase.from("registrations").insert({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        contact: values.contact,
        age: values.age,
        age_group: values.ageGroup,
        lighthouse_work: values.lighthouseWork,
        needs_accommodation: values.needsAccommodation === "yes",
        other_lighthouse_work:
          values.lighthouseWork === "Others" ? values.otherLighthouseWork : null,
        user_id: signUpData.user.id,
      });

      if (registrationError) {
        console.error("Registration record error:", registrationError);
        throw registrationError;
      }

      // Step 3: Send welcome email
      console.log("Sending welcome email...");
      try {
        const { error: emailError } = await supabase.functions.invoke("send-welcome-email", {
          body: {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        });

        if (emailError) {
          console.error("Error sending welcome email:", emailError);
          // Don't throw here, just notify user but consider registration successful
          toast.warning("Registration successful but failed to send welcome email");
        }
      } catch (emailInvokeError) {
        console.error("Failed to invoke email function:", emailInvokeError);
        toast.warning("Registration successful but failed to send welcome email");
      }

      // Registration succeeded
      toast.success("Registration successful! You can now log in with your credentials.");
      setIsSuccess(true);
      form.reset();
    } catch (error: any) {
      console.error("Registration process error:", error);
      
      // Handle specific error cases
      if (error.message?.includes("User already registered")) {
        toast.error("A user with this email already exists");
      } else if (error.message?.includes("Password")) {
        toast.error("Password issue: " + error.message);
      } else {
        toast.error(error.message || "An error occurred during registration");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Registration Complete!</h3>
        <p className="text-gray-700 mb-6">
          Thank you for registering for our event. We've sent you an email with further details.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2"
        >
          Register Another Person
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegistration)}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lighthouseWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lighthouse Work</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Lighthouse work" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lighthouseWorks.map((work) => (
                        <SelectItem key={work} value={work}>
                          {work}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {lighthouseWorkValue === "Others" && (
            <FormField
              control={form.control}
              name="otherLighthouseWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Lighthouse Work</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="ageGroup"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Age Group</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    {ageGroups.map((group) => (
                      <FormItem
                        key={group}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={group} />
                        </FormControl>
                        <FormLabel className="font-normal">{group}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="needsAccommodation"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Need Accommodation?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : "Register"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationFormSection;
