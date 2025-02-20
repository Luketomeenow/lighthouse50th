
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

type User = {
  id: string;
  email: string;
  created_at: string;
  role: string;
};

const UsersSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // First get all users from auth.users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error("Error fetching users:", authError);
        toast.error("Failed to fetch users");
        return;
      }

      // Then get their roles
      const usersWithRoles = await Promise.all(
        authUsers.users.map(async (user) => {
          const { data: roleData } = await supabase.rpc('get_user_role', {
            user_id: user.id
          });
          
          return {
            id: user.id,
            email: user.email || 'No email',
            created_at: new Date(user.created_at).toLocaleDateString(),
            role: roleData || 'user'
          };
        })
      );

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error in fetchUsers:", error);
      toast.error("Failed to fetch users");
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
        <h2 className="text-2xl font-bold text-gray-800">Users</h2>
        <p className="text-gray-600 mt-1">Manage registered users and their roles</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>{user.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersSection;
