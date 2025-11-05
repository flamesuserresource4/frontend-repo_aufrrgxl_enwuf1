import React, { useState } from 'react';
import { MapPin, Activity, Hospital, Clock, ArrowRight } from 'lucide-react';

const conditions = [
  { value: 'stemi', label: 'STEMI (PCI center required)' },
  { value: 'stroke', label: 'Stroke' },
  { value: 'trauma', label: 'Trauma (Level I preferred)' },
  { value: 'sepsis', label: 'Sepsis' },
];

export default function ConditionForm({ onRank }) {
  const [condition, setCondition] = useState('stemi');
  const [location, setLocation] = useState('Current GPS');
  const [needsPCI, setNeedsPCI] = useState(true);
  const [needsLevel1, setNeedsLevel1] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const ranked = mockRankHospitals({ condition, needsPCI, needsLevel1 });
    onRank(ranked);
  };

  return (
    <form onSubmit={submit} className="bg-[#0b0f17] border border-white/10 rounded-xl p-5 text-white/90">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Select condition & preferences</h2>
        <Clock className="w-4 h-4 text-white/50" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm text-white/70">Patient condition</span>
          <div className="mt-2 relative">
            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            >
              {conditions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </label>

        <label className="block">
          <span className="text-sm text-white/70">Pickup location</span>
          <div className="mt-2 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Share GPS or address"
              className="w-full pl-10 pr-3 py-2 rounded-md bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
            />
          </div>
        </label>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <label className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
          <input type="checkbox" checked={needsPCI} onChange={(e) => setNeedsPCI(e.target.checked)} />
          <span className="flex items-center gap-2"><Hospital className="w-4 h-4" /> PCI-capable required</span>
        </label>
        <label className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
          <input type="checkbox" checked={needsLevel1} onChange={(e) => setNeedsLevel1(e.target.checked)} />
          <span>Level I trauma preferred</span>
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-[#05060a] font-medium">
          Rank hospitals
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

function mockRankHospitals({ condition, needsPCI, needsLevel1 }) {
  // Mock dataset
  const hospitals = [
    { id: 1, name: 'Metro Heart & Vascular', pci: true, level: 2, trauma: false, diversion: false, capacity: 0.78, distanceKm: 7.2 },
    { id: 2, name: 'Riverside General', pci: false, level: 1, trauma: true, diversion: false, capacity: 0.62, distanceKm: 5.1 },
    { id: 3, name: 'Northside Medical Center', pci: true, level: 1, trauma: true, diversion: true, capacity: 0.54, distanceKm: 11.6 },
    { id: 4, name: 'City University Hospital', pci: true, level: 3, trauma: false, diversion: false, capacity: 0.83, distanceKm: 9.4 },
  ];

  const withEta = hospitals.map(h => {
    const trafficFactor = 0.8 + Math.random() * 0.6; // 0.8–1.4
    const etaMin = Math.round(h.distanceKm / 0.7 * trafficFactor); // rough 42 km/h avg

    // Suitability score base on condition matching
    let score = 50;
    if (condition === 'stemi') {
      score += h.pci ? 25 : -25;
    }
    if (condition === 'trauma') {
      score += h.level === 1 ? 20 : h.level === 2 ? 5 : -10;
    }
    if (condition === 'stroke') {
      score += h.pci ? 5 : 0; // minor boost if comprehensive
    }
    if (condition === 'sepsis') {
      score += 10; // neutral baseline
    }

    if (needsPCI) score += h.pci ? 10 : -20;
    if (needsLevel1) score += h.level === 1 ? 10 : -10;

    // Capacity (higher is better), diversion (bad), eta (shorter is better)
    score += Math.round((h.capacity - 0.5) * 40); // -20..+20
    if (h.diversion) score -= 30;
    score -= Math.min(etaMin, 30) * 0.8; // penalize long travel

    return { ...h, etaMin, score: Math.max(0, Math.min(100, Math.round(score))) };
  });

  return withEta
    .sort((a, b) => b.score - a.score)
    .map((h, idx) => ({ rank: idx + 1, ...h }));
}
