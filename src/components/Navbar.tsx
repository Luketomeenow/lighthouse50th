
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

  // Effect to prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

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
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full fixed top-0 left-0 z-50 flex justify-between items-center py-4 px-6 md:px-12 lg:px-24 transition-all duration-300 ${
          scrolled ? 'bg-green-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
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
              className="h-10 md:h-16 w-auto"
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
      </motion.nav>

      {/* Mobile menu - fixed position with consistent background */}
      {isMenuOpen && (
        <div className="mobile-nav-overlay">
          <div className="fixed inset-0 flex flex-col items-center pt-20 pb-10 px-6 overflow-y-auto">
            <div className="absolute top-4 right-6">
              <button 
                onClick={toggleMenu}
                className="text-white hover:text-yellow-300 focus:outline-none p-2 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="w-full max-w-md flex flex-col items-center mt-8">
              <ul className="flex flex-col w-full space-y-6">
                {navItems.map((item) => (
                  <li key={item.name} className="w-full">
                    <a 
                      href={item.path}
                      className="text-white text-xl md:text-2xl hover:text-yellow-300 transition-colors duration-300 font-medium block text-center py-2"
                      onClick={(e) => handleNavigation(e, item.path)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 pt-8 border-t border-green-800 w-full text-center">
                <div className="text-yellow-400 text-base md:text-lg font-medium mb-2">
                  50th Anniversary Celebration
                </div>
                <div className="text-white text-sm md:text-base">
                  Lighthouse Bible Baptist Church
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
