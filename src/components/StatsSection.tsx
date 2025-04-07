
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const StatsSection = () => {
  const targetDate = "2026-02-28"; // Event start date
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="bg-yellow-500 text-green-950 py-6 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{ backgroundImage: `url('/lovable-uploads/5fa983e2-b1ef-49d7-a7e3-fdda02547e01.png')` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <div className="flex items-center space-x-2">
              <h2 className="text-4xl md:text-5xl font-bold">
                {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </h2>
            </div>
            <p className="text-green-800 font-medium">Until 50th Anniversary</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{registeredCount} Members</h2>
            <p className="text-green-800 font-medium">Registered</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
