
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
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      setShowContactForm(false);
    }, 1000);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{ backgroundImage: `url('/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png')` }}
      />
      
      <div className="container mx-auto py-12 px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/bc98acf5-b602-4dcd-8a14-2785cc0af270.png" 
            alt="Lighthouse BBC 50th Anniversary" 
            className="h-16 w-auto mb-6"
          />
        </div>
        
        {showContactForm ? (
          <div className="max-w-md mx-auto bg-gray-800/60 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={4}
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>
              <div className="flex space-x-3">
                <Button type="submit" disabled={isSubmitting} variant="yellow" className="w-full">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : null}
        
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-gray-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
          <a 
            href="https://web.facebook.com/lighthousebbcmain" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Facebook
          </a>
          <a 
            href="https://www.instagram.com/lighthousebbc/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a 
            href="mailto:ministries@lighthousebbc.org" 
            className="text-gray-400 hover:text-white transition-colors"
          >
            Email Us
          </a>
          <a 
            href="https://www.lighthousebbc.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Lighthouse BBC Official Website
          </a>
        </div>
        
        <div className="text-center pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-2">
            "Ad His Glory, All For His Glory"
          </p>
          <p className="text-gray-600 text-xs">
            © {currentYear} Lighthouse BBC Official Website. All rights reserved.
          </p>
          <div className="flex justify-center mt-2 space-x-4">
            <Link to="/terms" className="text-gray-500 hover:text-white text-xs">Terms of Service</Link>
            <Link to="/privacy" className="text-gray-500 hover:text-white text-xs">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
