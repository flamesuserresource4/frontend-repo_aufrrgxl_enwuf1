import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function LiveRouteCard({ selected }) {
  return (
    <div className="bg-[#0b0f17] border border-white/10 rounded-xl p-5 text-white/90">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Route & ETA</h2>
        <Clock className="w-4 h-4 text-white/50" />
      </div>

      {!selected ? (
        <p className="text-white/60">Choose a destination to generate the optimal route.</p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <MapPin className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <p className="text-white/70 text-sm">Destination</p>
              <h3 className="font-semibold text-white">{selected.name}</h3>
              <div className="mt-1 text-sm text-white/60 flex items-center gap-2">
                <span>ETA</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white">{selected.etaMin} min</span>
              </div>
            </div>
          </div>

          <div className="h-36 w-full rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 flex items-center justify-center text-white/60">
            Map preview placeholder
          </div>

          <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-[#05060a] font-medium">
            Start navigation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
