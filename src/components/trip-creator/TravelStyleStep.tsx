
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Zap, Compass, DollarSign, Clock, Users } from "lucide-react";

interface TravelStyleStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const TravelStyleStep = ({ onNext, tripData, setTripData }: TravelStyleStepProps) => {
  const [selectedStyle, setSelectedStyle] = useState(tripData.travelStyle || "");

  const travelStyles = [
    {
      id: "adventure",
      name: "Adventure Seekers",
      description: "Active families who love outdoor activities and new experiences",
      icon: Compass,
      color: "green",
      features: ["Outdoor activities", "Physical challenges", "Exploration", "Nature experiences"],
      examples: ["Hiking trails", "Water sports", "Adventure parks", "Wildlife tours"]
    },
    {
      id: "culture",
      name: "Culture Enthusiasts",
      description: "Families interested in history, art, and local traditions",
      icon: Heart,
      color: "purple",
      features: ["Museums & galleries", "Historical sites", "Local experiences", "Educational activities"],
      examples: ["Art museums", "Historical tours", "Cooking classes", "Cultural festivals"]
    },
    {
      id: "relaxed",
      name: "Relaxed Explorers",
      description: "Balanced pace with plenty of downtime and flexible schedules",
      icon: Clock,
      color: "blue",
      features: ["Flexible itinerary", "Rest periods", "Easy-going pace", "Comfort focused"],
      examples: ["Beach days", "Park visits", "Casual sightseeing", "Pool time"]
    },
    {
      id: "budget",
      name: "Budget-Conscious",
      description: "Smart spending families looking for great value experiences",
      icon: DollarSign,
      color: "orange",
      features: ["Value activities", "Free attractions", "Local dining", "Smart planning"],
      examples: ["Free museums", "Public parks", "Local markets", "Walking tours"]
    },
    {
      id: "comfort",
      name: "Comfort & Convenience",
      description: "Families prioritizing ease, comfort, and seamless experiences",
      icon: Zap,
      color: "indigo",
      features: ["Premium accommodations", "Private transport", "Skip-the-line access", "Concierge services"],
      examples: ["Luxury hotels", "Private tours", "VIP experiences", "Door-to-door service"]
    },
    {
      id: "social",
      name: "Social Connectors",
      description: "Families who enjoy meeting people and group activities",
      icon: Users,
      color: "pink",
      features: ["Group activities", "Social experiences", "Family-friendly events", "Interactive tours"],
      examples: ["Group tours", "Family workshops", "Social dining", "Community events"]
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      green: isSelected 
        ? "border-green-500 bg-green-50 text-green-700" 
        : "border-gray-200 hover:border-green-300",
      purple: isSelected 
        ? "border-purple-500 bg-purple-50 text-purple-700" 
        : "border-gray-200 hover:border-purple-300",
      blue: isSelected 
        ? "border-blue-500 bg-blue-50 text-blue-700" 
        : "border-gray-200 hover:border-blue-300",
      orange: isSelected 
        ? "border-orange-500 bg-orange-50 text-orange-700" 
        : "border-gray-200 hover:border-orange-300",
      indigo: isSelected 
        ? "border-indigo-500 bg-indigo-50 text-indigo-700" 
        : "border-gray-200 hover:border-indigo-300",
      pink: isSelected 
        ? "border-pink-500 bg-pink-50 text-pink-700" 
        : "border-gray-200 hover:border-pink-300"
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      green: "text-green-600",
      purple: "text-purple-600",
      blue: "text-blue-600",
      orange: "text-orange-600",
      indigo: "text-indigo-600",
      pink: "text-pink-600"
    };
    return colors[color as keyof typeof colors];
  };

  const handleNext = () => {
    setTripData({
      ...tripData,
      travelStyle: selectedStyle
    });
    onNext();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What's your family's travel style?
        </h2>
        <p className="text-lg text-gray-600">
          Choose the style that best describes how your family likes to travel
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelStyles.map((style) => {
          const IconComponent = style.icon;
          const isSelected = selectedStyle === style.id;
          
          return (
            <Card
              key={style.id}
              className={`cursor-pointer transition-all duration-200 ${getColorClasses(style.color, isSelected)}`}
              onClick={() => setSelectedStyle(style.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-6 h-6 ${getIconColorClasses(style.color)}`} />
                  {isSelected && (
                    <Badge className={`bg-${style.color}-100 text-${style.color}-700`}>
                      Selected
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{style.name}</CardTitle>
                <CardDescription className={isSelected ? "text-gray-600" : ""}>
                  {style.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {style.features.map((feature) => (
                        <Badge 
                          key={feature} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Examples:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {style.examples.slice(0, 3).map((example) => (
                        <li key={example} className="flex items-center">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedStyle && (
        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                {(() => {
                  const selected = travelStyles.find(s => s.id === selectedStyle);
                  const IconComponent = selected?.icon;
                  return IconComponent ? (
                    <div className={`w-12 h-12 rounded-full bg-${selected.color}-100 flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${getIconColorClasses(selected.color)}`} />
                    </div>
                  ) : null;
                })()}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Perfect! You're {travelStyles.find(s => s.id === selectedStyle)?.name}
              </h3>
              <p className="text-gray-600 mb-4">
                We'll tailor our recommendations to match your family's {selectedStyle} travel style.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center">
        <Button
          onClick={handleNext}
          disabled={!selectedStyle}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue to Concerns
        </Button>
      </div>
    </div>
  );
};
