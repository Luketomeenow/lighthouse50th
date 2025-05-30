import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Settings,
  FileText,
  LogOut,
  BarChart3,
  Grid,
  Upload,
  UserPlus,
  LayoutDashboard,
  Calendar,
  MessageCircle,
  FileBarChart2,
  HelpCircle,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UsersSection from "@/components/admin/UsersSection";
import RegistrationsSection from "@/components/admin/RegistrationsSection";
import SeatPlanSection from "@/components/admin/SeatPlanSection";

type RegistrationData = {
  id: string;
  first_name: string;
  last_name: string;
  created_at: string;
};

type RegistrationsByMonthMap = {
  [key: string]: number;
};

const StatCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: any;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-semibold text-gray-900 mt-1">{value} </p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [settingsId, setSettingsId] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [monthlyData, setMonthlyData] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    checkAdminStatus();
    fetchCurrentVideoUrl();
  }, []);

  useEffect(() => {
    if (isAdmin && activeSection === "dashboard") {
      fetchRegistrationData();
    }
  }, [isAdmin, activeSection]);

  const checkAdminStatus = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: userRole, error: roleError } = await supabase.rpc(
        "get_user_role",
        {
          user_id: user.id,
        }
      );

      if (roleError) {
        console.error("Error checking role:", roleError);
        toast.error("Error verifying permissions");
        navigate("/");
        return;
      }

      if (userRole !== "admin") {
        toast.error("Unauthorized access");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error checking admin status:", error);
      toast.error("Error verifying permissions");
      navigate("/");
    }
  };

  const fetchCurrentVideoUrl = async () => {
    try {
      const { data, error } = await supabase
        .from("event_settings")
        .select("header_video_url, id")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching video URL:", error);
        toast.error("Error fetching video URL");
        return;
      }

      if (data) {
        setVideoUrl(data.header_video_url);
        setSettingsId(data.id);
      }
    } catch (error: any) {
      console.error("Error fetching video URL:", error);
      toast.error("Error fetching video URL");
    }
  };

  const fetchRegistrationData = async () => {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
      setTotalRegistrations(data?.length || 0);

      // Process data for monthly chart
      const monthlyRegistrations: RegistrationsByMonthMap = {};
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Initialize all months with 0
      monthNames.forEach((month) => {
        monthlyRegistrations[month] = 0;
      });

      // Count registrations by month
      data?.forEach((reg) => {
        const date = new Date(reg.created_at);
        const month = monthNames[date.getMonth()];
        monthlyRegistrations[month] = (monthlyRegistrations[month] || 0) + 1;
      });

      // Convert to chart data format
      const chartData = monthNames.map((month) => ({
        name: month,
        value: monthlyRegistrations[month],
      }));

      setMonthlyData(chartData);
    } catch (error: any) {
      console.error("Error fetching registration data:", error);
      toast.error("Error fetching registration data");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a video file");
      return;
    }

    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 50MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleVideoUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file first");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(filePath, selectedFile, {
          cacheControl: "3600",
          contentType: selectedFile.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        if (uploadError.message.includes("Payload too large")) {
          throw new Error("File size exceeds the maximum limit of 50MB");
        }
        throw uploadError;
      }

      const { error: updateError } = await supabase
        .from("event_settings")
        .update({ header_video_url: filePath })
        .eq("id", settingsId);

      if (updateError) {
        console.error("Update error:", updateError);
        throw updateError;
      }

      setVideoUrl(filePath);
      setSelectedFile(null);
      toast.success("Video uploaded and header updated successfully");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Error uploading video");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (!newAdminEmail) {
      toast.error("Please enter an email address");
      return;
    }
    try {
      const {
        data: { user },
        error: signUpError,
      } = await supabase.auth.signUp({
        email: newAdminEmail,
        password: Math.random().toString(36).slice(-8),
      });

      if (signUpError) throw signUpError;

      if (user) {
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: user.id,
          role: "admin",
        });

        if (roleError) throw roleError;

        toast.success(
          "Admin account created successfully. Check email for password."
        );
        setNewAdminEmail("");
      }
    } catch (error: any) {
      console.error("Error creating admin:", error);
      toast.error("Error creating admin account");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      section: "dashboard",
    },
    {
      title: "Registrations",
      icon: FileText,
      section: "registrations",
    },
    {
      title: "Users",
      icon: Users,
      section: "users",
    },
    {
      title: "Seat Plan",
      icon: Grid,
      section: "seat-plan",
    },
    {
      title: "Event Schedule",
      icon: Calendar,
      section: "schedule",
    },
    {
      title: "Announcements",
      icon: Megaphone,
      section: "announcements",
    },
    {
      title: "Communications",
      icon: MessageCircle,
      section: "communications",
    },
    {
      title: "Reports",
      icon: FileBarChart2,
      section: "reports",
    },
    {
      title: "Help Center",
      icon: HelpCircle,
      section: "help",
    },
    {
      title: "Settings",
      icon: Settings,
      section: "settings",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const renderContent = () => {
    if (activeSection === "dashboard") {
      return (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back to your dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Total Registrations"
              value={totalRegistrations}
              icon={Users}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                User Growth
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlyData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {registrations.slice(0, 4).map((reg, i) => (
                  <div
                    key={reg.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        New user registered
                      </p>
                      <p className="text-sm text-gray-500">{i + 1} hour ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === "users") {
      return <UsersSection />;
    } else if (activeSection === "registrations") {
      return <RegistrationsSection />;
    } else if (activeSection === "seat-plan") {
      return <SeatPlanSection />;
    } else if (activeSection === "settings") {
      return (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Update Landing Page Video
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="videoFile"
                  className="text-sm font-medium text-gray-700"
                >
                  Upload Video
                </label>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="max-w-xl"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-500">
                    Selected file: {selectedFile.name}
                  </p>
                )}
              </div>
              <Button
                onClick={handleVideoUpload}
                disabled={!selectedFile || isUploading}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploading ? "Uploading..." : "Update Landing Page Video"}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Create Admin Account
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="adminEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Admin Email
                </label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="max-w-xl"
                />
              </div>
              <Button
                onClick={handleCreateAdmin}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Create Admin
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === "schedule") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Event Schedule</h1>
          <p className="text-gray-600">
            Manage your event schedule and sessions.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-center text-gray-500">
              Event schedule management will be available soon.
            </p>
          </div>
        </div>
      );
    } else if (activeSection === "announcements") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
          <p className="text-gray-600">
            Create and manage event announcements.
          </p>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-center text-gray-500">
              Announcement management will be available soon.
            </p>
          </div>
        </div>
      );
    } else if (activeSection === "communications") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Communications</h1>
          <p className="text-gray-600">Email and message center.</p>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-center text-gray-500">
              Communication tools will be available soon.
            </p>
          </div>
        </div>
      );
    } else if (activeSection === "reports") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600">Analytics and event reports.</p>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-center text-gray-500">
              Reporting tools will be available soon.
            </p>
          </div>
        </div>
      );
    } else if (activeSection === "help") {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
          <p className="text-gray-600">Documentation and support resources.</p>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-center text-gray-500">
              Help center will be available soon.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <aside className="w-64 border-r bg-white">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <div className="px-3 py-4">
                  <h1 className="text-xl font-bold text-gray-800">
                    Admin Panel
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your application
                  </p>
                </div>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.section}>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(item.section)}
                          className={`w-full justify-start gap-2 ${
                            activeSection === item.section
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600"
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

        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">{renderContent()}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
