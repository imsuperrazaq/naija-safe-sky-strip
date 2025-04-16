
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  Clock, 
  Settings, 
  UserCircle,
  Flag,
  AlertTriangle
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  controller: string;
  sector: string;
  alerts?: number;
}

export const Header = ({
  controller,
  sector,
  alerts = 0
}: HeaderProps) => {
  const [currentTime, setCurrentTime] = React.useState<string>(
    new Date().toLocaleTimeString('en-NG', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-NG', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-slate-900 text-white px-4 py-2 border-b border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-wide">
            Nigeria ATC Electronic Strip Board
          </h1>
          <div className="text-sm text-slate-400">
            Sector: <span className="text-blue-400 font-medium">{sector}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-800 px-3 py-1 rounded">
          <Clock className="h-4 w-4 mr-2 text-blue-400" />
          <span className="font-mono text-lg">{currentTime}</span>
        </div>
        
        {alerts > 0 && (
          <Button variant="destructive" size="sm" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            <span>{alerts} Alert{alerts > 1 ? 's' : ''}</span>
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-white">
            <DropdownMenuItem className="cursor-pointer">New handoff from ACC</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Weather alert issued</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">System update completed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Flag className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-white">
            <DropdownMenuItem className="cursor-pointer">Lagos Approach</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Kano Control</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Abuja Tower</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Port Harcourt Approach</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <UserCircle className="h-5 w-5" />
              <span>{controller}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-white">
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Handover</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="text-red-400 cursor-pointer">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
