
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
    <div className="bg-yellow-500 py-8 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <CountdownTimer targetDate={targetDate} />
            <p className="text-green-950 mt-2 text-lg">Until 50th Anniversary</p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h2 className="text-5xl font-bold text-white">{registeredCount} Members</h2>
            <p className="text-green-950 text-lg">Registered</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
