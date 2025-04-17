
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { StripBoard } from './StripBoard';
import { ControllerPanel } from './ControllerPanel';
import { FlightData, FlightStatus } from './FlightStrip';
import { toast } from 'sonner';

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
  // Controller state
  const [activeController, setActiveController] = useState({
    id: '1',
    name: controller,
    position: sector,
    license: 'NAMA-ATC-278',
    startTime: '',
    endTime: ''
  });
  
  const [flights, setFlights] = useState<FlightData[]>(initialFlights);
  
  // Count alerts
  const alertCount = flights.filter(flight => flight.status === 'alert').length;
  
  // Filter flights by type
  const arrivalFlights = flights.filter(flight => flight.type === 'arrival');
  const departureFlights = flights.filter(flight => flight.type === 'departure');
  const overflightFlights = flights.filter(flight => flight.type === 'overflight');
  const pendingFlights = flights.filter(flight => flight.status === 'pending' && flight.type !== 'overflight');
  
  const handleStatusChange = (id: string, status: FlightStatus) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-NG', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setFlights(flights.map(flight => 
      flight.id === id ? { 
        ...flight, 
        status,
        handlingController: activeController.name,
        lastUpdated: timeString
      } : flight
    ));
    
    if (status === 'alert') {
      toast.error(`Alert set for ${flights.find(f => f.id === id)?.callsign}`);
    }
  };
  
  const handleSectorChange = (id: string, direction: 'up' | 'down') => {
    // In a real application, this would move the flight between sectors
    toast.info(`Coordinating flight ${flights.find(f => f.id === id)?.callsign} ${direction === 'up' ? 'to next sector' : 'to previous sector'}`);
  };
  
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    // Dropped outside of a droppable area
    if (!destination) return;
    
    // No change in position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;
    
    // Get the flight that was moved
    const movedFlightId = result.draggableId;
    const movedFlight = flights.find(flight => flight.id === movedFlightId);
    
    if (!movedFlight) return;
    
    // Determine new flight type based on destination droppableId
    let newType = movedFlight.type;
    let newStatus = movedFlight.status;
    
    switch (destination.droppableId) {
      case 'arrivals':
        newType = 'arrival';
        break;
      case 'departures':
        newType = 'departure';
        break;
      case 'overflights':
        newType = 'overflight';
        break;
      case 'pending':
        newStatus = 'pending';
        break;
    }
    
    // Update flight data
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-NG', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setFlights(flights.map(flight => 
      flight.id === movedFlightId ? { 
        ...flight, 
        type: newType, 
        status: newStatus,
        handlingController: activeController.name,
        lastUpdated: timeString
      } : flight
    ));
    
    toast.success(`Flight ${movedFlight.callsign} moved to ${destination.droppableId}`);
  };
  
  return (
    <div className="flex flex-col h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Header controller={activeController.name} sector={activeController.position} alerts={alertCount} />
      <Toolbar />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <ResizablePanelGroup direction="horizontal" className="flex-1 bg-slate-950">
          <ResizablePanel defaultSize={80} minSize={60}>
            <div className="grid grid-cols-3 gap-0.5 h-full">
              <div className="bg-slate-900 flex flex-col">
                <StripBoard
                  title="Arrivals"
                  flights={arrivalFlights}
                  onStatusChange={handleStatusChange}
                  onSectorChange={handleSectorChange}
                  variant="arrival"
                  droppableId="arrivals"
                />
              </div>
              
              <div className="bg-slate-900 flex flex-col">
                <StripBoard
                  title="Departures"
                  flights={departureFlights}
                  onStatusChange={handleStatusChange}
                  onSectorChange={handleSectorChange}
                  variant="departure"
                  droppableId="departures"
                />
              </div>
              
              <div className="bg-slate-900 flex flex-col">
                <StripBoard
                  title="Overflights"
                  flights={overflightFlights}
                  onStatusChange={handleStatusChange}
                  onSectorChange={handleSectorChange}
                  variant="overflight"
                  droppableId="overflights"
                />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full flex flex-col gap-0.5 bg-slate-950 p-0.5">
              <div className="flex-1 bg-slate-900 overflow-auto">
                <StripBoard
                  title="Pending Coordination"
                  flights={pendingFlights}
                  onStatusChange={handleStatusChange}
                  onSectorChange={handleSectorChange}
                  variant="pending"
                  droppableId="pending"
                />
              </div>
              
              <div className="bg-slate-900 p-2">
                <ControllerPanel 
                  activeController={activeController} 
                  onControllerChange={setActiveController} 
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </DragDropContext>
      
      <footer className="bg-slate-900 text-slate-400 text-xs py-1 px-3 border-t border-slate-800 flex justify-between">
        <span>Nigeria ATC Electronic Smart Strip System v1.0</span>
        <span>© 2025 Nigerian Airspace Management Agency</span>
      </footer>
    </div>
  );
};
