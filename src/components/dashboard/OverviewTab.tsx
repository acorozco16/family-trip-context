
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Hotel, Car } from "lucide-react";

interface OverviewTabProps {
  trip: {
    progress: number;
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
      transport: Array<{
        type: string;
        provider: string;
        pickup: string;
        dates: string;
        status: string;
      }>;
    };
  };
}

const OverviewTab = ({ trip }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
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
              <p className="text-sm text-gray-600">{trip.bookings.flights.outbound}</p>
              <p className="text-sm text-gray-600">{trip.bookings.flights.return}</p>
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
              <span className="text-sm text-gray-500">{trip.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${trip.progress}%` }}
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
    </div>
  );
};

export default OverviewTab;
