/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plane, 
  Anchor, 
  Shield, 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Car, 
  UserCheck, 
  FileText,
  Compass,
  Radio
} from 'lucide-react';
import { FboReservation } from '../types';

interface FboVipTabProps {
  onAskAi: (prompt: string) => void;
}

const INITIAL_FBO_MANIFEST: FboReservation[] = [
  {
    id: 'FBO-DWC-01',
    tailNumber: 'A6-RJB (Gulfstream G650ER)',
    aircraftType: 'Ultra Long Range Heavy Jet',
    fboTerminal: 'Jetex VIP FBO, Al Maktoum Int (DWC)',
    city: 'Dubai',
    eta: 'Today, 17:15 (Touchdown in 20m)',
    leadPassenger: 'His Royal Highness Prince Khalid Al-Saud Delegation',
    assignedFleet: 'Royal Black Chauffeurs (Convoy of 3)',
    vehicleAssigned: 'Maybach S680 + 2x Escalade ESV Escort',
    tarmacPermitStatus: 'Cleared',
    yachtBerth: 'Dubai Harbour Superyacht Berth #B-14 ("Solandge")',
  },
  {
    id: 'FBO-RUH-88',
    tailNumber: 'HZ-VIP (Bombardier Global 7500)',
    aircraftType: 'Long Range Executive Jet',
    fboTerminal: 'Riyadh Private Aviation VIP Terminal (RUH)',
    city: 'Riyadh',
    eta: 'Today, 19:40',
    leadPassenger: 'Sovereign Investment Summit Chairman',
    assignedFleet: 'Najd VIP Security Transport',
    vehicleAssigned: 'Armored VR9 Mercedes-Benz S680 Guard',
    tarmacPermitStatus: 'VIP Escort Active',
  },
  {
    id: 'FBO-AUH-12',
    tailNumber: 'A6-ROJ (Boeing 737 BBJ)',
    aircraftType: 'VIP Corporate Airliner',
    fboTerminal: 'Royal Jet VIP Terminal, Zayed Int (AUH)',
    city: 'Abu Dhabi',
    eta: 'Tomorrow, 09:10',
    leadPassenger: 'Ministerial State Delegation',
    assignedFleet: 'Emirates Protocol Fleets',
    vehicleAssigned: 'Custom 8-Passenger Jet Sprinter Lounge',
    tarmacPermitStatus: 'Cleared',
    yachtBerth: 'Yas Marina Berth #Y-09',
  },
  {
    id: 'FBO-DOH-95',
    tailNumber: 'A7-HHK (Dassault Falcon 8X)',
    aircraftType: 'Tri-Jet Executive',
    fboTerminal: 'Doha Private Jet Terminal (DOH)',
    city: 'Doha',
    eta: 'Tomorrow, 14:00',
    leadPassenger: 'Qatar Energy Strategic Advisory Board',
    assignedFleet: 'Al-Kass Prestige Chauffeurs',
    vehicleAssigned: 'Range Rover SV Long Wheelbase',
    tarmacPermitStatus: 'Pending Security',
  }
];

