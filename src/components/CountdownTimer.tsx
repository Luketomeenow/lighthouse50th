
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

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="bg-yellow-500 p-5 sm:p-6 rounded-xl text-green-950 max-w-full mx-auto shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Until 50th Anniversary</h2>
      </div>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HOURS', value: timeLeft.hours },
          { label: 'MINUTES', value: timeLeft.minutes },
          { label: 'SECONDS', value: timeLeft.seconds }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              key={`${item.label}-${item.value}`}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              className="bg-green-950 rounded-lg w-full aspect-square flex items-center justify-center shadow-inner"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
                {item.value < 100 ? formatNumber(item.value) : item.value}
              </span>
            </motion.div>
            <span className="mt-1 text-xs sm:text-sm font-semibold uppercase text-green-950">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
