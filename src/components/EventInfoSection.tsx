
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const EventInfoSection = () => {
  return (
    <div className="py-16 md:py-24 bg-green-900 relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/ac2bdd30-804c-4cbf-bb35-33d2817a36ca.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-900/70" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
            >
              <img 
                src="/placeholder.svg" 
                alt="50th Anniversary Celebration" 
                className="w-full h-auto rounded-lg mb-6"
              />
              <h3 className="text-xl font-semibold text-white mb-2">50th Anniversary - Lighthouse Bible Baptist Church</h3>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
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
                <Button 
                  className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-8 py-3 rounded-full font-semibold"
                >
                  REGISTER NOW
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full"
                >
                  PLAY VIDEO
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoSection;
