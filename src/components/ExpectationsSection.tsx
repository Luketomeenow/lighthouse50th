
import { motion } from 'framer-motion';

const ExpectationsSection = () => {
  return (
    <div className="py-16 md:py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/ac2bdd30-804c-4cbf-bb35-33d2817a36ca.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-900/70" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <p className="text-yellow-300 mb-2">Activities at the Lighthouse Bible Baptist Church 50th Anniversary</p>
          <h2 className="text-3xl md:text-4xl font-bold">WHAT TO EXPECT?</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: item * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden ${
                item > 3 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="aspect-video bg-gray-300/20"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpectationsSection;
