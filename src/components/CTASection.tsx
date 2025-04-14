
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-black text-white py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-no-repeat bg-center pointer-events-none" style={{
        backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')`,
        backgroundSize: '60%'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us For This Grand Celebration!</h2>
          
          <p className="text-lg mb-8">
            Be part of this historic moment as we celebrate 50 years of God's faithfulness at Lighthouse Bible Baptist Church.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/auth')} 
              variant="yellow" 
              className="min-w-[180px]"
            >
              REGISTER WITH US
            </Button>
            
            <Button 
              onClick={() => window.open('https://www.lighthousebbc.org', '_blank')} 
              variant="outline" 
              className="min-w-[180px] border-white text-white hover:bg-white/10"
            >
              VISIT OUR WEBSITE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
