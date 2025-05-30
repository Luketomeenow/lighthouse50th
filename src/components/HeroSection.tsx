import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

// Country codes data
const countryCodes = [{
  code: '+1',
  name: 'United States/Canada'
}, {
  code: '+63',
  name: 'Philippines'
}, {
  code: '+44',
  name: 'United Kingdom'
}, {
  code: '+61',
  name: 'Australia'
}, {
  code: '+65',
  name: 'Singapore'
}, {
  code: '+82',
  name: 'South Korea'
}, {
  code: '+81',
  name: 'Japan'
}, {
  code: '+86',
  name: 'China'
}, {
  code: '+852',
  name: 'Hong Kong'
}, {
  code: '+60',
  name: 'Malaysia'
}, {
  code: '+66',
  name: 'Thailand'
}, {
  code: '+971',
  name: 'United Arab Emirates'
}, {
  code: '+49',
  name: 'Germany'
}, {
  code: '+33',
  name: 'France'
}, {
  code: '+39',
  name: 'Italy'
}, {
  code: '+34',
  name: 'Spain'
}].sort((a, b) => a.name.localeCompare(b.name));
type HeroSectionProps = {
  title: string;
  venue: string;
  targetDate: string;
};
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name is required"
  }),
  lastName: z.string().min(2, {
    message: "Last name is required"
  }),
  email: z.string().email({
    message: "Invalid email address"
  }),
  age: z.coerce.number().min(1, {
    message: "Age is required"
  }),
  ageGroup: z.enum(["Children", "YP", "SWYP", "Adult", "Senior"], {
    required_error: "Please select an age group"
  }),
  countryCode: z.string().min(1, {
    message: "Country code is required"
  }),
  contact: z.string().min(6, {
    message: "Contact number is required"
  }),
  lighthouseWork: z.string().min(2, {
    message: "Please specify your work"
  }),
  needsAccommodation: z.boolean().default(false)
});
const HeroSection = ({
  title,
  venue,
  targetDate
}: HeroSectionProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: undefined,
      ageGroup: undefined,
      countryCode: "+63",
      contact: "",
      lighthouseWork: "",
      needsAccommodation: false
    }
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('registrations').insert({
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        age: values.age,
        age_group: values.ageGroup,
        contact: `${values.countryCode} ${values.contact}`,
        lighthouse_work: values.lighthouseWork,
        needs_accommodation: values.needsAccommodation
      });
      if (error) throw error;
      toast.success("Registration successful! See you at the event.");
      form.reset();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const scrollToVideoSection = () => {
    videoSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="relative min-h-screen bg-green-900 flex flex-col items-center overflow-hidden pt-20 w-full">
      {/* Background image with 50th anniversary logo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{
      backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')`
    }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-green-900/60 to-green-900/90" />
      
      <div className="container mx-auto px-4 md:px-8 z-10 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center lg:text-left">
              <p className="text-yellow-300 mb-4 tracking-wider">Lighthouse Bible Baptist Churches and Ministries at 50</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Celebrating God's Faithfulness at 50 in Lighthouse Bible Baptist Church
              </h1>
              <p className="text-gray-200 mb-8 leading-relaxed text-base md:text-lg">
                Join us for a momentous occasion celebrating 50 years of God's faithfulness. Experience uplifting worship, insightful teachings, and heartfelt fellowship as we commemorate this significant milestone together.
              </p>
              
              <div className="mb-6">
                <p className="text-white font-medium text-lg md:text-xl">February 28 - March 1, 2026</p>
                <p className="text-gray-300">World Trade Center, Pasay City</p>
              </div>

              <Button onClick={scrollToVideoSection} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg flex items-center gap-2 mx-auto lg:mx-0">
                <Play className="h-4 w-4 md:h-5 md:w-5" />
                WATCH VIDEO
              </Button>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2" id="registration-form">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Register for the Event</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="lastName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                  
                  <FormField control={form.control} name="email" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="age" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your age" type="number" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    
                    <FormField control={form.control} name="ageGroup" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">Age Group</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select age group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Children">Children</SelectItem>
                              <SelectItem value="YP">Young People</SelectItem>
                              <SelectItem value="SWYP">Single Working YP</SelectItem>
                              <SelectItem value="Adult">Adult</SelectItem>
                              <SelectItem value="Senior">Senior</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="countryCode" render={({
                    field
                  }) => <FormItem>
                          <FormLabel className="text-white">Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[300px]">
                              {countryCodes.map(country => <SelectItem key={country.code} value={country.code}>
                                  {country.name} ({country.code})
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />

                    <FormField control={form.control} name="contact" render={({
                    field
                  }) => <FormItem className="md:col-span-2">
                          <FormLabel className="text-white">Contact Number</FormLabel>
                          <div className="flex">
                            <div className="bg-white/10 border-white/20 text-white py-2 px-3 rounded-l-md border border-r-0">
                              {form.watch("countryCode")}
                            </div>
                            <FormControl>
                              <Input placeholder="Enter your contact number" {...field} className="rounded-l-none bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                  
                  <FormField control={form.control} name="lighthouseWork" render={({
                  field
                }) => <FormItem>
                        <FormLabel className="text-white">Work in Lighthouse Ministry</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your work in the ministry" {...field} className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                  
                  <FormField control={form.control} name="needsAccommodation" render={({
                  field
                }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-md">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white" />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">I need accommodation during the event</FormLabel>
                        </div>
                      </FormItem>} />
                  
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold text-lg">
                    {isSubmitting ? "Submitting..." : "REGISTER"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div ref={videoSectionRef} className="w-full bg-green-950/50 mt-8">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="flex justify-center">
            
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;