import React, { useState } from 'react';
import { Activity, Upload } from 'lucide-react';

export default function PatientStreamPanel({ onPacket }) {
  const [vitals, setVitals] = useState({ hr: 98, bp: '128/78', spo2: 96, rr: 18 });
  const [notes, setNotes] = useState('50M, chest pain x30m, ASA given, no allergies reported.');
  const [image, setImage] = useState(null);

  const update = (next) => {
    const packet = { ...next, notes, image };
    onPacket && onPacket(packet);
  };

  const onVitalsChange = (field, value) => {
    const nextVitals = { ...vitals, [field]: value };
    setVitals(nextVitals);
    onPacket && onPacket({ vitals: nextVitals, notes, image });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      onPacket && onPacket({ vitals, notes, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-[#0b0f17] border border-white/10 rounded-xl p-5 text-white/90">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Pre-arrival packet</h2>
        <Activity className="w-4 h-4 text-white/50" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <LabeledInput label="Heart rate" suffix="bpm" value={vitals.hr} onChange={(v) => onVitalsChange('hr', Number(v))} />
            <LabeledInput label="Resp. rate" suffix="rpm" value={vitals.rr} onChange={(v) => onVitalsChange('rr', Number(v))} />
            <LabeledInput label="Blood pressure" value={vitals.bp} onChange={(v) => onVitalsChange('bp', v)} />
            <LabeledInput label="SpO₂" suffix="%" value={vitals.spo2} onChange={(v) => onVitalsChange('spo2', Number(v))} />
          </div>

          <label className="block">
            <span className="text-sm text-white/70">Triage notes</span>
            <textarea
              value={notes}
              onChange={(e) => { setNotes(e.target.value); onPacket && onPacket({ vitals, notes: e.target.value, image }); }}
              rows={4}
              className="mt-2 w-full rounded-md bg-white/5 border border-white/10 p-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
              placeholder="Allergies, meds, interventions, events..."
            />
          </label>

          <label className="block">
            <span className="text-sm text-white/70">Attach image (12-lead, wound, ID)</span>
            <div className="mt-2 flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleImage} className="block w-full text-sm file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-cyan-500 file:text-[#05060a] hover:file:bg-cyan-400" />
              <Upload className="w-4 h-4 text-white/60" />
            </div>
          </label>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-2">Preview sent to hospital</h3>
            <div className="text-sm text-white/80 space-y-1">
              <div>HR: <span className="font-mono">{vitals.hr} bpm</span> | RR: <span className="font-mono">{vitals.rr} rpm</span></div>
              <div>BP: <span className="font-mono">{vitals.bp}</span> | SpO₂: <span className="font-mono">{vitals.spo2}%</span></div>
              <div className="pt-2 border-t border-white/10">Notes: {notes}</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-2">Attachment</h3>
            {image ? (
              <img src={image} alt="Attachment" className="w-full h-40 object-cover rounded" />
            ) : (
              <div className="h-40 rounded bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/10 flex items-center justify-center text-white/60 text-sm">
                No image uploaded
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LabeledInput({ label, suffix, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <div className="mt-2 flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md bg-white/5 border border-white/10 p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
        />
        {suffix && <span className="px-2 py-1 rounded bg-white/10 text-white/70 text-xs">{suffix}</span>}
      </div>
    </label>
  );
}
