
import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Item } from '../types';
import PackingItemForm from './PackingItemForm';

interface EditPackingItemModalProps {
  item: Item;
}

export default function EditPackingItemModal({ item }: EditPackingItemModalProps) {
  const { updatePackingItem, removePackingItem } = useTrip();
  const [open, setOpen] = useState(false);

  const handleSubmit = (formData: Omit<Item, 'id' | 'isPacked'>) => {
    updatePackingItem(item.id, formData);
    setOpen(false);
  };

  const handleDelete = () => {
    removePackingItem(item.id);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Packing Item</DialogTitle>
        </DialogHeader>
        <PackingItemForm
          item={item}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          submitLabel="Update Item"
        />
        <div className="border-t pt-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            className="w-full"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
