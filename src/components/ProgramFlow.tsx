
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

const programFlows = {
  day1: [
    {
      title: 'Registration',
      description: 'Complete the online registration process',
      duration: '9:00 AM',
    },
    {
      title: 'Welcome Session',
      description: 'Introduction to the program and team',
      duration: '10:30 AM',
    },
    {
      title: 'Orientation',
      description: 'Get familiar with the program structure',
      duration: '2:00 PM',
    },
  ],
  day2: [
    {
      title: 'Core Concepts',
      description: 'Introduction to fundamental principles',
      duration: '9:00 AM',
    },
    {
      title: 'Interactive Workshop',
      description: 'Hands-on learning experience',
      duration: '11:00 AM',
    },
    {
      title: 'Group Projects',
      description: 'Collaborative learning sessions',
      duration: '2:00 PM',
    },
  ],
  day3: [
    {
      title: 'Advanced Topics',
      description: 'Deep dive into specialized areas',
      duration: '9:00 AM',
    },
    {
      title: 'Final Presentation',
      description: 'Present your project work',
      duration: '11:30 AM',
    },
    {
      title: 'Closing Ceremony',
      description: 'Certificate distribution and networking',
      duration: '3:00 PM',
    },
  ],
};

type DayKey = 'day1' | 'day2' | 'day3';

const ProgramFlow = () => {
  const [selectedDay, setSelectedDay] = useState<DayKey>('day1');

  return (
    <div className="py-12">
      {/* Program Flow Header - matching the image */}
      <div className="bg-green-900 py-4 mb-10 relative full-width">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-white mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold">
              <span className="text-yellow-400 font-normal text-base">Event Flow @ The Philippine International Convention Center</span>
              <div className="text-xl md:text-3xl font-bold mt-1">PROGRAM FLOW</div>
            </h2>
          </div>
          <div className="text-white text-right">
            <h3 className="text-xl md:text-2xl font-semibold">February 28 – March 2, 2026</h3>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Day Selection Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {(['day1', 'day2', 'day3'] as const).map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              onClick={() => setSelectedDay(day)}
              className="min-w-[100px]"
            >
              Day {day.charAt(day.length - 1)}
            </Button>
          ))}
        </div>

        {/* Timeline Display */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200" />
          <div className="space-y-12">
            {programFlows[selectedDay].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 mt-2">{step.description}</p>
                </div>
                <div className="relative flex items-center justify-center w-12 h-12">
                  <div className="absolute w-12 h-12 rounded-full bg-white shadow-lg" />
                  <div className="relative z-10 w-4 h-4 rounded-full bg-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-500 font-medium">{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramFlow;
