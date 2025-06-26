
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FamilyTabProps {
  kids: Array<{
    name: string;
    age: number;
    needs?: string;
    interests?: string;
  }>;
}

const FamilyTab = ({ kids }: FamilyTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Members</CardTitle>
        <CardDescription>Travel preferences and special needs</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {kids.map((kid, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{kid.name}</h4>
                <Badge className="bg-blue-100 text-blue-700">Age {kid.age}</Badge>
              </div>
              <p className="text-sm text-gray-600">{kid.needs || kid.interests}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyTab;
