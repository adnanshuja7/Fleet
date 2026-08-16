/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Smartphone, 
  Car, 
  MapPin, 
  Plane, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle, 
  Maximize2, 
  Minimize2, 
  Clock, 
  Eye, 
  EyeOff, 
  Radio, 
  User, 
  Navigation,
  CheckSquare,
  Square,
  VolumeX,
  Thermometer,
  Coffee
} from 'lucide-react';

interface ChauffeurPwaTabProps {
  onAskAi: (prompt: string) => void;
}

export default function ChauffeurPwaTab({ onAskAi }: ChauffeurPwaTabProps) {
  const [tripState, setTripState] = useState<'assigned' | 'arrived_terminal' | 'passenger_onboard' | 'completed'>('assigned');
  const [isIpadNameboardOpen, setIsIpadNameboardOpen] = useState<boolean>(false);
  const [passengerName, setPassengerName] = useState<string>('H.E. Dr. Tariq Al-Husseini');
  const [companyName, setCompanyName] = useState<string>('Investcorp International');
  const [isPhoneMasked, setIsPhoneMasked] = useState<boolean>(true);
  
  // Protocol checklist state
  const [protocolChecks, setProtocolChecks] = useState({
    darkSuit: true,
    chilledWater: true,
    tempSet: true,
    silentMode: true,
    wifiActive: true
  });

  const toggleCheck = (key: keyof typeof protocolChecks) => {
    setProtocolChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNextTripStep = () => {
    if (tripState === 'assigned') setTripState('arrived_terminal');
    else if (tripState === 'arrived_terminal') setTripState('passenger_onboard');
    else if (tripState === 'passenger_onboard') setTripState('completed');
    else setTripState('assigned');
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Hero Banner */}
      <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Smartphone className="w-3 h-3 text-amber-400" />
                TWO-SIDED OPERATOR & CHAUFFEUR COCKPIT
              </span>
              <span className="text-xs text-immersive-secondary-text font-mono">Real-Time Mobile Dispatch Terminal</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Chauffeur Mobile Terminal & Flight Radar</h1>
            <p className="text-sm text-immersive-secondary-text mt-1 max-w-2xl">
              Lightweight mobile PWA for elite chauffeurs featuring automated IATA flight radar synchronization, zero-leakage passenger privacy masking, protocol verification, and digital iPad nameboards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsIpadNameboardOpen(true)}
              className="px-4 py-2.5 bg-immersive-gold hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition duration-150 flex items-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Launch iPad Nameboard Display</span>
            </button>
            <button
              onClick={() => onAskAi('Review the chauffeur protocol checklist for a royal VIP airport reception at Dubai DXB Terminal 3 and explain SLA breach consequences.')}
              className="px-4 py-2.5 bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-xs font-semibold text-slate-200 rounded-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-immersive-gold" />
              <span>AI Protocol Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Mobile PWA Simulator + Live Telematics & Protocol Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 1 Col: Mobile Phone Frame Simulator */}
        <div className="flex justify-center">
          <div className="w-full max-w-[340px] bg-black border-4 border-slate-700 rounded-[36px] p-4 shadow-2xl space-y-4 relative overflow-hidden flex flex-col justify-between min-h-[640px]">
            
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-600 rounded-full"></div>
            </div>

            {/* Mobile Header Bar */}
            <div className="pt-4 flex justify-between items-center text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>CHAUFFEUR #7718</span>
              </div>
              <span>DXB T3 AIRSIDE</span>
            </div>

            {/* Live Flight Radar Telematics Card */}
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-3.5 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-amber-400 flex items-center gap-1">
                  <Plane className="w-3 h-3" />
                  <span>FLIGHT EK008 (LHR → DXB)</span>
                </span>
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">ON FINAL APPROACH</span>
              </div>
              <div className="flex justify-between text-xs text-white font-mono">
                <div>
                  <div className="text-[9px] text-slate-400">Runway Touchdown:</div>
                  <div className="font-bold">14:10 (in 12m)</div>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400">Target Gate Pickup:</div>
                  <div className="font-bold text-amber-400">14:40 (Gate 4 VIP)</div>
                </div>
              </div>
            </div>

            {/* Active Passenger & Trip Dossier */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-immersive-gold" />
                  <span>{passengerName}</span>
                </span>
                <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  VIP First Class
                </span>
              </div>
              <div className="text-[11px] text-slate-400">{companyName}</div>

              {/* Privacy Masked Phone */}
              <div className="bg-black/60 border border-slate-800 rounded-lg p-2 flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400">
                  {isPhoneMasked ? '+971 50 ***-4912 (Masked)' : '+971 50 892-4912'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPhoneMasked(!isPhoneMasked)}
                  className="text-amber-400 hover:text-amber-300"
                >
                  {isPhoneMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Route */}
              <div className="space-y-1 text-[11px] text-slate-300 pl-2 border-l-2 border-amber-500/40">
                <div><strong className="text-slate-400">From:</strong> DXB Terminal 3 VIP Chauffeur Gate</div>
                <div><strong className="text-slate-400">To:</strong> Burj Al Arab Jumeirah, Suite 101</div>
              </div>
            </div>

            {/* Status Workflow Action Button */}
            <div className="space-y-2">
              <button
                onClick={handleNextTripStep}
                className={`w-full py-3 text-xs font-bold rounded-xl transition duration-150 flex items-center justify-center gap-2 shadow-lg ${
                  tripState === 'assigned'
                    ? 'bg-amber-500 hover:bg-amber-400 text-black'
                    : tripState === 'arrived_terminal'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : tripState === 'passenger_onboard'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>
                  {tripState === 'assigned' && 'Mark: Arrived at Airport Gate'}
                  {tripState === 'arrived_terminal' && 'Mark: Passenger Onboard'}
                  {tripState === 'passenger_onboard' && 'Complete Trip & Unlock Escrow'}
                  {tripState === 'completed' && 'Trip Settled (Reset Demo)'}
                </span>
              </button>

              <div className="text-center text-[10px] font-mono text-slate-400">
                {tripState === 'completed' ? 'AED 545 Auto-Disbursed to IBAN' : 'Escrow Status: Locked (AED 545)'}
              </div>
            </div>

          </div>
        </div>

        {/* Right 2 Cols: Chauffeur Protocol Verification & Nameboard Settings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Protocol Checklist Console */}
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-immersive-gold" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">Mandatory Chauffeur Protocol Standards</h2>
              </div>
              <span className="text-xs text-emerald-400 font-mono">Zero SLA Violations</span>
            </div>

            <p className="text-xs text-immersive-secondary-text">
              Every chauffeur dispatched on FleetOS enterprise contracts must certify compliance with the five core luxury service mandates prior to arrival at the passenger pickup gate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              <div
                onClick={() => toggleCheck('darkSuit')}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
                  protocolChecks.darkSuit ? 'bg-emerald-950/20 border-emerald-500/40 text-white' : 'bg-immersive-bg border-immersive-border text-slate-400'
                }`}
              >
                {protocolChecks.darkSuit ? <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />}
                <div className="text-xs">
                  <div className="font-bold">Dark Formal Suit & Tie</div>
                  <div className="text-[11px] text-immersive-secondary-text mt-0.5">Pressed black suit, white shirt, polished oxford shoes.</div>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('chilledWater')}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
                  protocolChecks.chilledWater ? 'bg-emerald-950/20 border-emerald-500/40 text-white' : 'bg-immersive-bg border-immersive-border text-slate-400'
                }`}
              >
                {protocolChecks.chilledWater ? <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />}
                <div className="text-xs">
                  <div className="font-bold">Chilled Luxury Glass Water</div>
                  <div className="text-[11px] text-immersive-secondary-text mt-0.5">San Pellegrino & Evian bottles chilled at 6°C.</div>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('tempSet')}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
                  protocolChecks.tempSet ? 'bg-emerald-950/20 border-emerald-500/40 text-white' : 'bg-immersive-bg border-immersive-border text-slate-400'
                }`}
              >
                {protocolChecks.tempSet ? <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />}
                <div className="text-xs">
                  <div className="font-bold">Cabin Climate Preset (20.5°C)</div>
                  <div className="text-[11px] text-immersive-secondary-text mt-0.5">Pre-cooled cabin before passenger boarding.</div>
                </div>
              </div>

              <div
                onClick={() => toggleCheck('silentMode')}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex items-start gap-3 ${
                  protocolChecks.silentMode ? 'bg-emerald-950/20 border-emerald-500/40 text-white' : 'bg-immersive-bg border-immersive-border text-slate-400'
                }`}
              >
                {protocolChecks.silentMode ? <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />}
                <div className="text-xs">
                  <div className="font-bold">Silent Executive Chaperone</div>
                  <div className="text-[11px] text-immersive-secondary-text mt-0.5">No unsolicited conversation; pure passenger privacy.</div>
                </div>
              </div>

            </div>
          </div>

          {/* iPad Nameboard Customizer Card */}
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Digital Airport iPad Nameboard Setup</h3>
              </div>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded">High-Contrast Retina Mode</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Passenger Name / Title</label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={e => setPassengerName(e.target.value)}
                  className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Corporate Entity / Delegation</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white font-medium"
                />
              </div>
            </div>

            <button
              onClick={() => setIsIpadNameboardOpen(true)}
              className="w-full py-2.5 bg-immersive-surface hover:bg-immersive-accent border border-immersive-gold/40 text-amber-300 font-bold text-xs rounded-lg transition duration-150 flex items-center justify-center gap-2 shadow-md"
            >
              <Maximize2 className="w-4 h-4 text-immersive-gold" />
              <span>Preview Live Retina Nameboard Display</span>
            </button>
          </div>

        </div>

      </div>

      {/* Full-Screen Digital iPad Nameboard Modal */}
      {isIpadNameboardOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col justify-between p-12 text-center select-none animate-in fade-in">
          
          <div className="flex justify-between items-center text-xs font-mono text-slate-600">
            <span>FLEETOS VIP GREETING CONSOLE</span>
            <button
              onClick={() => setIsIpadNameboardOpen(false)}
              className="text-slate-400 hover:text-white px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 flex items-center gap-2"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Exit Nameboard</span>
            </button>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto my-auto">
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
            
            <h1 className="text-5xl sm:text-7xl font-serif font-black text-white tracking-wide uppercase">
              {passengerName}
            </h1>
            
            <div className="text-2xl sm:text-3xl font-mono text-amber-400 font-light tracking-widest uppercase">
              {companyName}
            </div>

            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-slate-600">
            <span>FLIGHT EK008 • TERMINAL 3 VIP GATE 4</span>
            <span>CHAUFFEUR: KAREEM M. • MAYBACH S580</span>
          </div>

        </div>
      )}

    </div>
  );
}
