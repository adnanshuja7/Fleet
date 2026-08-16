/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { TabType } from './types';
import PitchTab from './components/PitchTab';
import CorporatePortalTab from './components/CorporatePortalTab';
import ClearinghouseTab from './components/ClearinghouseTab';
import FboVipTab from './components/FboVipTab';
import FintechTab from './components/FintechTab';
import SustainabilityTab from './components/SustainabilityTab';
import ChauffeurPwaTab from './components/ChauffeurPwaTab';
import SimulatorTab from './components/SimulatorTab';
import RevenueStackTab from './components/RevenueStackTab';
import RiskMatrixTab from './components/RiskMatrixTab';
import RoadmapTab from './components/RoadmapTab';
import AiAssistant from './components/AiAssistant';
import { 
  Sparkles, 
  Building2, 
  ArrowLeftRight, 
  Plane, 
  BadgeDollarSign, 
  Leaf, 
  Smartphone, 
  Sliders, 
  TrendingUp, 
  ShieldAlert, 
  Compass, 
  Radio
} from 'lucide-react';
import { gsap } from 'gsap';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('pitch');
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [triggeredAiPrompt, setTriggeredAiPrompt] = useState<string>('');
  const tabContentRef = useRef<HTMLDivElement>(null);

  // Universal helper to open Gemini AI assistant with a custom instruction prompt
  const handleTriggerAiPrompt = (prompt: string) => {
    setTriggeredAiPrompt(prompt);
    setIsAiOpen(true);
  };

  const clearTriggeredAiPrompt = () => {
    setTriggeredAiPrompt('');
  };

  // GSAP Tab Change Stagger Transition
  useEffect(() => {
    if (tabContentRef.current) {
      const children = tabContentRef.current.children;
      if (children.length > 0) {
        const elementsToAnimate = Array.from(children[0]?.children || children);
        
        gsap.killTweensOf(elementsToAnimate);

        gsap.fromTo(
          elementsToAnimate,
          {
            opacity: 0,
            y: 20,
            scale: 0.99,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          }
        );
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-immersive-bg text-slate-100 font-sans selection:bg-immersive-gold/20 selection:text-amber-300 flex flex-col">
      
      {/* Decorative Grid Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,148,63,0.04),transparent_50%)] pointer-events-none z-0"></div>

      {/* Main Header Container */}
      <header className="relative border-b border-immersive-border bg-immersive-bg backdrop-blur-md z-12 font-sans shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Brand Logo & Positioning */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-immersive-gold/10 border border-immersive-gold/30 flex items-center justify-center font-black text-lg text-immersive-gold tracking-wider">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-widest text-[#FFFFFF]">FLEETOS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-immersive-gold inline-block"></span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  GCC CLEARINGHOUSE
                </span>
              </div>
              <p className="text-[9px] text-immersive-secondary-text font-mono uppercase tracking-widest leading-none mt-0.5">
                Executive Transportation Procurement & Capacity Exchange
              </p>
            </div>
          </div>

          {/* Premium Platform Global Indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2.5 bg-immersive-surface border border-immersive-border rounded-full px-4 py-1 text-xs font-mono text-immersive-secondary-text">
              <span className="text-[9px] text-immersive-secondary-text/60">CLEARING NODES:</span>
              <span className="text-immersive-success font-bold flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                DXB • AUH • RUH • DOH
              </span>
              <span className="text-immersive-border">|</span>
              <span className="text-[9px] text-immersive-secondary-text/60">ESCROW:</span>
              <span className="text-slate-200 font-bold">100% BONDED</span>
            </div>

            {/* AI Callout Drawer Button */}
            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-immersive-surface hover:bg-immersive-accent border border-immersive-border rounded-md px-4 py-1.5 text-xs font-semibold text-slate-200 hover:text-[#FFFFFF] transition duration-150 flex items-center gap-2 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-immersive-gold" />
              <span>Executive AI Assistant</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Grid Workspace */}
      <main className="relative max-w-7xl mx-auto w-full px-6 py-6 z-10 flex flex-col space-y-6 flex-1">
        
        {/* Navigation Interface Hub */}
        <div className="relative border-b border-immersive-border">
          <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto scrollbar-none pb-2" aria-label="Tabs">
            
            {/* Pitch Tab */}
            <button
              onClick={() => setActiveTab('pitch')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'pitch'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Pitch</span>
            </button>

            {/* Corporate Portal Tab */}
            <button
              onClick={() => setActiveTab('corporate')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'corporate'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Corporate Portal</span>
            </button>

            {/* Clearinghouse Tab */}
            <button
              onClick={() => setActiveTab('clearinghouse')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'clearinghouse'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Capacity Exchange</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            {/* FBO & VIP Tab */}
            <button
              onClick={() => setActiveTab('fbo-vip')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'fbo-vip'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>FBO & Yacht VIP</span>
            </button>

            {/* Fintech Tab */}
            <button
              onClick={() => setActiveTab('fintech')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'fintech'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <BadgeDollarSign className="w-3.5 h-3.5" />
              <span>Fintech & Capital</span>
            </button>

            {/* Sustainability Tab */}
            <button
              onClick={() => setActiveTab('sustainability')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'sustainability'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>ESG & Green Fleet</span>
            </button>

            {/* Chauffeur PWA Tab */}
            <button
              onClick={() => setActiveTab('chauffeur')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'chauffeur'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Chauffeur Terminal</span>
            </button>

            {/* Simulator Tab */}
            <button
              onClick={() => setActiveTab('simulator')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulator</span>
            </button>

            {/* Revenue Stack Tab */}
            <button
              onClick={() => setActiveTab('revenue')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'revenue'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Revenue Stack</span>
            </button>

            {/* Risk Matrix Tab */}
            <button
              onClick={() => setActiveTab('risks')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'risks'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Risk Matrix</span>
            </button>

            {/* Roadmap Tab */}
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition rounded-lg font-mono whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'roadmap'
                  ? 'bg-immersive-gold text-black font-bold shadow-md shadow-amber-500/10'
                  : 'text-immersive-secondary-text hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Roadmap</span>
            </button>

          </nav>
        </div>

        {/* Viewport Content Panel switcher with GSAP transition attachments */}
        <div ref={tabContentRef} className="flex-1">
          {activeTab === 'pitch' && <PitchTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'corporate' && <CorporatePortalTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'clearinghouse' && <ClearinghouseTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'fbo-vip' && <FboVipTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'fintech' && <FintechTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'sustainability' && <SustainabilityTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'chauffeur' && <ChauffeurPwaTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'simulator' && <SimulatorTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'revenue' && <RevenueStackTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'risks' && <RiskMatrixTab onAskAi={handleTriggerAiPrompt} />}
          {activeTab === 'roadmap' && <RoadmapTab onAskAi={handleTriggerAiPrompt} />}
        </div>

      </main>

      {/* Floating System Drawer AI Assistant */}
      <AiAssistant
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        triggerPrompt={triggeredAiPrompt}
        clearTriggerPrompt={clearTriggeredAiPrompt}
      />

    </div>
  );
}
