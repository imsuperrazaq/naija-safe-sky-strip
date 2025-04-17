
import React, { useState } from 'react';
import { Clock, ArrowDown, ArrowUp, Plane, MoreVertical, GripHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

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
    'pending': 'border-l-amber-500',
    'active': 'border-l-green-500',
    'cleared': 'border-l-blue-500',
    'alert': 'border-l-red-500 bg-red-950/30'
  };

  const typeClasses = {
    'arrival': 'border-t-blue-500',
    'departure': 'border-t-purple-500',
    'overflight': 'border-t-teal-500'
  };

  const handleStatusChange = (status: FlightStatus) => {
    if (onStatusChange) {
      onStatusChange(flight.id, status);
    }
  };

  return (
    <div
      className={cn(
        "bg-[hsl(var(--atc-strip-bg))] border border-[hsl(var(--atc-strip-border))] border-l-4 border-t-2",
        "rounded-sm p-2 mb-2 cursor-pointer select-none transition-all hover:bg-slate-800/50",
        "flex flex-col gap-1 text-sm font-mono",
        isSelected && "ring-2 ring-blue-500",
        isDragging && "ring-2 ring-amber-500/50 shadow-lg",
        statusClasses[flight.status],
        typeClasses[flight.type]
      )}
      onClick={() => setIsSelected(!isSelected)}
    >
      {/* Header row */}
      <div className="flex justify-between items-center">
        <div className="font-bold text-base tracking-wide flex items-center gap-2">
          <GripHorizontal className="h-4 w-4 text-slate-500 hover:text-slate-300" />
          {flight.callsign}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-[hsl(var(--atc-pending))]" />
          <span className="text-xs">{flight.estimatedTime}</span>
          <div className="flex gap-1 ml-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onSectorChange && onSectorChange(flight.id, 'up');
              }}
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 p-0 hover:bg-slate-700"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                onSectorChange && onSectorChange(flight.id, 'down');
              }}
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 p-0 hover:bg-slate-700"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Aircraft info */}
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Plane className="h-3 w-3 rotate-45" />
          <span>{flight.aircraft}</span>
        </div>
        {flight.squawk && (
          <div className="text-xs bg-amber-950/30 px-1 rounded">
            {flight.squawk}
          </div>
        )}
      </div>

      {/* Route info */}
      <div className="flex justify-between text-xs bg-slate-800/40 p-1 rounded">
        <div className="font-bold">{flight.route.departure}</div>
        <div className="text-slate-400">→</div>
        <div className="font-bold">{flight.route.destination}</div>
      </div>

      {/* Flight levels */}
      <div className="flex justify-between">
        <div className="flex gap-2 text-xs">
          <div>
            <span className="text-slate-400">CFL:</span>
            <span className="ml-1 text-white font-bold">{flight.level.cleared}</span>
          </div>
          <div>
            <span className="text-slate-400">AFL:</span>
            <span className="ml-1">{flight.level.current}</span>
          </div>
          {flight.level.requested && (
            <div>
              <span className="text-slate-400">RFL:</span>
              <span className="ml-1 text-amber-400">{flight.level.requested}</span>
            </div>
          )}
        </div>
        <div>
          <span className="text-xs">{flight.speed}</span>
        </div>
      </div>

      {/* Controller info - NEW */}
      {flight.handlingController && (
        <div className="flex justify-between text-xs mt-1">
          <div className="text-slate-400">Controller:</div>
          <div className="font-medium text-green-400">{flight.handlingController}</div>
          {flight.lastUpdated && (
            <div className="text-slate-500">{flight.lastUpdated}</div>
          )}
        </div>
      )}

      {/* Status Actions */}
      <div className="flex justify-between items-center mt-1">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={flight.status === 'pending' ? "default" : "outline"}
            className={cn("h-6 px-2 text-xs",
              flight.status === 'pending' ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-900/30"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('pending');
            }}
          >
            PEND
          </Button>
          <Button
            size="sm"
            variant={flight.status === 'active' ? "default" : "outline"}
            className={cn("h-6 px-2 text-xs",
              flight.status === 'active' ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-900/30"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('active');
            }}
          >
            ACT
          </Button>
          <Button
            size="sm"
            variant={flight.status === 'cleared' ? "default" : "outline"}
            className={cn("h-6 px-2 text-xs",
              flight.status === 'cleared' ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-900/30"
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange('cleared');
            }}
          >
            CLR
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              onClick={(e) => e.stopPropagation()}
              size="icon" 
              variant="ghost" 
              className="h-6 w-6 p-0 hover:bg-slate-700"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 text-white border-slate-700">
            <DropdownMenuItem 
              className="text-red-400 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange('alert');
              }}
            >
              Mark as Alert
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Assign Controller</DropdownMenuItem>
            {flight.remarks && (
              <DropdownMenuItem className="cursor-pointer">View Remarks</DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Conditional remarks display */}
      {flight.remarks && isSelected && (
        <div className="mt-2 text-xs bg-slate-800/50 p-1 rounded border-l-2 border-l-amber-500">
          <span className="text-slate-400">Remarks:</span> {flight.remarks}
        </div>
      )}
    </div>
  );
};
