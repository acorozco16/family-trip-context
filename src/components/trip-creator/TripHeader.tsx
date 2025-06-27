
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface TripHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const TripHeader = ({ currentStep, totalSteps }: TripHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Fam</span>
        </div>
        <Badge className="bg-blue-100 text-blue-700">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>
    </header>
  );
};
