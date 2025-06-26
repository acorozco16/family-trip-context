
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, Car, Train, Phone, MapPin, Calendar, Users, CheckCircle } from "lucide-react";

interface BookingsStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const BookingsStep = ({ onNext, tripData, setTripData }: BookingsStepProps) => {
  const [bookings, setBookings] = useState(tripData.bookings || {
    flights: { outbound: "", return: "", airline: "", confirmation: "" },
    accommodations: [],
    transport: []
  });

  const updateFlights = (field: string, value: string) => {
    setBookings({
      ...bookings,
      flights: { ...bookings.flights, [field]: value }
    });
  };

  const addAccommodation = () => {
    setBookings({
      ...bookings,
      accommodations: [
        ...bookings.accommodations,
        {
          name: "",
          type: "",
          checkIn: "",
          checkOut: "",
          confirmation: "",
          address: ""
        }
      ]
    });
  };

  const updateAccommodation = (index: number, field: string, value: string) => {
    const updated = bookings.accommodations.map((acc: any, i: number) =>
      i === index ? { ...acc, [field]: value } : acc
    );
    setBookings({ ...bookings, accommodations: updated });
  };

  const removeAccommodation = (index: number) => {
    setBookings({
      ...bookings,
      accommodations: bookings.accommodations.filter((_: any, i: number) => i !== index)
    });
  };

  const addTransport = () => {
    setBookings({
      ...bookings,
      transport: [
        ...bookings.transport,
        {
          type: "",
          provider: "",
          details: "",
          confirmation: ""
        }
      ]
    });
  };

  const updateTransport = (index: number, field: string, value: string) => {
    const updated = bookings.transport.map((trans: any, i: number) =>
      i === index ? { ...trans, [field]: value } : trans
    );
    setBookings({ ...bookings, transport: updated });
  };

  const removeTransport = (index: number) => {
    setBookings({
      ...bookings,
      transport: bookings.transport.filter((_: any, i: number) => i !== index)
    });
  };

  const handleNext = () => {
    setTripData({
      ...tripData,
      bookings
    });
    onNext();
  };

