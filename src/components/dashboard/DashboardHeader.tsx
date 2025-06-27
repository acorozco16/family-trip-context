
import { Button } from "@/components/ui/button";
import { Heart, Bell, Settings, Plus, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-blue-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-blue-900">Fam</span>
              <p className="text-xs text-blue-700 -mt-1">Family Travel Made Simple</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-700 hover:text-blue-900 hover:bg-blue-50">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => navigate("/trip-creator")}
              className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-800 hover:to-cyan-700 text-white shadow-md"
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
