
import { motion } from 'framer-motion';

const ExpectationsSection = () => {
  return (
    <div className="py-16 md:py-24 bg-green-900 text-white relative overflow-hidden w-full" id="expectations">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-900/70" />
      
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <p className="text-yellow-300 mb-2">Activities At the Lighthouse Bible Baptist Church and Ministries' 50th Anniversary</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">WHAT TO EXPECT?</h2>
        </div>
        
        {/* Image Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* First Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden h-[200px] col-span-1"
          >
            <img 
              src="/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png" 
              alt="Church Gathering" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden h-[200px] col-span-2"
          >
            <img 
              src="/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png" 
              alt="Bible Preaching" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Second Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden h-[200px] col-span-2"
          >
            <img 
              src="/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png" 
              alt="Fellowship" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden h-[200px] col-span-1"
          >
            <img 
              src="/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png" 
              alt="Testimonies" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        {/* Text Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">Worship Services</h3>
            <p className="text-sm text-gray-300">Join uplifting praise and worship sessions led by our talented music team.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">Fellowship</h3>
            <p className="text-sm text-gray-300">Connect with brothers and sisters in Christ from different Lighthouse churches.</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">Bible Teaching</h3>
            <p className="text-sm text-gray-300">Be inspired by powerful messages from God's Word by respected pastors and speakers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpectationsSection;
