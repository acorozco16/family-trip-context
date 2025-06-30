
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
import { Hotel, MapPin, Calendar, Plus } from 'lucide-react';
import { Accommodation } from '../types';

export default function Accommodations() {
  const { trip, loading, addAccommodation, removeAccommodation } = useTrip();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (loading) {
    return <div className="p-6">Loading accommodations...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  const handleAddAccommodation = (formData: FormData) => {
    const newAccommodation: Accommodation = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      address: formData.get('address') as string,
      checkIn: formData.get('checkIn') as string,
      checkOut: formData.get('checkOut') as string,
      status: formData.get('status') as 'confirmed' | 'pending' | 'cancelled',
      cost: formData.get('cost') ? Number(formData.get('cost')) : undefined,
      notes: formData.get('notes') as string || undefined,
    };

    addAccommodation(newAccommodation);
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accommodations</h1>
          <p className="text-gray-600">Manage your trip's hotels and stays</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Accommodation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Accommodation</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddAccommodation(new FormData(e.target as HTMLFormElement));
            }} className="space-y-4">
              <div>
                <Label htmlFor="name">Hotel/Property Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="checkIn">Check-in</Label>
                  <Input id="checkIn" name="checkIn" type="date" required />
                </div>
                <div>
                  <Label htmlFor="checkOut">Check-out</Label>
                  <Input id="checkOut" name="checkOut" type="date" required />
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
                <Label htmlFor="cost">Cost (optional)</Label>
                <Input id="cost" name="cost" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" name="notes" placeholder="Additional details..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Accommodation</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {trip.accommodations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trip.accommodations.map((accommodation) => (
            <Card key={accommodation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{accommodation.name}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(accommodation.status)}>
                    {accommodation.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{accommodation.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(accommodation.checkIn).toLocaleDateString()} - 
                      {new Date(accommodation.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Type:</span> {accommodation.type}
                  </div>
                  {accommodation.cost && (
                    <div className="text-sm">
                      <span className="font-medium">Cost:</span> ${accommodation.cost}
                    </div>
                  )}
                  {accommodation.notes && (
                    <div className="text-sm">
                      <span className="font-medium">Notes:</span> {accommodation.notes}
                    </div>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => removeAccommodation(accommodation.id)}
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
            <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accommodations yet</h3>
            <p className="text-gray-500">Add your hotels and stays to keep everything organized.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
