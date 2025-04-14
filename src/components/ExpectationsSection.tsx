
import { motion } from 'framer-motion';

const ExpectationsSection = () => {
  return (
    <div className="py-16 md:py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-900/70" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <p className="text-yellow-300 mb-2">Activities At the Lighthouse Bible Baptist Church and Ministries' 50th Anniversary</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">WHAT TO EXPECT?</h2>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* First row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-4 aspect-video bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          >
            <img 
              src="/lovable-uploads/8d7a74f2-af3e-412b-a989-f2a6321ea7da.png" 
              alt="Worship Service" 
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-5 aspect-video bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          >
            <img 
              src="/lovable-uploads/8d7a74f2-af3e-412b-a989-f2a6321ea7da.png" 
              alt="Conference Session" 
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-3 aspect-video bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          >
            <img 
              src="/lovable-uploads/8d7a74f2-af3e-412b-a989-f2a6321ea7da.png" 
              alt="Fellowship" 
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          
          {/* Second row */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 aspect-video bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          >
            <img 
              src="/lovable-uploads/8d7a74f2-af3e-412b-a989-f2a6321ea7da.png" 
              alt="Group Activities" 
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            className="col-span-12 md:col-span-6 aspect-video bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          >
            <img 
              src="/lovable-uploads/8d7a74f2-af3e-412b-a989-f2a6321ea7da.png" 
              alt="Celebration Event" 
              className="w-full h-full object-cover opacity-40"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExpectationsSection;
