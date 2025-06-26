
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TripOverview from "@/components/dashboard/TripOverview";
import OverviewTab from "@/components/dashboard/OverviewTab";
import BookingsTab from "@/components/dashboard/BookingsTab";
import ItineraryTab from "@/components/dashboard/ItineraryTab";
import FamilyTab from "@/components/dashboard/FamilyTab";
import LiveUpdatesSidebar from "@/components/dashboard/LiveUpdatesSidebar";

const Dashboard = () => {
  const [activeTrip] = useState("madrid-2024");

  // Demo data for Madrid trip
  const madridTrip = {
    id: "madrid-2024",
    destination: "Madrid, Spain",
    dates: "July 15-22, 2024",
    travelers: 4,
    status: "Planning",
    progress: 75,
    budget: "Comfort & Convenience",
    kids: [
      { name: "Emma", age: 8, needs: "Early bedtime, no spicy food" },
      { name: "Jake", age: 12, interests: "Museums, soccer" }
    ],
    bookings: {
      flights: {
        outbound: "AA 1234 - July 15, 8:30 AM",
        return: "AA 5678 - July 22, 6:15 PM",
        status: "Confirmed"
      },
      accommodations: [
        {
          name: "Hotel Villa Real Madrid",
          dates: "July 15-19",
          status: "Confirmed",
          type: "Family Suite"
        },
        {
          name: "Airbnb Gran Via",
          dates: "July 19-22",
          status: "Pending",
          type: "2BR Apartment"
        }
      ],
      transport: [
        {
          type: "Rental Car",
          provider: "Hertz",
          pickup: "Madrid Airport",
          dates: "July 15-22",
          status: "Reserved"
        }
      ]
    },
    activities: [
      { 
        name: "Prado Museum Tour", 
        date: "July 16", 
        status: "Booked",
        time: "10:00 AM",
        duration: "2 hours",
        location: "Museo del Prado",
        familyRating: 4.5,
        ageRecommendation: "6+",
        aiInsight: "Perfect timing to avoid crowds. Kids' audio guide available for Emma with special family route.",
        cost: "€60 family ticket",
        bookingRequired: true
      },
      { 
        name: "Retiro Park & Crystal Palace", 
        date: "July 17", 
        status: "Planned",
        time: "9:00 AM",
        duration: "3 hours",
        location: "Parque del Retiro",
        familyRating: 4.8,
        ageRecommendation: "All ages",
        aiInsight: "Perfect for families! Kids can rent boats on the lake and explore the beautiful Crystal Palace. Great photo opportunities.",
        cost: "Free entry",
        bookingRequired: false
      },
      { 
        name: "Royal Palace Visit", 
        date: "July 18", 
        status: "Planned",
        time: "11:00 AM",
        duration: "2.5 hours",
        location: "Palacio Real",
        familyRating: 4.2,
        ageRecommendation: "8+",
        aiInsight: "Skip-the-line tickets recommended. The armory will fascinate Jake! Consider the family audio guide.",
        cost: "€45 family ticket",
        bookingRequired: true
      }
    ],
    updates: [
      { time: "2 hours ago", user: "Sarah", message: "Added Royal Palace to itinerary" },
      { time: "1 day ago", user: "Mike", message: "Confirmed hotel booking" },
      { time: "2 days ago", user: "Sarah", message: "Updated Emma's dietary needs" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <TripOverview trip={madridTrip} />

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <OverviewTab trip={madridTrip} />
              </TabsContent>

              <TabsContent value="bookings">
                <BookingsTab trip={madridTrip} />
              </TabsContent>

              <TabsContent value="itinerary">
                <ItineraryTab activities={madridTrip.activities} />
              </TabsContent>

              <TabsContent value="family">
                <FamilyTab kids={madridTrip.kids} />
              </TabsContent>
            </Tabs>
          </div>

          <LiveUpdatesSidebar updates={madridTrip.updates} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
