
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { Activity, FamilyMember } from '@/types/trip';

interface ActivityCardProps {
  activity: Activity;
  familyMembers: FamilyMember[];
  onVote: (activityId: string, vote: boolean) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, familyMembers, onVote }) => {
  const familyAges = familyMembers.map(member => member.age);
  const minFamilyAge = Math.min(...familyAges);
  const maxFamilyAge = Math.max(...familyAges);
  
  const isSuitableForFamily = activity.ageRange.min <= maxFamilyAge && activity.ageRange.max >= minFamilyAge;
  
  const yesVotes = Object.values(activity.votes).filter(vote => vote).length;
  const totalVotes = Object.keys(activity.votes).length;

  return (
    <Card className={`${isSuitableForFamily ? 'border-green-200' : 'border-gray-200'} transition-all`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{activity.name}</h3>
          <div className="flex gap-1">
            {activity.isKidFriendly && <Badge variant="secondary">Kid Friendly</Badge>}
            {isSuitableForFamily && <Badge className="bg-green-100 text-green-800">Perfect Fit</Badge>}
          </div>
        </div>
        
        <p className="text-gray-600 mb-3">{activity.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {activity.location}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {activity.duration} hours
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            ${activity.cost}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600">Ages {activity.ageRange.min}-{activity.ageRange.max}</span>
          <span className="text-sm">⭐ {activity.rating}/5</span>
          <Badge variant="outline">{activity.category}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {totalVotes > 0 ? `${yesVotes}/${totalVotes} votes` : 'No votes yet'}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onVote(activity.id, false)}
              className="text-red-600 hover:bg-red-50"
            >
              👎
            </Button>
            <Button 
              size="sm"
              onClick={() => onVote(activity.id, true)}
              className="bg-green-600 hover:bg-green-700"
            >
              👍
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
