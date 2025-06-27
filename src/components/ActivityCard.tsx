
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { MapPin, Calendar, DollarSign, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Activity, FamilyMember } from '@/types/trip';

interface ActivityCardProps {
  activity: Activity;
  familyMembers: FamilyMember[];
  onVote: (activityId: string, vote: boolean) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, familyMembers, onVote }) => {
  const [isVoting, setIsVoting] = useState(false);
  
  const familyAges = familyMembers.map(member => member.age);
  const minFamilyAge = Math.min(...familyAges);
  const maxFamilyAge = Math.max(...familyAges);
  
  const isSuitableForFamily = activity.ageRange.min <= maxFamilyAge && activity.ageRange.max >= minFamilyAge;
  
  const yesVotes = Object.values(activity.votes).filter(vote => vote).length;
  const totalVotes = Object.keys(activity.votes).length;
  const votePercentage = totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 0;

  const handleVote = async (vote: boolean) => {
    setIsVoting(true);
    
    try {
      onVote(activity.id, vote);
      
      toast({
        title: vote ? "Voted Yes!" : "Voted No",
        description: `Your vote for "${activity.name}" has been recorded`,
      });
    } catch (error) {
      toast({
        title: "Vote failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const getSuitabilityColor = () => {
    if (isSuitableForFamily) return 'border-green-200 bg-green-50';
    return 'border-gray-200 bg-white';
  };

  const getPriceCategory = (cost: number) => {
    if (cost <= 25) return { label: 'Budget', color: 'bg-green-100 text-green-800' };
    if (cost <= 75) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Premium', color: 'bg-red-100 text-red-800' };
  };

  const priceCategory = getPriceCategory(activity.cost);

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${getSuitabilityColor()}`}
      role="article"
      aria-label={`Activity: ${activity.name}`}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight">
            {activity.name}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {activity.isKidFriendly && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Kid Friendly
              </Badge>
            )}
            {isSuitableForFamily && (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                Perfect Fit
              </Badge>
            )}
            <Badge className={`text-xs ${priceCategory.color}`}>
              {priceCategory.label}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          {activity.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate" title={activity.location}>
              {activity.location}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{activity.duration} hour{activity.duration !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>${activity.cost} per person</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="w-4 h-4 flex-shrink-0 text-yellow-500" />
            <span>{activity.rating}/5.0</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm">
            <span className="text-gray-600">Ages {activity.ageRange.min}-{activity.ageRange.max}</span>
            <Badge variant="outline" className="ml-2 text-xs">
              {activity.category}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            {totalVotes > 0 ? (
              <div className="space-y-1">
                <div className="text-gray-600">
                  {yesVotes}/{totalVotes} votes ({votePercentage}% positive)
                </div>
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${votePercentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-gray-500">No votes yet</span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleVote(false)}
              disabled={isVoting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              aria-label={`Vote no for ${activity.name}`}
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              onClick={() => handleVote(true)}
              disabled={isVoting}
              className="bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              aria-label={`Vote yes for ${activity.name}`}
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
