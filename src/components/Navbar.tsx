
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/ministries' },
    { name: 'Program', path: '/flow' },
    { name: 'Activities', path: '/funding' },
    { name: 'Resources', path: '/latest-news' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-between items-center py-4 px-6 md:px-12 lg:px-24 bg-green-900/90 backdrop-blur-md"
    >
      <div className="flex items-center">
        <Link to="/">
          <img 
            src="/lovable-uploads/4ade3d2b-9267-4f94-bc08-dfe2f63bca8f.png" 
            alt="Lighthouse BBC 50th Anniversary" 
            className="h-12 md:h-16 w-auto"
          />
        </Link>
      </div>
      
      <ul className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link 
              to={item.path}
              className="text-white hover:text-yellow-300 transition-colors duration-300 font-medium"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="block md:hidden">
        <button className="text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
