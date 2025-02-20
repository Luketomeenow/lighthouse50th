
import UserPanelLayout from "@/components/layouts/UserPanelLayout";

const Dashboard = () => {
  return (
    <UserPanelLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </UserPanelLayout>
  );
};

export default Dashboard;
