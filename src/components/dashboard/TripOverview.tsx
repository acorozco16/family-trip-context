
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TripOverviewProps {
  trip: {
    destination: string;
    dates: string;
    travelers: number;
    status: string;
  };
}

const TripOverview = ({ trip }: TripOverviewProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MapPin className="w-8 h-8 text-blue-600 mr-3" />
            {trip.destination}
          </h1>
          <div className="flex items-center space-x-4 mt-2">
            <Badge className="bg-blue-100 text-blue-700">
              <Calendar className="w-3 h-3 mr-1" />
              {trip.dates}
            </Badge>
            <Badge className="bg-green-100 text-green-700">
              <Users className="w-3 h-3 mr-1" />
              {trip.travelers} travelers
            </Badge>
            <Badge className="bg-orange-100 text-orange-700">
              {trip.status}
            </Badge>
          </div>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default TripOverview;
