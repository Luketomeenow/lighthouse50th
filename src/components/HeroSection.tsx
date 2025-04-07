
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import CountdownTimer from './CountdownTimer';

type HeroSectionProps = {
  title: string;
  venue: string;
  targetDate: string;
  onRegisterClick: () => void;
};

const HeroSection = ({ title, venue, targetDate, onRegisterClick }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen bg-green-900 flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url('/lovable-uploads/ac2bdd30-804c-4cbf-bb35-33d2817a36ca.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-900/60 to-green-900/90" />
      
      <div className="container mx-auto px-6 md:px-12 z-10 py-12 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-yellow-300 mb-2 tracking-wider">Lighthouse Bible Baptist Churches and Ministries at 50</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Celebrating God's Faithfulness at 50 in Lighthouse Bible Baptist Church
              </h1>
              <p className="text-gray-200 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <p className="text-gray-200 mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <p className="text-white font-medium">What are you waiting for?</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onRegisterClick}
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
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl w-full max-w-lg border border-white/20"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-6">February 28 - March 1, 2026</h2>
                <p className="text-gray-200 mb-8">{venue}</p>
                <CountdownTimer targetDate={targetDate} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
