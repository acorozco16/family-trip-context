
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, Star } from "lucide-react";

interface DestinationStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const DestinationStep = ({ onNext, tripData, setTripData }: DestinationStepProps) => {
  const [destination, setDestination] = useState(tripData.destination || "");
  const [startDate, setStartDate] = useState(tripData.startDate || "");
  const [endDate, setEndDate] = useState(tripData.endDate || "");
  const [selectedDestination, setSelectedDestination] = useState(tripData.selectedDestination || "");

  const popularDestinations = [
    {
      name: "Barcelona, Spain",
      description: "Family-friendly beaches, parks, and culture",
      duration: "5-7 days",
      rating: 4.8,
      highlights: ["Sagrada Familia", "Park Güell", "Beach time"]
    },
    {
      name: "Orlando, Florida",
      description: "Theme parks and family entertainment",
      duration: "4-6 days",
      rating: 4.9,
      highlights: ["Disney World", "Universal Studios", "Water parks"]
    },
    {
      name: "Tokyo, Japan",
      description: "Unique culture and kid-friendly activities",
      duration: "7-10 days",
      rating: 4.7,
      highlights: ["Tokyo Disneyland", "Traditional temples", "Amazing food"]
    },
    {
      name: "London, England",
      description: "History, museums, and royal attractions",
      duration: "5-7 days",
      rating: 4.6,
      highlights: ["Harry Potter Studios", "London Eye", "Museums"]
    }
  ];

  const handleDestinationSelect = (dest: any) => {
    setSelectedDestination(dest.name);
    setDestination(dest.name);
  };

  const handleNext = () => {
    setTripData({
      ...tripData,
      destination,
      startDate,
      endDate,
      selectedDestination
    });
    onNext();
  };

  const isValid = destination && startDate && endDate;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Where would you like to go?
        </h2>
        <p className="text-lg text-gray-600">
          Choose your destination and travel dates to get started
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Manual Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              Custom Destination
            </CardTitle>
            <CardDescription>
              Enter any destination you have in mind
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, France"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
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

        {/* Popular Destinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 text-orange-600 mr-2" />
              Popular Family Destinations
            </CardTitle>
            <CardDescription>
              Curated destinations perfect for families
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularDestinations.map((dest) => (
                <div
                  key={dest.name}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDestination === dest.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleDestinationSelect(dest)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{dest.name}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{dest.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{dest.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{dest.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dest.highlights.slice(0, 2).map((highlight) => (
                        <Badge key={highlight} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
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
