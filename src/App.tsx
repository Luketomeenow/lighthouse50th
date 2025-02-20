
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Funding from "./pages/Funding";
import Ministries from "./pages/Ministries";
import LatestNews from "./pages/LatestNews";
import Dashboard from "./pages/Dashboard";
import Flow from "./pages/Flow";
import SeatPlan from "./pages/SeatPlan";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/latest-news" element={<LatestNews />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/seat-plan" element={<SeatPlan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
