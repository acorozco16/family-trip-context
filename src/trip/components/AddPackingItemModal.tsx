
import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Item } from '../types';
import PackingItemForm from './PackingItemForm';

export default function AddPackingItemModal() {
  const { addPackingItem } = useTrip();
  const [open, setOpen] = useState(false);

  const handleSubmit = (formData: Omit<Item, 'id' | 'isPacked'>) => {
    const newItem: Item = {
      id: Date.now().toString(),
      isPacked: false,
      ...formData
    };

    addPackingItem(newItem);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Packing Item</DialogTitle>
        </DialogHeader>
        <PackingItemForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
