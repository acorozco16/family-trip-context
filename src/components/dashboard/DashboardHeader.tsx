
import { Button } from "@/components/ui/button";
import { Heart, Bell, Settings, Plus, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-sage-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-stone-800">WanderNest</span>
              <p className="text-xs text-stone-600 -mt-1">Family Travel Made Simple</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => navigate("/trip-creator")}
              className="bg-orange-600 hover:bg-orange-700 text-white shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Trip
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
