
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
  const [activeTrip] = useState("barcelona-2024");

  // Demo data for Barcelona trip
  const barcelonaTrip = {
    id: "barcelona-2024",
    destination: "Barcelona, Spain",
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
          name: "Hotel Casa Barcelona",
          dates: "July 15-19",
          status: "Confirmed",
          type: "Family Suite"
        },
        {
          name: "Airbnb Gothic Quarter",
          dates: "July 19-22",
          status: "Pending",
          type: "2BR Apartment"
        }
      ],
      transport: [
        {
          type: "Rental Car",
          provider: "Hertz",
          pickup: "Barcelona Airport",
          dates: "July 15-22",
          status: "Reserved"
        }
      ]
    },
    activities: [
      { 
        name: "Sagrada Familia Tour", 
        date: "July 16", 
        status: "Booked",
        time: "10:00 AM",
        duration: "2 hours",
        location: "Sagrada Familia",
        familyRating: 4.5,
        ageRecommendation: "6+",
        aiInsight: "Perfect timing to avoid crowds. Audio guide available in kids' version for Emma.",
        cost: "€60 family ticket",
        bookingRequired: true
      },
      { 
        name: "Park Güell", 
        date: "July 17", 
        status: "Planned",
        time: "9:00 AM",
        duration: "3 hours",
        location: "Park Güell",
        familyRating: 4.8,
        ageRecommendation: "All ages",
        aiInsight: "Early morning visit recommended - cooler weather and better photos. Lots of walking, bring comfortable shoes.",
        cost: "€35 family ticket",
        bookingRequired: true
      },
      { 
        name: "Barcelona Beach Day", 
        date: "July 18", 
        status: "Planned",
        time: "11:00 AM",
        duration: "4 hours",
        location: "Barceloneta Beach",
        familyRating: 4.2,
        ageRecommendation: "All ages",
        aiInsight: "Great for kids! Beach volleyball courts nearby for Jake. Remember sunscreen and early lunch.",
        cost: "Free",
        bookingRequired: false
      }
    ],
    updates: [
      { time: "2 hours ago", user: "Sarah", message: "Added beach day to itinerary" },
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
            <TripOverview trip={barcelonaTrip} />

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <OverviewTab trip={barcelonaTrip} />
              </TabsContent>

              <TabsContent value="bookings">
                <BookingsTab trip={barcelonaTrip} />
              </TabsContent>

              <TabsContent value="itinerary">
                <ItineraryTab activities={barcelonaTrip.activities} />
              </TabsContent>

              <TabsContent value="family">
                <FamilyTab kids={barcelonaTrip.kids} />
              </TabsContent>
            </Tabs>
          </div>

          <LiveUpdatesSidebar updates={barcelonaTrip.updates} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
