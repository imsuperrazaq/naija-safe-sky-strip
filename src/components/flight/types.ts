
export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  price: number;
  cabinClass: string;
  aircraft: string;
  availableSeats: number;
}

export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface BookingDetails {
  bookingId: string;
  contactInfo: ContactInfo;
  passengers: Passenger[];
  paymentInfo: PaymentInfo;
  bookingDate: Date;
  totalAmount: number;
}
