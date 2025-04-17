import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FlightStrip } from './FlightStrip';
import { cn } from '@/lib/utils';
import type { FlightData, FlightStatus } from './types';

interface StripBoardProps {
  title: string;
  flights: FlightData[];
  onStatusChange?: (id: string, status: FlightStatus) => void;
  onSectorChange?: (id: string, direction: 'up' | 'down') => void;
  variant?: 'arrival' | 'departure' | 'overflight' | 'pending';
  droppableId: string;
}

export const StripBoard = ({
  title,
  flights,
  onStatusChange,
  onSectorChange,
  variant = 'arrival',
  droppableId
}: StripBoardProps) => {
  const variantStyles = {
    arrival: "border-t-blue-500",
    departure: "border-t-purple-500",
    overflight: "border-t-teal-500",
    pending: "border-t-amber-500"
  };

  return (
    <div className="flex flex-col h-full">
      <div className={cn(
        "bg-slate-800 text-white py-1 px-3 font-medium tracking-wide border-t-4",
        "flex justify-between items-center",
        variantStyles[variant]
      )}>
        <h2>{title}</h2>
        <span className="text-xs font-mono bg-slate-700 px-2 py-0.5 rounded">
          {flights.length} {flights.length === 1 ? 'flight' : 'flights'}
        </span>
      </div>
      
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 overflow-y-auto p-2 bg-slate-900/50",
              snapshot.isDraggingOver && "bg-slate-800/50 ring-1 ring-inset ring-blue-500/30"
            )}
          >
            {flights.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex items-center justify-center h-full text-slate-500 italic">
                No active flights
              </div>
            )}
            {flights.map((flight, index) => (
              <Draggable key={flight.id} draggableId={flight.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      snapshot.isDragging && "opacity-75 shadow-lg"
                    )}
                  >
                    <FlightStrip
                      flight={flight}
                      onStatusChange={onStatusChange}
                      onSectorChange={onSectorChange}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
