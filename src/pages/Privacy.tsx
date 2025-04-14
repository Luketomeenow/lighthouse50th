
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-green-900 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-8 text-white border-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 md:p-12 border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p>Last Updated: April 14, 2025</p>
            
            <h2>1. Information We Collect</h2>
            <p>
              When you register for the 50th Anniversary event, we collect personal information such as your name, email address, age, contact number, and ministry involvement details.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information you provide to:
            </p>
            <ul>
              <li>Process your event registration</li>
              <li>Communicate with you about the event details and updates</li>
              <li>Improve our services and website experience</li>
              <li>Create appropriate accommodations for attendees</li>
            </ul>
            
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties except as follows:
            </p>
            <ul>
              <li>With trusted third parties who assist us in operating our website or conducting our events</li>
              <li>When required by law or to protect our rights</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
            
            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information where applicable</li>
              <li>Opt-out of communications from us</li>
            </ul>
            
            <h2>6. Cookies</h2>
            <p>
              Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.
            </p>
            
            <h2>7. Changes to Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be effective immediately upon posting on the website.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              For questions about this Privacy Policy, please contact us at <a href="mailto:ministries@lighthousebbc.org" className="text-yellow-300 hover:underline">ministries@lighthousebbc.org</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
