
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Funding = () => {
  return (
    <div className="min-h-screen bg-green-900 pt-20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8 text-center">Funding</h1>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-white">
            <p className="text-center text-gray-300">Coming soon...</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Funding;
