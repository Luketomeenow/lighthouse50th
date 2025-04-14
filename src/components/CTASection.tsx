
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative py-20 bg-black overflow-hidden">
      {/* Background overlay with image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-6">
              BE PART OF OUR GREAT WORK!
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join us in celebrating 50 years of God's faithfulness to the Lighthouse Bible Baptist Church and Ministries. 
              This momentous occasion is a time to worship, fellowship, and reflect on His goodness.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-3 rounded-full"
              >
                REGISTER NOW
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-bold px-8 py-3 rounded-full"
                onClick={() => window.open('https://www.lighthousebbc.org', '_blank')}
              >
                VISIT OUR WEBSITE
              </Button>
            </div>
          </motion.div>
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <img 
              src="/lovable-uploads/f701d314-3648-43be-8b79-d291a16500d5.png" 
              alt="Lighthouse 50th Anniversary Logo" 
              className="h-32 mx-auto"
            />
          </motion.div>
          
          <p className="text-gray-400 italic">
            "To be the salt of the earth, and the light of the world"
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
