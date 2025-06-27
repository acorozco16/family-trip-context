
export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  dietaryRestrictions: string[];
  medicalNeeds: string[];
  preferences: string[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  ageRange: {
    min: number;
    max: number;
  };
  cost: number;
  duration: number;
  category: string;
  rating: number;
  isKidFriendly: boolean;
  location: string;
  votes: Record<string, boolean>;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface PackingItem {
  id: string;
  item: string;
  category: string;
  isChecked: boolean;
  forMember: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paidBy: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  familyMembers: FamilyMember[];
  activities: Activity[];
  accommodations: string[];
  emergencyContacts: EmergencyContact[];
  packingList: PackingItem[];
  expenses: Expense[];
}
