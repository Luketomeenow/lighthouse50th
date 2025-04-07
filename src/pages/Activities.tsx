
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Music, BookOpen, Award, Heart } from 'lucide-react';

const Activities = () => {
  const activities = [
    {
      title: "Worship and Praise",
      description: "Join us for uplifting worship sessions celebrating 50 years of God's faithfulness.",
      icon: Music,
      date: "February 28, 2026",
      location: "Main Hall"
    },
    {
      title: "Bible Teaching",
      description: "Special teaching sessions reflecting on the Word of God and our journey.",
      icon: BookOpen,
      date: "February 28-29, 2026",
      location: "Conference Rooms A & B"
    },
    {
      title: "Fellowship Gathering",
      description: "Connect with fellow believers from across the country and around the world.",
      icon: Users,
      date: "February 29, 2026",
      location: "Garden Area"
    },
    {
      title: "Historical Exhibition",
      description: "Walk through 50 years of Lighthouse BBC history through photos and artifacts.",
      icon: Calendar,
      date: "February 28 - March 1, 2026",
      location: "Exhibition Hall"
    },
    {
      title: "Recognition Ceremony",
      description: "Honoring those who have served faithfully in the ministry over the decades.",
      icon: Award,
      date: "March 1, 2026",
      location: "Main Auditorium"
    },
    {
      title: "Community Outreach",
      description: "Special outreach activities to share God's love with our community.",
      icon: Heart,
      date: "March 1, 2026",
      location: "Various Locations"
    }
  ];

  return (
    <div className="min-h-screen bg-green-900 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4 text-center">Anniversary Activities</h1>
          <p className="text-white text-center mb-12 max-w-3xl mx-auto">
            Join us for these special activities as we celebrate 50 years of God's faithfulness at Lighthouse Bible Baptist Church.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-green-800/30 text-white h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <activity.icon className="h-8 w-8 text-yellow-500" />
                      <span className="bg-yellow-500/20 text-yellow-300 text-xs font-medium px-2.5 py-0.5 rounded">
                        {activity.date}
                      </span>
                    </div>
                    <CardTitle className="text-xl mt-3">{activity.title}</CardTitle>
                    <CardDescription className="text-gray-300">{activity.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{activity.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="yellow" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Activities;
