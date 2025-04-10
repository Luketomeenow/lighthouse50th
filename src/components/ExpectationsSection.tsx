
import { motion } from 'framer-motion';

const ExpectationsSection = () => {
  const activities = [
    {
      id: 1,
      title: "Worship Services",
      image: "/lovable-uploads/1271a793-2df2-4ddb-93cf-3ec09ff95a64.png",
    },
    {
      id: 2,
      title: "Fellowship Gatherings",
      image: "/lovable-uploads/a98eeaf7-75c7-4aa8-8e30-7ac6bc2da071.png",
    },
    {
      id: 3,
      title: "Bible Studies",
      image: "/lovable-uploads/8dc8564f-071c-4d12-84fd-4cd80b6de152.png",
    },
    {
      id: 4,
      title: "Commemorative Celebrations",
      image: "/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png",
    },
    {
      id: 5,
      title: "Missions Presentation",
      image: "/lovable-uploads/f42480e0-c777-47c3-85fc-8f99a8b02ce8.png",
    },
  ];

  return (
    <div className="py-16 md:py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-900/70" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-6">
          <p className="text-yellow-300 mb-2">Activities at the Lighthouse Bible Baptist Church and Ministries' 50th Anniversary</p>
          <h2 className="text-3xl md:text-4xl font-bold">WHAT TO EXPECT?</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div className="sm:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden h-full"
            >
              <div className="h-full aspect-[4/3] relative">
                <img 
                  src={activities[0].image} 
                  alt={activities[0].title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="font-bold text-lg text-white">{activities[0].title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="sm:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden h-full"
            >
              <div className="h-full aspect-[16/7] relative">
                <img 
                  src={activities[1].image} 
                  alt={activities[1].title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="font-bold text-lg text-white">{activities[1].title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="sm:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden h-full"
            >
              <div className="h-full aspect-[4/3] relative">
                <img 
                  src={activities[2].image} 
                  alt={activities[2].title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="font-bold text-lg text-white">{activities[2].title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="sm:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden h-full"
            >
              <div className="h-full aspect-[16/9] relative">
                <img 
                  src={activities[3].image} 
                  alt={activities[3].title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="font-bold text-lg text-white">{activities[3].title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="sm:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden h-full"
            >
              <div className="h-full aspect-[16/9] relative">
                <img 
                  src={activities[4].image} 
                  alt={activities[4].title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3 className="font-bold text-lg text-white">{activities[4].title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpectationsSection;
