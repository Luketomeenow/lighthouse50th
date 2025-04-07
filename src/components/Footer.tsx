
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-12 px-6 md:px-12">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/6c5afdd0-e051-4913-895e-35063a9cc9be.png" 
            alt="Lighthouse BBC 50th Anniversary" 
            className="h-16 w-auto mb-6"
          />
          <p className="text-center max-w-2xl text-gray-400 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} Lighthouse BBC Official Website. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Facebook</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Instagram</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-6 text-sm text-gray-500">
          "To be the salt of the earth, and the light of the world"
        </div>
      </div>
    </footer>
  );
};

export default Footer;
