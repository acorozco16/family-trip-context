
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, Plus, Calendar } from "lucide-react";
import AddActivityModal from "./AddActivityModal";

interface LiveUpdatesSidebarProps {
  updates: Array<{
    time: string;
    user: string;
    message: string;
  }>;
  onAddActivity?: (activity: any) => void;
}

const LiveUpdatesSidebar = ({ updates, onAddActivity }: LiveUpdatesSidebarProps) => {
  const handleFamilyChat = () => {
    // In a real app, this would open a chat interface
    alert("Family Chat feature coming soon! This would open a real-time chat with your family members.");
  };

  const handleUpdateDates = () => {
    // In a real app, this would open a date picker or trip planning interface
    alert("Update Dates feature coming soon! This would allow you to modify your trip dates and automatically adjust all activities.");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Live Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="border-l-2 border-blue-200 pl-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{update.time}</span>
                </div>
                <p className="text-sm font-medium">{update.user}</p>
                <p className="text-sm text-gray-600">{update.message}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <AddActivityModal onAddActivity={onAddActivity || (() => {})} />
          <Button variant="outline" className="w-full justify-start" onClick={handleFamilyChat}>
            <MessageCircle className="w-4 h-4 mr-2" />
            Family Chat
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={handleUpdateDates}>
            <Calendar className="w-4 h-4 mr-2" />
            Update Dates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveUpdatesSidebar;
