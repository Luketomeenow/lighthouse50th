
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-green-900">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 mt-16">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-300">
                Welcome to the Lighthouse Bible Baptist Church 50th Anniversary website. These Terms of Service govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use of Services</h2>
              <p className="text-gray-300">
                The information provided on this website is for general informational purposes only. We reserve the right to modify or discontinue any aspect of our website at any time without prior notice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Registration</h2>
              <p className="text-gray-300">
                Some portions of this website may require registration. You agree to provide accurate information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Privacy Policy</h2>
              <p className="text-gray-300">
                Your use of our website is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
              <p className="text-gray-300">
                All content on this website, including text, graphics, logos, images, and software, is the property of Lighthouse Bible Baptist Church and is protected by intellectual property laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
              <p className="text-gray-300">
                This website is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, as to the operation of the website or the information included on the website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-300">
                In no event shall Lighthouse Bible Baptist Church be liable for any damages whatsoever arising out of or in connection with the use or performance of this website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us at ministries@lighthousebbc.org.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
