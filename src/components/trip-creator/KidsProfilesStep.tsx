import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Trash2, Baby, User, UserCheck } from "lucide-react";

interface KidsProfilesStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const KidsProfilesStep = ({ onNext, tripData, setTripData }: KidsProfilesStepProps) => {
  const [kids, setKids] = useState(tripData.kids || []);
  const [adults, setAdults] = useState(tripData.adults || 2);

  const addKid = () => {
    setKids([...kids, { name: "", age: "", specialNeeds: "", interests: "" }]);
  };

  const removeKid = (index: number) => {
    setKids(kids.filter((_: any, i: number) => i !== index));
  };

  const updateKid = (index: number, field: string, value: string) => {
    const updatedKids = kids.map((kid: any, i: number) => 
      i === index ? { ...kid, [field]: value } : kid
    );
    setKids(updatedKids);
  };

  const handleNext = () => {
    setTripData({
      ...tripData,
      kids,
      adults,
      totalTravelers: adults + kids.length
    });
    onNext();
  };

  const getAgeGroup = (age: number) => {
    if (age <= 2) return "Toddler";
    if (age <= 5) return "Preschooler";
    if (age <= 12) return "Child";
    return "Teen";
  };

  const getAgeIcon = (age: number) => {
    if (age <= 2) return Baby;
    if (age <= 12) return User;
    return UserCheck;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tell us about your family
        </h2>
        <p className="text-lg text-gray-600">
          Help us create recommendations tailored to each family member
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Adults Count */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
              Adults
            </CardTitle>
            <CardDescription>
              How many adults will be traveling?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                disabled={adults <= 1}
              >
                -
              </Button>
              <div className="text-center">
                <div className="text-2xl font-bold">{adults}</div>
                <div className="text-sm text-gray-500">Adults</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAdults(adults + 1)}
              >
                +
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Kids Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 text-orange-600 mr-2" />
              Children Summary
            </CardTitle>
            <CardDescription>
              {kids.length} {kids.length === 1 ? 'child' : 'children'} added
            </CardDescription>
          </CardHeader>
          <CardContent>
            {kids.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {kids.map((kid: any, index: number) => {
                  const AgeIcon = getAgeIcon(parseInt(kid.age));
                  return (
                    <Badge key={index} className="bg-orange-100 text-orange-700 flex items-center">
                      <AgeIcon className="w-3 h-3 mr-1" />
                      {kid.name || `Child ${index + 1}`} ({kid.age || '?'})
                    </Badge>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No children added yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Kids Profiles */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 text-green-600 mr-2" />
                Children's Profiles
              </CardTitle>
              <CardDescription>
                Add details for each child to get personalized recommendations
              </CardDescription>
            </div>
            <Button onClick={addKid} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {kids.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No children added yet</p>
              <Button onClick={addKid} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Child
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {kids.map((kid: any, index: number) => {
                const AgeIcon = getAgeIcon(parseInt(kid.age));
                return (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <AgeIcon className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">Child {index + 1}</h4>
                        {kid.age && (
                          <Badge className="bg-blue-100 text-blue-700">
                            {getAgeGroup(parseInt(kid.age))}
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeKid(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`name-${index}`}>Name</Label>
                        <Input
                          id={`name-${index}`}
                          placeholder="Child's name"
                          value={kid.name}
                          onChange={(e) => updateKid(index, "name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`age-${index}`}>Age</Label>
                        <Input
                          id={`age-${index}`}
                          type="number"
                          placeholder="Age"
                          value={kid.age}
                          onChange={(e) => updateKid(index, "age", e.target.value)}
                          className="mt-1"
                          min="0"
                          max="18"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor={`interests-${index}`}>Interests & Hobbies</Label>
                      <Input
                        id={`interests-${index}`}
                        placeholder="e.g., animals, sports, art, museums"
                        value={kid.interests}
                        onChange={(e) => updateKid(index, "interests", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor={`needs-${index}`}>Special Needs & Considerations</Label>
                      <Textarea
                        id={`needs-${index}`}
                        placeholder="e.g., early bedtime, dietary restrictions, mobility needs, anxiety triggers"
                        value={kid.specialNeeds}
                        onChange={(e) => updateKid(index, "specialNeeds", e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8"
        >
          Continue to Travel Style
        </Button>
      </div>
    </div>
  );
};
