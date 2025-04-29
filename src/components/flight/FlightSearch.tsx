
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from 'date-fns';
import { CalendarIcon, Plane, Users } from "lucide-react";

interface FlightSearchProps {
  onSearch: (params: any) => void;
}

export const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departDate, setDepartDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      tripType,
      fromLocation,
      toLocation,
      departDate,
      returnDate: tripType === 'roundtrip' ? returnDate : null,
      passengers,
      cabinClass
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSearch}>
          <div className="space-y-6">
            <Tabs defaultValue="roundtrip" value={tripType} onValueChange={(v) => setTripType(v as 'roundtrip' | 'oneway')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
                <TabsTrigger value="oneway">One Way</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fromLocation">From</Label>
                <div className="relative">
                  <Plane className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fromLocation"
                    placeholder="City or Airport"
                    className="pl-8"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toLocation">To</Label>
                <div className="relative">
                  <Plane className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="toLocation"
                    placeholder="City or Airport"
                    className="pl-8"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="departDate">Depart</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="departDate"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {departDate ? format(departDate, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={departDate}
                      onSelect={setDepartDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {tripType === 'roundtrip' && (
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        id="returnDate"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={returnDate}
                        onSelect={setReturnDate}
                        initialFocus
                        disabled={(date) => date < (departDate || new Date())}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="passengers">Passengers</Label>
                <div className="relative">
                  <Users className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="9"
                    className="pl-8"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cabinClass">Cabin Class</Label>
                <select
                  id="cabinClass"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                >
                  <option value="economy">Economy</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="w-full">Search Flights</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
