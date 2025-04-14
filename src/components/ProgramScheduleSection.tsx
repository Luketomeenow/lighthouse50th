import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Users, Music, Book, Coffee, MapPin, Clock } from 'lucide-react';
const programSchedule = [{
  day: "February 28, 2026 (Day 1)",
  events: [{
    time: "8:00 AM",
    title: "Registration & Welcome",
    desc: "Check-in and welcome packet distribution"
  }, {
    time: "9:30 AM",
    title: "Opening Ceremony",
    desc: "Official opening of the 50th Anniversary celebration"
  }, {
    time: "10:30 AM",
    title: "Morning Worship",
    desc: "Praise and worship led by the Lighthouse worship team"
  }, {
    time: "11:00 AM",
    title: "Keynote Message",
    desc: "Special message from our founding pastor"
  }, {
    time: "12:30 PM",
    title: "Lunch Break",
    desc: "Fellowship lunch with all attendees"
  }, {
    time: "2:00 PM",
    title: "Ministry Showcase",
    desc: "Presentations from different Lighthouse ministries"
  }, {
    time: "4:00 PM",
    title: "Historical Walk",
    desc: "Interactive exhibit of Lighthouse's 50-year history"
  }, {
    time: "6:00 PM",
    title: "Dinner",
    desc: "Fellowship dinner"
  }, {
    time: "7:30 PM",
    title: "Evening Celebration",
    desc: "Special music and inspirational messages"
  }, {
    time: "9:30 PM",
    title: "Closing Prayer",
    desc: "End of Day 1 activities"
  }]
}, {
  day: "March 1, 2026 (Day 2)",
  events: [{
    time: "8:30 AM",
    title: "Morning Devotion",
    desc: "Prayer and devotional time"
  }, {
    time: "9:30 AM",
    title: "Worship Service",
    desc: "Special anniversary worship service"
  }, {
    time: "11:00 AM",
    title: "Vision Casting",
    desc: "Message on the future of Lighthouse BBC"
  }, {
    time: "12:30 PM",
    title: "Anniversary Lunch",
    desc: "Special celebration lunch"
  }, {
    time: "2:00 PM",
    title: "Testimonies & Sharing",
    desc: "Stories of God's faithfulness through 50 years"
  }, {
    time: "3:30 PM",
    title: "Ministry Commitment",
    desc: "Recommitment ceremony for all members"
  }, {
    time: "5:00 PM",
    title: "Closing Ceremony",
    desc: "Final message and prayer for the future"
  }, {
    time: "6:30 PM",
    title: "Fellowship Dinner",
    desc: "Final celebration dinner"
  }, {
    time: "8:00 PM",
    title: "Worship Concert",
    desc: "Praise and worship celebration concert"
  }, {
    time: "10:00 PM",
    title: "Closing Prayer",
    desc: "End of 50th Anniversary Celebration"
  }]
}];
const ProgramScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(0);
  return <div id="program-schedule" className="py-16 md:py-24 bg-green-950 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4 text-left mx-0">PROGRAM SCHEDULE</h2>
          <p className="text-yellow-100 max-w-3xl text-left px-0 my-[16px] mx-0">
            Join us for two days of celebration, fellowship, and spiritual renewal as we commemorate 
            50 years of God's faithfulness in Lighthouse Bible Baptist Church.
          </p>
        </div>
        
        <div className="mb-8 flex justify-center space-x-4">
          {programSchedule.map((day, index) => <Button key={index} onClick={() => setActiveDay(index)} variant={activeDay === index ? "default" : "outline"} className={activeDay === index ? "bg-yellow-500 hover:bg-yellow-600 text-green-950" : "border-yellow-500 text-yellow-500 hover:bg-green-900"}>
              <Calendar className="mr-2 h-4 w-4" />
              {day.day.split(' ')[0]} {day.day.split(' ')[1]}
            </Button>)}
        </div>
        
        <div className="bg-green-900 rounded-xl shadow-lg p-6 relative overflow-hidden border border-yellow-500/20">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="bg-yellow-500 text-green-950 p-6 rounded-t-lg">
                <h3 className="text-xl font-bold mb-1">{programSchedule[activeDay].day}</h3>
                <div className="flex items-center text-green-900">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>World Trade Center, Pasay City</span>
                </div>
              </div>
              
              <div className="bg-green-800 p-6 flex-grow rounded-b-lg text-yellow-100">
                <div className="mb-4">
                  <h4 className="font-semibold flex items-center text-yellow-300 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Event Schedule
                  </h4>
                  <p className="text-sm text-slate-50">8:00 AM - 10:00 PM</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold flex items-center text-yellow-300 mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    Expected Attendance
                  </h4>
                  <p className="text-sm text-slate-50">5,000+ members and guests</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold flex items-center text-yellow-300 mb-2">
                    <Music className="h-4 w-4 mr-2" />
                    Worship Teams
                  </h4>
                  <p className="text-sm text-slate-50">Combined Lighthouse worship teams</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold flex items-center text-yellow-300 mb-2">
                    <Book className="h-4 w-4 mr-2" />
                    Main Speakers
                  </h4>
                  <p className="text-sm text-slate-50">Pastor Paul Escobar and guest speakers</p>
                </div>
                
                <div>
                  <h4 className="font-semibold flex items-center text-yellow-300 mb-2">
                    <Coffee className="h-4 w-4 mr-2" />
                    Meals Provided
                  </h4>
                  <p className="text-sm text-slate-50">Breakfast, lunch, and dinner for registered attendees</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h3 className="text-xl font-bold mb-6 border-b border-yellow-500/20 pb-2 text-slate-50">Detailed Schedule</h3>
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 text-yellow-100">
                {programSchedule[activeDay].events.map((event, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.3,
                delay: index * 0.05
              }} className="flex gap-4">
                    <div className="w-24 flex-shrink-0">
                      <div className="font-bold text-yellow-300">{event.time}</div>
                    </div>
                    <div className="flex-grow border-l-2 border-yellow-500/30 pl-4 pb-6">
                      <h4 className="font-bold text-yellow-300">{event.title}</h4>
                      <p className="text-slate-50">{event.desc}</p>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button onClick={() => document.getElementById('registration-form')?.scrollIntoView({
          behavior: 'smooth'
        })} className="bg-yellow-500 hover:bg-yellow-600 text-green-950 px-8 py-3 rounded-full font-bold text-lg">
            REGISTER FOR THIS EVENT
          </Button>
        </div>
      </div>
    </div>;
};
export default ProgramScheduleSection;