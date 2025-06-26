
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
}

export const StepNavigation = ({ currentStep, totalSteps, onBack, onNext }: StepNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="container mx-auto flex justify-between items-center max-w-4xl">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 1 ? "Back to Home" : "Previous"}</span>
        </Button>
        
        <div className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </div>
        
        <Button 
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
        >
          <span>{currentStep === totalSteps ? "Complete Trip" : "Next Step"}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
