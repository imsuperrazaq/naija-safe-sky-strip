
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { UserCircle, Save, Clock, Users, Clipboard, RotateCcw } from 'lucide-react';

interface Controller {
  id: string;
  name: string;
  position: string;
  license: string;
  startTime: string;
  endTime: string;
}

interface ControllerPanelProps {
  activeController: Controller;
  onControllerChange: (controller: Controller) => void;
}

export const ControllerPanel = ({ activeController, onControllerChange }: ControllerPanelProps) => {
  const [editMode, setEditMode] = useState(false);
  const [controller, setController] = useState<Controller>(activeController);
  
  const handleSave = () => {
    if (!controller.name || !controller.position) {
      toast.error("Controller name and position are required");
      return;
    }
    
    onControllerChange(controller);
    setEditMode(false);
    toast.success("Controller details updated");
  };
  
  const handleStartShift = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-NG', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setController({
      ...controller,
      startTime: timeString,
      endTime: ""
    });
    
    onControllerChange({
      ...controller,
      startTime: timeString,
      endTime: ""
    });
    
    toast.success("Shift started");
  };
  
  const handleEndShift = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-NG', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    setController({
      ...controller,
      endTime: timeString
    });
    
    onControllerChange({
      ...controller,
      endTime: timeString
    });
    
    toast.success("Shift ended");
  };
  
  return (
    <div className="bg-slate-900 p-3 border border-slate-700 rounded-md">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-medium flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-blue-400" />
          Controller Details
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit"}
        </Button>
      </div>
      
      {editMode ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Name</label>
              <Input 
                value={controller.name}
                onChange={(e) => setController({...controller, name: e.target.value})}
                className="h-8 bg-slate-800 border-slate-700"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Position</label>
              <Input 
                value={controller.position}
                onChange={(e) => setController({...controller, position: e.target.value})}
                className="h-8 bg-slate-800 border-slate-700"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs text-slate-400 block mb-1">License Number</label>
            <Input 
              value={controller.license}
              onChange={(e) => setController({...controller, license: e.target.value})}
              className="h-8 bg-slate-800 border-slate-700"
            />
          </div>
          
          <Button 
            onClick={handleSave} 
            className="w-full"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Details
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-sm font-medium">{controller.name}</span>
            </div>
            <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded">
              {controller.position}
            </div>
          </div>
          
          {controller.license && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clipboard className="h-3 w-3" />
              <span>License: {controller.license}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-800">
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="h-3 w-3" />
              {controller.startTime ? (
                <span>Started: {controller.startTime}</span>
              ) : (
                <span>Not on duty</span>
              )}
            </div>
            
            {controller.startTime && !controller.endTime && (
              <Button 
                variant="destructive" 
                size="sm" 
                className="h-6 text-xs"
                onClick={handleEndShift}
              >
                End Shift
              </Button>
            )}
            
            {!controller.startTime && (
              <Button 
                variant="default" 
                size="sm" 
                className="h-6 text-xs bg-green-600 hover:bg-green-700"
                onClick={handleStartShift}
              >
                Start Shift
              </Button>
            )}
            
            {controller.startTime && controller.endTime && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 text-xs"
                onClick={() => {
                  setController({...controller, startTime: "", endTime: ""});
                  onControllerChange({...controller, startTime: "", endTime: ""});
                }}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
