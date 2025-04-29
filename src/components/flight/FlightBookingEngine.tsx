
import React, { useState } from 'react';
import { FlightSearch } from './FlightSearch';
import { FlightResults } from './FlightResults';
import { FlightBookingForm } from './FlightBookingForm';
import { FlightConfirmation } from './FlightConfirmation';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Flight, BookingDetails } from './types';

export const FlightBookingEngine = () => {
  const [currentStep, setCurrentStep] = useState<'search' | 'results' | 'booking' | 'confirmation'>('search');
  const [searchParams, setSearchParams] = useState<any>(null);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const { toast } = useToast();

  const handleSearch = (params: any) => {
    setSearchParams(params);
    setCurrentStep('results');
    console.log('Search parameters:', params);
    toast({
      title: "Search Complete",
      description: "Found available flights matching your criteria",
    });
  };

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep('booking');
    toast({
      title: "Flight Selected",
      description: `Selected flight ${flight.flightNumber} for booking`,
    });
  };

  const handleBookingSubmit = (details: BookingDetails) => {
    setBookingDetails(details);
    setCurrentStep('confirmation');
    toast({
      title: "Booking Processed",
      description: "Your flight booking has been processed successfully",
    });
  };

  const resetBooking = () => {
    setCurrentStep('search');
    setSelectedFlight(null);
    setBookingDetails(null);
    toast({
      title: "New Booking",
      description: "Start a new flight booking",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Tabs value={currentStep} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger 
            value="search" 
            disabled={currentStep !== 'search'} 
            className={currentStep === 'search' ? "font-bold" : ""}
          >
            1. Search
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            disabled={currentStep !== 'results'} 
            className={currentStep === 'results' ? "font-bold" : ""}
          >
            2. Select Flight
          </TabsTrigger>
          <TabsTrigger 
            value="booking" 
            disabled={currentStep !== 'booking'} 
            className={currentStep === 'booking' ? "font-bold" : ""}
          >
            3. Passenger Details
          </TabsTrigger>
          <TabsTrigger 
            value="confirmation" 
            disabled={currentStep !== 'confirmation'} 
            className={currentStep === 'confirmation' ? "font-bold" : ""}
          >
            4. Confirmation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <FlightSearch onSearch={handleSearch} />
        </TabsContent>
        
        <TabsContent value="results" className="space-y-4">
          <FlightResults 
            searchParams={searchParams} 
            onSelectFlight={handleSelectFlight} 
            onBack={() => setCurrentStep('search')}
          />
        </TabsContent>
        
        <TabsContent value="booking" className="space-y-4">
          <FlightBookingForm 
            flight={selectedFlight} 
            onSubmit={handleBookingSubmit} 
            onBack={() => setCurrentStep('results')}
          />
        </TabsContent>
        
        <TabsContent value="confirmation" className="space-y-4">
          <FlightConfirmation 
            flight={selectedFlight} 
            bookingDetails={bookingDetails} 
            onNewBooking={resetBooking} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
