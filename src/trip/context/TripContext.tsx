import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Trip, TripContextType, Participant, Item, ItineraryItem, Photo, Accommodation, Travel } from '../types';
import { mockTrip } from '../data/mockTrips';

const TripContext = createContext<TripContextType | undefined>(undefined);

type TripAction =
  | { type: 'SET_TRIP'; payload: Trip }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_TRIP'; payload: Partial<Trip> }
  | { type: 'ADD_PARTICIPANT'; payload: Participant }
  | { type: 'REMOVE_PARTICIPANT'; payload: string }
  | { type: 'UPDATE_PARTICIPANT'; payload: { id: string; updates: Partial<Participant> } }
  | { type: 'ADD_PACKING_ITEM'; payload: Item }
  | { type: 'REMOVE_PACKING_ITEM'; payload: string }
  | { type: 'UPDATE_PACKING_ITEM'; payload: { id: string; updates: Partial<Item> } }
  | { type: 'TOGGLE_PACKING_ITEM'; payload: string }
  | { type: 'ADD_ITINERARY_ITEM'; payload: ItineraryItem }
  | { type: 'REMOVE_ITINERARY_ITEM'; payload: string }
  | { type: 'UPDATE_ITINERARY_ITEM'; payload: { id: string; updates: Partial<ItineraryItem> } }
  | { type: 'ADD_PHOTO'; payload: Photo }
  | { type: 'REMOVE_PHOTO'; payload: string }
  | { type: 'ADD_ACCOMMODATION'; payload: Accommodation }
  | { type: 'REMOVE_ACCOMMODATION'; payload: string }
  | { type: 'UPDATE_ACCOMMODATION'; payload: { id: string; updates: Partial<Accommodation> } }
  | { type: 'ADD_TRAVEL'; payload: Travel }
  | { type: 'REMOVE_TRAVEL'; payload: string }
  | { type: 'UPDATE_TRAVEL'; payload: { id: string; updates: Partial<Travel> } };

interface TripState {
  trip: Trip | null;
  loading: boolean;
  error: string | null;
}

const initialState: TripState = {
  trip: mockTrip,
  loading: false,
  error: null,
};