  const transportTypes = [
    { value: "rental-car", label: "Rental Car", fields: ["pickup", "return", "location"] },
    { value: "taxi", label: "Taxi/Rideshare", fields: ["contact", "phone"] },
    { value: "train", label: "Train", fields: ["from", "to", "departure"] },
    { value: "bus", label: "Bus/Coach", fields: ["route", "departure"] },
    { value: "private-transfer", label: "Private Transfer", fields: ["contact", "pickup"] }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Let's capture your bookings
        </h2>
        <p className="text-lg text-gray-600">
          Add your flight, accommodation, and transport details
        </p>
      </div>

      <Tabs defaultValue="flights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flights" className="flex items-center space-x-2">
            <Plane className="w-4 h-4" />
            <span>Flights</span>
          </TabsTrigger>
          <TabsTrigger value="stays" className="flex items-center space-x-2">
            <Hotel className="w-4 h-4" />
            <span>Stays</span>
          </TabsTrigger>
          <TabsTrigger value="transport" className="flex items-center space-x-2">
            <Car className="w-4 h-4" />
            <span>Transport</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
                Flight Information
              </CardTitle>
              <CardDescription>
                Add your flight details for all family members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Outbound Flight</h4>
                  <div>
                    <Label htmlFor="outbound-flight">Flight Number & Time</Label>
                    <Input
                      id="outbound-flight"
                      placeholder="e.g., AA 1234 - July 15, 8:30 AM"
                      value={bookings.flights.outbound}
                      onChange={(e) => updateFlights("outbound", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="airline">Airline</Label>
                    <Input
                      id="airline"
                      placeholder="e.g., American Airlines"
                      value={bookings.flights.airline}
                      onChange={(e) => updateFlights("airline", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Return Flight</h4>
                  <div>
                    <Label htmlFor="return-flight">Flight Number & Time</Label>
                    <Input
                      id="return-flight"
                      placeholder="e.g., AA 5678 - July 22, 6:15 PM"
                      value={bookings.flights.return}
                      onChange={(e) => updateFlights("return", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="flight-confirmation">Confirmation Number</Label>
                    <Input
                      id="flight-confirmation"
                      placeholder="Booking reference"
                      value={bookings.flights.confirmation}
                      onChange={(e) => updateFlights("confirmation", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stays" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Accommodations</h3>
              <p className="text-gray-600">Add multiple stays for your trip</p>
            </div>
            <Button onClick={addAccommodation} variant="outline">
              <Hotel className="w-4 h-4 mr-2" />
              Add Stay
            </Button>
          </div>

          {bookings.accommodations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Hotel className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No accommodations added yet</p>
                <Button onClick={addAccommodation} className="bg-orange-600 hover:bg-orange-700">
                  Add Your First Stay
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.accommodations.map((acc: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Stay #{index + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAccommodation(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`acc-name-${index}`}>Accommodation Name</Label>
                        <Input
                          id={`acc-name-${index}`}
                          placeholder="e.g., Hotel Casa Barcelona"
                          value={acc.name}
                          onChange={(e) => updateAccommodation(index, "name", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`acc-type-${index}`}>Type</Label>
                        <Select
                          value={acc.type}
                          onValueChange={(value) => updateAccommodation(index, "type", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="airbnb">Airbnb/Vacation Rental</SelectItem>
                            <SelectItem value="resort">Resort</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="hostel">Hostel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`acc-checkin-${index}`}>Check-in Date</Label>
                        <Input
                          id={`acc-checkin-${index}`}
                          type="date"
                          value={acc.checkIn}
                          onChange={(e) => updateAccommodation(index, "checkIn", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`acc-checkout-${index}`}>Check-out Date</Label>
                        <Input
                          id={`acc-checkout-${index}`}
                          type="date"
                          value={acc.checkOut}
                          onChange={(e) => updateAccommodation(index, "checkOut", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`acc-address-${index}`}>Address</Label>
                      <Textarea
                        id={`acc-address-${index}`}
                        placeholder="Full address or location details"
                        value={acc.address}
                        onChange={(e) => updateAccommodation(index, "address", e.target.value)}
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`acc-confirmation-${index}`}>Confirmation Number</Label>
                      <Input
                        id={`acc-confirmation-${index}`}
                        placeholder="Booking reference"
                        value={acc.confirmation}
                        onChange={(e) => updateAccommodation(index, "confirmation", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="transport" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Transportation</h3>
              <p className="text-gray-600">Add local transport and transfers</p>
            </div>
            <Button onClick={addTransport} variant="outline">
              <Car className="w-4 h-4 mr-2" />
              Add Transport
            </Button>
          </div>

          {bookings.transport.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Car className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No transport added yet</p>
                <Button onClick={addTransport} className="bg-purple-600 hover:bg-purple-700">
                  Add Transportation
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.transport.map((trans: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Transport #{index + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTransport(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`trans-type-${index}`}>Transport Type</Label>
                        <Select
                          value={trans.type}
                          onValueChange={(value) => updateTransport(index, "type", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select transport type" />
                          </SelectTrigger>
                          <SelectContent>
                            {transportTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`trans-provider-${index}`}>Provider/Company</Label>
                        <Input
                          id={`trans-provider-${index}`}
                          placeholder="e.g., Hertz, Uber, RENFE"
                          value={trans.provider}
                          onChange={(e) => updateTransport(index, "provider", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`trans-details-${index}`}>
                        {trans.type === "rental-car" ? "Pickup Address & Details" :
                         trans.type === "taxi" ? "Contact Name & Phone" :
                         trans.type === "train" ? "From City to City & Times" :
                         "Details & Schedule"}
                      </Label>
                      <Textarea
                        id={`trans-details-${index}`}
                        placeholder={
                          trans.type === "rental-car" ? "Barcelona Airport, Terminal 1 - Pickup July 15, 10:00 AM" :
                          trans.type === "taxi" ? "Driver: John Smith, Phone: +34 123 456 789" :
                          trans.type === "train" ? "Barcelona to Madrid, July 18, 8:30 AM - 11:45 AM" :
                          "Provide relevant details for this transport"
                        }
                        value={trans.details}
                        onChange={(e) => updateTransport(index, "details", e.target.value)}
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`trans-confirmation-${index}`}>Confirmation Number</Label>
                      <Input
                        id={`trans-confirmation-${index}`}
                        placeholder="Booking reference or ticket number"
                        value={trans.confirmation}
                        onChange={(e) => updateTransport(index, "confirmation", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Trip Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Destination</h4>
              <p className="text-sm text-gray-600">{tripData.destination || "Not specified"}</p>
              <p className="text-sm text-gray-600">{tripData.startDate} to {tripData.endDate}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Family</h4>
              <p className="text-sm text-gray-600">
                {tripData.adults || 2} adults, {tripData.kids?.length || 0} children
              </p>
              <p className="text-sm text-gray-600">Style: {tripData.travelStyle || "Not selected"}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Bookings</h4>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${bookings.flights.outbound ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">Flights {bookings.flights.outbound ? 'added' : 'pending'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${bookings.accommodations.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">{bookings.accommodations.length} stays added</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${bookings.transport.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">{bookings.transport.length} transport options</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button
          onClick={handleNext}
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white px-8"
        >
          Complete Trip Setup
        </Button>
      </div>
    </div>
  );
};
