
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, Users, Star, Sparkles, Euro, Calendar, Edit } from "lucide-react";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock activity data - in a real app this would come from your data store
  const activity = {
    id: "prado-museum",
    name: "Prado Museum Tour",
    date: "July 16",
    status: "Booked",
    time: "10:00 AM",
    duration: "2 hours",
    location: "Museo del Prado",
    familyRating: 4.5,
    category: "Museums & Culture",
    participants: ["sarah", "mike", "emma", "jake"],
    aiInsight: "Perfect timing to avoid crowds. Kids' audio guide available for Emma with special family route.",
    cost: "€60 family ticket",
    bookingRequired: true,
    description: "Explore one of the world's finest art collections with masterpieces by Velázquez, Goya, and El Greco. The family-friendly audio guide makes it engaging for children.",
    highlights: [
      "Las Meninas by Velázquez",
      "The Third of May 1808 by Goya",
      "The Garden of Earthly Delights by Bosch",
      "Family interactive activities"
    ],
    practicalInfo: {
      address: "C. de Ruiz de Alarcón, 23, 28014 Madrid, Spain",
      phone: "+34 913 30 28 00",
      website: "www.museodelprado.es",
      openingHours: "10:00 AM - 8:00 PM",
      accessibility: "Wheelchair accessible, audio guides available"
    },
    bookingDetails: {
      confirmationNumber: "PRD-2024-789456",
      bookedDate: "June 15, 2024",
      cancellationPolicy: "Free cancellation up to 24 hours before"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Booked":
        return "bg-green-100 text-green-700";
      case "Planned":
        return "bg-blue-100 text-blue-700";
      case "Suggested":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const familyMembers = {
    sarah: "Sarah (Mom)",
    mike: "Mike (Dad)",
    emma: "Emma (8)",
    jake: "Jake (12)"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{activity.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <Badge variant="outline">{activity.category}</Badge>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{activity.familyRating}/5</span>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Activity
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{activity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{activity.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{activity.time} ({activity.duration})</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Euro className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{activity.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle>Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {activity.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* AI Insight */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <Sparkles className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-purple-900 mb-2">AI Family Insight</h3>
                      <p className="text-purple-800">{activity.aiInsight}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Practical Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Practical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900">Address:</span>
                    <p className="text-gray-700">{activity.practicalInfo.address}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Phone:</span>
                    <p className="text-gray-700">{activity.practicalInfo.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Website:</span>
                    <p className="text-gray-700">{activity.practicalInfo.website}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Opening Hours:</span>
                    <p className="text-gray-700">{activity.practicalInfo.openingHours}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Accessibility:</span>
                    <p className="text-gray-700">{activity.practicalInfo.accessibility}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activity.participants.map((participantId) => (
                      <div key={participantId} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm">{familyMembers[participantId as keyof typeof familyMembers]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Booking Details */}
              {activity.status === "Booked" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-900">Confirmation:</span>
                      <p className="text-gray-700 text-sm">{activity.bookingDetails.confirmationNumber}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Booked on:</span>
                      <p className="text-gray-700 text-sm">{activity.bookingDetails.bookedDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Cancellation:</span>
                      <p className="text-gray-700 text-sm">{activity.bookingDetails.cancellationPolicy}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {activity.status !== "Booked" && activity.bookingRequired && (
                    <Button className="w-full">Book Now</Button>
                  )}
                  <Button variant="outline" className="w-full">
                    View on Map
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share Activity
                  </Button>
                  {activity.status === "Booked" && (
                    <Button variant="outline" className="w-full text-red-600 border-red-300">
                      Cancel Booking
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