function tripReducer(state: TripState, action: TripAction): TripState {
  switch (action.type) {
    case 'SET_TRIP':
      return { ...state, trip: action.payload, loading: false, error: null };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'UPDATE_TRIP':
      return {
        ...state,
        trip: state.trip ? { ...state.trip, ...action.payload } : null,
      };
    
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              participants: [...state.trip.participants, action.payload],
            }
          : null,
      };
    
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              participants: state.trip.participants.filter(p => p.id !== action.payload),
            }
          : null,
      };
    
    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              participants: state.trip.participants.map(p =>
                p.id === action.payload.id ? { ...p, ...action.payload.updates } : p
              ),
            }
          : null,
      };
    
    case 'ADD_PACKING_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              packingList: [...state.trip.packingList, action.payload],
            }
          : null,
      };
    
    case 'REMOVE_PACKING_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              packingList: state.trip.packingList.filter(item => item.id !== action.payload),
            }
          : null,
      };
    
    case 'UPDATE_PACKING_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              packingList: state.trip.packingList.map(item =>
                item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
              ),
            }
          : null,
      };
    
    case 'TOGGLE_PACKING_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              packingList: state.trip.packingList.map(item =>
                item.id === action.payload
                  ? { ...item, isPacked: !item.isPacked }
                  : item
              ),
            }
          : null,
      };
    
    case 'ADD_ITINERARY_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              itinerary: [...state.trip.itinerary, action.payload],
            }
          : null,
      };
    
    case 'REMOVE_ITINERARY_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              itinerary: state.trip.itinerary.filter(item => item.id !== action.payload),
            }
          : null,
      };
    
    case 'UPDATE_ITINERARY_ITEM':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              itinerary: state.trip.itinerary.map(item =>
                item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
              ),
            }
          : null,
      };
    
    case 'ADD_PHOTO':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              photos: [...state.trip.photos, action.payload],
            }
          : null,
      };
    
    case 'REMOVE_PHOTO':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              photos: state.trip.photos.filter(photo => photo.id !== action.payload),
            }
          : null,
      };
    
    case 'ADD_ACCOMMODATION':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              accommodations: [...state.trip.accommodations, action.payload],
            }
          : null,
      };
    
    case 'REMOVE_ACCOMMODATION':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              accommodations: state.trip.accommodations.filter(acc => acc.id !== action.payload),
            }
          : null,
      };
    
    case 'UPDATE_ACCOMMODATION':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              accommodations: state.trip.accommodations.map(acc =>
                acc.id === action.payload.id ? { ...acc, ...action.payload.updates } : acc
              ),
            }
          : null,
      };
    
    case 'ADD_TRAVEL':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              travels: [...state.trip.travels, action.payload],
            }
          : null,
      };
    
    case 'REMOVE_TRAVEL':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              travels: state.trip.travels.filter(travel => travel.id !== action.payload),
            }
          : null,
      };
    
    case 'UPDATE_TRAVEL':
      return {
        ...state,
        trip: state.trip
          ? {
              ...state.trip,
              travels: state.trip.travels.map(travel =>
                travel.id === action.payload.id ? { ...travel, ...action.payload.updates } : travel
              ),
            }
          : null,
      };
    
    default:
      return state;
  }
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  const contextValue: TripContextType = {
    trip: state.trip,
    loading: state.loading,
    error: state.error,
    updateTrip: (updates) => dispatch({ type: 'UPDATE_TRIP', payload: updates }),
    addParticipant: (participant) => dispatch({ type: 'ADD_PARTICIPANT', payload: participant }),
    removeParticipant: (id) => dispatch({ type: 'REMOVE_PARTICIPANT', payload: id }),
    updateParticipant: (id, updates) => dispatch({ type: 'UPDATE_PARTICIPANT', payload: { id, updates } }),
    addPackingItem: (item) => dispatch({ type: 'ADD_PACKING_ITEM', payload: item }),
    removePackingItem: (id) => dispatch({ type: 'REMOVE_PACKING_ITEM', payload: id }),
    updatePackingItem: (id, updates) => dispatch({ type: 'UPDATE_PACKING_ITEM', payload: { id, updates } }),
    togglePackingItem: (id) => dispatch({ type: 'TOGGLE_PACKING_ITEM', payload: id }),
    addItineraryItem: (item) => dispatch({ type: 'ADD_ITINERARY_ITEM', payload: item }),
    removeItineraryItem: (id) => dispatch({ type: 'REMOVE_ITINERARY_ITEM', payload: id }),
    updateItineraryItem: (id, updates) => dispatch({ type: 'UPDATE_ITINERARY_ITEM', payload: { id, updates } }),
    addPhoto: (photo) => dispatch({ type: 'ADD_PHOTO', payload: photo }),
    removePhoto: (id) => dispatch({ type: 'REMOVE_PHOTO', payload: id }),
    addAccommodation: (accommodation) => dispatch({ type: 'ADD_ACCOMMODATION', payload: accommodation }),
    removeAccommodation: (id) => dispatch({ type: 'REMOVE_ACCOMMODATION', payload: id }),
    updateAccommodation: (id, updates) => dispatch({ type: 'UPDATE_ACCOMMODATION', payload: { id, updates } }),
    addTravel: (travel) => dispatch({ type: 'ADD_TRAVEL', payload: travel }),
    removeTravel: (id) => dispatch({ type: 'REMOVE_TRAVEL', payload: id }),
    updateTravel: (id, updates) => dispatch({ type: 'UPDATE_TRAVEL', payload: { id, updates } }),
  };

  return <TripContext.Provider value={contextValue}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
