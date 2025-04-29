
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, Clock, Calendar, Printer, Download, ArrowRight } from "lucide-react";
import { format } from 'date-fns';
import type { Flight, BookingDetails } from './types';

interface FlightConfirmationProps {
  flight: Flight | null;
  bookingDetails: BookingDetails | null;
  onNewBooking: () => void;
}

export const FlightConfirmation: React.FC<FlightConfirmationProps> = ({ 
  flight, 
  bookingDetails,
  onNewBooking
}) => {
  if (!flight || !bookingDetails) return <div>Booking information not found</div>;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card>
      <CardHeader className="border-b pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <CheckCircle2 className="text-green-500 mr-2 h-5 w-5" />
            Booking Confirmed!
          </CardTitle>
          <div className="text-right">
            <p className="text-sm font-medium">Booking Reference</p>
            <p className="text-xl font-bold">{bookingDetails.bookingId}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          A confirmation email has been sent to {bookingDetails.contactInfo.email}
        </p>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="bg-muted rounded-md p-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Airline</p>
              <p className="font-medium">{flight.airline}</p>
            </div>
            <div className="space-y-1 mt-2 md:mt-0">
              <p className="text-sm text-muted-foreground">Flight Number</p>
              <p className="font-medium">{flight.flightNumber}</p>
            </div>
            <div className="space-y-1 mt-2 md:mt-0">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{format(new Date(flight.departureTime), 'MMM d, yyyy')}</p>
            </div>
            <div className="space-y-1 mt-2 md:mt-0">
              <p className="text-sm text-muted-foreground">Cabin</p>
              <p className="font-medium">{flight.cabinClass}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-4">Flight Details</h3>
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Departure</p>
              <p className="font-medium text-lg">{format(new Date(flight.departureTime), 'h:mm a')}</p>
              <p className="font-medium">{flight.origin}</p>
              <p className="text-sm text-muted-foreground">{format(new Date(flight.departureTime), 'EEEE, MMMM d, yyyy')}</p>
            </div>

            <div className="my-4 md:my-0 flex flex-row md:flex-col items-center justify-center">
              <div className="relative w-16 md:w-auto md:h-16">
                <div className="hidden md:block border-l border-dashed border-gray-300 h-full absolute left-1/2"></div>
                <div className="md:hidden border-t border-dashed border-gray-300 w-full absolute top-1/2"></div>
              </div>
              <div className="text-center px-3 md:px-0 md:py-3">
                <p className="text-muted-foreground text-sm">{formatDuration(flight.durationMinutes)}</p>
              </div>
              <div className="relative w-16 md:w-auto md:h-16">
                <div className="hidden md:block border-l border-dashed border-gray-300 h-full absolute left-1/2"></div>
                <div className="md:hidden border-t border-dashed border-gray-300 w-full absolute top-1/2"></div>
                <ArrowRight className="hidden md:block h-4 w-4 absolute left-1/2 -translate-x-1/2 bottom-0 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1 text-right md:text-left">
              <p className="text-sm text-muted-foreground">Arrival</p>
              <p className="font-medium text-lg">{format(new Date(flight.arrivalTime), 'h:mm a')}</p>
              <p className="font-medium">{flight.destination}</p>
              <p className="text-sm text-muted-foreground">{format(new Date(flight.arrivalTime), 'EEEE, MMMM d, yyyy')}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-4">Passenger Information</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Passport</TableHead>
                <TableHead>Nationality</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingDetails.passengers.map((passenger, index) => (
                <TableRow key={passenger.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{passenger.firstName} {passenger.lastName}</TableCell>
                  <TableCell>{passenger.passportNumber}</TableCell>
                  <TableCell>{passenger.nationality}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Payment Details</h3>
          <div className="flex justify-between">
            <div>
              <p className="text-sm">Payment Method</p>
              <p>Credit Card ending with {bookingDetails.paymentInfo.cardNumber.slice(-4)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Total Amount</p>
              <p className="font-bold">₦{bookingDetails.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 border-t pt-6">
        <Button variant="outline" className="w-full sm:w-auto flex items-center">
          <Printer className="h-4 w-4 mr-2" />
          Print Itinerary
        </Button>
        <Button variant="outline" className="w-full sm:w-auto flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Download E-Ticket
        </Button>
        <Button onClick={onNewBooking} className="w-full sm:w-auto">
          Book Another Flight
        </Button>
      </CardFooter>
    </Card>
  );
};
