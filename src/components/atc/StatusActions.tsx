import React from 'react';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import type { FlightStatus } from './types';

interface StatusActionsProps {
  status: FlightStatus;
  id: string;
  onStatusChange: (id: string, status: FlightStatus) => void;
  remarks?: string;
}

export const StatusActions = ({
  status,
  id,
  onStatusChange,
  remarks
}: StatusActionsProps) => {
  const handleStatusChange = (newStatus: FlightStatus) => {
    onStatusChange(id, newStatus);
  };

  return (
    <div className="flex justify-between items-center mt-1">
      <div className="flex gap-1">
        <Button
          size="sm"
          variant={status === 'pending' ? "default" : "outline"}
          className={cn("h-6 px-2 text-xs",
            status === 'pending' ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-900/30"
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
          variant={status === 'active' ? "default" : "outline"}
          className={cn("h-6 px-2 text-xs",
            status === 'active' ? "bg-green-600 hover:bg-green-700" : "hover:bg-green-900/30"
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
          variant={status === 'cleared' ? "default" : "outline"}
          className={cn("h-6 px-2 text-xs",
            status === 'cleared' ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-900/30"
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
          {remarks && (
            <DropdownMenuItem className="cursor-pointer">View Remarks</DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer">Edit Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
