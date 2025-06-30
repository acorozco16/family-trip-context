
import React from 'react';
import { useTrip } from '../context/TripContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AddPackingItemModal from '../components/AddPackingItemModal';

export default function PackingList() {
  const { trip, loading, togglePackingItem } = useTrip();

  if (loading) {
    return <div className="p-6">Loading packing list...</div>;
  }

  if (!trip) {
    return <div className="p-6">No trip data available.</div>;
  }

  const packedItems = trip.packingList.filter(item => item.isPacked).length;
  const packingPercentage = trip.packingList.length > 0 ? (packedItems / trip.packingList.length) * 100 : 0;

  const itemsByCategory = trip.packingList.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof trip.packingList>);

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Packing List</h1>
            <p className="text-gray-600 mb-4">Keep track of what everyone needs to pack</p>
          </div>
          <AddPackingItemModal />
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Packing Progress</span>
              <span className="text-sm text-gray-500">{packedItems} of {trip.packingList.length} items</span>
            </div>
            <Progress value={packingPercentage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category}</span>
                <Badge variant="secondary">
                  {items.filter(item => item.isPacked).length} / {items.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={item.isPacked}
                      onCheckedChange={() => togglePackingItem(item.id)}
                      className="flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${item.isPacked ? 'line-through text-gray-500' : ''}`}>
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-sm text-gray-500 ml-1">
                            (x{item.quantity})
                          </span>
                        )}
                      </div>
                      {item.assignedTo && (
                        <div className="text-sm text-gray-500">
                          Assigned to: {item.assignedTo}
                        </div>
                      )}
                      {item.notes && (
                        <div className="text-sm text-gray-600 mt-1">
                          {item.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trip.packingList.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-6xl mb-4">🎒</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No packing items yet</h3>
            <p className="text-gray-500 mb-4">Start adding items to your family's packing list.</p>
            <AddPackingItemModal />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
