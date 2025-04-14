
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();
  
  const handleNavigateToFlow = () => {
    navigate('/flow');
  };
  
  return (
    <div className="py-16 md:py-24 bg-green-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us for Our 50th Anniversary Celebration</h2>
          <p className="text-lg mb-8">
            Be part of this historic milestone as we celebrate 50 years of God's faithfulness to Lighthouse Bible Baptist Church.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="yellow" 
              size="lg"
              onClick={handleNavigateToFlow}
              className="text-green-950"
            >
              View Program Flow
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-yellow-500 text-yellow-500 hover:bg-green-900"
              onClick={() => navigate('/funding')}
            >
              Support Our Celebration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
