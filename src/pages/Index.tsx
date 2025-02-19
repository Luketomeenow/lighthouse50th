
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CountdownTimer from '@/components/CountdownTimer';
import ProgramFlow from '@/components/ProgramFlow';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-typing-on-computer-1584/1080p.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay" />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Future
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto px-4">
              Join us for an extraordinary journey of learning and growth
            </p>
            <CountdownTimer targetDate="2024-02-28" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Register Now
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <ChevronDown className="text-white w-8 h-8" />
        </motion.div>
      </section>

      {/* Program Flow Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Program Flow
          </h2>
          <ProgramFlow />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the program duration?</AccordionTrigger>
              <AccordionContent>
                The program runs for 12 weeks, with flexible learning options to fit your schedule.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How much does it cost?</AccordionTrigger>
              <AccordionContent>
                Visit our Funding page for detailed information about program costs and available financial aid options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are the prerequisites?</AccordionTrigger>
              <AccordionContent>
                No specific prerequisites are required. Just bring your enthusiasm and willingness to learn!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Funding', 'Ministries', 'Latest News'].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(' ', '-')}`}
              className="block"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-lg bg-white shadow-lg text-center hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-semibold">{item}</h3>
                <p className="mt-2 text-gray-600">Learn more about {item.toLowerCase()}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
