
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Settings, UserCog, FileText, Grid, ListOrdered, LogOut, BarChart3, CalendarDays, CircleDollarSign, Building2, Upload, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('settings');
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [settingsId, setSettingsId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    checkAdminStatus();
    fetchCurrentVideoUrl();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: userRole, error: roleError } = await supabase.rpc('get_user_role', {
        user_id: user.id
      });

      if (roleError) {
        console.error("Error checking role:", roleError);
        toast.error("Error verifying permissions");
        navigate('/');
        return;
      }

      if (userRole !== 'admin') {
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

  const fetchCurrentVideoUrl = async () => {
    try {
      const { data, error } = await supabase
        .from('event_settings')
        .select('header_video_url, id')
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching video URL:", error);
        toast.error('Error fetching video URL');
        return;
      }

      if (data) {
        setVideoUrl(data.header_video_url);
        setSettingsId(data.id);
      }
    } catch (error: any) {
      console.error("Error fetching video URL:", error);
      toast.error('Error fetching video URL');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 50MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a video file first');
      return;
    }

    setIsUploading(true);
    try {
      // Upload video to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('videos')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          contentType: selectedFile.type,
          upsert: false
        });

      if (uploadError) {
        if (uploadError.message.includes('Payload too large')) {
          throw new Error('File size exceeds the maximum limit of 50MB');
        }
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      // Update event settings with new video URL
      const { error: updateError } = await supabase
        .from('event_settings')
        .update({ header_video_url: publicUrl })
        .eq('id', settingsId);

      if (updateError) {
        console.error("Error updating video URL:", updateError);
        throw updateError;
      }

      setVideoUrl(publicUrl);
      setSelectedFile(null);
      toast.success('Video uploaded and header updated successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Error uploading video');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (!newAdminEmail) {
      toast.error('Please enter an email address');
      return;
    }
    try {
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: newAdminEmail,
        password: Math.random().toString(36).slice(-8)
      });

      if (signUpError) throw signUpError;

      if (user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: user.id,
            role: 'admin'
          });

        if (roleError) throw roleError;

        toast.success('Admin account created successfully. Check email for password.');
        setNewAdminEmail('');
      }
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast.error('Error creating admin account');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = [{
    title: 'Dashboard',
    icon: BarChart3,
    section: 'dashboard'
  }, {
    title: 'Users',
    icon: Users,
    section: 'users'
  }, {
    title: 'Reports',
    icon: FileText,
    section: 'reports'
  }, {
    title: 'Calendar',
    icon: CalendarDays,
    section: 'calendar'
  }, {
    title: 'Finance',
    icon: CircleDollarSign,
    section: 'finance'
  }, {
    title: 'Organizations',
    icon: Building2,
    section: 'organizations'
  }, {
    title: 'Settings',
    icon: Settings,
    section: 'settings'
  }];

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  const renderContent = () => {
    if (activeSection === 'settings') {
      return (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Update Landing Page Video</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="videoFile" className="text-sm font-medium text-gray-700">Upload Video</label>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="max-w-xl"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
                )}
              </div>
              <Button 
                onClick={handleVideoUpload} 
                disabled={!selectedFile || isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Update Landing Page Video'}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Create Admin Account</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="adminEmail" className="text-sm font-medium text-gray-700">Admin Email</label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="max-w-xl"
                />
              </div>
              <Button onClick={handleCreateAdmin} className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Create Admin
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin dashboard.</p>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
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
                    {menuItems.map(item => (
                      <SidebarMenuItem key={item.section}>
                        <SidebarMenuButton 
                          onClick={() => setActiveSection(item.section)} 
                          className={`w-full justify-start gap-2 ${activeSection === item.section ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
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

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
