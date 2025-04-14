
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p>Last Updated: April 14, 2025</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Lighthouse Bible Baptist Church 50th Anniversary website, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please refrain from using our website.
            </p>
            
            <h2>2. Registration and User Information</h2>
            <p>
              When registering for the 50th Anniversary event, you agree to provide accurate, current, and complete information. 
              We reserve the right to cancel registrations if information provided is found to be inaccurate or misleading.
            </p>
            
            <h2>3. Privacy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy, which can be found <a href="/privacy" className="text-yellow-300 hover:underline">here</a>.
            </p>
            
            <h2>4. Intellectual Property</h2>
            <p>
              All content, logos, images, and materials on this website are the property of Lighthouse Bible Baptist Church and are protected by intellectual property laws. 
              You may not reproduce, distribute, or use any content without prior written permission.
            </p>
            
            <h2>5. User Conduct</h2>
            <p>
              When using our website, you agree not to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Engage in any activity that could harm, disable, or impair our website</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
            
            <h2>6. Limitation of Liability</h2>
            <p>
              Lighthouse Bible Baptist Church shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of or inability to use our website.
            </p>
            
            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. 
              Your continued use of the website constitutes acceptance of the modified terms.
            </p>
            
            <h2>8. Contact Us</h2>
            <p>
              For questions about these Terms of Service, please contact us at <a href="mailto:ministries@lighthousebbc.org" className="text-yellow-300 hover:underline">ministries@lighthousebbc.org</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
