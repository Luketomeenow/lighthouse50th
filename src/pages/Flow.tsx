
import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import ProgramFlow from "@/components/ProgramFlow";

const Flow = () => {
  return (
    <UserPanelLayout>
      <div className="space-y-8 pb-12">
        <h1 className="text-2xl font-bold">Program Flow</h1>
        <p className="text-gray-600">Detailed schedule for our 50th Anniversary celebration.</p>
        
        <ProgramFlow />
      </div>
    </UserPanelLayout>
  );
};

export default Flow;
