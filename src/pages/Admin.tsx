
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  UserCog, 
  FileText, 
  Grid, 
  ListOrdered,
  LogOut,
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Building2
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
  SidebarProvider
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: role, error: roleError } = await supabase
        .rpc('get_user_role', { user_id: user.id });

      if (roleError) throw roleError;

      if (role !== 'admin') {
        toast.error("Unauthorized access");
        navigate('/');
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error checking admin status:", error);
      toast.error("Error verifying permissions");
      navigate('/');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [
    { title: 'Dashboard', icon: BarChart3, section: 'dashboard' },
    { title: 'User Management', icon: Users, section: 'users' },
    { title: 'Settings', icon: Settings, section: 'settings' },
    { title: 'User Information', icon: UserCog, section: 'user-info' },
    { title: 'Reports', icon: FileText, section: 'reports' },
    { title: 'Seat Planning', icon: Grid, section: 'seating' },
    { title: 'Event Flow', icon: ListOrdered, section: 'flow' },
  ];

  const statsCards = [
    { title: 'Total Users', value: '2,345', icon: Users, change: '+12%', changeType: 'positive' },
    { title: 'Active Events', value: '18', icon: CalendarDays, change: '+3', changeType: 'positive' },
    { title: 'Revenue', value: '$12,845', icon: CircleDollarSign, change: '+2.3%', changeType: 'positive' },
    { title: 'Venues', value: '8', icon: Building2, change: '0', changeType: 'neutral' },
  ];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <div className="px-3 py-4">
                  <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage your application</p>
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.section}>
                        <SidebarMenuButton 
                          onClick={() => setActiveSection(item.section)}
                          className={`w-full justify-start gap-2 ${
                            activeSection === item.section ? 'bg-gray-100 text-gray-900' : 'text-gray-600'
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
              <SidebarGroup className="mt-auto mb-4">
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
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome to your Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your application today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsCards.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <stat.icon className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className={`text-sm ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                  <Button variant="ghost" className="text-sm">View all</Button>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New event created</p>
                        <p className="text-sm text-gray-500">John Doe created a new event "Summer Concert"</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {menuItems.slice(0, 4).map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto py-4 px-4 flex flex-col items-center gap-2 text-gray-600 hover:text-gray-900"
                      onClick={() => setActiveSection(item.section)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm text-center">{item.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
