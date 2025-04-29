
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { format } from 'date-fns';
import type { Flight, BookingDetails, Passenger } from './types';

interface FlightBookingFormProps {
  flight: Flight | null;
  onSubmit: (details: BookingDetails) => void;
  onBack: () => void;
}

export const FlightBookingForm: React.FC<FlightBookingFormProps> = ({ 
  flight, 
  onSubmit,
  onBack
}) => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: ''
  });

  const [passengers, setPassengers] = useState<Passenger[]>([
    { id: 1, firstName: '', lastName: '', dateOfBirth: '', passportNumber: '', nationality: '' }
  ]);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const addPassenger = () => {
    const newId = passengers.length > 0 
      ? Math.max(...passengers.map(p => p.id)) + 1 
      : 1;
      
    setPassengers([
      ...passengers, 
      { id: newId, firstName: '', lastName: '', dateOfBirth: '', passportNumber: '', nationality: '' }
    ]);
  };

  const removePassenger = (id: number) => {
    if (passengers.length <= 1) return;
    setPassengers(passengers.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingDetails: BookingDetails = {
      bookingId: `BK${Math.floor(Math.random() * 1000000)}`,
      contactInfo,
      passengers,
      paymentInfo: { ...paymentInfo, cardNumber: maskCardNumber(paymentInfo.cardNumber) },
      bookingDate: new Date(),
      totalAmount: flight ? flight.price * passengers.length : 0
    };
    
    onSubmit(bookingDetails);
  };

  const maskCardNumber = (number: string) => {
    return number.replace(/\d(?=\d{4})/g, "*");
  };

  if (!flight) return <div>No flight selected</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Passenger Information</CardTitle>
        <div className="mt-2">
          <p className="text-sm font-medium">{flight.airline} - Flight {flight.flightNumber}</p>
          <p className="text-sm text-muted-foreground">
            {flight.origin} to {flight.destination} • {' '}
            {format(new Date(flight.departureTime), 'MMM d, yyyy')}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email"
                  value={contactInfo.email} 
                  onChange={handleContactChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel"
                  value={contactInfo.phone} 
                  onChange={handleContactChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Passenger Details</h3>
              <Button 
                type="button" 
                variant="outline" 
                onClick={addPassenger}
                size="sm"
              >
                Add Passenger
              </Button>
            </div>

            {passengers.map((passenger, index) => (
              <div key={passenger.id} className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Passenger {index + 1}</h4>
                  {passengers.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removePassenger(passenger.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`firstName-${index}`}>First Name</Label>
                    <Input 
                      id={`firstName-${index}`}
                      value={passenger.firstName}
                      onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                    <Input 
                      id={`lastName-${index}`}
                      value={passenger.lastName}
                      onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth</Label>
                    <Input 
                      id={`dateOfBirth-${index}`}
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`nationality-${index}`}>Nationality</Label>
                    <Input 
                      id={`nationality-${index}`}
                      value={passenger.nationality}
                      onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`passportNumber-${index}`}>Passport Number</Label>
                    <Input 
                      id={`passportNumber-${index}`}
                      value={passenger.passportNumber}
                      onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input 
                  id="cardNumber" 
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardHolder">Card Holder Name</Label>
                <Input 
                  id="cardHolder" 
                  name="cardHolder"
                  value={paymentInfo.cardHolder}
                  onChange={handlePaymentChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input 
                    id="expiryDate" 
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv"
                    type="password"
                    maxLength={4}
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Flight fare ({passengers.length} passenger{passengers.length > 1 ? 's' : ''})</span>
              <span>₦{(flight.price * passengers.length).toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Taxes & Fees</span>
              <span>Included</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{(flight.price * passengers.length).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <Button type="button" variant="outline" onClick={onBack} className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Flight Selection
            </Button>
            <Button type="submit">Complete Booking</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
