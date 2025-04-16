
import React, { useState } from 'react';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { StripBoard } from './StripBoard';
import { FlightData, FlightStatus } from './FlightStrip';

interface ATCDashboardProps {
  initialFlights: FlightData[];
  controller: string;
  sector: string;
}

export const ATCDashboard = ({
  initialFlights,
  controller,
  sector
}: ATCDashboardProps) => {
  const [flights, setFlights] = useState<FlightData[]>(initialFlights);
  
  // Count alerts
  const alertCount = flights.filter(flight => flight.status === 'alert').length;
  
  // Filter flights by type
  const arrivalFlights = flights.filter(flight => flight.type === 'arrival');
  const departureFlights = flights.filter(flight => flight.type === 'departure');
  const overflightFlights = flights.filter(flight => flight.type === 'overflight');
  
  const handleStatusChange = (id: string, status: FlightStatus) => {
    setFlights(flights.map(flight => 
      flight.id === id ? { ...flight, status } : flight
    ));
  };
  
  const handleSectorChange = (id: string, direction: 'up' | 'down') => {
    // In a real application, this would move the flight between sectors
    console.log(`Move flight ${id} ${direction}`);
  };

  return (
    <div className="flex flex-col h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Header controller={controller} sector={sector} alerts={alertCount} />
      <Toolbar />
      
      <div className="flex-1 grid grid-cols-3 gap-0.5 p-0.5 bg-slate-950">
        <div className="bg-slate-900 flex flex-col">
          <StripBoard
            title="Arrivals"
            flights={arrivalFlights}
            onStatusChange={handleStatusChange}
            onSectorChange={handleSectorChange}
            variant="arrival"
          />
        </div>
        
        <div className="bg-slate-900 flex flex-col">
          <StripBoard
            title="Departures"
            flights={departureFlights}
            onStatusChange={handleStatusChange}
            onSectorChange={handleSectorChange}
            variant="departure"
          />
        </div>
        
        <div className="bg-slate-900 flex flex-col">
          <StripBoard
            title="Overflights"
            flights={overflightFlights}
            onStatusChange={handleStatusChange}
            onSectorChange={handleSectorChange}
            variant="overflight"
          />
        </div>
      </div>
      
      <footer className="bg-slate-900 text-slate-400 text-xs py-1 px-3 border-t border-slate-800 flex justify-between">
        <span>Nigeria ATC Electronic Smart Strip System v1.0</span>
        <span>© 2025 Nigerian Airspace Management Agency</span>
      </footer>
    </div>
  );
};
