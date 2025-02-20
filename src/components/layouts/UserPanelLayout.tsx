
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListOrdered, Grid, Users, UserCircle, Settings, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ListOrdered, label: "Step by Step Flow", path: "/flow" },
  { icon: Grid, label: "Seat Plan", path: "/seat-plan" },
  { icon: Users, label: "Ministries", path: "/ministries" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" }
];

interface UserPanelLayoutProps {
  children: React.ReactNode;
}

const UserPanelLayout = ({ children }: UserPanelLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold">User Panel</h1>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-600 transition-colors",
                  location.pathname === item.path
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-200 ease-in-out",
          sidebarOpen ? "md:ml-64" : ""
        )}
      >
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
};

export default UserPanelLayout;
