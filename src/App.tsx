
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import TripCreator from "./pages/TripCreator";
import Dashboard from "./pages/Dashboard";
import ActivityDetail from "./pages/ActivityDetail";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { TripProvider } from "./trip/context/TripContext";
import Overview from "./trip/pages/Overview";
import Itinerary from "./trip/pages/Itinerary";
import PackingList from "./trip/pages/PackingList";
import Gallery from "./trip/pages/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/trip-creator" element={<TripCreator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          
          {/* Trip Routes */}
          <Route path="/trip" element={
            <TripProvider>
              <Layout>
                <Overview />
              </Layout>
            </TripProvider>
          } />
          <Route path="/trip/itinerary" element={
            <TripProvider>
              <Layout>
                <Itinerary />
              </Layout>
            </TripProvider>
          } />
          <Route path="/trip/packing" element={
            <TripProvider>
              <Layout>
                <PackingList />
              </Layout>
            </TripProvider>
          } />
          <Route path="/trip/gallery" element={
            <TripProvider>
              <Layout>
                <Gallery />
              </Layout>
            </TripProvider>
          } />
          
          {/* Redirect /trip/* to /trip for unknown routes */}
          <Route path="/trip/*" element={<Navigate to="/trip" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
