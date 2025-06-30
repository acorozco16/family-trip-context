
import React from 'react';
import { useTrip } from '../context/TripContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import AddActivityModal from '@/components/dashboard/AddActivityModal';

export default function Itinerary() {
  const { trip, loading, addItineraryItem } = useTrip();

  if (loading) {
    return <div className="p-6">Loading itinerary...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  const handleAddActivity = (activityData: any) => {
    const newItineraryItem = {
      id: Date.now().toString(),
      title: activityData.name,
      description: activityData.aiInsight || `${activityData.name} activity`,
      startTime: `${activityData.date}T${activityData.time || '09:00'}:00Z`,
      endTime: `${activityData.date}T${calculateEndTime(activityData.time || '09:00', activityData.duration || '2 hours')}:00Z`,
      location: {
        id: Date.now().toString(),
        name: activityData.location || 'TBD',
        address: activityData.location || '',
      },
      participants: trip.participants.map(p => p.id),
    };
    
    addItineraryItem(newItineraryItem);
  };

  const calculateEndTime = (startTime: string, duration: string) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    let durationHours = 2;
    
    if (duration.includes('30 minutes')) durationHours = 0.5;
    else if (duration.includes('1 hour')) durationHours = 1;
    else if (duration.includes('1.5 hours')) durationHours = 1.5;
    else if (duration.includes('3 hours')) durationHours = 3;
    else if (duration.includes('Half day')) durationHours = 4;
    else if (duration.includes('Full day')) durationHours = 8;
    
    const endHours = hours + Math.floor(durationHours);
    const endMinutes = minutes + ((durationHours % 1) * 60);
    
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  const groupedItinerary = trip.itinerary.reduce((acc, item) => {
    const date = new Date(item.startTime).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof trip.itinerary>);

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Itinerary</h1>
            <p className="text-gray-600">Your family's planned activities and schedule</p>
          </div>
          <AddActivityModal onAddActivity={handleAddActivity} />
        </div>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedItinerary).map(([date, activities]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                {new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
            </div>
            
            <div className="space-y-4">
              {activities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(activity.startTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })} - {new Date(activity.endTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit' 
                        })}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    
                    <div className="flex items-start gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{activity.participants.length} participants</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {trip.itinerary.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities planned yet</h3>
            <p className="text-gray-500 mb-4">Start building your family itinerary by adding activities and events.</p>
            <AddActivityModal onAddActivity={handleAddActivity} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
