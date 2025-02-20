
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Form schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

interface RegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationForm = ({ open, onOpenChange }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const generatePassword = () => {
    console.log("Password generated successfully");
    return "pass123"; // For testing purposes
  };

  const handleRegistration = async (values: z.infer<typeof formSchema>) => {
    console.log("Starting registration process...");
    setIsLoading(true);

    try {
      const password = generatePassword();
      console.log("Password generated successfully");

      // Create user account
      console.log("Creating user account...");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
          },
        },
      });

      if (signUpError) {
        console.error("Auth error:", signUpError);
        throw signUpError;
      }

      // Send welcome email with credentials
      console.log("Sending welcome email...");
      const response = await fetch(
        "https://fwxblkgnyneqwotlsqss.supabase.co/functions/v1/send-welcome-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_SUPABASE_ANON_KEY
            }`,
          },
          body: JSON.stringify({
            email: values.email,
            password: password,
            firstName: values.firstName,
            lastName: values.lastName,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Email error:", errorData);
        throw new Error("Failed to send welcome email");
      }

      toast.success("Registration successful! Check your email for login details.");
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register for the Event</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegistration)}
            className="space-y-4"
          >
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Register"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;
