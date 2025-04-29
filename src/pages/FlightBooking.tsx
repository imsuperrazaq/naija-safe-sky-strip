
import React from 'react';
import { FlightBookingEngine } from '@/components/flight/FlightBookingEngine';

const FlightBooking = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Flight Booking System</h1>
      <FlightBookingEngine />
    </div>
  );
};

export default FlightBooking;
