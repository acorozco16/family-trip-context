
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Star, Sparkles, Plus } from "lucide-react";

interface Activity {
  name: string;
  date: string;
  status: string;
  time?: string;
  duration?: string;
  location?: string;
  familyRating?: number;
  ageRecommendation?: string;
  aiInsight?: string;
  cost?: string;
  bookingRequired?: boolean;
}

interface ItineraryTabProps {
  activities: Activity[];
}

const ItineraryTab = ({ activities }: ItineraryTabProps) => {
  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    const date = activity.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                AI-Optimized Family Itinerary
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your family's preferences and needs
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedActivities).map(([date, dayActivities]) => (
              <div key={date} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">{date}</h3>
                <div className="space-y-4">
                  {dayActivities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-900">{activity.name}</h4>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                            {activity.familyRating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600 ml-1">{activity.familyRating}/5</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            {activity.time && (
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {activity.time} {activity.duration && `(${activity.duration})`}
                              </div>
                            )}
                            {activity.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {activity.location}
                              </div>
                            )}
                            {activity.ageRecommendation && (
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                Ages {activity.ageRecommendation}
                              </div>
                            )}
                          </div>
                          
                          {activity.aiInsight && (
                            <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="flex items-start">
                                <Sparkles className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-purple-800">{activity.aiInsight}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="ml-4 text-right">
                          {activity.cost && (
                            <p className="text-sm font-medium text-gray-900 mb-1">{activity.cost}</p>
                          )}
                          {activity.bookingRequired && activity.status !== "Booked" && (
                            <Button size="sm" variant="outline">
                              Book Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Recommendations</CardTitle>
          <CardDescription>Suggested activities based on your family profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border border-dashed border-purple-300 rounded-lg bg-purple-50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-purple-900">Madrid Zoo Aquarium</p>
                  <p className="text-sm text-purple-700">Perfect for Emma's age group, great for a hot afternoon with indoor and outdoor areas</p>
                </div>
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                  Add to Itinerary
                </Button>
              </div>
            </div>
            <div className="p-3 border border-dashed border-purple-300 rounded-lg bg-purple-50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-purple-900">Santiago Bernabéu Stadium Tour</p>
                  <p className="text-sm text-purple-700">Jake loves soccer - Real Madrid's legendary stadium would be amazing for him!</p>
                </div>
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700">
                  Add to Itinerary
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryTab;
