/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Leaf, 
  BatteryCharging, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Zap, 
  TrendingDown, 
  Award,
  Globe2,
  TreeDeciduous,
  Car
} from 'lucide-react';
import { GreenFleetMetric } from '../types';

interface SustainabilityTabProps {
  onAskAi: (prompt: string) => void;
}

const INITIAL_GREEN_METRICS: GreenFleetMetric[] = [
  {
    city: 'Dubai (DXB Corridor)',
    totalMilesKm: 420000,
    evPercent: 38,
    co2AvoidedTons: 64.2,
    activeEvVehicles: 85,
    greenTierRating: 'Platinum',
  },
  {
    city: 'Riyadh (KAFD / Diplomatic)',
    totalMilesKm: 380000,
    evPercent: 44,
    co2AvoidedTons: 71.8,
    activeEvVehicles: 110,
    greenTierRating: 'Diamond',
  },
  {
    city: 'Abu Dhabi (ADGM Hub)',
    totalMilesKm: 190000,
    evPercent: 32,
    co2AvoidedTons: 28.5,
    activeEvVehicles: 42,
    greenTierRating: 'Gold',
  },
  {
    city: 'Doha (West Bay Corridor)',
    totalMilesKm: 145000,
    evPercent: 30,
    co2AvoidedTons: 21.0,
    activeEvVehicles: 30,
    greenTierRating: 'Gold',
  }
];

