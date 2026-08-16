/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { REVENUE_METRICS } from '../data/mockData';
import { Calculator, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

interface RevenueStackTabProps {
  onAskAi: (prompt: string) => void;
}

export default function RevenueStackTab({ onAskAi }: RevenueStackTabProps) {
  const [fleets, setFleets] = useState<number>(50);

  // Math conversions
  const calculateAnnual = (ratePerFleet: number) => {
    return fleets * ratePerFleet * 12;
  };

  const calculateTotalAnnual = () => {
    return REVENUE_METRICS.reduce((sum, metric) => sum + calculateAnnual(metric.ratePerFleet), 0);
  };

  const getFormattedArr = (val: number) => {
    const millions = val / 1000000;
    return `AED ${millions.toFixed(2)}M`;
  };

  const saasArr = calculateAnnual(4500);
  const exchangeArr = calculateAnnual(1800);
  const totalArr = calculateTotalAnnual();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-immersive-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#FFFFFF] tracking-tight">Interactive Revenue Stack Calculator</h2>
          <p className="text-xs text-immersive-secondary-text mt-1">
            Simulate regional subscription and transactional value lines as operator networks scale across key GCC hubs.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-immersive-surface border border-immersive-border rounded-lg px-3 py-1.5 self-start">
          <TrendingUp className="w-4 h-4 text-immersive-gold" />
          <span className="text-xs font-mono text-immersive-gold font-bold uppercase">Compound ARPU Expansion</span>
        </div>
      </div>

      {/* Control Panel (Slider) */}
      <div className="p-6 bg-immersive-surface border border-immersive-border rounded-xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <label className="text-sm font-bold text-slate-200 block">Allied Fleet Operators Scale</label>
            <span className="text-xs text-immersive-secondary-text mt-1 block">Simulating active executive limousine/shuttle agencies registered in the network.</span>
          </div>
          <div className="bg-immersive-accent border border-immersive-border rounded-lg px-4 py-2 flex items-baseline gap-1.5 shrink-0 self-start">
            <span className="text-2xl font-black text-immersive-gold font-mono">{fleets}</span>
            <span className="text-xs text-immersive-secondary-text font-mono uppercase">Fleets</span>
          </div>
        </div>

        <div className="relative pt-2">
          <input
            type="range"
            min="5"
            max="200"
            value={fleets}
            onChange={(e) => setFleets(Number(e.target.value))}
            className="w-full h-2 bg-immersive-accent rounded-lg appearance-none cursor-pointer accent-immersive-gold"
          />
          <div className="flex justify-between text-[10px] text-immersive-secondary-text font-mono mt-1 pt-1">
            <span>5 Fleets (MVP)</span>
            <span>50 Fleets (Y1 Peak)</span>
            <span>100 Fleets (Expansion)</span>
            <span>200 Fleets (Doha/Riyadh)</span>
          </div>
        </div>
      </div>

      {/* Revenue Bars Stack */}
      <div className="p-6 bg-immersive-surface border border-immersive-border rounded-xl space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-immersive-secondary-text font-mono">Simulated Revenue Stack Composition</h3>

        <div className="space-y-5">
          {REVENUE_METRICS.map((item) => {
            const annualVal = calculateAnnual(item.ratePerFleet);
            // Calculate percentage of total revenue for bar width sizing
            const pctOfTotal = (annualVal / totalArr) * 100;

            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-100">{item.name}</span>
                    <span className="text-immersive-secondary-text ml-2">({item.rateLabel} @ AED {item.ratePerFleet.toLocaleString()}/mo)</span>
                  </div>
                  <div className="font-mono text-immersive-gold font-bold">{getFormattedArr(annualVal)}/yr</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-immersive-accent rounded-full h-3 overflow-hidden border border-immersive-border/50">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(5, pctOfTotal)}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-immersive-secondary-text font-mono w-10 text-right">
                    {pctOfTotal.toFixed(0)}%
                  </div>
                </div>
                <p className="text-[10px] text-immersive-secondary-text italic">{item.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-widest">SaaS Subscription ARR</span>
          <div className="text-xl font-bold text-immersive-gold font-mono">{getFormattedArr(saasArr)}</div>
          <p className="text-[10px] text-immersive-secondary-text font-sans leading-tight">Fixed B2B base software billing</p>
        </div>

        {/* Card 2 */}
        <div className="p-5 bg-immersive-surface border border-immersive-info/30 rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-info font-mono uppercase tracking-widest">Exchange Clearing ARR</span>
          <div className="text-xl font-bold text-immersive-info font-mono">{getFormattedArr(exchangeArr)}</div>
          <p className="text-[10px] text-immersive-secondary-text font-sans leading-tight">Split commission off cleared jobs</p>
        </div>

        {/* Card 3 */}
        <div className="p-5 bg-immersive-surface border border-immersive-gold/40 rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-gold font-mono uppercase tracking-widest font-bold">Total Platform ARR</span>
          <div className="text-2xl font-black text-immersive-gold font-mono">{getFormattedArr(totalArr)}</div>
          <p className="text-[10px] text-amber-200/50 font-sans leading-tight">Sum of subscription + exchange clearing fees</p>
        </div>
      </div>

      {/* Explainer / Prompt */}
      <div className="bg-immersive-accent border border-immersive-border rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-immersive-secondary-text leading-relaxed max-w-2xl">
          *Simulation calculations based on regional benchmarking. Our Stage 1 model prioritizes B2B SaaS ARR directly to capture client engagement logs prior to charging transaction-level exchange split margins in Stage 3.
        </p>
        <button
          onClick={() => onAskAi(`Review our financial model of ${fleets} fleets. How do our five revenue stacked levers protect the profit margins of individual executive operators, and what is our target platform ROI?`)}
          className="bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-slate-200 px-4 py-2 rounded-lg text-xs font-mono transition duration-150 shrink-0 flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-immersive-gold" />
          <span>Analyze ROI Framework</span>
        </button>
      </div>
    </div>
  );
}
