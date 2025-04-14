
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 bg-green-900 overflow-hidden" id="cta">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 to-green-900/90" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Us for This Historic Celebration
          </h2>
          
          <p className="text-white/80 text-lg mb-10 max-w-3xl mx-auto">
            Be part of Lighthouse Bible Baptist Church's 50th anniversary celebration. 
            Register now to secure your spot at this momentous event celebrating five decades of God's faithfulness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/auth')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-6 text-lg rounded-lg transition-all transform hover:scale-105"
              size="lg"
            >
              Register Now
            </Button>
            
            <Button
              onClick={() => window.open('https://youtube.com/playlist?list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO', '_blank')}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg transition-all"
              size="lg"
            >
              Watch Testimonials
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
