import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, MapPin, Clock, Users, Euro, Tag } from "lucide-react";

interface AddActivityFormProps {
  onSubmit: (activity: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const AddActivityForm = ({ onSubmit, onCancel, initialData }: AddActivityFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    duration: initialData?.duration || "",
    location: initialData?.location || "",
    cost: initialData?.cost || "",
    category: initialData?.category || "",
    participants: initialData?.participants || [] as string[],
    bookingRequired: initialData?.bookingRequired || false
  });

  const [aiSuggestions] = useState([
    "Reina Sofia Museum",
    "Flamenco Show at Tablao Las Carboneras",
    "Madrid Cable Car (Teleférico)",
    "El Rastro Flea Market",
    "Chocolatería San Ginés"
  ]);

  const categories = [
    "Museums & Culture",
    "Entertainment & Shows",
    "Parks & Nature",
    "Food & Dining",
    "Sports & Recreation",
    "Shopping",
    "Educational",
    "Adventure",
    "Relaxation"
  ];

  const familyMembers = [
    { id: "sarah", name: "Sarah (Mom)" },
    { id: "mike", name: "Mike (Dad)" },
    { id: "emma", name: "Emma (8)" },
    { id: "jake", name: "Jake (12)" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleParticipantToggle = (participantId: string) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.includes(participantId)
        ? prev.participants.filter(id => id !== participantId)
        : [...prev.participants, participantId]
    }));
  };

  const handleSubmit = () => {
    const activityData = {
      ...initialData,
      name: formData.name,
      date: formData.date,
      status: initialData?.status || "Planned",
      time: formData.time,
      duration: formData.duration,
      location: formData.location,
      familyRating: initialData?.familyRating || 4.0,
      category: formData.category,
      participants: formData.participants,
      aiInsight: initialData?.aiInsight || `Great choice! This activity is perfect for families visiting Madrid. Make sure to check opening hours and consider booking in advance.`,
      cost: formData.cost,
      bookingRequired: formData.bookingRequired
    };
    onSubmit(activityData);
  };

  const suggestActivity = (suggestion: string) => {
    setFormData(prev => ({ ...prev, name: suggestion }));
  };

  return (
    <div className="space-y-6">
      {/* Only show AI Suggestions if this is a new activity */}
      {!initialData && (
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
      )}

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
          <Label htmlFor="category" className="flex items-center">
            <Tag className="w-4 h-4 mr-1" />
            Category
          </Label>
          <Select onValueChange={(value) => handleInputChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Participants */}
      <div className="space-y-2">
        <Label className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          Who will participate?
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={member.id}
                checked={formData.participants.includes(member.id)}
                onChange={() => handleParticipantToggle(member.id)}
                className="rounded border border-gray-300"
              />
              <Label htmlFor={member.id} className="text-sm">
                {member.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cost & Booking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="flex items-end">
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
        </div>
      </div>

      {/* AI Insight Preview */}
      {formData.name && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-4">
            <div className="flex items-start">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-purple-800">
                Great choice! {formData.name} is perfect for families visiting Madrid. 
                {formData.category && ` This ${formData.category.toLowerCase()} activity`}
                {formData.participants.length > 0 && ` for ${formData.participants.length} family member${formData.participants.length > 1 ? 's' : ''}`}
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
          {initialData ? 'Update Activity' : 'Add Activity'}
        </Button>
      </div>
    </div>
  );
};

export default AddActivityForm;
