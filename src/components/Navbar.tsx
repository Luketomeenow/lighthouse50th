
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'Program', path: '/#program-schedule' }, // Updated to anchor link
    { name: 'Activities', path: '/activities' },
    { name: 'Resources', path: '/resources' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-6 md:px-12 lg:px-24 bg-green-900/90 backdrop-blur-md"
    >
      <div className="flex items-center">
        <Link to="/">
          <img 
            src="/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png" 
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
              onClick={(e) => {
                // Handle anchor links
                if (item.path.startsWith('/#')) {
                  e.preventDefault();
                  const element = document.querySelector(item.path.substring(1));
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else if (window.location.pathname === '/') {
                    // If we're already on the homepage, just scroll to the section
                    const sectionId = item.path.split('#')[1];
                    const section = document.getElementById(sectionId);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    // Navigate to homepage then to the section
                    window.location.href = item.path;
                  }
                }
              }}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="block md:hidden">
        <button 
          onClick={toggleMenu}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-green-900/95 z-50 md:hidden flex flex-col pt-20">
          <div className="px-6">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-white text-xl hover:text-yellow-300 transition-colors duration-300 font-medium"
                    onClick={(e) => {
                      if (item.path.startsWith('/#')) {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        // If we're already on the homepage
                        if (window.location.pathname === '/') {
                          const sectionId = item.path.split('#')[1];
                          const section = document.getElementById(sectionId);
                          if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                          }
                        } else {
                          // Navigate to homepage then to the section
                          window.location.href = item.path;
                        }
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
