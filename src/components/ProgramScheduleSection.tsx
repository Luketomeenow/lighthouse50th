
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProgramFlow from './ProgramFlow';

const ProgramScheduleSection = () => {
  return (
    <div id="program-schedule" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/10" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-yellow-500 mb-2">Follow our schedule for the 3-day celebration</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">EVENT PROGRAM</h2>
          </motion.div>
        </div>
        
        <Tabs defaultValue="flow" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-10">
            <TabsTrigger value="flow" className="text-base">Program Flow</TabsTrigger>
            <TabsTrigger value="venue" className="text-base">Venue Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="mt-6">
            <ProgramFlow />
          </TabsContent>
          
          <TabsContent value="venue" className="mt-6">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Venue Map</h3>
              <div className="aspect-[16/9] w-full bg-gray-800 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                  Venue map will be uploaded soon
                </div>
              </div>
              <p className="text-gray-300 mt-4 text-center">
                The event will be held at the World Trade Center, Pasay City. 
                This map will be updated with specific venue layouts closer to the event date.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProgramScheduleSection;
