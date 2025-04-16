
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  RefreshCcw,
  SlidersHorizontal,
  Radio,
  Volume2,
  Printer,
  Headphones,
  Pause,
  PlayCircle
} from 'lucide-react';

export const Toolbar = () => {
  const [isPaused, setIsPaused] = React.useState(false);

  return (
    <div className="bg-slate-900 border-b border-slate-700 px-3 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="bg-slate-800 hover:bg-slate-700">
          <Plus className="h-4 w-4 mr-1" />
          New Strip
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RefreshCcw className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center h-8 bg-slate-800 rounded-md px-2 focus-within:ring-1 focus-within:ring-blue-500">
          <Search className="h-4 w-4 text-slate-400" />
          <Input 
            type="text"
            placeholder="Search callsign..."
            className="h-full border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-green-900/30 px-2 py-1 rounded">
          <Radio className="h-3 w-3 text-green-400 mr-1 animate-pulse" />
          <span className="text-xs text-green-400">CONNECTED</span>
        </div>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Volume2 className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Headphones className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Printer className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? (
            <PlayCircle className="h-4 w-4 text-amber-500" />
          ) : (
            <Pause className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
