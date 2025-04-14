
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="py-16 bg-black relative overflow-hidden w-full">
      {/* Yellow divider at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500"></div>
      
      <div className="container mx-auto px-4 md:px-12">
        <div className="bg-black/70 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-yellow-500 mb-2">Join us on this Grand Lighthouse Celebration</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">BE PART OF OUR GREAT WORK!</h2>
              <p className="text-gray-300 max-w-xl">
                Join us as we celebrate 50 years of God's faithfulness. Come be part of this historic event as we gather to worship, fellowship, and give thanks for half a century of ministry.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="yellow" 
                size="xl" 
                className="rounded-full text-white font-semibold"
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                REGISTER NOW
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-white text-white hover:bg-white/10 rounded-full"
                onClick={() => window.open('https://www.lighthousebbc.org', '_blank')}
              >
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
