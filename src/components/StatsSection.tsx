
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const StatsSection = () => {
  const targetDate = "2026-02-28"; // Event start date
  
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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  return (
    <div className="bg-yellow-500 text-green-950 py-8 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-2 flex items-center justify-center">
            <span className="inline-block w-20 text-right">{formatTime(timeLeft.days)}</span>
            <span className="mx-2">:</span>
            <span className="inline-block w-16 text-center">{formatTime(timeLeft.hours)}</span>
            <span className="mx-2">:</span>
            <span className="inline-block w-16 text-center">{formatTime(timeLeft.minutes)}</span>
            <span className="mx-2">:</span>
            <span className="inline-block w-16 text-left">{formatTime(timeLeft.seconds)}</span>
          </h2>
          <div className="flex justify-center text-xs font-medium">
            <span className="inline-block w-20 text-right">DAYS</span>
            <span className="mx-2 opacity-0">:</span>
            <span className="inline-block w-16 text-center">HOURS</span>
            <span className="mx-2 opacity-0">:</span>
            <span className="inline-block w-16 text-center">MINUTES</span>
            <span className="mx-2 opacity-0">:</span>
            <span className="inline-block w-16 text-left">SECONDS</span>
          </div>
          <p className="text-green-800 mt-2">(Until 50th Anniversary)</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
