
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ItineraryTabProps {
  activities: Array<{
    name: string;
    date: string;
    status: string;
  }>;
}

const ItineraryTab = ({ activities }: ItineraryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Planned Activities</CardTitle>
        <CardDescription>Your family-friendly Barcelona itinerary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{activity.name}</p>
                <p className="text-sm text-gray-600">{activity.date}</p>
              </div>
              <Badge className={
                activity.status === "Booked" 
                  ? "bg-green-100 text-green-700" 
                  : "bg-blue-100 text-blue-700"
              }>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItineraryTab;
