
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, User, Plus } from "lucide-react";

interface Connection {
  id: string;
  name: string;
  email?: string;
  type: "adult" | "child";
  age?: string;
  interests?: string;
  specialNeeds?: string;
}

interface ConnectionsSelectorProps {
  type: "adult" | "child";
  onAddConnection: (connection: Connection) => void;
  existingConnections: Connection[];
}

export const ConnectionsSelector = ({ type, onAddConnection, existingConnections }: ConnectionsSelectorProps) => {
  // Mock connections data - in a real app, this would come from a database
  const mockConnections: Connection[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "adult",
      interests: "photography, hiking",
      specialNeeds: ""
    },
    {
      id: "2", 
      name: "Mike Chen",
      email: "mike@example.com",
      type: "adult",
      interests: "food, culture",
      specialNeeds: ""
    },
    {
      id: "3",
      name: "Emma Smith",
      type: "child",
      age: "8",
      interests: "animals, art",
      specialNeeds: ""
    },
    {
      id: "4",
      name: "Lucas Brown",
      type: "child", 
      age: "12",
      interests: "sports, video games",
      specialNeeds: ""
    }
  ];

  const availableConnections = mockConnections.filter(
    conn => conn.type === type && !existingConnections.some(existing => existing.id === conn.id)
  );

  if (availableConnections.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <UserCheck className="w-5 h-5 text-green-600 mr-2" />
          Add from Connections
        </CardTitle>
        <CardDescription>
          Quickly add {type === "adult" ? "adults" : "children"} you've traveled with before
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-3">
          {availableConnections.map((connection) => {
            const Icon = connection.type === "adult" ? UserCheck : User;
            return (
              <div key={connection.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="font-medium">{connection.name}</p>
                    {connection.email && (
                      <p className="text-sm text-gray-500">{connection.email}</p>
                    )}
                    {connection.age && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">
                        Age {connection.age}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddConnection(connection)}
                  className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
