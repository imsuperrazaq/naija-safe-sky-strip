
import React from 'react';

interface FlightLevelsProps {
  current: string;
  cleared: string;
  requested?: string;
  speed: string;
}

export const FlightLevels = ({
  current,
  cleared, 
  requested,
  speed
}: FlightLevelsProps) => {
  return (
    <div className="flex justify-between mb-1.5">
      <div className="flex gap-2 text-xs">
        <div>
          <span className="text-slate-400">CFL:</span>
          <span className="ml-1 text-white font-bold">{cleared}</span>
        </div>
        <div>
          <span className="text-slate-400">AFL:</span>
          <span className="ml-1 text-slate-300">{current}</span>
        </div>
        {requested && (
          <div>
            <span className="text-slate-400">RFL:</span>
            <span className="ml-1 text-amber-400">{requested}</span>
          </div>
        )}
      </div>
      <div>
        <span className="text-xs text-slate-300">{speed}</span>
      </div>
    </div>
  );
};
