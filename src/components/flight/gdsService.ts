
import { subDays, addHours, addMinutes, addDays } from 'date-fns';
import type { Flight } from './types';

const airlines = [
  { code: 'NGA', name: 'Nigeria Airways' },
  { code: 'ET', name: 'Ethiopian Airlines' },
  { code: 'KQ', name: 'Kenya Airways' },
  { code: 'EK', name: 'Emirates' },
  { code: 'AF', name: 'Air France' },
  { code: 'BA', name: 'British Airways' },
  { code: 'DL', name: 'Delta Air Lines' },
  { code: 'QR', name: 'Qatar Airways' }
];

const airports: Record<string, string> = {
  'LOS': 'Lagos',
  'ABV': 'Abuja',
  'PHC': 'Port Harcourt',
  'ENU': 'Enugu',
  'ACC': 'Accra',
  'LHR': 'London',
  'JFK': 'New York',
  'DXB': 'Dubai',
  'CDG': 'Paris',
  'NBO': 'Nairobi'
};

// Generate a list of flights based on search parameters
export const mockGDSSearch = async (searchParams: any): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const departDate = new Date(searchParams.departDate);
  const cabinClass = searchParams.cabinClass || 'economy';
  
  // Origin and destination codes
  const origin = getAirportCodeFromCity(searchParams.fromLocation);
  const destination = getAirportCodeFromCity(searchParams.toLocation);
  
  if (!origin || !destination) {
    return [];
  }
  
  // Generate random flights for the route
  return generateFlights(origin, destination, departDate, cabinClass);
};

// Helper function to get airport code from city name
const getAirportCodeFromCity = (cityName: string): string | null => {
  // In a real app, this would check against a database of airports
  // For demo purposes, we'll just use a simple mapping for common Nigerian cities
  const cityToCode: Record<string, string> = {
    'lagos': 'LOS',
    'abuja': 'ABV',
    'port harcourt': 'PHC',
    'enugu': 'ENU',
    'accra': 'ACC',
    'london': 'LHR',
    'new york': 'JFK',
    'dubai': 'DXB',
    'paris': 'CDG',
    'nairobi': 'NBO'
  };
  
  const normalizedCity = cityName.toLowerCase();
  
  for (const [city, code] of Object.entries(cityToCode)) {
    if (normalizedCity.includes(city) || city.includes(normalizedCity)) {
      return code;
    }
  }
  
  // If not found, just return the first 3 letters capitalized as a fallback
  return cityName.substring(0, 3).toUpperCase();
};

// Generate random flights
const generateFlights = (origin: string, destination: string, date: Date, cabinClass: string): Flight[] => {
  const flights: Flight[] = [];
  const numFlights = 5 + Math.floor(Math.random() * 10); // Generate between 5-15 flights
  
  for (let i = 0; i < numFlights; i++) {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const flightNumber = `${airline.code}${100 + Math.floor(Math.random() * 900)}`;
    
    // Generate departure time (between 6am and 10pm)
    const hour = 6 + Math.floor(Math.random() * 16);
    const minute = Math.floor(Math.random() * 60);
    const departureTime = new Date(date);
    departureTime.setHours(hour, minute, 0, 0);
    
    // Flight duration (between 1-10 hours, depending on route)
    const durationMinutes = calculateRouteDuration(origin, destination);
    
    // Calculate arrival time
    const arrivalTime = addMinutes(new Date(departureTime), durationMinutes);
    
    // Price based on class and random factors
    const basePrice = calculateBasePrice(origin, destination);
    const classMultiplier = cabinClassMultiplier(cabinClass);
    const randomFactor = 0.8 + Math.random() * 0.4; // Random factor between 0.8 and 1.2
    const price = Math.round(basePrice * classMultiplier * randomFactor);
    
    flights.push({
      id: `${i + 1}`,
      airline: airline.name,
      flightNumber,
      origin: origin,
      destination: destination,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      durationMinutes,
      price,
      cabinClass: formatCabinClass(cabinClass),
      aircraft: getRandomAircraft(),
      availableSeats: Math.floor(Math.random() * 30) + 5
    });
  }
  
  return flights;
};

