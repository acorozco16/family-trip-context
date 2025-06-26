
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Plus, Trash2, Baby, User, UserCheck, Mail, Send } from "lucide-react";

interface KidsProfilesStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const KidsProfilesStep = ({ onNext, tripData, setTripData }: KidsProfilesStepProps) => {
  const [kids, setKids] = useState(tripData.kids || []);
  const [adults, setAdults] = useState(tripData.adults || [
    { name: "", email: "", role: "organizer", specialNeeds: "", interests: "", inviteStatus: "self" }
  ]);

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

  const addAdult = () => {
    setAdults([...adults, { 
      name: "", 
      email: "", 
      role: "traveler", 
      specialNeeds: "", 
      interests: "", 
      inviteStatus: "pending" 
    }]);
  };

  const removeAdult = (index: number) => {
    if (adults.length > 1) { // Keep at least one adult (the organizer)
      setAdults(adults.filter((_: any, i: number) => i !== index));
    }
  };

  const updateAdult = (index: number, field: string, value: string) => {
    const updatedAdults = adults.map((adult: any, i: number) => 
      i === index ? { ...adult, [field]: value } : adult
    );
    setAdults(updatedAdults);
  };

  const sendInvite = (index: number) => {
    const updatedAdults = adults.map((adult: any, i: number) => 
      i === index ? { ...adult, inviteStatus: "sent" } : adult
    );
    setAdults(updatedAdults);
    // Here you would typically send an actual email invitation
    console.log(`Invitation sent to ${adults[index].email}`);
  };

  const handleNext = () => {
    setTripData({
      ...tripData,
      kids,
      adults,
      totalTravelers: adults.length + kids.length
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

  const getInviteStatusBadge = (status: string) => {
    switch (status) {
      case "self":
        return <Badge className="bg-green-100 text-green-700">You</Badge>;
      case "sent":
        return <Badge className="bg-blue-100 text-blue-700">Invited</Badge>;
      case "accepted":
        return <Badge className="bg-green-100 text-green-700">Accepted</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-700">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tell us about your travel party
        </h2>
        <p className="text-lg text-gray-600">
          Add profiles for all travelers and invite other adults to collaborate
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
              Adults
            </CardTitle>
            <CardDescription>
              {adults.length} {adults.length === 1 ? 'adult' : 'adults'} in your party
            </CardDescription>
          </CardHeader>
          <CardContent>
            {adults.length > 0 ? (
              <div className="space-y-2">
                {adults.map((adult: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{adult.name || `Adult ${index + 1}`}</span>
                    </div>
                    {getInviteStatusBadge(adult.inviteStatus)}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No adults added yet</p>
            )}
          </CardContent>
        </Card>

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

      {/* Profiles Tabs */}
      <Tabs defaultValue="adults" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="adults" className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4" />
            <span>Adults ({adults.length})</span>
          </TabsTrigger>
          <TabsTrigger value="children" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Children ({kids.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="adults" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <UserCheck className="w-5 h-5 text-blue-600 mr-2" />
                    Adult Profiles
                  </CardTitle>
                  <CardDescription>
                    Add details for each adult traveler and send invitations
                  </CardDescription>
                </div>
                <Button onClick={addAdult} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Adult
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {adults.map((adult: any, index: number) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                        <h4 className="font-medium">
                          {index === 0 ? "Trip Organizer" : `Adult ${index + 1}`}
                        </h4>
                        {getInviteStatusBadge(adult.inviteStatus)}
                      </div>
                      {index > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdult(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`adult-name-${index}`}>Full Name</Label>
                        <Input
                          id={`adult-name-${index}`}
                          placeholder="Adult's full name"
                          value={adult.name}
                          onChange={(e) => updateAdult(index, "name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`adult-email-${index}`}>Email Address</Label>
                        <div className="flex mt-1">
                          <Input
                            id={`adult-email-${index}`}
                            type="email"
                            placeholder="email@example.com"
                            value={adult.email}
                            onChange={(e) => updateAdult(index, "email", e.target.value)}
                            className="flex-1"
                            disabled={index === 0}
                          />
                          {index > 0 && adult.email && adult.inviteStatus === "pending" && (
                            <Button
                              onClick={() => sendInvite(index)}
                              size="sm"
                              className="ml-2 bg-blue-600 hover:bg-blue-700"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor={`adult-interests-${index}`}>Interests & Preferences</Label>
                      <Input
                        id={`adult-interests-${index}`}
                        placeholder="e.g., history, food, adventure, relaxation"
                        value={adult.interests}
                        onChange={(e) => updateAdult(index, "interests", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor={`adult-needs-${index}`}>Special Needs & Considerations</Label>
                      <Textarea
                        id={`adult-needs-${index}`}
                        placeholder="e.g., dietary restrictions, mobility needs, accessibility requirements"
                        value={adult.specialNeeds}
                        onChange={(e) => updateAdult(index, "specialNeeds", e.target.value)}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children" className="space-y-6">
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
        </TabsContent>
      </Tabs>

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
