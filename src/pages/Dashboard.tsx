
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Calendar, MapPin, Users, Plus } from "lucide-react";

// Mock trips data
const mockTrips = [
  {
    id: '1',
    name: 'Family Beach Vacation',
    destination: 'Myrtle Beach, SC',
    startDate: '2024-07-15',
    endDate: '2024-07-22',
    participants: 4,
    status: 'active',
    progress: 85,
    image: '/placeholder.svg'
  },
  {
    id: '2', 
    name: 'European Adventure',
    destination: 'Paris, France',
    startDate: '2024-09-10',
    endDate: '2024-09-20',
    participants: 3,
    status: 'planning',
    progress: 45,
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Mountain Getaway',
    destination: 'Aspen, CO',
    startDate: '2024-12-18',
    endDate: '2024-12-25',
    participants: 5,
    status: 'planning',
    progress: 20,
    image: '/placeholder.svg'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTripSelect = (tripId: string) => {
    // Navigate to the specific trip - for now we'll use the existing trip route
    // In a real app, you'd pass the tripId as a parameter
    navigate('/trip');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Family Trips</h1>
          <p className="text-gray-600">Select a trip to view details and manage your family adventure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTrips.map((trip) => (
            <Card key={trip.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border border-blue-200">
              <CardHeader className="pb-4">
                <div className="aspect-video w-full bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{trip.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {trip.destination}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {trip.participants} participants
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{trip.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all" 
                      style={{ width: `${trip.progress}%` }}
                    />
                  </div>
                </div>

                <Button 
                  onClick={() => handleTripSelect(trip.id)}
                  className="w-full bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700"
                >
                  {trip.status === 'active' ? 'View Trip' : 'Continue Planning'}
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Create New Trip Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border border-blue-200 border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <Plus className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Trip</h3>
              <p className="text-gray-600 mb-6">Start planning your next family adventure</p>
              <Button 
                onClick={() => navigate('/trip-creator')}
                className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
