/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BadgeDollarSign, 
  TrendingUp, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  Car, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sliders,
  DollarSign,
  Building2
} from 'lucide-react';
import { FinancingOffer } from '../types';

interface FintechTabProps {
  onAskAi: (prompt: string) => void;
}

const INITIAL_FINANCING_OFFERS: FinancingOffer[] = [
  {
    id: 'FIN-DXB-910',
    fleetName: 'Royal Jet Chauffeurs Dubai',
    city: 'Dubai',
    rating: 4.96,
    monthlyGmv: 450000,
    approvedCreditLine: 350000,
    termMonths: 24,
    aprPercent: 7.2,
    purpose: '5x Mercedes-Maybach S580 Fleet Expansion',
    status: 'Approved',
  },
  {
    id: 'FIN-RUH-304',
    fleetName: 'Najd Executive Transport KSA',
    city: 'Riyadh',
    rating: 4.92,
    monthlyGmv: 620000,
    approvedCreditLine: 500000,
    termMonths: 36,
    aprPercent: 6.8,
    purpose: '3x VR7 Armored Land Cruiser Acquisition',
    status: 'Active',
  },
  {
    id: 'FIN-AUH-118',
    fleetName: 'Emirates Black Car Abu Dhabi',
    city: 'Abu Dhabi',
    rating: 4.88,
    monthlyGmv: 280000,
    approvedCreditLine: 180000,
    termMonths: 18,
    aprPercent: 7.9,
    purpose: 'EV Fleet Upgrade (4x Lucid Air Grand Touring)',
    status: 'Approved',
  }
];

