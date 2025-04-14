import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
      setShowContactForm(false);
    }, 1000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return <footer className="relative">
      {/* Top yellow divider */}
      <div className="h-1 bg-yellow-500"></div>
      
      <div className="bg-black text-white py-10 relative">      
        {/* Logo Background */}
        <div className="absolute inset-0 opacity-10 bg-no-repeat bg-center pointer-events-none" style={{
        backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')`,
        backgroundSize: '60%'
      }}></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Main Footer Content */}
          <div className="flex flex-col items-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-12">
              <div className="flex flex-col">
                <p className="text-yellow-500 text-sm mb-2">Join us on this Grand Lighthouse Celebration</p>
                <h2 className="text-2xl font-bold mb-4">BE PART OF OUR GREAT WORK!</h2>
                <div className="flex flex-wrap gap-4 mt-2">
                  <a href="#registration-form" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full text-sm font-bold px-[28px] py-[6px] mx-0">
                    REGISTER WITH US
                  </a>
                  <a href="https://www.lighthousebbc.org" target="_blank" rel="noopener noreferrer" className="border border-white hover:bg-white/10 text-white py-2 px-6 rounded-full text-sm font-bold">
                    VISIT OUR WEBSITE
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col">
                <p className="text-gray-400 mb-6">
                  The Lighthouse Bible Baptist Church and Ministries celebrates 50 years of God's faithfulness. 
                  Join us in this momentous occasion as we gather to worship, fellowship, and reflect on God's 
                  goodness throughout our journey.
                </p>
              </div>
            </div>
            
            {/* Logo in the center */}
            <div className="mb-8 flex justify-center items-center">
              <img alt="Lighthouse 50th Anniversary Logo" className="h-24 md:h-32" src="/lovable-uploads/8e25eafe-f70c-4e8d-af99-16f07e523d3f.png" />
            </div>
            
            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              <a href="https://web.facebook.com/lighthousebbcmain" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="hidden sm:inline">Facebook</span>
              </a>
              <a href="https://www.instagram.com/lighthousebbc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
              <a href="mailto:ministries@lighthousebbc.org" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <span className="hidden sm:inline">Email Us</span>
              </a>
              <a href="https://www.lighthousebbc.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <span>Lighthouse BBC Official Website</span>
              </a>
            </div>
          </div>
          
          {showContactForm ? <div className="max-w-md mx-auto bg-gray-800/60 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="bg-gray-700/50 border-gray-600" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-gray-700/50 border-gray-600" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="bg-gray-700/50 border-gray-600" />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" disabled={isSubmitting} variant="yellow" className="w-full text-white">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowContactForm(false)} className="text-gray-950">
                    Cancel
                  </Button>
                </div>
              </form>
            </div> : null}
          
          {/* Copyright and Legal Links */}
          <div className="text-center mt-8 text-sm text-gray-500 flex flex-col space-y-4">
            <p>"To be the salt of the earth, and the light of the world"</p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <button onClick={() => setShowContactForm(true)} className="text-gray-500 hover:text-white transition-colors">
                Contact Us
              </button>
            </div>
            
            <p className="mt-4">
              © {currentYear} Lighthouse BBC Official Website. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;