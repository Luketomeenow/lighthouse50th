
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'History', path: '/history' },
    { name: 'Program', path: '/#program-schedule' },
    { name: 'Activities', path: '/activities' },
    { name: 'Resources', path: '/resources' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path === '/') {
      e.preventDefault();
      window.location.href = '/';  // Direct page reload to index
      setIsMenuOpen(false);
    } else if (path.startsWith('/#')) {
      e.preventDefault();
      const element = document.querySelector(path.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      } else if (window.location.pathname === '/') {
        // If we're already on the homepage, just scroll to the section
        const sectionId = path.split('#')[1];
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          setIsMenuOpen(false);
        }
      } else {
        // Navigate to homepage then to the section
        window.location.href = path;
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
        scrolled ? 'bg-green-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center">
        <Link 
          to="/" 
          onClick={(e) => handleNavigation(e, '/')}
        >
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
            <a 
              href={item.path}
              className={`text-white hover:text-yellow-300 transition-colors duration-300 font-medium ${
                scrolled ? 'text-white' : 'text-white'
              }`}
              onClick={(e) => handleNavigation(e, item.path)}
            >
              {item.name}
            </a>
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

      {/* Mobile menu with improved background */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-green-900/95 z-50 md:hidden flex flex-col pt-20">
          <div className="absolute top-6 right-6">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-6">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.path}
                    className="text-white text-xl hover:text-yellow-300 transition-colors duration-300 font-medium"
                    onClick={(e) => handleNavigation(e, item.path)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="mt-8">
                <div className="text-white text-lg">
                  50th Anniversary -<br />
                  Lighthouse Bible Baptist Church
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