export default function FboVipTab({ onAskAi }: FboVipTabProps) {
  const [manifest, setManifest] = useState<FboReservation[]>(INITIAL_FBO_MANIFEST);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [activeReservation, setActiveReservation] = useState<FboReservation>(manifest[0]);

  const filteredManifest = manifest.filter(m => selectedCity === 'All' || m.city === selectedCity);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Hero Header */}
      <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <Plane className="w-3 h-3 text-purple-400" />
                PRIVATE AVIATION & FBO ESCORT
              </span>
              <span className="text-xs text-immersive-secondary-text font-mono">Airside Tarmac Access Cleared</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">FBO Tarmac & Superyacht Transit</h1>
            <p className="text-sm text-immersive-secondary-text mt-1 max-w-2xl">
              High-AOV executive transit linking VIP private aviation terminals (Jetex, ExecuJet, Royal Jet) directly to presidential suites and superyacht berths across Dubai, Riyadh, Abu Dhabi, and Doha.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onAskAi('Generate a strict VIP close protection security and tarmac greeting protocol for an incoming Gulfstream G650 at Jetex DWC with superyacht tender transit.')}
              className="px-4 py-2.5 bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-xs font-semibold text-slate-200 rounded-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-immersive-gold" />
              <span>AI Protocol Generator</span>
            </button>
          </div>
        </div>

        {/* High-AOV Economics KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-immersive-border/60">
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Average VIP Order Value (AOV)</div>
            <div className="text-xl font-bold text-white mt-1">$680 – $1,850</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">4.2x Standard Corporate Ride</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">FBO Tarmac Clearance Rate</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">100% Cleared</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Dubai CAA & GACA Bonded</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">VIP Take Rate Margin</div>
            <div className="text-xl font-bold text-amber-400 mt-1">15.0% Fixed</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Includes close protection fee</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Superyacht Transfers</div>
            <div className="text-xl font-bold text-blue-400 mt-1">18 Active Berths</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Dubai Harbour, Yas, Marsa Arabia</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Manifest Table & Live Flight Details Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: FBO Arrival Stream */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">Live FBO & Jet Inbound Manifest</h2>
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-1.5 bg-immersive-surface border border-immersive-border rounded-lg p-1 text-xs">
              {['All', 'Dubai', 'Riyadh', 'Abu Dhabi', 'Doha'].map(city => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-2.5 py-1 rounded-md transition text-xs font-mono ${
                    selectedCity === city
                      ? 'bg-immersive-gold text-black font-bold'
                      : 'text-immersive-secondary-text hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {filteredManifest.map(item => {
              const isSelected = activeReservation.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveReservation(item)}
                  className={`border rounded-xl p-5 cursor-pointer transition duration-150 ${
                    isSelected 
                      ? 'bg-purple-950/20 border-purple-500/60 shadow-lg' 
                      : 'bg-immersive-surface border-immersive-border hover:border-purple-500/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-immersive-border/60">
                    <div className="flex items-center gap-2.5">
                      <Plane className="w-4 h-4 text-purple-400" />
                      <span className="font-mono text-xs font-bold text-white">{item.tailNumber}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
                        {item.aircraftType}
                      </span>
                    </div>

                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-bold uppercase ${
                      item.tarmacPermitStatus === 'Cleared'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : item.tarmacPermitStatus === 'VIP Escort Active'
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30 animate-pulse'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      {item.tarmacPermitStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs">
                    <div>
                      <div className="text-[11px] text-immersive-secondary-text font-mono">FBO Terminal:</div>
                      <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-immersive-gold shrink-0" />
                        <span>{item.fboTerminal}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-immersive-secondary-text font-mono">Principal Passenger:</div>
                      <div className="font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item.leadPassenger}</span>
                      </div>
                    </div>
                  </div>

                  {item.yachtBerth && (
                    <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-2 text-xs text-blue-200 flex items-center gap-2 mt-2 font-mono">
                      <Anchor className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>Connected Yacht Berth: {item.yachtBerth}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-immersive-secondary-text pt-2 mt-2 border-t border-immersive-border/40 font-mono">
                    <span>ETA: {item.eta}</span>
                    <span className="text-amber-400">Assigned: {item.vehicleAssigned}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: VIP Chaperone & Tarmac Clearance Console */}
        <div className="space-y-6">
          
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Tarmac Dispatch Dossier</h3>
              </div>
              <span className="text-[10px] text-purple-300 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {activeReservation.id}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-immersive-secondary-text font-mono text-[11px]">Aircraft Tail:</span>
                <p className="font-bold text-white mt-0.5">{activeReservation.tailNumber}</p>
              </div>

              <div>
                <span className="text-immersive-secondary-text font-mono text-[11px]">Tarmac Gate Access:</span>
                <p className="font-semibold text-emerald-400 mt-0.5">Airside Escort Zone 1 (Runway Direct)</p>
              </div>

              <div>
                <span className="text-immersive-secondary-text font-mono text-[11px]">Assigned Motorcade:</span>
                <p className="font-semibold text-slate-200 mt-0.5">{activeReservation.vehicleAssigned}</p>
              </div>

              <div className="bg-immersive-bg/80 border border-immersive-border/60 rounded-lg p-3 space-y-2">
                <div className="font-mono text-[10px] text-immersive-gold uppercase font-bold">Mandatory VIP Protocol Checklist</div>
                <div className="space-y-1.5 text-[11px] text-slate-300 font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Security Clearance Badges Scanned</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Chilled San Pellegrino & Evian Loaded</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Silent Executive Chaperone Acknowledged</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Luggage Van Tender Synchronized</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onAskAi(`Generate a detailed VIP tarmac arrival briefing sheet for flight ${activeReservation.tailNumber} at ${activeReservation.fboTerminal} with full passenger manifest.`)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-lg transition duration-150 flex items-center justify-center gap-2 shadow-lg"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Export Tarmac Briefing PDF</span>
              </button>
            </div>
          </div>

          {/* Superyacht Linkage Callout */}
          <div className="bg-gradient-to-br from-blue-950/40 to-immersive-surface border border-blue-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Anchor className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Superyacht Tender Integration</h3>
            </div>
            <p className="text-xs text-slate-300">
              FleetOS coordinates seamless ground-to-dock transitions at Dubai Harbour, Bulgari Yacht Club, and Yas Marina, synchronizing chauffeur arrivals with private tender boarding.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
