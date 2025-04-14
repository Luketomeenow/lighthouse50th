
import ProgramFlow from "@/components/ProgramFlow";

const Flow = () => {
  return (
    <div className="min-h-screen bg-green-900">
      <div className="container mx-auto pt-24 pb-16 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-white mb-4 md:mb-6 text-center md:text-left">Program Flow</h1>
        <p className="text-gray-200 mb-8 text-center md:text-left max-w-3xl">
          Detailed schedule for our 50th Anniversary celebration. Join us for two days of worship, fellowship, and celebration.
        </p>
        
        <ProgramFlow />
      </div>
    </div>
  );
};

export default Flow;
