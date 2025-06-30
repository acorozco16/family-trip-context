
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
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: Location;
  participants: string[];
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
}

export interface TripContextType {
  trip: Trip | null;
  loading: boolean;
  error: string | null;
  updateTrip: (updates: Partial<Trip>) => void;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (id: string) => void;
  addPackingItem: (item: Item) => void;
  removePackingItem: (id: string) => void;
  togglePackingItem: (id: string) => void;
  addItineraryItem: (item: ItineraryItem) => void;
  removeItineraryItem: (id: string) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
}
