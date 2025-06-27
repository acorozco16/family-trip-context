
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { PackingItem, FamilyMember } from '@/types/trip';

interface PackingListProps {
  packingList: PackingItem[];
  familyMembers: FamilyMember[];
  onUpdatePackingList: (items: PackingItem[]) => void;
}

export const PackingList: React.FC<PackingListProps> = ({ 
  packingList, 
  familyMembers, 
  onUpdatePackingList 
}) => {
  const [newItem, setNewItem] = useState({
    item: '',
    category: 'Clothing',
    forMember: 'Everyone'
  });

  const categories = ['Clothing', 'Toiletries', 'Electronics', 'Documents', 'Medications', 'Entertainment', 'Other'];

  useEffect(() => {
    // Generate smart suggestions based on family composition
    const suggestions = generateSmartSuggestions(familyMembers);
    const existingItems = packingList.map(item => item.item.toLowerCase());
    const newSuggestions = suggestions.filter(
      suggestion => !existingItems.includes(suggestion.item.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions

    if (newSuggestions.length > 0 && packingList.length === 0) {
      onUpdatePackingList(newSuggestions);
    }
  }, [familyMembers, packingList.length, onUpdatePackingList]);

  const generateSmartSuggestions = (members: FamilyMember[]): PackingItem[] => {
    const suggestions: PackingItem[] = [];
    const hasKids = members.some(member => member.age < 18);
    const hasBaby = members.some(member => member.age < 3);

    // Basic items for everyone
    suggestions.push(
      { id: Date.now() + '-1', item: 'Passports/IDs', category: 'Documents', isChecked: false, forMember: 'Everyone' },
      { id: Date.now() + '-2', item: 'Phone Chargers', category: 'Electronics', isChecked: false, forMember: 'Everyone' },
      { id: Date.now() + '-3', item: 'First Aid Kit', category: 'Medications', isChecked: false, forMember: 'Everyone' }
    );

    if (hasKids) {
      suggestions.push(
        { id: Date.now() + '-4', item: 'Snacks for Kids', category: 'Other', isChecked: false, forMember: 'Kids' },
        { id: Date.now() + '-5', item: 'Entertainment/Games', category: 'Entertainment', isChecked: false, forMember: 'Kids' }
      );
    }

    if (hasBaby) {
      suggestions.push(
        { id: Date.now() + '-6', item: 'Diapers', category: 'Other', isChecked: false, forMember: 'Baby' },
        { id: Date.now() + '-7', item: 'Baby Formula/Food', category: 'Other', isChecked: false, forMember: 'Baby' }
      );
    }

    return suggestions;
  };

  const addItem = () => {
    if (newItem.item) {
      const item: PackingItem = {
        id: Date.now().toString(),
        item: newItem.item,
        category: newItem.category,
        isChecked: false,
        forMember: newItem.forMember
      };
      onUpdatePackingList([...packingList, item]);
      setNewItem({ item: '', category: 'Clothing', forMember: 'Everyone' });
    }
  };

  const toggleItem = (id: string) => {
    const updatedList = packingList.map(item =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    onUpdatePackingList(updatedList);
  };

  const completedItems = packingList.filter(item => item.isChecked).length;
  const completionPercentage = packingList.length > 0 ? (completedItems / packingList.length) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Packing List</span>
          <Badge variant="outline">
            {completedItems}/{packingList.length} packed ({Math.round(completionPercentage)}%)
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label htmlFor="item">Item</Label>
            <Input
              id="item"
              value={newItem.item}
              onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
              placeholder="What to pack?"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="w-full p-2 border rounded-md"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="for-member">For Member</Label>
            <select
              id="for-member"
              className="w-full p-2 border rounded-md"
              value={newItem.forMember}
              onChange={(e) => setNewItem({ ...newItem, forMember: e.target.value })}
            >
              <option value="Everyone">Everyone</option>
              {familyMembers.map(member => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
            </select>
          </div>
        </div>
        <Button onClick={addItem} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {categories.map(category => {
            const categoryItems = packingList.filter(item => item.category === category);
            if (categoryItems.length === 0) return null;
            
            return (
              <div key={category}>
                <h4 className="font-medium text-sm text-gray-600 mb-2">{category}</h4>
                {categoryItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                    <Checkbox
                      checked={item.isChecked}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <span className={`flex-1 ${item.isChecked ? 'line-through text-gray-500' : ''}`}>
                      {item.item}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.forMember}
                    </Badge>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
