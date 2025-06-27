
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, Plus } from 'lucide-react';
import { FamilyMember } from '@/types/trip';

interface FamilySetupProps {
  familyMembers: FamilyMember[];
  onUpdateMembers: (members: FamilyMember[]) => void;
}

export const FamilySetup: React.FC<FamilySetupProps> = ({ familyMembers, onUpdateMembers }) => {
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    dietaryRestriction: '',
    medicalNeed: '',
    preference: ''
  });

  const addFamilyMember = () => {
    if (newMember.name && newMember.age) {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name,
        age: parseInt(newMember.age),
        dietaryRestrictions: newMember.dietaryRestriction ? [newMember.dietaryRestriction] : [],
        medicalNeeds: newMember.medicalNeed ? [newMember.medicalNeed] : [],
        preferences: newMember.preference ? [newMember.preference] : []
      };
      onUpdateMembers([...familyMembers, member]);
      setNewMember({ name: '', age: '', dietaryRestriction: '', medicalNeed: '', preference: '' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Family Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="Family member name"
            />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={newMember.age}
              onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
              placeholder="Age"
            />
          </div>
          <div>
            <Label htmlFor="dietary">Dietary Restrictions</Label>
            <Input
              id="dietary"
              value={newMember.dietaryRestriction}
              onChange={(e) => setNewMember({ ...newMember, dietaryRestriction: e.target.value })}
              placeholder="e.g., Vegetarian, Gluten-free"
            />
          </div>
          <div>
            <Label htmlFor="medical">Medical Needs</Label>
            <Input
              id="medical"
              value={newMember.medicalNeed}
              onChange={(e) => setNewMember({ ...newMember, medicalNeed: e.target.value })}
              placeholder="e.g., Allergies, Medications"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="preferences">Preferences</Label>
            <Input
              id="preferences"
              value={newMember.preference}
              onChange={(e) => setNewMember({ ...newMember, preference: e.target.value })}
              placeholder="e.g., Outdoor activities, Museums"
            />
          </div>
        </div>
        <Button onClick={addFamilyMember} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Family Member
        </Button>
        
        <div className="space-y-2">
          {familyMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <span className="font-medium">{member.name}</span>
                <Badge variant="secondary" className="ml-2">{member.age} years</Badge>
              </div>
              <div className="flex gap-1 flex-wrap">
                {member.dietaryRestrictions.map((diet, idx) => (
                  <Badge key={idx} variant="outline">{diet}</Badge>
                ))}
                {member.medicalNeeds.map((medical, idx) => (
                  <Badge key={idx} variant="destructive">{medical}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
