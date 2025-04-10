
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
                Join us as we celebrate 50 years of God's faithfulness. Come be part of this historic event as we gather to worship, fellowship, and give thanks for half a century of ministry.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="yellow" 
                size="xl" 
                className="rounded-full"
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                REGISTER NOW
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-white text-black hover:bg-white/10 rounded-full"
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
