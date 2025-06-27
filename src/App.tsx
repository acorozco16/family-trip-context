
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
import { toast } from '@/hooks/use-toast';
import { Calendar, Users, DollarSign, MapPin, AlertTriangle, Plus, Wifi, WifiOff } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Auto-save functionality with error handling
  useEffect(() => {
    const autoSave = setInterval(async () => {
      try {
        localStorage.setItem('familyTrip', JSON.stringify(trip));
        setLastSaved(new Date());
        setSaveError(null);
        
        if (isOnline) {
          toast({
            title: "Trip saved",
            description: "Your trip has been automatically saved",
            duration: 2000,
          });
        }
      } catch (error) {
        setSaveError('Failed to save trip data');
        toast({
          title: "Save failed",
          description: "Could not save your trip. Please check your storage space.",
          variant: "destructive",
        });
      }
    }, 5000);

    return () => clearInterval(autoSave);
  }, [trip, isOnline]);

  // Load saved trip on mount with error handling
  useEffect(() => {
    const loadTrip = async () => {
      try {
        setIsLoading(true);
        const savedTrip = localStorage.getItem('familyTrip');
        if (savedTrip) {
          const parsedTrip = JSON.parse(savedTrip);
          setTrip({ ...trip, ...parsedTrip, activities: SAMPLE_ACTIVITIES });
          toast({
            title: "Trip loaded",
            description: "Your previous trip has been restored",
          });
        }
      } catch (error) {
        toast({
          title: "Load failed",
          description: "Could not restore your previous trip",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTrip();
  }, []);

  // Online/offline status with notifications
  useEffect(() => {
    const handleOnlineStatus = () => {
      const newStatus = navigator.onLine;
      setIsOnline(newStatus);
      
      toast({
        title: newStatus ? "Back online" : "You're offline",
        description: newStatus ? "Trip data will sync automatically" : "Changes will be saved locally",
        variant: newStatus ? "default" : "destructive",
      });
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Validation helper
  const validateTripDetails = (updates: Partial<Trip>) => {
    const errors: Record<string, string> = {};
    
    if (updates.name !== undefined && updates.name.length < 3) {
      errors.name = 'Trip name must be at least 3 characters';
    }
    
    if (updates.destination !== undefined && updates.destination.length < 3) {
      errors.destination = 'Destination must be at least 3 characters';
    }
    
    if (updates.startDate && updates.endDate && new Date(updates.startDate) > new Date(updates.endDate)) {
      errors.dateRange = 'Start date cannot be after end date';
    }
    
    if (updates.budget !== undefined && updates.budget < 0) {
      errors.budget = 'Budget cannot be negative';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateTrip = (updates: Partial<Trip>) => {
    if (validateTripDetails(updates)) {
      setTrip(prev => ({ ...prev, ...updates }));
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">Loading your family trip...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b transition-all duration-200">
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
              <Badge 
                variant={isOnline ? "default" : "destructive"}
                className="transition-all duration-200 hover:scale-105"
              >
                {isOnline ? (
                  <>
                    <Wifi className="w-3 h-3 mr-1" />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff className="w-3 h-3 mr-1" />
                    Offline
                  </>
                )}
              </Badge>
              {lastSaved && (
                <Badge variant="outline" className="transition-all duration-200">
                  Saved {lastSaved.toLocaleTimeString()}
                </Badge>
              )}
              {saveError && (
                <Badge variant="destructive" className="transition-all duration-200">
                  Save Error
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="planning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5 bg-white shadow-sm">
            <TabsTrigger 
              value="planning" 
              className="flex items-center gap-2 transition-all duration-200 hover:bg-blue-50 data-[state=active]:bg-blue-100"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Planning</span>
            </TabsTrigger>
            <TabsTrigger 
              value="budget" 
              className="flex items-center gap-2 transition-all duration-200 hover:bg-green-50 data-[state=active]:bg-green-100"
            >
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger 
              value="safety" 
              className="flex items-center gap-2 transition-all duration-200 hover:bg-red-50 data-[state=active]:bg-red-100"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Safety</span>
            </TabsTrigger>
            <TabsTrigger 
              value="packing" 
              className="flex items-center gap-2 transition-all duration-200 hover:bg-purple-50 data-[state=active]:bg-purple-100"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Packing</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trip" 
              className="flex items-center gap-2 transition-all duration-200 hover:bg-orange-50 data-[state=active]:bg-orange-100"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Trip</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Trip Details */}
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="trip-name" className="text-sm font-medium">
                      Trip Name *
                    </Label>
                    <Input
                      id="trip-name"
                      value={trip.name}
                      onChange={(e) => updateTrip({ name: e.target.value })}
                      placeholder="Summer Family Vacation"
                      className={`transition-all duration-200 ${validationErrors.name ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                      aria-describedby={validationErrors.name ? "name-error" : undefined}
                    />
                    {validationErrors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="destination" className="text-sm font-medium">
                      Destination *
                    </Label>
                    <Input
                      id="destination"
                      value={trip.destination}
                      onChange={(e) => updateTrip({ destination: e.target.value })}
                      placeholder="Orlando, Florida"
                      className={`transition-all duration-200 ${validationErrors.destination ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                      aria-describedby={validationErrors.destination ? "destination-error" : undefined}
                    />
                    {validationErrors.destination && (
                      <p id="destination-error" className="text-red-500 text-sm mt-1" role="alert">
                        {validationErrors.destination}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date" className="text-sm font-medium">
                        Start Date
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={trip.startDate}
                        onChange={(e) => updateTrip({ startDate: e.target.value })}
                        className="transition-all duration-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date" className="text-sm font-medium">
                        End Date
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={trip.endDate}
                        onChange={(e) => updateTrip({ endDate: e.target.value })}
                        className="transition-all duration-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  {validationErrors.dateRange && (
                    <p className="text-red-500 text-sm" role="alert">
                      {validationErrors.dateRange}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Family Setup */}
              <FamilySetup
                familyMembers={trip.familyMembers}
                onUpdateMembers={updateFamilyMembers}
              />
            </div>

            {/* Activities */}
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Available Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trip.familyMembers.length === 0 ? (
                  <Alert className="border-blue-200 bg-blue-50">
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

          <TabsContent value="budget" className="animate-fade-in">
            <BudgetTracker
              budget={trip.budget}
              expenses={trip.expenses}
              onUpdateBudget={updateBudget}
              onAddExpense={addExpense}
            />
          </TabsContent>

          <TabsContent value="safety" className="animate-fade-in">
            <EmergencyContacts
              contacts={trip.emergencyContacts}
              onAddContact={addEmergencyContact}
            />
          </TabsContent>

          <TabsContent value="packing" className="animate-fade-in">
            <PackingList
              packingList={trip.packingList}
              familyMembers={trip.familyMembers}
              onUpdatePackingList={updatePackingList}
            />
          </TabsContent>

          <TabsContent value="trip" className="animate-fade-in">
            <Card className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <CardTitle>Trip Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {trip.name && trip.destination ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <h2 className="text-2xl font-bold text-blue-900">{trip.name}</h2>
                      <p className="text-blue-700 text-lg">{trip.destination}</p>
                      {trip.startDate && trip.endDate && (
                        <p className="text-sm text-blue-600 mt-2">
                          {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200 transition-all duration-200 hover:shadow-md">
                        <div className="text-2xl font-bold text-green-700">{trip.familyMembers.length}</div>
                        <div className="text-sm text-green-600">Family Members</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200 transition-all duration-200 hover:shadow-md">
                        <div className="text-2xl font-bold text-purple-700">${trip.budget}</div>
                        <div className="text-sm text-purple-600">Total Budget</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200 transition-all duration-200 hover:shadow-md">
                        <div className="text-2xl font-bold text-orange-700">{trip.activities.length}</div>
                        <div className="text-sm text-orange-600">Activities Available</div>
                      </div>
                    </div>

                    {trip.familyMembers.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="font-semibold mb-3">Family Members</h3>
                        <div className="flex flex-wrap gap-2">
                          {trip.familyMembers.map((member) => (
                            <Badge key={member.id} variant="outline" className="transition-all duration-200 hover:scale-105">
                              {member.name} ({member.age}y)
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No trip details yet</h3>
                    <p className="text-gray-500 mb-4">
                      Complete your trip details in the Planning tab to see your overview here!
                    </p>
                    <Button 
                      onClick={() => document.querySelector('[value="planning"]')?.click()}
                      className="transition-all duration-200 hover:scale-105"
                    >
                      Start Planning
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
