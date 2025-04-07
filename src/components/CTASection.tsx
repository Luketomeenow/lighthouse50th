
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-green-900/70 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-green-800 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/lovable-uploads/6c5afdd0-e051-4913-895e-35063a9cc9be.png" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-yellow-300 mb-2">Join us on this Grand Lighthouse Celebration</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">BE PART OF OUR GREAT WORK!</h2>
              <p className="text-gray-300 max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-8 py-6 rounded-full font-semibold">
                REGISTER NOW
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-full">
                VISIT OUR WEBSITE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
