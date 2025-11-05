import React from 'react';
import { Hospital, Clock, Activity } from 'lucide-react';

function Badge({ children, color = 'cyan' }) {
  const colors = {
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/20',
    green: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    red: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    slate: 'bg-white/10 text-white/70 border-white/10',
  };
  return (
    <span className={`px-2 py-1 rounded-md text-xs border ${colors[color]} whitespace-nowrap`}>{children}</span>
  );
}

export default function HospitalRankings({ items = [], onSelect }) {
  return (
    <div className="bg-[#0b0f17] border border-white/10 rounded-xl p-5 text-white/90">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Ranked destinations</h2>
        <Activity className="w-4 h-4 text-white/50" />
      </div>

      {items.length === 0 ? (
        <p className="text-white/60">Run a search to see the best hospitals for this patient.</p>
      ) : (
        <ul className="space-y-3">
          {items.map((h) => (
            <li key={h.id} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-sm">#{h.rank}</span>
                    <h3 className="font-semibold text-white truncate flex items-center gap-2">
                      <Hospital className="w-4 h-4" /> {h.name}
                    </h3>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge color={h.pci ? 'green' : 'slate'}>{h.pci ? 'PCI-capable' : 'Non-PCI'}</Badge>
                    <Badge color={h.level === 1 ? 'amber' : 'slate'}>Level {h.level}</Badge>
                    <Badge color={h.trauma ? 'amber' : 'slate'}>{h.trauma ? 'Trauma center' : 'General'}</Badge>
                    <Badge color={h.diversion ? 'red' : 'green'}>{h.diversion ? 'On diversion' : 'Open'}</Badge>
                    <Badge color={'cyan'}>Capacity {Math.round(h.capacity * 100)}%</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-white">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span className="font-semibold">{h.etaMin} min</span>
                    </div>
                    <div className="text-xs text-white/60">Suitability score {h.score}</div>
                  </div>
                  <button
                    onClick={() => onSelect && onSelect(h)}
                    className="px-3 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-[#05060a] font-medium"
                  >
                    Select
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
