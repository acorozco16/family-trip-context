
import { Trip } from '../types';

export const mockTrip: Trip = {
  id: '1',
  name: 'Family Beach Vacation',
  startDate: '2024-07-15',
  endDate: '2024-07-22',
  participants: [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 35,
      dietaryRestrictions: ['vegetarian'],
      medicalNeeds: ['inhaler for asthma'],
      preferences: ['beach activities', 'photography'],
    },
    {
      id: '2',
      name: 'Mike Johnson',
      age: 37,
      dietaryRestrictions: [],
      medicalNeeds: [],
      preferences: ['fishing', 'hiking'],
    },
    {
      id: '3',
      name: 'Emma Johnson',
      age: 8,
      dietaryRestrictions: ['no nuts'],
      medicalNeeds: [],
      preferences: ['swimming', 'building sandcastles'],
    },
    {
      id: '4',
      name: 'Jake Johnson',
      age: 12,
      dietaryRestrictions: [],
      medicalNeeds: [],
      preferences: ['water sports', 'video games'],
    },
  ],
  budget: {
    total: 5000,
    spent: 2350,
    categories: [
      { id: '1', name: 'Accommodation', allocated: 2000, spent: 1800 },
      { id: '2', name: 'Food & Dining', allocated: 1500, spent: 450 },
      { id: '3', name: 'Activities', allocated: 1000, spent: 100 },
      { id: '4', name: 'Transportation', allocated: 500, spent: 0 },
    ],
  },
  locations: [
    {
      id: '1',
      name: 'Sunny Beach Resort',
      address: '123 Ocean Drive, Myrtle Beach, SC 29577',
      coordinates: { lat: 33.6891, lng: -78.8867 },
    },
    {
      id: '2',
      name: 'Boardwalk Pier',
      address: '1200 N Ocean Blvd, Myrtle Beach, SC 29577',
    },
  ],
  packingList: [
    {
      id: '1',
      name: 'Sunscreen SPF 50',
      category: 'Personal Care',
      quantity: 2,
      isPacked: false,
      assignedTo: 'Sarah Johnson',
    },
    {
      id: '2',
      name: 'Beach Towels',
      category: 'Beach Gear',
      quantity: 4,
      isPacked: true,
    },
    {
      id: '3',
      name: 'Swimming Goggles',
      category: 'Beach Gear',
      quantity: 2,
      isPacked: false,
      assignedTo: 'Emma Johnson',
    },
  ],
  photos: [
    {
      id: '1',
      url: '/placeholder.svg',
      caption: 'Beautiful sunset at the beach',
      dateTaken: '2024-07-16T19:30:00Z',
      location: 'Sunny Beach Resort',
    },
  ],
  itinerary: [
    {
      id: '1',
      title: 'Check-in at Resort',
      description: 'Arrive and check into our beachfront suite',
      startTime: '2024-07-15T15:00:00Z',
      endTime: '2024-07-15T16:00:00Z',
      location: {
        id: '1',
        name: 'Sunny Beach Resort',
        address: '123 Ocean Drive, Myrtle Beach, SC 29577',
      },
      participants: ['1', '2', '3', '4'],
    },
    {
      id: '2',
      title: 'Beach Day',
      description: 'Family fun at the beach with sandcastle building',
      startTime: '2024-07-16T10:00:00Z',
      endTime: '2024-07-16T16:00:00Z',
      location: {
        id: '2',
        name: 'Boardwalk Pier',
        address: '1200 N Ocean Blvd, Myrtle Beach, SC 29577',
      },
      participants: ['1', '2', '3', '4'],
    },
  ],
};
