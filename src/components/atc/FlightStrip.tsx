
import React, { useState } from 'react';
import { Plane, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FlightStripHeader } from './FlightStripHeader';
import { FlightLevels } from './FlightLevels';
import { StatusActions } from './StatusActions';
import type { FlightData, FlightStatus, FlightType } from './types';

interface FlightStripProps {
  flight: FlightData;
  onStatusChange?: (id: string, status: FlightStatus) => void;
  onSectorChange?: (id: string, direction: 'up' | 'down') => void;
  isDragging?: boolean;
}

export const FlightStrip = ({
  flight,
  onStatusChange,
  onSectorChange,
  isDragging = false
}: FlightStripProps) => {
  const [isSelected, setIsSelected] = useState(false);
  
  const statusClasses = {
    'pending': 'border-l-amber-500 bg-amber-950/10',
    'active': 'border-l-green-500 bg-green-950/10',
    'cleared': 'border-l-blue-500 bg-blue-950/10',
    'alert': 'border-l-red-500 bg-red-950/20'
  };

  const typeClasses = {
    'arrival': 'border-t-blue-500',
    'departure': 'border-t-purple-500',
    'overflight': 'border-t-teal-500'
  };

  const handleStatusChange = (id: string, status: FlightStatus) => {
    if (onStatusChange) {
      onStatusChange(id, status);
    }
  };

  return (
    <div
      className={cn(
        "bg-slate-900 border border-slate-700 border-l-4 border-t-2 rounded-md",
        "mb-2 cursor-pointer select-none transition-all",
        "flex flex-col gap-1 text-sm font-mono",
        isSelected && "ring-1 ring-blue-500/50",
        isDragging && "ring-2 ring-amber-500/30 shadow-lg",
        statusClasses[flight.status],
        typeClasses[flight.type]
      )}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Header row */}
      <FlightStripHeader 
        callsign={flight.callsign}
        estimatedTime={flight.estimatedTime}
        id={flight.id}
        onSectorChange={onSectorChange}
      />

      <div className="px-3 py-1">
        {/* Aircraft info */}
        <div className="flex justify-between items-center mb-1.5">
          <div className="flex items-center gap-1">
            <Plane className="h-3 w-3 rotate-45 text-slate-400" />
            <span className="text-white">{flight.aircraft}</span>
          </div>
          {flight.squawk && (
            <div className="text-xs bg-amber-950/30 px-1.5 py-0.5 rounded text-amber-300 font-bold">
              {flight.squawk}
            </div>
          )}
        </div>

        {/* Route info */}
        <div className="flex justify-between text-xs bg-slate-800/60 p-1.5 rounded mb-1.5">
          <div className="font-bold text-white">{flight.route.departure}</div>
          <div className="text-slate-400">→</div>
          <div className="font-bold text-white">{flight.route.destination}</div>
        </div>

        {/* Flight levels */}
        <FlightLevels 
          current={flight.level.current}
          cleared={flight.level.cleared}
          requested={flight.level.requested}
          speed={flight.speed}
        />

        {/* Controller info */}
        {flight.handlingController && (
          <div className="flex justify-between text-xs mt-1 text-slate-300">
            <div className="text-slate-400">Controller:</div>
            <div className="font-medium text-green-400">{flight.handlingController}</div>
            {flight.lastUpdated && (
              <div className="text-slate-500">{flight.lastUpdated}</div>
            )}
          </div>
        )}

        {/* Status Actions */}
        <StatusActions 
          status={flight.status}
          id={flight.id}
          onStatusChange={handleStatusChange}
          remarks={flight.remarks}
        />
        
        {/* Conditional remarks display */}
        {flight.remarks && isSelected && (
          <div className="mt-2 text-xs bg-slate-800/70 p-1.5 rounded border-l-2 border-l-amber-500">
            <span className="text-slate-400">Remarks:</span> <span className="text-amber-200">{flight.remarks}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Export types for use in other components
// Use 'export type' syntax for TypeScript isolatedModules mode
export type { FlightData, FlightStatus, FlightType } from './types';
