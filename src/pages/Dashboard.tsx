
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OverviewTab from "@/components/dashboard/OverviewTab";
import ItineraryTab from "@/components/dashboard/ItineraryTab";
import BookingsTab from "@/components/dashboard/BookingsTab";
import FamilyTab from "@/components/dashboard/FamilyTab";
import LiveUpdatesSidebar from "@/components/dashboard/LiveUpdatesSidebar";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for live updates
  const liveUpdates = [
    {
      time: "2 min ago",
      user: "Sarah",
      message: "Added Flamenco show to Tuesday evening"
    },
    {
      time: "15 min ago", 
      user: "Mike",
      message: "Booked tickets for Prado Museum"
    },
    {
      time: "1 hour ago",
      user: "Emma", 
      message: "Voted for the chocolate tour!"
    }
  ];

  const handleAddActivity = (activity: any) => {
    // In a real app, this would update the activities in your data store
    console.log("New activity added:", activity);
    // You could show a toast notification here
    // You might also want to switch to the itinerary tab to show the new activity
    setActiveTab("itinerary");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <OverviewTab />
              </TabsContent>
              
              <TabsContent value="itinerary">
                <ItineraryTab />
              </TabsContent>
              
              <TabsContent value="bookings">
                <BookingsTab />
              </TabsContent>
              
              <TabsContent value="family">
                <FamilyTab />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <LiveUpdatesSidebar updates={liveUpdates} onAddActivity={handleAddActivity} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
