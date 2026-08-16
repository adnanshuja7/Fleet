/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { METRIC_CARDS } from '../data/mockData';
import { ArrowRight, Cpu, Building2, Share2, Sparkles } from 'lucide-react';
import GccNetworkScene from './GccNetworkScene';

interface PitchTabProps {
  onAskAi: (prompt: string) => void;
}

export default function PitchTab({ onAskAi }: PitchTabProps) {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero card */}
      <div className="p-8 bg-immersive-surface border border-immersive-border rounded-xl relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Building2 className="w-48 h-48 rotate-12 text-immersive-gold" />
        </div>
        <div className="relative space-y-4">
          <span className="inline-block uppercase tracking-widest text-immersive-gold text-xs font-mono font-bold bg-immersive-gold/10 px-3 py-1 rounded-full border border-immersive-gold/20">
            Institutional B2B Positioning
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight">
            Building the <span className="text-immersive-gold">Fulfillment Infrastructure</span> for GCC Executive Mobility
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-immersive-secondary-text font-sans mt-4">
            We help regional executive fleets maximize vehicle utilization, automate enterprise dispatch, and seamlessly share excess capacity across a trusted B2B network.
          </p>
          <div className="pt-2 flex flex-wrap gap-x-6 gap-y-2 text-xs text-immersive-secondary-text font-mono">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-immersive-gold font-bold"></span> Premium Limousine Networks</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-immersive-success"></span> VIP Hotel Hospitality</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-immersive-info"></span> Airline Cabin Crew Desks</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D Capacity Exchange Globe Corridors rendering */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-immersive-gold inline-block animate-ping"></span>
              <span>Regional Capacity Routing Hub</span>
            </h3>
            <p className="text-xs text-immersive-secondary-text mt-1">
              Select or rotate regional market terminals in real-time. Nodes monitor active contracts and model cleared annual ARR targets.
            </p>
          </div>
        </div>
        <GccNetworkScene />
      </div>

      {/* 4-column metric card row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_CARDS.map((m, idx) => (
          <div key={idx} className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between space-y-3 hover:border-slate-700 transition duration-150">
            <span className="text-[10px] text-immersive-secondary-text uppercase font-mono tracking-widest">{m.title}</span>
            <div className="text-2xl font-bold text-immersive-gold">{m.value}</div>
            <p className="text-xs text-immersive-secondary-text font-sans leading-tight">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Value Architecture Flow */}
      <div className="p-6 bg-immersive-surface border border-immersive-border rounded-xl space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">Platform Value Architecture</h3>
            <p className="text-xs text-immersive-secondary-text mt-1">Unified systems capture corporate spend, optimize operations, and route spillover capacity.</p>
          </div>
          <Cpu className="text-immersive-gold w-5 h-5 shrink-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Layer 1 */}
          <div className="p-5 bg-immersive-accent border border-immersive-border rounded-xl relative group hover:border-[#B8943F]/50 transition duration-150 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">1. Demand Layer (Corporate Portal)</h4>
              <p className="text-xs text-immersive-secondary-text font-sans leading-relaxed">
                Captures high-volume chauffeur and guest transport budgets. Supports sub-cost accounts, multi-level hierarchy manager approvals, and automated month-end bulk billing.
              </p>
            </div>
          </div>

          {/* Layer 2 */}
          <div className="p-5 bg-immersive-accent border border-immersive-border rounded-xl relative group hover:border-teal-500/50 transition duration-150 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-teal-400" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">2. Fulfillment Layer (Fleet Ops)</h4>
              <p className="text-xs text-immersive-secondary-text font-sans leading-relaxed">
                Automates driver routing and dispatch. Feeds booking data via server-side chat parsing, tracking internal chauffeur availability and proximity in real-time.
              </p>
            </div>
          </div>

          {/* Layer 3 */}
          <div className="p-5 bg-immersive-gold/5 border border-immersive-gold/30 rounded-xl relative group hover:border-immersive-gold transition duration-150 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-immersive-gold/10 border border-immersive-gold/20 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-immersive-gold" />
              </div>
              <h4 className="text-sm font-bold text-slate-200">3. Network Layer (Liquidity Exchange)</h4>
              <p className="text-xs text-immersive-secondary-text font-sans leading-relaxed">
                Triggers instantly when internal load hits 95% threshold. Routes overflow requests automatically to qualified allied operators keeping bookings 100% white-labeled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drill-down action button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => onAskAi('Explain the FleetOS three-layer architecture in detail.')}
          className="bg-immersive-gold hover:opacity-90 text-[#FFFFFF] font-semibold px-6 py-3 rounded-lg transition duration-150 text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Sparkles className="w-4 h-4" />
          <span>Explain the Three-Layer Architecture</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
