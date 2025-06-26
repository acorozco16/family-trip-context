
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Wallet, Star, Crown, Zap, Heart } from "lucide-react";

interface BudgetStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const BudgetStep = ({ onNext, tripData, setTripData }: BudgetStepProps) => {
  const [selectedBudget, setSelectedBudget] = useState(tripData.budgetLevel || "");

  const budgetLevels = [
    {
      id: "budget",
      name: "Budget-Friendly",
      description: "Great value experiences without breaking the bank",
      icon: Wallet,
      color: "green",
      features: [
        "Hostels, budget hotels, or vacation rentals",
        "Public transportation and walking",
        "Free attractions and local experiences",
        "Local eateries and self-catering options",
        "Group activities and community events"
      ],
      examples: [
        "3-star hotels or family-friendly hostels",
        "City buses, trains, and metro systems",
        "Free museums, parks, and walking tours",
        "Street food and local markets"
      ],
      estimateRange: "Lower budget range"
    },
    {
      id: "comfort",
      name: "Comfort & Convenience",
      description: "Balance of comfort and value for a stress-free family trip",
      icon: Heart,
      color: "blue",
      features: [
        "Comfortable hotels with family amenities",
        "Mix of public and private transportation",
        "Paid attractions with some skip-the-line access",
        "Restaurant dining with variety",
        "Some guided tours and experiences"
      ],
      examples: [
        "4-star family hotels with pools",
        "Combination of taxis, trains, and rental cars",
        "Popular attractions with advance booking",
        "Family restaurants and cafes"
      ],
      estimateRange: "Mid-range budget"
    },
    {
      id: "premium",
      name: "Premium Experience",
      description: "High-quality accommodations and seamless experiences",
      icon: Star,
      color: "purple",
      features: [
        "Upscale hotels or luxury vacation rentals",
        "Private transfers and premium transport",
        "Priority access to top attractions",
        "Fine dining and unique culinary experiences",
        "Private or small-group tours"
      ],
      examples: [
        "5-star family resorts or luxury apartments",
        "Private drivers, first-class train tickets",
        "VIP attraction access and private tours",
        "Michelin-recommended restaurants"
      ],
      estimateRange: "Higher budget range"
    },
    {
      id: "luxury",
      name: "Luxury & Exclusive",
      description: "The finest experiences money can buy for your family",
      icon: Crown,
      color: "gold",
      features: [
        "Luxury resorts and exclusive accommodations",
        "Private jets, luxury cars, or premium transfers",
        "Exclusive access and behind-the-scenes experiences",
        "Private chefs and exclusive dining",
        "Personalized concierge and planning services"
      ],
      examples: [
        "5-star luxury resorts with kids' clubs",
        "Private jets or luxury car services",
        "Private museum tours after hours",
        "Exclusive culinary experiences with top chefs"
      ],
      estimateRange: "Premium budget range"
    }
  ];

  const handleNext = () => {
    setTripData({
      ...tripData,
      budgetLevel: selectedBudget
    });
    onNext();
  };

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors = {
      green: isSelected 
        ? "border-green-500 bg-green-50" 
        : "border-gray-200 hover:border-green-300",
      blue: isSelected 
        ? "border-blue-500 bg-blue-50" 
        : "border-gray-200 hover:border-blue-300",
      purple: isSelected 
        ? "border-purple-500 bg-purple-50" 
        : "border-gray-200 hover:border-purple-300",
      gold: isSelected 
        ? "border-yellow-500 bg-yellow-50" 
        : "border-gray-200 hover:border-yellow-300"
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColorClasses = (color: string) => {
    const colors = {
      green: "text-green-600",
      blue: "text-blue-600",
      purple: "text-purple-600",
      gold: "text-yellow-600"
    };
    return colors[color as keyof typeof colors];
  };

  const getBadgeColorClasses = (color: string) => {
    const colors = {
      green: "bg-green-100 text-green-700",
      blue: "bg-blue-100 text-blue-700",
      purple: "bg-purple-100 text-purple-700",
      gold: "bg-yellow-100 text-yellow-700"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          What's your comfort level?
        </h2>
        <p className="text-lg text-gray-600">
          Choose the experience level that matches your family's preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {budgetLevels.map((level) => {
          const IconComponent = level.icon;
          const isSelected = selectedBudget === level.id;
          
          return (
            <Card
              key={level.id}
              className={`cursor-pointer transition-all duration-200 ${getColorClasses(level.color, isSelected)}`}
              onClick={() => setSelectedBudget(level.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-6 h-6 ${getIconColorClasses(level.color)}`} />
                  {isSelected && (
                    <Badge className={getBadgeColorClasses(level.color)}>
                      Selected
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{level.name}</CardTitle>
                <CardDescription className="text-base">
                  {level.description}
                </CardDescription>
                <Badge variant="outline" className="w-fit">
                  {level.estimateRange}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">What's Included:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {level.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {level.examples.slice(0, 2).map((example) => (
                      <li key={example} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedBudget && (
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                {(() => {
                  const selected = budgetLevels.find(l => l.id === selectedBudget);
                  const IconComponent = selected?.icon;
                  return IconComponent ? (
                    <div className={`w-12 h-12 rounded-full bg-${selected.color === 'gold' ? 'yellow' : selected.color}-100 flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${getIconColorClasses(selected.color)}`} />
                    </div>
                  ) : null;
                })()}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Perfect! {budgetLevels.find(l => l.id === selectedBudget)?.name} it is
              </h3>
              <p className="text-gray-600 mb-4">
                We'll curate recommendations that match your {selectedBudget} preferences and ensure 
                great value for your family's investment.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  All recommendations will be tailored to your comfort level
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <Button
          onClick={handleNext}
          disabled={!selectedBudget}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue to Bookings
        </Button>
      </div>
    </div>
  );
};
