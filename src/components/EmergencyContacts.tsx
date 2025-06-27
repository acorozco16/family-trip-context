
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Plus } from 'lucide-react';
import { EmergencyContact } from '@/types/trip';

interface EmergencyContactsProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: EmergencyContact) => void;
}

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ contacts, onAddContact }) => {
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: ''
  });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        relationship: newContact.relationship,
        phone: newContact.phone,
        email: newContact.email
      };
      onAddContact(contact);
      setNewContact({ name: '', relationship: '', phone: '', email: '' });
    }
  };

  const callContact = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              placeholder="Contact name"
            />
          </div>
          <div>
            <Label htmlFor="relationship">Relationship</Label>
            <Input
              id="relationship"
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              placeholder="e.g., Doctor, Friend"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              placeholder="contact@example.com"
            />
          </div>
        </div>
        <Button onClick={addContact} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>

        <div className="space-y-2">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-gray-600">{contact.relationship}</div>
                <div className="text-sm text-gray-600">{contact.email}</div>
              </div>
              <Button
                size="sm"
                onClick={() => callContact(contact.phone)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Call {contact.phone}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
