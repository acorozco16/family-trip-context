
import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, Plus, Edit } from 'lucide-react';
import { Participant } from '../types';

export default function FamilyMembers() {
  const { trip, loading, addParticipant, removeParticipant, updateParticipant } = useTrip();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Participant | null>(null);

  if (loading) {
    return <div className="p-6">Loading family members...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  const handleAddMember = (formData: FormData) => {
    const dietaryRestrictions = (formData.get('dietaryRestrictions') as string)
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const medicalNeeds = (formData.get('medicalNeeds') as string)
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const preferences = (formData.get('preferences') as string)
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const newMember: Participant = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      dietaryRestrictions,
      medicalNeeds,
      preferences,
    };

    addParticipant(newMember);
    setIsAddDialogOpen(false);
  };

  const handleEditMember = (formData: FormData) => {
    if (!editingMember) return;

    const dietaryRestrictions = (formData.get('dietaryRestrictions') as string)
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const medicalNeeds = (formData.get('medicalNeeds') as string)
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const preferences = (formData.get('preferences') as string)
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const updates: Partial<Participant> = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      dietaryRestrictions,
      medicalNeeds,
      preferences,
    };

    updateParticipant(editingMember.id, updates);
    setEditingMember(null);
  };

  const MemberForm = ({ member, onSubmit, onCancel }: {
    member?: Participant;
    onSubmit: (formData: FormData) => void;
    onCancel: () => void;
  }) => (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(new FormData(e.target as HTMLFormElement));
    }} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required defaultValue={member?.name} />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" required defaultValue={member?.age} />
      </div>
      <div>
        <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
        <Input 
          id="dietaryRestrictions" 
          name="dietaryRestrictions" 
          placeholder="Vegetarian, gluten-free, etc. (comma separated)"
          defaultValue={member?.dietaryRestrictions.join(', ')}
        />
      </div>
      <div>
        <Label htmlFor="medicalNeeds">Medical Needs</Label>
        <Input 
          id="medicalNeeds" 
          name="medicalNeeds" 
          placeholder="Allergies, medications, etc. (comma separated)"
          defaultValue={member?.medicalNeeds.join(', ')}
        />
      </div>
      <div>
        <Label htmlFor="preferences">Preferences</Label>
        <Textarea 
          id="preferences" 
          name="preferences" 
          placeholder="Interests, activity preferences, etc. (comma separated)"
          defaultValue={member?.preferences.join(', ')}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{member ? 'Update' : 'Add'} Member</Button>
      </div>
    </form>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Members</h1>
          <p className="text-gray-600">Manage traveler profiles and preferences</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
            </DialogHeader>
            <MemberForm onSubmit={handleAddMember} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingMember} onOpenChange={() => setEditingMember(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Family Member</DialogTitle>
            </DialogHeader>
            {editingMember && (
              <MemberForm 
                member={editingMember} 
                onSubmit={handleEditMember} 
                onCancel={() => setEditingMember(null)} 
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {trip.participants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trip.participants.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">Age {member.age}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {member.dietaryRestrictions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Dietary Restrictions</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.dietaryRestrictions.map((restriction, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {restriction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {member.medicalNeeds.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Medical Needs</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.medicalNeeds.map((need, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-red-50">
                            {need}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {member.preferences.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Preferences</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.preferences.map((preference, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-blue-50">
                            {preference}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingMember(member)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeParticipant(member.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No family members yet</h3>
            <p className="text-gray-500">Add travelers to keep track of everyone's needs and preferences.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
