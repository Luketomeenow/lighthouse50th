import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import CountdownTimer from './CountdownTimer';
type HeroSectionProps = {
  title: string;
  venue: string;
  targetDate: string;
  onRegisterClick: () => void;
};
const HeroSection = ({
  title,
  venue,
  targetDate,
  onRegisterClick
}: HeroSectionProps) => {
  return <div className="relative min-h-screen bg-green-900 flex items-center overflow-hidden pt-20">
      {/* Background image with 50th anniversary logo */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15" style={{
      backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')`
    }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-green-900/60 to-green-900/90" />
      
      <div className="container mx-auto px-6 md:px-12 z-10 py-12 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              
              
              <p className="text-yellow-300 mb-2 tracking-wider text-center lg:text-left">Lighthouse Bible Baptist Churches and Ministries at 50</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center lg:text-left">
                Celebrating God's Faithfulness at 50 in Lighthouse Bible Baptist Church
              </h1>
              <p className="text-gray-200 mb-8 leading-relaxed text-center lg:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                <p className="text-white font-medium">What are you waiting for?</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={onRegisterClick} className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-8 py-3 rounded-full font-semibold">
                  REGISTER NOW
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-full">
                  PLAY VIDEO
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.8,
            delay: 0.2
          }} className="w-full max-w-lg">
              <CountdownTimer targetDate={targetDate} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>;
};
export default HeroSection;