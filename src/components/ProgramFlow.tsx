
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Registration',
    description: 'Complete the online registration process',
    duration: 'Day 1',
  },
  {
    title: 'Orientation',
    description: 'Get familiar with the program structure',
    duration: 'Week 1',
  },
  {
    title: 'Core Modules',
    description: 'Dive into the fundamental concepts',
    duration: 'Weeks 2-6',
  },
  {
    title: 'Advanced Topics',
    description: 'Explore specialized areas of study',
    duration: 'Weeks 7-10',
  },
  {
    title: 'Final Project',
    description: 'Apply your knowledge in a practical project',
    duration: 'Weeks 11-12',
  },
];

const ProgramFlow = () => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200" />
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
  );
};

export default ProgramFlow;
