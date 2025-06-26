
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar } from "lucide-react";

interface DestinationStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const DestinationStep = ({ onNext, tripData, setTripData }: DestinationStepProps) => {
  const [destination, setDestination] = useState(tripData.destination || "");
  const [startDate, setStartDate] = useState(tripData.startDate || "");
  const [endDate, setEndDate] = useState(tripData.endDate || "");

  const handleNext = () => {
    setTripData({
      ...tripData,
      destination,
      startDate,
      endDate
    });
    onNext();
  };

  const isValid = destination && startDate && endDate;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Let's plan your family trip
        </h2>
        <p className="text-lg text-gray-600">
          Tell us where you want to go and when you're planning to travel
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              Trip Details Setup
            </CardTitle>
            <CardDescription>
              Enter your destination and travel dates to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, France or Orlando, Florida"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={handleNext}
          disabled={!isValid}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue to Family Profiles
        </Button>
      </div>
    </div>
  );
};