// Calculate typical route duration based on origin and destination
const calculateRouteDuration = (origin: string, destination: string): number => {
  const domesticRoutes = ['LOS', 'ABV', 'PHC', 'ENU'];
  const westAfricanRoutes = ['ACC'];
  const eastAfricanRoutes = ['NBO'];
  const middleEasternRoutes = ['DXB'];
  const europeanRoutes = ['LHR', 'CDG'];
  const americanRoutes = ['JFK'];
  
  // Both domestic
  if (domesticRoutes.includes(origin) && domesticRoutes.includes(destination)) {
    return 60 + Math.floor(Math.random() * 60); // 1-2 hours
  }
  
  // West African routes
  if ((domesticRoutes.includes(origin) && westAfricanRoutes.includes(destination)) ||
      (westAfricanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 90 + Math.floor(Math.random() * 60); // 1.5-2.5 hours
  }
  
  // East African routes
  if ((domesticRoutes.includes(origin) && eastAfricanRoutes.includes(destination)) ||
      (eastAfricanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 240 + Math.floor(Math.random() * 60); // 4-5 hours
  }
  
  // Middle Eastern routes
  if ((domesticRoutes.includes(origin) && middleEasternRoutes.includes(destination)) ||
      (middleEasternRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 360 + Math.floor(Math.random() * 120); // 6-8 hours
  }
  
  // European routes
  if ((domesticRoutes.includes(origin) && europeanRoutes.includes(destination)) ||
      (europeanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 360 + Math.floor(Math.random() * 120); // 6-8 hours
  }
  
  // American routes
  if ((domesticRoutes.includes(origin) && americanRoutes.includes(destination)) ||
      (americanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 600 + Math.floor(Math.random() * 180); // 10-13 hours
  }
  
  // Default fallback
  return 180 + Math.floor(Math.random() * 240); // 3-7 hours
};

// Calculate base price based on route
const calculateBasePrice = (origin: string, destination: string): number => {
  const domesticRoutes = ['LOS', 'ABV', 'PHC', 'ENU'];
  const westAfricanRoutes = ['ACC'];
  const eastAfricanRoutes = ['NBO'];
  const middleEasternRoutes = ['DXB'];
  const europeanRoutes = ['LHR', 'CDG'];
  const americanRoutes = ['JFK'];
  
  // Both domestic
  if (domesticRoutes.includes(origin) && domesticRoutes.includes(destination)) {
    return 30000 + Math.floor(Math.random() * 20000); // ₦30,000 - ₦50,000
  }
  
  // West African routes
  if ((domesticRoutes.includes(origin) && westAfricanRoutes.includes(destination)) ||
      (westAfricanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 80000 + Math.floor(Math.random() * 40000); // ₦80,000 - ₦120,000
  }
  
  // East African routes
  if ((domesticRoutes.includes(origin) && eastAfricanRoutes.includes(destination)) ||
      (eastAfricanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 150000 + Math.floor(Math.random() * 50000); // ₦150,000 - ₦200,000
  }
  
  // Middle Eastern routes
  if ((domesticRoutes.includes(origin) && middleEasternRoutes.includes(destination)) ||
      (middleEasternRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 280000 + Math.floor(Math.random() * 120000); // ₦280,000 - ₦400,000
  }
  
  // European routes
  if ((domesticRoutes.includes(origin) && europeanRoutes.includes(destination)) ||
      (europeanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 350000 + Math.floor(Math.random() * 250000); // ₦350,000 - ₦600,000
  }
  
  // American routes
  if ((domesticRoutes.includes(origin) && americanRoutes.includes(destination)) ||
      (americanRoutes.includes(origin) && domesticRoutes.includes(destination))) {
    return 500000 + Math.floor(Math.random() * 300000); // ₦500,000 - ₦800,000
  }
  
  // Default fallback
  return 200000 + Math.floor(Math.random() * 200000); // ₦200,000 - ₦400,000
};

// Price multiplier based on cabin class
const cabinClassMultiplier = (cabinClass: string): number => {
  switch (cabinClass.toLowerCase()) {
    case 'economy':
      return 1.0;
    case 'premium':
      return 1.8;
    case 'business':
      return 2.5;
    case 'first':
      return 4.0;
    default:
      return 1.0;
  }
};

// Format cabin class for display
const formatCabinClass = (cabinClass: string): string => {
  switch (cabinClass.toLowerCase()) {
    case 'economy':
      return 'Economy Class';
    case 'premium':
      return 'Premium Economy';
    case 'business':
      return 'Business Class';
    case 'first':
      return 'First Class';
    default:
      return 'Economy Class';
  }
};

// Get random aircraft type
const getRandomAircraft = (): string => {
  const aircraft = [
    'Boeing 737-800',
    'Airbus A320',
    'Boeing 777-300ER',
    'Airbus A350-900',
    'Boeing 787-9 Dreamliner',
    'Airbus A330-300',
    'Embraer E190'
  ];
  
  return aircraft[Math.floor(Math.random() * aircraft.length)];
};
