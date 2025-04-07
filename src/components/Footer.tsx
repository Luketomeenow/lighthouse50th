
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
    <footer className="bg-gray-900 text-white relative overflow-hidden">
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
          <p className="text-center max-w-2xl text-gray-400 mb-8">
            Lighthouse Bible Baptist Churches and Ministries celebrates 50 years of serving the Lord and spreading His Word.
            Join us as we commemorate this significant milestone in our journey of faith.
          </p>
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
                <Button type="submit" disabled={isSubmitting} className="bg-yellow-500 hover:bg-yellow-600 text-green-950">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : null}
        
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {currentYear} Lighthouse BBC Official Website. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
            <button 
              onClick={() => setShowContactForm(true)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Contact Us
            </button>
            <Link to="/ministries" className="text-gray-400 hover:text-white transition-colors">Ministries</Link>
            <Link to="/flow" className="text-gray-400 hover:text-white transition-colors">Program</Link>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://web.facebook.com/lighthousebbcmain" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={22} />
            </a>
            <a 
              href="https://www.instagram.com/lighthousebbc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Youtube"
            >
              <Youtube size={22} />
            </a>
            <a 
              href="mailto:contact@lighthousebbc.org" 
              className="text-gray-400 hover:text-green-500 transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
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
