import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Star, Sparkles, AlertTriangle, CheckCircle, CloudRain, Share, Calendar, MessageCircle, Link2, Trophy } from "lucide-react";
import AddActivityModal from "./AddActivityModal";

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

const ItineraryTab = ({ activities: initialActivities }: ItineraryTabProps) => {
  const [activities, setActivities] = useState(initialActivities);
  const navigate = useNavigate();

  const handleAddActivity = (newActivity: Activity) => {
    setActivities(prev => [...prev, newActivity]);
  };

  const handleActivityClick = (activityName: string) => {
    // Convert activity name to URL-friendly ID
    const activityId = activityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/activity/${activityId}`);
  };

  const handleWhatsAppShare = () => {
    const message = `🎉 Our family trip itinerary is ready! 

📅 ${Object.keys(groupedActivities).length} amazing days planned
🎯 ${activities.length} activities coordinated
👨‍👩‍👧‍👦 Perfect for our whole family

Check it out: [Family Trip Link]

Can't wait to make memories together! ✈️`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCalendarExport = () => {
    // Generate ICS file content
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FamApp//Family Trip Itinerary//EN
${activities.map(activity => `
BEGIN:VEVENT
SUMMARY:${activity.name}
DTSTART:${activity.date.replace(/-/g, '')}T${activity.time?.replace(':', '') || '0900'}00
LOCATION:${activity.location || ''}
DESCRIPTION:${activity.aiInsight || ''}
END:VEVENT`).join('')}
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'family-trip-itinerary.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFamilyLinkShare = () => {
    const shareUrl = `${window.location.origin}/trip`;
    navigator.clipboard.writeText(shareUrl);
    // You could add a toast notification here
    console.log('Family link copied to clipboard:', shareUrl);
  };

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
      {/* Share Your Masterpiece Section */}
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-900">
            <Trophy className="w-5 h-5 text-purple-600 mr-2" />
            Share Your Masterpiece
          </CardTitle>
          <CardDescription className="text-purple-700">
            You did the hard work planning this amazing trip - now get everyone on the same page instantly!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-green-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-3">
                <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-medium text-green-900">WhatsApp Family Group</h4>
              </div>
              <p className="text-sm text-green-700 mb-4">
                Send a beautifully formatted message with all the key details to your family group chat.
              </p>
              <Button 
                onClick={handleWhatsAppShare}
                size="sm" 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Share to WhatsApp
              </Button>
            </div>

            <div className="p-4 bg-white rounded-lg border border-blue-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-3">
                <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-blue-900">Everyone's Calendars</h4>
              </div>
              <p className="text-sm text-blue-700 mb-4">
                Export as calendar file that everyone can import into their phones and computers.
              </p>
              <Button 
                onClick={handleCalendarExport}
                size="sm" 
                variant="outline" 
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                Download ICS File
              </Button>
            </div>

            <div className="p-4 bg-white rounded-lg border border-purple-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center mb-3">
                <Link2 className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-purple-900">Family-Friendly Link</h4>
              </div>
              <p className="text-sm text-purple-700 mb-4">
                One simple link that works on any device - no apps or downloads needed.
              </p>
              <Button 
                onClick={handleFamilyLinkShare}
                size="sm" 
                variant="outline" 
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing AI-Optimized Family Itinerary Card */}
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
            <AddActivityModal onAddActivity={handleAddActivity} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedActivities).map(([date, dayActivities]) => (
              <div key={date} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">{date}</h3>
                <div className="space-y-4">
                  {dayActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleActivityClick(activity.name)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-gray-900 hover:text-purple-600 transition-colors">{activity.name}</h4>
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
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle booking logic here
                              }}
                            >
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
      
      {/* Existing Smart Coordinator Assistance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
            Smart Coordinator Assistance
          </CardTitle>
          <CardDescription>AI insights to help you manage family logistics seamlessly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Timing Conflict Avoided</p>
                    <p className="text-sm text-green-700 mt-1">I moved your museum visit to 10 AM to avoid Emma's 2 PM nap time. This gives you a 3-hour window before lunch.</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-green-300 text-green-700 hover:bg-green-100">
                  View Changes
                </Button>
              </div>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Grandparent-Friendly Alternative</p>
                    <p className="text-sm text-blue-700 mt-1">Found wheelchair accessible restaurant "Casa Marta" 2 blocks away. Same cuisine, ramp access, and they have high chairs for the kids.</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                  Add to Plan
                </Button>
              </div>
            </div>

            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <CloudRain className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-900">Backup Plan Ready</p>
                    <p className="text-sm text-orange-700 mt-1">Rain forecast for Tuesday afternoon. I've prepared 3 indoor alternatives: Aquarium (30 min away), Children's Science Museum, or covered shopping district with family cafes.</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  See Options
                </Button>
              </div>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-900">Schedule Optimization</p>
                    <p className="text-sm text-purple-700 mt-1">Jake's soccer interests + morning energy = perfect time for Santiago Bernabéu Stadium tour at 9 AM before crowds arrive.</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
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
