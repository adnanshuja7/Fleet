# FleetOS — System Architecture & Technical Specification

**Architecture Version:** 2.0.0  
**Stack:** React 18+, TypeScript, Express.js, Vite, Three.js, Gemini GenAI SDK, Tailwind CSS

---

## 1. High-Level System Architecture

FleetOS operates as a unified hybrid architecture with client-side reactive rendering, real-time WebGL rendering, and secure server-side API proxy routing for payment orchestration, telematics aggregation, and AI reasoning.

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|                                                                         |
|  +---------------------+  +---------------------+  +-----------------+  |
|  | Corporate Portal    |  | 3D Network Scene    |  | Simulator &     |  |
|  | (Bookings, Telemetry|  | (Three.js WebGL     |  | Revenue Engine  |  |
|  |  & Invoices)        |  |  GCC Hub Orbit)     |  | (Scenario Mod.) |  |
|  +----------+----------+  +----------+----------+  +--------+--------+  |
+-------------|------------------------|----------------------|-----------+
              |                        |                      |
              +--------------------+   |   +------------------+
                                   |   |   |
                                   v   v   v
+-------------------------------------------------------------------------+
|                      NODE.JS / EXPRESS BACKEND LAYER                    |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | Express Router (`server.ts`)                                      |  |
|  | - Port 3000 Ingress / Middleware                                  |  |
|  | - API Authentication & Rate Limiting                              |  |
|  +---------+-------------------+--------------------+----------------+  |
|            |                   |                    |                   |
|            v                   v                    v                   |
|  +------------------+  +------------------+  +----------------------+   |
|  | Gemini AI Engine |  | Flight & Radar   |  | Escrow & Clearing    |   |
|  | (RFP & Pricing)  |  | Grounding Proxy  |  | Settlement Rail      |   |
|  +------------------+  +------------------+  +----------------------+   |
+-------------------------------------------------------------------------+
```

---

## 2. Component Subsystems

### 2.1 3D Network & Telematics Engine (`GccNetworkScene.tsx`)
- **Rendering Framework**: Three.js WebGL context with dynamic particle trajectory shaders.
- **Camera Controller**: Custom OrbitControls configuration with damped panning, spherical constraint clamping, and GSAP-interpolated focal hops across GCC metropolitan hubs.
- **Particle System**: Quadratic Bézier curve geometry with velocity-modulated glow points depicting real-time capacity transfers between cities.

### 2.2 Corporate Procurement & Live Dispatch (`CorporatePortalTab.tsx`)
- **State Management**: Reactive state tracking active bookings, completed corporate itineraries, real-time driver telematics, and consolidated monthly invoices.
- **Flight Synchronization Engine**: Evaluates flight numbers, departure airports, landing terminals, and calculates automated pickup buffers (Standard: 35 min post-landing; First Class: 20 min VIP tarmac clearance).

### 2.3 Unit Economics & Capacity Simulator (`SimulatorTab.tsx`)
- **Mathematical Modeling Engine**:
  $$\text{GMV} = \text{Fleets} \times \text{Vehicles per Fleet} \times \text{Trips/Day} \times \text{AOV} \times 365$$
  $$\text{Exchange Revenue} = \text{GMV} \times \text{Spillover \%} \times \text{Take Rate (12\%–15\%)}$$
  $$\text{SaaS Revenue} = \text{Fleets} \times \text{Monthly SaaS Fee} \times 12$$

### 2.4 AI Executive Assistant Co-Pilot (`server.ts` + `AiAssistant.tsx`)
- **SDK**: `@google/genai` with model `gemini-2.5-flash`.
- **System Guardrails**: Pre-prompted with GCC transportation economics, regional toll architectures (Salik, Darb, KSA transport tax), and corporate travel procurement policies.

---

## 3. Data Model & Entity Relationship (ERD)

```
[Corporate Account] 1 ------ * [Ride Booking]
                                     |
                                     | 1
                                     |
                                     v
[Fleet Operator]    1 ------ * [Vehicle Asset]
       |                             |
       | 1                           | 1
       |                             |
       v                             v
[Chauffeur Driver]  1 ------ * [Telematics Log]
```

### Core Schema Definitions

```typescript
export interface RideBooking {
  id: string;
  corporateClient: string;
  passengerName: string;
  tier: 'Executive Sedan' | 'First Class' | 'Prestige SUV' | 'Armored VIP' | 'Ultra Sprinter';
  pickupCity: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: string;
  flightNumber?: string;
  status: 'confirmed' | 'on_route' | 'arrived' | 'in_progress' | 'completed' | 'cancelled';
  fare: number;
  currency: 'AED' | 'SAR' | 'QAR' | 'USD';
  assignedChauffeur?: string;
  vehicleModel?: string;
  plateNumber?: string;
  clearingOperatorId?: string;
  escrowStatus: 'pending' | 'locked' | 'disbursed' | 'refunded';
}
```

---

## 4. Security & Compliance Architecture

1. **Zero Client Secret Leakage**: All GenAI, external telematics, and payment credentials are isolated within server-side process environment variables.
2. **Data Residency**: Architecture prepared for multi-region deployment across GCP `me-central1` (Doha) and `me-west1` (Tel Aviv / Dammam region) to satisfy GCC data sovereignty mandates.
3. **Escrow Safeguards**: Cryptographically signed ride completion logs with geofence proximity verification before escrow release.
