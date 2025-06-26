
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Heart, DollarSign, Plane } from "lucide-react";
import { TripHeader } from "@/components/trip-creator/TripHeader";
import { StepIndicator } from "@/components/trip-creator/StepIndicator";
import { StepNavigation } from "@/components/trip-creator/StepNavigation";
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
      <TripHeader currentStep={currentStep} totalSteps={steps.length} />
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 pb-24">
        <div className="max-w-4xl mx-auto">
          {renderStep()}
        </div>
      </main>

      <StepNavigation 
        currentStep={currentStep} 
        totalSteps={steps.length}
        onBack={handleBack}
        onNext={handleNext}
      />
    </div>
  );
};

export default TripCreator;
