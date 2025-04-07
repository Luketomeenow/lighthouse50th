
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";
import CountdownTimer from './CountdownTimer';

const StatsSection = () => {
  const targetDate = "2026-02-28"; // Event start date
  const [registeredCount, setRegisteredCount] = useState<number>(0);
  
  // Fetch registration count
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { count, error } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true });
        
        if (error) throw error;
        if (count !== null) setRegisteredCount(count);
      } catch (error) {
        console.error('Error fetching registration count:', error);
      }
    };

    fetchRegistrations();

    // Set up real-time subscription
    const channel = supabase
      .channel('public:registrations')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'registrations'
      }, () => {
        fetchRegistrations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-yellow-500 py-12 md:py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center gap-8">
          <CountdownTimer targetDate={targetDate} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-green-950 text-yellow-500 py-6 px-12 rounded-xl text-center shadow-lg"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-2">{registeredCount}</h2>
            <p className="text-yellow-300 font-medium text-xl">Members Registered</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
