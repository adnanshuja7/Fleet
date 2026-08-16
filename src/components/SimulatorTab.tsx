/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CHAT_PRESETS, SIMULATION_EVENTS } from '../data/mockData';
import { BookingPreset } from '../types';
import { MessageSquare, Sparkles, CheckCircle, AlertTriangle, RefreshCw, Cpu, Layers, DollarSign, Loader2 } from 'lucide-react';

interface SimulatorTabProps {
  onAskAi: (prompt: string) => void;
}

export default function SimulatorTab({ onAskAi }: SimulatorTabProps) {
  // Parsing live state
  const [currentPresetIdx, setCurrentPresetIdx] = useState<number>(0);
  const [customText, setCustomText] = useState<string>(CHAT_PRESETS[0].rawText);
  const [parsedData, setParsedData] = useState<{
    dateTime: string;
    pickup: string;
    destination: string;
    pax: number;
    vehicleTier: string;
    tripId: string;
    simulated?: boolean;
  }>({
    dateTime: 'Tomorrow at 6:00 PM',
    pickup: 'Downtown Dubai',
    destination: 'DXB Airport Terminal 3',
    pax: 3,
    vehicleTier: 'Executive SUV',
    tripId: 'FL-8234'
  });
  const [parsingLoading, setParsingLoading] = useState<boolean>(false);

  // Spillover State
  const [utilization, setUtilization] = useState<number>(100);
  const [selectedEventId, setSelectedEventId] = useState<string>('event-airport');

  // Trigger preset load
  const loadPreset = (idx: number) => {
    setCurrentPresetIdx(idx);
    setCustomText(CHAT_PRESETS[idx].rawText);
    // Eagerly set matching structured preset to avoid initial lag
    const preset = CHAT_PRESETS[idx];
    let initialParsed = {
      dateTime: 'Tomorrow at 6:00 PM',
      pickup: 'Downtown Dubai',
      destination: 'DXB Airport Terminal 3',
      pax: 3,
      vehicleTier: 'Executive SUV',
      tripId: 'FL-8234'
    };

    if (idx === 1) {
      initialParsed = {
        dateTime: 'Midnight tomorrow',
        pickup: 'DXB Airport Terminal 1',
        destination: 'Palm Jumeirah Complex',
        pax: 2,
        vehicleTier: 'Business Sedan',
        tripId: 'FL-3419'
      };
    } else if (idx === 2) {
      initialParsed = {
        dateTime: 'Tomorrow Noon',
        pickup: 'DIFC Gate Precinct',
        destination: 'Atlantis Royal',
        pax: 6,
        vehicleTier: 'Executive Van',
        tripId: 'FL-9912'
      };
    } else if (idx === 3) {
      initialParsed = {
        dateTime: 'Tomorrow 8:00 AM',
        pickup: 'Kingdom Centre (Riyadh)',
        destination: 'RUH Airport',
        pax: 1,
        vehicleTier: 'Luxury / Rolls Royce',
        tripId: 'FL-4458'
      };
    }
    setParsedData(initialParsed);
  };

  // Trigger live AI parser on the backend
  const triggerLiveAiParse = async () => {
    if (!customText.trim() || parsingLoading) return;
    setParsingLoading(true);

    try {
      const res = await fetch('/api/parse-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: customText }),
      });

      if (!res.ok) {
        throw new Error('Server parsing error');
      }

      const data = await res.json();
      setParsedData(data);
    } catch (error: any) {
      console.error('Error in parse route, running local fallback logic:', error);
      // Run robust fallback
      const randId = Math.floor(1000 + Math.random() * 9000);
      setParsedData({
        dateTime: 'Extracted Tomorrow noon',
        pickup: 'Extracted Location Point',
        destination: 'Extracted Target Point',
        pax: 4,
        vehicleTier: 'Identified Premium Sedan',
        tripId: `FL-${randId}`,
        simulated: true
      });
    } finally {
      setParsingLoading(false);
    }
  };

  // Spillover dynamic state calculations
  const activeEvent = SIMULATION_EVENTS.find(e => e.id === selectedEventId) || SIMULATION_EVENTS[0];
  const totalFare = activeEvent.baseFare;
  const isOverflow = utilization >= 95;

  // Settle calculations
  // Under Capacity: Originator (Fleet A) executes, gets 95% of total, FleetOS Platform gets 5% system fee
  // Overflow Capacity: Fleet A gets 12% referral / originator fee, Allied Fleet (Fleet B) gets 80% execution fee, Platform takes rest (Clearing Fee)
  const originatorFee = isOverflow ? (totalFare * 0.12) : (totalFare * 0.95);
  const allyName = activeEvent.alliedFleets[0]?.name || 'Allied Chauffeurs';
  const allyScore = activeEvent.alliedFleets[0]?.score || 95;
  const allyPayout = isOverflow ? (totalFare * 0.80) : 0;
  const platformFee = totalFare - originatorFee - allyPayout;

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      
      {/* ---------------- SECTION A: WHATSAPP BOOKING PARSER ---------------- */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-immersive-success block animate-pulse"></span>
            <span>Module I: WhatsApp-Native Booking Parser (NLP)</span>
          </h2>
          <p className="text-xs text-immersive-secondary-text mt-1">
            Headless AI ingestion parses raw, unstructured text streams from operator chats instantly into transactional database tables.
          </p>
        </div>

        {/* Outer Ingestion Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Input Chat Box Panel */}
          <div className="lg:col-span-5 bg-immersive-surface border border-immersive-border rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-wider block">Raw Messaging Payload</span>
              
              {/* WhatsApp Interface Mock */}
              <div className="border border-immersive-success/30 rounded-lg bg-immersive-accent p-4 font-mono text-xs text-slate-300 leading-relaxed min-h-[140px] focus-within:border-immersive-success transition duration-150 flex flex-col justify-between">
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-transparent resize-none focus:outline-none min-h-[100px] text-xs text-immersive-success scrollbar-none"
                  placeholder="Enter custom booking text..."
                />
                <div className="flex justify-between items-center text-[10px] text-immersive-secondary-text/60 border-t border-immersive-border pt-2">
                  <span>SENDER: +971-55-900-XXXX</span>
                  <span>ENCRYPTED V2</span>
                </div>
              </div>

              {/* Presets Grid */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-wider block">Interactive Scenarios</span>
                <div className="flex flex-wrap gap-1.5">
                  {CHAT_PRESETS.map((preset, idx) => (
                    <button
                      key={preset.id}
                      onClick={() => loadPreset(idx)}
                      className={`text-[10px] px-2.5 py-1.5 rounded-lg border font-medium transition ${
                        currentPresetIdx === idx
                          ? 'bg-immersive-success/15 text-immersive-success border-immersive-success/25'
                          : 'bg-immersive-accent text-immersive-secondary-text border-immersive-border hover:text-slate-200'
                      }`}
                    >
                      Preset {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={triggerLiveAiParse}
                disabled={parsingLoading}
                className="w-full bg-immersive-gold hover:opacity-90 disabled:opacity-50 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition duration-150 flex items-center justify-center gap-2"
              >
                {parsingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing Ingestion Nodes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 stroke-[2.5]" />
                    <span>Parse Custom Inbound Ingest</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Structured Output Field Grids */}
          <div className="lg:col-span-7 bg-immersive-surface border border-immersive-border rounded-xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-immersive-gold font-mono uppercase tracking-wider font-bold">Structured Core Record (Parsed Outputs)</span>
                {parsedData.simulated && (
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-immersive-accent text-immersive-secondary-text rounded">Simulation Mode</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Field 1 */}
                <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-gold">
                  <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Target Date/Time</span>
                  <div className="text-xs font-bold text-slate-200 mt-1">{parsedData.dateTime || 'Analyzing...'}</div>
                </div>
                {/* Field 2 */}
                <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-gold">
                  <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Pickup Node</span>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">{parsedData.pickup || 'Analyzing...'}</div>
                </div>
                {/* Field 3 */}
                <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-gold">
                  <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Destination Node</span>
                  <div className="text-xs font-bold text-slate-200 mt-1 truncate">{parsedData.destination || 'Analyzing...'}</div>
                </div>
                {/* Field 4 */}
                <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-gold">
                  <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Pax Count</span>
                  <div className="text-xs font-bold text-slate-200 mt-1">{parsedData.pax || '—'} pax</div>
                </div>
                {/* Field 5 */}
                <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-gold">
                  <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Vehicle Tier</span>
                  <div className="text-xs font-bold text-slate-200 mt-1">{parsedData.vehicleTier || 'Analyzing...'}</div>
                </div>
                {/* Field 6 */}
                <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-info">
                  <span className="text-[10px] text-immersive-info font-mono tracking-wider block uppercase">Central Trip ID</span>
                  <div className="text-xs font-bold text-immersive-info mt-1">{parsedData.tripId || 'PEND'}</div>
                </div>
              </div>
            </div>

            <div className="border-t border-immersive-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-immersive-secondary-text font-mono text-[10px]">AUTO-DETECT // INTEGRITY SCORE: 99.4%</span>
              <button
                onClick={() => onAskAi('How does FleetOS parse WhatsApp bookings using NLP?')}
                className="text-immersive-gold hover:opacity-90 font-semibold flex items-center gap-1 self-start text-xs uppercase tracking-wider"
              >
                <span>Explain NLP Parsing Mechanics</span>
                <span>→</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- SECTION B: CROSS-FLEET SPILLOVER ENGINE ---------------- */}
      <div className="space-y-4 pt-4 border-t border-immersive-border/60">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-immersive-gold" />
            <span>Module II: Multi-Tenant Spillover & Settlement (Day-1 Architecture)</span>
          </h2>
          <p className="text-xs text-immersive-secondary-text mt-1">
            Re-allocating excess requests to allied fleet partnerships instantly upon bottleneck utilization thresholds.
          </p>
        </div>

        {/* Input Parameters panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-4 p-5 bg-immersive-surface border border-immersive-border rounded-xl space-y-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-immersive-gold font-mono uppercase tracking-wider block font-bold mb-4">Simulator Controls</span>
              
              {/* Control 1: Event Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium font-sans">Active Event Scenario</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full bg-immersive-accent border border-immersive-border rounded-lg px-3 py-2 text-xs font-sans text-slate-200 focus:outline-none focus:border-immersive-gold"
                >
                  {SIMULATION_EVENTS.map(ev => (
                    <option key={ev.id} value={ev.id}>{ev.name}</option>
                  ))}
                </select>
              </div>

              {/* Control 2: Utilization */}
              <div className="space-y-1.5 pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-sans">Fleet utilization</span>
                  <span className={`font-mono font-bold ${isOverflow ? 'text-immersive-warning' : 'text-immersive-success'}`}>
                    {utilization}%
                  </span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={utilization}
                  onChange={(e) => setUtilization(Number(e.target.value))}
                  className="w-full accent-immersive-gold cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-immersive-secondary-text font-mono">
                  <span>70% (Liquid)</span>
                  <span>95% (SPILLOVER)</span>
                </div>
              </div>
            </div>

            {/* Threshold Banner Output */}
            <div className={`p-3.5 rounded-lg border text-xs leading-relaxed space-y-1 mt-4 flex items-start gap-2.5 ${
              isOverflow
                ? 'bg-immersive-warning/15 text-immersive-warning border-immersive-warning/25'
                : 'bg-immersive-success/15 text-immersive-success border-immersive-success/25'
            }`}>
              {isOverflow ? (
                <>
                  <AlertTriangle className="w-5 h-5 shrink-0 text-immersive-warning animate-pulse mt-0.5" />
                  <div>
                    <strong className="block font-bold uppercase tracking-wider text-[10px]">SPILLOVER OVERFLOW ACTIVE</strong>
                    Originating capacity locked. Routing dispatch request with quality scores...
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 shrink-0 text-immersive-success mt-0.5" />
                  <div>
                    <strong className="block font-bold uppercase tracking-wider text-[10px]">INTERNAL DISPATCH CLEAR</strong>
                    Autonomous internal fulfillment of regional executive cars.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Settle Clearing Ledger Table Board */}
          <div className="lg:col-span-8 bg-immersive-surface border border-immersive-border rounded-xl p-5 flex flex-col justify-between space-y-4">
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-wider block">Financial Settlement Routing</span>
                {isOverflow && (
                  <div className="text-[10px] text-immersive-warning font-mono flex items-center gap-1.5 bg-immersive-warning/5 px-2.5 py-1 rounded border border-immersive-warning/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-immersive-warning animate-pulse" />
                    <span>White-Label Ally: {allyName} (Quality: {allyScore}/100)</span>
                  </div>
                )}
              </div>

              {/* Ledger Table */}
              <div className="border border-immersive-border rounded-lg overflow-hidden bg-immersive-accent">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-immersive-surface border-b border-immersive-border">
                      <th className="p-3 text-left text-[10px] font-mono text-immersive-secondary-text uppercase">Entity Participant</th>
                      <th className="p-3 text-left text-[10px] font-mono text-immersive-secondary-text uppercase">Settlement Role</th>
                      <th className="p-3 text-right text-[10px] font-mono text-immersive-secondary-text uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Originator Chauffeur */}
                    <tr className="border-b border-immersive-border/60 text-xs">
                      <td className="p-3 font-semibold text-slate-200">Fleet Operator A (Originator)</td>
                      <td className="p-3 text-immersive-secondary-text font-mono text-[10px]">
                        {isOverflow ? 'REFERRAL COMMISSION (12%)' : 'EXECUTION & DISPATCH (95%)'}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-100 font-semibold bg-immersive-surface/10">
                        AED {originatorFee.toFixed(2)}
                      </td>
                    </tr>

                    {/* Executing Allied Fleet B (Conditional) */}
                    <tr className={`border-b border-immersive-border/60 text-xs transition-opacity duration-150 ${isOverflow ? 'opacity-100' : 'opacity-20'}`}>
                      <td className="p-3">
                        <div className="font-semibold text-slate-200">{isOverflow ? allyName : 'Allied Fleet Operator B'}</div>
                        {isOverflow && (
                          <span className="inline-block bg-immersive-gold/15 border border-immersive-gold/25 text-immersive-gold text-[8px] font-mono px-1.5 py-0.5 rounded uppercase mt-0.5">
                            White-Label Invisible (Amazon model)
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-immersive-secondary-text font-mono text-[10px]">
                        {isOverflow ? 'WHITE-LABEL FULFILLMENT (80%)' : 'HOLD / CAPACITY WAITING'}
                      </td>
                      <td className="p-3 text-right font-mono text-slate-100 font-semibold">
                        AED {allyPayout.toFixed(2)}
                      </td>
                    </tr>

                    {/* Platform Clearing */}
                    <tr className="border-b border-immersive-border text-xs">
                      <td className="p-3 font-semibold text-immersive-gold">FleetOS Platform Service</td>
                      <td className="p-3 text-immersive-secondary-text font-mono text-[10px]">
                        {isOverflow ? 'NETWORK TRANSACTION CLEARING FEE' : 'SYSTEM LICENSING COMMISSION (5%)'}
                      </td>
                      <td className="p-3 text-right font-mono text-immersive-gold font-bold bg-immersive-gold/5">
                        AED {platformFee.toFixed(2)}
                      </td>
                    </tr>

                    {/* Total billing invoice */}
                    <tr className="text-xs bg-immersive-surface font-bold border-t border-immersive-border">
                      <td className="p-3 text-slate-200 uppercase font-mono tracking-wider font-extrabold text-[10px]">Consolidated Client Invoice</td>
                      <td className="p-3 text-immersive-secondary-text font-sans text-[11px] font-normal">Charged to corporate client account</td>
                      <td className="p-3 text-right font-mono text-white text-sm font-black border-l border-immersive-border">
                        AED {totalFare.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[10px] text-immersive-secondary-text font-sans leading-relaxed italic border-l-2 border-immersive-gold pl-3">
              *Customer contract remains securely with Fleet A. Client invoice identifies Fleet A. Security and operational reputation indexes are logs finalized upon successful chauffeur ride delivery.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
