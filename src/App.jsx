import React, { useRef, useState } from 'react';
import HeroCover from './components/HeroCover.jsx';
import ConditionForm from './components/ConditionForm.jsx';
import HospitalRankings from './components/HospitalRankings.jsx';
import LiveRouteCard from './components/LiveRouteCard.jsx';
import PatientStreamPanel from './components/PatientStreamPanel.jsx';

function App() {
  const planRef = useRef(null);
  const [ranked, setRanked] = useState([]);
  const [selected, setSelected] = useState(null);
  const [packet, setPacket] = useState(null);

  const handleGetStarted = () => {
    planRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#070a0f]">
      <HeroCover onGetStarted={handleGetStarted} />

      <main ref={planRef} className="max-w-7xl mx-auto px-6 -mt-8 relative z-0">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ConditionForm onRank={(items) => { setRanked(items); setSelected(items[0] || null); }} />
            <HospitalRankings items={ranked} onSelect={(h) => setSelected(h)} />
          </div>
          <div className="space-y-6">
            <LiveRouteCard selected={selected} />
          </div>
        </div>

        <section className="mt-6">
          <PatientStreamPanel onPacket={(p) => setPacket(p)} />
          {selected && packet && (
            <div className="mt-4 text-white/60 text-sm">
              Sending to {selected.name}: ETA {selected.etaMin} min • Vitals HR {packet?.vitals?.hr} bpm, SpO₂ {packet?.vitals?.spo2}%
            </div>
          )}
        </section>

        <footer className="py-10 text-center text-white/40 text-sm">
          Built for faster, safer emergency care.
        </footer>
      </main>
    </div>
  );
}

export default App;
