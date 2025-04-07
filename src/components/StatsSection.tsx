
import { motion } from 'framer-motion';

const StatsSection = () => {
  return (
    <div className="bg-yellow-500 text-green-950 py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center md:items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-2">00:00:00:00</h2>
              <p className="text-green-800">(Until 50th Anniversary)</p>
            </motion.div>
          </div>
          
          <div className="flex flex-col items-center md:items-end justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-2">250 Members</h2>
              <p className="text-green-800">Registered</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
