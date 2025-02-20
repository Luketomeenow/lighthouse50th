
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

type Registration = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  age: number;
  age_group: string;
  lighthouse_work: string;
  other_lighthouse_work: string | null;
  needs_accommodation: boolean;
  created_at: string;
};

const RegistrationsSection = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setRegistrations(data || []);
    } catch (error: any) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to fetch registrations");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Registrations</h2>
        <p className="text-gray-600 mt-1">View all event registrations</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Age Group</TableHead>
              <TableHead>Lighthouse Work</TableHead>
              <TableHead>Accommodation</TableHead>
              <TableHead>Registration Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell>{`${registration.first_name} ${registration.last_name}`}</TableCell>
                <TableCell>{registration.email}</TableCell>
                <TableCell>{registration.contact}</TableCell>
                <TableCell>{registration.age_group}</TableCell>
                <TableCell>{registration.lighthouse_work}</TableCell>
                <TableCell>{registration.needs_accommodation ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(registration.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RegistrationsSection;
