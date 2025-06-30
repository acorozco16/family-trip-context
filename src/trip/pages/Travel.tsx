
import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane, MapPin, Clock, Plus } from 'lucide-react';
import { Travel } from '../types';

export default function TravelPage() {
  const { trip, loading, addTravel, removeTravel } = useTrip();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (loading) {
    return <div className="p-6">Loading travel details...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  const handleAddTravel = (formData: FormData) => {
    const newTravel: Travel = {
      id: Date.now().toString(),
      type: formData.get('type') as 'flight' | 'train' | 'bus' | 'car' | 'other',
      provider: formData.get('provider') as string,
      from: formData.get('from') as string,
      to: formData.get('to') as string,
      departureTime: formData.get('departureTime') as string,
      arrivalTime: formData.get('arrivalTime') as string || undefined,
      status: formData.get('status') as 'confirmed' | 'pending' | 'cancelled',
      cost: formData.get('cost') ? Number(formData.get('cost')) : undefined,
      confirmationNumber: formData.get('confirmationNumber') as string || undefined,
      notes: formData.get('notes') as string || undefined,
    };

    addTravel(newTravel);
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight': return '✈️';
      case 'train': return '🚂';
      case 'bus': return '🚌';
      case 'car': return '🚗';
      default: return '🚶';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Travel</h1>
          <p className="text-gray-600">Manage your flights, trains, and transportation</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Travel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Travel</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddTravel(new FormData(e.target as HTMLFormElement));
            }} className="space-y-4">
              <div>
                <Label htmlFor="type">Travel Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select travel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flight">Flight</SelectItem>
                    <SelectItem value="train">Train</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="car">Car/Rental</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="provider">Provider/Airline</Label>
                <Input id="provider" name="provider" required placeholder="e.g., Delta, Hertz, Amtrak" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="from">From</Label>
                  <Input id="from" name="from" required placeholder="Departure location" />
                </div>
                <div>
                  <Label htmlFor="to">To</Label>
                  <Input id="to" name="to" required placeholder="Arrival location" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="departureTime">Departure</Label>
                  <Input id="departureTime" name="departureTime" type="datetime-local" required />
                </div>
                <div>
                  <Label htmlFor="arrivalTime">Arrival (optional)</Label>
                  <Input id="arrivalTime" name="arrivalTime" type="datetime-local" />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="confirmationNumber">Confirmation Number (optional)</Label>
                <Input id="confirmationNumber" name="confirmationNumber" placeholder="Booking reference" />
              </div>
              <div>
                <Label htmlFor="cost">Cost (optional)</Label>
                <Input id="cost" name="cost" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" name="notes" placeholder="Gate info, seat numbers, etc." />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Travel</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {trip.travels.length > 0 ? (
        <div className="space-y-4">
          {trip.travels.map((travel) => (
            <Card key={travel.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(travel.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{travel.provider}</CardTitle>
                      <p className="text-sm text-gray-600 capitalize">{travel.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(travel.status)}>
                    {travel.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span><strong>From:</strong> {travel.from}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span><strong>To:</strong> {travel.to}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span><strong>Departure:</strong> {new Date(travel.departureTime).toLocaleString()}</span>
                    </div>
                    {travel.arrivalTime && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span><strong>Arrival:</strong> {new Date(travel.arrivalTime).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    {travel.confirmationNumber && (
                      <div className="text-sm">
                        <strong>Confirmation:</strong> {travel.confirmationNumber}
                      </div>
                    )}
                    {travel.cost && (
                      <div className="text-sm">
                        <strong>Cost:</strong> ${travel.cost}
                      </div>
                    )}
                    {travel.notes && (
                      <div className="text-sm">
                        <strong>Notes:</strong> {travel.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeTravel(travel.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No travel bookings yet</h3>
            <p className="text-gray-500">Add your flights, trains, and other transportation details.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
