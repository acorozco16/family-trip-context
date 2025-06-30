
import React from 'react';
import { useTrip } from '../context/TripContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, DollarSign, MapPin } from 'lucide-react';

export default function Overview() {
  const { trip, loading } = useTrip();

  if (loading) {
    return <div className="p-6">Loading trip details...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  const budgetPercentage = (trip.budget.spent / trip.budget.total) * 100;
  const packedItems = trip.packingList.filter(item => item.isPacked).length;
  const packingPercentage = (packedItems / trip.packingList.length) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.name}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{trip.participants.length} travelers</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Budget Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${trip.budget.spent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              of ${trip.budget.total.toLocaleString()} total
            </p>
            <Progress value={budgetPercentage} className="mt-2" />
          </CardContent>
        </Card>

        {/* Packing Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packing Progress</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packedItems}</div>
            <p className="text-xs text-muted-foreground">
              of {trip.packingList.length} items packed
            </p>
            <Progress value={packingPercentage} className="mt-2" />
          </CardContent>
        </Card>

        {/* Locations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trip.locations.length}</div>
            <p className="text-xs text-muted-foreground">locations to visit</p>
          </CardContent>
        </Card>
      </div>

      {/* Family Members */}
      <Card>
        <CardHeader>
          <CardTitle>Family Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trip.participants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{participant.name}</div>
                  <div className="text-sm text-gray-500">Age {participant.age}</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {participant.dietaryRestrictions.map((restriction) => (
                    <Badge key={restriction} variant="secondary" className="text-xs">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Itinerary */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trip.itinerary.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="text-sm text-gray-500 min-w-0">
                  {new Date(item.startTime).toLocaleDateString()}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.location.name}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
