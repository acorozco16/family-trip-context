
import React from 'react';
import { useTrip } from '../context/TripContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Item } from '../types';

interface PackingItemFormProps {
  item?: Item;
  onSubmit: (formData: Omit<Item, 'id' | 'isPacked'>) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function PackingItemForm({ 
  item, 
  onSubmit, 
  onCancel, 
  submitLabel = 'Add Item' 
}: PackingItemFormProps) {
  const { trip } = useTrip();
  const [formData, setFormData] = React.useState({
    name: item?.name || '',
    category: item?.category || '',
    quantity: item?.quantity || 1,
    assignedTo: item?.assignedTo || '',
    notes: item?.notes || ''
  });

  const categories = [
    'Personal Care', 
    'Beach Gear', 
    'Clothing', 
    'Electronics', 
    'Documents', 
    'Snacks', 
    'Medicine',
    'Toys & Games',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      category: formData.category || 'Other',
      quantity: formData.quantity,
      assignedTo: formData.assignedTo || undefined,
      notes: formData.notes || undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Item Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter item name"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
        />
      </div>
      
      {trip && (
        <div>
          <Label htmlFor="assignedTo">Assign To</Label>
          <Select value={formData.assignedTo} onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select person (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No assignment</SelectItem>
              {trip.participants.map(participant => (
                <SelectItem key={participant.id} value={participant.name}>
                  {participant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Add any notes or special instructions"
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
