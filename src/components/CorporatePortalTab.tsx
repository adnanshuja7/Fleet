/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Building2, TrendingUp, Users, FileText, Plus, ChevronRight, CheckCircle2, ShieldAlert, ArrowRight, DollarSign, Calendar, MapPin, Layers } from 'lucide-react';

interface CorporateClient {
  id: string;
  name: string;
  value: number; // monthly contract value in AED
  region: string;
  stage: 'prospecting' | 'rfq_pending' | 'negotiation' | 'active_fulfillment';
  costCenters: string[];
  approversCount: number;
  servicesNeeded: string;
  confidence: number; // percentage
}

interface CorporatePortalTabProps {
  onAskAi: (prompt: string) => void;
}

export default function CorporatePortalTab({ onAskAi }: CorporatePortalTabProps) {
  // Hard-coded premium enterprise GCC client list
  const [clients, setClients] = useState<CorporateClient[]>([
    {
      id: 'cc-1',
      name: 'Aramco Executive Services',
      value: 380000,
      region: 'Riyadh Core',
      stage: 'negotiation',
      costCenters: ['DHA-EXEC-01', 'RYD-CORP-99'],
      approversCount: 3,
      servicesNeeded: 'Ultra-Luxury Sedans & Security Logistics',
      confidence: 85,
    },
    {
      id: 'cc-2',
      name: 'Al-Shaya Luxury Ground Network',
      value: 195000,
      region: 'Kuwait & Dubai HB',
      stage: 'active_fulfillment',
      costCenters: ['SHY-VIP-TRANSIT', 'SHY-OPS-DXB'],
      approversCount: 2,
      servicesNeeded: 'Business Class Chauffeurs & Executive Shuttles',
      confidence: 100,
    },
    {
      id: 'cc-3',
      name: 'Emirates Cabin Crew First-Class Desk',
      value: 850000,
      region: 'Dubai Hub Alpha',
      stage: 'active_fulfillment',
      costCenters: ['EK-CREW-DESK', 'EK-FIRST-TERMS'],
      approversCount: 5,
      servicesNeeded: 'Automated 24/7 Crew Dispatch Integration',
      confidence: 100,
    },
    {
      id: 'cc-4',
      name: 'Ritz-Carlton Doha VIP Lounge',
      value: 220000,
      region: 'Doha West Bay',
      stage: 'rfq_pending',
      costCenters: ['RITZ-DOH-VIP', 'RITZ-VALET'],
      approversCount: 1,
      servicesNeeded: 'Exclusive Airport Spillover Exchange Access',
      confidence: 60,
    },
    {
      id: 'cc-5',
      name: 'Majid Al Futtaim Corporate HQ',
      value: 140000,
      region: 'Dubai Festival City',
      stage: 'prospecting',
      costCenters: ['MAF-EXEC-CORP'],
      approversCount: 2,
      servicesNeeded: 'Premium Point-to-Point Executive Pooling',
      confidence: 45,
    },
    {
      id: 'cc-6',
      name: 'NEOM Board Commuter Shuttle',
      value: 490000,
      region: 'Riyadh & Tabuk',
      stage: 'rfq_pending',
      costCenters: ['NEM-HQ-BOARD', 'NEM-TRANSPORT'],
      approversCount: 4,
      servicesNeeded: 'Hybrid VIP Van & Helicopter Tender Shuttle',
      confidence: 70,
    },
    {
      id: 'cc-7',
      name: 'Al Maktoum Gov Delegation Office',
      value: 600000,
      region: 'Dubai Int Airport',
      stage: 'negotiation',
      costCenters: ['DXB-GOV-VIP', 'ROYAL-COURT-REP'],
      approversCount: 4,
      servicesNeeded: 'Ultra Premium Custom White-Label Chauffeurs',
      confidence: 90,
    }
  ]);

  // Selected client for side panel view
  const [selectedClientId, setSelectedClientId] = useState<string>('cc-1');
  
  // Custom RFQ Creation Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientValue, setNewClientValue] = useState(150000);
  const [newClientRegion, setNewClientRegion] = useState('Dubai Hub Alpha');
  const [newClientStage, setNewClientStage] = useState<'prospecting' | 'rfq_pending' | 'negotiation' | 'active_fulfillment'>('prospecting');
  const [newClientServices, setNewClientServices] = useState('Executive SUV Airport Transfers');

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const stageOrder = ['prospecting', 'rfq_pending', 'negotiation', 'active_fulfillment'] as const;

  const currentActiveIndex = stageOrder.indexOf(selectedClient.stage);
  const progressPercent = (currentActiveIndex / 3) * 100;
  const offsetPixels = 80 * (currentActiveIndex / 3);

  // Pipeline stage groups config
  const stagesList = [
    { key: 'prospecting', label: 'Prospecting', color: 'border-l-immersive-secondary-text', icon: Users, desc: 'Initial contact & service alignment' },
    { key: 'rfq_pending', label: 'RFQ Pending', color: 'border-l-immersive-info', icon: FileText, desc: 'Quote pricing & volume commitment' },
    { key: 'negotiation', label: 'Negotiation', color: 'border-l-immersive-warning', icon: TrendingUp, desc: 'SLA terms & hierarchy configuration' },
    { key: 'active_fulfillment', label: 'Active Fulfillment', color: 'border-l-immersive-success', icon: CheckCircle2, desc: 'SaaS operational & live dispatcher access' },
  ] as const;

  // Dynamic Pipeline aggregates
  const pipelineTotalVal = clients.reduce((sum, c) => sum + c.value, 0);
  const activeFulfillmentVal = clients.filter(c => c.stage === 'active_fulfillment').reduce((sum, c) => sum + c.value, 0);
  const pendingRfqCount = clients.filter(c => c.stage === 'rfq_pending').length;
  const avgConfidence = Math.round(clients.reduce((sum, c) => sum + c.confidence, 0) / clients.length);

  // Advance client stage
  const advanceClientStage = (id: string) => {
    setClients(prev => prev.map(c => {
      if (c.id === id) {
        if (c.stage === 'prospecting') return { ...c, stage: 'rfq_pending', confidence: 60 };
        if (c.stage === 'rfq_pending') return { ...c, stage: 'negotiation', confidence: 80 };
        if (c.stage === 'negotiation') return { ...c, stage: 'active_fulfillment', confidence: 100 };
      }
      return c;
    }));
  };

  // Create new RFQ client
  const handleCreateRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newCc: CorporateClient = {
      id: `cc-${Date.now()}`,
      name: newClientName,
      value: Number(newClientValue),
      region: newClientRegion,
      stage: newClientStage,
      costCenters: [`CC-${newClientName.substring(0, 3).toUpperCase()}-01`],
      approversCount: Math.floor(Math.random() * 3) + 1,
      servicesNeeded: newClientServices,
      confidence: newClientStage === 'active_fulfillment' ? 100 : newClientStage === 'negotiation' ? 85 : newClientStage === 'rfq_pending' ? 65 : 30
    };

    setClients(prev => [...prev, newCc]);
    setSelectedClientId(newCc.id);
    
    // Reset Form
    setNewClientName('');
    setNewClientValue(150000);
    setNewClientRegion('Dubai Hub Alpha');
    setNewClientServices('Executive SUV Airport Transfers');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title Header */}
      <div className="border-b border-immersive-border pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#FFFFFF] tracking-tight">Stage 1: Corporate Mobility Portal</h2>
          <p className="text-xs text-immersive-secondary-text mt-1">
            Managing enterprise demand pipelines, sub-cost-center billing quotas, and custom multi-tiered booking workflows.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-immersive-gold hover:opacity-90 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 self-start shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Initiate Enterprise RFQ</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-widest">Pipeline Target Value</span>
          <div className="text-xl font-bold text-immersive-gold font-mono">AED {(pipelineTotalVal * 12 / 1000000).toFixed(2)}M / yr</div>
          <p className="text-[10px] text-immersive-secondary-text font-sans leading-tight">Total annualized contract value</p>
        </div>

        <div className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-widest font-semibold text-immersive-success">Active Enrolled ARR</span>
          <div className="text-xl font-bold text-immersive-success font-mono">AED {(activeFulfillmentVal * 12 / 1000000).toFixed(2)}M / yr</div>
          <p className="text-[10px] text-immersive-secondary-text font-sans leading-tight">SaaS billing in active fulfillment</p>
        </div>

        <div className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-widest">RFQs Status Loading</span>
          <div className="text-xl font-bold text-immersive-info font-mono">{pendingRfqCount} Corporate RFQs</div>
          <p className="text-[10px] text-immersive-secondary-text font-sans leading-tight">Awaiting regional dispatch rates</p>
        </div>

        <div className="p-5 bg-immersive-surface border border-immersive-border rounded-xl flex flex-col justify-between space-y-2">
          <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-widest">Weighted Win Index</span>
          <div className="text-xl font-bold text-slate-200 font-mono">{avgConfidence}% Win Prob</div>
          <p className="text-[10px] text-immersive-secondary-text font-sans leading-tight">Platform pipeline structural confidence</p>
        </div>
      </div>

      {/* Add Form Drawer Section */}
      {showAddForm && (
        <div className="p-6 bg-immersive-surface border border-immersive-gold/30 rounded-xl space-y-4 animate-fade-in">
          <div className="flex justify-between items-center border-b border-immersive-border pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-immersive-gold font-mono flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Launch Custom Enterprise RFQ / Proposal</span>
            </h3>
            <button 
              onClick={() => setShowAddForm(false)}
              className="text-[10px] text-immersive-secondary-text hover:text-slate-200 font-mono uppercase"
            >
              [Cancel]
            </button>
          </div>
          
          <form onSubmit={handleCreateRfq} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Enterprise Client Name</label>
              <input
                type="text"
                required
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="e.g. Al Maktoum Gov Agency"
                className="w-full bg-immersive-accent border border-immersive-border rounded-lg px-3 py-2 text-xs text-[#FFFFFF] focus:outline-none focus:border-immersive-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Expected Monthly Contract (AED)</label>
              <input
                type="number"
                required
                value={newClientValue}
                onChange={(e) => setNewClientValue(Number(e.target.value))}
                className="w-full bg-immersive-accent border border-immersive-border rounded-lg px-3 py-2 text-xs text-[#FFFFFF] focus:outline-none focus:border-immersive-gold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Primary Hub / Region</label>
              <select
                value={newClientRegion}
                onChange={(e) => setNewClientRegion(e.target.value)}
                className="w-full bg-immersive-accent border border-immersive-border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-immersive-gold"
              >
                <option value="Dubai Hub Alpha">Dubai Hub Alpha</option>
                <option value="Riyadh Core">Riyadh Core</option>
                <option value="Doha West Bay">Doha West Bay</option>
                <option value="Kuwait City">Kuwait City</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-medium">Initial Pipeline Stage</label>
              <select
                value={newClientStage}
                onChange={(e) => setNewClientStage(e.target.value as any)}
                className="w-full bg-immersive-accent border border-immersive-border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-immersive-gold"
              >
                <option value="prospecting">Prospecting</option>
                <option value="rfq_pending">RFQ Pending</option>
                <option value="negotiation">Contract Negotiation</option>
                <option value="active_fulfillment">Active Fulfillment</option>
              </select>
            </div>
            <div className="lg:col-span-3 space-y-1">
              <label className="text-xs text-slate-300 font-medium">Specific Services Demanded</label>
              <input
                type="text"
                required
                value={newClientServices}
                onChange={(e) => setNewClientServices(e.target.value)}
                placeholder="e.g. Automated first-class hotel shuttles..."
                className="w-full bg-immersive-accent border border-immersive-border rounded-lg px-3 py-2 text-xs text-[#FFFFFF] focus:outline-none focus:border-immersive-gold"
              />
            </div>
            <div className="lg:col-span-1">
              <button
                type="submit"
                className="w-full bg-immersive-success hover:opacity-90 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs uppercase tracking-wider transition"
              >
                Inject into Pipeline
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Selected Account Pipeline Progress Tracker */}
      <div className="bg-immersive-surface border border-immersive-border/60 rounded-xl p-5 space-y-4 animate-fade-in shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-immersive-gold to-transparent opacity-80" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-immersive-border/30 pb-3 pl-2">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-immersive-gold animate-pulse shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-immersive-secondary-text">Active Selection Tracker</h3>
                <span className="text-[8px] font-mono px-1.5 py-0.5 bg-immersive-gold/10 text-immersive-gold rounded border border-immersive-gold/20 uppercase font-black">
                  Interactive State Trigger
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#FFFFFF] mt-0.5">{selectedClient.name}</h4>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-immersive-accent px-3 py-1.5 rounded-lg border border-immersive-border self-start">
            <span className="text-[10px] font-mono text-immersive-secondary-text uppercase">Value Quota:</span>
            <span className="text-xs font-mono font-bold text-immersive-gold">AED {selectedClient.value.toLocaleString()}/mo</span>
          </div>
        </div>

        {/* Horizontal Steps flow UI */}
        <div className="relative py-4 px-2 sm:px-6">
          {/* Progress track line bg */}
          <div className="absolute top-[32px] left-[40px] right-[40px] h-[2px] bg-immersive-border z-0 hidden sm:block" />
          
          {/* Progress filled line */}
          <div 
            className="absolute top-[32px] h-[2px] bg-immersive-gold z-0 transition-all duration-500 hidden sm:block"
            style={{ 
              left: '40px',
              width: currentActiveIndex === 0 ? '0px' : `calc(${progressPercent}% - ${offsetPixels}px)`
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between items-center gap-6 sm:gap-4">
            {stagesList.map((stg, index) => {
              const IconComponent = stg.icon;
              const activeIndex = stageOrder.indexOf(selectedClient.stage);
              const isCompleted = index < activeIndex;
              const isActive = index === activeIndex;
              const isUpcoming = index > activeIndex;

              let stepColor = "bg-immersive-bg border-immersive-border text-immersive-secondary-text";
              if (isActive) {
                stepColor = "bg-immersive-accent border-immersive-gold text-immersive-gold ring-4 ring-immersive-gold/15";
              } else if (isCompleted) {
                stepColor = "bg-immersive-gold border-immersive-gold text-slate-950";
              }

              return (
                <button
                  key={stg.key}
                  type="button"
                  onClick={() => {
                    setClients(prev => prev.map(c => {
                      if (c.id === selectedClient.id) {
                        return { 
                          ...c, 
                          stage: stg.key,
                          confidence: stg.key === 'active_fulfillment' ? 100 : stg.key === 'negotiation' ? 85 : stg.key === 'rfq_pending' ? 65 : 30
                        };
                      }
                      return c;
                    }));
                  }}
                  className="flex flex-row sm:flex-col items-center gap-3 sm:gap-2 group focus:outline-none w-full sm:w-auto"
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${stepColor}`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <IconComponent className="w-3.5 h-3.5" />
                    )}
                  </div>
                  
                  <div className="text-left sm:text-center block">
                    <span className={`text-[10px] font-bold font-mono uppercase tracking-wider block transition duration-150 ${
                      isActive ? 'text-immersive-gold' : isCompleted ? 'text-slate-200' : 'text-immersive-secondary-text group-hover:text-slate-300'
                    }`}>
                      {stg.label}
                    </span>
                    <span className="text-[9px] font-sans text-immersive-secondary-text/60 mt-0.5 block max-w-[150px] leading-snug">
                      {stg.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contract Pipeline Visual Board */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-immersive-gold" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
              Interactive Enterprise Contract Pipeline
            </h3>
          </div>
          <span className="text-[10px] text-immersive-secondary-text font-mono">Drag actions automated via advance triggers</span>
        </div>

        {/* The 4-column Visual Pipeline Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {stagesList.map((stageItem) => {
            const stageClients = clients.filter(c => c.stage === stageItem.key);
            const stageWorth = stageClients.reduce((sum, c) => sum + c.value, 0);
            const StageIcon = stageItem.icon;

            return (
              <div 
                key={stageItem.key} 
                className="bg-immersive-surface border border-immersive-border rounded-xl p-4 flex flex-col justify-between space-y-3 min-h-[360px]"
              >
                {/* Stage Header */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between border-b border-immersive-border pb-2">
                    <div className="flex items-center gap-2">
                      <StageIcon className={`w-4 h-4 ${
                        stageItem.key === 'active_fulfillment' ? 'text-immersive-success' :
                        stageItem.key === 'negotiation' ? 'text-immersive-warning' :
                        stageItem.key === 'rfq_pending' ? 'text-immersive-info' : 'text-immersive-secondary-text'
                      }`} />
                      <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-200">
                        {stageItem.label}
                      </span>
                    </div>
                    <span className="text-[10px] bg-immersive-accent text-immersive-secondary-text font-mono font-bold px-2 py-0.5 rounded-md">
                      {stageClients.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono mt-1 text-immersive-secondary-text">
                    <span>Quota: AED {stageWorth.toLocaleString()}/mo</span>
                  </div>
                </div>

                {/* Clients scrollable list container */}
                <div className="flex-1 space-y-2 overflow-y-auto max-h-[240px] pr-1.5 scrollbar-thin scrollbar-thumb-immersive-border">
                  {stageClients.length === 0 ? (
                    <div className="h-full flex items-center justify-center py-10 border border-dashed border-immersive-border/50 rounded-lg">
                      <span className="text-[10px] font-mono text-immersive-secondary-text/50">Empty Gate</span>
                    </div>
                  ) : (
                    stageClients.map(client => {
                      const isSelected = client.id === selectedClientId;
                      return (
                        <div
                          key={client.id}
                          onClick={() => setSelectedClientId(client.id)}
                          className={`p-3 rounded-lg border text-left transition cursor-pointer relative group flex flex-col justify-between ${
                            isSelected
                              ? 'bg-immersive-accent border-immersive-gold shadow-lg shadow-immersive-gold/5'
                              : 'bg-immersive-bg/50 border-immersive-border hover:border-immersive-border/80'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="text-xs font-bold text-slate-200 group-hover:text-[#FFFFFF] transition truncate max-w-[130px]">
                                {client.name}
                              </h4>
                              <span className="text-[9px] font-mono text-immersive-gold font-bold">
                                {client.confidence}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-immersive-secondary-text font-sans">
                              <MapPin className="w-3 h-3 text-immersive-gold/60 shrink-0" />
                              <span className="truncate">{client.region}</span>
                            </div>
                          </div>

                          <div className="pt-2 mt-2 border-t border-immersive-border/40 flex justify-between items-center">
                            <span className="text-[10px] font-mono font-semibold text-slate-300">
                              AED {client.value.toLocaleString()}
                            </span>
                            
                            {client.stage !== 'active_fulfillment' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  advanceClientStage(client.id);
                                }}
                                title="Advance to next contract stage"
                                className="w-5 h-5 rounded bg-immersive-accent border border-immersive-border hover:border-immersive-gold hover:text-immersive-gold flex items-center justify-center transition"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <p className="text-[9px] text-immersive-secondary-text/60 italic font-sans leading-tight">
                  {stageItem.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Settle Details & Configuration Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Dynamic Detail Panel */}
        <div className="lg:col-span-7 bg-immersive-surface border border-immersive-border rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border pb-3">
              <span className="text-[10px] text-immersive-gold font-mono uppercase tracking-wider font-bold block">
                Active Client Sub-account Configuration
              </span>
              <span className="text-[10px] text-immersive-success font-mono font-semibold uppercase bg-immersive-success/10 border border-immersive-success/20 px-2 py-0.5 rounded">
                STAGE 1 READY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg">
                <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Fully Virtualized Account</span>
                <div className="text-sm font-bold text-slate-100 mt-1">{selectedClient.name}</div>
              </div>
              <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg">
                <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Monthly Value</span>
                <div className="text-sm font-bold text-immersive-gold mt-1">AED {selectedClient.value.toLocaleString()}</div>
              </div>
              <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg">
                <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Configured Cost-Centers</span>
                <div className="flex gap-1.5 flex-wrap mt-1">
                  {selectedClient.costCenters.map(cc => (
                    <span key={cc} className="text-[9px] font-mono bg-immersive-surface text-slate-300 border border-immersive-border px-1.5 py-0.5 rounded">
                      {cc}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg">
                <span className="text-[10px] text-immersive-secondary-text font-mono tracking-wider block uppercase">Approval Authorities Needed</span>
                <div className="text-sm font-bold text-slate-100 mt-1">{selectedClient.approversCount}-Tier hierarchy confirmation</div>
              </div>
            </div>

            <div className="p-3.5 bg-immersive-accent border border-immersive-border rounded-lg border-l-2 border-l-immersive-info leading-normal">
              <span className="text-[10px] text-immersive-info font-mono tracking-wider block uppercase">Demanded Service Profile</span>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed font-sans">{selectedClient.servicesNeeded}</p>
            </div>
          </div>

          <div className="border-t border-immersive-border pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-immersive-secondary-text/70 font-mono text-[9px] uppercase">
              COORDINATING WITH DECENTRALIZED CLEARING ROUTERS // STAGE 1 CONTRACT
            </span>
            <button
              onClick={() => onAskAi(`Let's design a tactical pitch for ${selectedClient.name}. They require ${selectedClient.servicesNeeded} in ${selectedClient.region}.`)}
              className="text-[#FFFFFF] bg-immersive-accent border border-immersive-border hover:border-immersive-gold hover:text-immersive-gold px-3.5 py-1.5 rounded-md text-xs transition font-mono uppercase tracking-wider"
            >
              Consult AI Pitch Script
            </button>
          </div>
        </div>

        {/* Educational Checklist Node */}
        <div className="lg:col-span-5 bg-immersive-surface border border-immersive-border rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <span className="text-[10px] text-immersive-gold font-mono uppercase tracking-wider font-bold block border-b border-immersive-border pb-2">
              Why Corporate-Demand First Strategy?
            </span>
            
            <p className="text-xs text-immersive-secondary-text leading-relaxed">
              In GCC limousine transport, competing solely on driver apps leads to pricing wars. FleetOS locks down the 
              <strong> distribution blockades</strong>: corporate headquarters, airline agreements, and five-star resort packages travel managers.
            </p>

            <ul className="space-y-2.5">
              <li className="text-xs text-slate-200 flex items-start gap-2.5">
                <span className="text-immersive-success mt-0.5 shrink-0">✔</span>
                <div>
                  <strong className="text-slate-100">B2B Margin Lockin:</strong> Sub-account cost tracking makes executive use un-switchable.
                </div>
              </li>
              <li className="text-xs text-slate-200 flex items-start gap-2.5">
                <span className="text-immersive-success mt-0.5 shrink-0">✔</span>
                <div>
                  <strong className="text-slate-100">Capital-Efficiency:</strong> Enterprises pay fixed monthly quotas upfront, funding operator growth safely.
                </div>
              </li>
              <li className="text-xs text-slate-200 flex items-start gap-2.5">
                <span className="text-immersive-success mt-0.5 shrink-0">✔</span>
                <div>
                  <strong className="text-slate-100">Reputation Gated:</strong> White-label execution ensures original operators keep primary client billing.
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-immersive-accent/40 rounded-lg p-3 text-[10px] text-immersive-secondary-text">
            *Click on pipeline cards to map sub-accounts and services instantly. Use the button at top-right to register raw client leads.
          </div>
        </div>

      </div>

    </div>
  );
}
