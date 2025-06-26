
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shield, Heart, Clock, Utensils, Bed, MapPin, Stethoscope, Wifi } from "lucide-react";

interface ConcernsStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const ConcernsStep = ({ onNext, tripData, setTripData }: ConcernsStepProps) => {
  const [selectedConcerns, setSelectedConcerns] = useState(tripData.concerns || []);
  const [additionalNotes, setAdditionalNotes] = useState(tripData.additionalNotes || "");

  const concernCategories = [
    {
      category: "Safety & Security",
      icon: Shield,
      color: "red",
      concerns: [
        { id: "neighborhood-safety", label: "Safe neighborhoods", description: "Well-lit, low-crime areas" },
        { id: "emergency-access", label: "Medical facilities nearby", description: "Hospitals and clinics accessible" },
        { id: "secure-accommodation", label: "Secure accommodations", description: "Safe locks, security features" },
        { id: "child-safety", label: "Child-safe environments", description: "Childproofed rooms, safe play areas" }
      ]
    },
    {
      category: "Health & Dietary",
      icon: Stethoscope,
      color: "green",
      concerns: [
        { id: "food-allergies", label: "Food allergies", description: "Allergy-friendly restaurants" },
        { id: "dietary-restrictions", label: "Dietary restrictions", description: "Vegetarian, halal, kosher options" },
        { id: "medical-needs", label: "Special medical needs", description: "Pharmacy access, medical equipment" },
        { id: "clean-water", label: "Clean water access", description: "Safe drinking water" }
      ]
    },
    {
      category: "Comfort & Convenience",
      icon: Heart,
      color: "blue",
      concerns: [
        { id: "sleep-schedules", label: "Sleep schedules", description: "Quiet rooms, blackout curtains" },
        { id: "stroller-access", label: "Stroller accessibility", description: "Ramps, elevators, wide paths" },
        { id: "family-bathrooms", label: "Family-friendly bathrooms", description: "Changing tables, family restrooms" },
        { id: "wifi-connectivity", label: "Reliable internet", description: "Stay connected for work or entertainment" }
      ]
    },
    {
      category: "Activities & Entertainment",
      icon: MapPin,
      color: "orange",
      concerns: [
        { id: "age-appropriate", label: "Age-appropriate activities", description: "Suitable for all kids' ages" },
        { id: "weather-backup", label: "Indoor backup plans", description: "Weather-independent activities" },
        { id: "educational-value", label: "Educational experiences", description: "Learning opportunities for kids" },
        { id: "screen-time", label: "Screen time balance", description: "Mix of digital and offline activities" }
      ]
    },
    {
      category: "Logistics & Planning",
      icon: Clock,
      color: "purple",
      concerns: [
        { id: "transportation", label: "Easy transportation", description: "Public transit, walkable distances" },
        { id: "luggage-handling", label: "Luggage assistance", description: "Porter services, storage options" },
        { id: "language-barriers", label: "Language support", description: "English-speaking staff, translation help" },
        { id: "booking-flexibility", label: "Flexible bookings", description: "Changeable reservations, refund options" }
      ]
    }
  ];

  const handleConcernToggle = (concernId: string) => {
    setSelectedConcerns((prev: string[]) =>
      prev.includes(concernId)
        ? prev.filter((id) => id !== concernId)
        : [...prev, concernId]
    );
  };

  const handleNext = () => {
    setTripData({
      ...tripData,
      concerns: selectedConcerns,
      additionalNotes
    });
    onNext();
  };

  const getColorClasses = (color: string) => {
    const colors = {
      red: "text-red-600",
      green: "text-green-600",
      blue: "text-blue-600",
      orange: "text-orange-600",
      purple: "text-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What matters most to your family?
        </h2>
        <p className="text-lg text-gray-600">
          Help us understand your priorities and concerns for the trip
        </p>
      </div>

      <div className="space-y-6">
        {concernCategories.map((category) => {
          const IconComponent = category.icon;
          const categorySelected = category.concerns.some(concern => 
            selectedConcerns.includes(concern.id)
          );
          
          return (
            <Card key={category.category} className={categorySelected ? "border-blue-200 bg-blue-50/30" : ""}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <IconComponent className={`w-5 h-5 mr-2 ${getColorClasses(category.color)}`} />
                  {category.category}
                  {categorySelected && (
                    <Badge className="ml-2 bg-blue-100 text-blue-700">
                      {category.concerns.filter(c => selectedConcerns.includes(c.id)).length} selected
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.concerns.map((concern) => {
                    const isSelected = selectedConcerns.includes(concern.id);
                    
                    return (
                      <div
                        key={concern.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleConcernToggle(concern.id)}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleConcernToggle(concern.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{concern.label}</h4>
                            <p className="text-xs text-gray-600">{concern.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes</CardTitle>
          <CardDescription>
            Anything else we should know about your family's needs or preferences?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="additional-notes" className="sr-only">Additional notes</Label>
          <Textarea
            id="additional-notes"
            placeholder="e.g., One child has autism and needs quiet spaces, we prefer morning activities, we're celebrating an anniversary..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={4}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Summary */}
      {selectedConcerns.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">Your Selected Priorities:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedConcerns.map((concernId) => {
                const concern = concernCategories
                  .flatMap(cat => cat.concerns)
                  .find(c => c.id === concernId);
                return concern ? (
                  <Badge key={concernId} className="bg-blue-100 text-blue-700">
                    {concern.label}
                  </Badge>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue to Budget
        </Button>
      </div>
    </div>
  );
};
