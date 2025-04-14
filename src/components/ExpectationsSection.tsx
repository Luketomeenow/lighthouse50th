
import { motion } from 'framer-motion';

const ExpectationsSection = () => {
  // Array of expectation items with images
  const expectationItems = [
    {
      title: "Worship Services",
      description: "Join uplifting praise and worship sessions led by our talented music team.",
      image: "/lovable-uploads/c81cecf7-b9e9-49b4-ac2e-2e6b36e515f2.png",
      alt: "Worship Service"
    },
    {
      title: "Bible Preaching",
      description: "Be inspired by powerful messages from God's Word by respected pastors and speakers.",
      image: "/lovable-uploads/ff50462c-67ed-4886-a5e9-59860dc8cdfe.png",
      alt: "Bible Preaching"
    },
    {
      title: "Fellowship",
      description: "Connect with brothers and sisters in Christ from different Lighthouse churches.",
      image: "/lovable-uploads/84060376-4fab-44a2-bdcb-c29a645d420b.png",
      alt: "Fellowship"
    },
    {
      title: "Testimonies",
      description: "Hear moving stories of God's faithfulness throughout 50 years of ministry.",
      image: "/lovable-uploads/0c93a163-cea4-4410-af1b-45179c47e1a5.png",
      alt: "Testimonies"
    },
    {
      title: "Church Gathering",
      description: "Be part of a momentous gathering of believers celebrating God's faithfulness.",
      image: "/lovable-uploads/2281f3ca-74a4-4811-98e5-809209882729.png",
      alt: "Church Gathering"
    },
  ];

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {expectationItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden group h-full"
            >
              <div className="relative h-52 sm:h-64 w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpectationsSection;
