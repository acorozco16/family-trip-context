
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Hotel } from "lucide-react";

interface BookingsTabProps {
  trip: {
    bookings: {
      flights: {
        outbound: string;
        return: string;
        status: string;
      };
      accommodations: Array<{
        name: string;
        dates: string;
        status: string;
        type: string;
      }>;
    };
  };
}

const BookingsTab = ({ trip }: BookingsTabProps) => {
  return (
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
                <p className="font-medium">{trip.bookings.flights.outbound}</p>
                <p className="text-sm text-gray-600">Outbound - All family members</p>
              </div>
              <Badge className="bg-green-100 text-green-700">Confirmed</Badge>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{trip.bookings.flights.return}</p>
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
          {trip.bookings.accommodations.map((stay, index) => (
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
  );
};

export default BookingsTab;
