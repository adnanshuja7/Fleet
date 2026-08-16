/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Building, 
  Car, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  PlusCircle,
  Radio,
  Filter,
  RefreshCw,
  Lock
} from 'lucide-react';
import { SpilloverAuction } from '../types';

interface ClearinghouseTabProps {
  onAskAi: (prompt: string) => void;
}

const INITIAL_AUCTIONS: SpilloverAuction[] = [
  {
    id: 'AUCT-DXB-902',
    originatingFleet: 'Royal Jet Chauffeurs Dubai',
    tier: 'First Class Luxury (Mercedes-Maybach S580)',
    pickupLocation: 'DIFC Gate Precinct 4, Dubai',
    dropoffLocation: 'Burj Al Arab Jumeirah, Suite 101',
    pickupTime: 'Today, 18:30 (In 45m)',
    flightRef: 'EK008 Touchdown Sync',
    payoutOffered: 545,
    totalClientFare: 620,
    platformFee: 75,
    status: 'active',
    bidsCount: 3,
    timeLeftSeconds: 184,
    city: 'Dubai',
  },
  {
    id: 'AUCT-RUH-441',
    originatingFleet: 'Najd Executive Transport KSA',
    tier: 'Armored Diplomatic VIP (VR7 Land Cruiser LC300)',
    pickupLocation: 'King Khalid Int Airport (RUH) VIP Terminal',
    dropoffLocation: 'Ritz-Carlton Riyadh, Diplomatic Quarter',
    pickupTime: 'Today, 20:00 (In 2h 15m)',
    flightRef: 'SV120 Royal Delegation',
    payoutOffered: 1280,
    totalClientFare: 1500,
    platformFee: 220,
    status: 'active',
    bidsCount: 5,
    timeLeftSeconds: 310,
    city: 'Riyadh',
    isArmored: true,
  },
  {
    id: 'AUCT-DOH-108',
    originatingFleet: 'Al-Kass Luxury Limousine Doha',
    tier: 'Prestige SUV (Range Rover Autobiography)',
    pickupLocation: 'Hamad International Airport (DOH) Amiri Lounge',
    dropoffLocation: 'St. Regis Marsa Arabia, The Pearl',
    pickupTime: 'Tomorrow, 08:30',
    flightRef: 'QR002 London LHR',
    payoutOffered: 420,
    totalClientFare: 480,
    platformFee: 60,
    status: 'active',
    bidsCount: 2,
    timeLeftSeconds: 620,
    city: 'Doha',
  },
  {
    id: 'AUCT-AUH-772',
    originatingFleet: 'Emirates Black Car Abu Dhabi',
    tier: 'Executive Sprinter (Bespoke 6-Pax Jet Van)',
    pickupLocation: 'Zayed International Airport (AUH)',
    dropoffLocation: 'Emirates Palace Mandarin Oriental',
    pickupTime: 'Tomorrow, 11:00',
    payoutOffered: 850,
    totalClientFare: 980,
    platformFee: 130,
    status: 'active',
    bidsCount: 4,
    timeLeftSeconds: 450,
    city: 'Abu Dhabi',
  }
];

