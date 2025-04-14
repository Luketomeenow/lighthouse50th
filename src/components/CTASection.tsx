
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const CTASection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleNavigateToFlow = () => {
    navigate('/flow');
  };
  
  return (
    <section className="py-16 md:py-24 bg-green-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Join Us for this Historic Celebration
          </h2>
          <p className="text-lg text-yellow-200 mb-8">
            Be part of the Lighthouse Bible Baptist Church 50th Anniversary celebration. 
            Connect with fellow believers, celebrate our history, and look forward to our future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              onClick={handleNavigateToFlow}
              className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-8 py-3 rounded-full text-lg font-bold shadow-lg transform transition hover:scale-105"
            >
              REGISTER NOW
            </Button>
            <Button
              onClick={() => navigate('/seat-plan')}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-950 px-8 py-3 rounded-full text-lg font-bold shadow-lg transform transition hover:scale-105"
            >
              VIEW SEAT PLAN
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
