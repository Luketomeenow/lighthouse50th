import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { MultiStepRegistrationForm } from "@/components/registration/MultiStepRegistrationForm";
type HeroSectionProps = {
  title: string;
  venue: string;
  targetDate: string;
};
const HeroSection = ({
  title,
  venue,
  targetDate
}: HeroSectionProps) => {
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const scrollToVideoSection = () => {
    videoSectionRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="relative min-h-screen bg-green-900 flex flex-col items-center overflow-hidden pt-20 w-full">
      {/* Background image with 50th anniversary logo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{
      backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')`
    }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-green-900/60 to-green-900/90" />
      
      <div className="container mx-auto px-4 md:px-8 z-10 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }} className="text-center lg:text-left">
              <p className="text-yellow-300 mb-4 tracking-wider">Lighthouse Bible Baptist Churches and Ministries at 50</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Celebrating God's Faithfulness at 50 in Lighthouse Bible Baptist Church
              </h1>
              <p className="text-gray-200 mb-8 leading-relaxed text-base md:text-lg">
                Join us for a momentous occasion celebrating 50 years of God's faithfulness. Experience uplifting worship, insightful teachings, and heartfelt fellowship as we commemorate this significant milestone together.
              </p>
              
              <div className="mb-6">
                <p className="text-white font-medium text-lg md:text-xl">February 28 - March 1, 2026</p>
                <p className="text-gray-300">World Trade Center, Pasay City</p>
              </div>

              <Button onClick={scrollToVideoSection} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-base md:text-lg flex items-center gap-2 mx-auto lg:mx-0">
                <Play className="h-4 w-4 md:h-5 md:w-5" />
                WATCH VIDEO
              </Button>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2" id="registration-form">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">Register for the Event</h2>
              
              <MultiStepRegistrationForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div ref={videoSectionRef} className="w-full bg-green-950/50 mt-8">
        <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="flex justify-center">
            
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;