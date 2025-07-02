import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Plane, Hotel, Car, Train, Phone, MapPin, Calendar, Users, CheckCircle, Upload, FileText, Copy } from "lucide-react";

interface BookingsStepProps {
  onNext: () => void;
  tripData: any;
  setTripData: (data: any) => void;
}

export const BookingsStep = ({ onNext, tripData, setTripData }: BookingsStepProps) => {
  const [bookings, setBookings] = useState(tripData.bookings || {
    flights: [],
    accommodations: [],
    transport: []
  });

  // Generate family members list for selection
  const getFamilyMembers = () => {
    const members = [];
    
    // Add adults with their names if available
    if (tripData.adults && tripData.adults.length > 0) {
      tripData.adults.forEach((adult: any, index: number) => {
        members.push(adult.name || `Adult ${index + 1}`);
      });
    } else {
      // Fallback to default adults
      members.push("Adult 1", "Adult 2");
    }
    
    // Add kids with their names if available
    if (tripData.kids && tripData.kids.length > 0) {
      tripData.kids.forEach((kid: any, index: number) => {
        members.push(kid.name || `Child ${index + 1}`);
      });
    }
    
    return members;
  };

  const familyMembers = getFamilyMembers();

  // Quick Import handlers
  const handleEmailScreenshots = () => {
    // TODO: Implement email screenshots upload
    console.log("Email screenshots upload");
  };

  const handleCalendarImport = () => {
    // TODO: Implement Google Calendar import
    console.log("Calendar import");
  };

  const handleCopyPaste = () => {
    // TODO: Implement copy & paste confirmation text
    console.log("Copy & paste");
  };

  const addFlight = () => {
    setBookings({
      ...bookings,
      flights: [
        ...bookings.flights,
        {
          type: "outbound",
          flightNumber: "",
          airline: "",
          departure: "",
          arrival: "",
          confirmation: "",
          assignedTo: []
        }
      ]
    });
  };

  const updateFlight = (index: number, field: string, value: any) => {
    const updated = bookings.flights.map((flight: any, i: number) =>
      i === index ? { ...flight, [field]: value } : flight
    );
    setBookings({ ...bookings, flights: updated });
  };

  const removeFlight = (index: number) => {
    setBookings({
      ...bookings,
      flights: bookings.flights.filter((_: any, i: number) => i !== index)
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
          address: "",
          assignedTo: []
        }
      ]
    });
  };

  const updateAccommodation = (index: number, field: string, value: any) => {
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
          confirmation: "",
          assignedTo: []
        }
      ]
    });
  };

  const updateTransport = (index: number, field: string, value: any) => {
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

  const handleMemberToggle = (bookingType: string, bookingIndex: number, member: string, checked: boolean) => {
    const bookingArray = bookings[bookingType];
    const updated = bookingArray.map((item: any, i: number) => {
      if (i === bookingIndex) {
        const assignedTo = checked
          ? [...(item.assignedTo || []), member]
          : (item.assignedTo || []).filter((m: string) => m !== member);
        return { ...item, assignedTo };
      }
      return item;
    });
    setBookings({ ...bookings, [bookingType]: updated });
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

  const renderFamilyMemberSelector = (bookingType: string, bookingIndex: number, assignedTo: string[] = []) => (
    <div>
      <Label className="text-sm font-medium">Assigned to:</Label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {familyMembers.map((member) => (
          <div key={member} className="flex items-center space-x-2">
            <Checkbox
              id={`${bookingType}-${bookingIndex}-${member}`}
              checked={assignedTo.includes(member)}
              onCheckedChange={(checked) => 
                handleMemberToggle(bookingType, bookingIndex, member, checked as boolean)
              }
            />
            <Label 
              htmlFor={`${bookingType}-${bookingIndex}-${member}`}
              className="text-sm font-normal"
            >
              {member}
            </Label>
          </div>
        ))}
      </div>
      {assignedTo.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {assignedTo.map((member) => (
            <Badge key={member} variant="secondary" className="text-xs">
              {member}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );

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

      {/* Quick Import Options */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-center">Quick Import Options</CardTitle>
          <CardDescription className="text-center">
            Already have your bookings? Import them quickly with these shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-blue-200" onClick={handleEmailScreenshots}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Email Screenshots</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Upload confirmation emails or screenshots from your phone
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Upload Images
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-green-200" onClick={handleCalendarImport}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Calendar Import</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import existing bookings from Google Calendar or iCal
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Connect Calendar
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-200" onClick={handleCopyPaste}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Copy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Copy & Paste</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Paste confirmation details and let AI extract the info
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Paste Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or add manually</span>
        </div>
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
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Flight Information</h3>
              <p className="text-gray-600">Add flights for your family members</p>
            </div>
            <Button onClick={addFlight} variant="outline">
              <Plane className="w-4 h-4 mr-2" />
              Add Flight
            </Button>
          </div>

          {bookings.flights.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No flights added yet</p>
                <Button onClick={addFlight} className="bg-blue-600 hover:bg-blue-700">
                  Add Your First Flight
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.flights.map((flight: any, index: number) => (
                <Card key={index}>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Flight #{index + 1}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFlight(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`flight-type-${index}`}>Flight Type</Label>
                        <Select
                          value={flight.type}
                          onValueChange={(value) => updateFlight(index, "type", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="outbound">Outbound</SelectItem>
                            <SelectItem value="return">Return</SelectItem>
                            <SelectItem value="connecting">Connecting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor={`flight-number-${index}`}>Flight Number</Label>
                        <Input
                          id={`flight-number-${index}`}
                          placeholder="e.g., AA 1234"
                          value={flight.flightNumber}
                          onChange={(e) => updateFlight(index, "flightNumber", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`airline-${index}`}>Airline</Label>
                        <Input
                          id={`airline-${index}`}
                          placeholder="e.g., American Airlines"
                          value={flight.airline}
                          onChange={(e) => updateFlight(index, "airline", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`flight-confirmation-${index}`}>Confirmation Number</Label>
                        <Input
                          id={`flight-confirmation-${index}`}
                          placeholder="Booking reference"
                          value={flight.confirmation}
                          onChange={(e) => updateFlight(index, "confirmation", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`departure-${index}`}>Departure</Label>
                        <Input
                          id={`departure-${index}`}
                          placeholder="Date, time & airport"
                          value={flight.departure}
                          onChange={(e) => updateFlight(index, "departure", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`arrival-${index}`}>Arrival</Label>
                        <Input
                          id={`arrival-${index}`}
                          placeholder="Date, time & airport"
                          value={flight.arrival}
                          onChange={(e) => updateFlight(index, "arrival", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {renderFamilyMemberSelector("flights", index, flight.assignedTo)}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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

                    {renderFamilyMemberSelector("accommodations", index, acc.assignedTo)}
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

                    {renderFamilyMemberSelector("transport", index, trans.assignedTo)}
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
              <p className="text-sm text-gray-600">{tripData.city}, {tripData.country}</p>
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
                  <div className={`w-2 h-2 rounded-full ${bookings.flights.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm text-gray-600">{bookings.flights.length} flights added</span>
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
