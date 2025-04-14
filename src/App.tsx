
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Ministries from './pages/Ministries';
import LatestNews from './pages/LatestNews';
import Resources from './pages/Resources';
import Flow from './pages/Flow';
import History from './pages/History';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SeatPlan from './pages/SeatPlan';
import Settings from './pages/Settings';
import Funding from './pages/Funding';
import Activities from './pages/Activities';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import UserPanelLayout from './components/layouts/UserPanelLayout';

// Initialize Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="lovable-ui-theme">
        <Toaster richColors position="top-right" />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* User Panel Routes */}
            <Route path="/dashboard" element={<UserPanelLayout><Dashboard /></UserPanelLayout>} />
            <Route path="/resources" element={<UserPanelLayout><Resources /></UserPanelLayout>} />
            <Route path="/ministries" element={<UserPanelLayout><Ministries /></UserPanelLayout>} />
            <Route path="/latest-news" element={<UserPanelLayout><LatestNews /></UserPanelLayout>} />
            <Route path="/flow" element={<UserPanelLayout><Flow /></UserPanelLayout>} />
            <Route path="/history" element={<UserPanelLayout><History /></UserPanelLayout>} />
            <Route path="/profile" element={<UserPanelLayout><Profile /></UserPanelLayout>} />
            <Route path="/seat-plan" element={<UserPanelLayout><SeatPlan /></UserPanelLayout>} />
            <Route path="/settings" element={<UserPanelLayout><Settings /></UserPanelLayout>} />
            <Route path="/funding" element={<UserPanelLayout><Funding /></UserPanelLayout>} />
            <Route path="/activities" element={<UserPanelLayout><Activities /></UserPanelLayout>} />
            
            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
