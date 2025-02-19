
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  UserCog, 
  FileText, 
  Grid, 
  ListOrdered,
  LogOut
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/');
      return;
    }

    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (userRole?.role !== 'admin') {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { title: 'User Management', icon: Users, section: 'users' },
    { title: 'Settings', icon: Settings, section: 'settings' },
    { title: 'User Information', icon: UserCog, section: 'user-info' },
    { title: 'Reports', icon: FileText, section: 'reports' },
    { title: 'Seat Planning', icon: Grid, section: 'seating' },
    { title: 'Event Flow', icon: ListOrdered, section: 'flow' },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.section}>
                      <SidebarMenuButton 
                        onClick={() => setActiveSection(item.section)}
                        className={`w-full justify-start gap-2 ${
                          activeSection === item.section ? 'bg-muted' : ''
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="mt-auto">
              <SidebarGroupContent>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {menuItems.find(item => item.section === activeSection)?.title || 'Dashboard'}
          </h1>

          {/* Placeholder content - we'll implement each section in subsequent steps */}
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">
              This section ({activeSection}) will be implemented in the next step. It will include:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Complete user management system</li>
              <li>Settings and profile management</li>
              <li>User information editing</li>
              <li>Report generation and printing</li>
              <li>Interactive seat planning interface</li>
              <li>Step-by-step event flow configuration</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