export default function FintechTab({ onAskAi }: FintechTabProps) {
  const [offers, setOffers] = useState<FinancingOffer[]>(INITIAL_FINANCING_OFFERS);
  const [requestedAmount, setRequestedAmount] = useState<number>(250000);
  const [requestedMonths, setRequestedMonths] = useState<number>(24);
  const [fleetMonthlyGmv, setFleetMonthlyGmv] = useState<number>(320000);
  const [reputationScore, setReputationScore] = useState<number>(96);
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);

  // Underwriting calculation
  const maxApprovedLimit = Math.round(fleetMonthlyGmv * (reputationScore / 100) * 0.85);
  const estimatedMonthlyPayment = Math.round((requestedAmount * 1.07) / requestedMonths);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    const newOffer: FinancingOffer = {
      id: `FIN-NEW-${Math.floor(100 + Math.random() * 900)}`,
      fleetName: 'Your Operator Account',
      city: 'Dubai',
      rating: 4.94,
      monthlyGmv: fleetMonthlyGmv,
      approvedCreditLine: requestedAmount,
      termMonths: requestedMonths,
      aprPercent: 7.4,
      purpose: 'Fleet Expansion & Working Capital Line',
      status: 'Approved',
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Hero Banner */}
      <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <BadgeDollarSign className="w-3 h-3 text-emerald-400" />
                EMBEDDED FLEET FINANCING & LIQUIDITY
              </span>
              <span className="text-xs text-immersive-secondary-text font-mono">Underwritten by Telematics</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Working Capital & Fleet Financing</h1>
            <p className="text-sm text-immersive-secondary-text mt-1 max-w-2xl">
              Turn platform clearing history and reputation scores into instant revenue-based asset financing for luxury vehicle acquisitions, EV upgrades, and working capital lines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onAskAi('Model the financing ROI for a Dubai fleet acquiring 5 Mercedes-Maybach S-Class vehicles at 7.2% APR with 85% utilization on FleetOS.')}
              className="px-4 py-2.5 bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-xs font-semibold text-slate-200 rounded-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-immersive-gold" />
              <span>AI Financing Underwriter</span>
            </button>
          </div>
        </div>

        {/* Fintech Economics KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-immersive-border/60">
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Total Credit Facility Pool</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">$25,000,000</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Backed by Regional Banks</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Origination Spread Fee</div>
            <div className="text-xl font-bold text-amber-400 mt-1">2.5% Net</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Earned on loan origination</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Avg Approval Velocity</div>
            <div className="text-xl font-bold text-white mt-1">&lt; 4 Hours</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Instant Telematics Scoring</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Historical Default Rate</div>
            <div className="text-xl font-bold text-blue-400 mt-1">0.00%</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Auto-deducted from escrow</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Underwriter + Active Credit Lines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Interactive Telematics Loan Underwriter */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">Instant Telematics Underwriting Simulator</h2>
              </div>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Pre-Approved Maximum: AED {maxApprovedLimit.toLocaleString()}
              </span>
            </div>

            <form onSubmit={handleApply} className="space-y-6">
              
              {/* Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Monthly Fleet GMV:</span>
                    <span className="text-emerald-400 font-bold">AED {fleetMonthlyGmv.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="1000000"
                    step="25000"
                    value={fleetMonthlyGmv}
                    onChange={e => setFleetMonthlyGmv(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 bg-immersive-bg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-immersive-secondary-text font-mono">
                    <span>100K AED</span>
                    <span>1.0M AED</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Fleet Quality & Reputation Score:</span>
                    <span className="text-amber-400 font-bold">{reputationScore}/100</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="100"
                    step="1"
                    value={reputationScore}
                    onChange={e => setReputationScore(parseInt(e.target.value))}
                    className="w-full accent-amber-400 bg-immersive-bg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-immersive-secondary-text font-mono">
                    <span>80 (Standard)</span>
                    <span>100 (Flawless)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Requested Financing Facility:</span>
                    <span className="text-white font-bold">AED {requestedAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max={maxApprovedLimit}
                    step="10000"
                    value={requestedAmount}
                    onChange={e => setRequestedAmount(parseInt(e.target.value))}
                    className="w-full accent-immersive-gold bg-immersive-bg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-immersive-secondary-text font-mono">
                    <span>50K AED</span>
                    <span>Max ({maxApprovedLimit.toLocaleString()})</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">Amortization Term:</span>
                    <span className="text-white font-bold">{requestedMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    step="6"
                    value={requestedMonths}
                    onChange={e => setRequestedMonths(parseInt(e.target.value))}
                    className="w-full accent-blue-400 bg-immersive-bg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-immersive-secondary-text font-mono">
                    <span>12 Mo</span>
                    <span>48 Mo</span>
                  </div>
                </div>

              </div>

              {/* Instant Underwriting Outcome Card */}
              <div className="bg-immersive-bg/80 border border-emerald-500/30 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Estimated Monthly Installment</div>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-0.5">AED {estimatedMonthlyPayment.toLocaleString()}/mo</div>
                  <div className="text-[10px] text-slate-400">Auto-deducted from escrow</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Effective APR Interest</div>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">7.15% Fixed</div>
                  <div className="text-[10px] text-slate-400">Zero early prepayment penalty</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Underwriting Risk Tier</div>
                  <div className="text-lg font-bold text-blue-400 font-mono mt-0.5">AAA Institutional</div>
                  <div className="text-[10px] text-slate-400">Instant approval status</div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-immersive-secondary-text font-mono">
                  Funds disbursed within 4 hours to Emirates NBD / Al Rajhi Corporate IBAN.
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg transition duration-150 flex items-center gap-2 shadow-lg shadow-emerald-500/10"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Execute Facility Drawdown</span>
                </button>
              </div>

              {applicationSubmitted && (
                <div className="bg-emerald-950/40 border border-emerald-500/60 rounded-lg p-3 text-xs text-emerald-200 flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Facility Approved! Funds locked in escrow release queue. Reference ID: FIN-AUTO-DRAW-881.</span>
                </div>
              )}

            </form>
          </div>

          {/* Active Facility Portfolio */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <Building2 className="w-4 h-4 text-immersive-gold" />
              <span>Active Partner Fleet Facilities</span>
            </h3>

            {offers.map(offer => (
              <div key={offer.id} className="bg-immersive-surface border border-immersive-border rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-immersive-gold">{offer.id}</span>
                    <span className="text-xs font-bold text-white">{offer.fleetName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
                      {offer.city}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{offer.purpose}</p>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs">
                  <div>
                    <div className="text-[10px] text-immersive-secondary-text">Approved Line</div>
                    <div className="font-bold text-emerald-400">AED {offer.approvedCreditLine.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-immersive-secondary-text">Rate & Term</div>
                    <div className="font-bold text-white">{offer.aprPercent}% / {offer.termMonths}m</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {offer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right 1 Col: Fintech Value Proposition & Escrow Collateral */}
        <div className="space-y-6">
          
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-immersive-border/60 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Why Fintech Unlocks Valuation</h3>
            </div>

            <p className="text-xs text-immersive-secondary-text leading-relaxed">
              By combining real-time clearing telemetry with automated escrow repayment, FleetOS achieves <strong className="text-white">near-zero default rates</strong> while generating high-margin origination fees on top of standard marketplace take rates.
            </p>

            <ul className="text-xs text-slate-300 space-y-2.5 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Zero loan loss reserves required due to direct escrow deductions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Enables operators to rapidly modernize fleets to 2025/2026 Maybach & EV specs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Expands Net Platform Margin by +250 bps per financed vehicle.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/30 to-immersive-surface border border-emerald-500/30 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Utilization-Based Insurance</h3>
            </div>
            <p className="text-xs text-slate-300">
              FleetOS dynamically adjusts commercial comprehensive insurance premiums based on active vehicle GPS telematics, driver speed compliance, and overnight secured parking.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
