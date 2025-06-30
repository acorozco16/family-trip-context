
export interface Participant {
  id: string;
  name: string;
  age: number;
  dietaryRestrictions: string[];
  medicalNeeds: string[];
  preferences: string[];
}

export interface Budget {
  total: number;
  spent: number;
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Item {
  id: string;
  name: string;
  category: string;
  quantity: number;
  isPacked: boolean;
  assignedTo?: string;
  notes?: string;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  dateTaken: string;
  location?: string;
}

export interface ItineraryItem {
  id: string;
  activityId?: string; // Add optional activityId for linking to activity details
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: Location;
  participants: string[];
}

export interface Accommodation {
  id: string;
  name: string;
  type: string;
  address: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  cost?: number;
  notes?: string;
}

export interface Travel {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'other';
  provider: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  cost?: number;
  confirmationNumber?: string;
  notes?: string;
}

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  participants: Participant[];
  budget: Budget;
  locations: Location[];
  packingList: Item[];
  photos: Photo[];
  itinerary: ItineraryItem[];
  accommodations: Accommodation[];
  travels: Travel[];
}

export interface TripContextType {
  trip: Trip | null;
  loading: boolean;
  error: string | null;
  updateTrip: (updates: Partial<Trip>) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;
  addPackingItem: (item: Item) => void;
  removePackingItem: (id: string) => void;
  updatePackingItem: (id: string, updates: Partial<Item>) => void;
  togglePackingItem: (id: string) => void;
  addItineraryItem: (item: ItineraryItem) => void;
  removeItineraryItem: (id: string) => void;
  updateItineraryItem: (id: string, updates: Partial<ItineraryItem>) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
  addAccommodation: (accommodation: Accommodation) => void;
  removeAccommodation: (id: string) => void;
  updateAccommodation: (id: string, updates: Partial<Accommodation>) => void;
  addTravel: (travel: Travel) => void;
  removeTravel: (id: string) => void;
  updateTravel: (id: string, updates: Partial<Travel>) => void;
}
