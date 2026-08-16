/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 
  | 'pitch'
  | 'corporate'
  | 'clearinghouse'
  | 'fbo-vip'
  | 'fintech'
  | 'sustainability'
  | 'chauffeur'
  | 'simulator'
  | 'revenue'
  | 'risks'
  | 'roadmap';

export interface BookingPreset {
  id: string;
  label: string;
  rawText: string;
  dateTime: string;
  pickup: string;
  destination: string;
  pax: number;
  vehicleTier: string;
  tripId: string;
}

export interface RiskCard {
  id: string;
  title: string;
  resolved: boolean;
  resolution: string;
  detail: string;
}

export interface RoadmapStage {
  stage: string;
  timeframe: string;
  title: string;
  description: string;
  details: string[];
}

export interface RevenueMetric {
  name: string;
  rateLabel: string;
  ratePerFleet: number; // AED per fleet per month
  color: string;
  note: string;
}

export interface SpilloverAuction {
  id: string;
  originatingFleet: string;
  tier: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  flightRef?: string;
  payoutOffered: number;
  totalClientFare: number;
  platformFee: number;
  status: 'active' | 'claimed' | 'in_transit' | 'settled';
  bidsCount: number;
  timeLeftSeconds: number;
  city: 'Dubai' | 'Riyadh' | 'Doha' | 'Abu Dhabi';
  isArmored?: boolean;
}

export interface FboReservation {
  id: string;
  tailNumber: string;
  aircraftType: string;
  fboTerminal: string;
  city: string;
  eta: string;
  leadPassenger: string;
  assignedFleet: string;
  vehicleAssigned: string;
  tarmacPermitStatus: 'Cleared' | 'Pending Security' | 'VIP Escort Active';
  yachtBerth?: string;
}

export interface FinancingOffer {
  id: string;
  fleetName: string;
  city: string;
  rating: number;
  monthlyGmv: number;
  approvedCreditLine: number;
  termMonths: number;
  aprPercent: number;
  purpose: string;
  status: 'Approved' | 'Underwriting' | 'Active';
}

export interface GreenFleetMetric {
  city: string;
  totalMilesKm: number;
  evPercent: number;
  co2AvoidedTons: number;
  activeEvVehicles: number;
  greenTierRating: 'Gold' | 'Platinum' | 'Diamond';
}
