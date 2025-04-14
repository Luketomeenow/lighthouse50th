
import ProgramFlow from "@/components/ProgramFlow";

const Flow = () => {
  return (
    <div className="min-h-screen bg-green-900">
      <div className="container mx-auto pt-8 pb-16 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Program Flow</h1>
        <p className="text-gray-200 mb-8">Detailed schedule for our 50th Anniversary celebration.</p>
        
        <ProgramFlow />
      </div>
    </div>
  );
};

export default Flow;
