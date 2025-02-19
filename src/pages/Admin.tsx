
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EventSettings {
  id: string;
  header_video_url: string;
  event_title: string;
  event_date_start: string;
  event_date_end: string;
  venue: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [settings, setSettings] = useState<EventSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
    fetchEventSettings();
  }, []);

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (roles?.role !== 'admin') {
      navigate('/');
      return;
    }

    setIsAdmin(true);
    setIsLoading(false);
  };

  const fetchEventSettings = async () => {
    const { data, error } = await supabase
      .from('event_settings')
      .select('*')
      .single();

    if (error) {
      toast.error('Failed to fetch event settings');
      return;
    }

    setSettings(data);
  };

  const handleUpdateSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings?.id) return;

    const { error } = await supabase
      .from('event_settings')
      .update({
        header_video_url: settings.header_video_url,
        event_title: settings.event_title,
        event_date_start: settings.event_date_start,
        event_date_end: settings.event_date_end,
        venue: settings.venue
      })
      .eq('id', settings.id);

    if (error) {
      toast.error('Failed to update settings');
      return;
    }

    toast.success('Settings updated successfully');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {settings && (
        <form onSubmit={handleUpdateSettings} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-2">Header Video URL</label>
            <Input
              value={settings.header_video_url}
              onChange={(e) => setSettings({ ...settings, header_video_url: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Event Title</label>
            <Input
              value={settings.event_title}
              onChange={(e) => setSettings({ ...settings, event_title: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Start Date</label>
            <Input
              type="datetime-local"
              value={settings.event_date_start.slice(0, 16)}
              onChange={(e) => setSettings({ ...settings, event_date_start: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">End Date</label>
            <Input
              type="datetime-local"
              value={settings.event_date_end.slice(0, 16)}
              onChange={(e) => setSettings({ ...settings, event_date_end: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Venue</label>
            <Input
              value={settings.venue}
              onChange={(e) => setSettings({ ...settings, venue: e.target.value })}
            />
          </div>
          
          <Button type="submit">Save Changes</Button>
        </form>
      )}
    </div>
  );
};

export default AdminDashboard;
