
import { useState, useEffect } from 'react';
import { Loader2, Download, Search } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type Registration = {
  id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  contact: string;
  home_address?: string;
  birthday?: string;
  gender?: string;
  civil_status?: string;
  education_level?: string;
  school_name?: string;
  course_vocation?: string;
  work_nature_role?: string;
  company_name?: string;
  age: number;
  age_group: string;
  lighthouse_work: string;
  other_lighthouse_work: string | null;
  payment_mode?: string;
  payment_amount?: number;
  accommodation_type?: string;
  needs_accommodation: boolean;
  created_at: string;
};

const RegistrationsSection = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRegistrations(registrations);
    } else {
      const lowercaseSearch = searchTerm.toLowerCase();
      const filtered = registrations.filter(reg => 
        reg.first_name.toLowerCase().includes(lowercaseSearch) ||
        reg.last_name.toLowerCase().includes(lowercaseSearch) ||
        reg.email.toLowerCase().includes(lowercaseSearch) ||
        reg.contact.toLowerCase().includes(lowercaseSearch) ||
        reg.lighthouse_work.toLowerCase().includes(lowercaseSearch) ||
        (reg.other_lighthouse_work && reg.other_lighthouse_work.toLowerCase().includes(lowercaseSearch))
      );
      setFilteredRegistrations(filtered);
    }
  }, [searchTerm, registrations]);

  const fetchRegistrations = async () => {
    try {
      console.log("Fetching registrations...");
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
        throw error;
      }

      console.log("Registrations fetched successfully:", data);
      setRegistrations(data || []);
      setFilteredRegistrations(data || []);
    } catch (error: any) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to fetch registrations: " + (error.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    try {
      if (registrations.length === 0) {
        toast.error("No registrations to export");
        return;
      }

      // Convert registrations to CSV
      const headers = [
        "First Name",
        "Last Name", 
        "Email",
        "Contact",
        "Age",
        "Age Group",
        "Lighthouse Work",
        "Other Lighthouse Work",
        "Needs Accommodation",
        "Registration Date"
      ];
      
      let csvContent = headers.join(",") + "\n";
      
      registrations.forEach(reg => {
        const row = [
          `"${reg.first_name}"`,
          `"${reg.last_name}"`,
          `"${reg.email}"`,
          `"${reg.contact}"`,
          reg.age,
          `"${reg.age_group}"`,
          `"${reg.lighthouse_work}"`,
          reg.other_lighthouse_work ? `"${reg.other_lighthouse_work}"` : '""',
          reg.needs_accommodation ? "Yes" : "No",
          `"${new Date(reg.created_at).toLocaleDateString()}"`,
        ].join(",");
        
        csvContent += row + "\n";
      });
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Registrations exported successfully");
    } catch (error) {
      console.error("Error exporting registrations:", error);
      toast.error("Failed to export registrations");
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registrations</h2>
          <p className="text-gray-600 mt-1">View all event registrations</p>
        </div>
        <Button 
          onClick={exportToCSV} 
          className="flex items-center gap-2"
          variant="outline"
        >
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>
      
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search by name, email, contact or lighthouse work..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {filteredRegistrations.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          {searchTerm.trim() !== '' ? (
            <p className="text-gray-600">No registrations found matching your search.</p>
          ) : (
            <p className="text-gray-600">No registrations found.</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
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
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell>{`${registration.first_name} ${registration.last_name}`}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.contact}</TableCell>
                    <TableCell>{registration.age_group}</TableCell>
                    <TableCell>
                      {registration.lighthouse_work === "Others" 
                        ? `Other: ${registration.other_lighthouse_work}` 
                        : registration.lighthouse_work}
                    </TableCell>
                    <TableCell>{registration.needs_accommodation ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{new Date(registration.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationsSection;
