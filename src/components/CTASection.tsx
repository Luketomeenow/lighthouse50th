
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-black/80 backdrop-blur-md p-8 md:p-12 rounded-xl border border-yellow-500/20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10">
            <div className="mb-8">
              <h3 className="text-yellow-400 text-sm">JOIN US AT THE GRAND LIGHTHOUSE FOUNDATION</h3>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">BE PART OF OUR GREAT WORK!</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
              <div className="w-full md:w-1/2">
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button 
                  variant="yellow" 
                  size="lg"
                  className="rounded-full font-bold text-sm px-8"
                  onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  REGISTER NOW
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 rounded-full font-bold text-sm px-8"
                  onClick={() => window.open('https://www.lighthousebbc.org', '_blank')}
                >
                  VISIT OUR WEBSITE
                </Button>
              </div>
            </div>
            
            <div className="mt-10 flex justify-center">
              <img 
                src="/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png" 
                alt="Lighthouse BBC 50th Anniversary" 
                className="h-16 w-auto"
              />
            </div>
            
            <div className="mt-8">
              <p className="text-center text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
