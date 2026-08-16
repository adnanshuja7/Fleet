/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookingPreset, RiskCard, RoadmapStage, RevenueMetric } from '../types';

export const METRIC_CARDS = [
  {
    title: 'Target ARR',
    value: '$50–200M',
    sub: 'Infrastructure B2B Model'
  },
  {
    title: 'GCC Vertical Focus',
    value: 'Executive Transport',
    sub: 'Chauffeurs & VIP Airport Transit'
  },
  {
    title: 'Distribution Moat',
    value: 'Alliance First',
    sub: 'Harder to replicate than software'
  },
  {
    title: 'Revenue Sourcing',
    value: 'Corporate Contracts',
    sub: 'Vested administrative budgets'
  }
];

export const RISK_CARDS: RiskCard[] = [
  {
    id: 'risk-1',
    title: 'Alliance Network Depth',
    resolved: false,
    resolution: 'Open Risk / In-Flight',
    detail: 'Aggressive pre-code outreach targets: 100 fleet owners, 20 airport coordinators, 50 luxury hospitality dispatch heads, and 30 flagship corporate travel coordinators across UAE & KSA before shipping software.'
  },
  {
    id: 'risk-2',
    title: 'WhatsApp Limit Limits',
    resolved: true,
    resolution: 'Resolved Hybrid Architecture',
    detail: 'Avoid treating WhatsApp as the full terminal interface. Employ standard Meta WhataApp Business templates for bookings & confirmations, web tools for back-office operations, and lightweight React Native apps for active driver GPS telemetry.'
  },
  {
    id: 'risk-3',
    title: 'Inter-fleet Trust Collapse',
    resolved: false,
    resolution: 'Open Risk / Guided Framework',
    detail: 'Prevent operator pushback by enforcing 100% white-label fulfillment. Enterprise customer always invoices with the originating operator. No consumer brand visibility leakage. Amazon fulfillment standard.'
  },
  {
    id: 'risk-4',
    title: 'The Reputation Deficiency',
    resolved: true,
    resolution: 'Resolved Quality Score Engine',
    detail: 'Built-in Fleet Reputation Engine scores operators dynamically based on punctuality records, response latencies, cancellation logs, and vehicle inspections to keep bad actors out.'
  },
  {
    id: 'risk-5',
    title: 'Corporate Access Sequence',
    resolved: false,
    resolution: 'Open Priority Adjustments',
    detail: 'Prioritized the Corporate Mobility Portal immediately in Stage 1. Controlling corporate spend centers offers the ultimate competitive distribution choke-point.'
  },
  {
    id: 'risk-6',
    title: 'The "AI Wrapper" Stigma',
    resolved: true,
    resolution: 'Resolved Pitch Strategy',
    detail: 'Removed NLP/AI jargon from primary investor core material. Replaced with highly literal "WhatsApp-native booking and operations pipelines" to appeal directly to commercial metrics.'
  }
];

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    stage: 'Stage 0',
    timeframe: 'Pre-Code Formulation',
    title: 'The GCC Mobility Alliance',
    description: 'Foundational trust aggregation across Dubai, Riyadh, and Doha operators.',
    details: [
      'Assemble exclusive private WhatsApp regional roundtables.',
      'Deliver baseline utilization benchmarks and fleet performance matrices.',
      'Aggregate operational partnerships before shipping high-overhead code.'
    ]
  },
  {
    stage: 'Stage 1',
    timeframe: 'Months 1 – 6',
    title: 'Corporate Mobility Portal',
    description: 'Demand-side capture targeting high-volume corporate travel budgets.',
    details: [
      'Incorporate structured cost-center tagging and monthly consolidated billing matrix.',
      'Deploy admin manager multi-tiered reservation approval channels.',
      'Deliver custom integrations for airline first-class crew desks.'
    ]
  },
  {
    stage: 'Stage 2',
    timeframe: 'Months 7 – 12',
    title: 'Fleet Operations Platform',
    description: 'Fulfillment operations layer built directly around operator networks.',
    details: [
      'Launch live WhatsApp booking parsed pipelines & operator panels.',
      'Deploy proximity dispatch algorithms of internal vehicles.',
      'Ship micro driver client managing real-time GPS coordinates.'
    ]
  },
  {
    stage: 'Stage 3',
    timeframe: 'Months 13+',
    title: 'Cross-Company Exchange Network',
    description: 'Multi-fleet capacity pool opening liquidity during peak spikes.',
    details: [
      'Establish white-label dispatch sharing with authorized allied operators.',
      'Enable peer quality ratings and Fleet Reputation score calculations.',
      'Launch integrated multi-tenant clearing ledgers and split fees.'
    ]
  },
  {
    stage: 'Stage 4',
    timeframe: 'Year 2+',
    title: 'Demand Marketplace & Contract Hub',
    description: 'The definitive GCC Transportation Procurement Hub.',
    details: [
      'Publish unassigned recurring contracts (hotel runs, diplomatic assignments).',
      'Deploy route profitability analyzer matching fleets with available contracts.',
      'Scale automated pricing bids driven by regional historical load cycles.'
    ]
  },
  {
    stage: 'Stage 5',
    timeframe: 'Data Density Phase',
    title: 'Underwritten Financial Services',
    description: 'Direct monetization of telemetry, reputation, and transaction records.',
    details: [
      'Underwrite custom fleet commercial insurance plans leveraging safety indexes.',
      'Offer targeted commercial fleet expansion financing based on exchange utilization.',
      'Monetize operational benchmarking reports anonymously.'
    ]
  },
  {
    stage: 'Stage 6',
    timeframe: 'Autonomous Era',
    title: 'Robotaxi / Autonomous Integrations',
    description: 'B2B infrastructure integration ready for upcoming autonomous fleets.',
    details: [
      'Integrate autonomous vehicle pools straight into the capacity exchange network.',
      'Allow fleet operators to lease, dispatch, and clear robotaxis alongside human assets.',
      'Universal API abstraction of autonomous assets.'
    ]
  }
];

