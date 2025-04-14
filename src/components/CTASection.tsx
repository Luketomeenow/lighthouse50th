import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
const CTASection = () => {
  const navigate = useNavigate();
  const handleNavigateToFlow = () => {
    navigate('/flow');
  };
  return;
};
export default CTASection;