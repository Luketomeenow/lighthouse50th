import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Upload } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CountdownTimer from '@/components/CountdownTimer';
import ProgramFlow from '@/components/ProgramFlow';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://cdn.coverr.co/videos/coverr-typing-on-computer-1584/1080p.mp4");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video file is too large. Maximum size is 100MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('video', file);

    try {
      const { data: { publicUrl: functionUrl } } = supabase.functions.getPublicUrl('upload-video');
      const response = await fetch(functionUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${supabase.auth.getSession()}`
        }
      });

      const data = await response.json();
      if (data.url) {
        setVideoUrl(data.url);
        toast.success("Video uploaded successfully!");
      } else {
        throw new Error(data.error || 'Failed to upload video');
      }
    } catch (error) {
      toast.error("Failed to upload video. Please try again.");
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Admin Video Upload Button - You might want to add proper auth checks */}
        <div className="absolute top-4 right-4 z-30">
          <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full 
            hover:bg-opacity-90 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <Upload size={20} />
            <span>Upload Video</span>
            <input
              type="file"
              accept="video/mp4"
              className="hidden"
              onChange={handleVideoUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 20
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Seeing the Grace of God - In Lighthouse BBC @ 50</h1>
            <p className="text-2xl md:text-3xl mb-3">February 28 - March 1, 2026</p>
            <p className="text-lg md:text-xl mb-8 opacity-90">World Trade Center, Pasay City</p>
            <CountdownTimer targetDate="2026-02-28" />
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-all">
              Register Now
            </motion.button>
          </motion.div>
        </div>
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <ChevronDown className="text-white w-8 h-8" />
        </motion.div>
      </section>

      {/* Program Flow Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Program Flow
          </h2>
          <ProgramFlow />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How can I join the ministries?</AccordionTrigger>
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

      {/* Navigation Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Funding', 'Ministries', 'Latest News'].map(item => <Link key={item} to={`/${item.toLowerCase().replace(' ', '-')}`} className="block">
              <motion.div whileHover={{
            y: -5
          }} className="p-8 rounded-lg bg-white shadow-lg text-center hover:shadow-xl transition-all">
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="mt-2 text-gray-600">Learn more about {item.toLowerCase()}</p>
              </motion.div>
            </Link>)}
        </div>
      </section>
    </div>;
};

export default Index;
