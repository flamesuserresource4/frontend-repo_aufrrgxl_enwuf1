import React from 'react';
import Spline from '@splinetool/react-spline';
import { Ambulance, Activity, Hospital, ArrowRight } from 'lucide-react';

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-white/10 text-cyan-300">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-sm text-white/70">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  </div>
);

export default function HeroCover({ onGetStarted }) {
  return (
    <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden bg-[#05060a]">
      <div className="absolute inset-0">
        <Spline 
          scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#05060a]/90 via-[#05060a]/70 to-transparent" />

      <div className="relative h-full max-w-7xl mx-auto px-6 flex">
        <div className="ml-auto w-full md:w-[54%] flex items-center">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 mb-4">
              <Ambulance className="w-4 h-4 text-cyan-300" />
              <span className="text-xs uppercase tracking-wider">Real-time Emergency Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
              Faster care begins before arrival
            </h1>
            <p className="mt-4 text-white/80 leading-relaxed">
              Identify the right destination, route with live conditions, and stream pre-arrival packets with vitals, notes, and images to cut door-to-treatment time.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={onGetStarted} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-[#05060a] font-medium transition-colors">
                Get started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Stat icon={Activity} label="Decision time" value="-38%" />
              <Stat icon={Hospital} label="Accurate destinations" value="+92%" />
              <Stat icon={Ambulance} label="Door-to-treatment" value="-24 min" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