export const REVENUE_METRICS: RevenueMetric[] = [
  {
    name: 'Corporate SaaS Contract',
    rateLabel: 'Fixed Subscription',
    ratePerFleet: 4500,
    color: '#B8943F', // Gold
    note: 'Premium fleet system subscription billing with cost-center integrations.'
  },
  {
    name: 'Capacity Exchange Split',
    rateLabel: 'Exchange Clearing Fee',
    ratePerFleet: 1800,
    color: '#3B8BD4', // Ocean Blue
    note: 'Clearing commission charged per automated multi-tenant spillover execution.'
  },
  {
    name: 'Contract Procurement Hub',
    rateLabel: 'Contract Broker Fee',
    ratePerFleet: 900,
    color: '#1D9E75', // Emerald Green
    note: 'Sourcing premium hotel and hospitality volume blocks through the platform.'
  },
  {
    name: 'Utilization-Based Insurance',
    rateLabel: 'Underwriting Share',
    ratePerFleet: 600,
    color: '#7F77DD', // Royal Purple
    note: 'Split fees on custom behavioral premium plans brokerages.'
  },
  {
    name: 'Asset & Expansion Financing',
    rateLabel: 'Finance Origination Fee',
    ratePerFleet: 400,
    color: '#D85A30', // Coral Red
    note: 'Commission on expansion credit lines underwritten by peer reputation data.'
  }
];

export const CHAT_PRESETS = [
  {
    id: 'preset-1',
    label: 'Airport Dropoff Request',
    rawText: 'Airport drop tomorrow 6PM from Downtown to DXB Term 3 - Sheikh Mansoor delegation, 3 passengers requested luxury SUV.'
  },
  {
    id: 'preset-2',
    label: 'Cabin Crew Shuttle',
    rawText: 'Emirates crew pickup DXB T1 at midnight tomorrow to Palm Jumeirah apartment complex - 2 pax in business sedan.'
  },
  {
    id: 'preset-3',
    label: 'Corporate VIP Transit',
    rawText: 'CEO pick up tomorrow noon from DIFC Gate Precinct going to Atlantis Royal dinner - requires executive layout VIP van for 6 passengers.'
  },
  {
    id: 'preset-4',
    label: 'Diplomatic Convoy Link',
    rawText: 'VIP diplomatic delegation tomorrow 8AM from Kingdom Centre in Riyadh going to RUH Int Airport - 1 pax premium luxury ride like Rolls Royce.'
  }
];

export const SIMULATION_EVENTS = [
  {
    id: 'event-airport',
    name: 'Airport Peak Window Surge',
    baseFare: 380,
    alliedFleets: [
      { name: 'AlmaStar Chauffeurs', score: 96 },
      { name: 'GulfRide Premium', score: 91 },
      { name: 'ArabianExec Transport', score: 88 }
    ]
  },
  {
    id: 'event-corporate',
    name: 'Regional Tech Summit Delegation',
    baseFare: 550,
    alliedFleets: [
      { name: 'GulfRide Premium', score: 91 },
      { name: 'CapitalDrive Premium', score: 89 }
    ]
  },
  {
    id: 'event-hotel',
    name: 'Royal Elite Hotel Arrival',
    baseFare: 620,
    alliedFleets: [
      { name: 'AlmaStar Chauffeurs', score: 96 }
    ]
  },
  {
    id: 'event-government',
    name: 'Ministries Diplomatic Dinner',
    baseFare: 900,
    alliedFleets: [
      { name: 'RoyalMobility KSA', score: 94 },
      { name: 'AlmaStar Chauffeurs', score: 96 },
      { name: 'ArabianExec Transport', score: 88 }
    ]
  }
];
