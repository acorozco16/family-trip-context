
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

  // Mock trip data
  const tripData = {
    progress: 75,
    bookings: {
      flights: {
        outbound: "NYC → Madrid, March 15th, 9:30 AM",
        return: "Madrid → NYC, March 22nd, 2:15 PM",
        status: "Confirmed"
      },
      accommodations: [
        {
          name: "Hotel Villa Magna",
          dates: "March 15-18",
          status: "Confirmed",
          type: "Family Suite"
        },
        {
          name: "Madrid Central Apartment",
          dates: "March 18-22",
          status: "Pending",
          type: "2BR Apartment"
        }
      ],
      transport: [
        {
          type: "Rental Car",
          provider: "Hertz",
          pickup: "Madrid Airport",
          dates: "March 15-22",
          status: "Reserved"
        }
      ]
    }
  };

  // Mock activities data
  const activitiesData = [
    {
      name: "Prado Museum",
      date: "Monday, March 16th",
      status: "Booked",
      time: "10:00 AM",
      duration: "2-3 hours",
      location: "Paseo del Prado",
      familyRating: 4,
      ageRecommendation: "8+",
      aiInsight: "Perfect timing - the museum is less crowded in the morning, and Emma will love the art workshops for kids!",
      cost: "€48 for family",
      bookingRequired: true
    },
    {
      name: "Flamenco Show",
      date: "Tuesday, March 17th",
      status: "Planned",
      time: "8:00 PM",
      duration: "1.5 hours",
      location: "Corral de la Morería",
      familyRating: 5,
      ageRecommendation: "All ages",
      aiInsight: "This authentic flamenco venue offers special family seating and Jake will be amazed by the guitar work!",
      cost: "€120 for family",
      bookingRequired: true
    }
  ];

  // Mock kids data
  const kidsData = [
    {
      name: "Emma",
      age: 8,
      interests: "Art, animals, and interactive experiences"
    },
    {
      name: "Jake", 
      age: 12,
      needs: "Loves sports, especially soccer, and outdoor activities"
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm">
                <TabsTrigger value="overview" className="text-stone-700 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">Overview</TabsTrigger>
                <TabsTrigger value="itinerary" className="text-stone-700 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">Itinerary</TabsTrigger>
                <TabsTrigger value="bookings" className="text-stone-700 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">Bookings</TabsTrigger>
                <TabsTrigger value="family" className="text-stone-700 data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800">Family</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <OverviewTab trip={tripData} />
              </TabsContent>
              
              <TabsContent value="itinerary">
                <ItineraryTab activities={activitiesData} />
              </TabsContent>
              
              <TabsContent value="bookings">
                <BookingsTab trip={tripData} />
              </TabsContent>
              
              <TabsContent value="family">
                <FamilyTab kids={kidsData} />
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
