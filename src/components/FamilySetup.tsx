
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { Users, Plus, Trash2 } from 'lucide-react';
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

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateMember = () => {
    const errors: Record<string, string> = {};

    if (!newMember.name.trim()) {
      errors.name = 'Name is required';
    } else if (newMember.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    const age = parseInt(newMember.age);
    if (!newMember.age) {
      errors.age = 'Age is required';
    } else if (isNaN(age) || age < 0 || age > 150) {
      errors.age = 'Please enter a valid age (0-150)';
    }

    // Check for duplicate names
    if (familyMembers.some(member => member.name.toLowerCase() === newMember.name.toLowerCase().trim())) {
      errors.name = 'A family member with this name already exists';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addFamilyMember = async () => {
    if (!validateMember()) return;

    setIsSubmitting(true);
    
    try {
      const member: FamilyMember = {
        id: Date.now().toString(),
        name: newMember.name.trim(),
        age: parseInt(newMember.age),
        dietaryRestrictions: newMember.dietaryRestriction ? [newMember.dietaryRestriction.trim()] : [],
        medicalNeeds: newMember.medicalNeed ? [newMember.medicalNeed.trim()] : [],
        preferences: newMember.preference ? [newMember.preference.trim()] : []
      };

      onUpdateMembers([...familyMembers, member]);
      setNewMember({ name: '', age: '', dietaryRestriction: '', medicalNeed: '', preference: '' });
      setValidationErrors({});
      
      toast({
        title: "Family member added",
        description: `${member.name} has been added to your trip`,
      });
    } catch (error) {
      toast({
        title: "Error adding family member",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFamilyMember = (memberId: string) => {
    const memberToRemove = familyMembers.find(m => m.id === memberId);
    onUpdateMembers(familyMembers.filter(member => member.id !== memberId));
    
    if (memberToRemove) {
      toast({
        title: "Family member removed",
        description: `${memberToRemove.name} has been removed from your trip`,
      });
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Family Setup
          {familyMembers.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Family Member Form */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900">Add Family Member</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Name *
              </Label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => {
                  setNewMember({ ...newMember, name: e.target.value });
                  if (validationErrors.name) {
                    setValidationErrors({ ...validationErrors, name: '' });
                  }
                }}
                placeholder="Family member name"
                className={`transition-all duration-200 ${
                  validationErrors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                }`}
                aria-describedby={validationErrors.name ? "name-error" : undefined}
                disabled={isSubmitting}
              />
              {validationErrors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                  {validationErrors.name}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="age" className="text-sm font-medium">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="150"
                value={newMember.age}
                onChange={(e) => {
                  setNewMember({ ...newMember, age: e.target.value });
                  if (validationErrors.age) {
                    setValidationErrors({ ...validationErrors, age: '' });
                  }
                }}
                placeholder="Age"
                className={`transition-all duration-200 ${
                  validationErrors.age ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'
                }`}
                aria-describedby={validationErrors.age ? "age-error" : undefined}
                disabled={isSubmitting}
              />
              {validationErrors.age && (
                <p id="age-error" className="text-red-500 text-sm mt-1" role="alert">
                  {validationErrors.age}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor="dietary" className="text-sm font-medium">
                Dietary Restrictions
              </Label>
              <Input
                id="dietary"
                value={newMember.dietaryRestriction}
                onChange={(e) => setNewMember({ ...newMember, dietaryRestriction: e.target.value })}
                placeholder="e.g., Vegetarian, Gluten-free"
                className="transition-all duration-200 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <Label htmlFor="medical" className="text-sm font-medium">
                Medical Needs
              </Label>
              <Input
                id="medical"
                value={newMember.medicalNeed}
                onChange={(e) => setNewMember({ ...newMember, medicalNeed: e.target.value })}
                placeholder="e.g., Allergies, Medications"
                className="transition-all duration-200 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="preferences" className="text-sm font-medium">
                Activity Preferences
              </Label>
              <Input
                id="preferences"
                value={newMember.preference}
                onChange={(e) => setNewMember({ ...newMember, preference: e.target.value })}
                placeholder="e.g., Outdoor activities, Museums, Adventure sports"
                className="transition-all duration-200 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <Button 
            onClick={addFamilyMember} 
            className="w-full transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
            disabled={isSubmitting}
          >
            <Plus className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Adding...' : 'Add Family Member'}
          </Button>
        </div>

        {/* Family Members List */}
        {familyMembers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-lg font-medium">No family members added yet</p>
            <p className="text-sm">Add your first family member above to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Family Members ({familyMembers.length})</h4>
            {familyMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-start justify-between p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-200 hover:shadow-sm group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium text-blue-900">{member.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {member.age} year{member.age !== 1 ? 's' : ''} old
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {member.dietaryRestrictions.map((diet, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700">
                        {diet}
                      </Badge>
                    ))}
                    {member.medicalNeeds.map((medical, idx) => (
                      <Badge key={idx} variant="destructive" className="text-xs">
                        {medical}
                      </Badge>
                    ))}
                    {member.preferences.map((pref, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        {pref}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      aria-label={`Remove ${member.name} from trip`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Family Member</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove {member.name} from this trip? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => removeFamilyMember(member.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
