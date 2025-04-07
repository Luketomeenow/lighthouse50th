import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CountdownTimer from '@/components/CountdownTimer';
import ProgramFlow from '@/components/ProgramFlow';
import RegistrationFormSection from '@/components/RegistrationFormSection';
import { supabase } from "@/integrations/supabase/client";

// New components
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import EventInfoSection from '@/components/EventInfoSection';
import ProgramScheduleSection from '@/components/ProgramScheduleSection';
import ExpectationsSection from '@/components/ExpectationsSection';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

type EventSettings = {
  id: string;
  header_video_url: string;
  event_title: string;
  event_date_start: string;
  event_date_end: string;
  venue: string;
  created_at?: string;
  updated_at?: string;
};

const Index = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [settings, setSettings] = useState<EventSettings>({
    id: '',
    header_video_url: "https://fwxblkgnyneqwotlsqss.supabase.co/storage/v1/object/public/videos//00af3f67-1dce-40fe-af62-2b534af8a691.mp4",
    event_title: "Seeing the Grace of God - In Lighthouse BBC @ 50",
    event_date_start: "2026-02-28",
    event_date_end: "2026-03-01",
    venue: "World Trade Center, Pasay City"
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showVideoUpdate, setShowVideoUpdate] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const registrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    fetchEventSettings();
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
    setVideoError(false);
  }, [settings.header_video_url]);

  const fetchEventSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('event_settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching settings:', error);
        return;
      }

      if (data) {
        console.log('Fetched video URL:', data.header_video_url);
        setSettings(data);
      }
    } catch (error) {
      console.error('Error in fetchEventSettings:', error);
    }
  };

  const checkAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    setIsAdmin(roles?.role === 'admin');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleUpdateVideo = async () => {
    if (!newVideoUrl) {
      toast.error('Please enter a video URL');
      return;
    }

    try {
      const { error } = await supabase
        .from('event_settings')
        .update({ header_video_url: newVideoUrl })
        .eq('id', settings.id);

      if (error) throw error;

      setSettings(prev => ({ ...prev, header_video_url: newVideoUrl }));
      setNewVideoUrl('');
      setShowVideoUpdate(false);
      toast.success('Video header updated successfully');
    } catch (error: any) {
      console.error('Error updating video:', error);
      toast.error('Failed to update video header');
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setVideoError(true);
    const target = e.currentTarget;
    target.src = "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4";
    toast.error('Error loading video, falling back to default');
  };

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-green-900">
      {/* Admin controls - only visible to admins */}
      {isAdmin && (
        <div className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => navigate('/admin')}
            className="bg-white text-black hover:bg-white/90 text-sm sm:text-base"
          >
            Go to Admin
          </Button>
          <Button
            onClick={() => setShowVideoUpdate(!showVideoUpdate)}
            className="bg-white text-black hover:bg-white/90 text-sm sm:text-base"
          >
            Update Video Header
          </Button>
        </div>
      )}

      {/* Video URL update form - only visible to admins */}
      {showVideoUpdate && isAdmin && (
        <div className="fixed top-20 right-4 z-50 bg-white p-4 rounded-lg shadow-lg w-[90%] sm:w-auto mx-4 sm:mx-0">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Enter new video URL"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              className="min-w-0 sm:min-w-[300px]"
            />
            <Button onClick={handleUpdateVideo} className="w-full sm:w-auto">
              Update
            </Button>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="relative">
        <Navbar />
        
        <HeroSection 
          title={settings.event_title}
          venue={settings.venue}
          targetDate={settings.event_date_start}
          onRegisterClick={scrollToRegistration}
        />
        
        <StatsSection />
        
        <EventInfoSection />
        
        <ProgramScheduleSection />
        
        <div ref={registrationRef}>
          <ExpectationsSection />
        </div>
        
        <FAQSection />
        
        <CTASection />
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
