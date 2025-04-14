import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
const EventInfoSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  return <div className="py-16 md:py-24 bg-green-900 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10" style={{
      backgroundImage: `url('/lovable-uploads/ac2bdd30-804c-4cbf-bb35-33d2817a36ca.png')`
    }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-900/70" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-2/5">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7
          }} viewport={{
            once: true
          }} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 my-0 py-[108px] px-[24px] mx-[7px]">
              {showVideo ? <div className="aspect-video rounded-lg overflow-hidden">
                  <video src="https://fwxblkgnyneqwotlsqss.supabase.co/storage/v1/object/public/videos//00af3f67-1dce-40fe-af62-2b534af8a691.mp4" controls autoPlay className="w-full h-full object-cover" />
                </div> : <div className="aspect-video rounded-lg relative overflow-hidden cursor-pointer group" onClick={() => setShowVideo(true)}>
                  <img src="/lovable-uploads/f42480e0-c777-47c3-85fc-8f99a8b02ce8.png" alt="50th Anniversary Celebration" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-all">
                    <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center pulse">
                      <Play className="h-8 w-8 text-green-950 fill-current" />
                    </div>
                  </div>
                </div>}
              <h3 className="text-xl font-semibold text-white mt-4">50th Anniversary - Lighthouse Bible Baptist Church</h3>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-3/5">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }} viewport={{
            once: true
          }} className="px-[14px] py-0">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">50TH ANNIVERSARY</h2>
              
              <div className="space-y-6 text-gray-200">
                <p className="leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <p className="leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                  sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button onClick={() => document.getElementById('registration-form')?.scrollIntoView({
                behavior: 'smooth'
              })} className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-8 py-6 rounded-full font-bold text-lg">
                  REGISTER NOW
                </Button>
                <Button variant="outline" onClick={() => setShowVideo(true)} className="border-2 border-white text-black hover:bg-white/10 px-8 py-6 rounded-full font-bold text-lg flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>PLAY VIDEO</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>;
};
export default EventInfoSection;