export default function SustainabilityTab({ onAskAi }: SustainabilityTabProps) {
  const [metrics, setMetrics] = useState<GreenFleetMetric[]>(INITIAL_GREEN_METRICS);
  const [targetEvPercent, setTargetEvPercent] = useState<number>(55);
  const [certificateExported, setCertificateExported] = useState<boolean>(false);

  // Aggregated totals
  const totalCo2Avoided = metrics.reduce((acc, m) => acc + m.co2AvoidedTons, 0);
  const totalActiveEvs = metrics.reduce((acc, m) => acc + m.activeEvVehicles, 0);
  const totalGreenMiles = metrics.reduce((acc, m) => acc + m.totalMilesKm, 0);

  // Projected CO2 savings with target EV slider
  const projectedCo2Savings = Math.round(totalCo2Avoided * (targetEvPercent / 36));

  return (
    <div className="space-y-8 font-sans">
      
      {/* Hero Banner */}
      <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Leaf className="w-3 h-3 text-emerald-400" />
                ESG & SCOPE 3 CARBON COMPLIANCE
              </span>
              <span className="text-xs text-immersive-secondary-text font-mono">UAE Net Zero 2050 & KSA Vision 2030</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Green Fleet & Sustainability Engine</h1>
            <p className="text-sm text-immersive-secondary-text mt-1 max-w-2xl">
              Automated Scope 3 emissions tracking, Lucid & Taycan EV fleet routing optimization, and certified carbon offset reporting for enterprise corporate ESG audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setCertificateExported(true);
                setTimeout(() => setCertificateExported(false), 4000);
              }}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-lg transition duration-150 flex items-center gap-2 shadow-lg shadow-emerald-500/10"
            >
              <Download className="w-4 h-4" />
              <span>Export ESG Audit Certificate</span>
            </button>
            <button
              onClick={() => onAskAi('Generate an institutional Scope 3 greenhouse gas compliance summary for a multinational enterprise with 1,200 executive chauffeur trips across Dubai and Riyadh.')}
              className="px-4 py-2.5 bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-xs font-semibold text-slate-200 rounded-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-immersive-gold" />
              <span>AI Carbon Audit Report</span>
            </button>
          </div>
        </div>

        {/* ESG KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-immersive-border/60">
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Total CO₂ Emissions Avoided</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">{totalCo2Avoided.toFixed(1)} Metric Tons</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Equivalent to 4,200 urban trees</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Active Luxury EV Fleet</div>
            <div className="text-xl font-bold text-white mt-1">{totalActiveEvs} Vehicles</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Lucid Air, Taycan, EQS, i7</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Total Zero-Emission Km</div>
            <div className="text-xl font-bold text-blue-400 mt-1">{(totalGreenMiles / 1000).toFixed(0)}k Km</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Clean energy verified</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Corporate ESG Audit Score</div>
            <div className="text-xl font-bold text-amber-400 mt-1">98.4 / 100</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Meets GHG Protocol Standard</div>
          </div>
        </div>
      </div>

      {certificateExported && (
        <div className="bg-emerald-950/60 border border-emerald-500/60 rounded-xl p-4 text-xs text-emerald-200 flex items-center justify-between font-mono animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Official GHG Protocol Scope 3 Carbon Certificate successfully compiled and downloaded (PDF/ISO 14064-1 compliant).</span>
          </div>
          <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">CERT-2026-GCC-889</span>
        </div>
      )}

      {/* Main Grid: Regional Green Nodes & Transition Optimizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Regional EV Corridor Performance */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">GCC Metropolitan Green Transit Corridors</h2>
              </div>
              <span className="text-xs font-mono text-emerald-400">Live Carbon Telematics</span>
            </div>

            <div className="space-y-3">
              {metrics.map(metric => (
                <div key={metric.city} className="bg-immersive-bg/70 border border-immersive-border/60 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{metric.city}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                        metric.greenTierRating === 'Diamond'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          : metric.greenTierRating === 'Platinum'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {metric.greenTierRating} Tier
                      </span>
                    </div>

                    <div className="font-mono text-xs text-emerald-400 font-bold">
                      {metric.co2AvoidedTons} Tons CO₂ Avoided
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-immersive-secondary-text">
                      <span>EV Fleet Electrification Share</span>
                      <span className="text-white font-bold">{metric.evPercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-immersive-bg rounded-full overflow-hidden border border-immersive-border/60">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${metric.evPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-immersive-secondary-text font-mono pt-1">
                    <span>{metric.activeEvVehicles} Active Electric Chauffeur Units</span>
                    <span>{(metric.totalMilesKm / 1000).toFixed(0)}k km Logged</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive EV Transition Simulator */}
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-3">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Corporate Fleet Electrification Target</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">{targetEvPercent}% Target EV Share</span>
            </div>

            <div className="space-y-3">
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={targetEvPercent}
                onChange={e => setTargetEvPercent(parseInt(e.target.value))}
                className="w-full accent-emerald-400 bg-immersive-bg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-immersive-secondary-text font-mono">
                <span>20% (Baseline)</span>
                <span>50% (UAE 2030 Goal)</span>
                <span>100% (Zero Carbon Vision)</span>
              </div>
            </div>

            <div className="bg-immersive-bg/80 border border-emerald-500/30 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-immersive-secondary-text text-[10px] uppercase">Projected Annual CO₂ Avoided:</span>
                <p className="text-lg font-bold text-emerald-400 mt-0.5">{projectedCo2Savings} Metric Tons/Year</p>
              </div>
              <div>
                <span className="text-immersive-secondary-text text-[10px] uppercase">Corporate Carbon Credit Value:</span>
                <p className="text-lg font-bold text-amber-400 mt-0.5">${(projectedCo2Savings * 45).toLocaleString()} USD</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right 1 Col: Supported Luxury EV Models & Enterprise ESG Moat */}
        <div className="space-y-6">
          
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-immersive-border/60 pb-3">
              <Car className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Certified Luxury EV Models</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-immersive-bg/70 border border-immersive-border/60 rounded-lg p-3">
                <div className="flex justify-between font-bold text-white">
                  <span>Lucid Air Grand Touring</span>
                  <span className="text-emerald-400 font-mono">830 km Range</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Primary KSA Government & Diplomatic Fleet Standard</div>
              </div>

              <div className="bg-immersive-bg/70 border border-immersive-border/60 rounded-lg p-3">
                <div className="flex justify-between font-bold text-white">
                  <span>Porsche Taycan Turbo</span>
                  <span className="text-emerald-400 font-mono">680 km Range</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">DIFC / ADGM Executive C-Suite Transits</div>
              </div>

              <div className="bg-immersive-bg/70 border border-immersive-border/60 rounded-lg p-3">
                <div className="flex justify-between font-bold text-white">
                  <span>Mercedes-Benz EQS 580</span>
                  <span className="text-emerald-400 font-mono">720 km Range</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Ultra-Quiet First Class Acoustic Cabin</div>
              </div>

              <div className="bg-immersive-bg/70 border border-immersive-border/60 rounded-lg p-3">
                <div className="flex justify-between font-bold text-white">
                  <span>BMW i7 xDrive60</span>
                  <span className="text-emerald-400 font-mono">625 km Range</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Rear 31.3" 8K Theater Screen for Traveling VPs</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/40 to-immersive-surface border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TreeDeciduous className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">RFP Winning Moat</h3>
            </div>
            <p className="text-xs text-slate-300">
              Fortune 500 corporate tenders now mandate verified Scope 3 reporting. FleetOS provides automated tamper-proof carbon telemetry that guarantees compliance on every procurement bid.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
