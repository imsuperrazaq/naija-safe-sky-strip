
export type FlightStatus = 'pending' | 'active' | 'cleared' | 'alert';
export type FlightType = 'arrival' | 'departure' | 'overflight';

export interface FlightData {
  id: string;
  callsign: string;
  aircraft: string;
  route: {
    departure: string;
    destination: string;
  };
  level: {
    current: string;
    cleared: string;
    requested?: string;
  };
  estimatedTime: string; // HH:MM format
  speed: string;
  status: FlightStatus;
  type: FlightType;
  squawk?: string;
  remarks?: string;
  handlingController?: string;
  lastUpdated?: string;
}
