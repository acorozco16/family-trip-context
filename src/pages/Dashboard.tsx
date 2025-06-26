
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Heart, 
  Plus, 
  Plane, 
  Hotel, 
  Car,
  Clock,
  MessageCircle,
  Bell,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
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
      { name: "Sagrada Familia Tour", date: "July 16", status: "Booked" },
      { name: "Park Güell", date: "July 17", status: "Planned" },
      { name: "Barcelona Beach Day", date: "July 18", status: "Planned" }
    ],
    updates: [
      { time: "2 hours ago", user: "Sarah", message: "Added beach day to itinerary" },
      { time: "1 day ago", user: "Mike", message: "Confirmed hotel booking" },
      { time: "2 days ago", user: "Sarah", message: "Updated Emma's dietary needs" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FamilySync</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => navigate("/trip-creator")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Trip
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Trip Overview */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-8 h-8 text-blue-600 mr-3" />
                    {barcelonaTrip.destination}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-blue-100 text-blue-700">
                      <Calendar className="w-3 h-3 mr-1" />
                      {barcelonaTrip.dates}
                    </Badge>
                    <Badge className="bg-green-100 text-green-700">
                      <Users className="w-3 h-3 mr-1" />
                      {barcelonaTrip.travelers} travelers
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-700">
                      {barcelonaTrip.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Home
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Plane className="w-5 h-5 text-blue-600 mr-2" />
                        Flights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-600">Confirmed</p>
                        <p className="text-sm text-gray-600">{barcelonaTrip.bookings.flights.outbound}</p>
                        <p className="text-sm text-gray-600">{barcelonaTrip.bookings.flights.return}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Hotel className="w-5 h-5 text-orange-600 mr-2" />
                        Stays
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-green-600">1 Confirmed</p>
                        <p className="text-sm font-medium text-yellow-600">1 Pending</p>
                        <p className="text-sm text-gray-600">Family Suite + 2BR Apt</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Car className="w-5 h-5 text-purple-600 mr-2" />
                        Transport
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-blue-600">Reserved</p>
                        <p className="text-sm text-gray-600">Rental Car - Hertz</p>
                        <p className="text-sm text-gray-600">Airport pickup</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Trip Progress</CardTitle>
                    <CardDescription>Complete your planning checklist</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-500">{barcelonaTrip.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all" 
                          style={{ width: `${barcelonaTrip.progress}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Flights booked</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Primary hotel confirmed</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">Second stay pending</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <span className="text-sm">Activities to book</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Plane className="w-5 h-5 text-blue-600 mr-2" />
                        Flight Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{barcelonaTrip.bookings.flights.outbound}</p>
                            <p className="text-sm text-gray-600">Outbound - All family members</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{barcelonaTrip.bookings.flights.return}</p>
                            <p className="text-sm text-gray-600">Return - All family members</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Hotel className="w-5 h-5 text-orange-600 mr-2" />
                        Accommodations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {barcelonaTrip.bookings.accommodations.map((stay, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{stay.name}</p>
                              <p className="text-sm text-gray-600">{stay.dates} - {stay.type}</p>
                            </div>
                            <Badge className={
                              stay.status === "Confirmed" 
                                ? "bg-green-100 text-green-700" 
                                : "bg-yellow-100 text-yellow-700"
                            }>
                              {stay.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Planned Activities</CardTitle>
                    <CardDescription>Your family-friendly Barcelona itinerary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {barcelonaTrip.activities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{activity.name}</p>
                            <p className="text-sm text-gray-600">{activity.date}</p>
                          </div>
                          <Badge className={
                            activity.status === "Booked" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }>
                            {activity.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="family" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Family Members</CardTitle>
                    <CardDescription>Travel preferences and special needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {barcelonaTrip.kids.map((kid, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{kid.name}</h4>
                            <Badge className="bg-blue-100 text-blue-700">Age {kid.age}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{kid.needs || kid.interests}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Updates Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Live Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {barcelonaTrip.updates.map((update, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{update.time}</span>
                      </div>
                      <p className="text-sm font-medium">{update.user}</p>
                      <p className="text-sm text-gray-600">{update.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Family Chat
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Update Dates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
