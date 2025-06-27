
import { Badge } from "@/components/ui/badge";
import { FamLogo } from "@/components/ui/fam-logo";

interface TripHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const TripHeader = ({ currentStep, totalSteps }: TripHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <FamLogo size="sm" />
        <Badge className="bg-blue-100 text-blue-700">
          Step {currentStep} of {totalSteps}
        </Badge>
      </div>
    </header>
  );
};
