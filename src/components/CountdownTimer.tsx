
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
    <div className="bg-green-900 p-8 rounded-xl text-white">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">February 28 - March 1, 2026</h2>
        <p className="text-gray-300 mt-2">World Trade Center, Pasay City</p>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
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
              className="bg-green-700/50 backdrop-blur-sm border border-green-600/30 rounded-lg w-full aspect-square flex items-center justify-center"
            >
              <span className="text-3xl md:text-4xl font-bold">
                {item.value < 100 ? formatNumber(item.value) : item.value}
              </span>
            </motion.div>
            <span className="mt-2 text-xs uppercase text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
