
import { useState, useEffect } from 'react';
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
    <div className="bg-yellow-500 w-full relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="relative z-10">
        <CountdownTimer targetDate={targetDate} />
      </div>
    </div>
  );
};

export default StatsSection;
