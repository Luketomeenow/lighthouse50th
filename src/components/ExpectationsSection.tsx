
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const ExpectationsSection = () => {
  // State to track which image is being hovered
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // Array of image details with titles and descriptions
  const imageData = [
    {
      src: "/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png",
      alt: "Church Gathering",
      title: "Community Gathering",
      description: "Connect with brothers and sisters in Christ from different Lighthouse churches."
    },
    {
      src: "/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png",
      alt: "Bible Preaching",
      title: "Biblical Teaching",
      description: "Be inspired by powerful messages from God's Word by respected pastors and speakers."
    },
    {
      src: "/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png",
      alt: "Fellowship",
      title: "Deep Fellowship",
      description: "Enjoy meaningful connections and conversations with fellow believers."
    },
    {
      src: "/lovable-uploads/89e57cf9-ac9d-413a-87e1-4bd2a16ac665.png",
      alt: "Testimonies",
      title: "Life Testimonies",
      description: "Hear inspiring stories of God's faithfulness through 50 years of ministry."
    }
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
        
        {/* Image Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {/* First Row */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden h-[200px] col-span-1 cursor-pointer relative group"
                onMouseEnter={() => setHoveredImage(0)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => window.open(imageData[0].src, '_blank')}
              >
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/20 transition-all duration-300 z-10"></div>
                <motion.img 
                  src={imageData[0].src}
                  alt={imageData[0].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-green-950/70 px-4 py-2 rounded-md backdrop-blur-sm">
                    <h4 className="text-yellow-300 font-semibold">{imageData[0].title}</h4>
                  </div>
                </div>
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-green-950/90 text-white border-yellow-500/30">
              <p className="text-sm">{imageData[0].description}</p>
            </HoverCardContent>
          </HoverCard>
          
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden h-[200px] col-span-2 cursor-pointer relative group"
                onMouseEnter={() => setHoveredImage(1)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => window.open(imageData[1].src, '_blank')}
              >
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/20 transition-all duration-300 z-10"></div>
                <motion.img 
                  src={imageData[1].src}
                  alt={imageData[1].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-green-950/70 px-4 py-2 rounded-md backdrop-blur-sm">
                    <h4 className="text-yellow-300 font-semibold">{imageData[1].title}</h4>
                  </div>
                </div>
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-green-950/90 text-white border-yellow-500/30">
              <p className="text-sm">{imageData[1].description}</p>
            </HoverCardContent>
          </HoverCard>
          
          {/* Second Row */}
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden h-[200px] col-span-2 cursor-pointer relative group"
                onMouseEnter={() => setHoveredImage(2)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => window.open(imageData[2].src, '_blank')}
              >
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/20 transition-all duration-300 z-10"></div>
                <motion.img 
                  src={imageData[2].src}
                  alt={imageData[2].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-green-950/70 px-4 py-2 rounded-md backdrop-blur-sm">
                    <h4 className="text-yellow-300 font-semibold">{imageData[2].title}</h4>
                  </div>
                </div>
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-green-950/90 text-white border-yellow-500/30">
              <p className="text-sm">{imageData[2].description}</p>
            </HoverCardContent>
          </HoverCard>
          
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden h-[200px] col-span-1 cursor-pointer relative group"
                onMouseEnter={() => setHoveredImage(3)}
                onMouseLeave={() => setHoveredImage(null)}
                onClick={() => window.open(imageData[3].src, '_blank')}
              >
                <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/20 transition-all duration-300 z-10"></div>
                <motion.img 
                  src={imageData[3].src}
                  alt={imageData[3].alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="bg-green-950/70 px-4 py-2 rounded-md backdrop-blur-sm">
                    <h4 className="text-yellow-300 font-semibold">{imageData[3].title}</h4>
                  </div>
                </div>
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-green-950/90 text-white border-yellow-500/30">
              <p className="text-sm">{imageData[3].description}</p>
            </HoverCardContent>
          </HoverCard>
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
