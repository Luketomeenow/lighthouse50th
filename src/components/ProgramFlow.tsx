
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from 'lucide-react';

const programFlows = {
  day1: [
    {
      title: 'Registration & Welcome',
      description: 'Check-in and welcome packet distribution',
      duration: '8:00 AM - 9:30 AM',
    },
    {
      title: 'Opening Ceremony',
      description: 'Official opening of the 50th Anniversary celebration',
      duration: '9:30 AM - 10:30 AM',
    },
    {
      title: 'Morning Worship',
      description: 'Praise and worship led by the Lighthouse worship team',
      duration: '10:30 AM - 11:00 AM',
    },
    {
      title: 'Keynote Message',
      description: 'Special message from our founding pastor',
      duration: '11:00 AM - 12:30 PM',
    },
    {
      title: 'Lunch Break',
      description: 'Fellowship lunch with all attendees',
      duration: '12:30 PM - 2:00 PM',
    },
    {
      title: 'Ministry Showcase',
      description: 'Presentations from different Lighthouse ministries',
      duration: '2:00 PM - 4:00 PM',
    },
  ],
  day2: [
    {
      title: 'Morning Devotion',
      description: 'Prayer and devotional time',
      duration: '8:30 AM - 9:30 AM',
    },
    {
      title: 'Worship Service',
      description: 'Special anniversary worship service',
      duration: '9:30 AM - 11:00 AM',
    },
    {
      title: 'Vision Casting',
      description: 'Message on the future of Lighthouse BBC',
      duration: '11:00 AM - 12:30 PM',
    },
    {
      title: 'Anniversary Lunch',
      description: 'Special celebration lunch',
      duration: '12:30 PM - 2:00 PM',
    },
    {
      title: 'Testimonies & Sharing',
      description: 'Stories of God\'s faithfulness through 50 years',
      duration: '2:00 PM - 3:30 PM',
    },
    {
      title: 'Ministry Commitment',
      description: 'Recommitment ceremony for all members',
      duration: '3:30 PM - 5:00 PM',
    },
  ],
  day3: [
    {
      title: 'Final Devotion',
      description: 'Final devotional session',
      duration: '8:30 AM - 9:30 AM',
    },
    {
      title: 'Celebration Service',
      description: 'Final anniversary celebration service',
      duration: '9:30 AM - 11:30 AM',
    },
    {
      title: 'Special Recognition',
      description: 'Honoring long-time members and founders',
      duration: '11:30 AM - 12:30 PM',
    },
    {
      title: 'Final Lunch',
      description: 'Last fellowship meal together',
      duration: '12:30 PM - 2:00 PM',
    },
    {
      title: 'Closing Ceremony',
      description: 'Final message and prayer for the future',
      duration: '2:00 PM - 3:30 PM',
    },
    {
      title: 'Fellowship & Farewell',
      description: 'Final moments together before departure',
      duration: '3:30 PM - 5:00 PM',
    },
  ],
};

type DayKey = 'day1' | 'day2' | 'day3';
const dayLabels = {
  day1: 'February 28, 2026',
  day2: 'March 1, 2026',
  day3: 'March 2, 2026',
};

const ProgramFlow = () => {
  const [selectedDay, setSelectedDay] = useState<DayKey>('day1');

  return (
    <div className="py-4">
      {/* Program Flow Header - text only, no images */}
      <div className="bg-green-900 py-8 mb-10 rounded-lg">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white mb-4 md:mb-0">
              <p className="text-yellow-400 font-medium">Event Flow @ The Philippine International Convention Center</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-1">PROGRAM FLOW</h2>
            </div>
            <div className="text-white text-center md:text-right">
              <p className="text-yellow-400 font-medium">Save The Date!</p>
              <h3 className="text-xl md:text-2xl font-semibold">February 28 – March 2, 2026</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Day Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(programFlows) as DayKey[]).map((day) => (
            <Button
              key={day}
              variant={selectedDay === day ? "default" : "outline"}
              onClick={() => setSelectedDay(day)}
              className={selectedDay === day ? "bg-yellow-500 hover:bg-yellow-600 text-green-950" : "border-yellow-500 text-yellow-500 hover:bg-green-900"}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {dayLabels[day]}
            </Button>
          ))}
        </div>

        {/* Timeline Display */}
        <div className="relative bg-green-900 rounded-xl shadow-lg p-6 text-white border border-yellow-500/20">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Day information sidebar */}
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="bg-yellow-500 text-green-950 p-6 rounded-t-lg">
                <h3 className="text-xl font-bold mb-1">{dayLabels[selectedDay]}</h3>
                <div className="flex items-center text-green-900">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Philippine International Convention Center</span>
                </div>
              </div>
              
              <div className="bg-green-800 p-6 flex-grow rounded-b-lg">
                <div className="mb-4">
                  <h4 className="font-semibold flex items-center text-yellow-300 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Day Schedule
                  </h4>
                  <p className="text-sm text-white">8:00 AM - 5:00 PM</p>
                </div>
                
                <div className="text-sm text-white space-y-4">
                  <p>Please arrive 30 minutes before your first scheduled session to complete registration.</p>
                  <p>All participants will receive a complete program guide and event materials upon check-in.</p>
                  <p>Lunch and refreshments will be provided for all registered attendees.</p>
                </div>
              </div>
            </div>
            
            {/* Schedule details */}
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold mb-6 border-b border-yellow-500/20 pb-2">Day {selectedDay.charAt(selectedDay.length - 1)} Schedule</h3>
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                {programFlows[selectedDay].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex gap-4"
                  >
                    <div className="w-24 flex-shrink-0">
                      <div className="font-bold text-yellow-300">{item.duration.split(' - ')[0]}</div>
                    </div>
                    <div className="flex-grow border-l-2 border-yellow-500/30 pl-4 pb-6">
                      <h4 className="font-bold text-yellow-300">{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramFlow;
