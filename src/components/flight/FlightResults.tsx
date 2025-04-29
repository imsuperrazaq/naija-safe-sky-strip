
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plane, Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { format } from 'date-fns';
import { mockGDSSearch } from './gdsService';
import type { Flight } from './types';

interface FlightResultsProps {
  searchParams: any;
  onSelectFlight: (flight: Flight) => void;
  onBack: () => void;
}

export const FlightResults: React.FC<FlightResultsProps> = ({ 
  searchParams, 
  onSelectFlight,
  onBack
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departTime'>('price');

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call to a GDS system
        const results = await mockGDSSearch(searchParams);
        setFlights(results);
      } catch (error) {
        console.error('Error fetching flight results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams]);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.durationMinutes - b.durationMinutes;
    // Sort by departure time
    return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <CardTitle className="text-xl">
            Available Flights
          </CardTitle>
          <p className="text-muted-foreground mt-1">
            {searchParams.fromLocation} to {searchParams.toLocation} • {' '}
            {searchParams.departDate && format(new Date(searchParams.departDate), 'MMM d, yyyy')}
          </p>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <span className="mr-2">Sort by:</span>
          <select
            className="p-1 border rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="price">Price</option>
            <option value="duration">Duration</option>
            <option value="departTime">Departure Time</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : flights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg font-semibold">No flights found</p>
            <p className="text-muted-foreground mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedFlights.map((flight) => (
              <Card key={flight.id} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <Plane className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="font-semibold">{flight.airline}</p>
                        <p className="text-sm text-muted-foreground">Flight {flight.flightNumber}</p>
                      </div>
                      
                      <div className="flex items-center mt-2 md:mt-0 md:ml-8">
                        <div>
                          <p className="font-medium">{format(new Date(flight.departureTime), 'h:mm a')}</p>
                          <p className="text-xs text-muted-foreground">{flight.origin}</p>
                        </div>
                        
                        <div className="mx-3 flex flex-col items-center">
                          <div className="relative w-20 md:w-32">
                            <div className="border-t border-dashed border-gray-300 w-full absolute top-1/2 -translate-y-1/2"></div>
                            <ArrowRight className="h-4 w-4 absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          </div>
                          <span className="text-xs text-muted-foreground mt-1">
                            {formatDuration(flight.durationMinutes)}
                          </span>
                        </div>
                        
                        <div>
                          <p className="font-medium">{format(new Date(flight.arrivalTime), 'h:mm a')}</p>
                          <p className="text-xs text-muted-foreground">{flight.destination}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end mt-4 md:mt-0 w-full md:w-auto">
                      <p className="text-xl font-bold">₦{flight.price.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{flight.cabinClass}</p>
                      <Button 
                        className="mt-2 w-full md:w-auto" 
                        onClick={() => onSelectFlight(flight)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={onBack} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Search
        </Button>
      </CardFooter>
    </Card>
  );
};
