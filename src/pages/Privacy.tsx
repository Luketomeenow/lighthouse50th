
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-green-900">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 mt-16">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-300">
                At Lighthouse Bible Baptist Church, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and disclose information about you when you use our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-gray-300">
                We may collect personal information, such as your name, email address, and contact information when you register for our events or submit forms on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-1">
                <li>Process your event registrations</li>
                <li>Communicate with you about our services and events</li>
                <li>Respond to your inquiries</li>
                <li>Improve our website and services</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cookies and Similar Technologies</h2>
              <p className="text-gray-300">
                We may use cookies and similar technologies to collect information about your browsing activities over time and across different websites.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. How We Share Your Information</h2>
              <p className="text-gray-300">
                We do not sell your personal information to third parties. We may share your information with service providers who perform services on our behalf, such as hosting our website or processing payments.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
              <p className="text-gray-300">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
              <p className="text-gray-300">
                You may have certain rights regarding your personal information, including the right to access, correct, or delete your personal information.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at ministries@lighthousebbc.org.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;
