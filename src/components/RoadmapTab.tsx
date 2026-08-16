/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ROADMAP_STAGES } from '../data/mockData';
import { PlayCircle, Clock, Check, HelpCircle } from 'lucide-react';

interface RoadmapTabProps {
  onAskAi: (prompt: string) => void;
}

export default function RoadmapTab({ onAskAi }: RoadmapTabProps) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="border-b border-immersive-border pb-4">
        <h2 className="text-xl font-bold text-[#FFFFFF] tracking-tight">System Rollout & Deployment Roadmap</h2>
        <p className="text-xs text-immersive-secondary-text mt-1">
          The 7-stage inverted build sequence prioritizing cash flow demand nodes before capacity clearing layers.
        </p>
      </div>

      <div className="relative border-l border-immersive-border pl-6 ml-4 space-y-10 py-2">
        {ROADMAP_STAGES.map((s, idx) => {
          // Highlight Stage 0 and 1 as active/near-term
          const isActive = idx === 0 || idx === 1;
          const isCompleted = idx === 0;

          return (
            <div key={s.stage} className="relative group">
              {/* Timeline Connector Indicator */}
              <div className="absolute -left-[31px] top-1.5 flex items-center justify-center">
                {isCompleted ? (
                  <div className="w-4 h-4 rounded-full bg-immersive-gold flex items-center justify-center ring-4 ring-immersive-bg">
                    <Check className="w-2.5 h-2.5 text-slate-950 stroke-[3]" />
                  </div>
                ) : isActive ? (
                  <div className="w-4 h-4 rounded-full bg-immersive-bg border-2 border-immersive-gold flex items-center justify-center ring-4 ring-immersive-bg animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-immersive-gold" />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-immersive-bg border-2 border-immersive-border flex items-center justify-center ring-4 ring-immersive-bg">
                    <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  </div>
                )}
              </div>

              {/* Roadmap Content */}
              <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 hover:border-immersive-gold/30 transition duration-150 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] tracking-wider uppercase font-mono font-bold px-2 py-0.5 bg-immersive-accent text-immersive-secondary-text rounded">
                      {s.stage}
                    </span>
                    <span className="text-xs text-immersive-secondary-text font-mono">|</span>
                    <span className="text-xs text-immersive-gold font-mono font-medium">{s.timeframe}</span>
                  </div>
                  {isCompleted ? (
                    <span className="text-[10px] uppercase font-mono text-immersive-success font-semibold bg-immersive-success/15 border border-immersive-success/25 px-2 py-0.5 rounded">
                      Consensus Realized
                    </span>
                  ) : isActive ? (
                    <span className="text-[10px] uppercase font-mono text-immersive-warning font-semibold bg-immersive-warning/15 border border-immersive-warning/25 px-2 py-0.5 rounded animate-pulse">
                      Active Development
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-mono text-immersive-secondary-text font-semibold bg-immersive-accent/40 px-2 py-0.5 rounded">
                      Future State
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#FFFFFF] group-hover:text-white transition duration-150">
                    {s.title}
                  </h3>
                  <p className="text-xs text-immersive-secondary-text mt-1 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <ul className="space-y-1.5 pt-2">
                  {s.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-xs text-slate-200 flex items-start gap-2">
                      <span className="text-immersive-gold text-xs leading-none select-none pt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-immersive-border/50 flex justify-end">
                  <button
                    onClick={() => onAskAi(`Let's detail our engineering roadmap for "${s.stage}: ${s.title}". What are the key success metrics?`)}
                    className="text-[10px] font-mono text-immersive-secondary-text hover:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 transition"
                  >
                    <span>Inspect Rollout Strategy</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

