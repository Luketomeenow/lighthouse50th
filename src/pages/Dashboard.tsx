
import { useState, useEffect } from "react";
import { Users, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";

type RegistrationSummary = {
  totalRegistrations: number;
  ageGroups: Record<string, number>;
  recentActivity: {
    id: string;
    name: string;
    time: string;
  }[];
};

const StatCard = ({ 
  title, 
  value, 
  icon: Icon 
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
    <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<RegistrationSummary>({
    totalRegistrations: 0,
    ageGroups: {},
    recentActivity: []
  });
  const [ageGroupData, setAgeGroupData] = useState<{name: string, value: number}[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all registrations
      const { data: registrations, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Process the data
      const totalRegistrations = registrations?.length || 0;
      
      // Count by age group
      const ageGroups: Record<string, number> = {};
      registrations?.forEach(reg => {
        ageGroups[reg.age_group] = (ageGroups[reg.age_group] || 0) + 1;
      });
      
      // Format data for the chart
      const chartData = Object.entries(ageGroups).map(([name, value]) => ({
        name,
        value
      }));
      setAgeGroupData(chartData);
      
      // Get recent registrations for activity
      const recentActivity = (registrations || [])
        .slice(0, 4)
        .map(reg => ({
          id: reg.id,
          name: `${reg.first_name} ${reg.last_name}`,
          time: new Date(reg.created_at).toLocaleString()
        }));
      
      setSummary({
        totalRegistrations,
        ageGroups,
        recentActivity
      });
      
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <UserPanelLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </UserPanelLayout>
    );
  }

  return (
    <UserPanelLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to your dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Registrations"
            value={summary.totalRegistrations}
            icon={Users}
          />
          
          {Object.entries(summary.ageGroups).length > 0 && 
            Object.entries(summary.ageGroups).map(([group, count]) => (
              <StatCard
                key={group}
                title={`${group} Registrations`}
                value={count}
                icon={Activity}
              />
            ))
          }
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration by Age Group</h3>
            {ageGroupData.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={ageGroupData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
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
            ) : (
              <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            {summary.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {summary.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New registration: {activity.name}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserPanelLayout>
  );
};

export default Dashboard;
