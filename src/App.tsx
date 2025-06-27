
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FamLogo } from '@/components/ui/fam-logo';
import { FamilySetup } from '@/components/FamilySetup';
import { BudgetTracker } from '@/components/BudgetTracker';
import { ActivityCard } from '@/components/ActivityCard';
import { EmergencyContacts } from '@/components/EmergencyContacts';
import { PackingList } from '@/components/PackingList';
import { Calendar, Users, DollarSign, MapPin, AlertTriangle, Plus } from 'lucide-react';
import { Trip, Activity, FamilyMember, EmergencyContact, PackingItem, Expense } from '@/types/trip';

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    name: 'Disney World Magic Kingdom',
    description: 'Classic Disney theme park with rides and attractions for all ages',
    ageRange: { min: 3, max: 99 },
    cost: 109,
    duration: 8,
    category: 'Theme Park',
    rating: 4.8,
    isKidFriendly: true,
    location: 'Orlando, FL',
    votes: {}
  },
  {
    id: '2',
    name: 'Beach Day at Santa Monica',
    description: 'Relax at the beach, swim, and enjoy the pier',
    ageRange: { min: 0, max: 99 },
    cost: 20,
    duration: 6,
    category: 'Beach',
    rating: 4.5,
    isKidFriendly: true,
    location: 'Santa Monica, CA',
    votes: {}
  },
  {
    id: '3',
    name: 'Museum of Natural History',
    description: 'Educational museum with dinosaur exhibits and planetarium',
    ageRange: { min: 5, max: 99 },
    cost: 25,
    duration: 4,
    category: 'Museum',
    rating: 4.6,
    isKidFriendly: true,
    location: 'New York, NY',
    votes: {}
  },
  {
    id: '4',
    name: 'Wine Tasting Tour',
    description: 'Adult-only wine tasting experience in beautiful vineyards',
    ageRange: { min: 21, max: 99 },
    cost: 85,
    duration: 5,
    category: 'Adult Activity',
    rating: 4.7,
    isKidFriendly: false,
    location: 'Napa Valley, CA',
    votes: {}
  }
];

export default function App() {
  const [trip, setTrip] = useState<Trip>({
    id: '1',
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 0,
    familyMembers: [],
    activities: SAMPLE_ACTIVITIES,
    accommodations: [],
    emergencyContacts: [],
    packingList: [],
    expenses: []
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      localStorage.setItem('familyTrip', JSON.stringify(trip));
      setLastSaved(new Date());
    }, 2000);

    return () => clearInterval(autoSave);
  }, [trip]);

  // Load saved trip on mount
  useEffect(() => {
    const savedTrip = localStorage.getItem('familyTrip');
    if (savedTrip) {
      try {
        const parsedTrip = JSON.parse(savedTrip);
        setTrip({ ...trip, ...parsedTrip, activities: SAMPLE_ACTIVITIES });
      } catch (error) {
        console.error('Error loading saved trip:', error);
      }
    }
  }, []);

  // Online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const updateTrip = (updates: Partial<Trip>) => {
    setTrip(prev => ({ ...prev, ...updates }));
  };

  const updateFamilyMembers = (familyMembers: FamilyMember[]) => {
    updateTrip({ familyMembers });
  };

  const updateBudget = (budget: number) => {
    updateTrip({ budget });
  };

  const addExpense = (expense: Expense) => {
    updateTrip({ expenses: [...trip.expenses, expense] });
  };

  const addEmergencyContact = (contact: EmergencyContact) => {
    updateTrip({ emergencyContacts: [...trip.emergencyContacts, contact] });
  };

  const updatePackingList = (packingList: PackingItem[]) => {
    updateTrip({ packingList });
  };

  const voteOnActivity = (activityId: string, vote: boolean) => {
    const updatedActivities = trip.activities.map(activity => {
      if (activity.id === activityId) {
        return {
          ...activity,
          votes: { ...activity.votes, [Date.now().toString()]: vote }
        };
      }
      return activity;
    });
    updateTrip({ activities: updatedActivities });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FamLogo size="md" />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">Family Trip Planner</h1>
                <p className="text-sm text-gray-600">Plan your perfect family adventure</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={isOnline ? "default" : "destructive"}>
                {isOnline ? "Online" : "Offline"}
              </Badge>
              {lastSaved && (
                <Badge variant="outline">
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="planning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Planning</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="safety" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Safety</span>
            </TabsTrigger>
            <TabsTrigger value="packing" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Packing</span>
            </TabsTrigger>
            <TabsTrigger value="trip" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Trip</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trip Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="trip-name">Trip Name</Label>
                    <Input
                      id="trip-name"
                      value={trip.name}
                      onChange={(e) => updateTrip({ name: e.target.value })}
                      placeholder="Summer Family Vacation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      value={trip.destination}
                      onChange={(e) => updateTrip({ destination: e.target.value })}
                      placeholder="Orlando, Florida"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={trip.startDate}
                        onChange={(e) => updateTrip({ startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={trip.endDate}
                        onChange={(e) => updateTrip({ endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Family Setup */}
              <FamilySetup
                familyMembers={trip.familyMembers}
                onUpdateMembers={updateFamilyMembers}
              />
            </div>

            {/* Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Available Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trip.familyMembers.length === 0 ? (
                  <Alert>
                    <Users className="h-4 w-4" />
                    <AlertDescription>
                      Add family members above to see activities filtered for your group!
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trip.activities.map((activity) => (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        familyMembers={trip.familyMembers}
                        onVote={voteOnActivity}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget">
            <BudgetTracker
              budget={trip.budget}
              expenses={trip.expenses}
              onUpdateBudget={updateBudget}
              onAddExpense={addExpense}
            />
          </TabsContent>

          <TabsContent value="safety">
            <EmergencyContacts
              contacts={trip.emergencyContacts}
              onAddContact={addEmergencyContact}
            />
          </TabsContent>

          <TabsContent value="packing">
            <PackingList
              packingList={trip.packingList}
              familyMembers={trip.familyMembers}
              onUpdatePackingList={updatePackingList}
            />
          </TabsContent>

          <TabsContent value="trip">
            <Card>
              <CardHeader>
                <CardTitle>Trip Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {trip.name && trip.destination ? (
                  <div className="space-y-4">
                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                      <h2 className="text-2xl font-bold text-blue-900">{trip.name}</h2>
                      <p className="text-blue-700">{trip.destination}</p>
                      {trip.startDate && trip.endDate && (
                        <p className="text-sm text-blue-600 mt-2">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">{trip.familyMembers.length}</div>
                        <div className="text-sm text-green-600">Family Members</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">${trip.budget}</div>
                        <div className="text-sm text-purple-600">Total Budget</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-700">{trip.activities.length}</div>
                        <div className="text-sm text-orange-600">Activities Available</div>
                      </div>
                    </div>

                    {trip.familyMembers.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Family Members</h3>
                        <div className="flex flex-wrap gap-2">
                          {trip.familyMembers.map((member) => (
                            <Badge key={member.id} variant="outline">
                              {member.name} ({member.age}y)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert>
                    <Calendar className="h-4 w-4" />
                    <AlertDescription>
                      Complete your trip details in the Planning tab to see your overview here!
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
