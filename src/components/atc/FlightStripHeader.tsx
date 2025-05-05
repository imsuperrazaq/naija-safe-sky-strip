
import React from 'react';
import { Clock, ArrowDown, ArrowUp, GripHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
    <div className={cn(
      "flex justify-between items-center",
      "px-3 py-1.5 bg-slate-800 rounded-t-sm"
    )}>
      <div className="font-bold text-base tracking-wide flex items-center gap-2">
        <GripHorizontal className="h-4 w-4 text-slate-500 hover:text-slate-300" />
        <span className="text-white">{callsign}</span>
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3 text-amber-400" />
        <span className="text-xs text-amber-200">{estimatedTime}</span>
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