export default function ClearinghouseTab({ onAskAi }: ClearinghouseTabProps) {
  const [auctions, setAuctions] = useState<SpilloverAuction[]>(INITIAL_AUCTIONS);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [claimedAuctions, setClaimedAuctions] = useState<string[]>([]);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);
  const [broadcastForm, setBroadcastForm] = useState({
    city: 'Dubai',
    tier: 'First Class Luxury',
    pickup: '',
    dropoff: '',
    fare: '650',
    flightNumber: 'EK008'
  });
  const [escrowLedger, setEscrowLedger] = useState([
    { id: 'ESC-8812', amount: 545, currency: 'AED', fleet: 'GulfRide Fleet #4', status: 'Locked in Escrow', eta: '22h 40m' },
    { id: 'ESC-8794', amount: 1280, currency: 'SAR', fleet: 'Al-Mobility Riyadh', status: 'Disbursed to IBAN', eta: 'Completed' },
    { id: 'ESC-8750', amount: 480, currency: 'QAR', fleet: 'Doha Prestige', status: 'Disbursed to IBAN', eta: 'Completed' },
  ]);

  // Simulated countdown timer for active auctions
  useEffect(() => {
    const interval = setInterval(() => {
      setAuctions(prev => prev.map(a => {
        if (a.status === 'active' && a.timeLeftSeconds > 0) {
          return { ...a, timeLeftSeconds: a.timeLeftSeconds - 1 };
        }
        return a;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = (auction: SpilloverAuction) => {
    setClaimedAuctions(prev => [...prev, auction.id]);
    setAuctions(prev => prev.map(a => a.id === auction.id ? { ...a, status: 'claimed' } : a));
    
    // Add to escrow ledger
    const newEscrow = {
      id: `ESC-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: auction.payoutOffered,
      currency: auction.city === 'Riyadh' ? 'SAR' : auction.city === 'Doha' ? 'QAR' : 'AED',
      fleet: 'Your Assigned Fleet Unit #07',
      status: 'Locked in Escrow (Auto-settles in 24h)',
      eta: '23h 59m'
    };
    setEscrowLedger(prev => [newEscrow, ...prev]);
  };

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fareNum = parseFloat(broadcastForm.fare) || 500;
    const fee = Math.round(fareNum * 0.12);
    const payout = fareNum - fee;
    
    const newAuction: SpilloverAuction = {
      id: `AUCT-${broadcastForm.city.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      originatingFleet: 'Your Fleet (Capacity Spillover)',
      tier: broadcastForm.tier,
      pickupLocation: broadcastForm.pickup || 'Downtown Financial District',
      dropoffLocation: broadcastForm.dropoff || 'International Airport VIP Terminal',
      pickupTime: 'Today, in 2 hours',
      flightRef: broadcastForm.flightNumber ? `${broadcastForm.flightNumber} Flight Sync` : undefined,
      payoutOffered: payout,
      totalClientFare: fareNum,
      platformFee: fee,
      status: 'active',
      bidsCount: 0,
      timeLeftSeconds: 300,
      city: broadcastForm.city as any,
    };

    setAuctions(prev => [newAuction, ...prev]);
    setIsBroadcastModalOpen(false);
    setBroadcastForm({
      city: 'Dubai',
      tier: 'First Class Luxury',
      pickup: '',
      dropoff: '',
      fare: '650',
      flightNumber: 'EK008'
    });
  };

  const filteredAuctions = auctions.filter(a => selectedCity === 'All' || a.city === selectedCity);

  return (
    <div className="space-y-8 font-sans">
      
      {/* Top Header & Metrics Bar */}
      <div className="bg-immersive-surface border border-immersive-border rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-immersive-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Radio className="w-2.5 h-2.5 animate-pulse text-amber-400" />
                LIVE B2B CLEARINGHOUSE
              </span>
              <span className="text-xs text-immersive-secondary-text font-mono">14 Anchor Fleets Online</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Inter-Fleet Capacity Exchange</h1>
            <p className="text-sm text-immersive-secondary-text mt-1 max-w-2xl">
              Monetize idle fleet hours and offload spillover bookings during peak summit surges. Zero deadhead miles, automated 12% escrow clearing, and instant 24h bank settlement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-4 py-2.5 bg-immersive-gold hover:bg-amber-400 text-black text-xs font-bold rounded-lg transition duration-150 flex items-center gap-2 shadow-lg shadow-amber-500/10"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Broadcast Excess Trip</span>
            </button>
            <button
              onClick={() => onAskAi('Analyze current inter-fleet clearinghouse spillover volume in Dubai and Riyadh, and calculate optimal bidding strategy for a 20-vehicle S-Class fleet.')}
              className="px-4 py-2.5 bg-immersive-surface hover:bg-immersive-accent border border-immersive-border text-xs font-semibold text-slate-200 rounded-lg transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-immersive-gold" />
              <span>AI Clearing Strategy</span>
            </button>
          </div>
        </div>

        {/* Live Liquidity KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-immersive-border/60">
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Active Spillover Volume</div>
            <div className="text-xl font-bold text-white mt-1">AED 48,200 <span className="text-xs font-normal text-emerald-400 font-mono">+18% vs avg</span></div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">34 unfulfilled trips open</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Average Time-to-Match</div>
            <div className="text-xl font-bold text-amber-400 mt-1">68 Seconds</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Sub-2 minute SLA match</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Escrow Locked Funds</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">$142,500</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">100% bonded guarantee</div>
          </div>
          <div className="bg-immersive-bg/60 border border-immersive-border/60 rounded-lg p-3.5">
            <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Take Rate Realization</div>
            <div className="text-xl font-bold text-blue-400 mt-1">12.4% Net</div>
            <div className="text-[11px] text-immersive-secondary-text mt-0.5">Auto-deducted on clearing</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Auction Stream + Escrow Settlement Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Real-Time Spillover Auctions */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-immersive-gold" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-white font-mono">Live Spillover Auction Feed</h2>
            </div>

            {/* City Filter Pills */}
            <div className="flex items-center gap-1.5 bg-immersive-surface border border-immersive-border rounded-lg p-1 text-xs">
              {['All', 'Dubai', 'Riyadh', 'Doha', 'Abu Dhabi'].map(city => (
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

          {/* Auction Cards Stream */}
          <div className="space-y-3">
            {filteredAuctions.map(auction => {
              const isClaimed = claimedAuctions.includes(auction.id) || auction.status === 'claimed';
              const minutes = Math.floor(auction.timeLeftSeconds / 60);
              const seconds = auction.timeLeftSeconds % 60;

              return (
                <div
                  key={auction.id}
                  className={`border rounded-xl p-5 transition duration-200 ${
                    isClaimed
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : auction.isArmored
                      ? 'bg-gradient-to-r from-red-950/20 to-immersive-surface border-red-500/40 hover:border-red-400/60'
                      : 'bg-immersive-surface border-immersive-border hover:border-immersive-gold/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-immersive-border/60">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-immersive-gold">{auction.id}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
                        {auction.city}
                      </span>
                      {auction.isArmored && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-bold font-mono uppercase">
                          Armored VIP (15% Take)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {!isClaimed && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} left</span>
                        </div>
                      )}
                      {isClaimed && (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Claimed & Escrow Locked</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Route & Tier Specs */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                    <div className="md:col-span-2 space-y-2">
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        <Car className="w-4 h-4 text-immersive-gold shrink-0" />
                        <span>{auction.tier}</span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1 pl-6">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span className="text-immersive-secondary-text">From:</span> {auction.pickupLocation}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                          <span className="text-immersive-secondary-text">To:</span> {auction.dropoffLocation}
                        </div>
                      </div>

                      {auction.flightRef && (
                        <div className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded w-fit mt-2">
                          ✈ {auction.flightRef}
                        </div>
                      )}
                    </div>

                    {/* Financial Take & Settlement Breakdown */}
                    <div className="bg-immersive-bg/80 border border-immersive-border/60 rounded-lg p-3 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-immersive-secondary-text uppercase">Operator Net Payout</div>
                        <div className="text-xl font-bold text-emerald-400 font-mono">
                          {auction.city === 'Riyadh' ? 'SAR' : auction.city === 'Doha' ? 'QAR' : 'AED'} {auction.payoutOffered}
                        </div>
                        <div className="text-[10px] text-immersive-secondary-text font-mono mt-0.5">
                          Client Total: {auction.totalClientFare} | Fee: -{auction.platformFee}
                        </div>
                      </div>

                      {!isClaimed ? (
                        <button
                          onClick={() => handleClaim(auction)}
                          className="mt-3 w-full py-2 bg-immersive-gold hover:bg-amber-400 text-black text-xs font-bold rounded-md transition shadow-md flex items-center justify-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Accept & Dispatch</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="mt-3 w-full py-2 bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-md cursor-default flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Dispatched to Chauffeur</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-immersive-secondary-text pt-2 border-t border-immersive-border/40 font-mono">
                    <span>Source Fleet: {auction.originatingFleet}</span>
                    <span>{auction.bidsCount} verified operators monitoring</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Escrow Settlement & Trust Rails */}
        <div className="space-y-6">
          
          {/* Escrow Status Ledger */}
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-immersive-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Automated Escrow Ledger</h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                FAB & SARIE Protected
              </span>
            </div>

            <p className="text-xs text-immersive-secondary-text">
              All transactions are secured via smart escrow. Funds auto-release to your registered GCC corporate IBAN upon trip completion and digital passenger sign-off.
            </p>

            <div className="space-y-2.5">
              {escrowLedger.map(item => (
                <div key={item.id} className="bg-immersive-bg/70 border border-immersive-border/60 rounded-lg p-3 text-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-slate-200">{item.id}</span>
                    <span className="font-mono font-bold text-emerald-400">{item.currency} {item.amount}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{item.fleet}</div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-immersive-secondary-text pt-1 border-t border-immersive-border/40">
                    <span className="text-amber-400">{item.status}</span>
                    <span>ETA: {item.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clearinghouse Rule Engine */}
          <div className="bg-immersive-surface border border-immersive-border rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-immersive-border/60 pb-3">
              <ShieldCheck className="w-4 h-4 text-immersive-gold" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Clearinghouse Quality Rules</h3>
            </div>

            <ul className="text-xs text-immersive-secondary-text space-y-2 font-mono">
              <li className="flex items-start gap-2">
                <span className="text-immersive-gold font-bold">•</span>
                <span>Vehicle age capped at ≤36 months with RTA/TGA limousine permit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-immersive-gold font-bold">•</span>
                <span>Minimum chauffeur rating of 4.85 with dark suit protocol compliance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-immersive-gold font-bold">•</span>
                <span>Default penalty: 100% fare forfeit + $250 fine for unreported no-shows.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Broadcast Spillover Trip Modal */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-immersive-surface border border-immersive-gold/40 rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-immersive-border">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-immersive-gold" />
                <h3 className="text-base font-bold text-white">Broadcast Excess Capacity</h3>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="text-immersive-secondary-text hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">GCC City Node</label>
                <select
                  value={broadcastForm.city}
                  onChange={e => setBroadcastForm({ ...broadcastForm, city: e.target.value })}
                  className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white"
                >
                  <option value="Dubai">Dubai (DXB)</option>
                  <option value="Riyadh">Riyadh (RUH)</option>
                  <option value="Doha">Doha (DOH)</option>
                  <option value="Abu Dhabi">Abu Dhabi (AUH)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Required Vehicle Tier</label>
                <select
                  value={broadcastForm.tier}
                  onChange={e => setBroadcastForm({ ...broadcastForm, tier: e.target.value })}
                  className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white"
                >
                  <option value="First Class Luxury (Mercedes-Maybach S580)">First Class Luxury (Mercedes-Maybach S580)</option>
                  <option value="Executive Sedan (Mercedes-Benz E-Class)">Executive Sedan (Mercedes-Benz E-Class)</option>
                  <option value="Prestige SUV (Range Rover Autobiography)">Prestige SUV (Range Rover Autobiography)</option>
                  <option value="Armored Diplomatic VIP (VR7 Land Cruiser)">Armored Diplomatic VIP (VR7 Land Cruiser)</option>
                  <option value="Ultra-Luxury Executive Sprinter (6-Pax)">Ultra-Luxury Executive Sprinter (6-Pax)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pickup Location</label>
                  <input
                    type="text"
                    placeholder="e.g. DIFC Gate Precinct"
                    value={broadcastForm.pickup}
                    onChange={e => setBroadcastForm({ ...broadcastForm, pickup: e.target.value })}
                    className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Dropoff Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai Airport Terminal 3"
                    value={broadcastForm.dropoff}
                    onChange={e => setBroadcastForm({ ...broadcastForm, dropoff: e.target.value })}
                    className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Client Fare (AED/SAR)</label>
                  <input
                    type="number"
                    value={broadcastForm.fare}
                    onChange={e => setBroadcastForm({ ...broadcastForm, fare: e.target.value })}
                    className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Flight Number (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. EK008 / SV120"
                    value={broadcastForm.flightNumber}
                    onChange={e => setBroadcastForm({ ...broadcastForm, flightNumber: e.target.value })}
                    className="w-full bg-immersive-bg border border-immersive-border rounded-lg p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-immersive-bg/90 border border-immersive-border rounded-lg p-3 text-[11px] font-mono text-immersive-secondary-text">
                Platform Take Rate (12%): <span className="text-amber-400 font-bold">{Math.round(parseFloat(broadcastForm.fare || '0') * 0.12)}</span> | Servicing Operator Receives: <span className="text-emerald-400 font-bold">{Math.round(parseFloat(broadcastForm.fare || '0') * 0.88)}</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 bg-immersive-bg hover:bg-immersive-accent border border-immersive-border text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-immersive-gold hover:bg-amber-400 text-black font-bold rounded-lg shadow-lg"
                >
                  Publish to Clearinghouse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
