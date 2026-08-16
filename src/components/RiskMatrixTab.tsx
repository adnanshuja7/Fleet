/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RISK_CARDS } from '../data/mockData';
import { HelpCircle, CheckCircle2, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

interface RiskMatrixTabProps {
  onAskAi: (prompt: string) => void;
}

export default function RiskMatrixTab({ onAskAi }: RiskMatrixTabProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-immersive-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#FFFFFF] tracking-tight">Venture Risk De-risking Matrix</h2>
          <p className="text-xs text-immersive-secondary-text mt-1">
            Tracking commercial, product, and operational structural risk hypotheses and our implemented technical solutions.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-immersive-secondary-text font-mono">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-immersive-success" /> 3 Resolved</span>
          <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-immersive-warning" /> 3 Active/Open</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RISK_CARDS.map((card) => (
          <div
            key={card.id}
            className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between hover:border-immersive-gold/30 transition duration-150 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                    card.resolved
                      ? 'bg-immersive-success/15 text-immersive-success border border-immersive-success/25'
                      : 'bg-immersive-warning/15 text-immersive-warning border border-immersive-warning/25'
                  }`}
                >
                  {card.resolved ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 group-hover:scale-110 transition" />
                      <span>Resolved</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3 h-3 animate-pulse" />
                      <span>Open/In-Flight</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] text-immersive-secondary-text font-mono">ID: {card.id.toUpperCase()}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#FFFFFF] group-hover:text-white transition duration-150">
                  {card.title}
                </h4>
                <p className="text-xs font-mono text-immersive-gold mt-1">{card.resolution}</p>
              </div>

              <p className="text-xs text-immersive-secondary-text leading-relaxed font-sans pt-1">
                {card.detail}
              </p>
            </div>

            <div className="pt-4 border-t border-immersive-border/50 mt-4 flex justify-end">
              <button
                onClick={() => onAskAi(`How does FleetOS resolve the "${card.title}" risk? Give a tactical blueprint.`)}
                className="text-[10px] uppercase font-mono text-immersive-secondary-text hover:text-white flex items-center gap-1.5 transition"
              >
                <MessageSquare className="w-3.5 h-3.5 text-immersive-gold" />
                <span>Request Tactical Blueprint</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
