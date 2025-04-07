
import { motion } from 'framer-motion';

const ProgramScheduleSection = () => {
  return (
    <div className="py-16 md:py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/ac2bdd30-804c-4cbf-bb35-33d2817a36ca.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-900/90" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <p className="text-yellow-300 mb-2">Event venue at The Philippine International Convention Center</p>
          <h2 className="text-3xl md:text-4xl font-bold">PROGRAM FLOW</h2>
          <p className="text-2xl mt-4 text-gray-200">February 28 - March 2, 2025</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {[1, 2, 3].map((day) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: day * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4 text-center">Day {day}</h3>
              <div className="h-40 bg-gray-300/20 rounded-lg mb-4"></div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramScheduleSection;
