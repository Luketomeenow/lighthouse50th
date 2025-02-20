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
import RegistrationForm from '@/components/RegistrationForm';
import { supabase } from "@/integrations/supabase/client";

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
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
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

  return (
    <div className="min-h-screen">
      <section className="relative h-screen">
        {!videoError && (
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            poster="/placeholder.svg"
            onError={handleVideoError}
          >
            <source 
              src={settings.header_video_url} 
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
        {videoError && (
          <div className="absolute inset-0 w-full h-full bg-gray-900" />
        )}
        <div className="video-overlay absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="absolute top-4 right-4 z-30 flex flex-col sm:flex-row gap-2">
          {isAdmin ? (
            <>
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
            </>
          ) : (
            <Button
              onClick={handleLogin}
              className="bg-white text-black hover:bg-white/90 text-sm sm:text-base"
            >
              Login
            </Button>
          )}
        </div>

        {showVideoUpdate && isAdmin && (
          <div className="absolute top-20 right-4 z-30 bg-white p-4 rounded-lg shadow-lg w-[90%] sm:w-auto mx-4 sm:mx-0">
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

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center w-full max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">{settings.event_title}</h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-3">
              February 28 - March 1, 2026
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90">{settings.venue}</p>
            <CountdownTimer targetDate={settings.event_date_start} />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowRegistrationForm(true)}
              className="mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-all text-sm sm:text-base"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="text-white w-6 h-6 sm:w-8 sm:h-8" />
        </motion.div>
      </section>

      <RegistrationForm 
        open={showRegistrationForm} 
        onOpenChange={setShowRegistrationForm}
      />

      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            Program Flow
          </h2>
          <ProgramFlow />
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">How can I join the ministries?</AccordionTrigger>
              <AccordionContent>
                You can join our ministries by attending our orientation sessions, filling out a volunteer form, or speaking directly with our ministry leaders. We have various ministries including worship, youth, children's ministry, and community outreach.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I make a donation?</AccordionTrigger>
              <AccordionContent>
                You can make donations through multiple channels: online giving through our website, bank transfer, or during our regular services. All donations are tax-deductible and will be used to support our various ministry programs and community initiatives.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What volunteer opportunities are available?</AccordionTrigger>
              <AccordionContent>
                We offer numerous volunteer opportunities including worship team, technical support, children's ministry, youth mentoring, community outreach, and administrative support. Training will be provided for all volunteer positions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What are your service times?</AccordionTrigger>
              <AccordionContent>
                Our main services are held every Sunday at 9:00 AM and 11:00 AM. We also have midweek Bible studies, youth meetings, and various ministry activities throughout the week. Check our calendar for specific times and events.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Do you have programs for children?</AccordionTrigger>
              <AccordionContent>
                Yes, we have dedicated programs for children of all ages! Our children's ministry provides age-appropriate Bible lessons, activities, and worship experiences during regular service times. We also organize special events and camps throughout the year.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8 bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {['Funding', 'Ministries', 'Latest News'].map(item => (
            <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="block">
              <motion.div 
                whileHover={{ y: -5 }} 
                className="p-6 sm:p-8 rounded-lg bg-white shadow-lg text-center hover:shadow-xl transition-all"
              >
                <h3 className="text-lg sm:text-xl font-semibold">{item}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">Learn more about {item.toLowerCase()}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
