
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
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
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="flex flex-col items-center">
          <motion.div
            key={`${unit}-${value}`}
            initial={{ rotateX: -180 }}
            animate={{ rotateX: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-4 rounded-lg w-full aspect-square flex items-center justify-center"
          >
            <span className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
              {value.toString().padStart(2, '0')}
            </span>
          </motion.div>
          <span className="mt-2 text-xs md:text-sm uppercase text-gray-300">{unit}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
