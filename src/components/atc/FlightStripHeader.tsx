
import React from 'react';
import { Clock, ArrowDown, ArrowUp, GripHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FlightStripHeaderProps {
  callsign: string;
  estimatedTime: string;
  id: string;
  onSectorChange?: (id: string, direction: 'up' | 'down') => void;
}

export const FlightStripHeader = ({
  callsign,
  estimatedTime,
  id,
  onSectorChange
}: FlightStripHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold text-base tracking-wide flex items-center gap-2">
        <GripHorizontal className="h-4 w-4 text-slate-500 hover:text-slate-300" />
        {callsign}
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3 text-[hsl(var(--atc-pending))]" />
        <span className="text-xs">{estimatedTime}</span>
        <div className="flex gap-1 ml-2">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              onSectorChange && onSectorChange(id, 'up');
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
              onSectorChange && onSectorChange(id, 'down');
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
  );
};
