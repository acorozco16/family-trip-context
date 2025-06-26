
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users, Heart, DollarSign, Plane } from "lucide-react";
import { DestinationStep } from "@/components/trip-creator/DestinationStep";
import { KidsProfilesStep } from "@/components/trip-creator/KidsProfilesStep";
import { TravelStyleStep } from "@/components/trip-creator/TravelStyleStep";
import { ConcernsStep } from "@/components/trip-creator/ConcernsStep";
import { BudgetStep } from "@/components/trip-creator/BudgetStep";
import { BookingsStep } from "@/components/trip-creator/BookingsStep";

const steps = [
  { id: 1, title: "Destination & Dates", icon: MapPin, description: "Where and when?" },
  { id: 2, title: "Kids Profiles", icon: Users, description: "Tell us about your family" },
  { id: 3, title: "Travel Style", icon: Heart, description: "How do you like to travel?" },
  { id: 4, title: "Concerns", icon: Calendar, description: "What matters most?" },
  { id: 5, title: "Budget", icon: DollarSign, description: "Comfort level preferences" },
  { id: 6, title: "Bookings", icon: Plane, description: "Flights, stays & transport" },
];

const TripCreator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({});

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DestinationStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
      case 2:
        return <KidsProfilesStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
      case 3:
        return <TravelStyleStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
      case 4:
        return <ConcernsStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
      case 5:
        return <BudgetStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
      case 6:
        return <BookingsStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
      default:
        return <DestinationStep onNext={handleNext} tripData={tripData} setTripData={setTripData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FamilySync</span>
          </div>
          <Badge className="bg-blue-100 text-blue-700">
            Step {currentStep} of {steps.length}
          </Badge>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {steps[currentStep - 1].title}
              </h2>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400 hidden sm:block">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center max-w-4xl">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? "Back to Home" : "Previous"}</span>
          </Button>
          
          <div className="text-sm text-gray-500">
            Step {currentStep} of {steps.length}
          </div>
          
          <Button 
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
          >
            <span>{currentStep === steps.length ? "Complete Trip" : "Next Step"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripCreator;
