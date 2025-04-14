
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  const handleNavigateToFlow = () => {
    navigate('/flow');
  };
  
  return (
    <section className="py-12 md:py-20 bg-green-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            Join Us for this Historic Celebration
          </h2>
          <p className="text-base md:text-lg text-yellow-200 mb-6 md:mb-8">
            Be part of the Lighthouse Bible Baptist Church 50th Anniversary celebration. 
            Connect with fellow believers, celebrate our history, and look forward to our future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button
              onClick={handleNavigateToFlow}
              className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-6 py-2 md:px-8 md:py-3 rounded-full text-base md:text-lg font-bold shadow-lg transform transition hover:scale-105"
            >
              REGISTER NOW
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
