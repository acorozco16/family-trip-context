
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, MapPin, Clock, Users, Euro } from "lucide-react";

interface AddActivityFormProps {
  onSubmit: (activity: any) => void;
  onCancel: () => void;
}

const AddActivityForm = ({ onSubmit, onCancel }: AddActivityFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    cost: "",
    ageRecommendation: "",
    bookingRequired: false
  });

  const [aiSuggestions] = useState([
    "Reina Sofia Museum",
    "Flamenco Show at Tablao Las Carboneras",
    "Madrid Cable Car (Teleférico)",
    "El Rastro Flea Market",
    "Chocolatería San Ginés"
  ]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newActivity = {
      name: formData.name,
      date: formData.date,
      status: "Planned",
      time: formData.time,
      duration: formData.duration,
      location: formData.location,
      familyRating: 4.0,
      ageRecommendation: formData.ageRecommendation,
      aiInsight: `Great choice! This activity is perfect for families visiting Madrid. Make sure to check opening hours and consider booking in advance.`,
      cost: formData.cost,
      bookingRequired: formData.bookingRequired
    };
    onSubmit(newActivity);
  };

  const suggestActivity = (suggestion: string) => {
    setFormData(prev => ({ ...prev, name: suggestion }));
  };

  return (
    <div className="space-y-6">
      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-base">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            AI Suggestions for Madrid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((suggestion, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="cursor-pointer hover:bg-purple-50 border-purple-300"
                onClick={() => suggestActivity(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Activity Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g., Prado Museum Tour"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>
      </div>

      {/* Time & Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time" className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Start Time
          </Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Select onValueChange={(value) => handleInputChange("duration", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30 minutes">30 minutes</SelectItem>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="1.5 hours">1.5 hours</SelectItem>
              <SelectItem value="2 hours">2 hours</SelectItem>
              <SelectItem value="3 hours">3 hours</SelectItem>
              <SelectItem value="Half day">Half day</SelectItem>
              <SelectItem value="Full day">Full day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          Location
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="e.g., Museo del Prado, Madrid"
        />
      </div>

      {/* Family Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            Age Recommendation
          </Label>
          <Select onValueChange={(value) => handleInputChange("ageRecommendation", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All ages">All ages</SelectItem>
              <SelectItem value="3+">3+</SelectItem>
              <SelectItem value="6+">6+</SelectItem>
              <SelectItem value="8+">8+</SelectItem>
              <SelectItem value="12+">12+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost" className="flex items-center">
            <Euro className="w-4 h-4 mr-1" />
            Cost
          </Label>
          <Input
            id="cost"
            value={formData.cost}
            onChange={(e) => handleInputChange("cost", e.target.value)}
            placeholder="e.g., €60 family ticket"
          />
        </div>
      </div>

      {/* Booking Required */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="booking"
          checked={formData.bookingRequired}
          onChange={(e) => handleInputChange("bookingRequired", e.target.checked)}
          className="rounded border border-gray-300"
        />
        <Label htmlFor="booking">Advance booking required</Label>
      </div>

      {/* AI Insight Preview */}
      {formData.name && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-start">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-purple-800">
                Great choice! {formData.name} is perfect for families visiting Madrid. 
                {formData.ageRecommendation && ` Suitable for ages ${formData.ageRecommendation}.`}
                {formData.bookingRequired && " Make sure to book in advance to avoid disappointment."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!formData.name || !formData.date}
        >
          Add Activity
        </Button>
      </div>
    </div>
  );
};

export default AddActivityForm;
